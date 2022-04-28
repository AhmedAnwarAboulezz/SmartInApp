import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-deduction-filter-modal',
  templateUrl: './deduction-filter-modal.component.html',
  styleUrls: ['./deduction-filter-modal.component.scss'],
})


export class DeductionFilterModalComponent implements OnInit {
  
  year: number ;
  years:number[]=[];
  constructor(
    public modalController: ModalController,
    public localize: TranslationService,
    public navParams: NavParams) 
    {
      this.year = this.navParams.get('year');
      if (this.year == undefined || this.year == null)
      {
        this.year = new Date().getFullYear();
      }
    }

  ngOnInit() {
    this.getYears();
    // if (this.year?1:0==0)
    // {
    //   this.year = new Date().getFullYear();
    // }
  }

  getYears(){
    for (let i = 0; i < 3; i++) {
      this.years.push(new Date().getFullYear()- i);   
    }
  }

  apply() {
    const formData = { dismissed: true, year: this.year };
    this.modalController.dismiss(formData);
  }
  resetFilter() {
    this.year = new Date().getFullYear();
    this.apply();
  }

  close(){
    const formData = {};
    this.modalController.dismiss(formData);
  }

  

  
}