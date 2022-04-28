import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';

@Component({
  selector: 'app-over-time-list-item',
  templateUrl: './over-time-list-item.component.html',
  styleUrls: ['./over-time-list-item.component.scss'],
})
export class OverTimeListItemComponent implements OnInit {
  @ViewChild('employeeContent', { read: TemplateRef })
  employeeContent: TemplateRef<any>;
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  @Input() item: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  
  workflowStatus = WorkflowStatus;
  isExpanded: boolean;
  selected: any;

  constructor(
    public localize: TranslationService,
    public Service: MyRequestService,
    public modal: OverPageModalService
  ) {}

  ngOnInit() {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  showEmployeeModal(item) {
    console.log(`🚀 ~ showEmployeeModal ~ item`, item);
    this.selected = item;
    this.modal.template = this.employeeContent;
    this.modal.toggleShow();
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

  getTotalOverTime(user: any): number{
   let res = 0;
   res=user?.actualHolidayTime + user?.actualMorningTime + user?.actualNightTime + user?.actualWeekEndTime;
   return res;
  }
}
