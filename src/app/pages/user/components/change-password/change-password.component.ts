import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BaseClass } from 'src/app/base/components/base-component';
import { Events } from 'src/app/base/services/events.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { ChangePasswordModel } from '../models/change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})

// export class ChangePasswordComponent implements OnInit {
//   currentPasswordIcon = 'eye';
//   showCurrentPassword = false;

//   newPasswordIcon = 'eye';
//   showNewPassword = false;

//   confirmPasswordIcon = 'eye';
//   showConfirmPassword = false;
//   constructor() {}

//   ngOnInit() {}

//   toggleCurrentPasswordType() {
//     this.showCurrentPassword = !this.showCurrentPassword;
//     this.currentPasswordIcon = this.showCurrentPassword ? 'eye-off' : 'eye';
//   }

//   toggleNewPasswordType() {
//     this.showNewPassword = !this.showNewPassword;
//     this.newPasswordIcon = this.showNewPassword ? 'eye-off' : 'eye';
//   }

//   toggleConfirmPasswordType() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//     this.confirmPasswordIcon = this.showConfirmPassword ? 'eye-off' : 'eye';
//   }
// }

export class ChangePasswordComponent implements OnInit {

  model: ChangePasswordModel = {};
  readonly=true;
  validLength=false;
  validNumbers=false;
  validUpperCase=false;
  validLowerCase=false;
  validSymbols=false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  newPasswordType: string = 'password';
  newPasswordIcon: string = 'eye-off';
  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off';
  constructor(
    private authService: AuthService,
    private route: Router,
    public base: BaseClass
  ) {
  }
  foucs(){
    this.readonly = !this.readonly;

  }


  ngOnInit() { }
  ionViewWillEnter() {  }

 
  hideShowPassword(type) {
    if (type == 1)
    {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
    else if (type == 2)
    {
      this.newPasswordType = this.newPasswordType === 'text' ? 'password' : 'text';
      this.newPasswordIcon = this.newPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
    else
    {
      this.confirmPasswordType = this.confirmPasswordType === 'text' ? 'password' : 'text';
      this.confirmPasswordIcon = this.confirmPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
     
  }
  async logOut(){
    const lang = (await this.base.storage.get('language')).value;
    const deviceToken = (await this.base.storage.get('device-token')).value;
    const code = (await this.base.storage.get('code')).value;
    const orgCode = (await this.base.storage.get('organization-code')).value;
    const organizationsData = await this.base.storage.getObject('organization');
    this.base.storage.clear();
    this.base.storage.set('device-token', deviceToken);
    this.base.storage.set('language', lang);
    this.base.storage.set('code', code);
    this.base.storage.set('organization-code', orgCode);
    this.base.storage.setObject('organization', organizationsData);
    this.route.navigate(['/login'], {replaceUrl: true});
  }
  changePassword(): void {
    this.authService.changePassword(this.model).subscribe(async (res: any) => {
     this.base.toastSuccess('passChangedSuccess');
    setTimeout(() => {
      this.logOut();
    }, 2000);
    }, error => {
    this.base.toastError(error.error,false);
    //this.presentToast(this.Localize.translate.instant('message.errorChangPass'),true);
  });

  }
  



checkpattern(pass){
  
var pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'
  if (pass.match(new RegExp('[0-9]')) )   
      this.validNumbers=true;
      else
      this.validNumbers=false;

  if (pass.match( new RegExp('[a-z]')) )  
    this.validLowerCase=true;
    else
    this.validLowerCase=false;
  
  if (pass.match( new RegExp('[A-Z]')) )   
    this.validUpperCase=true;
    else
    this.validUpperCase=false;

    //var symbols = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (format.test(pass) )
    this.validSymbols=true;
    else
    this.validSymbols=false;

  if(pass.length > 8 )
    this.validLength=true;
    else
    this.validLength=false;


}







}