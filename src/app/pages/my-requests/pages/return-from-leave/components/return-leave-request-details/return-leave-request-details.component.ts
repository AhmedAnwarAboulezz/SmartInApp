import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseClass } from 'src/app/base/components/base-component';
import { MyRequestService } from 'src/app/pages/my-requests/services/my-request.service';
import { WorkflowStatus } from 'src/app/shared/Enums/Enums';

@Component({
  selector: 'app-return-leave-request-details',
  templateUrl: './return-leave-request-details.component.html',
  styleUrls: ['./return-leave-request-details.component.scss'],
})


export class ReturnLeaveRequestDetailsComponent implements OnInit, OnDestroy {
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

  getDocument(fileName : string){
    let extensionArr = fileName.split('.');
    let extension = extensionArr[extensionArr.length - 1].toLowerCase();

   this.service.downloadfile(fileName, "Leaves") 
   .subscribe(response => {
      if(extension == 'png' || extension == 'jpg' || extension == 'jpeg'||extension == 'gif'){
       this.downLoadFile(response, 'image/'+extension+'')
      }
     else if(extension == 'pdf'){
     this.downLoadFile(response, 'application/pdf')
     }
   });
 }
 downLoadFile(data: any, type: string) {
   let blob = new Blob([data], { type: type });
   let url = window.URL.createObjectURL(blob);
   let pwa = window.open(url);
   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
     alert('Please disable your Pop-up blocker and try again.');
   }
 }

 
 calculateDiff(fromDate, toDate) {
    toDate = new Date(toDate);
    fromDate = new Date(fromDate);
    return Math.floor((Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
        - Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()))
        / (1000 * 60 * 60 * 24)) + 1;
  }


}

