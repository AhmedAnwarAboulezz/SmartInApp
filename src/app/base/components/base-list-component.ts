import { Directive, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { LoadingService } from 'src/app/core/services/loader/loader.service';
import { BaseService } from '../services/base.service';


@Directive()
export abstract class BaseListComponent implements OnInit {
    protected subList: Subscription;
    protected subInitiList: Subscription;
    mainUrl: string;
    filter: any;
    list: any[] = [];
    dayDate = new Date();
    opt: any = {
        limit: 10,
        offset: 1,
        sortDirection: 'ascending',
        sortField: 'id'
    };

    maximumPages = 1;
    currentCount = 0;
    totalCount = 0;
    maxDate: any = new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString();
    sortTypeId = 0;
    ascSortType = false;
    // get Localize(): TranslationService { return Shell.Injector.get(TranslationService); }
    // get events(): Events { return Shell.Injector.get(Events); }
    // get Route(): Router { return Shell.Injector.get(Router); }
    // get loader(): LoadingService { return Shell.Injector.get(LoadingService); }
    // get Toast(): ToastController { return Shell.Injector.get(ToastController); }
    //get BaseService(): BaseService{ return Shell.Injector.get(BaseService); }
    constructor(
      private BaseService: BaseService,
      private Toast: ToastController,
      public loader: LoadingService,
      private Route: Router,
      private Localize: TranslationService
    ) { }   
    abstract get Service(): HttpService;

    ngOnInit(): void {
    }

    Redirect() {
        const currentRoute = this.Route.url;
        const index = currentRoute.lastIndexOf('/');
        const str = currentRoute.substring(0, index);
        this.Route.navigate([str]);
    }

    resetCountAndData(): void {
        this.list = [];
        this.totalCount = 0;
        this.currentCount = 0;
        this.opt.offset = 1;
        this.maximumPages = 1;
    }

    calculateDiff(fromDate, toDate) {
        toDate = new Date(toDate);
        fromDate = new Date(fromDate);
        return Math.floor((Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
            - Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()))
            / (1000 * 60 * 60 * 24)) + 1;
    }


    loadTableData(event?: any, withoutConcat?:boolean) {
        console.log(this.opt.offset, this.maximumPages);
        if (this.opt.offset > this.maximumPages) {
          return false;
        }
        this.loader.show();
        this.subList = this.BaseService.getGridData(this.mainUrl,this.filter, this.opt).subscribe((res: any) => {
          console.log('res', res);
          this.dayDate = this.filter.dayDate === undefined ? new Date() : new Date(this.filter.dayDate);
          this.list = withoutConcat? res.list : this.list.concat(res.list);
          this.totalCount = res.count;
          this.maximumPages = res.pagesCount;
          this.currentCount = this.currentCount + res.list.length;
          this.loader.hide();
        },error =>{
          this.loader.hide();
          this.toastError(error,false);
        });
        
        if (event) {
          event.target.complete();
        }
      }


      doRefresh(event) {
        setTimeout(() => {
          this.resetCountAndData();
          this.loadTableData();
          event.target.complete();
        }, 2000);
      }

      loadData(event?: any) {
        this.opt.offset++;
        this.loadTableData(event);
        if (this.currentCount >= this.totalCount) {
          event.target.disabled = true;
        }
      }

      async toastSuccess(message, translate: boolean = true, position: number = 0) {
        const toast = await this.Toast.create({
          message: translate ? this.Localize.translate.instant('message.' + message) : message,
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
          message: translate ? this.Localize.translate.instant('message.' + message) : message,
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
          message: translate ? this.Localize.translate.instant('message.' + message) : message,
          animated: true,
          duration: 3000,
          position: position == 0 ? 'top': position == 1 ? 'bottom': 'middle',
          color : 'favorite',
          cssClass: 'text-center'   
        });
        toast.present();
      }
      
      delay(ms: number) {
        return new Promise( resolve => {
          setTimeout(resolve, ms);
        } );
      }
      

}
