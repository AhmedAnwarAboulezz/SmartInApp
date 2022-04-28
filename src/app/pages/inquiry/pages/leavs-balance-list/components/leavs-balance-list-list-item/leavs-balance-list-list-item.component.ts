import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-leavs-balance-list-list-item',
  templateUrl: './leavs-balance-list-list-item.component.html',
  styleUrls: ['./leavs-balance-list-list-item.component.scss'],
})
export class LeavsBalanceListListItemComponent implements OnInit {
  @Input() item: any;

  isExpanded: boolean;

  constructor(public localize: TranslationService) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
