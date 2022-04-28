import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { MainService } from 'src/app/shared/@ui-components/main-header/services/main.service';
import { IAttendanceItem } from '../../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  showManagerPages: boolean;
  isTeamMember = false;
  isAuthorizeLogs = false;
  pages: any[] = [];
  tabIndex: string;
  constructor(
    public router: Router,
    public storage: IonicStorageService,
    public platform: Platform,
    public mainService : MainService
  ) {
  }
  async ngOnInit() {
   await this.isManager();
   let url = window.location.href.split('/home/')[1].split('/')[0];
   this.tabIndex = url !== undefined && url !== null ? url : 'inquiry';
  }

  async isManager() {
    this.showManagerPages = JSON.parse((await this.storage.get('isManager')).value);
    this.isTeamMember = JSON.parse((await this.storage.get('isTeamMember')).value);
    this.isAuthorizeLogs = JSON.parse((await this.storage.get('isAuthorizeLogs')).value);
    let authModules = await this.storage.getObject('authModules');
    // let authModules = {
    //   isSign:true,
    //   isMyInquiry:true,
    //   isRequests:true,
    //   isMyAdministration:true
    //  }
    if(authModules == null || authModules == undefined){
     this.initializePages();
    }
    else{
     this.initializePagesStorage(authModules);
    }
  }
  initializePagesStorage(authModules:any) {
   let allScreens = [{
      title: 'Inquiry',
      icon: 'albums-outline',
      url: 'inquiry',
      show: authModules.isMyInquiry
    },
    {
      title: 'AdmInquiry',
      icon: 'albums-outline',
      url: 'departments',
      show: this.showManagerPages && authModules.isMyAdministration
    }
    ,
    {
      title: 'MyRequests',
      icon: 'hourglass-outline',
      url: 'myRequests',
      show: authModules.isRequests
    },
    {
      title: 'Requests',
      icon: 'wallet-outline',
      url: 'requests',
      show: (this.showManagerPages || this.isTeamMember) && authModules.isRequests
    },
    {
      title: 'Sign',
      url: 'sign',
      icon: 'finger-print-outline',
      show: this.isAuthorizeLogs && !this.showManagerPages  && this.platform.is('hybrid') && (this.platform.is('android') || this.platform.is('ios'))  && authModules.isSign
    }];
   this.pages = allScreens.filter(e=>e.show === true); 
 }
  initializePages() {
    this.mainService.getMobileModules().subscribe(res => {
     this.storage.setObject('authModules', res);
     this.initializePagesStorage(res);
    });
  }
  openPendingTab(url:string){
    this.tabIndex = url;
    this.router.navigate([`/home/${url}`], { replaceUrl: true });
  }
}

