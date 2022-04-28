import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { PartDayPermissionFilter } from '../models/filter';


@Injectable({
  providedIn: 'root'
})
export class PartDayPermissionService extends HttpService {

  get baseUrl(): string {
    return 'EmployeePermissions/';
  }

  loadPermissions(filter?: PartDayPermissionFilter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAllPagedMobile', loadOpts, filter);
  }

  getAttendanceStatus(employeeId): Observable<any> {
    const permissionTypes = this.http.get(this.serverUrl + `PartialPermissionTypes/GetDropdownListForEmployee/${employeeId}`);
    const permissionTimes = this.http.get(this.serverUrl + 'EmployeePermissions/GetPermissionTimes');
    const sources = [
      permissionTypes, permissionTimes
    ];
    return forkJoin(sources);
  }
}
