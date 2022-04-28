import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService extends HttpService {
  get baseUrl(): string {
    return '';
  }
  getCombinedManagerData(): Observable<any> {
    return this.getReqWithUrl(this.serverUrl + 'Reports/GetMobileDashboardCounts');

  }
}
