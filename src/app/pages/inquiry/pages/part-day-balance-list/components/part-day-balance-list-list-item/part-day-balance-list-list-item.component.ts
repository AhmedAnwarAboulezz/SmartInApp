import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-part-day-balance-list-list-item',
  templateUrl: './part-day-balance-list-list-item.component.html',
  styleUrls: ['./part-day-balance-list-list-item.component.scss'],
})
export class PartDayBalanceListListItemComponent implements OnInit {
  @Input() item: any;

  isExpanded: boolean;

  constructor(public localize: TranslationService) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
