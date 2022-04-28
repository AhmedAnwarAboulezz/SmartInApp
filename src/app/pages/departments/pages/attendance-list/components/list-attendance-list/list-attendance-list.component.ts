import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { LanguageService } from '../../../../../../shared/translation/language.service';
import { AdministrationAttendanceService } from '../services/administration-attendance.service';

@Component({
  selector: 'app-list-attendance-list',
  templateUrl: './list-attendance-list.component.html',
  styleUrls: ['./list-attendance-list.component.scss'],
})


export class ListAttendanceListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  sort = new AttendanceSort();
  display = new DisplayProperty();
  

  mainUrl = 'Reports/GetAdministrationAttendanceMobile';
  fieldNames = ['signIn', 'signIn','employeeId'];
  filter: Filter = {
    startDate: new Date().toLocaleDateString('en-US'), endDate: new Date().toLocaleDateString('en-US')
  };
  

  get Service(): HttpService {
    return this.administrationAttendanceService;
  }

  constructor(
    public modalController: ModalController,
    private administrationAttendanceService: AdministrationAttendanceService,
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
    this.filter.statusIdList = [];
    if(filterName != null){
        filterName = filterName.replace("{","");
        filterName = filterName.replace("}","");       

      if(filterName.toString().includes(',')){
        filterName.split(",").forEach(element => {
          this.filter.statusIdList.push(element);
        });
      }
      else {
        this.filter.statusIdList.push(filterName);
      }
    }
    this.display.status = true;

  }

 

  ngOnInit() {
    this.opt.sortDirection = "descending";
    this.opt.sortField = this.fieldNames[0];
    this.resetCountAndData();
    this.loadTableData();
  }
  // sortData(data){
  //   if (data !== null && data !== undefined) {
  //     this.opt.sortField = "signIn";
  //     this.opt.sortDirection = data.direction;
  //     //this.ascSortType = data.ascSortType;
  //   }
  //   this.toggleInfiniteScroll();
  //   this.resetCountAndData();
  //   this.loadTableData();  
  // }

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
