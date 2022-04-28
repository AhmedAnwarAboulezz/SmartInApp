import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BaseClass } from 'src/app/base/components/base-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { RequestService } from 'src/app/pages/requests/services/request.service';
import { RequestTypes, StatusType, WorkflowStatus } from 'src/app/shared/Enums/Enums';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';

@Component({
  selector: 'app-list-manager-full-day-permissions',
  templateUrl: './list-manager-full-day-permissions.component.html',
  styleUrls: ['./list-manager-full-day-permissions.component.scss'],
})
export class ListManagerFullDayPermissionsComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  enabledFilter = false;
  filter = {
    date: new Date().toLocaleDateString('en-US'),
    isHistory: "false",
    requestTypeId: RequestTypes.FullDayPermision
  }
  maxData : any = (new Date()).getFullYear() + 3;
  private subRequests: Subscription;
  private subInitiRequests: Subscription;
  private subApprove: Subscription;
  pendingRequests: any[] = [];
  isLoading = true;
  constructor(
    private Service: RequestService,
    public modalController: ModalController,
    public localize: TranslationService,
    public modal: OverPageModalService,
    public base: BaseClass
  ) {}

  ngOnInit() {
    this.subInitiRequests = this.Service.Requests.subscribe(requests => {
      this.pendingRequests = requests;
    });
  }


  ionViewWillEnter() {
    this.pendingRequests = [];
    this.fetchData();
  }
  fetchData() {
    this.isLoading = true;

    this.subRequests = this.Service.fetchPendingRequests(this.filter).subscribe(data => {
      console.log('res fetch ====> ', data);
      this.pendingRequests = data;
      this.isLoading = false;
    });
  }


  segmentChanged(event) {
    this.filter.isHistory = event.detail.value;
    this.fetchData();
  }

  showModal() {
    this.modal.template = this.filterContent;
    this.modal.toggleShow();
  }

  toggleFilter() {
    this.enabledFilter = !this.enabledFilter;
  }

  action(event) {
    this.isLoading = true;
    console.log(`🚀 ~ action ~ event`, event);
    if(event!== undefined && event.type == 'remove'){
      const index = this.pendingRequests.findIndex(d => d?.requestMainData?.id === event.id);
      if (index > -1) {
        this.pendingRequests.splice(index, 1);
      }
      //this.pendingRequests = this.pendingRequests.filter(a=>a?.requestMainData?.id !== event.id);
    }
    this.isLoading = false;
  }

  approve(id: string, isApprove: boolean, comment: string, startDate: Date): void {
    let message = 'RequestReject';
    let _statusId = WorkflowStatus.Reject;
    if (isApprove) {
      message = 'RequestApproved';
      _statusId = WorkflowStatus.Approve;
    }
    const approveDto = {
      id,
      statusId: _statusId, comment,
      startDate: startDate
    };
    console.log(approveDto);
    this.subApprove = this.Service.approveOrreject(approveDto).subscribe((res: any) => {
      console.log('res', res);
      if (res == null) {
        this.base.toastSuccess(message);
        this.fetchData();
      }
    }, error => {
      console.log('error', error);
      this.base.toastError(error.error, false);
    });
  }

  
  ionViewWillLeave(){
    if (this.subInitiRequests) {
      this.subInitiRequests.unsubscribe();
    }
    if (this.subRequests) {
      this.subRequests.unsubscribe();
    }
    if (this.subApprove) {
      this.subApprove.unsubscribe();
    }
  }
}



