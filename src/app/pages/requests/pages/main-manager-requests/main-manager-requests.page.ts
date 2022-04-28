import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { TabsService } from '../../../../shared/services/tabs.service';
import { LanguageService } from '../../../../shared/translation/language.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-main-manager-requests',
  templateUrl: './main-manager-requests.page.html',
  styleUrls: ['./main-manager-requests.page.scss'],
})



export class MainManagerRequestsPage implements OnInit {
  show = false;
  requestsTypes: IRequestType[] = [
    {
      id: '1',
      title: 'Card.PartDayPermission',
      icon: 'assets/icons/schedule.svg',
      route: 'manager-part-day',
      notificationCount: 0,
      requestTypeId: "8441f18d-17ba-4974-9f8b-d74472f81522",
      show: true
    },
    {
      id: '2',
      title: 'Card.Leave',
      icon: 'assets/icons/notes.svg',
      route: 'manager-leave',
      notificationCount: 0,
      requestTypeId: "40144a96-b6b3-4aae-bb68-3a9d27c58011",
      show: true
    },
    {
      id: '3',
      title: 'Card.FullDayPermission',
      icon: 'assets/icons/schedule2.svg',
      route: 'manager-full-day',
      notificationCount: 0,
      requestTypeId: "10efc918-ef1f-409a-a0b3-ee5d35932997",
      show: true
    },
    {
      id: '4',
      title: 'Card.ReturnLeave',
      icon: 'assets/icons/schedule1.svg',
      route: 'manager-return-leave',
      notificationCount: 0,
      requestTypeId: "40144a96-b6b3-4aae-bb68-3a9d27c58044",
      show: true
    },
    {
      id: '5',
      title: 'Card.OverTime',
      icon: 'assets/icons/clock.svg',
      route: 'manager-over-time',
      notificationCount: 0,
      requestTypeId: "8441f18d-17ba-4974-9f8b-d74472f81533",
      show: true
    },
  ];
  subNotification: Subscription;
  constructor(
    private router: Router,
    public localize: TranslationService,
    public storage: IonicStorageService,
    public service: RequestService
    ) {}
   ngOnInit() {
    //this.getNotificationCount();
  }


    ionViewWillEnter(){
      //alert("main manager enter");
      this.getNotificationCount();
    }
    ionViewWillLeave(){
      //alert("main manager Leave");
      if(this.subNotification){
        this.subNotification.unsubscribe();
      }
    }


  // async ionViewWillEnter() {
  //   this.show = JSON.parse((await this.storage.get('isManager')).value);
  //   this.requestsTypes.find(a=>a.id == '5').show = this.show;
  //   this.getNotificationCount();
  // }
  navigate(requestType: IRequestType) {
    debugger;
    if(requestType.notificationCount > 0){
      this.service.MakeWorkflowNotificationsSeen(requestType.requestTypeId).subscribe(requests => {
        //this.notificationCounts = requests;
      });
    }
    this.router.navigate([`/home/requests/${requestType.route}`]);
  }

  // navigate(requestType: IRequestType) {
  //   this.router.navigate([`/home/requests/${requestType.route}`]);
  // }
  
  getNotificationCount(){
   this.subNotification = this.service.getNotificationsCounts().subscribe(requests => {
      this.requestsTypes.forEach(item => {
        item.notificationCount = item.id == '1'? requests.partialPermissionCount :
                                  item.id == '2'? requests.leaveCount :
                                  item.id == '3'? requests.fullDayPermissionCount : 
                                  item.id == '4'? requests.returnLeaveCount :
                                  requests.overTimeCount;
      })
    });
  }
}

interface IRequestType {
  id?: string;
  title?: string;
  icon?: string;
  route?: string;
  hasNotifications?: boolean;
  notificationCount?:number,
  requestTypeId? :string;
  show?:boolean;
}
