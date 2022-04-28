import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IRequestLeave } from '../list-admin-list/list-admin-list.component';

@Component({
  selector: 'app-admin-list-list-item',
  templateUrl: './admin-list-list-item.component.html',
  styleUrls: ['./admin-list-list-item.component.scss'],
})
export class AdminListListItemComponent implements OnInit {
  @Input() item: IRequestLeave;

  isExpanded: boolean;

  constructor(public localize: TranslationService) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
