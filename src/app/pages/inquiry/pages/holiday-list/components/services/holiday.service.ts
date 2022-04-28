import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HolidayFilter } from '../models/filter';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class HolidayService extends HttpService {

  get baseUrl(): string {
    return 'HolidayDates/';
  }

  getHolidays(filter?: HolidayFilter, loadOpts?: LoadOptions) {
    console.log('getHolidays: filter=', filter);
    console.log('getHolidays: loadOpts=', loadOpts);
    return this.postQueryReq('GetAllPagedMobile', loadOpts, filter);
  }
  getAttendanceStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'Holidays/GetDropdownList');
  }
}
