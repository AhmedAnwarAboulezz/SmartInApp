import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BaseClass } from 'src/app/base/components/base-component';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { FilterModalPage } from 'src/app/shared/@ui-components/admin-filter-modal/filter-modal/filter-modal.page';
import { RequestTypes } from 'src/app/shared/Enums/Enums';
import { Filter } from 'src/app/shared/models/filter';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { LanguageService } from '../../../../../../shared/translation/language.service';

@Component({
  selector: 'app-add-over-time',
  templateUrl: './add-over-time.component.html',
  styleUrls: ['./add-over-time.component.scss'],
})

export class AddOverTimeComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;

  isExpanded: boolean;

  model: any = {
    requestTypeId: RequestTypes.OverTime,
    approveOverTimeWithDetailsDto: {
      approveOverTime: {
        descriptionFl: null,
        descriptionSl: null,
        monthYear: null,
        comment: null,
        month : new Date().getMonth()+1,
        year : new Date().getFullYear()

      },
      approveOverTimeDetails: {}
    }
  };
  user: { EmployeeId: any; };
  overTimeType = overTimeTypes;
  requestTypes: any[] = [];
  filter: Filter = {
    monthYear : new Date().toDateString()
  };
  display = new DisplayProperty();
  employees: any = [];

  
  constructor(
    public modalController: ModalController, 
    private alertCtrl: AlertController,
    public base: BaseClass,
    public service: MyRequestService,
    public storage: IonicStorageService,
    public modal: OverPageModalService
    ) {
    this.display.monthYear = true;
    this.display.startDate = false;
    this.display.endDate = false;
    this.display.minimum = true;
  }


  overtimeFilter(filter: Filter) {
    this.service.overTimeFilter(filter).subscribe(item => {
      console.log('overtime', item);
      this.employees = item;
    });
  }



  async ngOnInit() {
    this.user = JSON.parse((await this.storage.get('inquiry-claims')).value);
  }

  ionViewWillEnter(): void {
    this.overtimeFilter(this.filter);
    this.model = {
      requestTypeId: RequestTypes.OverTime,
      approveOverTimeWithDetailsDto: {
        approveOverTime: {
          descriptionFl: null,
          descriptionSl: null,
          monthYear: null,
          comment: null,
          month : new Date().getMonth()+1,
          year : new Date().getFullYear()
        },
        approveOverTimeDetails: this.employees
      }
    };
  }

  showModal() {
    this.modal.template = this.filterContent;
    this.modal.toggleShow();
  }

  // toggleExpand() {
  //   this.isExpanded = !this.isExpanded;
  // }




  async add() {
    await this.presentConfirm();
  }

  setModel(claims): void {
    //this.model.requestTypeId = this.requestTypes[0].id;
    this.model.employeeId = claims.EmployeeId;
    this.model.employeeLeaveDto.employeeId = claims.EmployeeId;
  }



  async showFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      cssClass: 'attendance-filter-modal',
      showBackdrop: true,
      swipeToClose: true,
      componentProps: { filter: this.filter, display: this.display }
    });
    await modal.present();
    const data = await (await modal.onWillDismiss()).data;    
    if (data !== null && data !== undefined && data.dismissed == true) {
      this.filter = data.filter;
      let monthdate=new Date(this.filter.monthYear);
      this.model.approveOverTimeWithDetailsDto.approveOverTime.month = monthdate.getMonth()+1;
      this.model.approveOverTimeWithDetailsDto.approveOverTime.year = monthdate.getFullYear();
      this.overtimeFilter(this.filter);
    }

  }

  async presentConfirm() {
    const alert = this.alertCtrl.create({
      message: this.base.isEnglish() ? 'Do you want to continue?' : 'هل تريد الاستمرار؟',
      buttons: [
        {
          text: this.base.isEnglish() ? 'Cancel' : 'الغاء',
          role: 'cancel'
        },
        {
          text: this.base.isEnglish() ? 'Ok' : 'موافق',
          handler: () => {
            this.model.approveOverTimeWithDetailsDto.approveOverTime.monthYear = this.filter.monthYear;
            this.model.approveOverTimeWithDetailsDto.approveOverTimeDetails = this.employees;
            this.service.addRequest(this.model).subscribe((res: any) => {
              if (res === null) {
                this.base.toastSuccess('addSuccess');
                this.base.Redirect()
                // this.Route.navigate(['/main/my-request/overtime-tabs/overtime-tabs/overtime-pending']);
              }
            }, error => {
              this.base.toastError(error, false);
              console.log('error at add', error);
            });

          }
        }
      ]
    });
    await (await alert).present();
  }

 


  removeItem(item: any){
    this.employees = this.employees.filter(a=>a !== item);
  }

  remove(event){
    // let index = event.index;
    console.log(event);
    this.employees = this.employees.filter(a=>a !== event.item);

  }

  edit(event){
    console.log(event);
    this.employees[event.index] = event.item;

  }


}

export enum overTimeTypes {
  Morning = 1,
  Evening = 2,
  Weekend = 3,
  HolidayLeave = 4
}


export class DisplayProperty {
  dayDate = false;
  employee = true;
  administration = true;
  startDate = true;
  endDate = true;
  monthYear = false;
  status = false;
  minimum = false;
  leave = false;
  partPermission= false;
  fullPermission= false;
  allowance= false;
}
