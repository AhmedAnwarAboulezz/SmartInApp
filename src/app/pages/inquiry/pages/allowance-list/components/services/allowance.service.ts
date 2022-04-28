import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { AllowanceFilter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class AllowanceService extends HttpService {

  get baseUrl(): string {
    return 'EmployeeAllowances/';
  }

  getAllowances(filter?: AllowanceFilter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAllPagedMobile', loadOpts, filter);
  }

  // getLookup(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'AllowanceTypes/GetAll');
  // }
  getAttendanceStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'Allowances/GetDropdownList');
  }
}
