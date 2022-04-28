import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Shell } from 'src/app/base/components/shell';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { RequestTypes, StatusType, WorkflowStatus } from 'src/app/shared/Enums/Enums';
import { PartDayFilterModalComponent } from '..';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { LanguageService } from '../../../../../../shared/translation/language.service';

@Component({
  selector: 'app-list-part-day-permissions',
  templateUrl: './list-part-day-permissions.component.html',
  styleUrls: ['./list-part-day-permissions.component.scss'],
})
export class ListPartDayPermissionsComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  enabledFilter = false;
  filter = {
    date: new Date().toLocaleDateString('en-US'),
    statusTypeId: StatusType.Pending.toString(),
    requestTypeId: RequestTypes.Permisiion
  }
  maxData : any = (new Date()).getFullYear() + 3;
  private subRequests: Subscription;
  private subInitiRequests: Subscription;
  pendingRequests: any[] = [];
  isLoading = true;
  //get Service(): MyRequestService { return Shell.Injector.get(MyRequestService); }

  constructor(
    private Service: MyRequestService,
    public modalController: ModalController,
    public localize: TranslationService,
    public modal: OverPageModalService
  ) {}

  ngOnInit() {
    this.subInitiRequests = this.Service.pendingRequests.subscribe(requests => {
      this.pendingRequests = requests;
    });
  }


  ionViewWillEnter() {
    this.pendingRequests = [];
    this.fetchData();
  }
  fetchData() {
    this.isLoading = true;
    this.subRequests = this.Service.fetchPendingMyRequests(this.filter).subscribe(data => {
      console.log('res fetch ====> ', data);
      this.pendingRequests = data;
      this.isLoading = false;
    });
  }

  segmentChanged(event) {
    this.filter.statusTypeId = event.detail.value;
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

  ionViewWillLeave(){
    if (this.subInitiRequests) {
      this.subInitiRequests.unsubscribe();
    }
    if (this.subRequests) {
      this.subRequests.unsubscribe();
    }
  }
}


