import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-full-day-list-list-item',
  templateUrl: './full-day-list-list-item.component.html',
  styleUrls: ['./full-day-list-list-item.component.scss'],
})
export class FullDayListListItemComponent implements OnInit {
  @Input() item: any;

  isExpanded: boolean;

  constructor(public localize: TranslationService) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
