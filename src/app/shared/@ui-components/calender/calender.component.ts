import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shell } from 'src/app/base/components/shell';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
//import { DatePickerDirective } from 'ion-datepicker';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { resetCalenderObj } from '../../models/resetCalender';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  @Input() title:string = "Date";
  @Input() resetCalender: Subject<resetCalenderObj> = new Subject<resetCalenderObj>();
  @Input() min = null;
  @Input() max = null;
  @Input() disabledDates: Date[] = [];
  @Input() disableWeekDays: number[] = [];
  @Input() dayDate: any = new Date();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  //get Localize(): TranslationService { return Shell.Injector.get(TranslationService); }  
  weekListEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekListAr = ["أحد", "أثنين", "ثلاثاء", "أربعاء", "خميس", "جمعه", "سبت"];
  monthsListAr = ['يناير' , 'فبراير' , 'مارس' , 'أبريل', 'مايو' , 'يونيو', 'يوليو' , 'أغسطس', 'سبتمبر' , 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  monthsListEn = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  todayDate:any;
  datePickerObj: any = {};

  constructor( ) 
  { 

  }



  getDatePickerProperities(dayDate = null, min = null, max = null,disabledDates = [],disableWeekDays = [])
  {    
    
    let showToday = true;
    if(dayDate != null){
      dayDate = new Date(dayDate.toString());
      this.todayDate = formatDate(dayDate, 'dd MMM yyyy', 'en-US');
      //this.todayDate = this.Localize.isEnglish() ?  formatDate(dayDate, 'dd MMM yyyy', 'en-US') :moment.parseZone(dayDate,'dd MMM yyyy', 'ar-EG').format('ll');
    }
    if((min != null && new Date(min) >= new Date()) || (dayDate != null && max != null && new Date(max) < new Date())){
        showToday = false;
     } 
    this.datePickerObj = {
      inputDate: this.todayDate,
      fromDate: min,
      toDate: max,
      //closeOnSelect: true, // default false
      //todayLabel: this.Localize.isEnglish() ?  "Today" : "اليوم", // default 'Today'
      //closeLabel: this.Localize.isEnglish() ? 'Close' : 'إغلاق', // default 'Close'
      disableWeekDays: disableWeekDays, // default []
      disabledDates: disabledDates, // default []
      //titleLabel: this.Localize.isEnglish() ?'Select a Date' : 'أختر تاريخ', // default null
      monthsList:  this.monthsListEn,
      weeksList:  this.weekListEn,
      clearButton : false , // default true
      momentLocale:  'en-US', // Default 'en-US'
      //btnCloseSetInReverse: true, // Default false
      showTodayButton: showToday, // default true
      isSundayHighlighted : {
        fontColor: '#ee88bf' // Default null
      } // Default {}
    };
  }
  ngOnInit() {
    this.getDatePickerProperities(this.dayDate,this.min,this.max, this.disabledDates, this.disableWeekDays);
    this.resetCalender.subscribe(response => {
      if(response){
      console.log(response);
      this.getDatePickerProperities(response.dayDate,response.minDate,response.maxDate);      
    }
   });
  }

  onChange() {
    
    let myDate = moment.parseZone(this.todayDate, 'DD MMM YYYY').toDate();
    let qwe = myDate.toLocaleDateString('en-US');
    if(qwe == "Invalid Date"){
       qwe = this.dayDate.toLocaleDateString('en-US');
    }
    this.change.emit(qwe);
  }








  
  
  
  
  
  

}
