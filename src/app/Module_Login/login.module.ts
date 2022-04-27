import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomMaterialModule } from '../AAAA_custom-material/custom-material';


@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,

    NgxPrintModule,
    CustomMaterialModule,
    NgxSpinnerModule,
   

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoginModule {
  constructor() {
    console.log("login module");
  }



}
