import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { LanguageService } from '../../../../../../shared/translation/language.service';
import { overTimeTypes } from '../add-over-time/add-over-time.component';

@Component({
  selector: 'app-add-over-time-list-item',
  templateUrl: './add-over-time-list-item.component.html',
  styleUrls: ['./add-over-time-list-item.component.scss'],
})
export class AddOverTimeListItemComponent implements OnInit {
  @Input() item: any;
  @Input() index: any;

  @Output() removeAction: EventEmitter<any> = new EventEmitter();
  @Output() editAction: EventEmitter<any> = new EventEmitter();

  // model:any = {
  //   actualMorningTime: 10,
  //   actualNightTime: 0, 
  //   actualWeekEndTime: 0, 
  //   actualHolidayTime: 0,  
  // };
  isExpanded: boolean;
  isEdit: boolean;
  overTimeType = overTimeTypes;

  constructor(public localize: TranslationService) {}

  ngOnInit() {
    // this.model= {
    //   actualMorningTime: this.item.actualMorningTime,
    //   actualNightTime: this.item.actualNightTime, 
    //   actualWeekEndTime: this.item.actualWeekEndTime, 
    //   actualHolidayTime: this.item.actualHolidayTime,  
    // };
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    this.toggleExpand();
  }

  removeItem(item: any){
    this.removeAction.emit({item: this.item, index: this.index});
  }


  inputchange(event, orignal, type) 
  {
    if (event.target.value === undefined || event.target.value === null || event.target.value === '') 
    {
      type === overTimeTypes.Morning ? this.item.actualMorningTime = 0 :
        type === overTimeTypes.Evening ? this.item.actualNightTime = 0 :
          type === overTimeTypes.Weekend ? this.item.actualWeekEndTime = 0 :
            this.item.actualHolidayTime = 0;
    } 
    else if (event.target.value > orignal) 
    {
      type === overTimeTypes.Morning ? this.item.actualMorningTime = orignal :
        type === overTimeTypes.Evening ? this.item.actualNightTime = orignal :
          type === overTimeTypes.Weekend ? this.item.actualWeekEndTime = orignal :
            this.item.actualHolidayTime = orignal;
    }
    this.editAction.emit({item: this.item, index: this.index});
  }
}
