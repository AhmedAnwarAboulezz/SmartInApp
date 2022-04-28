import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';


@Injectable({
  providedIn: 'root'
})
export class FilterService extends HttpService {

  get baseUrl(): string {
    return 'Reports/';
  }

  getAttendanceStatus(): Observable<any> {
    return this.getReq('GetAllStatusMobile');
  }


  getDepartments(): Observable<any[]> {
    return this.getReqWithUrl(`${this.serverUrl}AdministrativeLevels/GetDropdownMobile`);
  }
  getEmployees(getPagenationOptions: any): Observable<any> {
    return this.postReqWithUrl(`${this.serverUrl}Employees/GetEmployeeDropDown`, getPagenationOptions).pipe(delay(1000));
  }

  getLeaveRegulations(): Observable<any> {
    return this.http.get(this.serverUrl + 'LeaveRegulations/GetDropdownListWithoutFilter');
  }
  getAllowances(): Observable<any> {
    return this.http.get(this.serverUrl + 'Allowances/GetDropdownList');
  }
  getFullPermissions(): Observable<any> {
    return this.http.get(this.serverUrl + 'FullDayPermissions/GetDropdownList');
  }

  getPartPermissions(): Observable<any> {
    return this.http.get(this.serverUrl + 'PartialPermissionTypes/GetAll');
  }

  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getAttendanceStatus());
    return forkJoin(sources);
  }

}
