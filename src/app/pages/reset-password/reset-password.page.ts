import { Component, OnInit } from '@angular/core';
import { ResetPasswordModel } from './models/reset-password';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BaseClass } from 'src/app/base/components/base-component';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements  OnInit {

  model: ResetPasswordModel = {};
  token: string;
  currentUser: any;
  year:number = new Date().getFullYear();

  newPasswordType: string = 'password';
  newPasswordIcon: string = 'eye-off';
  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off';
  constructor(
    private authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public base: BaseClass
  ) {
  }

  ngOnInit() { 
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.base.storage.set('tokenforresetpassword', this.token);
    let jwt = new JwtHelperService ();
     if (jwt.isTokenExpired(this.token)) {
       //this.route.navigate(['/login']);
    }
    this.base.storage.removeItem('tokenforresetpassword');
  }
  ionViewWillEnter() {
  }
  resetPassword(): void {
    this.base.storage.set('inquiry-token', this.token);
    this.authService.resetPassword(this.model).subscribe(async (res: any) => {
      console.log(res);
      this.base.toastSuccess('successpasswordreset');
      var that = this;
      this.base.storage.removeItem('inquiry-token');
      setTimeout(function () {
        that.route.navigate(['/login']);
      }, 1000);
    }, error => {
      //console.log('error', error);
     // this.base.storage.removeItem('inquiry-token');
      this.base.toastError('incorrectpassword');
    });

  }
 

  hideShowPassword(type) {
    if (type == 2)
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
}