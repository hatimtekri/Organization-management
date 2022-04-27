import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { FeeCategoryComponent } from './Fee_Management/fee-category/fee-category.component';
import { FeeAllocationComponent } from './Fee_Management/fee-allocation/fee-allocation.component';
import { FeeReceiptComponent } from './Fee_Management/fee-receipt/fee-receipt.component';
import { IncomeMasterComponent } from './income-master/income-master.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MultiSearchIncomePipe } from '../AAAA_FilterPipe/multi-search-income.pipe';
import { StudentMasterComponent } from './Student_Management/student-master/student-master.component';
import { StudentComponent } from './Student_Management/student/student.component';
import { FeeLedgerComponent } from './Fee_Management/fee-ledger/fee-ledger.component';
import { PrintReceiptComponent } from './Fee_Management/print-receipt/print-receipt.component';
import { NgxPrintModule } from 'ngx-print';
import { SearchStudentComponent } from './Student_Management/search-student/search-student.component';
import { EwalletLedgerComponent } from './Fee_Management/ewallet-ledger/ewallet-ledger.component';
import { ExportReportExcelComponent } from './export-report-excel/export-report-excel.component';
import { ExportMasterComponent } from './Export_Report/export-master/export-master.component';
import { ExportExcelComponent } from './Export_Report/export-excel/export-excel.component';
import { ManualOnlineReceiptComponent } from './Fee_Management/manual-online-receipt/manual-online-receipt.component';
import { FeeMasterComponent } from './Fee_Management/fee-master/fee-master.component';
import { CustomMaterialModule } from '../AAAA_custom-material/custom-material';
import { IncomeDashboardMasterComponent } from './Income_Dashboard/income-dashboard-master/income-dashboard-master.component';
import { ActualIncomeComponent } from './Income_Dashboard/actual-income/actual-income.component';
import { AccrualIncomeComponent } from './Income_Dashboard/accrual-income/accrual-income.component';
import { ChartsModule } from 'ng2-charts';
import { ExcludeStudentComponent } from './Student_Management/exclude-student/exclude-student.component';
import { SundryPaymentComponent } from './Fee_Management/sundry-payment/sundry-payment.component';
import { SundryReceiptsComponent } from './Fee_Management/sundry-receipts/sundry-receipts.component';


@NgModule({
  declarations: [MultiSearchIncomePipe,FeeCategoryComponent, FeeAllocationComponent, FeeReceiptComponent, IncomeMasterComponent, StudentMasterComponent, StudentComponent, FeeLedgerComponent, PrintReceiptComponent, SearchStudentComponent, EwalletLedgerComponent, ExportReportExcelComponent, ExportMasterComponent, ExportExcelComponent,FeeMasterComponent, ManualOnlineReceiptComponent, IncomeDashboardMasterComponent, ActualIncomeComponent, AccrualIncomeComponent, ExcludeStudentComponent, SundryPaymentComponent, SundryReceiptsComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    CustomMaterialModule,
    NgxPrintModule,
    ChartsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class IncomeModule { }
