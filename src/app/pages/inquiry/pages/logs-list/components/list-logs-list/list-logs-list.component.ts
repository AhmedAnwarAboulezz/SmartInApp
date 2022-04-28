import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { LogsFilterModalComponent } from '../logs-filter-modal/logs-filter-modal.component';
import { LogFilter } from '../models/filter';
import { Log } from '../models/log';
import { LogSort } from '../models/log-sort';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-logs-list',
  templateUrl: './list-logs-list.component.html',
  styleUrls: ['./list-logs-list.component.scss'],
})

export class ListLogsListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  mainUrl = 'EmployeeAttedanceLogs/GetAllPagedMobile';
  list: Log[] = [];
  log: Log = {
    timeEntryStr: '20-6-2020',
    timeEntry: new Date(),
    logTypeNameFl: 'Day',
    remarkFl: 'Remark'

  };
  filter: LogFilter = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString('en-US')
        , endDate: new Date().toLocaleDateString('en-US')
  };
  sort = new LogSort();
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;

  get Service(): HttpService {
    return this.logService;
  }

  constructor(private logService: LogService, 
    public modalController: ModalController,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private route: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    ) {
      super(baseService,toast,load,route,localize);
    
  }

 

  ngOnInit() {
    this.opt.sortDirection = this.sort.direction;
    this.opt.sortField = this.sort.column;
    this.resetCountAndData();
    super.loadTableData();
  }

  
  
  sortData(data){
    if (data !== null && data !== undefined) {
      this.opt.sortField = "timeEntry";
      this.opt.sortDirection = data.direction;
      //this.ascSortType = data.ascSortType;
    }
    this.toggleInfiniteScroll();
    this.resetCountAndData();
    this.loadTableData();
  
  }
  async openModal() {
    
    const modal = await this.presentModal();
    const data = await (await modal.onWillDismiss()).data;
    if (data !== null && data !== undefined && data.dismissed == true) {
      this.filter = data.filter;
      this.toggleInfiniteScroll();
      this.resetCountAndData();
      this.loadTableData();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LogsFilterModalComponent,
      cssClass: 'logs-filter-modal',
      showBackdrop: true,
      swipeToClose: true,
      componentProps: {
        filter: this.filter
      },
    });
    await modal.present();
    return modal;
  }

  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }
  ionViewWillLeave(){
    if (this.subList) {
      this.subList.unsubscribe();
    }
  }
  
}

