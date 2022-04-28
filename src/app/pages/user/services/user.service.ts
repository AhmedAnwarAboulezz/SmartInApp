import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root',
})

export class UserService extends HttpService {

  get baseUrl(): string {
      return '';
  }

  getNotificationsCount(): Observable<any> {
      return this.getReqWithUrl(this.serverUrl + 'Notifications/GetAllNotificationCount');
  }
  getEmployeeImage(employeeId: any): Observable<any> {
      return this.getReqWithUrl(this.serverUrl + `Employees/GetImageWithEmployeeId/${employeeId}`, {responseType: 'text'});
    }

    getEmployeeData(employeeId: any): Observable<any> {
      return this.postReqWithUrl(this.serverUrl + 'Employees/GetFullEmployeesData', employeeId);

     // return this.postReqWithUrl(this.serverUrl + `Employees/GetFullEmployeesData/`,employeeId, {responseType: 'text'});
    }

    
}
