import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-transations',
  templateUrl: 'transations.page.html',
  styleUrls: ['transations.page.scss'],
})
export class TransationsPage implements OnInit {
  requestsTypes: any[] = [
    {
      id: '1',
      title: 'Leave',
      icon: 'assets/icons/notes.svg',
      route: 'leavs-list',
    },
    {
      id: '2',
      title: 'LeaveBalance',
      icon: 'assets/icons/notes.svg',
      route: 'leavs-balance-list',
    },

    {
      id: '3',
      title: 'PartDayPermission',
      icon: 'assets/icons/schedule.svg',
      route: 'part-day-list',
    },
    {
      id: '4',
      title: 'PartDayPermissionBalance',
      icon: 'assets/icons/notes.svg',
      route: 'part-day-balance-list',
    },
    {
      id: '5',
      title: 'Allowance',
      icon: 'assets/icons/clock.svg',
      route: 'allowance-list',
    },
    {
      id: '6',
      title: 'FullDayPermission',
      icon: 'assets/icons/schedule2.svg',
      route: 'full-day-list',
    },
  ];

  constructor(public localize: TranslationService, private router: Router) {}

  ngOnInit() {}

  navigate(requestType: any) {
    this.router.navigate([`/home/inquiry/${requestType.route}`]);
  }
}
