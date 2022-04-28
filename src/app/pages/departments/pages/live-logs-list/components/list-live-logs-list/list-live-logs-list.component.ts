import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { DisplayProperty } from 'src/app/shared/@ui-components/admin-filter-modal/models/displayProperty';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { LiveLogsService } from '../services/liveLogs.service';
import * as signalR from '@microsoft/signalr';
import { Filter } from 'src/app/shared/models/filter';
@Component({
  selector: 'app-list-live-logs-list',
  templateUrl: './list-live-logs-list.component.html',
  styleUrls: ['./list-live-logs-list.component.scss'],
})


export class ListLiveLogsListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  display = new DisplayProperty();
  get Service(): HttpService {
    return this.liveLogsService;
  }
  mainUrl = 'EmployeeAttedanceLogs/GetAllPagedAdministrationLiveMobile';
  filter: Filter = {};
  connection: signalR.HubConnection;
  constructor(
    public modalController: ModalController,
    private liveLogsService: LiveLogsService,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private route: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    public logHubUrl : ConfigService,
    public loadingController: LoadingController
    //private c: ChangeDetectorRef


    ) {
    super(baseService,toast,load,route,localize);
    this.connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(this.logHubUrl.getLogHubUrl())
    .withAutomaticReconnect()
    .build();
    this.connect();
  }

  
  ngOnInit() {
   this.loadGridData();
  }

   connect() {
    console.log('logs connect');
    this.connection.start().catch(err => console.log(err));
    this.connection.on('NewLogsAdd', () => {
       this.loadGridData();
      });
  }
  

   async loadGridData(){
    //this.toggleInfiniteScroll();
    this.resetCountAndData();
    this.loadTableData();
     await this.delay(3000);
     //this.c.detectChanges();
    let element: HTMLElement = document.getElementById('testinIds') as HTMLElement;
    element.click();
  }

  testBtn(){
  }


  ngOnDestroy() {
    if (this.subInitiList) {
      this.subInitiList.unsubscribe();
    }
    if (this.subList) {
      this.subList.unsubscribe();
    }
  }

  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }



}