import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';

import { PartDayPermissionBalanceFilter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class PartDayPermissionBalanceService extends HttpService {

  get baseUrl(): string {
    return 'EmployeePermissions/';
  }

  loadPermissionBalance(filter?: PartDayPermissionBalanceFilter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAllPermissionBalancesForNewMobile', loadOpts, filter);
  }

  getAttendanceStatus(): Observable<any> {
    const permissionTypes = this.http.get(this.serverUrl + 'PartialPermissionTypes/GetDropdownList');
    const permissionTimes = this.http.get(this.serverUrl + 'EmployeePermissions/GetPermissionTimes');
    const sources = [
      permissionTypes, permissionTimes
    ];
    return forkJoin(sources);
  }
}
