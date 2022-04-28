import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { FullDayFilterModalComponent } from '../full-day-filter-modal/full-day-filter-modal.component';
import { FullDayPermissionFilter } from '../models/filter';
import { FullDayPermissionSort } from '../models/full-day-permission-sort';
import { FullDayPermissionService } from '../services/full-day-permission.service';


@Component({
  selector: 'app-list-full-day-list',
  templateUrl: './list-full-day-list.component.html',
  styleUrls: ['./list-full-day-list.component.scss'],
})

export class ListFullDayListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  mainUrl = 'EmployeeFullDayPermissions/GetAllPagedMobile';
  filter: FullDayPermissionFilter = {
    startDate: new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('en-US')
    , endDate: new Date(new Date().getFullYear(), 11, 31).toLocaleDateString('en-US')
  };
  sort = new FullDayPermissionSort();
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  enabledFilter = false;
  
  get Service(): HttpService {
    return this.fullDayPermissionService;
  }
  

  constructor(private fullDayPermissionService: FullDayPermissionService, 
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
      this.opt.sortField = "startDate";
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
      component: FullDayFilterModalComponent,
      cssClass: 'full-day-filter-modal',
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
  // async showFilterModal() {
  //   const modal = await this.modalController.create({
  //     component: FullDayPermissionModalPage,
  //     componentProps: { filter: this.filter }
  //   });
  //   await modal.present();
  //   const data = await (await modal.onWillDismiss()).data;
  //   this.opt.offset = 1;

  //   if (data !== null && data !== undefined) {
  //     this.filter = data.filter;
  //   }
  //   this.resetCountAndData();
  //   this.loadTableData();
  // }
  
  ionViewWillLeave(){
    if (this.subList) {
      this.subList.unsubscribe();
    }
  }

}
