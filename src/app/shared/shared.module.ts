import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSortAreaComponent, MainHeaderComponent, OverPageModalComponent } from './@ui-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalenderComponent } from './@ui-components/calender/calender.component';
import { TranslateModule } from '@ngx-translate/core';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { InquirySortComponent } from './@ui-components/inquiry-sort/inquiry-sort.component';
import { BaseClass } from '../base/components/base-component';
import { AppLazyTranslationModule } from './translation/app.lazy.translation.module';
import { AppTranslationModule } from './translation/app.translation.module';
import {
  SplitwhitespacesPipe,
  RemovewhitespacesPipe,
  EveryInListPipe,
  LocalizedDatePipe,
  MonthNamePipe,
  NearestPipe,
  TimeSpanPipe,
  TotalHoursPipe,
  LocalizedMonthYearPipe,
  FindNameInListPipe
} from './pipes';
import { RequestApproveHistoryComponent } from './@ui-components/request-approve-history/request-approve-history.component';
import { OverPageSideModalComponent } from './@ui-components/over-page-side-modal/over-page-side-modal.component';
import { FilterModalPage } from './@ui-components/admin-filter-modal/filter-modal/filter-modal.page';
import { AdminSortComponent } from './@ui-components/admin-sort/admin-sort.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { ExpandableComponent } from './@ui-components/expandable/expandable.component';
import { MatchPasswordDirective } from './directives/matchPassword.directive';

const COMPONENTS = [
  MainHeaderComponent,
  CalenderComponent,
  InquirySortComponent,
  OverPageModalComponent,
  RequestApproveHistoryComponent,
  OverPageSideModalComponent,
  FilterModalPage,
  AdminSortComponent,
  ExpandableComponent,
  HeaderSortAreaComponent
];
const PIPES = [
  TimeSpanPipe,
  TotalHoursPipe,
  NearestPipe,
  RemovewhitespacesPipe,
  EveryInListPipe,
  SplitwhitespacesPipe,
  LocalizedDatePipe,
  LocalizedMonthYearPipe,
  MonthNamePipe,
  FindNameInListPipe,
  MatchPasswordDirective
];

const MODULES = [
  FormsModule,
  IonicModule,
  TranslateModule,
  Ionic4DatepickerModule,
  IonicSelectableModule,

  // AppLazyTranslationModule,
  // AppTranslationModule,
];

@NgModule({
  imports: [CommonModule, ...MODULES],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES, ...MODULES],
  providers: [BaseClass],
})
export class SharedModule {}
