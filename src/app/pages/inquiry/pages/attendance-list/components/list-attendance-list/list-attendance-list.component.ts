import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { AttendanceSort } from 'src/app/pages/attendance-list/models/attendance-sort';
import { AttendanceFilter } from 'src/app/pages/attendance-list/models/filter';
import { TabsService } from 'src/app/shared/services/tabs.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { LanguageService } from '../../../../../../shared/translation/language.service';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceFilterModalComponent } from '../attendance-filter-modal/attendance-filter-modal.component';

@Component({
  selector: 'app-list-attendance-list',
  templateUrl: './list-attendance-list.component.html',
  styleUrls: ['./list-attendance-list.component.scss'],
})

export class ListAttendanceListComponent extends BaseListComponent implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  get Service(): HttpService {
    return this.attendanceService;
  }
  enabledFilter = false;
  mainUrl = 'Reports/GetEmployeeAttendanceMobile';
  filter: AttendanceFilter = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString('en-US')
    , endDate: new Date().toLocaleDateString('en-US')
  };
  sort = new AttendanceSort();
  constructor(
    public modalController: ModalController,
    private attendanceService: AttendanceService,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private router: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    private tabs: TabsService  ,
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
  }

  ngOnDestroy(): void {
  }


ionViewDidLeave() {
  //this.tabs.hideTabs();
}
  ngOnInit() {
    this.opt.sortDirection = this.sort.direction;
    this.opt.sortField = this.sort.column;
    this.resetCountAndData();
    this.loadTableData();
  }
  ionViewWillEnter() {
    //this.resetCountAndData();
    //this.loadTableData();
    //this.tabs.showTabs();
  }

  async openModal() {
    
    const modal = await this.presentModal();
    const data = await (await modal.onWillDismiss()).data;
    if (data !== null && data !== undefined && data.dismissed == true) {
      this.opt.offset = 1;
      this.filter = data.filter;
      this.toggleInfiniteScroll();
      this.resetCountAndData();
      this.loadTableData();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AttendanceFilterModalComponent,
      cssClass: 'attendance-filter-modal',
      showBackdrop: true,
      swipeToClose: true,
      componentProps: {
        filter: this.filter
        //attendanceItems: this.attendanceItems,
      },
    });
    await modal.present();
    return modal;
  }



  sortData(data){
    if (data !== null && data !== undefined) {
      this.opt.sortField = "signIn";
      this.opt.sortDirection = data.direction;
      //this.ascSortType = data.ascSortType;
    }
    this.opt.offset = 1;
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
