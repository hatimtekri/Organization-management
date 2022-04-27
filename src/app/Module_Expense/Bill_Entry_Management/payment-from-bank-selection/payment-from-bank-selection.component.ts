import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-payment-from-bank-selection',
  templateUrl: './payment-from-bank-selection.component.html',
  styleUrls: ['./payment-from-bank-selection.component.scss']
})
export class PaymentFromBankSelectionComponent implements OnInit {

  bankNameDD = [
    { name: 'Bank of Baroda' },
    { name: 'Kotak Mahindra Bank' },
  ];

  isShow: any;
  bank: any;
  public approvedBills = new Array<BillManagement>();
  public toBePaidBills = new Array<BillManagement>();
  public selectedBankBills = new Array<BillManagement>();
  public otherBankBills = new Array<BillManagement>();
  totalsum1: any;
  totalsum2: any;
  totalsum3: any;
  billId: any;
  vendorName: any;
  page: any;
  public viewBillItems = new Array<BillManagement>();
  selectAll: any;
  paymentType: any;

  paymentModeDD = [
    { id: 1, name: 'Cheque' },
    { id: 2, name: 'NEFT' },
    { id: 3, name: 'RTGS' },
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
        this.page = x.includes(95);


        this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._vendorService.getApprovedBillDetails().subscribe({
      next: (x) => {
        this.approvedBills = x;
        //sort approvedBills by id then by vendorId
        this.approvedBills.sort(function (a, b) {
          return (a.vendorId ?? 0) - (b.vendorId ?? 0);
        });
        console.log(JSON.stringify(this.approvedBills));

        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });


  }

  loadData() {
    if (this.bank == '' || this.bank == undefined || this.bank == null) {
      alert('Please select bank');
      return;
    }
    this._loader.callLoaderMethod('show');


    for (var y in this.approvedBills) {
      this.approvedBills[y].paymentFrom_BankName = this.bank;
    }

    this.selectedBankBills = this.approvedBills.filter(x => x.paymentTo_BankName == this.bank);

    this.totalsum1 = this.selectedBankBills.reduce((sum, record) => sum + (record.totalAmount != undefined ?
      record.totalAmount : 0), 0);
    this.otherBankBills = this.approvedBills.filter(x => x.paymentTo_BankName != this.bank);
    this.totalsum2 = this.otherBankBills.reduce((sum, record) => sum + (record.totalAmount != undefined ?
      record.totalAmount : 0), 0);
    this.isShow = true;
    this._loader.callLoaderMethod('hide');
  }

  clear() {
    window.location.reload();
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

  selectSelectedBank() {
    if (this.selectAll == true) {
      for (var y in this.selectedBankBills) {
        this.selectedBankBills[y].select = true;
      }
    } else {
      for (var y in this.selectedBankBills) {
        this.selectedBankBills[y].select = false;
      }
    }
  }

  selectOtherBank() {
    if (this.selectAll == true) {
      for (var y in this.otherBankBills) {
        this.otherBankBills[y].select = true;
      }
    } else {
      for (var y in this.otherBankBills) {
        this.otherBankBills[y].select = false;
      }
    }
  }

  submitToBePaidBills() {

    //this._loader.callLoaderMethod('show');


    if (this.selectedBankBills.filter(x => x.select == true).length != 0) {
      if (this.otherBankBills.filter(x => x.select == true).length != 0) {
        alert("Both selected bank and other bank bills cannot be submitted simultaneously");
        return;
      }
    }

    if (this.paymentType == undefined || this.paymentType == null || this.paymentType == '') {
      alert("Please select payment mode");
      return;
    }

    this.selectedBankBills = this.selectedBankBills.filter(x => x.select == true);
    this.otherBankBills = this.otherBankBills.filter(x => x.select == true);

    for (var y in this.selectedBankBills) {
      this.selectedBankBills[y].tdsAmount = Math.round((this.selectedBankBills[y].tdsApplicableAmount ?? 0) * (this.selectedBankBills[y].tdsPercentage ?? 0) / 100);
      this.selectedBankBills[y].paymentMode_Admin = this.paymentType;
      this.toBePaidBills.push(this.selectedBankBills[y]);
    }

    for (var y in this.otherBankBills) {
      this.otherBankBills[y].tdsAmount = Math.round((this.otherBankBills[y].tdsApplicableAmount ?? 0) * (this.otherBankBills[y].tdsPercentage ?? 0) / 100);
      this.otherBankBills[y].paymentMode_Admin = this.paymentType;
      this.toBePaidBills.push(this.otherBankBills[y]);
    }

    if (this.toBePaidBills.length == 0) {
      alert('Please select atleast one bill');
      this._loader.callLoaderMethod('hide');
      return;
    }

    //console.log(JSON.stringify(this.toBePaidBills));

    this._vendorService.submitToBePaidBills(this.toBePaidBills).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        window.location.reload();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

}
