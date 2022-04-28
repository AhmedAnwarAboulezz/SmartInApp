import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { TranslationService } from './core/services/localization/translation.service';
import { IonicStorageService } from './core/services/storage/ionicStorageService.service';
import { Router } from '@angular/router';
// import {
//   PushNotification,
//   PushNotificationToken,
//   PushNotificationActionPerformed,
// } from '@capacitor/core';
import {
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BaseClass } from './base/components/base-component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
@AutoUnsub()
export class AppComponent implements OnInit {
  constructor(
    //public translateService: TranslationService,
    public Storage: IonicStorageService,
    private fcm: FCM,
    public router: Router,
    public platform: Platform,
    private baseClass: BaseClass,
    public storage: IonicStorageService
    
    ) {
      //this.initializeApp2();
      this.initApp();
      this.baseClass.checkStorageLang();
      //translate.setDefaultLang('en');
  }

 async ngOnInit():  Promise<void> {
    if ((this.platform.is('android') || this.platform.is('ios')) && this.platform.is('hybrid')) {
      PushNotifications.addListener(
        'registration',
        (token: Token) => {
          console.log(' PushNotifications token: ', token.value);
          this.Storage.set('device-token', token.value);
        },
      );
      // this.fcm.getToken().then(token => {
      //   alert("get : "+ token);
      //   this.tokentest = token;
      //   this.Storage.set('device-token', token);
      //   console.log(token);
      // });

      // this.fcm.onTokenRefresh().subscribe(token => {
      //   alert("refresh : "+ token);
      //   this.Storage.set('device-token', token);
      //   console.log(token);
      // });
    }  
    let organization = await this.Storage.getObject('organization');
    if(organization !== undefined && organization !== null){
      let code= organization.code;
      this.fcm.subscribeToTopic(`topics/${code}/news`);   
    }
    this.setThemeMode();
  }

  initApp(){
    this.platform.backButton.subscribe(async () => {
      let str = this.router.url.substring(this.router.url.lastIndexOf('/'));
      if(str == "/initial"
        || str == "/sign" 
        || str == "/main-inquiry"
        || str == "/main-my-requests"
        || str == "/main-departments"
        || str == "/main-manager-requests"
        || str == "/organization" 
        || str == "/login" 
        || str == "/reset"
      ) {
        (navigator as any).app.exitApp();
      }
      else{
        // this.platform.backButton.subscribeWithPriority(9999, () => {
        //   alert("disable");
        //   // do nothing
        // });
        //alert(this.router.url);
        await this.delay(200);
        if(this.router.url.includes('/myRequests/')) this.router.navigateByUrl("home/myRequests/main-my-requests");
        else if(this.router.url.includes('/requests/')) this.router.navigateByUrl("home/requests/main-manager-requests");
        else if(this.router.url.includes('/departments/')) this.router.navigateByUrl("home/departments/main-departments");
        else this.router.navigateByUrl("home/inquiry/main-inquiry");
      } 
    });
  }

  delay(ms: number) {
    return new Promise( resolve => {
      setTimeout(resolve, ms);
    } );
  }
  initializeApp2() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
            event.preventDefault();
            event.stopPropagation();
          console.log('hello');
        }, false);
      });
    });
  }

  async setThemeMode(){
    let test = await this.storage.get("mode");
    let theMode = false;
    if(test == undefined || test == null || test.value == undefined || test.value == null || test.value == "" || test.value == "light"){
      theMode = false;
      await this.storage.set("mode", "light");
    }
    else{
      theMode = true;
      await this.storage.set("mode", "dark");
    }
    document.body.classList.toggle('dark', theMode);
   }
}


export function AutoUnsub() {
  return function(constructor) {
      const orig = constructor.prototype.ngOnDestroy
      constructor.prototype.ngOnDestroy = function() {
          for(const prop in this) {
              const property = this[prop]
              if(typeof property.subscribe === "function") {
                  property.unsubscribe()
              }
          }
          orig.apply()
      }
  }
}
