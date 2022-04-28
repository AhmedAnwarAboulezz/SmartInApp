import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Shell } from 'src/app/base/components/shell';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { IonicStorageService } from '../storage/ionicStorageService.service';




@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly JWT_TOKEN = 'inquiry-token';
  private readonly REFRESH_TOKEN = 'inquiry-refresh_token';
  constructor(
    private http: HttpClient,
    public platform: Platform,
    private router: Router,
    //private service: DataService, 
    private configService: ConfigService,
    private Storage: IonicStorageService,
    public localize: TranslateService

    ) 
  {   
   }
   async refreshToken() {
     
    let serverUrl = this.configService.getServerUrl();
    let tokens: Tokens ={
      token:  (await this.getJwtToken()).value,
      refreshToken: (await this.getRefreshToken()).value,
      isMobileBrowser: (this.platform.is('desktop') || this.platform.is('mobileweb')) ? true : false,
      rememberMe: (await this.Storage.get('rememberMe')).value == "true" ? true : false
    }
    
    let refreshtokens: Tokens = await this.http.post(serverUrl+'Authentication/RefreshTokenForMobile/refresh-token',tokens).toPromise();
    this.storeJwtToken(refreshtokens.token);
    return refreshtokens;
  }

   async updateLocalStorage() {
     
    let serverUrl = this.configService.getServerUrl();
    let claims = JSON.parse((await this.Storage.get('inquiry-claims')).value);
    let storageUpdateParameter: storageUpdateParameters ={
      currentToken:  (await this.getJwtToken()).value,
      userInquiryId: claims.UserId     
    }
    let isManager = JSON.parse((await this.Storage.get('isManager')).value);
    let isAuthorizeLogs = JSON.parse((await this.Storage.get('isAuthorizeLogs')).value);
    let isTeamMember = JSON.parse((await this.Storage.get('isTeamMember')).value);

    this.http.post(serverUrl+'Authentication/UpdateLocalStorage',storageUpdateParameter).subscribe((storageResult: StorageUpdate) =>{
      this.Storage.set('isManager', String(storageResult.isManager));
      this.Storage.set('isAuthorizeLogs', String(storageResult.isAuthorizeLogs));
      this.Storage.set('isTeamMember', String(storageResult.isTeamMember));

      if(storageResult.isManager !== isManager 
         || storageResult.isAuthorizeLogs !== isAuthorizeLogs 
         || storageResult.isTeamMember !== isTeamMember ){
           alert("Changes Has done to your authorized pages!");
           window.location.reload();
          //let currenturl = this.router.url;
          //this.router.navigate([currenturl]);
         }
    });
    this.http.get(serverUrl+'OrganizationLicenses/GetMobileModulesForOrganization').subscribe((res: any) =>{
      this.Storage.setObject('authModules', res);
    });

  }

  getJwtToken() {
    return this.Storage.get(this.JWT_TOKEN);
  }
   getRefreshToken() {
    return this.Storage.get(this.REFRESH_TOKEN);
  }
   storeJwtToken(jwt: string) {
    this.Storage.set(this.JWT_TOKEN, jwt);
  }

  getReligions(): Observable<any> {
    let serverUrl = this.configService.getServerUrl();
    return this.http.get(serverUrl+'Religions/GetAll');
  }


   storeTokens(tokens: any, claims: any, code: any, rememberMe: any) {
    this.Storage.set('inquiry-claims', JSON.stringify(claims));
    this.Storage.set(this.JWT_TOKEN, tokens.token);
    this.Storage.set(this.REFRESH_TOKEN, tokens.refreshToken);
    this.Storage.setObject('user-credentials', tokens);
    this.Storage.set('isManager', String(tokens.isManager));
    this.Storage.set('isAuthorizeLogs', String(tokens.isAuthorizeLogs));
    this.Storage.set('isTeamMember', String(tokens.isTeamMember));
    this.Storage.set('code', String(code));
    this.Storage.set('rememberMe', rememberMe);

  }

   removeTokens() {
    this.Storage.removeItem('inquiry-claims');
    this.Storage.removeItem(this.JWT_TOKEN);
    this.Storage.removeItem(this.REFRESH_TOKEN);
    this.Storage.removeItem('user-credentials');
    this.Storage.removeItem('isManager');
    this.Storage.removeItem('isAuthorizeLogs');
    this.Storage.removeItem('isTeamMember');
    this.Storage.removeItem('code');
    this.Storage.removeItem('rememberMe');
  }

  isLoggedIn(token: string = 'token') {
    return !!this.getJwtToken();
    //return (token =='token' ? !!this.tokenService.getJwtToken() : tokenNotExpired(token));
  }
  

 
}

export class Tokens{
  token?:string;
  refreshToken?:string;
  message?:string;
  errorType?: number;
  isMobileBrowser?: boolean;
  rememberMe?:boolean;
}

export class storageUpdateParameters{
  currentToken?:string;
  userInquiryId?:string;
}

export class StorageUpdate{
  message?: string;
  isManager?: boolean;
  isTeamMember?: boolean;
  isAuthorizeLogs?: boolean;
}


