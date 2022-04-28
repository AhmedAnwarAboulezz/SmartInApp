/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends HttpService {
  // tslint:disable-next-line:variable-name
  private _pendingRequests = new BehaviorSubject<any[]>([]);
  // tslint:disable-next-line:variable-name
  private _historyRequests = new BehaviorSubject<any[]>([]);

  get baseUrl(): string {
      return 'Request/';
  }

  getRequestsById(id): Observable<any> {
      return this.getReq('Get/' + id);
  }
  getRequestsById2(id): Observable<any> {
    return this.getReqWithUrl(this.serverUrl + 'MyRequests/GetMyRequestDetails/' + id);
  }

  getRequestsByApproverId(approverParam: any): Observable<any> {
      return this.postReq('GetRequestsByApproverId', approverParam);
  }
  getRequests(model): Observable<any> {
      return this.postReqWithUrl(this.serverUrl + 'Request/GetRequestsForCurrentEmployee', model);
  }
  getRequestTypes(): Observable<any> {
      return this.http.get(this.serverUrl + 'RequestType/GetAll');
  }
  getPermissionTimes(): Observable<any> {
      return this.http.get(this.serverUrl + 'EmployeePermissions/GetPermissionTimes');
  }
  getPermissionBalance(model): Observable<any> {
      return this.http.post(this.serverUrl + 'EmployeePermissions/GetPermissionBalance', model);
  }
  getDutyTime(model): Observable<any> {
      return this.http.post(this.serverUrl + 'EmployeeDuties/GetDutyTime', model);
  }
  getLeaveTypes(): Observable<any> {
      return this.http.get(this.serverUrl + 'LeaveRegulations/GetDropdownListWithoutFilter');
  }
  getLeaveAvailableBalance(model): Observable<any> {
      return this.http.post(this.serverUrl + 'EmployeeLeaves/GetAvailableBalance', model);
  }
  getActualDays(model): Observable<any> {
      return this.http.post(this.serverUrl + 'EmployeeLeaves/GetActualDays', model);
  }
  addRequest(model: any): Observable<any> {
      return this.postReq('CreateNewRequest', model);
  }

  approveOrreject(model: any): Observable<any> {
      return this.postReq('ApproveRequest', model);
  }
  get Requests() {
      return this._pendingRequests.asObservable();
  }
  get historyRequests() {
      return this._historyRequests.asObservable();
  }
  fetchPendingRequests(model) {
      return this.postReqWithUrl(this.serverUrl + 'MyRequestsManagers/GetMyRequestsManager', model)
          .pipe(
              take(1),
              map(res => {
                  return res;
              })
              , tap(data => {
                  this._pendingRequests.next(data);
              })
          );


  }
  fetchHistoryRequests(model) {

      return this.postReqWithUrl(this.serverUrl + 'MyRequestsManagers/GetMyRequestsManager', model)
          .pipe(
              take(1),
              map(res => {
                  return res;
              })
              , tap(data => {
                  this._historyRequests.next(data);
              })
          );


  }

  downloadfile(filename, serviceName): Observable<any> {
      if (serviceName == "Permissions") {
        return this.http.get(this.serverUrl + `EmployeeAllowances/DownLoadFile/${filename}`, {
          responseType: 'arraybuffer'
        });
      }
      else if (serviceName == "Leaves") {
        return this.http.get(this.serverUrl + `EmployeeLeaves/DownLoadFile/${filename}`, {
          responseType: 'arraybuffer'
        });
      }
      else if (serviceName == "EmployeeFullDayPermissions") {
          return this.http.get(this.serverUrl + `EmployeeFullDayPermissions/DownLoadFile/${filename}`, {
            responseType: 'arraybuffer'
          });
        }
  
    }

    MakeWorkflowNotificationsSeen(requestTypeId): Observable<any> {
      return this.http.get(this.serverUrl + `Notifications/MakeWorkflowNotificationsSeen/${requestTypeId}`);
  }


    getNotificationsCounts(): Observable<any> {
      return this.http.get(this.serverUrl + 'Notifications/GetWorkflowNotificationsCountByTypes');
  }
  

}
