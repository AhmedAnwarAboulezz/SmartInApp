import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { AttendanceSort } from 'src/app/pages/attendance-list/models/attendance-sort';
import { FilterModalPage } from 'src/app/shared/@ui-components/admin-filter-modal/filter-modal/filter-modal.page';
import { DisplayProperty } from 'src/app/shared/@ui-components/admin-filter-modal/models/displayProperty';
import { Filter } from 'src/app/shared/models/filter';
import { TabsService } from 'src/app/shared/services/tabs.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { EmployeesLatesService } from '../services/employees-lates.service';

@Component({
  selector: 'app-list-lates-list',
  templateUrl: './list-lates-list.component.html',
  styleUrls: ['./list-lates-list.component.scss'],
})


export class ListLatesListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  get Service(): HttpService {
    return this.employeesLatesService;
  }
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>; 
 mainUrl = 'Reports/GetAllLatesAdministrationDashboardMobile';
 display = new DisplayProperty();
 fieldNames = ['signIn', 'signIn','employeeId'];
 constructor(
  public modalController: ModalController,
  private employeesLatesService: EmployeesLatesService,
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

  sort = new AttendanceSort();
  filter: Filter = {};
  dayDate = new Date();
  ngOnInit() {
    // this.opt.sortDirection = this.sort.direction;
    // this.opt.sortField = this.sort.column;
    this.opt.sortDirection = "descending";
    this.opt.sortField = this.fieldNames[0];
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


  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }

  
}
