import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-attendance-list-item',
  templateUrl: './attendance-list-item.component.html',
  styleUrls: ['./attendance-list-item.component.scss'],
})
export class AttendanceListItemComponent implements OnInit {
  @Input() item: any;
  topColor= "#2dd36f";
  bottomColor= "#2dd36f";
  isExpanded: boolean;

  constructor(public localize: TranslationService) { }

  ngOnInit() {
    let color = this.getStatusColor(this.item?.attendanceStatus);
    this.topColor = color;
    this.bottomColor = color;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  getStatusColor(list) {    
    if (!list) {
      return '';
    }
    let color = '#1dd317';
    list.find(e => {
      switch (e.statusId) {
        case 2: //NoSignIn
          color = '#deb887';  
          break;
        case 3: //NoSignOut
          color = '#ffa500'; 
          break;
        case 8: //Leaves
          color = '#3dc2ff';
          break;
        case 9: //Weekend
          color = '#e317c1';
          break;
        case 10: //RestDay
          color = '#1759d3'; 
          break;
        case 11: //Absence
          color = '#df0808'; 
          break;          
        case 13: //Holiday
          color = '#3a087d'; 
          break;
        case 16: //Overtime
          color = '#adff2f';
          break;
      }
    });
    return color;
  }
}
