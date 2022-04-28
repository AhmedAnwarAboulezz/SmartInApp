import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { AllowanceSort } from 'src/app/pages/inquiry/pages/allowance-list/components/models/allowance-sort';
import { FilterModalPage } from 'src/app/shared/@ui-components/admin-filter-modal/filter-modal/filter-modal.page';
import { DisplayProperty } from 'src/app/shared/@ui-components/admin-filter-modal/models/displayProperty';
import { Filter } from 'src/app/shared/models/filter';
import { TabsService } from 'src/app/shared/services/tabs.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { LanguageService } from '../../../../../../shared/translation/language.service';
import { EmployeeAllowancesService } from '../services/employee-allowances.service';

@Component({
  selector: 'app-list-allowance-list',
  templateUrl: './list-allowance-list.component.html',
  styleUrls: ['./list-allowance-list.component.scss'],
})


export class ListAllowanceListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  mainUrl = 'EmployeeAllowances/GetAllPagedAdministrationDashboardMobile';
  fieldNames = ['startDate', 'startDate','employeeId'];
  display = new DisplayProperty();
  sort = new AllowanceSort();
    alertCheckboxes: any[] = [];
  filter: Filter = {};
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  get Service(): HttpService {
    return this.allowanceService;
  }
  constructor(
    public modalController: ModalController,
    private allowanceService: EmployeeAllowancesService,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private route: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    private tabs: TabsService    
    ) {
    super(baseService,toast,load,route,localize);
    this.display.allowance = true;

  }
  

  ngOnInit() {

    this.opt.sortDirection = "descending";
    this.opt.sortField = this.fieldNames[0];
    this.resetCountAndData();
    this.loadTableData();
  }
 

  sortData(data){
    if (data !== null && data !== undefined) {
      this.opt.sortField = data.column;
      this.opt.sortDirection = data.direction;
      this.sortTypeId = data.sortTypeId;
    }
    this.toggleInfiniteScroll();
    this.resetCountAndData();
    this.loadTableData();
  }


  
 

  


  async showFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      componentProps: { filter: this.filter, display: this.display }
    });
    await modal.present();
    const data = await (await modal.onWillDismiss()).data;
    if (data !== null && data !== undefined && data.dismissed == true) {
      this.filter = data.filter;
      this.toggleInfiniteScroll();
      this.resetCountAndData();
      this.loadTableData();
    }
  }
  

  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }
  
}
