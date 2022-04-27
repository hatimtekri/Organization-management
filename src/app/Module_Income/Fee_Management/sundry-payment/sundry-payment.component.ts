import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeeAllotment } from 'src/app/AAAA_Models/FeeAllotmentModel';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { FeeReceiptService } from 'src/app/Services/Income/fee-receipt.service';
declare var swal: any;

@Component({
  selector: 'app-sundry-payment',
  templateUrl: './sundry-payment.component.html',
  styleUrls: ['./sundry-payment.component.scss']
})
export class SundryPaymentComponent implements OnInit {

  recieptPrint = new Reciept();

  public reciept = new FeeTransaction();

  //public feePaidList = new FeeAllotment();

  isPrint: any;
  totalAmount: any;
  itsId: any;
  isShow: any;
  page: any;
  name:any;

  constructor(
    private _incomeService: FeeReceiptService,
    private _loader: LoaderService,
    private toastr: ToastrService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(93);

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
  }

  loadData(itsId: number) {
    this._loader.callLoaderMethod('show');
    this._authService.getITSDetails(itsId).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.name = x.name;

        this.isShow = true;
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

  submitReciet() {


    this.reciept.debitNo = this.totalAmount;
    this.reciept.itsId = this.itsId;
    this.reciept.bankName = this.name;
    this.reciept.paymentType = "Cash";

    if (this.reciept.debitNo == 0 || this.reciept.debitNo == null || this.reciept.debitNo == undefined) {
      alert('Kindly enter amount');
      return;
    }


    this._loader.callLoaderMethod('show');


    this._incomeService.createSundryReciept(this.reciept).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        console.log(JSON.stringify(x));
        this.recieptPrint = x;
        console.log(JSON.stringify(this.recieptPrint));
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
