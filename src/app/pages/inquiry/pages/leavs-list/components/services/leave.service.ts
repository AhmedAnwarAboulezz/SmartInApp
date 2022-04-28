import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { LeaveFilter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class LeaveService extends HttpService {

  get baseUrl(): string {
    return 'EmployeeLeaves/';
  }

  getLeaves(filter?: LeaveFilter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAllPagedMobile', loadOpts, filter);
  }

  getAttendanceStatus(): Observable<any> {
    //  return this.http.get(this.serverUrl + 'LeavesTypes/GetDropdownList');
    return this.http.get(this.serverUrl + 'LeaveRegulations/GetDropdownListWithoutFilter');
  }
  getLeaveRegulations(employeeid): Observable<any> {
    return this.http.get(this.serverUrl + `LeaveRegulations/GetDropdownList/${employeeid}`);
  }
}
