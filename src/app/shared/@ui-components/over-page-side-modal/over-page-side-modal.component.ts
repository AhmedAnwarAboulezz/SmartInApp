import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { TranslationService } from '../../../core/services/localization/translation.service';
import { LanguageService } from '../../translation/language.service';
import { OverPageSideModalService } from './over-page-side-modal.service';

@Component({
  selector: 'app-over-page-side-modal',
  templateUrl: './over-page-side-modal.component.html',
  styleUrls: ['./over-page-side-modal.component.scss'],
})
export class OverPageSideModalComponent {
  constructor(
    public service: OverPageSideModalService,
    public lang: TranslationService
  ) {}
}
