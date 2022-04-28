import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  constructor() {}

  hideTabs() {
    const tabBar = document.getElementById('main-tabs');
    tabBar.style.display = 'none';
  }

  showTabs() {
    const tabBar = document.getElementById('main-tabs');
    tabBar.style.display = 'flex';
  }
}
