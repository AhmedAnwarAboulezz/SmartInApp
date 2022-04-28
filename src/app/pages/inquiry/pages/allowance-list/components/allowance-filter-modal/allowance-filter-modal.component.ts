import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { AllowanceFilter } from '../models/filter';
import { AllowanceService } from '../services/allowance.service';

@Component({
  selector: 'app-allowance-filter-modal',
  templateUrl: './allowance-filter-modal.component.html',
  styleUrls: ['./allowance-filter-modal.component.scss'],
})

export class AllowanceFilterModalComponent implements OnInit {
  maxData : any = (new Date()).getFullYear() + 3;
  filter: AllowanceFilter = {};
  statusList: any[];
  constructor(
    public modalController: ModalController,
    private allowanceService: AllowanceService,
    public localize: TranslationService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');
    }

  ngOnInit() {
    this.loadLookup();

  }

  loadLookup(): void {
    this.allowanceService.getAttendanceStatus().subscribe((res: any) => {
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
