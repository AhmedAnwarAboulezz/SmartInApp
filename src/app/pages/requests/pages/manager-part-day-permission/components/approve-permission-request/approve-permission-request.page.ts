import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import locale_en from '@angular/common/locales/en';
import locale_ar from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { Subscription } from 'rxjs';
import { BaseClass } from 'src/app/base/components/base-component';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';
import { RequestService } from 'src/app/pages/requests/services/request.service';

registerLocaleData(locale_ar, 'ar');
registerLocaleData(locale_en, 'en');
@Component({

  selector: 'app-approve-permission-request',
  templateUrl: './approve-permission-request.page.html',
  styleUrls: ['./approve-permission-request.page.scss'],
})
export class ApprovePermissionRequestPage implements OnInit {
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
      this.approveDto.startDate = res.employeePermissionDto.startDate;
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
    this.base.showLoader();
    let message = 'RequestReject';
    let _statusId = WorkflowStatus.Reject;
    if (isApprove) {
      message = 'RequestApproved';
      _statusId = WorkflowStatus.Approve;
    }
    this.approveDto.statusId = _statusId;
    this.approveDto.id = this.model?.requestMainData?.id;
    console.log(this.approveDto);
    this.service.approveOrreject(this.approveDto).subscribe((res: any) => {
      this.base.hideLoader();
      console.log('res', res);
      if (res == null) {
        this.base.toastSuccess(message);
        this.router.navigate(['/home/requests/manager-part-day/']);
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

}
