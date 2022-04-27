import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavigationsComponent } from './navigations/navigations.component';

import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { CustomMaterialModule } from '../AAAA_custom-material/custom-material';


@NgModule({
  declarations: [NavigationsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
      
    CustomMaterialModule,
    NgxPrintModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
