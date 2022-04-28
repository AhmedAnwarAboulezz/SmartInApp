import { Shell } from './../../../../../../base/components/shell';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import locale_ar from '@angular/common/locales/ar';
import locale_en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/base/components/base-list-component';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';
import { BaseClass } from 'src/app/base/components/base-component';

registerLocaleData(locale_ar, 'ar');
registerLocaleData(locale_en, 'en');
@Component({

  selector: 'app-permission-request-details',
  templateUrl: './permission-request-details.page.html',
  styleUrls: ['./permission-request-details.page.scss'],
})
export class PermissionRequestDetailsPage  implements OnInit, OnDestroy {
  id: any;
  model: any = {};
  segmentValue = true;
  @Input() selected: any = {};
  private subRequests: Subscription;
  noDataFound = false;
  isLoading = true;
  workflowStatus = WorkflowStatus;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public service: MyRequestService,
    public base: BaseClass
    
    ) {
  }


  ngOnInit() {
  }


  ionViewWillEnter() {
    this.noDataFound = false;
    this.route.params.subscribe((p: any) => { this.id = p.id; });
    this.getRequestById();
  }
  getRequestById() {
    // this.subRequests = this.service.getRequestsById(this.id).subscribe((res: any) => {
    //   this.model2 = res;
    //   console.log('model111', res);
    //   //this.isLoading = false;
    // });
    this.subRequests = this.service.getRequestsById2(this.id).subscribe((res: any) => {
      this.model = res;
      console.log('model', this.model);
      this.noDataFound = false;
      this.isLoading = false;
    }, error => {
      this.base.toastError('errorGetRequest');
      this.noDataFound = true;
      this.isLoading = false;
    });
  }

  segmentChanged(event): void {
    console.log(event);
    if (event.value === '1') {
      this.segmentValue = true;
    } else {
      this.segmentValue = false;
    }
  }

  ngOnDestroy() {
    //this.events.publish('pages:showBackButton', { showBackButton: false,showMenuButton: true });

    if (this.subRequests) {
      this.subRequests.unsubscribe();
    }
  }
  ionViewWillLeave(){

    if (this.subRequests) {
      this.subRequests.unsubscribe();
    }
    //this.events.publish('pages:showBackButton', { showBackButton: false,showMenuButton: true });
  }



}
