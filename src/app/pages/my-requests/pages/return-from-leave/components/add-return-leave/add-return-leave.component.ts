import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BaseClass } from 'src/app/base/components/base-component';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { RequestTypes } from 'src/app/shared/Enums/Enums';

@Component({
  selector: 'app-add-return-leave',
  templateUrl: './add-return-leave.component.html',
  styleUrls: ['./add-return-leave.component.scss'],
})


export class AddReturnLeaveComponent  implements OnInit {
  maxData : any = (new Date()).getFullYear() + 3;
  returnLeave:any;
  availableBalance = 0;
  dayNumber = 0;
  model: any = {
    requestTypeId: RequestTypes.LeaveReturn,
    employeeReturnLeaveDto: {
      returnDate: moment.parseZone(new Date().toLocaleDateString('en-US')).toString(),
      actualDays: 0,
      leaveRemaningBalance:0,
      reason: ""
    }
  };
  user: { EmployeeId: any; };
  showUnPaid = false;
  showUnpaidCheckBox = false;
  oldleftBalanceVal: number;
  constructor(public route: ActivatedRoute, public router: Router,
    private Service: MyRequestService,
    public base: BaseClass,
    private storage: IonicStorageService
    ) {
    this.getDataFromRoute();
  }


  async ngOnInit() {
    this.user = JSON.parse((await this.storage.get('inquiry-claims')).value);
  }

  getDataFromRoute(): void {
    this.route.queryParams.subscribe(params => {
      this.returnLeave = JSON.parse(params.data);
      this.model.employeeReturnLeaveDto.employeeLeaveId = this.returnLeave.id;
      this.model.employeeReturnLeaveDto.leaveEndDate = this.returnLeave.endDate;
      this.model.employeeReturnLeaveDto.leaveTypeId = this.returnLeave.leaveTypeId;      
      this.model.employeeReturnLeaveDto.actualReturnDate = new Date(this.returnLeave.actualReturnDate);
      console.log("Model is ",this.model);
      
    });
  }
  ionViewWillEnter(): void {
    this.getLeaveAvailableBalance();
  }



 
  getLeaveAvailableBalance() {
    
    if (this.model && this.model.employeeReturnLeaveDto
      && this.returnLeave.leaveRegulationId
      && this.returnLeave.startDate && this.returnLeave.endDate) 
      {
        let newReturnDate = moment.parseZone(this.model.employeeReturnLeaveDto.returnDate).subtract(1, 'days');
      const model = {
        leaveRegulationId: this.returnLeave.leaveRegulationId,
        employeeId: this.user.EmployeeId,
        leaveStartDate: this.returnLeave.startDate,
        leaveEndDate: new Date(newReturnDate.toString())
      };
      this.Service.getLeaveAvailableBalance(model).subscribe((res: any) => {
        this.getActualDays(res < 0 ? 0 : res);
      });

    }

  }

  async getActualDays(balanceVal) {

    if (this.model.employeeReturnLeaveDto.returnDate == null) {
      await this.base.toastInformation('SelectEndDate');
      return;
    }
    let newReturnDate = moment.parseZone(this.model.employeeReturnLeaveDto.returnDate).subtract(1, 'days');
    const model = {
      employeeId: this.user.EmployeeId,
      leaveRegulationId: this.returnLeave.leaveRegulationId,
      startDate: this.returnLeave.startDate,
      endDate: new Date(newReturnDate.toString()).toLocaleDateString('en-US'),
    };
    this.Service.getActualDays(model).subscribe((res: any) => {
      console.log('actial day', res);
      const end = moment.parseZone(this.model.employeeReturnLeaveDto.returnDate);
      const start = moment.parseZone(this.returnLeave.startDate);
      const daysNumberVal = (this.returnLeave.startDate == null ||
        this.model.employeeReturnLeaveDto.returnDate == null || end < start) ? 0 : end.diff(start, 'days');
      const actualDayVal = res;
      const leftBalanceVal = balanceVal - actualDayVal;
      this.dayNumber = daysNumberVal;
      this.availableBalance = balanceVal;
      this.model.employeeReturnLeaveDto.actualDays = actualDayVal;
      this.model.employeeReturnLeaveDto.leaveRemaningBalance = this.oldleftBalanceVal = leftBalanceVal;
      this.showUnpaidCheckBox = false;
      console.log(this.model);
    });
  }



  async add() {
    let returnDate = new Date(this.model.employeeReturnLeaveDto.returnDate.toString());    
    const expecteddate =  this.returnLeave.actualReturnDate !== null ? new Date(this.returnLeave.actualReturnDate.toString()) : null;
    if(returnDate <= expecteddate && expecteddate !== null)
    {
        this.base.toastError("returnLeaveStartdate");
        return  false;
    } 
    this.Service.addRequest(this.model).subscribe((res: any) => {
      if (res === null) {
        this.base.toastSuccess('addSuccess');
        //this.base.Redirect();
        this.router.navigate(['/home/myRequests/return-from-leave/list']);
      }
    }, error => {
      this.base.toastError(error, false);
      console.log('error at add', error);
    });

  }

  fillDate(event){
    
    this.model.employeeReturnLeaveDto.returnDate = event;
    this.getLeaveAvailableBalance();
  }


  ngOnDestroy() {
    // this.events.publish('pages:showBackButton', { showBackButton: false,showMenuButton: true });
   }
   ionViewWillLeave(){
    // this.events.publish('pages:showBackButton', { showBackButton: false,showMenuButton: true });
  }
}
