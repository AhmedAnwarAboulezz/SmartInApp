import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseClass } from 'src/app/base/components/base-component';
import { RequestService } from 'src/app/pages/requests/services/request.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';

@Component({

  selector: 'app-approve-overtime-request',
  templateUrl: './approve-overtime-request.page.html',
  styleUrls: ['./approve-overtime-request.page.scss'],
})
export class ApproveOverTimeRequestPage  implements OnInit {
  model: any = {};
  id: any;
  segmentValue = true;
  approveDto = { id: '', statusId: '', comment: '', startDate:null };
  workflowStatus = WorkflowStatus;
  noDataFound = false;
  private subRequests: Subscription;
  isLoading = true;
  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public service: RequestService,
    public base: BaseClass
  ) {
  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.params.subscribe((p: any) => { this.id = p.id; });
    this.getRequestById();
  }

  getRequestById() {
    this.subRequests = this.service.getRequestsById2(this.id).subscribe((res: any) => {
      this.model = res;
      console.log('model', this.model);
      let month = res.employeeOverTimeDto.approveOverTime.month;
      let year =  res.employeeOverTimeDto.approveOverTime.year;
      var overtimeDate = new Date(year, month, 1);
      this.approveDto.startDate = overtimeDate;
      this.noDataFound = false;
      this.isLoading = false;
    }, error => {
      this.base.toastError('errorGetRequest');
      this.noDataFound = true;
      this.isLoading = false;
    });
  }


 


  segmentChanged(event): void {
    if (event.value === '1') {
      this.segmentValue = true;
    } else {
      this.segmentValue = false;
    }
  }
  approve(isApprove: boolean): void {
    let message = 'RequestReject';
    let _statusId = WorkflowStatus.Reject;
    if (isApprove) {
      message = 'RequestApproved';
      _statusId = WorkflowStatus.Approve;
    }
    this.approveDto.statusId = _statusId;
    this.approveDto.id = this.model?.requestMainData?.id;
    console.log(this.approveDto);
    this.base.showLoader();
    this.service.approveOrreject(this.approveDto).subscribe((res: any) => {
      this.base.hideLoader();
      console.log('res', res);
      if (res == null) {
        this.base.toastSuccess(message);
        this.router.navigate(['/home/requests/manager-over-time/']);
      }
    }, error => {
      this.base.hideLoader();
      console.log('error', error);
      this.base.toastError(error.error, false);
    });
  }


  

  ngOnDestroy() {
    if (this.subRequests) {
      this.subRequests.unsubscribe();
    }
   }
   ionViewWillLeave(){
    if (this.subRequests) {
      this.subRequests.unsubscribe();
    }
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.model.employeeOverTimeDto.approveOverTimeDetails.map(listItem => {
        if (item === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}

