import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BaseClass } from 'src/app/base/components/base-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { RequestTypes } from 'src/app/shared/Enums/Enums';
import { LanguageService } from '../../../../../../shared/translation/language.service';

@Component({
  selector: 'app-request-leave',
  templateUrl: './add-request-leave.component.html',
  styleUrls: ['./add-request-leave.component.scss'],
})
// export class AddRequestLeaveComponent implements OnInit {
//   constructor(public localize: TranslationService) {}

//   ngOnInit() {}

//   // openeditprofile() {
//   //   let actionSheet = this.actionsheetCtrl.create({
//   //     title: 'Option',
//   //     cssClass: 'action-sheets-basic-page',
//   //     buttons: [
//   //       {
//   //         text: 'Take photo',
//   //         role: 'destructive',
//   //         handler: () => {
//   //           this.captureImage(false);
//   //         },
//   //       },
//   //       {
//   //         text: 'Choose photo from Gallery',
//   //         handler: () => {
//   //           this.captureImage(true);
//   //         },
//   //       },
//   //     ],
//   //   });
//   //   actionSheet.present();
//   // }
//   // async captureImage(useAlbum: boolean) {
//   //   const options: CameraOptions = {
//   //     quality: 50,
//   //     destinationType: this.camera.DestinationType.DATA_URL,
//   //     encodingType: this.camera.EncodingType.PNG,
//   //     mediaType: this.camera.MediaType.PICTURE,
//   //     targetWidth: 500,
//   //     targetHeight: 500,
//   //     ...(useAlbum
//   //       ? { sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM }
//   //       : {}),
//   //   };

//   //   const imageData = await this.camera.getPicture(options);
//   //   this.base64Image = `data:image/png;base64,${imageData}`;
//   //   this.photos.push(imageData);
//   //   this.photosCounter.counter.push(this.counter++);
//   // }
// }

export class AddRequestLeaveComponent implements OnInit, OnDestroy {
  maxData : any = (new Date()).getFullYear() + 3;
  model: any = {
    requestTypeId: RequestTypes.Leave,
    employeeLeaveDto: {
      startDate: new Date().toLocaleDateString('en-US'),
      endDate: new Date().toLocaleDateString('en-US'),
    }
  };
  
  user: { EmployeeId: any; };
  showUnPaid = false;
  showUnpaidCheckBox = false;
  leaveTypes: any[] = [];
  oldleftBalanceVal: number;
  disableSave = false;
  leftBalanceCast='';
  constructor(
    private Service: MyRequestService,
    public base: BaseClass,
    private storage: IonicStorageService
  ) {
  }


  async ngOnInit() {
    this.user = JSON.parse((await this.storage.get('inquiry-claims')).value);
    //this.fillDate(new Date, 'start');
    this.getLeaveAvailableBalance();
  }

  ionViewWillEnter(): void {

    this.model.employeeLeaveDto = {
      startDate: new Date(),
      endDate: new Date(),
    };
    this.getLeaveTypes();
    this.base.showLoader();
    setTimeout(() => {
      this.base.hideLoader();
    }, 2000);
  }



  getLeaveTypes(): void {
    this.base.showLoader();
    this.Service.getLeaveRegulationTypes(this.user.EmployeeId).subscribe((res: any) => {
      this.leaveTypes = res;
      this.base.hideLoader();
    });
  }
  getLeaveAvailableBalance() {
    if (this.model && this.model.employeeLeaveDto
      && this.model.employeeLeaveDto.leaveRegulationId
      && this.model.employeeLeaveDto.startDate && this.model.employeeLeaveDto.endDate) 
      {
        this.base.showLoader();
        const model = {
          leaveRegulationId: this.model.employeeLeaveDto.leaveRegulationId,
          employeeId: this.user.EmployeeId,
          leaveStartDate: this.model.employeeLeaveDto.startDate,
          leaveEndDate: this.model.employeeLeaveDto.endDate
        };
        this.Service.getLeaveAvailableBalance(model).subscribe((res: any) => {
          this.getActualDays(res < 0 ? 0 : res);
          this.base.hideLoader();
        });
      }
  }

