import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { Vendor } from 'src/app/AAAA_Models/Vendor-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-vendor-payments',
  templateUrl: './vendor-payments.component.html',
  styleUrls: ['./vendor-payments.component.scss']
})
export class VendorPaymentsComponent implements OnInit {

  public paymentModeDD = new Array<DropDownData>();
  public statusDD = new Array<DropDownData>();
  searchObject = new Reciept();
  public reciepts = new Array<Reciept>();
  public vendorDetails = new Array<Vendor>();

  public filterMetadata = { count: 0, data: new Array<any>() };
  page: any;
  loader: any;
  selectAll: any;
  vendorIds: any;
  reverse: any;

  totalAmount1: any;
  totalAmount2: any;
  totalAmount3: any;

  constructor(private _profileService: FacultyProfileService,
    private _spinner: NgxSpinnerService,
    private _loader: LoaderService,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _vendorService: VendorDetailsService,
  ) { }

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(98);

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


    this._authService.getAdminSubRights(98).subscribe({
      next: (x) => {
        this.reverse = x.includes(60);
        // this.represent = x.includes(44);

        // if (this.reverse == true) {

        // }
        // else {
        //   this._loader.callLoaderMethod('hide');
        // }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
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

  search() {

    if(this.vendorIds != undefined){
      this.searchObject.itsCsv = this.vendorIds.join(',');
    }

    if((this.searchObject.fromDate1 == undefined) && (this.searchObject.itsCsv == undefined || this.searchObject.itsCsv == null || this.searchObject.itsCsv == "")){
      alert("Please select either both or atleast any one option to search payments.");
    }

    if (this.searchObject.fromDate1 != undefined) {

      if (this.searchObject.toDate1 == null || this.searchObject.toDate1 == undefined) {
        alert('Kindly enter to Date');
        return;
      }


      this.searchObject.fromDate = new Date(this.searchObject.fromDate1 ?? '');
      this.searchObject.toDate = new Date(this.searchObject.toDate1 ?? '');

      this.searchObject.fromDate.setDate(this.searchObject.fromDate.getDate() + 1);
      this.searchObject.toDate.setDate(this.searchObject.toDate.getDate() + 1);


    }
    else {
      this.searchObject.fromDate = undefined;
      this.searchObject.toDate = undefined;
    }

    // this._loader.callLoaderMethod('show');
    this.loader = true;
    this._vendorService.getVendorPayments(this.searchObject).subscribe({
      next: (x) => {
        // this._loader.callLoaderMethod('hide');
        this.loader = false;
        this.reciepts = x.model;

        //payable amount in each reciept is totalAmount - tdsAmount
        for (var y in this.reciepts) {
          this.reciepts[y].payableAmount = parseInt(this.reciepts[y].feePaidAmount ?? "") - (this.reciepts[y].tdsAmount ?? 0);
        }

        //sum of feePaidAmount in reciepts
        this.totalAmount1 = 0;
        for (var y in this.reciepts) {
          this.totalAmount1 += parseInt(this.reciepts[y].feePaidAmount ?? "");
        }

        //sum of tdsAmount in reciepts
        this.totalAmount2 = 0;
        for (var y in this.reciepts) {
          this.totalAmount2 += this.reciepts[y].tdsAmount ?? 0;
        }

        //sum of payableAmount in reciepts
        this.totalAmount3 = 0;
        for (var y in this.reciepts) {
          this.totalAmount3 += this.reciepts[y].payableAmount ?? 0;
        }
        // this.FieldNames = x.exportCategory;
        // this.garaamatAmount = 500;
        this.paymentModeDD = x.paymentModeDD;
        this.statusDD = x.statusDD;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });



  }

  clear() {
    this.searchObject.fromDate1 = undefined;
    this.searchObject.toDate1 = undefined;
    this.searchObject.itsCsv = undefined;
    this.vendorIds = undefined;
  }

  ReversePayment(id: number) {
  }

  ExportPaymentStatement() {
  }

  setSelectAll() {
    if (this.selectAll == false) {
      for (var y in this.reciepts) {
        this.reciepts[y].select = false;
      }
    } else {
      for (var y in this.reciepts) {
        this.reciepts[y].select = true;
      }
    }
  }

  selectedVendors() {

    if (this.vendorIds == undefined || this.vendorIds == null || this.vendorIds == "") {
      this.vendorIds = undefined;
    }

  }

}
