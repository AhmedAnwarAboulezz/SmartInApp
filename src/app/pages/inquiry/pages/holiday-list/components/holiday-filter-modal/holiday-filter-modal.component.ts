import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { HolidayFilter } from '../models/filter';
import { HolidayService } from '../services/holiday.service';

@Component({
  selector: 'app-holiday-filter-modal',
  templateUrl: './holiday-filter-modal.component.html',
  styleUrls: ['./holiday-filter-modal.component.scss'],
})

export class HolidayFilterModalComponent implements OnInit {
  
  filter: HolidayFilter = {};
  statusList: any[];
  maxData : any = (new Date()).getFullYear() + 3;
  constructor(
    public modalController: ModalController,
    private holidayService: HolidayService,
    public localize: TranslationService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');
    }

  ngOnInit() {
    this.loadLookup();

  }

  loadLookup(): void {
    this.holidayService.getAttendanceStatus().subscribe((res: any) => {
      console.log(res);
      this.statusList = res;
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