import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from '../../../../shared/@ui-components/over-page-modal/over-page-modal.service';

@Component({
  selector: 'app-sign',
  templateUrl: 'sign.page.html',
  styleUrls: ['sign.page.scss'],
})
export class SignPage implements OnInit {
  enabledMark = false;
  isExpanded: boolean;

  items: IRequestLeave[] = [
    {
      balance: 5000,
      title: 'apex_duty',
      status: 'present',
      employeeName: 'Hamada ahmed mohamed',
      date: '17 June 2021',
      from: '31-07-2021 08:30 am',
      to: '31-07-2021 08:30 am',
      total: '4H 30M',
      balanceBefore: 3,
      balanceAfter: 2,
      department: {
        icon: 'desktop-outline',
        name: 'out',
      },
      details:
        'Le Lorem Ipsum est simplement du faux texte employé dans la ...',
      createdAt: 'June 24,2021 03:22pm',
      leader: {
        name: 'Leader',
        photo: 'assets/images/avatar.jpg',
        actionDate: 'June 24,2021 03:22pm',
      },
    },
    {
      balance: 5000,
      title: 'apex_duty',
      status: 'absence',
      employeeName: 'Hamada ahmed mohamed',
      date: '17 June 2021',
      from: '31-07-2021 08:30 am',
      to: '31-07-2021 08:30 am',
      total: '4H 30M',
      balanceBefore: 3,
      balanceAfter: 2,
      department: {
        icon: 'desktop-outline',
        name: 'in',
      },
      details:
        'Le Lorem Ipsum est simplement du faux texte employé dans la ...',
      createdAt: 'June 24,2021 03:22pm',
      leader: {
        name: 'Leader',
        photo: 'assets/images/avatar.jpg',
        actionDate: 'June 24,2021 03:22pm',
      },
    },
    {
      balance: 5000,
      title: 'apex_duty',
      status: 'present',
      employeeName: 'Hamada ahmed mohamed',
      date: '17 June 2021',
      from: '31-07-2021 08:30 am',
      to: '31-07-2021 08:30 am',
      total: '4H 30M',
      balanceBefore: 3,
      balanceAfter: 2,
      department: {
        icon: 'desktop-outline',
        name: 'out',
      },
      details:
        'Le Lorem Ipsum est simplement du faux texte employé dans la ...',
      createdAt: 'June 24,2021 03:22pm',
      leader: {
        name: 'Leader',
        photo: 'assets/images/avatar.jpg',
        actionDate: 'June 24,2021 03:22pm',
      },
    },
    {
      balance: 5000,
      title: 'apex_duty',
      status: 'present',
      employeeName: 'Hamada ahmed mohamed',
      date: '17 June 2021',
      from: '31-07-2021 08:30 am',
      to: '31-07-2021 08:30 am',
      total: '4H 30M',
      balanceBefore: 3,
      balanceAfter: 2,
      department: {
        icon: 'desktop-outline',
        name: 'out',
      },
      details:
        'Le Lorem Ipsum est simplement du faux texte employé dans la ...',
      createdAt: 'June 24,2021 03:22pm',
      leader: {
        name: 'Leader',
        photo: 'assets/images/avatar.jpg',
        actionDate: 'June 24,2021 03:22pm',
      },
    },
  ];

  constructor(
    public localize: TranslationService,
    public modal: OverPageModalService
  ) {}

  ngOnInit() {}

  showModal() {
    this.modal.toggleShow();
  }

  toggleMark() {
    this.enabledMark = !this.enabledMark;
  }

  toggleExpand(item) {
    item.isExpanded = !item.isExpanded;
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
  isExpanded?: boolean;
  leader?: {
    name?: string;
    photo?: string;
    actionDate?: string;
  };
  department?: {
    icon?: string;
    name?: string;
  };
}
