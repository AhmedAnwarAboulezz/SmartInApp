import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IAttendanceItem } from '../../../../shared/models';
import { LanguageService } from '../../../../shared/translation/language.service';

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
    let color = '#2dd36f';
    list.find(e => {
      switch (e.statusId) {
        case 16:
          color = '#3dc2ff';
          break;
        case 8:
          color = '#1769aa';
          break;
        case 9:
          color = '#1769aa';
          break;
        case 11:
          color = '#ffc409';
          break;
        case 2:
          color = '#ffc409';
          break;
        case 3:
          color = '#ffc409';
          break;
        case 10:
          color = '#eb445a';
          break;
      }
    });
    return color;
  }
}
