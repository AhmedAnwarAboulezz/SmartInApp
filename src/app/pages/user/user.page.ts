import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss'],
})
export class UserPage {
  activeTab = 'profile';
  constructor() {}

  segmentChanged(event) {
    this.activeTab = event.target.value;
  }
}
