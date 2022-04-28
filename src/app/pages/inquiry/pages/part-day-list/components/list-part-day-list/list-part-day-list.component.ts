import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { TabsService } from 'src/app/shared/services/tabs.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { LanguageService } from '../../../../../../shared/translation/language.service';
import { PartDayPermissionFilter } from '../models/filter';
import { PartDayPermissionSort } from '../models/part-day-permission-sort';
import { PartDayFilterModalComponent } from '../part-day-filter-modal/part-day-filter-modal.component';
import { PartDayPermissionService } from '../services/part-day-permission.service';

@Component({
  selector: 'app-list-part-day-list',
  templateUrl: './list-part-day-list.component.html',
  styleUrls: ['./list-part-day-list.component.scss'],
})


export class ListPartDayListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  mainUrl = 'EmployeePermissions/GetAllPagedMobile';
  filter: PartDayPermissionFilter = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString('en-US')
    , endDate: new Date().toLocaleDateString('en-US')
  };
  sort = new PartDayPermissionSort();
  
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  enabledFilter = false;
  
  get Service(): HttpService {
    return this.partDayPermissionService;
  }

  constructor(private partDayPermissionService: PartDayPermissionService, 
    public modalController: ModalController,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private router: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    public route: ActivatedRoute  
    ) {
      super(baseService,toast,load,router,localize);
    let filterName = this.route.snapshot.queryParams.filterId;
    this.filter.partialPermissionTypeId = [];
    if(filterName != null){
        filterName = filterName.replace("{","");
        filterName = filterName.replace("}","");       

      if(filterName.toString().includes(',')){
        filterName.split(",").forEach(element => {
          this.filter.partialPermissionTypeId.push(element);
        });
      }
      else {
        this.filter.partialPermissionTypeId.push(filterName);
      }
    }
    
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
      component: PartDayFilterModalComponent,
      cssClass: 'part-day-filter-modal',
      showBackdrop: true,
      swipeToClose: true,
      componentProps: {
        filter: this.filter
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

  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }

  ionViewWillLeave(){
    if (this.subList) {
      this.subList.unsubscribe();
    }
  }


}
