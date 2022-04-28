import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeSpanPipe'
})
export class TimeSpanPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }
  transform(timeObj, format='hh:mm a') {

      if (!timeObj){
        return '';
      }
      let currentCulture = this.translateService.currentLang == 'ar' ? 'ar-EG' : 'en-US';

      if (!moment(timeObj).isValid())
      return moment.parseZone(timeObj,'hh:mm:ss', currentCulture).format(format);
        //return moment(timeObj, "hh:mm:ss").format(format);
      else
      return moment.parseZone(timeObj,'HH:mm', currentCulture).format(format);
      //return moment(timeObj).format(format);

 }
// transform(timeObj) {
//   moment('09:15:00', "hh:mm:ss");
//   return timeObj.slice(0,-3);

// }
}

@Pipe({
  name: 'totalHours'
})
export class TotalHoursPipe implements PipeTransform {

  transform(minutesObj, format="HH:mm") {

        if (minutesObj == 0|| !minutesObj){
          return '--';
        }
          return moment.utc().startOf('day').add(minutesObj, 'minutes').format(format);
        }

}

@Pipe({
  name: 'smallestRssi'
})
export class NearestPipe implements PipeTransform {

  transform(items: any[]): any {
    
      if (!items) {
          return items;
      }
      let rssis = items.map(a=> a.rssi);
      //alert("test" +  rssis[0]);
      let minrssi = Math.min(...rssis);
      //alert(minrssi);
      let res = items.filter(item => item.rssi == minrssi);
      return res;
      //return items.filter(item => item.rssi.indexOf(minrssi) !== -1);
  }
}



@Pipe({
  name: 'localizedDate'
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any, withTime: boolean = false): any {
    // let monthnames = [
    //   'يناير'
    // , 'فبراير'
    // , 'مارس'
    // , 'أبريل'
    // , 'مايو'
    // , 'يونيو'
    // , 'يوليو'
    // , 'أغسطس'
    // , 'سبتمبر'
    // , 'أكتوبر'
    // , 'نوفمبر'
    // , 'ديسمبر'
    // ];
    if(value !== '' && value !== null && value != undefined)
    {
      let dateObj = new Date(value);
      // let dname = dateObj.getDate();
      // let mname = dateObj.getMonth();
      // let yname = dateObj.getFullYear();
      let currentCulture = this.translateService.currentLang == 'ar' ? 'ar-EG' : 'en-US';
      if(withTime)
      {
        return  moment.parseZone(dateObj,'dd MMM yyyy', currentCulture).format('DD MMM yyyy (hh:mm a)');
        // let timeObj = moment(dateObj, "hh:mm:ss").format("hh:mm a").toString();
        // if(this.translateService.currentLang == 'ar')
        // {
        //   timeObj = timeObj.replace("am","ص");
        //   timeObj = timeObj.replace("pm","م");
        //   let arDate = dname + " " + monthnames[mname] + "  " + yname + "  (" + timeObj + ")";
        //   return arDate;
        // }
        // else{
        //   const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
        //   let enDate = datePipe.transform(value, 'MMMM d, y') + "  (" + timeObj + ")" ;
        //   return enDate;  
        // }
      }
      else{
        return moment.parseZone(dateObj,'dd MMM yyyy', currentCulture).format('DD MMM yyyy');
        // if(this.translateService.currentLang == 'ar')
        // {
        //   let arDate = dname + " " + monthnames[mname] + "  " + yname;
        //   return arDate;
        // }
        // else{
        //   const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
        //   return datePipe.transform(value, 'MMMM d, y');  
        // }
      }
    }
    return "";
  }

}


@Pipe({
  name: 'localizedMonthYear'
})
export class LocalizedMonthYearPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any): any {
    if(value !== '' && value !== null && value != undefined)
    {
      let dateObj = new Date(value);
      let currentCulture = this.translateService.currentLang == 'ar' ? 'ar-EG' : 'en-US';
        return moment.parseZone(dateObj,'dd MMM yyyy', currentCulture).format('MMM yyyy');      
    }
    return "";
  }
}


@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }
  monthsListAr = ['يناير' , 'فبراير' , 'مارس' , 'أبريل', 'مايو' , 'يونيو', 'يوليو' , 'أغسطس', 'سبتمبر' , 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  monthsListEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  transform(monthNumber: number): any {    
      if (!monthNumber || monthNumber > 12 || monthNumber < 1) {
          return monthNumber;
      }     
      return this.translateService.currentLang == 'ar' ? this.monthsListAr[monthNumber - 1] : this.monthsListEn[monthNumber - 1];
  }
}



