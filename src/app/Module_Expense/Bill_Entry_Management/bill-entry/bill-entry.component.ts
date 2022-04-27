import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MultiSearchExpensePipe } from 'src/app/AAAA_FilterPipe/multi-search-expense.pipe';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { BudgetAraz } from 'src/app/AAAA_Models/BudgetAraz-Model';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { Vendor } from 'src/app/AAAA_Models/Vendor-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
//import * as fs from 'file-saver';
// const fs = require('fs');
//const imgToPDF = require('image-to-pdf');

declare var swal: any;

@Component({
  selector: 'app-bill-entry',
  templateUrl: './bill-entry.component.html',
  styleUrls: ['./bill-entry.component.scss']
})
export class BillEntryComponent implements OnInit {

  public vendorDD = new Array<any>();
  public bills = new Array<BillManagement>();
  public todayBills = new Array<BillManagement>();
  public viewBillItems = new Array<BillManagement>();
  filename: any;
  file: any;
  isLock: any;
  totalsum: any;
  totalsum2: any;
  totalsum3: any;
  page: any;
  vendorName: any;
  billId: any;
  pages: any;
  selectedOnlineUser: any;
  isAccount: any;
  budget: any;
  remBudget: any;


  public bill = new BillManagement();
  public deptVenueNameDD = new Array<DropDownData>();
  public baseItemNameDD = new Array<DropDownData>();
  public itemNameDD = new Array<DropDownData>();

  public vendorDetails = new Array<Vendor>();
  public onlineUsers = new Array<Vendor>();


  paymentModeDD = [
    { id: 1, name: 'Cheque' },
    { id: 2, name: 'Cash' },
    { id: 3, name: 'Online' },
  ];


  constructor(
    private _vendorService: VendorDetailsService,
    private _loader: LoaderService,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _profileService: FacultyProfileService,
  ) { }

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(86);


