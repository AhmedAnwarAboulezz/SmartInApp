import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { RequestTypes, StatusType } from 'src/app/shared/Enums/Enums';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';

@Component({
  selector: 'app-list-over-time',
  templateUrl: './list-over-time.component.html',
  styleUrls: ['./list-over-time.component.scss'],
})

export class ListOverTimeComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  enabledFilter = false;
  filter = {
    date: new Date().toLocaleDateString('en-US'),
    statusTypeId: StatusType.Pending.toString(),
    requestTypeId: RequestTypes.OverTime
  }
  maxData : any = (new Date()).getFullYear() + 3;
  private subRequests: Subscription;
  private subInitiRequests: Subscription;
  pendingRequests: any[] = [];
  isLoading = true;
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


