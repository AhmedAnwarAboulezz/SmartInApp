import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { Filter } from 'src/app/shared/models/filter';


@Injectable({
  providedIn: 'root'
})
export class AdministrationAttendanceService extends HttpService {

  get baseUrl(): string {
    return 'Reports/';
  }

  loadAdministrationAttendances(filter?: Filter, loadOpts?: LoadOptions) {
    return this.postQueryReq('GetAdministrationAttendanceMobile', loadOpts, filter);
  }

  // getAttendanceStatus(): Observable<any> {
  //   return this.getReq('GetAllStatus');
  // }
}
