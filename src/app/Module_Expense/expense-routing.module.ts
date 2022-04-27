import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveRejectBillComponent } from './Bill_Entry_Management/approve-reject-bill/approve-reject-bill.component';
import { BillEntryComponent } from './Bill_Entry_Management/bill-entry/bill-entry.component';
import { BillManagementMasterComponent } from './Bill_Entry_Management/bill-management-master/bill-management-master.component';
import { BillsComponent } from './Bill_Entry_Management/bills/bills.component';
import { PaymentFromBankSelectionComponent } from './Bill_Entry_Management/payment-from-bank-selection/payment-from-bank-selection.component';
import { TobepaidBillsComponent } from './Bill_Entry_Management/tobepaid-bills/tobepaid-bills.component';
import { VendorDetailsComponent } from './Bill_Entry_Management/vendor-details/vendor-details.component';
import { VendorLedgerComponent } from './Bill_Entry_Management/vendor-ledger/vendor-ledger.component';
import { VendorPaymentsComponent } from './Bill_Entry_Management/vendor-payments/vendor-payments.component';
import { BudgetArazComponent } from './Budget_Management/budget-araz/budget-araz.component';
import { BudgetAuditComponent } from './Budget_Management/budget-audit/budget-audit.component';
import { BudgetMasterComponent } from './Budget_Management/budget-master/budget-master.component';
import { BudgetSanctionComponent } from './Budget_Management/budget-sanction/budget-sanction.component';
import { DeptVenueCashWalletComponent } from './Budget_Management/dept-venue-cash-wallet/dept-venue-cash-wallet.component';
import { ExpenseMasterComponent } from './expense-master/expense-master.component';
import { BaseitemComponent } from './Inventory_Maintenance/baseitem/baseitem.component';
import { DeptVenueComponent } from './Inventory_Maintenance/dept-venue/dept-venue.component';
import { InventoryMasterComponent } from './Inventory_Maintenance/inventory-master/inventory-master.component';
import { ItemBaseitemComponent } from './Inventory_Maintenance/item-baseitem/item-baseitem.component';
import { ItemComponent } from './Inventory_Maintenance/item/item.component';
import { ViewBillPdfComponent } from './view-bill-pdf/view-bill-pdf.component';

const routes: Routes = [
  {
    path: '', component: ExpenseMasterComponent,
    children: [
      { path: 'view-bill-pdf', component: ViewBillPdfComponent},

      {
        path: 'bill-entry-management', component: BillManagementMasterComponent,
        children: [
          { path: 'vendor-details', component: VendorDetailsComponent },
          { path: 'bill-entry', component: BillEntryComponent },
          { path: 'bills', component: BillsComponent },
          { path: 'approve-reject-bill', component: ApproveRejectBillComponent },
          { path: 'vendor-ledger', component: VendorLedgerComponent },
          { path: 'payment-from-bank-selection', component: PaymentFromBankSelectionComponent },
          { path: 'tobepaid-bills', component: TobepaidBillsComponent },
          { path: 'vendor-payments', component: VendorPaymentsComponent },

          { path: '', redirectTo: 'vendor-details', pathMatch: 'full' },
        ]
      },

      {
        path: 'inventory-maintenance', component: InventoryMasterComponent,
        children: [
          { path: 'dept-venue', component: DeptVenueComponent },
          { path: 'baseitem', component: BaseitemComponent },
          { path: 'item', component: ItemComponent },
          { path: 'item-baseitem', component: ItemBaseitemComponent },

          { path: '', redirectTo: 'baseitem', pathMatch: 'full' },
        ]
      },

      {
        path: 'budget-management', component: BudgetMasterComponent,
        children: [
          { path: 'budget-araz', component: BudgetArazComponent },
          { path: 'budget-audit', component: BudgetAuditComponent },
          { path: 'budget-sanction', component: BudgetSanctionComponent },
          { path: 'dept-venue-cash-wallet', component: DeptVenueCashWalletComponent },

          { path: '', redirectTo: 'budget-araz', pathMatch: 'full' },
        ]
      },

      { path: '', redirectTo: 'bill-entry-management', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
