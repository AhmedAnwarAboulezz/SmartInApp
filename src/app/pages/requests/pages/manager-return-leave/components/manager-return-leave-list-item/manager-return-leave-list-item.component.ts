import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BaseClass } from 'src/app/base/components/base-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { RequestService } from 'src/app/pages/requests/services/request.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';

@Component({
  selector: 'app-manager-return-leave-list-item',
  templateUrl: './manager-return-leave-list-item.component.html',
  styleUrls: ['./manager-return-leave-list-item.component.scss'],
})
export class ManagerReturnLeaveListItemComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;  
  @Input() item: any;
  @Input() isHistory:any;
  @Output() action: EventEmitter<any> = new EventEmitter();
  isExpanded: boolean;
  workflowStatus = WorkflowStatus;
  isApprovedAction = false;
  
  constructor(
    public localize: TranslationService,
    public Service: RequestService,
    public modal: OverPageModalService,
    public base: BaseClass
    ) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
  showModal(actionType: boolean) {
    this.isApprovedAction = actionType;
    this.modal.template = this.filterContent;
    this.modal.toggleShow();
  }

  approve(id: string, comment: string, startDate: Date): void {
    let message = 'RequestReject';
    let _statusId = WorkflowStatus.Reject;
    if (this.isApprovedAction) {
      message = 'RequestApproved';
      _statusId = WorkflowStatus.Approve;
    }
    const approveDto = { id, statusId: _statusId, comment, startDate: startDate };
    this.Service.approveOrreject(approveDto).subscribe((res: any) => {
      console.log('res', res);
      if (res == null) {
        this.base.toastSuccess(message);
        this.action.emit({ id: id, type: 'remove' });
      }
    }, error => {
      console.log('error', error);
      this.base.toastError(error.error, false);
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
