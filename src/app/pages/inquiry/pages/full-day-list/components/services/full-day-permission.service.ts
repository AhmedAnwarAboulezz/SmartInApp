import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FullDayPermissionFilter } from '../models/filter';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class FullDayPermissionService extends HttpService {

  get baseUrl(): string {
    return 'EmployeeFullDayPermissions/';
  }

  loadPermissions(filter?: FullDayPermissionFilter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAllPagedMobile', loadOpts, filter);
  }

  getAttendanceStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'FullDayPermissions/GetDropdownList');
  }
}
