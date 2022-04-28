import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseClass } from 'src/app/base/components/base-component';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';

@Component({

  selector: 'app-overtime-request-details',
  templateUrl: './overtime-request-details.component.html',
  styleUrls: ['./overtime-request-details.component.scss'],
})
export class OverTimeRequestDetailsComponent implements OnInit, OnDestroy {
  id: any;
  model: any = {};
  segmentValue = true;
  @Input() selected: any = {};
  private subRequests: Subscription;
  private subInitiRequests: Subscription;
  isLoading = true;
  noDataFound = false;
  workflowStatus = WorkflowStatus;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public service: MyRequestService,
    public base: BaseClass    
  ) 
  {
  }



  ngOnInit() {
  }


  ionViewWillEnter() {
    this.noDataFound = false;
    this.route.params.subscribe((p: any) => { this.id = p.id; });
    this.getRequestById();
  }
  getRequestById() {
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
    if (this.subInitiRequests) { this.subInitiRequests.unsubscribe(); }
    if (this.subRequests) { this.subRequests.unsubscribe(); }
  }
  ionViewWillLeave(){
    if (this.subInitiRequests) { this.subInitiRequests.unsubscribe(); }
    if (this.subRequests) { this.subRequests.unsubscribe(); }
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.model.employeeOverTimeDto.approveOverTimeDetails.map(listItem => {
        if (item === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}

