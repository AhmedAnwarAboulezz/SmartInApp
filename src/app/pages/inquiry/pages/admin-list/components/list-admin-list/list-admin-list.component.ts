import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from '../../../../../../shared/@ui-components/over-page-modal/over-page-modal.service';

@Component({
  selector: 'app-list-admin-list',
  templateUrl: './list-admin-list.component.html',
  styleUrls: ['./list-admin-list.component.scss'],
})
export class ListAdminListComponent implements OnInit {
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  permissions: IRequestLeave[];
  enabledFilter = false;
  constructor(
    public modalController: ModalController,
    public localize: TranslationService,
    public modal: OverPageModalService
  ) {}

  ngOnInit() {
    this.permissions = [
      {
        balance: 130,
        title: 'apex_duty',
        status: 'present',
        employeeName: 'Hamada ahmed mohamed',
        date: '17 June 2021',
        from: '08:30 am',
        to: '08:30 am',
        total: '4H 30M',
        balanceBefore: 3,
        balanceAfter: 2,
        department: {
          icon: 'desktop-outline',
          name: 'developers',
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
        balance: 130,
        title: 'apex_duty',
        status: 'absence',
        employeeName: 'Hamada ahmed mohamed',
        date: '17 June 2021',
        from: '08:30 am',
        to: '08:30 am',
        total: '4H 30M',
        balanceBefore: 3,
        balanceAfter: 2,
        department: {
          icon: 'desktop-outline',
          name: 'developers',
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
        balance: 130,
        title: 'apex_duty',
        status: 'present',
        employeeName: 'Hamada ahmed mohamed',
        date: '17 June 2021',
        from: '08:30 am',
        to: '08:30 am',
        total: '4H 30M',
        balanceBefore: 3,
        balanceAfter: 2,
        department: {
          icon: 'desktop-outline',
          name: 'developers',
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
        balance: 130,
        title: 'apex_duty',
        status: 'present',
        employeeName: 'Hamada ahmed mohamed',
        date: '17 June 2021',
        from: '08:30 am',
        to: '08:30 am',
        total: '4H 30M',
        balanceBefore: 3,
        balanceAfter: 2,
        department: {
          icon: 'desktop-outline',
          name: 'developers',
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
  }

  segmentChanged(event) {
    if (event.detail.value === 'approval') {
      this.permissions = [
        {
          balance: 130,
          title: 'apex_duty',
          status: 'present',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
          balance: 130,
          title: 'apex_duty',
          status: 'present',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
          balance: 130,
          title: 'apex_duty',
          status: 'present',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
          balance: 130,
          title: 'apex_duty',
          status: 'present',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
    } else if (event.detail.value === 'rejected') {
      this.permissions = [
        {
          balance: 130,
          title: 'apex_duty',
          status: 'restDay',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
    } else if (event.detail.value === 'pending') {
      this.permissions = [
        {
          balance: 130,
          title: 'apex_duty',
          status: 'absence',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
          balance: 130,
          title: 'apex_duty',
          status: 'absence',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
          balance: 130,
          title: 'apex_duty',
          status: 'absence',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
          balance: 130,
          title: 'apex_duty',
          status: 'absence',
          employeeName: 'Hamada ahmed mohamed',
          date: '17 June 2021',
          from: '08:30 am',
          to: '08:30 am',
          total: '4H 30M',
          balanceBefore: 3,
          balanceAfter: 2,
          department: {
            icon: 'desktop-outline',
            name: 'developers',
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
    }
  }

  showModal() {
    this.modal.template = this.filterContent;
    this.modal.toggleShow();
  }

  toggleFilter() {
    this.enabledFilter = !this.enabledFilter;
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
  department?: {
    icon?: string;
    name?: string;
  };
}
