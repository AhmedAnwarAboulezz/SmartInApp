import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { PartDayPermissionBalanceFilter } from '../models/filter';
import { PartDayBalanceFilterModalComponent } from '../part-day-balance-filter-modal/part-day-balance-filter-modal.component';
import { PartDayPermissionBalanceService } from '../services/part-day-permission-balance.service';


@Component({
  selector: 'app-list-part-day-balance-list',
  templateUrl: './list-part-day-balance-list.component.html',
  styleUrls: ['./list-part-day-balance-list.component.scss'],
})




export class ListPartDayBalanceListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  mainUrl = 'EmployeePermissions/GetAllPermissionBalancesForNewMobile';
  filter: any = { monthYear: new Date().toDateString() };

  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  enabledFilter = false;
  
  get Service(): HttpService {
    return this.partDayPermissionBalanceService;
  }

  constructor(private partDayPermissionBalanceService: PartDayPermissionBalanceService, 
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
      component: PartDayBalanceFilterModalComponent,
      cssClass: 'part-day-balance-filter-modal',
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