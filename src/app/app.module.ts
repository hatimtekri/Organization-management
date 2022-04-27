import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { SearchIncomePipe } from './AAAA_FilterPipe/search-income.pipe';
import { CustomMaterialModule } from './AAAA_custom-material/custom-material';
import { ExpenseMasterComponent } from './Module_Expense/expense-master/expense-master.component';
//import { SearchExpensePipe } from './AAAA_FilterPipe/search-expense.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SearchIncomePipe,
    ExpenseMasterComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomMaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    
    
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
   // CustomPipeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


  constructor(){
    console.log("App Module");
  }

}
