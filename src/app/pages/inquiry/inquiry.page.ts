import { Component } from '@angular/core';
import { TabsService } from '../../shared/services/tabs.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: 'inquiry.page.html',
  styleUrls: ['inquiry.page.scss'],
})
export class InquiryPage {
  constructor(private tabs: TabsService) {}

  ionViewWillEnter() {
    //this.tabs.showTabs();
  }

  ionViewDidLeave() {
    //this.tabs.hideTabs();
  }
}
