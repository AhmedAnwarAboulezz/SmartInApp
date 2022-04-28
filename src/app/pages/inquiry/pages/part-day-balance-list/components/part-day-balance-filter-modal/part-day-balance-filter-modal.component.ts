import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { PartDayPermissionBalanceFilter } from '../models/filter';

@Component({
  selector: 'app-part-day-balance-filter-modal',
  templateUrl: './part-day-balance-filter-modal.component.html',
  styleUrls: ['./part-day-balance-filter-modal.component.scss'],
})

export class PartDayBalanceFilterModalComponent implements OnInit {
  maxData : any = (new Date()).getFullYear() + 3;
 filter: any = {};
 //myDate: String ;

  years:number[]=[];
  constructor(
    public modalController: ModalController,
    public localize: TranslationService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');  
      if (this.filter.monthYear === undefined) { this.filter.monthYear = new Date().toDateString(); }

    }

  ngOnInit() {
   
  }

  

  apply() {
    const formData = { dismissed: true, filter: this.filter };
    this.modalController.dismiss(formData);
  }
  resetFilter() {
    this.filter.monthYear = new Date().toDateString();
    // this.filter = {year:new Date().getFullYear(),month:new Date().getUTCMonth()+1};
    // this.myDate= new Date(this.filter.year,this.filter.month-1,1,0,0,0).toLocaleDateString('en-US');
    this.apply();
  }

  close(){
    const formData = {};
    this.modalController.dismiss(formData);
  }

  

  
}