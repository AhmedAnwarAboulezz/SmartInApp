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
import { LanguageService } from '../../../../../../shared/translation/language.service';
import { IPermissionsRequests } from '../list-full-day-permissions/list-full-day-permissions.component';

@Component({
  selector: 'app-full-day-list-item',
  templateUrl: './full-day-list-item.component.html',
  styleUrls: ['./full-day-list-item.component.scss'],
})
export class FullDayListItemComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;

  @Input() item: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  isExpanded: boolean;
  workflowStatus = WorkflowStatus;

  constructor(
    public localize: TranslationService,
    public Service: MyRequestService,
    public modal: OverPageModalService
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
}
