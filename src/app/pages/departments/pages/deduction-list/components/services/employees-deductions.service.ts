import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { Filter } from 'src/app/shared/models/filter';


@Injectable({
  providedIn: 'root'
})
export class EmployeesDeductionsService extends HttpService{

  getEmployeeDeductions(filter?: Filter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAdministrationDeductionPagedMobile', loadOpts, filter);
  }
  get baseUrl(): string {
    return 'LateRegulations/';
  }}

