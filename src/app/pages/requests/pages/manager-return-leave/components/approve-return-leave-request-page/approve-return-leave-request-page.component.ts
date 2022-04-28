import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseClass } from 'src/app/base/components/base-component';
import { RequestService } from 'src/app/pages/requests/services/request.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';

@Component({
  selector: 'app-approve-return-leave-request-page',
  templateUrl: './approve-return-leave-request-page.component.html',
  styleUrls: ['./approve-return-leave-request-page.component.scss'],
})

export class ApproveReturnLeaveRequestPageComponent implements OnInit {
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
      this.approveDto.startDate = res.employeeLeaveReturnDto.returnDate;
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
        this.router.navigate(['/home/requests/manager-return-leave/']);
      }
    }, error => {
      this.base.hideLoader();
      console.log('error', error);
      this.base.toastError(error.error, false);
    });
  }


  getDocument(fileName : string){
    let extensionArr = fileName.split('.');
    let extension = extensionArr[extensionArr.length - 1].toLowerCase();
    this.service.downloadfile(fileName, "Leaves") 
    .subscribe(response => {
        if(extension == 'png' || extension == 'jpg' || extension == 'jpeg'||extension == 'gif'){
        this.downLoadFile(response, 'image/'+extension+'')
        }
      else if(extension == 'pdf'){
      this.downLoadFile(response, 'application/pdf')
      }
    });
  }

 downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
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

  calculateDiff(fromDate, toDate) {
    toDate = new Date(toDate);
    fromDate = new Date(fromDate);
    return Math.floor((Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
        - Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()))
        / (1000 * 60 * 60 * 24)) + 1;
  }

}

