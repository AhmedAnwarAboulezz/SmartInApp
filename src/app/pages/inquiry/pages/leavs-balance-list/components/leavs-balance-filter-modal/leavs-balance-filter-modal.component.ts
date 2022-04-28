import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { LeaveBalanceFilter } from '../models/filter';

@Component({
  selector: 'app-leavs-balance-filter-modal',
  templateUrl: './leavs-balance-filter-modal.component.html',
  styleUrls: ['./leavs-balance-filter-modal.component.scss'],
})

export class LeavsBalanceFilterModalComponent implements OnInit {
  currentYear = new Date().getFullYear();
  filter: LeaveBalanceFilter = {};
  years:number[]=[];
  constructor(
    public modalController: ModalController,
    public localize: TranslationService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');
      this.getYears();
    }

  ngOnInit() {
    if(this.filter.year == undefined 
      || this.filter.year == null 
      || !this.years.includes(this.filter.year)){
      this.filter.year = new Date().getFullYear();
    }
    //this.getYears();
    // if (this.filter.year?1:0==0)
    // {
    //   this.filter = {year:new Date().getFullYear()};
    // }
  }

  getYears(){
    for (let i = 0; i < 3; i++) {
      this.years.push(this.currentYear- i);   
    }
  }


  apply() {
    const formData = { dismissed: true, filter: this.filter };
    this.modalController.dismiss(formData);
  }
  resetFilter() {
    this.filter = {year:this.currentYear};
    this.apply();
  }

  close(){
    const formData = {};
    this.modalController.dismiss(formData);
  }

  

  
}