import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeeCategoryModel } from 'src/app/AAAA_Models/FeeCategoryModel-Model';
import { FeePayment } from 'src/app/AAAA_Models/FeePaymentModel';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { Vendor } from 'src/app/AAAA_Models/Vendor-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-dept-venue-cash-wallet',
  templateUrl: './dept-venue-cash-wallet.component.html',
  styleUrls: ['./dept-venue-cash-wallet.component.scss']
})
export class DeptVenueCashWalletComponent implements OnInit {

  public leaders = new Array<any>();

  balance: any;

  name: any;

  isShow: any;

  page: any;
  deptVenueId: any;
  deptVenueNameDD: any;
  credit: any;
  debit: any;
  refill: any;

  public obj = new FeeTransaction();


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
        this.page = x.includes(97);


        this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._authService.getAdminSubRights(97).subscribe({
      next: (x) => {
        this.refill = x.includes(59);

        if (this.refill == true) {

        }
        else {
          this._loader.callLoaderMethod('hide');
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getMozeDD(500).subscribe({
      next: x => {

        this.deptVenueNameDD = x;
      },
      error: err => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');

      }
    });
  }

  loadData(id: number) {
    this._loader.callLoaderMethod('show');
    this._vendorService.getDeptVenueCashWalletLedger(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.leaders = x.models;

        this.balance = x.balance;
        this.credit = x.credit;
        this.debit = x.debit;

        this.name = x.name;

        this.isShow = true;



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        //swal('Error!', err.error.message, 'error');
      },
    });
  }

  clear() {
    window.location.reload();
  }

  refillWallet() {
    this._loader.callLoaderMethod('show');
    this.obj.itsId_to = this.deptVenueId;

    if (this.obj.debitNo == null || this.obj.debitNo == undefined) {
      alert('Please Enter Amount');
      return;
    }

    this._vendorService.refillDeptVenueCashWallet(this.obj).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.loadData(this.deptVenueId);
        this.obj = new FeeTransaction();

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

}
