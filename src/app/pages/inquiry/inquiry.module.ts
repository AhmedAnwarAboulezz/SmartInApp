import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryRoutingModule } from './inquiry-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InquiryPage } from './inquiry.page';
import { MainInquiryPageModule } from './pages/main-inquiry/main-inquiry.module';

const MODULES = [MainInquiryPageModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquiryRoutingModule,
    ...MODULES,
  ],
  declarations: [InquiryPage],
})
export class InquiryModule { }


