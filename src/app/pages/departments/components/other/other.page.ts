import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from '../../../../shared/@ui-components/over-page-modal/over-page-modal.service';

@Component({
  selector: 'app-other',
  templateUrl: 'other.page.html',
  styleUrls: ['other.page.scss'],
})

export class OtherPage implements OnInit {
  requestsTypes: any[] = [
    {
      id: '1',
      title: 'Deduction',
      icon: 'assets/icons/deduction.png',
      route: 'deduction-list',
    }
  ];

  constructor(public localize: TranslationService, private router: Router) {}

  ngOnInit() {}

  navigate(requestType: any) {
    this.router.navigate([`/home/departments/${requestType.route}`]);
  }
}
