import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { LeavsBalanceFilterModalComponent } from '../leavs-balance-filter-modal/leavs-balance-filter-modal.component';
import { LeaveBalanceFilter } from '../models/filter';
import { LeaveBalanceService } from '../services/leave-balance.service';



@Component({
  selector: 'app-list-leavs-balance-list',
  templateUrl: './list-leavs-balance-list.component.html',
  styleUrls: ['./list-leavs-balance-list.component.scss'],
})



export class ListLeavsBalanceListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  mainUrl = 'EmployeeLeaves/GetEmployeeLeavesBalanceMobile';
  currentDate = new Date();
  filter: LeaveBalanceFilter = {
    year: this.currentDate.getFullYear()
  };

  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;


  get Service(): HttpService {
    return this.leaveBalanceService;
  }
  
  constructor(private leaveBalanceService: LeaveBalanceService, 
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
      component: LeavsBalanceFilterModalComponent,
      cssClass: 'leavs-balance-filter-modal',
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
  //     component: LeaveBalanceModalPage,
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