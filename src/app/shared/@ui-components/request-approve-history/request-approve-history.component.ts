import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-request-approve-history',
  templateUrl: './request-approve-history.component.html',
  styleUrls: ['./request-approve-history.component.scss'],
})

export class RequestApproveHistoryComponent implements OnInit {
  @Input() item: any;


  constructor(public localize: TranslationService) { }

  ngOnInit() {}

}
