import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { FilterModalPage } from 'src/app/shared/@ui-components/admin-filter-modal/filter-modal/filter-modal.page';
import { DisplayProperty } from 'src/app/shared/@ui-components/admin-filter-modal/models/displayProperty';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { Filter } from 'src/app/shared/models/filter';
import { EmployeesDeductionsService } from '../services/employees-deductions.service';

@Component({
  selector: 'app-list-deduction-list',
  templateUrl: './list-deduction-list.component.html',
  styleUrls: ['./list-deduction-list.component.scss'],
})


export class ListDeductionListComponent extends BaseListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  mainUrl = 'LateRegulations/GetAdministrationDeductionPagedMobile';
  filter: Filter = {};
  //sort: any = null;
  dayDate = new Date();
  display = new DisplayProperty();
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  get Service(): HttpService {
    return this.empDeducServ;
  }
  constructor(private empDeducServ: EmployeesDeductionsService, 
    public modalController: ModalController,
    private baseService: BaseService,
    private toast: ToastController,
    private load: LoadingService,
    private route: Router,
    public localize: TranslationService,
    public modal: OverPageModalService,
    ) {
      super(baseService,toast,load,route,localize);
      this.display.startDate = false;
      this.display.endDate = false;
      this.filter.monthYear = new Date().toLocaleDateString();
  }

 

  ngOnInit() {
    this.resetCountAndData();
    super.loadTableData();
  }
  
  
  toggleInfiniteScroll() { 
    this.infiniteScroll.disabled = false;
  }

  



  
  async showFilterModal() {
    this.display.dayDate = false;
    this.display.monthYear = true;
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

  
}