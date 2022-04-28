import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';

@Component({
  selector: 'app-part-day-list-item',
  templateUrl: './part-day-list-item.component.html',
  styleUrls: ['./part-day-list-item.component.scss'],
})
export class PartDayListItemComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  
  @Input() item: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  isExpanded: boolean;
  workflowStatus = WorkflowStatus;



  constructor(public localize: TranslationService,
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



  // async presentConfirm(id) {
  //   const alert = this.alertCtrl.create({
  //     message: this.Localize.isEnglish() ? 'Do you want to remove this request?' : 'هل تريد حذف الطلب ؟',
  //     buttons: [
  //       {
  //         text: this.Localize.isEnglish() ? 'Cancel' : 'الغاء',
  //         role: 'cancel'
  //       },
  //       {
  //         text: this.Localize.isEnglish() ? 'Ok' : 'موافق',
  //         handler: () => {
  //           this.Service.removeRequest(id);
  //           const index = this.pendingRequests.findIndex(d => d.id === id);
  //           if (index > -1) {
  //             this.pendingRequests.splice(index, 1);
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   await (await alert).present();
  // }
}
