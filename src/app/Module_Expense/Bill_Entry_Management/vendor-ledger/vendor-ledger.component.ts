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
  selector: 'app-vendor-ledger',
  templateUrl: './vendor-ledger.component.html',
  styleUrls: ['./vendor-ledger.component.scss']
})
export class VendorLedgerComponent implements OnInit {


  public leaders = new Array<FeeTransaction>();
  public references = new Array<FeePayment>();
  public categories = new Array<FeeCategoryModel>();
  public vendorDetails = new Array<Vendor>();

  
  allocated: any;
  fcId: any;
  paid: any;
  waived: any;
  status: any;
  reversed: any;
  wallet_b: any;
  wallet_d: any;
  wallet_c: any;
  balance: any;
  fcName: any;
  name: any;
  program: any;
  isShow: any;
  amount: any;
  fcEdit: any;
  psetEdit: any;
  waiveAndReverse: any;
  changePset: any;
  page:any;
  vendorId:any;


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
        this.page = x.includes(92);


        //this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
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
  }

  loadData(id: number) {
    this._loader.callLoaderMethod('show');
    this._vendorService.getVendorLeader(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.leaders = x.models;

        this.balance = x.balance;
        this.reversed = x.reversed;
        this.waived = x.waived;
        this.allocated = x.allocated;

        this.wallet_b = x.wallet_b;
        this.wallet_d = x.wallet_d;
        this.wallet_c = x.wallet_c;


        this.paid = x.paid;
        this.name = x.name;
        this.program = x.program;
        this.references = x.references;
        this.isShow = true;
        this.fcName=x.fcName;
        this.categories=x.categories;
        this.amount=x.amount;
        this.fcId=x.fcId;
        this.status=x.status;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  clear() {
    window.location.reload();
  }

}
