import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BaseClass } from 'src/app/base/components/base-component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenService } from 'src/app/core/services/auth/TokenService';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import {  Platform } from '@ionic/angular';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss'],
})
export class InitializeComponent implements OnInit {
  refreshtokenCounter = 0;
  isMobile = true;
  year:number = new Date().getFullYear();

  constructor(public loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    public tokenService: TokenService,
    private storage: IonicStorageService,
    public base: BaseClass,
    public Platform: Platform,
 
    ) { }

  ngOnInit() {
    if (this.Platform.is('mobileweb') || this.Platform.is('desktop')) {
      this.isMobile = false;
      this.presentLoading();
      this.checkStorage();
    }
    else{
      this.isMobile = true;
      setTimeout(() => {
        this.checkStorage();
      }, 1000);
    }    
  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading, Please Wait...',
      spinner:'bubbles',
      backdropDismiss: true,
      duration: 1000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async checkStorage() {
    const token = await this.base.storage.get('inquiry-token');
    const organizationData = await this.base.storage.getObject('user-credentials');
    const isManager = JSON.parse((await this.base.storage.get('isManager')).value);
    const validToken = await this.authService.validateToken(token.value);
    
    if (token.value == null) {
      this.router.navigate(['/organization']);
      return false;
    }
    else if (!validToken && this.refreshtokenCounter == 0) {
      this.tokenService.getReligions().subscribe(res => {
        this.refreshtokenCounter++;
        this.checkStorage();
      }, error => {
        this.router.navigate(['/login']);
      });
    } 
    else {
      this.authService.userProfile.organizationData = organizationData.organizationData;
      this.authService.userProfile.isManager = isManager;
      if(this.router.url.indexOf("/initial") !== -1){
        this.router.navigate(['/home']);
      }
    }
  }


}
