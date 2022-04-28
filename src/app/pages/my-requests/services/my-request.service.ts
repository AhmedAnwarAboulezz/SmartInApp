/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class MyRequestService extends HttpService {
  // tslint:disable-next-line:variable-name
  private _pendingRequests = new BehaviorSubject<any[]>([]);
  // tslint:disable-next-line:variable-name
  private _historyRequests = new BehaviorSubject<any[]>([]);
  // tslint:disable-next-line:variable-name
  private _notifications = new BehaviorSubject(0);
  get notifications() {
    return this._notifications;
  }
  get baseUrl(): string {
    return 'Request/';
  }
  get pendingRequests() {
    return this._pendingRequests.asObservable();
  }
  get historyRequests() {
    return this._historyRequests.asObservable();
  }
  getRequestsById(id): Observable<any> {
    return this.getReq('Get/' + id);
  }
  getRequestsById2(id): Observable<any> {
    return this.getReqWithUrl(this.serverUrl + 'MyRequests/GetMyRequestDetails/' + id);
  }
  
  // getRequests(): Observable<any> {
  //     return this.http.get('/assets/data/requests.json');
  // }
  getRequestsByEmployeeId(parameters): Observable<any> {
    return this.postReq('GetRequestsByEmployeeId', parameters);
  }
  getRequests(model): Observable<any> {
    // return this.getReq('GetRequestsByEmployeeId' ,model);
    return this.postReqWithUrl(
      this.serverUrl + 'Request/GetRequestsByEmployeeId',
      model
    );
  }
  getRequestTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'RequestType/GetAll');
  }
  getPermissionTypes(): Observable<any> {
    return this.http.get(
      this.serverUrl + 'PartialPermissionTypes/GetDropdownListMobile'
    );
  }
  getFullPermissionTypes(): Observable<any> {
    return this.http.get(
      this.serverUrl + 'FullDayPermissions/GetDropdownListMobile'
    );
  }
  getLeavesTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'LeavesTypes/GetDropdownList');
  }
  
  getPermissionTimes(): Observable<any> {
    return this.http.get(
      this.serverUrl + 'EmployeePermissions/GetPermissionTimes'
    );
  }
  getPermissionBalance(model): Observable<any> {
    return this.http.post(
      this.serverUrl + 'EmployeePermissions/GetPermissionBalance',
      model
    );
  }
  getEmployeeLogs(dayTimeEmployee): Observable<any> {
    return this.http.post(
      this.serverUrl + 'EmployeeAttedanceLogs/GetEmployeeLogs',
      dayTimeEmployee
    );
  }
  getDutyTime(model): Observable<any> {
    return this.postReqWithUrl(
      this.serverUrl + 'EmployeeDuties/GetDutyTime',
      model
    );
    // return this.http.post(this.serverUrl + 'EmployeeDuties/GetDutyTime', model);
  }
  getLeaveRegulationTypes(employeeId): Observable<any> {
    return this.http.get(
      `${this.serverUrl}LeaveRegulations/GetDropdownListMobile`
    );
  }
  getLeaveTypes(): Observable<any> {
    return this.http.get(
      this.serverUrl + 'LeaveRegulations/GetDropdownListWithoutFilter'
    );
  }
  getLeaveAvailableBalance(model): Observable<any> {
    return this.http.post(
      this.serverUrl + 'EmployeeLeaves/GetAvailableBalance',
      model
    );
  }
  getActualDays(model): Observable<any> {
    return this.http.post(
      this.serverUrl + 'EmployeeLeaves/GetActualDays',
      model
    );
  }
  addRequest(model: any): Observable<any> {
    return this.postReq('CreateNewRequest', model);
  }

  getReturnLeaves(): Observable<any> {
    return this.http.get(
      this.serverUrl + 'EmployeeLeaveReturn/GetAllEmployeeReturnLeaveMobile'
    );
  }
  getWorkflowNotificationsCountByTypesForEmployee(): Observable<any> {
    return this.http.get(
      this.serverUrl +
        'Notifications/GetWorkflowNotificationsCountByTypesForEmployee'
    );
  }

  getAllEmployeeReturnLeaveMobile(): Observable<any> {
    return this.http.get(
      this.serverUrl + 'EmployeeLeaveReturn/GetAllEmployeeReturnLeaveMobile'
    );
  }

  fetchPendingRequests(model) {
    return this.postReqWithUrl(
      this.serverUrl + 'Request/GetRequestsByEmployeeId',
      model
    ).pipe(
      take(1),
      map((res) => {
        // const fetcheddata = res;
        console.log('map', res);
        return res;
      }),
      tap((data) => {
        console.log('tap', data);
        this._pendingRequests.next(data);
      })
    );
  }
  fetchHistoryRequests(model) {
    return this.postReqWithUrl(
      this.serverUrl + 'Request/GetRequestsByEmployeeId',
      model
    ).pipe(
      take(1),
      map((res) => {
        // const fetcheddata = res;
        console.log('map', res);

        return res;
      }),
      tap((data) => {
        console.log('tap', data);

        this._historyRequests.next(data);
      })
    );
  }

  fetchPendingMyRequests(model) {
    return this.postReqWithUrl(
      this.serverUrl + 'MyRequests/GetMyRequests',
      model
    ).pipe(
      take(1),
      map((res) => {
        // const fetcheddata = res;
        console.log('map', res);
        return res;
      }),
      tap((data) => {
        console.log('tap', data);
        this._pendingRequests.next(data);
      })
    );
  }

  removeRequest(id) {
    return this.getReq(`RemoveRequest/${id}`);
  }

  overTimeFilter(filter): Observable<any> {
    return this.postReqWithUrl(
      this.serverUrl + 'ApproveOverTimeDetails/FillForWorkflow',
      filter
    );
  }

  downloadfile(filename, serviceName): Observable<any> {
    if (serviceName === 'Permissions') {
      return this.http.get(
        this.serverUrl + `EmployeeAllowances/DownLoadFile/${filename}`,
        {
          responseType: 'arraybuffer',
        }
      );
    } else if (serviceName === 'Leaves') {
      return this.http.get(
        this.serverUrl + `EmployeeLeaves/DownLoadFile/${filename}`,
        {
          responseType: 'arraybuffer',
        }
      );
    } else if (serviceName === 'fullDayPermission') {
      return this.http.get(
        this.serverUrl + `EmployeeFullDayPermissions/DownLoadFile/${filename}`,
        {
          responseType: 'arraybuffer',
        }
      );
    }
  }
}
