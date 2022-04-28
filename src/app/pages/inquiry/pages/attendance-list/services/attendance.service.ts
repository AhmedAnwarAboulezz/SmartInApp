import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models/loadOpt';
import { AttendanceFilter } from '../models/filter';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends HttpService {

  get baseUrl(): string {
    return 'Reports/';
  }
  getAttendances(filter?: AttendanceFilter, loadOpts?: LoadOptions) {
    console.log('loadOpts: ',loadOpts);
    return this.postQueryReq('GetEmployeeAttendanceMobile', loadOpts, filter);
  }


  getAttendanceStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'Reports/GetAllStatusMobile');
  }
}
