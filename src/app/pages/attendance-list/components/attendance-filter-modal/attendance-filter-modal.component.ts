import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { resetCalenderObj } from 'src/app/shared/models/resetCalender';
import { AttendanceFilter } from '../../models/filter';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-filter-modal',
  templateUrl: './attendance-filter-modal.component.html',
  styleUrls: ['./attendance-filter-modal.component.scss'],
})
export class AttendanceFilterModalComponent implements OnInit {
  maxData : any = (new Date()).getFullYear() + 3;
  //@Input() filtered: string;
  //@Input() attendanceItems: any;
  // resetCalenderEnd: Subject<resetCalenderObj> = new Subject<resetCalenderObj>();
  // resetCalenderStart: Subject<resetCalenderObj> = new Subject<resetCalenderObj>();
  filter: AttendanceFilter = {};
  statusList: any[];
  constructor(
    public modalController: ModalController,
    private  attendanceService: AttendanceService,
    public localize: TranslationService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');
    }

  ngOnInit() {
    //console.log(`🚀 ~ filtered`, this.filtered);
    this.loadLookup();

  }

  loadLookup(): void {
    this.attendanceService.getAttendanceStatus().subscribe((res: any) => {
      console.log(res);
      this.statusList = res;
    });
  }

  apply() {
    const formData = { dismissed: true, filter: this.filter };
    this.modalController.dismiss(formData);
  }
  resetFilter() {
    let start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let end = new Date();
    this.filter = { startDate: start.toLocaleDateString('en-US'), endDate: end.toLocaleDateString('en-US')};
    this.apply();
  }

  close(){
    const formData = {};
    this.modalController.dismiss(formData);
  }

  // Used in Ionic4 Calernder

  // fillDate(event, type){
    
  //   if(type == 'start') 
  //   {
  //     this.filter.startDate = event;
  //     this.resetEnd();
  //   }
  //   else if(type == 'end') this.filter.endDate = event;
  // }

  // resetEnd(){
  //   let endDate = new Date(this.filter.endDate);
  //   let startDate = new Date(this.filter.startDate);
  //   let maxEnd = moment(startDate).add(1, 'month').toDate();
  //   let reset = new resetCalenderObj();
  //   reset.minDate = startDate;
  //   reset.maxDate = maxEnd;
  //   reset.dayDate = endDate;
  //   if(startDate > endDate || endDate > maxEnd){
  //     reset.dayDate = maxEnd;
  //   }
  //   this.resetCalenderEnd.next(reset);
  // }
  // ionViewWillEnter(){
  //   this.fillDate(this.filter.startDate, 'start');
  // }
}
