import {
  ContentChild,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { OverPageModalService } from '../../shared/@ui-components/over-page-modal/over-page-modal.service';

import { TabsService } from '../../shared/services/tabs.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { HttpService } from 'src/app/core/services/http/http.service';

import { IAttendanceItem } from '../../shared/models';
import { AttendanceFilterModalComponent } from './components/attendance-filter-modal/attendance-filter-modal.component';
import { AttendanceService } from './services/attendance.service';
import { BaseService } from 'src/app/base/services/base.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { AttendanceSort } from './models/attendance-sort';
import { AttendanceFilter } from './models/filter';

@Component({
  selector: 'app-attendance-list',
  templateUrl: 'attendance-list.page.html',
  styleUrls: ['attendance-list.page.scss'],
})
export class AttendanceListPage extends BaseListComponent implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  get Service(): HttpService {
    return this.attendanceService;
  }
  enabledFilter = false;
  mainUrl = 'Reports/GetEmployeeAttendanceMobile';
  filter: AttendanceFilter = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString('en-US')
    , endDate: new Date().toLocaleDateString('en-US')
  };
  sort = new AttendanceSort();
  constructor(
    public modalController: ModalController,
    private attendanceService: AttendanceService,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private route: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    private tabs: TabsService    
    ) {
    super(baseService,toast,load,route,localize);
  }

  ngOnDestroy(): void {
  }


ionViewDidLeave() {
  //this.tabs.hideTabs();
}
  ngOnInit() {
    this.opt.sortDirection = this.sort.direction;
    this.opt.sortField = this.sort.column;
  }
  ionViewWillEnter() {
    this.resetCountAndData();
    this.loadTableData();
    //this.tabs.showTabs();
  }

  async openModal() {
    
    const modal = await this.presentModal();
    const data = await (await modal.onWillDismiss()).data;
    if (data !== null && data !== undefined && data.dismissed == true) {
      this.opt.offset = 1;
      this.filter = data.filter;
      this.toggleInfiniteScroll();
      this.resetCountAndData();
      this.loadTableData();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AttendanceFilterModalComponent,
      cssClass: 'attendance-filter-modal',
      showBackdrop: true,
      swipeToClose: true,
      componentProps: {
        filter: this.filter
        //attendanceItems: this.attendanceItems,
      },
    });
    await modal.present();
    return modal;
  }

  showModal() {
    this.modal.template = this.filterContent;
    this.modal.toggleShow();
  }

  toggleFilter() {
    this.enabledFilter = !this.enabledFilter;
  }


  sortData(data){
    if (data !== null && data !== undefined) {
      this.opt.sortField = "signIn";
      this.opt.sortDirection = data.direction;
      this.ascSortType = data.ascSortType;
    }
    this.opt.offset = 1;
    this.toggleInfiniteScroll();
    this.resetCountAndData();
    this.loadTableData();  
  }
  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }
}
