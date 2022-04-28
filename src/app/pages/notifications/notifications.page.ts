import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { Events } from 'src/app/base/services/events.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { NotificationFilter } from '../inquiry/pages/part-day-list/components/models/filter';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
})
export class NotificationsPage extends BaseListComponent implements OnInit {
  get Service(): HttpService {
    return this.notificationService;
  }
  activeTab = 'workflow';

  workflowCount: any;
  newsCount: any;
  hrCount: any;
  segmentValue: any = 1;

  mainUrl = 'Notifications/GetAllNotificationListPaged';
  filter: NotificationFilter = {
    notificationTypeIds: [1],
    messageAr: '',
    messageEn:'',
    version:"new"
  };
 
  subNotification: Subscription;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    public modalController: ModalController,
    private notificationService: NotificationService,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private route: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    public events : Events
    ) {
    super(baseService,toast,load,route,localize);
  }

  ngOnInit() {
    //this.refreshData();
  }
  ionViewWillEnter() {
    this.refreshData();
  }

  segmentChanged(event) {
    this.activeTab = event.target.value;
    this.segmentValue = this.activeTab === 'workflow' ? 1 : this.activeTab === 'hr' ? 3 : 2;
    this.filter.notificationTypeIds = [this.segmentValue];
    this.toggleInfiniteScroll();
    this.refreshData();

  }


  refreshData(){
    this.resetCountAndData();
    this.loadTableData();

    this.subNotification =  this.notificationService.getNotificationCountByTypes().subscribe(result => {
      this.workflowCount = result.workflowCount;
      this.newsCount = result.newsCount;
      this.hrCount = result.hrCount;
    });
  }


 
  close(){
    const currentRoute = this.route.url;
    const index = currentRoute.lastIndexOf('/');
    const str = currentRoute.substring(0, index);
    this.route.navigate([str], {replaceUrl:true});
  }

  SearchInput(event: any){    
    super.list = [];
    console.log("anwar -------------------", event);
    
    this.localize.isEnglish() ? this.filter.messageEn = event.value : this.filter.messageAr = event.value;
    //this.opt.offset = 1;
    this.resetCountAndData();
    this.loadTableData(null,true);
  }

  ionViewWillLeave(){
    if(this.subNotification){
      this.subNotification.unsubscribe();
    }
    if(this.subInitiList){
      this.subInitiList.unsubscribe();
    }
    if(this.subList){
      this.subList.unsubscribe();
    }
  }

  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }
}

export interface INotifications {
  title?: string;
  date?: string;
  id?: string;
  moduleName?: string;
  isRead?: boolean;
}
