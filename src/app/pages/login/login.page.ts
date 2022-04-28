import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController, Platform } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseClass } from 'src/app/base/components/base-component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenService } from 'src/app/core/services/auth/TokenService';
import { SessionManager } from 'src/app/core/services/guards/session-manager';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { GlobalVars } from 'src/app/shared/constants';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { ForgetPasswordModel } from './models/forgetPassword';
import { LoginModel } from './models/login';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordToggleIcon = 'eye';
  showPassword = false;
  organizationsData: any = {};
  logoFl: any;
  logoSl: any;
  model: LoginModel = { rememberMe: true, isMobileBrowser: false };
  forgetPassModel: ForgetPasswordModel = {};
  orgCode: string = '';

  constructor(private router: Router,
    private storage: IonicStorageService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    public platform: Platform,
    public tokenService: TokenService,
    public base: BaseClass,
    public alertController: AlertController,
    private localStorage: StorageService,
    private activatedRoute: ActivatedRoute
    ) 
    {      
      let changeOrg = this.activatedRoute.snapshot.queryParamMap.get('changed');
      if(changeOrg == "true") {
        let redirectUrl = window.location.href.split("?")[0];
        window.location.assign(redirectUrl);
      }

      if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
        this.model.isMobileBrowser = true;
      }
    }

  async ngOnInit(): Promise<void> {
    this.organizationsData = await this.storage.getObject('organization');
    this.orgCode = (await this.storage.get('organization-code')).value;

    this.logoFl =  this.organizationsData['logoURLFl'] !== '' ? this.sanitizer.bypassSecurityTrustResourceUrl(this.organizationsData['logoURLFl']): 'assets/logo.jpeg';
    this.logoSl = this.organizationsData['logoURLSl'] !== '' ? this.sanitizer.bypassSecurityTrustResourceUrl(this.organizationsData['logoURLSl']) : 'assets/logo.jpeg';
    console.log("resss = ", this.organizationsData);
    this.model.code = this.organizationsData.code;    
  }

  togglePasswordType() {
    this.showPassword = !this.showPassword;
    this.passwordToggleIcon = this.showPassword ? 'eye-off' : 'eye';
  }


  async login() {
    if (this.model.code === undefined
      || this.model.userName === undefined
      || this.model.password === undefined) {
      return;
    }
    this.model.token = (await this.storage.get('device-token')).value;
    this.base.showLoader();
    this.authService.login(this.model).pipe(
      catchError(error => {
        this.base.hideLoader();
        this.base.toastErrorWithHeader(error,'Data.LoginFailed',false);
        return of();
      })).subscribe((result: any) => {
        this.base.hideLoader();
        if (result && result.token) {

          const helper = new JwtHelperService();
          const claims = SessionManager.parseJwt(result.token);
          this.tokenService.storeTokens(result, claims, this.model.code, this.model.rememberMe);
          this.authService.userProfile = {
            isManager: result.isManager
            , organizationData: result.organizationData
            , claims
          };
          if (result.infoMessage !== "" && result.infoMessage != null) {
            this.base.toastErrorWithHeader(result.infoMessage,'Data.loggedoutfromotherdevice',false);
          }
          this.router.navigate(['/home'], { replaceUrl: true });
          return true;
        }
        return false;
      });
  }


  changeorganization(){
    this.tokenService.removeTokens();
    this.storage.removeItem('organization');
    this.storage.removeItem('organization-code');
    this.resetOrganizationHosts();
    this.router.navigate(['/organization'], { replaceUrl: true });
  }
  resetOrganizationHosts(){
    GlobalVars.HostApi = "";
    GlobalVars.NotificationApi = "";
    GlobalVars.LogsApiHub = "";
    GlobalVars.LogoutApiHub = "";
    this.localStorage.removeItemHash('host-api');
    this.localStorage.removeItemHash('notification-api');
    this.localStorage.removeItemHash('logs-hub-api');
    this.localStorage.removeItemHash('logout-hub-api');
  }


  async forgetPassword() {
    const alert = await this.alertController.create({
      cssClass: 'forgetpass',
      header: this.base.Localize.translate.instant('Data.ForgotPassword'),
      // subHeader: 'Subtitle',
      message: '<img src="/assets/images/forgot.png" class="imgalert">' + this.base.Localize.translate.instant('message.msgForgetPassword'),
      inputs: [
        {
          name: 'OrgnCode',
          type: 'text',
          label: this.base.Localize.translate.instant('Data.enterOrganizationCode'),
          placeholder: this.base.Localize.translate.instant('Data.enterOrganizationCode'),
          value: this.orgCode,
          disabled: (this.orgCode !== undefined && this.orgCode !== null && this.orgCode !== '') ? true : false
        },
        {
          name: 'Email',
          type: 'email',
          placeholder: this.base.Localize.translate.instant('Data.yourEmail'),
        }
      ],
      buttons:
        [
          {
            text: this.base.Localize.translate.instant('Data.Cancel'),
            role: 'cancel',
            cssClass: 'fpbtncancel',
          }
          , {
            text: this.base.Localize.translate.instant('Data.Send'),
            cssClass: 'fpbtnsave',
            handler: async (alertData) => {
              if (alertData.OrgnCode == "") {
                this.presentAlert(this.base.Localize.translate.instant('Data.reqOrganizationCode'), this.base.Localize.translate.instant('Data.Error'), true)
              }
              if (alertData.Email == "") {
                this.presentAlert(this.base.Localize.translate.instant('Data.reqEmail'), this.base.Localize.translate.instant('Data.Error'), true)
              }
              else {
                this.base.showLoader();
                this.forgetPassModel.email = alertData.Email;
                this.forgetPassModel.organizationCode = alertData.OrgnCode;
                console.log(this.forgetPassModel)
                this.authService.forgetPassword(this.forgetPassModel)
                  .subscribe(result => {
                    this.base.hideLoader();
                    this.showAlert(this.base.Localize.translate.instant('message.successfullySendMail'), this.base.Localize.translate.instant('message.successSend'));
                  }, error => {
                    this.base.hideLoader();
                    this.presentAlert(error.error, this.base.Localize.translate.instant('Data.Error'), true);
                  });
              }

            }
          }

        ]

    });

    await alert.present();
  }

  async presentAlert(message: string, header: string, isForgetPass: boolean = false) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      message,
      animated: true,
      buttons: [{
        text: 'Ok',
        role: 'Ok',
        handler: Data => {
          if (isForgetPass)
            this.forgetPassword();
        }
      }]
    });

    await alert.present();
  }

  private showAlert(message: string, header: string) {
    this.alertController
      .create({
        cssClass: 'my-custom-class',
        header,
        message,
        buttons: ['OK']
      })
      .then(alertEl => alertEl.present());
  }
}
