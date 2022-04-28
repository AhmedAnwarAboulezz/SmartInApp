import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { TabsService } from '../../../../shared/services/tabs.service';
import { LanguageService } from '../../../../shared/translation/language.service';

@Component({
  selector: 'app-main-departments',
  templateUrl: './main-departments.page.html',
  styleUrls: ['./main-departments.page.scss'],
})
export class MainDepartmentsPage {
  activeTab = 'dashboard';

  constructor(
    private router: Router,
    public localize: TranslationService,
    private tabs: TabsService
  ) {}

  navigate(requestType: IRequestType) {
    this.router.navigate([`/home/myRequests/${requestType.route}`]);
  }

  ionViewWillEnter() {
    //this.tabs.showTabs();
  }

  ionViewDidLeave() {
    //this.tabs.hideTabs();
  }

  segmentChanged(event) {
    this.activeTab = event.target.value;
  }
}

interface IRequestType {
  id?: string;
  title?: string;
  icon?: string;
  route?: string;
  hasNotifications?: boolean;
}
