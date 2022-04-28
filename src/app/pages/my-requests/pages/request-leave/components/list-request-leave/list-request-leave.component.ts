import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { RequestTypes, StatusType } from 'src/app/shared/Enums/Enums';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';
import { LanguageService } from '../../../../../../shared/translation/language.service';

@Component({
  selector: 'app-list-request-leave',
  templateUrl: './list-request-leave.component.html',
  styleUrls: ['./list-request-leave.component.scss'],
})
export class ListRequestLeaveComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  permissions: IRequestLeave[];
  enabledFilter = false;
  filter = {
    date: new Date().toLocaleDateString('en-US'),
    statusTypeId: StatusType.Pending.toString(),
    requestTypeId: RequestTypes.Leave,
    parameterIds: null
  };
  typeParameters: any[] = [];
  maxData : any = (new Date()).getFullYear() + 3;
  private subRequests: Subscription;
  private subInitiRequests: Subscription;
  pendingRequests: any[] = [];
  isLoading = true;

  constructor(
    private service: MyRequestService,
    public modalController: ModalController,
    public localize: TranslationService,
    public modal: OverPageModalService
  ) {}

  // ngOnInit() {
  //   this.permissions = [
  //     {
  //       balance: 5000,
  //       title: 'Official Permission',
  //       status: 'Approval',
  //       employeeName: 'Hamada ahmed mohamed',
  //       date: '17 June 2021',
  //       from: '08:00 am',
  //       to: '09:30 am',
  //       total: '4H 30M',
  //       balanceBefore: 3,
  //       balanceAfter: 2,
  //       details:
  //         'Le Lorem Ipsum est simplement du faux texte employé dans la ...',
  //       createdAt: 'June 24,2021 03:22pm',
  //       leader: {
  //         name: 'Leader',
  //         photo: 'assets/images/avatar.jpg',
  //         actionDate: 'June 24,2021 03:22pm',
  //       },
  //     },
  //     {
  //       balance: 5000,
  //       title: 'Official Permission',
  //       status: 'Approval',
  //       employeeName: 'Hamada ahmed mohamed',
  //       date: '17 June 2021',
  //       from: '08:00 am',
  //       to: '09:30 am',
  //       total: '4H 30M',
  //       balanceBefore: 3,
  //       balanceAfter: 2,
  //       details:
  //         'Le Lorem Ipsum est simplement du faux texte employé dans la ...',
  //       createdAt: 'June 24,2021 03:22pm',
  //       leader: {
  //         name: 'Leader',
  //         photo: 'assets/images/avatar.jpg',
  //         actionDate: 'June 24,2021 03:22pm',
  //       },
  //     },
  //     {
  //       balance: 5000,
  //       title: 'Official Permission',
  //       status: 'Approval',
  //       employeeName: 'Hamada ahmed mohamed',
  //       date: '17 June 2021',
  //       from: '08:00 am',
  //       to: '09:30 am',
  //       total: '4H 30M',
  //       balanceBefore: 3,
  //       balanceAfter: 2,
  //       details:
  //         'Le Lorem Ipsum est simplement du faux texte employé dans la ...',
  //       createdAt: 'June 24,2021 03:22pm',
  //       leader: {
  //         name: 'Leader',
  //         photo: 'assets/images/avatar.jpg',
  //         actionDate: 'June 24,2021 03:22pm',
  //       },
  //     },
  //     {
  //       balance: 5000,
  //       title: 'Official Permission',
  //       status: 'Approval',
  //       employeeName: 'Hamada ahmed mohamed',
  //       date: '17 June 2021',
  //       from: '08:00 am',
  //       to: '09:30 am',
  //       total: '4H 30M',
  //       balanceBefore: 3,
  //       balanceAfter: 2,
  //       details:
  //         'Le Lorem Ipsum est simplement du faux texte employé dans la ...',
  //       createdAt: 'June 24,2021 03:22pm',
  //       leader: {
  //         name: 'Leader',
  //         photo: 'assets/images/avatar.jpg',
  //         actionDate: 'June 24,2021 03:22pm',
  //       },
  //     },
  //   ];
  //   // this.isLoading = true;

  //   // this.service.getLeavesTypes().subscribe((res: any) => {
  //   //   this.typeParameters = res;
  //   //   this.isLoading = false;
  //   // });
  // }
  ngOnInit() {
    this.subInitiRequests = this.service.pendingRequests.subscribe(
      (requests) => {
        this.pendingRequests = requests;
      }
    );
    this.isLoading = true;
    this.service.getLeavesTypes().subscribe((res: any) => {
      this.typeParameters = res;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.pendingRequests = [];
    this.fetchData();
  }
  fetchData() {
    this.isLoading = true;
    this.subRequests = this.service.fetchPendingMyRequests(
      this.filter
    ).subscribe((data) => {
      console.log('res fetch ====> ', data);
      this.pendingRequests = data;
      this.isLoading = false;
    });
  }

  segmentChanged(event) {
    this.filter.statusTypeId = event.detail.value;
    this.fetchData();
  }

  showModal() {
    this.modal.template = this.filterContent;
    this.modal.toggleShow();
  }

  toggleFilter() {
    this.enabledFilter = !this.enabledFilter;
  }
  action(event) {
    this.isLoading = true;
    console.log(`🚀 ~ action ~ event`, event);
    if(event!== undefined && event.type == 'remove'){
      const index = this.pendingRequests.findIndex(d => d?.requestMainData?.id === event.id);
      if (index > -1) {
        this.pendingRequests.splice(index, 1);
      }
      //this.pendingRequests = this.pendingRequests.filter(a=>a?.requestMainData?.id !== event.id);
    }
    this.isLoading = false;
  }


}

export interface IRequestLeave {
  title?: string;
  status?: string;
  balance?: number;
  employeeName?: string;
  date?: string;
  from?: string;
  to?: string;
  total?: string;
  details?: string;
  createdAt?: string;
  balanceBefore?: 3;
  balanceAfter?: 2;
  leader?: {
    name?: string;
    photo?: string;
    actionDate?: string;
  };
}
