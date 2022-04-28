import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-live-logs-list-list-item',
  templateUrl: './live-logs-list-list-item.component.html',
  styleUrls: ['./live-logs-list-list-item.component.scss'],
})
export class LiveLogsListListItemComponent implements OnInit {
  @Input() item: any;

  isExpanded: boolean;

  constructor(public localize: TranslationService) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