        this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._vendorService.getTodayBillDetails().subscribe({
      next: (x) => {
        this.todayBills = x;
        //sort todayBills by billId
        this.todayBills.sort((a, b) => {
          if (a.id ?? 0 > (b.id ?? 0)) {
            return 1;
          }
          if (a.id ?? 0 < (b.id ?? 0)) {
            return -1;
          }
          return 0;
        });
        this.totalsum2 = this.todayBills.reduce((sum, record) => sum + (record.totalAmount != undefined ?
          record.totalAmount : 0), 0);
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._profileService.getMozeDD(500).subscribe({
      next: x => {

        this.deptVenueNameDD = x;
      },
      error: err => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');

      }
    });

    this._vendorService.getVendorDetails().subscribe({
      next: (x) => {
        this.vendorDetails = x;
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._vendorService.getOnlinePaymentUsers().subscribe({
      next: (x) => {
        this.onlineUsers = x;
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  lockBill() {
    if (this.bill.baseItemId == undefined || this.bill.baseItemId == null) {
      alert('Please select Expense Head');
      return;
    }
    if (this.bill.vendorId == undefined || this.bill.vendorId == null) {
      alert('Please select Vendor');
      return;
    }
    if (this.bill.deptVenueId == undefined || this.bill.deptVenueId == null) {
      alert('Please select Department/Venue');
      return;
    }
    if (this.bill.billNumber == undefined || this.bill.billNumber == null) {
      alert('Please enter Bill Number');
      return;
    }
    if (this.bill.billDate == undefined || this.bill.billDate == null) {
      alert('Please select Bill Date');
      return;
    }
    //check bill date is greateer than yesterday date
    // if (this.bill.billDate < new Date(new Date().setDate(new Date().getDate() - 1))) {
    if (this.bill.billDate > new Date()) {
      alert('Bill Date can not be greater than current date');
      return;
    }
    if (this.bill.paymentMode_User == undefined || this.bill.paymentMode_User == null) {
      alert('Please select payment mode');
      return;
    }
    if (this.bill.paymentMode_User == 'Online') {
      if (this.selectedOnlineUser == undefined || this.selectedOnlineUser == null) {
        alert('Please select payment to');
        return;
      }
      this.bill.paymentTo_AccName = this.onlineUsers.filter(x => x.id == this.selectedOnlineUser)[0].accountName;
      this.bill.paymentTo_AccNum = this.onlineUsers.filter(x => x.id == this.selectedOnlineUser)[0].accountNo;
      this.bill.paymentTo_BankName = this.onlineUsers.filter(x => x.id == this.selectedOnlineUser)[0].bankName;
      this.bill.paymentTo_ifsc = this.onlineUsers.filter(x => x.id == this.selectedOnlineUser)[0].ifscCode;
    }
    else {
      this.bill.paymentTo_AccName = this.vendorDetails.filter(x => x.id == this.bill.vendorId)[0].accountName;
      this.bill.paymentTo_AccNum = this.vendorDetails.filter(x => x.id == this.bill.vendorId)[0].accountNo;
      this.bill.paymentTo_BankName = this.vendorDetails.filter(x => x.id == this.bill.vendorId)[0].bankName;
      this.bill.paymentTo_ifsc = this.vendorDetails.filter(x => x.id == this.bill.vendorId)[0].ifscCode;
    }

    this._loader.callLoaderMethod('show');
    this._vendorService.getRemainingBudget(this.bill.deptVenueId, this.bill.baseItemId).subscribe({
      next: (x) => {
        this.budget = x;
        if (this.budget != undefined && this.budget != null) {
          this.remBudget = (this.budget.totalAmount != undefined ?
            this.budget.totalAmount : 0) - (this.budget.totalExpense != undefined ?
              this.budget.totalExpense : 0);
          if (this.remBudget > 0) {
            this.isAccount = true;
            this.isLock = true;
          }
          else {
            this._loader.callLoaderMethod('hide');
            swal('Error!', 'Selected Dept_Venue & Expense Head has no budget remaining', 'error');
          }
          this._loader.callLoaderMethod('hide');
        }
        else {
          this._loader.callLoaderMethod('hide');
          swal('Error!', 'No Budget found for selected Dept_Venue & Expense Head', 'error');
        }

      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    // this.isAccount = true;
    // this.isLock = true;


  }

  clearBill() {
    window.location.reload();
  }

  addItem() {

    // if(this.bill.gstAmount==undefined || this.bill.gstAmount==null){
    //   this.bill.gstAmount = 0;
    // }
    // if (this.bill.totalAmount == undefined || this.bill.totalAmount == null) {
    //   alert('Please enter Bill Amount');
    //   return;
    // }

    if (this.bill.itemId == undefined || this.bill.itemId == null) {
      alert('Please select Item');
      return;
    }
    if (this.bill.quantity == undefined || this.bill.quantity == null || this.bill.quantity == 0) {
      alert('Please enter Quantity');
      return;
    }
    if (this.bill.amountPerUom == undefined || this.bill.amountPerUom == null || this.bill.amountPerUom == 0) {
      alert('Please enter Amount Per Unit');
      return;
    }
    if (this.bill.itemGstAmount == undefined || this.bill.itemGstAmount == null) {
      this.bill.itemGstAmount = 0;
    }


    // this.calculateBillGstAmount();
    // this.calculateItemGstAmount();

    this.isAccount = true;
    this.isLock = true;
    this.bill.itemName = this.itemNameDD.filter(x => x.id == this.bill.itemId)[0].name;
    this.bill.billDate = new Date(this.bill.billDate ?? '');
    this.bill.billDate.setDate(this.bill.billDate.getDate() + 1);
    this.bill.amountPerUom = (this.bill.amountPerUom != undefined ?
      this.bill.amountPerUom : 0) / (this.bill.quantity != undefined ?
        this.bill.quantity : 0)
    const billClone = { ...this.bill };
    this.bills.push(billClone);

    this.totalsum = this.bills.reduce((sum, record) => sum + (record.quantity != undefined ?
      record.quantity : 0) * (record.amountPerUom != undefined ?
        record.amountPerUom : 0), 0);



    this.bill.itemId = undefined;
    this.bill.quantity = undefined;
    this.bill.amountPerUom = undefined;
    this.bill.remarks = undefined;
    this.bill.itemGstPercentage = undefined;
    this.bill.itemGstAmount = undefined;
  }

  deleteItem(index: any) {
    this.bills.splice(index, 1);
    this.totalsum = this.bills.reduce((sum, record) => sum + (record.quantity != undefined ?
      record.quantity : 0) * (record.amountPerUom != undefined ?
        record.amountPerUom : 0), 0);
  }

  submitBill() {
    if (this.bills.length == 0) {
      alert('Please add atleast one item');
      return;
    }

    if (this.file == undefined || this.file == null) {
      alert('Please upload bill file');
      return;
    }

    if (this.bill.gstAmount == undefined || this.bill.gstAmount == null) {
      this.bills[0].gstAmount = 0;
    }

    else {
      this.bills[0].gstAmount = this.bill.gstAmount;
    }

    if (this.bill.conveyanceAmount == undefined || this.bill.conveyanceAmount == null) {
      this.bills[0].conveyanceAmount = 0;
    }

    else {
      this.bills[0].conveyanceAmount = this.bill.conveyanceAmount;
    }

    this.bills[0].totalAmount = Math.round((this.bill.gstAmount != undefined ?
      this.bill.gstAmount : 0) + (this.bill.conveyanceAmount != undefined ?
        this.bill.conveyanceAmount : 0) + (this.totalsum != undefined ?
          this.totalsum : 0));

    //alert(this.bills[0].totalAmount);
    //this.bill.totalAmount = 5000;

    var go = confirm('Are you sure you want to submit the bill?');
    if (!go) return;

    var fd = new FormData();
    fd.append('attachment_file', this.file ?? "");

    this._loader.callLoaderMethod('show');
    //console.log(JSON.stringify(this.bdgtAraz));
    this._vendorService.submitBills(this.bills).subscribe({
      next: (x) => {
        console.log(x);
        this._vendorService.submitBillAttachment(x, fd).subscribe(
          {
            next: x => {
              this._loader.callLoaderMethod('hide');
              this.toastr.success('Saved successfully', '');
              window.location.reload();

            },
            error: err => {
              this._loader.callLoaderMethod('hide');
              swal('Error!', err.error.message, 'error');
            }
          }
        );


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }

  getItemsForBill(bill: BillManagement) {
    this.vendorName = bill.vendorName;
    this.billId = bill.id;
    this._vendorService.getItemForBill(bill.id).subscribe({
      next: (x) => {
        this.viewBillItems = x;
        this.totalsum3 = this.viewBillItems.reduce((sum, record) => sum + (record.quantity != undefined ?
          record.quantity : 0) * (record.amountPerUom != undefined ?
            record.amountPerUom : 0) + (record.itemGstAmount != undefined ?
              record.itemGstAmount : 0), 0);
      },
      error: (err) => {

      },
    });
  }

  onchange_baseItemId() {
    this.itemNameDD = new Array<DropDownData>();
    if (this.bill.baseItemId == undefined || this.bill.baseItemId == null) {
      this.bill.itemId = undefined;
      this.itemNameDD = new Array<DropDownData>();
    }
    //this.bill.itemId = undefined;
    else {
      this._vendorService.getItemForBaseItemId(this.bill.baseItemId).subscribe({
        next: (x) => {
          this.itemNameDD = x;
        },
        error: (err) => {

        },
      });
    }
  }

  onchange_deptVenueId() {
    this.baseItemNameDD = new Array<DropDownData>();
    if (this.bill.deptVenueId == undefined || this.bill.deptVenueId == null) {
      this.bill.baseItemId = undefined;
      this.baseItemNameDD = new Array<DropDownData>();
    }
    else {
      this._vendorService.getBaseItemForDeptVenueId(this.bill.deptVenueId).subscribe({
        next: (x) => {
          this.baseItemNameDD = x;
        },
        error: (err) => {

        },
      });
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      try {
        var size = event.target.files[0].size / (1024 * 1024);
        if (size > 20) {
          alert('Please upload a file of max size 20 MB');
          return;
        }
      } catch (ex) { }

      this.filename = event.target.value;
      const path = event.target.value.split('.');
      const extension = `${path[path.length - 1]}`;

      if (extension != "pdf") {
        alert('Please upload pdf file only');
        return;
      }
      this.file = event.target.files[0];


      // for (var i = 0; i < event.target.files.length; i++) {
      //   this.filename = event.target[i].value;
      //   const path = event.target[i].value.split('.');
      //   const extension = `${path[path.length - 1]}`;

      //   if (!(extension == "png" || extension == "jpg" || extension == "jpeg")) {
      //     alert('Please upload pdf file only');
      //     return;
      //   }
      //   this.pages.push(event.target.files[i]);                                                 // ***
      // }

      // this.convertToPdf();
    }
    else {
      alert('Please upload the file');
      return;
    }

  }

  // calculateBillGstAmount() {
  //   console.log(this.bill.totalAmount);
  //   console.log(this.bill.gstPercentage);
  //   this.bill.gstAmount = ((this.bill.totalAmount ?? 0) * (this.bill.gstPercentage ?? 0)) / 100;
  // }

  // calculateItemGstAmount() {
  //   let tamount = (this.bill.quantity != undefined ?
  //     this.bill.quantity : 0) * (this.bill.amountPerUom != undefined ?
  //       this.bill.amountPerUom : 0);
  //   this.bill.itemGstAmount = ( ( tamount ) * (this.bill.itemGstPercentage ?? 0)) / 100;
  // }

  // onchange_paymentMode() {
  //   // if (this.bill.vendorId == undefined || this.bill.vendorId == null) {

  //   //   alert('Please select vendor');
  //   //   //this.bill.paymentMode_User = undefined;
  //   //   this.isAccount = false;
  //   //   return;
  //   // }
  //   if (this.bill.paymentMode_User == 'Online') {
  //     this.selectedOnlineUser = undefined;
  //     this.bill.paymentTo_AccName = undefined;
  //     this.bill.paymentTo_AccNum = undefined;
  //     this.bill.paymentTo_BankName = undefined;
  //     this.bill.paymentTo_ifsc = undefined;
  //     this.isAccount = false;
  //   }
  //   else if (this.bill.paymentMode_User == 'Cheque' || this.bill.paymentMode_User == 'Cash') {
  //     this.bill.paymentTo_AccName = this.vendorDetails.filter(x => x.id == this.bill.vendorId)[0].accountName;
  //     this.bill.paymentTo_AccNum = this.vendorDetails.filter(x => x.id == this.bill.vendorId)[0].accountNo;
  //     this.bill.paymentTo_BankName = this.vendorDetails.filter(x => x.id == this.bill.vendorId)[0].bankName;
  //     this.bill.paymentTo_ifsc = this.vendorDetails.filter(x => x.id == this.bill.vendorId)[0].ifscCode;
  //     this.isAccount = true;
  //   }
  //   else {
  //     this.isAccount = false;
  //   }
  // }

  // onchange_vendor() {
  //   this.onchange_paymentMode();
  // }


  // convertToPdf() {

  //   this.file = imgToPDF(this.pages, 'A4')
  //     .pipe(fs.saveAs('output.pdf'));

  //   this.file.save('output.pdf');
  // }





}
