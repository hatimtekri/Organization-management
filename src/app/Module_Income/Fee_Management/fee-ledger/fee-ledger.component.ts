import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FeeCategoryModel } from 'src/app/AAAA_Models/FeeCategoryModel-Model';
import { FeePayment } from 'src/app/AAAA_Models/FeePaymentModel';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { StudentLogs } from 'src/app/AAAA_Models/StudentLogs-Model';

import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { IncomeService } from 'src/app/Services/income.service';
import { FeeLedgerService } from 'src/app/Services/Income/fee-ledger.service';
declare var swal: any;

@Component({
  selector: 'app-fee-ledger',
  templateUrl: './fee-ledger.component.html',
  styleUrls: ['./fee-ledger.component.scss'],
  providers: [FeeLedgerService]
})
export class FeeLedgerComponent implements OnInit {

  public actionDD = [

    { name: "Waive" },
    { name: "Reverse (Wallet)" },

  ];

  public reasonDD = [
    {
      name: 'Funds Insufficient'
    },
    {
      name: 'Drawers Signature differs'
    },
    {
      name: 'Kindly contact Drawer or Drawee Bank'
    },
    {
      name: 'Exceeds arrangement'
    },
    {
      name: 'Account blocked'
    },
    {
      name: 'PAN Required'
    },
    {
      name: 'Wrong Entry'
    },
    {
      name: 'Alteration'
    },
    {
      name: 'Connectivity failure'
    },
    {
      name: 'Item listed twice'
    },
    {
      name: 'Payment stopped by drawer'
    },
    {
      name: 'Effects not cleared, present again'
    },
    {
      name: 'Instrument without proper date'
    },
    {
      name: 'Do not participate in CTS clearing'
    },
    {
      name: 'Invalid Instrument Type'
    },
    {
      name: 'Exit'
    },
  ];

  public obj = new FeeTransaction();
  public programDD = new Array<DropDownData>();
  public leaders = new Array<FeeTransaction>();
  public categories = new Array<FeeCategoryModel>();
  public logs = new Array<StudentLogs>();
  itsId: any;

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

  pset: any;
  public references = new Array<FeePayment>();
  page: any;
  constructor(private _feeledgerService: FeeLedgerService, private _loader: LoaderService, private toastr: ToastrService, private _authService: AuthService) { }

  ngOnInit(): void {


    this._feeledgerService.getPsetData(500).subscribe({
      next: (x) => {
        this.programDD = x;
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => { },
    });


    this.isShow = false;

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(72);

        if (this.page == true) {
          this._loader.callLoaderMethod('hide');
        }
        else {
          this._loader.callLoaderMethod('hide');

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._authService.getAdminSubRights(72).subscribe({
      next: (x) => {
        this.waiveAndReverse = x.includes(38);

        if (this.waiveAndReverse == true) {

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

    this._authService.getAdminSubRights(72).subscribe({
      next: (x) => {
        this.changePset = x.includes(42);

        if (this.changePset == true) {

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



  }

  loadData(id: number) {
    this._loader.callLoaderMethod('show');
    this._feeledgerService.getStudentFeeLeader(id).subscribe({
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
        this.fcName = x.fcName;
        this.categories = x.categories;
        this.amount = x.amount;
        this.fcId = x.fcId;
        this.status = x.status;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  submit() {
    this._loader.callLoaderMethod('show');
    this.obj.itsId = this.itsId;
    this._feeledgerService.WaiveAndReverse(this.obj).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.loadData(this.itsId);
        this.obj = new FeeTransaction();

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  SaveFc() {
    this._loader.callLoaderMethod('show');
    this._feeledgerService.submitFcId(this.itsId, this.fcId).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.loadData(this.itsId);
        this.fcEdit = false;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        //swal('Error!', err.error.message, 'error');
      },
    });
  }

  SavePset() {
    this._loader.callLoaderMethod('show');
    this._feeledgerService.submitPsetId(this.itsId, this.pset).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.loadData(this.itsId);
        this.psetEdit = false;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        //swal('Error!', err.error.message, 'error');
      },
    });
  }

  getLogs(id: number) {
    this._loader.callLoaderMethod('show');
    this._feeledgerService.getStudentLogs(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.logs = x;



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  clear() {
    this.ngOnInit();
  }
  setAmount() {
    this._loader.callLoaderMethod('show');
    this._feeledgerService.getWaiveandReverseAmount(this.itsId, this.obj.id ?? 0, this.obj.action).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.obj.debit = x;


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');

      },
    });

  }
}
