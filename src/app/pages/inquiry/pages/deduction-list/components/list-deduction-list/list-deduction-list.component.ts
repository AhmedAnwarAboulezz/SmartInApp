import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { DeductionFilterModalComponent } from '../deduction-filter-modal/deduction-filter-modal.component';
import { DeductionService } from '../services/deduction.service';

@Component({
  selector: 'app-list-deduction-list',
  templateUrl: './list-deduction-list.component.html',
  styleUrls: ['./list-deduction-list.component.scss'],
})

export class ListDeductionListComponent extends BaseListComponent implements OnInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  mainUrl = 'LateRegulations/GetAllEmployeeDeductionPagedMobile';
  currentDate = new Date();
  filter = this.currentDate.getFullYear();

  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;

  get Service(): HttpService {
    return this.deductionService;
  }

  constructor(private deductionService: DeductionService, 
    public modalController: ModalController,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private route: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    ) {
      super(baseService,toast,load,route,localize);
    this.opt.limit = 13;
  }

  async openModal() {
    
    const modal = await this.presentModal();
    const data = await (await modal.onWillDismiss()).data;
    if (data !== null && data !== undefined && data.dismissed == true) {
      this.filter = data.year;
      //this.toggleInfiniteScroll();
       this.resetCountAndData();
       this.loadTableData();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: DeductionFilterModalComponent,
      cssClass: 'deduction-filter-modal',
      showBackdrop: true,
      swipeToClose: true,
      componentProps: {
        year: this.filter
      },
    });
    await modal.present();
    return modal;
  }
  

  ngOnInit() {
    this.resetCountAndData();
    super.loadTableData();
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
