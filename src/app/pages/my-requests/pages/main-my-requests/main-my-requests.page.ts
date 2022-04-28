import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { TabsService } from '../../../../shared/services/tabs.service';
import { LanguageService } from '../../../../shared/translation/language.service';
import { MyRequestService } from '../../services/my-request.service';

@Component({
  selector: 'app-main-my-requests',
  templateUrl: './main-my-requests.page.html',
  styleUrls: ['./main-my-requests.page.scss'],
})
// export class MainMyRequestsPage {
//   requestsTypes: IRequestType[] = [
//     {
//       id: '1',
//       title: 'Card.PartDayPermission',
//       icon: 'assets/icons/schedule.svg',
//       hasNotifications: true,
//       route: 'part-day',
//       notificationCount:2
//     },
//     {
//       id: '2',
//       title: 'Card.Leave',
//       icon: 'assets/icons/notes.svg',
//       hasNotifications: false,
//       route: 'request-leave',
//       notificationCount: 0
//     },
//     {
//       id: '3',
//       title: 'Card.OverTime',
//       icon: 'assets/icons/clock.svg',
//       hasNotifications: false,
//       route: 'over-time',
//       notificationCount: 0
//     },
//     {
//       id: '4',
//       title: 'Card.ReturnLeave',
//       icon: 'assets/icons/schedule1.svg',
//       hasNotifications: false,
//       route: 'return-from-leave',
//       notificationCount: 0
//     },
//     {
//       id: '5',
//       title: 'Card.FullDayPermission',
//       icon: 'assets/icons/schedule2.svg',
//       hasNotifications: false,
//       route: 'full-day',
//       notificationCount: 0
//     },
//   ];

//   constructor(
//     private router: Router,
//     public localize: TranslationService,
//     private tabs: TabsService,
//   ) {}


//   navigate(requestType: IRequestType) {
//     this.router.navigate([`/home/myRequests/${requestType.route}`]);
//   }

//   ionViewWillEnter() {
//     //this.tabs.showTabs();
//   }

//   ionViewDidLeave() {
//     //this.tabs.hideTabs();
//   }
// }


export class MainMyRequestsPage {
  show = false;
  // notificationCounts: any = {
  //   partialPermissionCount:0,
  //   leaveCount:0,
  //   overTimeCount:0,
  //   returnLeaveCount:0,
  //   fullDayPermissionCount:0
  // };

  requestsTypes: IRequestType[] = [
    {
      id: '1',
      title: 'Card.PartDayPermission',
      icon: 'assets/icons/schedule.svg',
      route: 'part-day',
      //hasNotifications: true,
      notificationCount:0,
      show: true
    },
    {
      id: '2',
      title: 'Card.Leave',
      icon: 'assets/icons/notes.svg',
      route: 'request-leave',
      //hasNotifications: false,
      notificationCount: 0,
      show: true
    },
    {
      id: '3',
      title: 'Card.FullDayPermission',
      icon: 'assets/icons/schedule2.svg',
      route: 'full-day',
      //hasNotifications: false,
      notificationCount: 0,
      show: true
    },
    {
      id: '4',
      title: 'Card.ReturnLeave',
      icon: 'assets/icons/schedule1.svg',
      route: 'return-from-leave',
      //hasNotifications: false,
      notificationCount: 0,
      show: true
    },
    {
      id: '5',
      title: 'Card.OverTime',
      icon: 'assets/icons/clock.svg',
      route: 'over-time',
      //hasNotifications: false,
      notificationCount: 0,
      show: false
    },
  ];

  constructor(private tabs: TabsService,
    private router: Router,
    public localize: TranslationService,
    public storage: IonicStorageService,
    public service: MyRequestService
    ) {}

  // ionViewWillEnter() {
  //   //this.tabs.showTabs();
  // }
  async ionViewWillEnter() {
    //alert("main myrequest enter");
    this.show = JSON.parse((await this.storage.get('isManager')).value);
    this.requestsTypes.find(a=>a.id == '5').show = this.show;
    this.getNotificationCount();
  }

  navigate(requestType: IRequestType) {
    this.router.navigate([`/home/myRequests/${requestType.route}`], {replaceUrl: true});
  }
  
  getNotificationCount(){
    this.service.getWorkflowNotificationsCountByTypesForEmployee().subscribe(requests => {
      //this.notificationCounts = requests;
      this.requestsTypes.filter(a=>a.id !== '4').forEach(item => {
        item.notificationCount = item.id == '1'? requests.partialPermissionCount :
                                  item.id == '2'? requests.leaveCount :
                                  item.id == '3'? requests.fullDayPermissionCount : 
                                  requests.overTimeCount;
      })
    });

    this.service.getAllEmployeeReturnLeaveMobile().subscribe(requests => {
      //this.notificationCounts.returnLeaveCount = requests.length;
      this.requestsTypes.find(a=>a.id == '4').notificationCount = requests.length;
    });
  }

  // ionViewDidLeave() {
  //   //this.tabs.hideTabs();
  // }
  //   // ionViewWillEnter(){
  // //   alert("main enter");
  // // }
  ionViewWillLeave(){
    //alert("main myrequest leave");
  }
}

interface IRequestType {
  id?: string;
  title?: string;
  icon?: string;
  route?: string;
  hasNotifications?: boolean;
  notificationCount?:number,
  show?:boolean;
}
