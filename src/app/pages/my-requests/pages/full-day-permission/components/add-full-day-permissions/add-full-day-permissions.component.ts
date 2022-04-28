import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BaseClass } from 'src/app/base/components/base-component';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { RequestTypes, WeekDays } from 'src/app/shared/Enums/Enums';
import { LanguageService } from '../../../../../../shared/translation/language.service';

@Component({
  selector: 'app-add-full-day-permissions',
  templateUrl: './add-full-day-permissions.component.html',
  styleUrls: ['./add-full-day-permissions.component.scss'],
})


export class AddFullDayPermissionsComponent implements OnInit, OnDestroy {

  maxData : any = (new Date()).getFullYear() + 3;
  daysOfWeek: day[] = [];
  weekdayIds:any[]= [];
  user: { EmployeeId: any; };

  fulldayPermissionTypes: any[] = [];
  disableSave = false;

  constructor(
    public translate: TranslateService,
    public service: MyRequestService,
     public storage: IonicStorageService,
    public base: BaseClass,
    ) {
    for (let item of Object.keys(WeekDays)) {
      let result;
      translate.get(`weekday.${item}`).subscribe((text: string) => result = text);
      this.daysOfWeek.push({ name: result, value: WeekDays[item], isChecked: false, disabled: true });
    }
  }
  model: any = {
    requestTypeId: RequestTypes.FullDayPermision,
    employeeFullDayPermissionDto: {
      startDate: new Date(),
      endDate: new Date()
    }
  };
  

  async ngOnInit() {
    this.user = JSON.parse((await this.storage.get('inquiry-claims')).value);
  }

  ionViewWillEnter(): void {
    this.model.employeeFullDayPermissionDto = {
      startDate: new Date(),
      endDate: new Date()
    };
    this.model.employeeFullDayPermissionDto.fullDayPermissionWeekdays = [];
    this.weekdayIds= [];
   this.getFullPermissionTypes();

   this.base.showLoader();
    setTimeout(() => {
      this.base.hideLoader();
    }, 2000);
  }



  getFullPermissionTypes(): void {
    this.base.showLoader();
    this.service.getFullPermissionTypes().subscribe((res: any) => {
      this.fulldayPermissionTypes = res;
      this.base.hideLoader();
    });
  }
  


 
  openFileChooser() {
  }

  async add() {
    
    this.model.employeeFullDayPermissionDto.fullDayPermissionWeekdays = [];
    this.weekdayIds.forEach(element => {
      let fullDayPermissionWeekdays:any={
        weekdayId: element
      }
      this.model.employeeFullDayPermissionDto.fullDayPermissionWeekdays.push(fullDayPermissionWeekdays)
    });
    this.base.showLoader();
    this.disableSave = true;
    this.service.addRequest(this.model).subscribe((res: any) => {
      this.base.hideLoader();
      this.disableSave = false;
      if (res === null) {
        this.base.toastSuccess('addSuccess');
        this.base.Redirect();
      }
    }, error => {
      this.base.hideLoader();
      this.disableSave = false;
      this.base.toastError(error, false);
      console.log('error at add', error);
    });

  }



  loadImageFromDevice(event) {
    try {

      const file: File = event.target.files[0];
      if (file.size > 2000000) {
        this.base.toastError('max size is 2 mb', false);
        event.value = null;
      } else {
        this.model.employeeFullDayPermissionDto.filePath = file.name;
        // tslint:disable-next-line:no-shadowed-variable
        const reader = new FileReader();
        reader.addEventListener('load', (event1: any) => {
          const val = event1.target.result;
          this.model.employeeFullDayPermissionDto.fileName = val;
        });
        reader.readAsDataURL(file);
      }
    } catch (error) {
    }
  }




  calculateDates() {
    
    let startDate=this.model.employeeFullDayPermissionDto.startDate;
    let endDate=this.model.employeeFullDayPermissionDto.endDate;

    if ( !startDate || !endDate) {
      return;
    }

      var start = moment.parseZone(startDate);
      var end = moment.parseZone(endDate);
      var startDay = start.day();
      var endDay = end.day();
      var duration = moment.duration(end.diff(start));
      var differenceDays = duration.asDays();
      if (differenceDays >= 7) {
        this.daysOfWeek.forEach(item => {
          item.isChecked = true;
          item.disabled = false;
        });
      } 
      else {
        if (startDay > endDay) {
          this.daysOfWeek.forEach(item => {
            item.isChecked = true;
            item.disabled = false;
          });
          for (let i = endDay + 1; i < startDay; i++) {
            this.daysOfWeek[i].isChecked = false;
            this.daysOfWeek[i].disabled = true;
          }
        } 
        else {
          this.daysOfWeek.forEach(item => {
            item.isChecked = false;
            item.disabled = true;
          });
          for (let i = startDay; i <= endDay; i++) {
            this.daysOfWeek[i].isChecked = true;
            this.daysOfWeek[i].disabled = false;
          }
        }
      }
      this.weekdayIds = this.daysOfWeek.filter(e=>e.isChecked==true).map(o=>o.value);
      console.log( this.weekdayIds);
  }
  ngOnDestroy() {
  }
  ionViewWillLeave(){
  }


}
class day {
  name;
  value;
  isChecked:boolean = true;
  disabled:boolean = true;
}
