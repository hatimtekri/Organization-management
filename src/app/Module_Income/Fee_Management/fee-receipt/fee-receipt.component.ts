import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FeeAllotment } from 'src/app/AAAA_Models/FeeAllotmentModel';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { mz_fee_collection_center } from 'src/app/AAAA_Models/mz_fee_collection_center';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';

import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { IncomeService } from 'src/app/Services/income.service';
import { FeeReceiptService } from 'src/app/Services/Income/fee-receipt.service';
declare var swal: any;
@Component({
  selector: 'app-fee-receipt',
  templateUrl: './fee-receipt.component.html',
  styleUrls: ['./fee-receipt.component.scss'],
  providers: [FeeReceiptService]
  
})
export class FeeReceiptComponent implements OnInit {

  public actionDD = new Array<DropDownData>();

  constructor(private _incomeService: FeeReceiptService, private _loader: LoaderService, private toastr: ToastrService,private _authService:AuthService) { }

  public leaders = new Array<FeeTransaction>();
  itsId: any;
  edit: boolean = true;
  allocated: any;
  paid: any;
  waived: any;
  reversed: any;
  balance: any;
  totalAmount: any;
  selectedId: number = 1;
  name: any;
  program: any;
  isShow: any;
  wallet_b:any;
  recieptPrint = new Reciept();
  isPrint: any;
  public feeallocatedDD = new Array<FeeAllotment>();
  public feePaidList = new Array<FeeAllotment>();
  public banksDD = new Array<DropDownData>();
  public reciept = new FeeTransaction();
  public cCenter = new Array<mz_fee_collection_center>();
  public paymentMode = [
    // { name: "Cash" },
    // { name: "Cheque" },
    // { name: "E-Wallet" },
  ];


  public collectionCenter = [
    { id: 2, name: "Surat Office" },

  ];

  page:any;

