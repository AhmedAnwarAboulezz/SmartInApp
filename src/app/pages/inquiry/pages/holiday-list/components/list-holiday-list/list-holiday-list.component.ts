import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { HolidayFilterModalComponent } from '../holiday-filter-modal/holiday-filter-modal.component';
import { HolidayFilter } from '../models/filter';
import { HolidaySort } from '../models/holiday-sort';
import { HolidayService } from '../services/holiday.service';

@Component({
  selector: 'app-list-holiday-list',
  templateUrl: './list-holiday-list.component.html',
  styleUrls: ['./list-holiday-list.component.scss'],
})

export class ListHolidayListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  mainUrl = 'HolidayDates/GetAllPagedMobile';
  //list: Holiday[] = [];
  filter: HolidayFilter = {
    startDate: new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('en-US')
    , endDate: new Date(new Date().getFullYear(), 11, 31).toLocaleDateString('en-US')
  };
  sort = new HolidaySort();


  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  get Service(): HttpService {
    return this.holidayService;
  }

  constructor(private holidayService: HolidayService, 
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
      component: HolidayFilterModalComponent,
      cssClass: 'holiday-filter-modal',
      showBackdrop: true,
      swipeToClose: true,
      componentProps: {
        filter: this.filter
      },
    });
    await modal.present();
    return modal;
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

  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }
  ionViewWillLeave(){
    if (this.subList) {
      this.subList.unsubscribe();
    }
  }

}