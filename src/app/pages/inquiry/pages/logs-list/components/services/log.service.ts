import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { LogFilter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class LogService extends HttpService {

  get baseUrl(): string {
    return 'EmployeeAttedanceLogs/';
  }

  getLogs(filter?: LogFilter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAllPagedMobile', loadOpts, filter);
  }
  getAttendanceStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeLogs/GetLogTypes');
  }
}
