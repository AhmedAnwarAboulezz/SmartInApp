import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class DeductionService extends HttpService {

  get baseUrl(): string {
    return 'LateRegulations/';
  }

  getDeductions(year?: number, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAllEmployeeDeductionPagedMobile', loadOpts, year);
  }
}
