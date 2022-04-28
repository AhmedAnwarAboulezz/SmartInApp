import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BaseClass } from 'src/app/base/components/base-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';
import { LanguageService } from '../../../../../../shared/translation/language.service';
import { IRequestLeave } from '../list-request-leave/list-request-leave.component';

@Component({
  selector: 'app-request-leave-list-item',
  templateUrl: './request-leave-list-item.component.html',
  styleUrls: ['./request-leave-list-item.component.scss'],
})
export class RequestLeaveListItemComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;

  @Input() item: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  isExpanded: boolean;
  workflowStatus = WorkflowStatus;

  constructor(
    public localize: TranslationService,
    public Service: MyRequestService,
    public modal: OverPageModalService,
    public base: BaseClass,
  ) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  showModal() {
    this.modal.template = this.filterContent;
    this.modal.toggleShow();
  }

  removeRequest(event, id) {
    console.log(`🚀 ~ removeRequest ~ id`, id);
    this.Service.removeRequest(id).subscribe((resp) => {
      console.log(`🚀 ~ this.Service.removeRequest ~ resp`, resp);
      this.action.emit({ id: id, type: 'remove' });
    }, error => {
      this.action.emit({ id: 0, type: '' });
    });
  }

  calculateDiff(fromDate, toDate) {
    toDate = new Date(toDate);
    fromDate = new Date(fromDate);
    return Math.floor((Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
        - Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()))
        / (1000 * 60 * 60 * 24)) + 1;
  }
}
