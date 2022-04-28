import { Component } from '@angular/core';
import { TabsService } from '../../shared/services/tabs.service';

@Component({
  selector: 'app-departments',
  templateUrl: 'departments.page.html',
  styleUrls: ['departments.page.scss'],
})
export class DepartmentsPage {
  constructor(private tabs: TabsService) {}

  ionViewWillEnter() {
    //this.tabs.showTabs();
  }

  ionViewDidLeave() {
    //this.tabs.hideTabs();
  }
}
