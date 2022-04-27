import { Component, OnInit } from '@angular/core';
import { FeePayment } from 'src/app/AAAA_Models/FeePaymentModel';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';

import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { ToastrService } from 'ngx-toastr';

import { IncomeService } from 'src/app/Services/income.service';
import { EwalletLedgerService } from 'src/app/Services/Income/ewallet-ledger.service';
import { AuthService } from 'src/app/Services/auth.service';
declare var swal: any;

@Component({
  selector: 'app-ewallet-ledger',
  templateUrl: './ewallet-ledger.component.html',
  styleUrls: ['./ewallet-ledger.component.scss'],
  providers: [EwalletLedgerService]

})
export class EwalletLedgerComponent implements OnInit {

  public actionDD = [
    {name:"Reverse"},
    {name:"Waive"},
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
  public obj =new FeeTransaction();

  public leaders = new Array<FeeTransaction>();
  itsId: any;

  credit: any;
  debit: any;
  
  balance: any;

  name: any;
  
  isShow: any;

  transfer: any;
  page: any;

public references=new Array<FeePayment>();

  constructor(private _incomeService: EwalletLedgerService, private _authService:AuthService,private _loader: LoaderService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.isShow = false;
    this.isShow = false;
    
    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(74);

        if (this.page == true) {
          this._loader.callLoaderMethod('hide');
        }
        else
        {
        this._loader.callLoaderMethod('hide');

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._authService.getAdminSubRights(74).subscribe({
      next: (x) => {
        this.transfer = x.includes(40);

        if (this.transfer == true) {
          
        }
        else{
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
    this._incomeService.getStudentWalletLeader(id).subscribe({
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

  submit()
  {
    this._loader.callLoaderMethod('show');
    this.obj.itsId_from=this.itsId;
    this._incomeService.WalletToWallet_Transfer(this.obj).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.loadData(this.itsId);
        this.obj=new FeeTransaction();

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

}
