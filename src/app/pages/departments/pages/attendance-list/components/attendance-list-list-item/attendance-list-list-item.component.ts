import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-attendance-list-list-item',
  templateUrl: './attendance-list-list-item.component.html',
  styleUrls: ['./attendance-list-list-item.component.scss'],
})
export class AttendanceListListItemComponent implements OnInit {
  @Input() item: any;
  topColor= "#2dd36f";
  bottomColor= "#2dd36f";
  isExpanded: boolean;

  constructor(public localize: TranslationService) {}

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
  // getStatusColor(list) {    
  //   if (!list) {
  //     return '';
  //   }
  //   let color = '#2dd36f';
  //   list.find(e => {
  //     switch (e.statusId) {
  //       case 16:
  //         color = '#3dc2ff';
  //         break;
  //       case 8:
  //         color = '#1769aa';
  //         break;
  //       case 9:
  //         color = '#1769aa';
  //         break;
  //       case 11:
  //         color = '#ffc409';
  //         break;
  //       case 2:
  //         color = '#ffc409';
  //         break;
  //       case 3:
  //         color = '#ffc409';
  //         break;
  //       case 10:
  //         color = '#eb445a';
  //         break;
  //     }
  //   });
  //   return color;
  // }
}
