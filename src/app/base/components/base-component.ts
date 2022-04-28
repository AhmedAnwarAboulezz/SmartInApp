import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { Events } from '../services/events.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';



@Injectable()
export class BaseClass implements OnInit {
    dayDate = new Date();
    maxDate: any = new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString();
    constructor(
      public Toast: ToastController,
      public loader: LoadingService,
      public Route: Router,
      public Localize: TranslationService,
      public storage: IonicStorageService,
    ) {
     }

    ngOnInit(): void {
    }

   async checkStorageLang(){
     let lang = (await this.storage.get('language')).value;
     if(lang == undefined || lang == null || lang == "") lang = 'en';
     this.setLanguage(lang);
   }

    translate(key: string){
      let result = this.Localize.translate.instant(key);
      return result;
    }
     async getStorageByKey(key : string): Promise<any>{
      return (await this.storage.get(key)).value;
    }

    showLoader(){
      this.loader.show();
    }
    hideLoader(){
      this.loader.hide();
    }
    isEnglish() : boolean{
      return this.Localize.isEnglish();
    }
    Redirect() {
        const currentRoute = this.Route.url;
        const index = currentRoute.lastIndexOf('/');
        const str = currentRoute.substring(0, index);
        this.Route.navigate([str]);
    }
    calculateDiff(fromDate, toDate) {
        toDate = new Date(toDate);
        fromDate = new Date(fromDate);
        return Math.floor((Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
            - Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()))
            / (1000 * 60 * 60 * 24)) + 1;
    }

    getcasted(result: any){
     if(result == undefined) return "0";
     if(result.toString().includes('.')){
       let ttt = result.toString().split('.');
       return ttt[0] + '.' +ttt[1].substring(0,2);
     }
     return result;
    }

    async toastSuccess(message, translate: boolean = true, position: number = 0) {
      const toast = await this.Toast.create({
        message: translate ? this.translate('message.' + message) : message,
        animated: true,
        duration: 3000,
        position: position == 0 ? 'top': position == 1 ? 'bottom': 'middle',
        color : 'success',
        cssClass: 'text-center'
          });
      toast.present();
    }
    async toastError(message, translate: boolean = true, position: number = 0,duration: number =3000) {
      const toast = await this.Toast.create({
        message: translate ? this.translate('message.' + message) : message,
        animated: true,
        duration: duration,
        position: position == 0 ? 'top': position == 1 ? 'bottom': 'middle',
        color: 'danger',
        cssClass: 'text-center'
      });
      toast.present();
    }

    async toastInformation(message, translate: boolean = true, position: number = 0) {
      const toast = await this.Toast.create({
        message: translate ? this.translate('message.' + message) : message,
        animated: true,
        duration: 3000,
        position: position == 0 ? 'top': position == 1 ? 'bottom': 'middle',
        color : 'favorite',
        cssClass: 'text-center'   
      });
      toast.present();
    }


    async toastErrorWithHeader(message, header, translate: boolean = true, position: number = 0,duration: number =3000) {
      const toast =  await this.Toast.create({
        header: this.translate(header),
        message:  translate ? this.translate('message.' + message): message,
        animated: true,
        duration: duration,
        position: position == 0 ? 'top': position == 1 ? 'bottom': 'middle',
        color: 'danger',
        cssClass: 'text-center'
      });
      toast.present();
    }


    setLanguage(lang: string): void {
      this.Localize.setLanguage(lang);
      this.storage.set('language', lang);
      document.body.classList.remove('lang-en', 'lang-ar');
      document.body.classList.add(lang === 'en' ? 'lang-en' : 'lang-ar');
      const str = this.Route.url.substring(this.Route.url.lastIndexOf('/'));
      if(str == "/main-inquiry" || str == "/main-departments") window.location.reload();
    }

}
