import { Time } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSelect, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BaseClass } from 'src/app/base/components/base-component';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { PermissionTimes, RequestTypes } from 'src/app/shared/Enums/Enums';

@Component({
  selector: 'app-add-part-day-permissions',
  templateUrl: './add-part-day-permissions.component.html',
  styleUrls: ['./add-part-day-permissions.component.scss'],
})



export class AddPartDayPermissionsComponent implements OnInit, OnDestroy {
  //isLoading = true;
  //datasubject = new BehaviorSubject<Date>(new Date);
  maxData : any = (new Date()).getFullYear() + 3;
  logInTimes: Date[] = [];
  logOutTimes: Date[] = [];
  logInTime: string;
  logOutTime: string;
  disableSave = false;
  duty = { startTime: '00:00', endTime: '00:00', valid: false };
  employeeId;
  model = {
    requestTypeId: RequestTypes.Permisiion,
    valid: false,
    employeePermissionDto: {
      employeeId: '',
      totalAllowances: 0,
      balance: 0,
      remainingBalance: 0,
      numberOfTime: 0,
      remainingTime: 0,
      maxPeriod: 0,
      startDate: null,
      partialPermissionTypeId: 0,
      permissionTimeId: '',
      startTime: '',
      endTime: '',
      permissionDuration: 0,
      comment: '',
    }
  };

  permissionTypes: any[] = [];
  permissionTimes: any[] = [];
  permissionBalance: any;
  private subPermissionTypes: Subscription;
  private subPermissionTimes: Subscription;
  private subPermissionBalance: Subscription;
  private subDutyInfo: Subscription;
  
  constructor(
    private Service: MyRequestService,
    public base: BaseClass,
    private storage: IonicStorageService
    ) {
    this.model.employeePermissionDto = {
      employeeId: '',
      totalAllowances: 0,
      balance: 0,
      remainingBalance: 0,
      numberOfTime: 0,
      remainingTime: 0,
      maxPeriod: 0,
      startDate: new Date().toLocaleDateString('en-US'),
      partialPermissionTypeId: 0,
      permissionTimeId: '',
      startTime: '',
      endTime: '',
      permissionDuration: 0,
      comment: '',
    };
  }

  async ngOnInit(){
    await this.getclaimInfo();
    //this.fillDate(this.base.dayDate);
    //this.getPermissionBalance(true);
  }
  async ionViewWillEnter() {
    this.getPermissionTimes();
    this.getPermissionTypes();
    this.base.showLoader();
    setTimeout(() => {
      this.base.hideLoader();
      this.fillDate();
      this.getDutyWithLogs();
    }, 2000);

  }

  // ionViewDidEnter(){
  //   this.fillDate();
  //   this.getDutyWithLogs();
  // }
  

  getPermissionTypes(): void {
    this.subPermissionTypes = this.Service.getPermissionTypes().subscribe((res: any) => {
      this.permissionTypes = res;
    });
  }

  getPermissionTimes(): void {
    this.subPermissionTimes = this.Service.getPermissionTimes().subscribe((res: any) => {
      this.permissionTimes = res;
      this.getPermissionBalance(false);
    });
  }

  async getDutyInfo() {
    
    if(this.employeeId == null || this.employeeId == '')
    {
      await this.getclaimInfo();      
    }    
    this.duty.startTime = '';
    this.duty.endTime = '';
    this.duty.valid = false;
    this.model.valid = false;
    this.model.employeePermissionDto.startTime = '';
    this.model.employeePermissionDto.endTime = '';
    this.model.employeePermissionDto.permissionDuration = 0;
    if(this.employeeId != null && this.employeeId !== '')
    {
      const model = {
        employeeId: this.employeeId,
        dayDate: this.model.employeePermissionDto.startDate
      };
      this.subDutyInfo = this.Service.getDutyTime(model).subscribe((res: any) => {
        //this.isLoading = false;
        this.duty.startTime = res.timeDetails[0].startTime.slice(0, -3);
        this.duty.endTime = res.timeDetails[0].endTime.slice(0, -3);
        this.duty.valid = true;
        if (res.isWeekEnd || res.isHoliday ) {
          this.base.toastError('inValidDaySelected');
          this.duty.valid = false;
          this.model.valid = false;
          return false;
        }
        this.getBalanceInfo();
      }, error => {
        //this.isLoading = false;
        this.base.toastError(error, false,0,10000);
        this.model.valid = false;
      });
    }
  }

