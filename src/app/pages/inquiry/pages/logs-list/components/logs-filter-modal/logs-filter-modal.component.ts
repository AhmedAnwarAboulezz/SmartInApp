import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { LogFilter } from '../models/filter';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-logs-filter-modal',
  templateUrl: './logs-filter-modal.component.html',
  styleUrls: ['./logs-filter-modal.component.scss'],
})


export class LogsFilterModalComponent implements OnInit {
  maxData : any = (new Date()).getFullYear() + 3;
  filter: LogFilter = {};
  list: any[];
  constructor(
    public modalController: ModalController,
    private logService: LogService,
    public localize: TranslationService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');
    }

  ngOnInit() {
    this.loadLookup();

  }

  loadLookup(): void {
    this.logService.getAttendanceStatus().subscribe((res: any) => {
      this.list = res;
    });
  }

  apply() {
    const formData = { dismissed: true, filter: this.filter };
    this.modalController.dismiss(formData);
  }
  resetFilter() {
    let start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let end = new Date();
    this.filter = { startDate: start.toLocaleDateString('en-US'), endDate: end.toLocaleDateString('en-US')};
    this.apply();
  }

  close(){
    const formData = {};
    this.modalController.dismiss(formData);
  }

  

  
}