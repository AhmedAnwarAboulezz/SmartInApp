import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { PartDayPermissionFilter } from '../models/filter';
import { PartDayPermissionService } from '../services/part-day-permission.service';

@Component({
  selector: 'app-part-day-filter-modal',
  templateUrl: './part-day-filter-modal.component.html',
  styleUrls: ['./part-day-filter-modal.component.scss'],
})


export class PartDayFilterModalComponent implements OnInit {
  maxData : any = (new Date()).getFullYear() + 3;
  filter: PartDayPermissionFilter = {}; 
  user: { EmployeeId: any; };
  typesList: any[];
  timesList: any[];
  //statusList: any[];
  constructor(
    public modalController: ModalController,
    private partDayPermissionService: PartDayPermissionService,
    public localize: TranslationService,
    private storage: IonicStorageService,
    public navParams: NavParams) {
      this.filter = this.navParams.get('filter');
    }

 async ngOnInit() {
    this.user = JSON.parse((await this.storage.get('inquiry-claims')).value);

    this.loadLookup();

  }

  loadLookup(): void {
    if (this.typesList && this.timesList) {
      return;
    }
    this.partDayPermissionService.getAttendanceStatus(this.user.EmployeeId).subscribe((res: any) => {
      console.log('res', res);
      this.typesList = res[0];
      this.timesList = res[1];
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
