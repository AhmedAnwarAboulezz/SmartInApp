import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { LeaveFilter } from '../models/filter';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-leavs-filter-modal',
  templateUrl: './leavs-filter-modal.component.html',
  styleUrls: ['./leavs-filter-modal.component.scss'],
})

export class LeavsFilterModalComponent implements OnInit {
  maxData : any = (new Date()).getFullYear() + 3;
  filter: LeaveFilter = {};
  statusList: any[];
  constructor(
    public modalController: ModalController,
    private leaveService: LeaveService,
    public localize: TranslationService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');
    }

  ngOnInit() {
    this.loadLookup();

  }

  loadLookup(): void {
    this.leaveService.getAttendanceStatus().subscribe((res: any) => {
      console.log(res);
      this.statusList = res;
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