import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/base/services/events.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { INotifications } from '../../notifications.page';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications-list-item',
  templateUrl: './notifications-list-item.component.html',
  styleUrls: ['./notifications-list-item.component.scss'],
})
export class NotificationsListItemComponent implements OnInit {
  @Input() item: any;
  @Input() segmentValue: any;
  constructor(
    public localize: TranslationService,
    private route: Router,
    public events : Events,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {}

  navigateToUrl(notification) {
    console.log(notification);
    
    if (notification.isSeen == false) {
      this.notificationService.makeNotificationSeen(notification.id).subscribe(() => {
        this.events.publish('notification:count', {});
      });
    }
    if(this.segmentValue == 1){
      this.route.navigate([notification.url]);
    }
    else{
      if(notification.url !== null && notification.url !== ''){
        window.open(notification.url, '_blank');
      }
    }   
  }
}
