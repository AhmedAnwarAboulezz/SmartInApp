import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BaseClass } from 'src/app/base/components/base-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { RequestService } from 'src/app/pages/requests/services/request.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';

@Component({
  selector: 'app-manager-over-time-list-item',
  templateUrl: './manager-over-time-list-item.component.html',
  styleUrls: ['./manager-over-time-list-item.component.scss'],
})
export class ManagerOverTimeListItemComponent implements OnInit {

  @ViewChild('employeeContent', { read: TemplateRef })
  employeeContent: TemplateRef<any>;
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;  
  @Input() item: any;
  @Input() isHistory:any;
  @Output() action: EventEmitter<any> = new EventEmitter();  
  isExpanded: boolean;
  workflowStatus = WorkflowStatus;
  isApprovedAction = false;
  selected: any;
  
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


  showEmployeeModal(item) {
    console.log(`🚀 ~ showEmployeeModal ~ item`, item);
    this.selected = item;
    this.modal.template = this.employeeContent;
    this.modal.toggleShow();
  }

  getTotalOverTime(user: any): number{
   let res = 0;
   res=user?.actualHolidayTime + user?.actualMorningTime + user?.actualNightTime + user?.actualWeekEndTime;
   return res;
  }

  approve(id: string, month: number, year: number): void {
    let message = 'RequestReject';
    let _statusId = WorkflowStatus.Reject;
    if (this.isApprovedAction) {
      message = 'RequestApproved';
      _statusId = WorkflowStatus.Approve;
    }
    var overtimeDate = new Date(year, month, 1);
    const approveDto = { id, statusId: _statusId, comment: "", startDate: overtimeDate };
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
}
