import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LiveLogsService extends HttpService {

  get baseUrl(): string {
    return 'EmployeeAttedanceLogs/';
  }

  // getLogs(): Observable<any> {
  //   return this.getQueryReq('GetAllAdministrationLiveMobile');
  // }
}
