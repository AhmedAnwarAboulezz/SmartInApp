import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-attendance',
  templateUrl: 'attendance.page.html',
  styleUrls: ['attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  requestsTypes: any[] = [
    {
      id: '1',
      title: 'Attendance',
      icon: 'assets/icons/fingerprint-scan.svg',
      route: 'attendance-list',
    },
    {
      id: '2',
      title: 'Lates',
      icon: 'assets/icons/schedule.svg',
      route: 'lates-list',
    },
    {
      id: '3',
      title: 'Logs',
      icon: 'assets/icons/log.png',
      //schedule.svg',
      route: 'admin-list',
    },
    {
      id: '4',
      title: 'LiveLogs',
      icon: 'assets/icons/list-1.svg',
      route: 'live-logs-list',
    },
  ];

  constructor(public localize: TranslationService, private router: Router) {}

  ngOnInit() {}

  navigate(requestType: any) {
    this.router.navigate([`/home/departments/${requestType.route}`]);
  }
}