  ngOnInit(): void {

    this.isShow = false;
    
    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(71);

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


    this._incomeService.getBanksList().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.banksDD = new Array<DropDownData>();

        for (let i = 0; i < x.length; i++) {
          const a = new DropDownData();
          a.name = x[i].bankName;
          this.banksDD.push(a);
        }


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        //swal('Error!', err.error.message, 'error');
      },
    });


  }
  clear()
  {
    this.ngOnInit();
  }
  loadData(id: number) {
    this._loader.callLoaderMethod('show');
    this._incomeService.getStudentFeeLeader(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.leaders = x.models;

        this.balance = x.balance;
        this.reversed = x.reversed;
        this.waived = x.waived;
        this.allocated = x.allocated;
        this.paid = x.paid;
        this.wallet_b = x.wallet_b;
        this.name = x.name;
        this.program = x.program;
        this.cCenter = x.cCenters;
        this.isShow = true;
        this.paymentMode=x.modes;


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
    this._incomeService.getFeeAllocationForPayment(this.itsId).subscribe({
      next: x => {
        this._loader.callLoaderMethod('hide');
        this.feeallocatedDD = x;
        this.setFeePaid();

      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        //swal('Error!', err.error.message, 'error');
      }
    });

  }
  setFeePaid() {
    this._loader.callLoaderMethod('show');
    let c = 1;
    this.feePaidList = new Array<any>();

    for (let i = 0; i < this.feeallocatedDD.length; i++) {
      let ccc = this.feeallocatedDD[i];
      if (ccc.id) {
        if (ccc.id > this.selectedId) {
          break;
        }
        let aaa = new FeeAllotment();
        aaa.id = this.feeallocatedDD[i].id;
        aaa.name = this.feeallocatedDD[i].name;
        aaa.amount = this.feeallocatedDD[i].amount;
        aaa.allotmentId = this.feeallocatedDD[i].allotmentId;

        this.feePaidList.push(aaa);

      }

    }

    this.totalAmount = this.feePaidList.reduce((sum, record) => sum + (record.amount ?? 0), 0);

    this._loader.callLoaderMethod('hide');

  }
  amountChange(id: number, amount: number) {
    this._loader.callLoaderMethod('show');
    const a = this.feeallocatedDD.find(x => x.id == id)?.amount;
    const a2 = this.feePaidList.find(x => x.id == id)?.amount;

    console.log("A2 - " + a2);
    console.log("A - " + a);

    if (a2 && a) {
      if (a2 > a) {
        alert("Payment amount cannot exceed Pending Amount!");
        let bb = this.feePaidList.find(x => x.id == id);
        //this.feePaidList.find(x=>x.id == id).amount=a;
        if (bb) {
          bb.amount = a;
        }

      }
      else if (a2 <= 0) {
        alert("Payment amount cannot be equal to or less them zero!");
        let bb = this.feePaidList.find(x => x.id == id);
        //this.feePaidList.find(x=>x.id == id).amount=a;
        if (bb) {
          bb.amount = a;
        }


      }

    }
    else {
      alert("Payment amount cannot be equal to or less them zero!");
      let bb = this.feePaidList.find(x => x.id == id);
      //this.feePaidList.find(x=>x.id == id).amount=a;
      if (bb) {
        bb.amount = a;
      }
    }

    this.totalAmount = this.feePaidList.reduce((sum, record) => sum + (record.amount ?? 0), 0);

    this._loader.callLoaderMethod('hide');

  }

  submitReciet() {


    if(this.reciept.paymentType == "Cash" || this.reciept.paymentType == "Cheque")
    {
      this.reciept.collectioncenterId='2';
    }
    else if(this.reciept.paymentType == "E-Wallet")
    {
      this.reciept.collectioncenterId='3';
      
    }

    
    this.reciept.debit = this.totalAmount;
    this.reciept.itsId = this.itsId;
    if (this.reciept.collectioncenterId == "" || this.reciept.collectioncenterId == null || this.reciept.collectioncenterId == undefined) {
      alert('Kindly enter collectioncenter');
      return;
    }
    if (this.reciept.paymentType == "" || this.reciept.paymentType == null || this.reciept.paymentType == undefined) {
      alert('Kindly enter payment Mode');
      return;
    }
    if (this.reciept.debit == "" || this.reciept.debit == '0' || this.reciept.debit == null || this.reciept.debit == undefined) {
      alert('Kindly enter amount');
      return;
    }



    if (this.reciept.paymentType == "Cheque") {
      if (this.reciept.chequeDate1 == null || this.reciept.chequeDate1 == undefined) {
        alert('Kindly enter cheque Date');
        return;
      }

      if (this.reciept.reference == null || this.reciept.reference == undefined) {
        alert('Kindly enter cheque Number');
        return;
      }

      if (this.reciept.bankName == null || this.reciept.bankName == undefined || this.reciept.bankName == "") {
        alert('Kindly enter bank Name');
        return;
      }

    }
    this.reciept.chequeDate = new Date(this.reciept.chequeDate1 ?? '');

    this.reciept.chequeDate.setDate(this.reciept.chequeDate.getDate() + 1);

    this.feePaidList[0].reciept = this.reciept;
    this.feePaidList[0].paymentId = this.reciept.reference;


    this._loader.callLoaderMethod('show');

    if (this.reciept.paymentType == "E-Wallet") {
      this._incomeService.useEWallet(this.feePaidList).subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
        
          this.reciept = new FeeTransaction();
          this.totalAmount = undefined;
  
  
          this.toastr.success('Saved successfully', '');
          this.loadData(this.itsId);
  
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          //swal('Error!', err.error.message, 'error');
        },
      });

    }
    else{
      this._incomeService.createReciept(this.feePaidList).subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          this.recieptPrint = x;
          this.isPrint = true;
          this.reciept = new FeeTransaction();
          this.totalAmount = undefined;
  
  
          this.toastr.success('Saved successfully', '');
          this.loadData(this.itsId);
  
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          //swal('Error!', err.error.message, 'error');
        },
      });
    }
   

  }

}