  getBalanceInfo() {
    if (this.model.employeePermissionDto.partialPermissionTypeId === 0 ||
         this.model.employeePermissionDto.permissionTimeId === '') {
      this.setModelBalance(null);
      return;
    }
    const permissionBalanceModel = {
      employeeId: this.employeeId,
      permissionTypeId: this.model.employeePermissionDto.partialPermissionTypeId,
      permissionTimeId: this.model.employeePermissionDto.permissionTimeId,
      startDate: this.model.employeePermissionDto.startDate
    };
    this.subPermissionBalance = this.Service.getPermissionBalance(permissionBalanceModel).subscribe((res: any) => {
      // this.getPermissionBalance = res;
     // console.log('getPermissionBalance', res);
      this.setModelBalance(res);
    }, error => {
      this.base.toastError(error, false);
      this.model.valid = false;
    });
  }

  getPermissionBalance(getLogs:boolean) {  
    this.getDutyInfo();
    this.getBalanceInfo();
    if(getLogs==true)
    {
     this.getEmployeeLogs();
    }
  }

  async getEmployeeLogs() {
    if(this.employeeId == null || this.employeeId == '')
    {
      await this.getclaimInfo();      
    }  
    const model = {
      employeeId: this.employeeId,
      dayDate: this.model.employeePermissionDto.startDate
    };
    this.Service.getEmployeeLogs(model).subscribe(result => {
      this.logInTimes = this.formateTimeList(result.logInTimes, this.duty.startTime, true);
      this.logOutTimes = this.formateTimeList(result.logOutTimes, this.duty.endTime);
      this.logInTime = this.logInTimes.length != 0 ? moment(new Date(Math.min.apply(null, this.logInTimes)), "yyyy-mmm-ddd hh:mm").format("HH:mm") : null;
      this.logOutTime = this.logOutTimes.length != 0 ? moment(new Date(Math.min.apply(null, this.logOutTimes)), "yyyy-mmm-ddd hh:mm").format("HH:mm") : null;
    }, () => {
      this.logInTimes = null;
      this.logOutTimes = null;
    });
  }
   getEmployeeLogsWithBalance() {
    const model = {
      employeeId: this.employeeId,
      dayDate: this.model.employeePermissionDto.startDate
    };
    this.Service.getEmployeeLogs(model).subscribe(result => {
      this.logInTimes = this.formateTimeList(result.logInTimes, this.duty.startTime, true);
      this.logOutTimes = this.formateTimeList(result.logOutTimes, this.duty.endTime);
      this.logInTime = this.logInTimes.length != 0 ? moment(new Date(Math.min.apply(null, this.logInTimes)), "yyyy-mmm-ddd hh:mm").format("HH:mm") : null;
      this.logOutTime = this.logOutTimes.length != 0 ? moment(new Date(Math.min.apply(null, this.logOutTimes)), "yyyy-mmm-ddd hh:mm").format("HH:mm") : null;
      this.getBalanceInfo();
    }, () => {
      this.logInTimes = null;
      this.logOutTimes = null;
      this.getBalanceInfo();
    });
  }



