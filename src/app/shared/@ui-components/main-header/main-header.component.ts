import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { BaseClass } from 'src/app/base/components/base-component';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { OverPageSideModalService } from '../over-page-side-modal/over-page-side-modal.service';
import { MainService } from './services/main.service';
import {  Platform } from '@ionic/angular';
import { Events } from 'src/app/base/services/events.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() isNotifications = false;
  @Input() isProfile = false;
  claims: any = {};
  organizationData: any = {};
  employeeImage = '/assets/images/user.jpg';
  notificationCount;
  showManagerPages: boolean;
  isTeamMember = false;
  isAuthorizeLogs = false;
  pages: any[] = [];

  theMode=false;


  @ViewChild('menu', { read: TemplateRef }) menu: TemplateRef<any>;

  menuItems = [
    
  ];

  notificationPath = {
    route: '/home/notifications',
  };

  profilePath = {
    route: '/home/user',
  };

  connection: signalR.HubConnection;
  logoutConnection: signalR.HubConnection;

  constructor(
    public modal: OverPageSideModalService,
    private router: Router,
    public base: BaseClass,
    public storage: IonicStorageService,
    public mainService : MainService,
    public notificationUrl: ConfigService,
    public platform: Platform,
    private events: Events,
    private chnageHappened: ChangeDetectorRef

  ) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.notificationUrl.getNotificationUrl()}`)
          .withAutomaticReconnect().build();
        // logout hub
      this.logoutConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.notificationUrl.getLogoutHubUrl()}`)
        .withAutomaticReconnect().build();
      // end
      this.connect();

  }

  getNotificationCount(type: string){
    this.mainService.getNotificationsCount().subscribe(count => {
      this.notificationCount = count;
      if(type == 'connect'){
        this.chnageHappened.detectChanges();
        // let element: HTMLElement = document.getElementById('testinIds') as HTMLElement;
        // element.click();
      }
    });
  }
   connect() {
    console.log('connect');
    this.connection.start().catch(err => console.log(err));
    this.connection.on('SendNotificationToClient', () => {
     this.getNotificationCount('connect');
    });
    // logout
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      this.logoutConnection.start().catch(err => console.log("logout Eroooooor => " , err));
      this.logoutConnection.on('Logout', userId => {
        this.storage.getObject('user-credentials').then(x => {
          if (userId.toString().toLowerCase() === (x.organizationData.id + x.userName).toString().toLowerCase()) { this.logOut(true); }
        });
      });
    }
  }
  async ngOnInit() {
    //alert("rrrr");
    await this.isManager();
    await this.getUserData();
    //await this.getUserImage();
    this.getNotificationCount('');
    this.setThemeMode();

    // const toggle = document.querySelector('#themeToggle');
    // // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    // toggle.addEventListener('ionChange', (ev:any) => {
    //   document.body.classList.toggle('dark', ev.detail.checked);
    // });
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // // Listen for changes to the prefers-color-scheme media query
    // prefersDark.addListener((e) => this.checkToggle(e.matches, toggle));
   }

   async setThemeMode(){
    let test = await this.storage.get("mode");
    if(test == undefined || test == null || test.value == "" || test.value == "light"){
      this.theMode = false;
    }
    else{
      this.theMode = true;
    }
    document.body.classList.toggle('dark', this.theMode);
   }

   async getUserData() {
    this.organizationData = await this.storage.getObject('user-credentials');
    this.claims = JSON.parse((await this.storage.get('inquiry-claims')).value);
    this.employeeImage = '/assets/images/user.jpg';
    //this.getUserImage();
  }
  
  async getUserImage() {
   await this.mainService.getEmployeeImage(this.claims.EmployeeId).subscribe(response => {
      if (response != null && response !== '') {
        this.employeeImage = response;
      }
    });
  }
   async isManager() {
     this.showManagerPages = JSON.parse((await this.storage.get('isManager')).value);
     this.isTeamMember = JSON.parse((await this.storage.get('isTeamMember')).value);
     this.isAuthorizeLogs = JSON.parse((await this.storage.get('isAuthorizeLogs')).value);
     let authModules = await this.storage.getObject('authModules');
    //  let authModules = {
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
      name: 'Sign',
      icon: 'finger-print-outline',
      route: '/home/sign',
      show: this.isAuthorizeLogs && this.platform.is('hybrid') && (this.platform.is('android') || this.platform.is('ios')) && authModules.isSign
    },
    {
      name: 'Inquiry',
      icon: 'keypad-outline',
      route: '/home/inquiry',
      show: authModules.isMyInquiry
    },
    {
      name: 'MyRequests',
      icon: 'calendar-number-outline',
      route: '/home/myRequests',
      show:  authModules.isRequests
    },
    {
      name: 'AdmInquiry',
      icon: 'file-tray-full-outline',
      route: '/home/departments',
      show: this.showManagerPages && authModules.isMyAdministration
    },
    {
      name: 'Requests',
      icon: 'document-outline',
      route: '/home/requests',
      show: (this.showManagerPages || this.isTeamMember) && authModules.isRequests
    }];
    this.pages = allScreens.filter(e=>e.show === true); 
  }
   initializePages() {
     this.mainService.getMobileModules().subscribe(res => {
      this.storage.setObject('authModules', res);
      this.initializePagesStorage(res);
     });


    //  return [
    //   // {
    //   //   name: 'Home',
    //   //   icon: 'stopwatch-outline',
    //   //   route: '/home/attendance',
    //   //   show: true
    //   // },
    //   // {
    //   //   name: 'Sign',
    //   //   icon: 'finger-print-outline',
    //   //   route: '/home/departments/sign',
    //   //   show: this.isAuthorizeLogs && this.platform.is('hybrid') && (this.platform.is('android') || this.platform.is('ios'))
    //   // },
    //   {
    //     name: 'Sign',
    //     icon: 'finger-print-outline',
    //     route: '/home/sign',
    //     show: this.isAuthorizeLogs && this.platform.is('hybrid') && (this.platform.is('android') || this.platform.is('ios'))
    //   },
    //   {
    //     name: 'Inquiry',
    //     icon: 'keypad-outline',
    //     route: '/home/inquiry',
    //     show: true
    //   },
    //   {
    //     name: 'MyRequests',
    //     icon: 'calendar-number-outline',
    //     route: '/home/myRequests',
    //     show: true
    //   },
    //   {
    //     name: 'AdmInquiry',
    //     icon: 'file-tray-full-outline',
    //     route: '/home/departments',
    //     show: this.showManagerPages
    //   },
    //   {
    //     name: 'Requests',
    //     icon: 'document-outline',
    //     route: '/home/requests',
    //     show: this.showManagerPages || this.isTeamMember
    //   }
    //  ];
   }

  showModal() {
    this.modal.template = this.menu;
    this.modal.toggleShow();
  }

  // logOut() {
  //   this.modal.toggleShow();
  //   this.router.navigate(['/organization']);
  // }
  async logOut(hub: boolean) {
    const lang = (await this.base.storage.get('language')).value;
    const deviceToken = (await this.base.storage.get('device-token')).value;
    const code = (await this.base.storage.get('code')).value;
    const orgCode = (await this.base.storage.get('organization-code')).value;
    // const orgCodedATA = (await this.base.storage.get('organization-code')).value;
    const organizationsData = await this.storage.getObject('organization');
    this.base.storage.clear();
    this.base.storage.set('device-token', deviceToken);
    this.base.storage.set('language', lang);
    this.base.storage.set('code', code);
    this.base.storage.set('organization-code', orgCode);
    this.base.storage.setObject('organization', organizationsData);
    this.modal.toggle = false;
    if(hub){
      this.base.toastError('anotherUserLoggedIn',true);
    }
    this.router.navigate(['/login'], { replaceUrl: true });
    //this.events.destroy('pages:title');
    //this.events.destroy('notification:count');
    //this.events.destroy('pages:showBackButton');
  }

  navigate(item) {
    this.modal.toggleShow();
    this.router.navigate([item.route], { replaceUrl: true });
  }

  navigateToNotification(item) {
    this.router.navigate([item.route], { replaceUrl: true });
  }

  navigateToProfile(item) {
    this.router.navigate([item.route], { replaceUrl: true });
  }

  toggleMenu(){
    this.modal.toggleShow();
  }
  
  testBtn(){
  }

  // loadApp() {
  //   this.checkToggle(prefersDark.matches);
  // }
  
  // Called by the media query to check/uncheck the toggle
  checkToggle(shouldCheck, toggle) {
    toggle.checked = shouldCheck;
  }

  testTheme(event){    
    document.body.classList.toggle('dark', event);
   if(event){
     this.storage.set("mode","dark");
   }
   else{
    this.storage.set("mode","light");
   }   
  }

}

