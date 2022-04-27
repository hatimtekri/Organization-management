import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { BillManagementMasterComponent } from './Bill_Entry_Management/bill-management-master/bill-management-master.component';
import { VendorDetailsComponent } from './Bill_Entry_Management/vendor-details/vendor-details.component';
import { CustomMaterialModule } from '../AAAA_custom-material/custom-material';
import { BudgetMasterComponent } from './Budget_Management/budget-master/budget-master.component';
import { BudgetArazComponent } from './Budget_Management/budget-araz/budget-araz.component';
import { MultiSearchExpensePipe } from '../AAAA_FilterPipe/multi-search-expense.pipe';
import { BudgetAuditComponent } from './Budget_Management/budget-audit/budget-audit.component';
import { BillEntryComponent } from './Bill_Entry_Management/bill-entry/bill-entry.component';
import { BillsComponent } from './Bill_Entry_Management/bills/bills.component';
import { InventoryMasterComponent } from './Inventory_Maintenance/inventory-master/inventory-master.component';
import { BaseitemComponent } from './Inventory_Maintenance/baseitem/baseitem.component';
import { ItemComponent } from './Inventory_Maintenance/item/item.component';
import { DeptVenueComponent } from './Inventory_Maintenance/dept-venue/dept-venue.component';
import { SearchExpensePipe } from '../AAAA_FilterPipe/search-expense.pipe';
import { ItemBaseitemComponent } from './Inventory_Maintenance/item-baseitem/item-baseitem.component';
import { ApproveRejectBillComponent } from './Bill_Entry_Management/approve-reject-bill/approve-reject-bill.component';
import { VendorLedgerComponent } from './Bill_Entry_Management/vendor-ledger/vendor-ledger.component';
import { BudgetSanctionComponent } from './Budget_Management/budget-sanction/budget-sanction.component';
import { PaymentFromBankSelectionComponent } from './Bill_Entry_Management/payment-from-bank-selection/payment-from-bank-selection.component';
import { TobepaidBillsComponent } from './Bill_Entry_Management/tobepaid-bills/tobepaid-bills.component';
import { DeptVenueCashWalletComponent } from './Budget_Management/dept-venue-cash-wallet/dept-venue-cash-wallet.component';
import { VendorPaymentsComponent } from './Bill_Entry_Management/vendor-payments/vendor-payments.component';
import { ViewBillPdfComponent } from './view-bill-pdf/view-bill-pdf.component';


@NgModule({
  declarations: [SearchExpensePipe, MultiSearchExpensePipe, BillManagementMasterComponent, VendorDetailsComponent, BudgetMasterComponent, BudgetArazComponent, BudgetAuditComponent, BillEntryComponent, BillsComponent, InventoryMasterComponent, BaseitemComponent, ItemComponent, DeptVenueComponent, ItemBaseitemComponent, ApproveRejectBillComponent, VendorLedgerComponent, BudgetSanctionComponent, PaymentFromBankSelectionComponent, TobepaidBillsComponent, DeptVenueCashWalletComponent, VendorPaymentsComponent, ViewBillPdfComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    ExpenseRoutingModule
  ]
})
export class ExpenseModule { }