  async getDutyWithLogs() {
    
    if(this.employeeId == null || this.employeeId == '')
    {
      await this.getclaimInfo();      
    }    
    this.duty.startTime = '';
    this.duty.endTime = '';
    this.duty.valid = false;
    this.model.valid = false;
    this.model.employeePermissionDto.startTime = '';
    this.model.employeePermissionDto.endTime = '';
    this.model.employeePermissionDto.permissionDuration = 0;
    if(this.employeeId != null && this.employeeId !== '')
    {
      const model = {
        employeeId: this.employeeId,
        dayDate: this.model.employeePermissionDto.startDate
      };
      this.subDutyInfo = this.Service.getDutyTime(model).subscribe((res: any) => {
        //this.isLoading = false;
        this.duty.startTime = res.timeDetails[0].startTime.slice(0, -3);
        this.duty.endTime = res.timeDetails[0].endTime.slice(0, -3);
        this.duty.valid = true;
        if (res.isWeekEnd || res.isHoliday ) {
          this.base.toastError('inValidDaySelected');
          this.duty.valid = false;
          this.model.valid = false;
          return false;
        }
        this.getBalanceInfo();
        this.getEmployeeLogsWithBalance();
      }, error => {
        //this.isLoading = false;
        this.base.toastError(error, false,0,10000);
        this.model.valid = false;
      });
    }
  }

  formateTimeList(allTimes: Time[], dateExclude: string, isLogInTime = false): Date[] {
    let formattedtimes: Date[] = [];
    let dateExcludeFormate: Date;
    let dateExcludeSplit = dateExclude.toString().split('.')[0].split(':');
    dateExcludeFormate = new Date("1990-01-01 " + dateExcludeSplit[0] + ':' + dateExcludeSplit[1]);
    allTimes.forEach(element => {
      let newtime: Date;
      let timeSplit = element.toString().split('.')[0].split(':');
      newtime = new Date("1990-01-01 " + timeSplit[0] + ':' + timeSplit[1]);
      if (isLogInTime) {
        if (newtime > dateExcludeFormate)
          formattedtimes.push(newtime);
      } else {
        if (newtime < dateExcludeFormate)
          formattedtimes.push(newtime);
      }
    });
    return formattedtimes;
  }

  CalculateTimes() {
    var enddate = '';
    var startdate = '';
    this.model.employeePermissionDto.permissionDuration = 0;
    this.model.valid = false;
    this.model.employeePermissionDto.startTime = '';
    this.model.employeePermissionDto.endTime = '';
    if (this.model.employeePermissionDto.permissionTimeId === PermissionTimes.Start) {
      this.model.employeePermissionDto.startTime = this.duty.startTime;
      if (this.logInTime == null) {
        let newtime: Date;
        let timeSplit = this.duty.startTime.toString().split('.')[0].split(':');
        newtime = new Date("1990-01-01 " + timeSplit[0] + ':' + timeSplit[1]);
        newtime.setTime(newtime.getTime() + this.model.employeePermissionDto.maxPeriod * 60000)
        enddate = moment(newtime, "yyyy-mmm-ddd hh:mm").format("HH:mm")
      } else
        enddate = this.logInTime;
      this.model.employeePermissionDto.endTime = enddate;
      // EndTime
      // اول بصمه دخول لو موجودة بعد بداية الدوام
      // مش موجودة يبقي ياخد وقت البداية + مده الاستئذان
      const defaultDate = new Date().toDateString();
      const actuallyEndTime = new Date(` ${defaultDate} ${this.duty.startTime}`);
      actuallyEndTime.setMinutes(this.model.employeePermissionDto.maxPeriod);

    } else if (this.model.employeePermissionDto.permissionTimeId === PermissionTimes.End) {
      //startTime
      // اخر بصمه خروج قبل نهاية الدوام لو موجودة 
      // مش موجودة يبقي ياخد نهاية الدوام -  مده الاستئذان
      this.model.employeePermissionDto.endTime = this.duty.endTime;
      if (this.logOutTime == null) {
        let newtime: Date;
        let timeSplit = this.duty.endTime.toString().split('.')[0].split(':');
        newtime = new Date("1990-01-01 " + timeSplit[0] + ':' + timeSplit[1]);
        newtime.setTime(newtime.getTime() - this.model.employeePermissionDto.maxPeriod * 60000)
        startdate = moment(newtime, "yyyy-mmm-ddd hh:mm").format("HH:mm")
      } else
        startdate = this.logOutTime;
      this.model.employeePermissionDto.startTime = startdate;

    }
   // console.log(this.model.employeePermissionDto.startTime);
  }



