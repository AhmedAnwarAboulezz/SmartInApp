import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { OverPageModalService } from './over-page-modal.service';

@Component({
  selector: 'app-over-page-modal',
  templateUrl: './over-page-modal.component.html',
  styleUrls: ['./over-page-modal.component.scss'],
})
export class OverPageModalComponent {
  constructor(public service: OverPageModalService) {}
}
