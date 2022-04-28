import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalVars } from 'src/app/shared/constants';
import { IonicStorageService } from '../storage/ionicStorageService.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private appConfig;
  private configFile;

  constructor(private http: HttpClient, private localStorage: StorageService,
    ) {
    this.getConfigFileName();
  }

  loadAppConfig() {
    return this.http
      .get('/assets/config/' + this.configFile)
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }
  getConfigFileName(): void {
    if (environment.production === false) {
      this.configFile = 'development.json';
    }
    if (environment.production === true) {
      this.configFile = 'production.json';
    }
  }
  getConfigServerUrl(): string {
    return this.appConfig.HOST_API;
  }
  
   getServerUrl(): string {
    if(GlobalVars.HostApi == ""){
      GlobalVars.HostApi =  this.localStorage.getHash('host-api');
    }
    return  GlobalVars.HostApi !== null && GlobalVars.HostApi !== "" ? GlobalVars.HostApi :this.appConfig.HOST_API;
  }
  getNotificationUrl(): string {
    if(GlobalVars.NotificationApi == ""){
      GlobalVars.NotificationApi =  this.localStorage.getHash('notification-api');
    }
    return  GlobalVars.NotificationApi !== null && GlobalVars.NotificationApi !== "" ? GlobalVars.NotificationApi :this.appConfig.Notification_API;
  }
  getLogHubUrl(): string {
    if(GlobalVars.LogsApiHub == ""){
      GlobalVars.LogsApiHub =  this.localStorage.getHash('logs-hub-api');
    }
    return  GlobalVars.LogsApiHub !== null && GlobalVars.LogsApiHub !== "" ? GlobalVars.LogsApiHub :this.appConfig.Logs_APIHub;
  }
  getLogoutHubUrl(): string {
    if(GlobalVars.LogoutApiHub == ""){
      GlobalVars.LogoutApiHub =  this.localStorage.getHash('logout-hub-api');
    }
    return  GlobalVars.LogoutApiHub !== null && GlobalVars.LogoutApiHub !== "" ? GlobalVars.LogoutApiHub :this.appConfig.Logout_APIHub;
  }



}
