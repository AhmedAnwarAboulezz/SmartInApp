import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends HttpService {
  get baseUrl(): string {
    return '';
  }

  getNotificationsList(id): Observable<any> {
    return this.getReqWithUrl(this.serverUrl + 'Notifications/GetAllNotificationList/' + id);
  }

  makeNotificationSeen(id): Observable<any> {
    return this.getReqWithUrl(this.serverUrl + 'Notifications/MakeNotificationSeen/' + id);
  }

  getNotificationCountByTypes(): Observable<any> {
    return this.getReqWithUrl(this.serverUrl + 'Notifications/GetNotificationCountByTypes');
  }
  
}
