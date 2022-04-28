import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { AllowanceFilterModalComponent } from '../allowance-filter-modal/allowance-filter-modal.component';
import { AllowanceSort } from '../models/allowance-sort';
import { AllowanceFilter } from '../models/filter';
import { AllowanceService } from '../services/allowance.service';

@Component({
  selector: 'app-list-allowance-list',
  templateUrl: './list-allowance-list.component.html',
  styleUrls: ['./list-allowance-list.component.scss'],
})

export class ListAllowanceListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  mainUrl = 'EmployeeAllowances/GetAllPagedMobile';
  sort = new AllowanceSort();
  alertCheckboxes: any[] = [];
  filter: AllowanceFilter = {
    startDate: new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('en-US')
    , endDate: new Date(new Date().getFullYear(), 11, 31).toLocaleDateString('en-US')
  };
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  get Service(): HttpService {
    return this.allowanceService;
  }

  constructor(private allowanceService: AllowanceService, 
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
      component: AllowanceFilterModalComponent,
      cssClass: 'allowance-filter-modal',
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
  //     component: AllowanceModalPage,
  //     componentProps: { filter: this.filter }
  //   });
  //   await modal.present();
  //   const data = await (await modal.onWillDismiss()).data;
  //   if(this.list.length > 0){
  //     this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  //   }
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
