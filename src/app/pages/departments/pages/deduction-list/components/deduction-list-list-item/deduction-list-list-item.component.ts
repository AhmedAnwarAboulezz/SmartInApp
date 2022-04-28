import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-deduction-list-list-item',
  templateUrl: './deduction-list-list-item.component.html',
  styleUrls: ['./deduction-list-list-item.component.scss'],
})
export class DeductionListListItemComponent implements OnInit {
  @Input() item: any;

  isExpanded: boolean;

  constructor(public localize: TranslationService) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
