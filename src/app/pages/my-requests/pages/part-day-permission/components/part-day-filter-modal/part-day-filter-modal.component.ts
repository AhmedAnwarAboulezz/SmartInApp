import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-part-day-filter-modal',
  templateUrl: './part-day-filter-modal.component.html',
  styleUrls: ['./part-day-filter-modal.component.scss'],
})
export class PartDayFilterModalComponent implements OnInit {
  @Input() filtered: string;
  @Input() attendanceItems: any;

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    console.log(`🚀 ~ filtered`, this.filtered);
    console.log(`🚀 ~ attendanceItems`, this.attendanceItems);
  }

  dismiss() {
    const formData = { dismissed: true };
    this.modalController.dismiss(formData);
  }

  resetFilter() {
    const formData = {};
    this.modalController.dismiss(formData);
  }
}
