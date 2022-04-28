import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { Filter } from 'src/app/shared/models/filter';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAllowancesService  extends HttpService {
  getEmployeeAllowances(filter?: Filter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAllPagedAdministrationDashboardMobile', loadOpts, filter);
  }
  get baseUrl(): string {
    return 'EmployeeAllowances/';
  }

}




