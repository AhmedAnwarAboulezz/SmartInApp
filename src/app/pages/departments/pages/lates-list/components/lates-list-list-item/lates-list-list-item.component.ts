import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-lates-list-list-item',
  templateUrl: './lates-list-list-item.component.html',
  styleUrls: ['./lates-list-list-item.component.scss'],
})
export class LatesListListItemComponent implements OnInit {
  @Input() item: any;

  isExpanded: boolean;

  constructor(public localize: TranslationService) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
