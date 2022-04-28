import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { Filter } from 'src/app/shared/models/filter';

@Injectable({
  providedIn: 'root'
})
export class LogService extends HttpService {

  get baseUrl(): string {
    return 'EmployeeAttedanceLogs/';
  }

  getLogs(filter?: Filter, loadOpts?: LoadOptions): Observable<any> {
    return this.postQueryReq('GetAllPagedAdministrationMobile', loadOpts, filter);
  }
  // getActionImage(search: AttendanceSearchImage): Observable<any> {
  //   return this.http.post(this.serverUrl + 'EmployeeDeviceLogMobiles/GetActionImage',search, {responseType: 'text'});
  // }
}
