import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BaseClass } from 'src/app/base/components/base-component';
import { Shell } from 'src/app/base/components/shell';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { GlobalVars } from 'src/app/shared/constants';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { OrganizationService } from './services/auth.service';

@Component({
  selector: 'app-organization',
  templateUrl: 'organization.page.html',
  styleUrls: ['organization.page.scss']
})
export class OrganizationPage implements OnInit{
  orgID;
  showPage = false;
errorMsg:any;
//orgHost;

  constructor(private router: Router, 
    private storage: IonicStorageService,
    private localStorage: StorageService,
    private orgService: OrganizationService,
    //private authService: AuthService,
    // private configService: ConfigService,
    //private httpService: HttpService,
    public base: BaseClass
    ) {}

  async ngOnInit() {
    
    let test = (await this.storage.get('organization-code')).value;
    if(test == '' || test == null || test == undefined) {
      this.orgID = '';
    }
    else{
      this.orgID = test;
      this.GoToUrl(this.orgID);
    }
    //this.orgID = (await this.storage.get('organization-code')).value;
    //if(this.orgID !== '' && this.orgID !== null && this.orgID !== undefined) this.GoToUrl(this.orgID);

  }

  GoToUrl(orgID: any) {
    if (orgID == '') {
      this.base.toastError('EnterCodeFirst');
    }
    else{
      this.base.showLoader();
      this.orgService.getOrganiztionByCode(orgID).subscribe(res => {
        this.base.hideLoader();
        console.log("Organiztion is :", res);
        this.handleResult(res);       
      }, error => {
        this.base.hideLoader();
        this.errorMsg = error?.error;
        if(error?.status == 400){
          this.base.toastError('InvalidOrganizationCode');
        }
        else{
          alert("error happened: "+ this.errorMsg);
        }
      });
    }
  }


  UpdateGlobalVars(org){
    if(org.hostApiUrl !== null && org.hostApiUrl !== ""){
      GlobalVars.HostApi = org.hostApiUrl;
      this.localStorage.setHash('host-api', org.hostApiUrl);
    }
    if(org.notificationApiUrl !== null && org.notificationApiUrl !== ""){
      GlobalVars.NotificationApi = org.notificationApiUrl;
      this.localStorage.setHash('notification-api', org.notificationApiUrl);
    }
    if(org.logsApiHubUrl !== null && org.logsApiHubUrl !== ""){
      GlobalVars.LogsApiHub = org.logsApiHubUrl;
      this.localStorage.setHash('logs-hub-api', org.logsApiHubUrl);
    }
    if(org.logoutApiHubUrl !== null && org.logoutApiHubUrl !== ""){
      GlobalVars.LogoutApiHub = org.logoutApiHubUrl;
      this.localStorage.setHash('logout-hub-api', org.logoutApiHubUrl);
    }
    //this.httpService.resetHost();
    //this.authService.serverUrl = this.configService.getServerUrl();
  }

  async handleResult(res:any){
    if(res !== null && res !== undefined){
      this.UpdateGlobalVars(res);
      await this.storage.set('organization-code', res.code);
      await this.storage.setObject('organization', res);
      this.router.navigate(['/login'], {replaceUrl: true, queryParams: { changed: "true" } });
    }
    else{
      this.base.toastError('InvalidOrganizationCode');
    }
  }
}
