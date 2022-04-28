import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';

@Component({
  selector: 'app-upcoming-return-leave-list',
  templateUrl: './upcoming-return-leave-list.component.html',
  styleUrls: ['./upcoming-return-leave-list.component.scss'],
})
export class UpcomingReturnLeaveListComponent implements OnInit {
  @Input() request: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  constructor(
    public localize: TranslationService,
    public Service: MyRequestService,
    public modal: OverPageModalService,
    public Route: Router
  ) { }

  ngOnInit() {}

  calculateDiff(fromDate, toDate) {
    toDate = new Date(toDate);
    fromDate = new Date(fromDate);
    return Math.floor((Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
        - Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()))
        / (1000 * 60 * 60 * 24)) + 1;
  }

  addRequest(request){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(request)
      }
    };
    this.Route.navigate(['/home/myRequests/return-from-leave/add-return-leave'], navigationExtras);
  }
}