  async getActualDays(balanceVal) {
    if (this.model.employeeLeaveDto.leaveRegulationId == null) {
      await this.base.toastInformation('SelectLeaveType');
      return;
    }
    if (this.model.employeeLeaveDto.startDate == null || this.model.employeeLeaveDto.startDate == null) {
      await this.base.toastInformation('SelectStartDate');
      return;
    }
    if (this.model.employeeLeaveDto.endDate == null || this.model.employeeLeaveDto.endDate == null) {
      await this.base.toastInformation('SelectEndDate');
      return;
    }
    const model = {
      employeeId: this.user.EmployeeId,
      leaveRegulationId: this.model.employeeLeaveDto.leaveRegulationId,
      startDate: this.model.employeeLeaveDto.startDate,
      endDate: this.model.employeeLeaveDto.endDate,
    };
    this.base.showLoader();
    this.Service.getActualDays(model).subscribe((res: any) => {
      this.base.hideLoader();
      console.log('actial day', res);
      const end = moment.parseZone(this.model.employeeLeaveDto.endDate);
      const start = moment.parseZone(this.model.employeeLeaveDto.startDate);
      const daysNumberVal = (this.model.employeeLeaveDto.startDate == null ||
        this.model.employeeLeaveDto.endDate == null || end < start) ? 0 : end.diff(start, 'days') + 1;
      const actualDayVal = res;
      const leftBalanceVal = balanceVal - actualDayVal;
      let paidDaysVal: any;
      let unPaidDaysVal: number;
      
      if (leftBalanceVal <= 0) {
        paidDaysVal =Math.floor(balanceVal);
        unPaidDaysVal = actualDayVal - paidDaysVal;
      }
      if (leftBalanceVal > 0) {
        paidDaysVal = actualDayVal;
        unPaidDaysVal = 0;
      }
      this.model.employeeLeaveDto.dayNumber = daysNumberVal;
      this.model.employeeLeaveDto.balance = balanceVal;
      this.model.employeeLeaveDto.actualDay = actualDayVal;
      this.model.employeeLeaveDto.payedDay = paidDaysVal;
      this.model.employeeLeaveDto.unPayedDay = unPaidDaysVal;
      this.model.employeeLeaveDto.leftBalance = this.oldleftBalanceVal = leftBalanceVal;
      this.showUnpaidCheckBox = false;
      this.model.employeeLeaveDto.isUnpaidLeave = null;
      this.model.employeeLeaveDto.unPayedStartDate = null;
      const leaveRegulationObject = this.leaveTypes.filter(a => a.isAllowed === true).map(a => a.id);
      this.model.employeeLeaveDto.leaveTypeId = this.leaveTypes
        .filter(a => a.id === this.model.employeeLeaveDto.leaveRegulationId)
        .map(a => a.leaveTypeId)[0];

      if (leaveRegulationObject.includes(this.model.employeeLeaveDto.leaveRegulationId) && this.model.employeeLeaveDto.leftBalance < 0) {
        if (leftBalanceVal < 0) { this.showUnpaidCheckBox = true; } else { this.showUnpaidCheckBox = false; }
      }
      console.log(this.model);

      this.onchangeUnpaidLeave(this.showUnpaidCheckBox);
    });
  }
  onchangeUnpaidLeave(event) {
    if (event && this.model.employeeLeaveDto.isUnpaidLeave === true) {
      this.showUnPaid = true;
      this.model.employeeLeaveDto.leftBalance = 0;
      const start = new Date(this.model.employeeLeaveDto.endDate);
      start.setDate(start.getDate() + this.oldleftBalanceVal);
      this.model.employeeLeaveDto.unPayedStartDate = start.toDateString();
    } else {
      this.showUnPaid = false;
      this.model.employeeLeaveDto.leftBalance = this.oldleftBalanceVal;
      this.model.employeeLeaveDto.unPayedStartDate = null;
    }
  }
  openFileChooser() {
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
        //this.Route.navigate(['/main/my-request/leave-tabs/leave-tabs/leave-pending']);
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
        this.model.employeeLeaveDto.filePath = file.name;
        // tslint:disable-next-line:no-shadowed-variable
        const reader = new FileReader();
        reader.addEventListener('load', (event1: any) => {
          const val = event1.target.result;
          this.model.employeeLeaveDto.fileName = val;
        });
        reader.readAsDataURL(file);
      }
    } catch (error) {
    }
  }


  // fillDate(event, type){
  //   if(type == 'start') 
  //   {
  //     this.model.employeeLeaveDto.startDate = event;
  //     let endDate = new Date(this.model.employeeLeaveDto.endDate);
  //     let startDate = new Date(this.model.employeeLeaveDto.startDate);
  //     let reset = new resetCalenderObj();
  //     reset.minDate = new Date(this.model.employeeLeaveDto.startDate);
  //     if(startDate > endDate){
  //       reset.dayDate = new Date(this.model.employeeLeaveDto.startDate);
  //     }
  //       this.resetCalender.next(reset);
  //   }
  //   else if(type == 'end') {this.model.employeeLeaveDto.endDate = event};
  //   this.getLeaveAvailableBalance();
  // }

  ngOnDestroy() {
  }
  ionViewWillLeave(){
  }

}
