import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { LogSort } from 'src/app/pages/inquiry/pages/logs-list/components/models/log-sort';
import { LogService } from 'src/app/pages/inquiry/pages/logs-list/components/services/log.service';
import { FilterModalPage } from 'src/app/shared/@ui-components/admin-filter-modal/filter-modal/filter-modal.page';
import { DisplayProperty } from 'src/app/shared/@ui-components/admin-filter-modal/models/displayProperty';
import { Filter } from 'src/app/shared/models/filter';
import { TabsService } from 'src/app/shared/services/tabs.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';

@Component({
  selector: 'app-list-admin-list',
  templateUrl: './list-admin-list.component.html',
  styleUrls: ['./list-admin-list.component.scss'],
})

export class ListAdminListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  mainUrl = 'EmployeeAttedanceLogs/GetAllPagedAdministrationMobile';
  fieldNames = ['timeEntry', 'timeEntry','employeeId','logTypeId'];

  display = new DisplayProperty();
  dayDate = new Date();
  log: any = {
  };
  filter: Filter = {};
  //logTypes = LogType;
  sort = new LogSort();

  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  get Service(): HttpService {
    return this.logService;
  }
  constructor(
    public modalController: ModalController,
    private logService: LogService,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private route: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    private tabs: TabsService    
    ) {
    super(baseService,toast,load,route,localize);
    this.display.startDate = false;
    this.display.endDate = false;
    this.display.dayDate = true;

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
  ngOnInit() {
    this.opt.sortDirection = "descending";
    this.opt.sortField = this.fieldNames[0];
    this.resetCountAndData();
    this.loadTableData();
    this.dayDate = this.filter.dayDate === undefined ? new Date() : new Date(this.filter.dayDate);

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
