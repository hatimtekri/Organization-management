import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ExportReportExcelComponent } from './export-report-excel/export-report-excel.component';
import { ExportExcelComponent } from './Export_Report/export-excel/export-excel.component';
import { ExportMasterComponent } from './Export_Report/export-master/export-master.component';
import { EwalletLedgerComponent } from './Fee_Management/ewallet-ledger/ewallet-ledger.component';
import { FeeAllocationComponent } from './Fee_Management/fee-allocation/fee-allocation.component';
import { FeeCategoryComponent } from './Fee_Management/fee-category/fee-category.component';
import { FeeLedgerComponent } from './Fee_Management/fee-ledger/fee-ledger.component';
import { FeeMasterComponent } from './Fee_Management/fee-master/fee-master.component';
import { FeeReceiptComponent } from './Fee_Management/fee-receipt/fee-receipt.component';
import { ManualOnlineReceiptComponent } from './Fee_Management/manual-online-receipt/manual-online-receipt.component';
import { PrintReceiptComponent } from './Fee_Management/print-receipt/print-receipt.component';
import { SundryPaymentComponent } from './Fee_Management/sundry-payment/sundry-payment.component';
import { SundryReceiptsComponent } from './Fee_Management/sundry-receipts/sundry-receipts.component';
import { IncomeMasterComponent } from './income-master/income-master.component';
import { AccrualIncomeComponent } from './Income_Dashboard/accrual-income/accrual-income.component';
import { ActualIncomeComponent } from './Income_Dashboard/actual-income/actual-income.component';
import { IncomeDashboardMasterComponent } from './Income_Dashboard/income-dashboard-master/income-dashboard-master.component';
import { ExcludeStudentComponent } from './Student_Management/exclude-student/exclude-student.component';
import { StudentMasterComponent } from './Student_Management/student-master/student-master.component';
import { StudentComponent } from './Student_Management/student/student.component';

const routes: Routes = [
  {

    path: '', component: IncomeMasterComponent,
    //canActivate:[AuthGuard],
    children: [
  
      {
        path: 'fee-management', component: FeeMasterComponent,
        children: [
          { path: 'fee-allocation', component: FeeAllocationComponent },
          { path: 'fee-category', component: FeeCategoryComponent },
          { path: 'fee-receipt', component: FeeReceiptComponent },
          { path: 'fee-ledger', component: FeeLedgerComponent },
          { path: 'receipt-statement', component: PrintReceiptComponent }, 
          { path: 'ewallet-ledger', component: EwalletLedgerComponent },
          { path: 'manual-online', component: ManualOnlineReceiptComponent },
          { path: 'sundry-payment', component: SundryPaymentComponent },
          { path: 'sundry-receipt', component: SundryReceiptsComponent },
        
  
          { path: '', redirectTo: 'fee-category', pathMatch: 'full' },
        ]
      },

      {
        path: 'student-management', component: StudentMasterComponent,
        children: [
          { path: 'student', component: StudentComponent },
          { path: 'exclude-student', component: ExcludeStudentComponent },
  
          { path: '', redirectTo: 'student', pathMatch: 'full' },
        ]
      },
      

      {
        path: 'export-report', component: ExportMasterComponent,
        children: [
          { path: 'export-excel', component: ExportExcelComponent },
  
          { path: '', redirectTo: 'export-excel', pathMatch: 'full' },
        ]
      },

      {
        path: 'income-dashboard', component: IncomeDashboardMasterComponent,
        children: [
          { path: 'actual-income', component: ActualIncomeComponent },
          { path: 'accrual-income', component: AccrualIncomeComponent },
  
          { path: '', redirectTo: 'actual-income', pathMatch: 'full' },
        ]
      },

      { path: '', redirectTo: 'fee-management', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
