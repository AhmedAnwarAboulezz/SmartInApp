import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { FullDayPermissionFilter } from '../models/filter';
import { FullDayPermissionService } from '../services/full-day-permission.service';

@Component({
  selector: 'app-full-day-filter-modal',
  templateUrl: './full-day-filter-modal.component.html',
  styleUrls: ['./full-day-filter-modal.component.scss'],
})

export class FullDayFilterModalComponent implements OnInit {
  maxData : any = (new Date()).getFullYear() + 3;
  filter: FullDayPermissionFilter = {};
  permissions: any[] = [];
  constructor(
    public modalController: ModalController,
    private fullDayPermissionService: FullDayPermissionService,
    public localize: TranslationService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');
    }

  ngOnInit() {
    this.loadLookup();

  }

  loadLookup(): void {
    this.fullDayPermissionService.getAttendanceStatus().subscribe((res: any) => {
      console.log(res);
      this.permissions = this.permissions.concat(res);
    });
  }

  apply() {
    const formData = { dismissed: true, filter: this.filter };
    this.modalController.dismiss(formData);
  }
  resetFilter() {
    let start = new Date(new Date().getFullYear(), 0, 1);
    let end = new Date(new Date().getFullYear(),11,31);
    this.filter = { startDate: start.toLocaleDateString('en-US'), endDate: end.toLocaleDateString('en-US')};
    this.apply();
  }

  close(){
    const formData = {};
    this.modalController.dismiss(formData);
  }

  

  
}