  async getclaimInfo() {    
    let claimsToken: any = (await this.storage.get('inquiry-claims')).value;
    const claims = JSON.parse(claimsToken);
     this.employeeId = claims.EmployeeId;
     this.model.employeePermissionDto.employeeId = claims.EmployeeId;
  }

  onStartTimeChange(target) {
    let value = target.value;
    this.model.employeePermissionDto.startTime = value;
    this.CallTimeChanged();
  }

  onEndTimeChange(target) {
    let value = target.value;
    this.model.employeePermissionDto.endTime = value;
    this.CallTimeChanged();
  }

  CallTimeChanged() {
    this.model.valid = false;
    


    this.model.employeePermissionDto.permissionDuration = 0;
    const stime = this.model.employeePermissionDto.startTime;
    const etime = this.model.employeePermissionDto.endTime;
    if (stime !== '' && etime !== '') {
      const defaultDate = new Date().toDateString();
      const actuallyStartTime = new Date(` ${defaultDate} ${stime}`);
      const actuallyEndTime = new Date(` ${defaultDate} ${etime}`);
      if (actuallyEndTime > actuallyStartTime) {
        const dur = this.calculateMinutes(actuallyStartTime, actuallyEndTime);
        this.model.employeePermissionDto.permissionDuration = dur;
        if (dur > this.model.employeePermissionDto.maxPeriod && this.model.employeePermissionDto.maxPeriod !== 0) {
          this.base.toastError('invalidMaxDurationPermission');
        } else if (dur > this.model.employeePermissionDto.remainingBalance) {
          this.base.toastError('invalidBalance');
        } else if (this.model.employeePermissionDto.remainingTime < 1 && this.model.employeePermissionDto.numberOfTime !== 0) {
          this.base.toastError('invalidCount');
        } else {
          this.model.valid = true;
        }
      } else {
        this.base.toastError('WronEndDate');
      }
    }
  }

  calculateMinutes(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  substringSeconds(res: any): void {
    const startParts = res.timeDetails[0].startTime.split(':');
    const endParts = res.timeDetails[0].endTime.split(':');
    this.model.employeePermissionDto.startTime = startParts[0] + ':' + startParts[1];
    this.model.employeePermissionDto.endTime = endParts[0] + ':' + endParts[1];
  }

  setModelBalance(balanceDto): void {
    if (!this.duty.valid || balanceDto == null) {
      this.model.employeePermissionDto.totalAllowances = 0;
      this.model.employeePermissionDto.balance = 0;
      this.model.employeePermissionDto.remainingBalance = 0;
      this.model.employeePermissionDto.numberOfTime = 0;
      this.model.employeePermissionDto.remainingTime = 0;
      this.model.employeePermissionDto.maxPeriod = 0;
      return;
    }
    this.model.employeePermissionDto.totalAllowances = balanceDto.totalallowances;
    this.model.employeePermissionDto.balance = balanceDto.balance;
    this.model.employeePermissionDto.remainingBalance = balanceDto.remainingBalance;
    this.model.employeePermissionDto.numberOfTime = balanceDto.numberOfTime;
    this.model.employeePermissionDto.remainingTime = balanceDto.remainingTime;
    this.model.employeePermissionDto.maxPeriod = balanceDto.maxPeriod;
    this.CalculateTimes()
    this.CallTimeChanged();
  }

  async add() {
    this.base.showLoader();
    this.disableSave = true;
    this.Service.addRequest(this.model).subscribe((res: any) => {
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
    });

  }


  ngOnDestroy() {
    if (this.subDutyInfo) {
      this.subDutyInfo.unsubscribe();
    }
    if (this.subPermissionBalance) {
      this.subPermissionBalance.unsubscribe();
    }
    if (this.subPermissionTimes) {
      this.subPermissionTimes.unsubscribe();
    }
    if (this.subPermissionTypes) {
      this.subPermissionTypes.unsubscribe();
    }
  }
  
  fillDate(){
    
    this.model.employeePermissionDto.startDate = new Date().toLocaleDateString('en-US');
  }
  
}
