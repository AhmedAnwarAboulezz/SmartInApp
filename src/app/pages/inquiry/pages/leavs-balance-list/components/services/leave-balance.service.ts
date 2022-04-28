import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LeaveBalanceFilter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService extends HttpService {

  get baseUrl(): string {
    return 'EmployeeLeaves/';
  }

  getLeaves(filter?: LeaveBalanceFilter) {
    return this.postReq('GetEmployeeLeavesBalanceMobile', filter);
  }
}
