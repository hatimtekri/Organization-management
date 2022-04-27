import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { ExpenseVendorDetails } from 'src/app/AAAA_Models/ExpenseVendorDetails-Model';
import { Vendor } from 'src/app/AAAA_Models/Vendor-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {

  public stateDD = new Array<any>();
  public cityDD = new Array<any>();

  selectall_vcolumns: any;
  public file = null;
  public filename: any;
  public columndisplay = new ExpenseVendorDetails();
  public vendorDetails = new Array<Vendor>();
  public onlineUserDetails = new Array<Vendor>();
  public vendor = new Vendor();
  public editVendor = new Vendor();
  page: any;
  notpage: any;
  addVendorR: any;
  activeInactiveVendorR: any;
  editVendorR: any;
  apiToken: any;
  isaddOnlineUser: any;

  public vendorTypes = [
    { name: "Cash" },
    { name: "Cheque" },
    { name: "Online" }
  ];
  constructor(private toastr: ToastrService, private _authService: AuthService, private _vendorService: VendorDetailsService, private _loader: LoaderService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {


    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(83);

        if (this.page == true) {
          this._loader.callLoaderMethod('hide');
        }
        else {
          this.notpage = true;
          this._loader.callLoaderMethod('hide');

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._authService.getAdminSubRights(83).subscribe({
      next: (x) => {
        this.editVendorR = x.includes(45);
        this.activeInactiveVendorR = x.includes(46);
        this.addVendorR = x.includes(47);
        this.isaddOnlineUser = x.includes(56);

        if (this.editVendorR == true) {

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


    this.columndisplay.show_srNo = true;
    this.columndisplay.show_vendorId = true;
    this.columndisplay.show_vendorName = true;
    this.columndisplay.show_mobile = true;
    this.columndisplay.show_panNo = true;
    this.columndisplay.show_accountDetails = true;
    this.columndisplay.show_address = true;
    this.columndisplay.show_vendorType = true;

    this._vendorService.getVendorDetails().subscribe({
      next: (x) => {
        this.vendorDetails = x;

      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._vendorService.getOnlinePaymentUsers().subscribe({
      next: (x) => {
        this.onlineUserDetails = x;

      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._vendorService.getstatesCityApiAuthToken().subscribe({
      next: (x) => {
        this.apiToken = x.auth_token;

        console.log("auth token  " + this.apiToken);
        this._vendorService.getstatesFromAPi(this.apiToken).subscribe({
          next: (x) => {
            this.stateDD = x;
            console.log("states  " + JSON.stringify(this.stateDD));


          },
          error: (err) => {

            this._loader.callLoaderMethod('hide');
            swal('Error!', err.error.message, 'error');
          },
        });

      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

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

      if (!(extension == "jpeg")) {
        alert('Please upload jpeg file only');
        return;
      }
      this.file = event.target.files[0];
    }
    else {
      alert('Please upload the file');
      return;
    }

  }

  selectAll_vcolumns() {
    this.columndisplay.show_srNo = !this.selectall_vcolumns;
    this.columndisplay.show_vendorId = !this.selectall_vcolumns;
    this.columndisplay.show_vendorName = !this.selectall_vcolumns;
    this.columndisplay.show_phone = !this.selectall_vcolumns;
    this.columndisplay.show_panNo = !this.selectall_vcolumns;
    this.columndisplay.show_accountDetails = !this.selectall_vcolumns;
    this.columndisplay.show_address = !this.selectall_vcolumns;
    this.columndisplay.show_mobile = !this.selectall_vcolumns;
    this.columndisplay.show_whatsapp = !this.selectall_vcolumns;
    this.columndisplay.show_state = !this.selectall_vcolumns;
    this.columndisplay.show_city = !this.selectall_vcolumns;
    this.columndisplay.show_vendorType = !this.selectall_vcolumns;
  }


  addVendor() {

    if (this.vendor.name == undefined || this.vendor.name == null || this.vendor.name == "") {
      alert('Kindly enter vendor name');
      return;
    }

    if (this.vendor.mobileNo == undefined || this.vendor.mobileNo == null || this.vendor.mobileNo == "") {
      alert('Kindly enter mobile number');
      return;
    }

    if (this.vendor.state == undefined || this.vendor.state == null || this.vendor.state == "") {
      alert('Kindly enter state');
      return;
    }

    if (this.vendor.city == undefined || this.vendor.city == null || this.vendor.city == "") {
      alert('Kindly enter city');
      return;
    }

    if (this.vendor.ifscCode == undefined || this.vendor.ifscCode == null || this.vendor.ifscCode == "") {
      alert('Kindly enter ifsc code');
      return;
    }

    if (this.vendor.bankName == undefined || this.vendor.bankName == null || this.vendor.bankName == "") {
      alert('Kindly enter bank name');
      return;
    }

    if (this.vendor.accountNo == undefined || this.vendor.accountNo == null || this.vendor.accountNo == "") {
      alert('Kindly enter account number');
      return;
    }
    if (this.vendor.accountName == undefined || this.vendor.accountName == null || this.vendor.accountName == "") {
      alert('Kindly enter account name');
      return;
    }

    if (this.vendor.panCardNo == undefined || this.vendor.panCardNo == null || this.vendor.panCardNo == "") {
      this.file = null;
    }
    else {
      if (this.file === null) {
        alert("please select the file");
        return;
      }
    }


    var fd = new FormData();
    fd.append('attachment_file', this.file ?? "");


    this._loader.callLoaderMethod('show');


    this._vendorService.addVendorDetails(this.vendor).subscribe({
      next: (x) => {
        this.vendor = new Vendor();

        if (this.file !== null) {
          this._vendorService.submitVendorPancardAttachment(x, fd).subscribe({
            next: (x) => {

              this._vendorService.getVendorDetails().subscribe({
                next: (x) => {
                  this.vendorDetails = x;
                  this._loader.callLoaderMethod('hide');
                  this.toastr.success('Saved successfully', '');
                  this.ngOnInit();
                },
                error: (err) => {

                  this._loader.callLoaderMethod('hide');
                  swal('Error!', err.error.message, 'error');
                },
              });

            },
            error: (err) => {

              this._loader.callLoaderMethod('hide');
              swal('Error!', err.error.message, 'error');
            },
          });
        }
        else {
          this.toastr.success('Saved successfully', '');
          this.ngOnInit();
        }


      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  EditVendor() {

    if (this.editVendor.name == undefined || this.editVendor.name == null || this.editVendor.name == "") {
      alert('Kindly enter vendor name');
      return;
    }

    if (this.editVendor.mobileNo == undefined || this.editVendor.mobileNo == null || this.editVendor.mobileNo == "") {
      alert('Kindly enter mobile number');
      return;
    }

    // if (this.editVendor.whatsappNo == undefined || this.editVendor.whatsappNo == null || this.editVendor.whatsappNo == "") {
    //   alert('Kindly enter whatsapp number');
    //   return;
    // }
    if (this.editVendor.state == undefined || this.editVendor.state == null || this.editVendor.state == "") {
      alert('Kindly enter state');
      return;
    }

    if (this.editVendor.city == undefined || this.editVendor.city == null || this.editVendor.city == "") {
      alert('Kindly enter city');
      return;
    }

    if (this.editVendor.ifscCode == undefined || this.editVendor.ifscCode == null || this.editVendor.ifscCode == "") {
      alert('Kindly enter ifsc code');
      return;
    }

    if (this.editVendor.bankName == undefined || this.editVendor.bankName == null || this.editVendor.bankName == "") {
      alert('Kindly enter bank name');
      return;
    }

    if (this.editVendor.accountNo == undefined || this.editVendor.accountNo == null || this.editVendor.accountNo == "") {
      alert('Kindly enter account number');
      return;
    }
    if (this.editVendor.accountName == undefined || this.editVendor.accountName == null || this.editVendor.accountName == "") {
      alert('Kindly enter account name');
      return;
    }


    var fd = new FormData();
    fd.append('attachment_file', this.file ?? "");


    this._loader.callLoaderMethod('show');


    this._vendorService.editVendorDetails(this.editVendor).subscribe({
      next: (x) => {
        this.editVendor = new Vendor();

        if (this.file !== null) {
          this._vendorService.submitVendorPancardAttachment(x, fd).subscribe({
            next: (x) => {

              this._vendorService.getVendorDetails().subscribe({
                next: (x) => {
                  this.vendorDetails = x;
                  this._loader.callLoaderMethod('hide');
                  this.toastr.success('Saved successfully', '');
                  this.ngOnInit();
                },
                error: (err) => {

                  this._loader.callLoaderMethod('hide');
                  swal('Error!', err.error.message, 'error');
                },
              });

            },
            error: (err) => {

              this._loader.callLoaderMethod('hide');
              swal('Error!', err.error.message, 'error');
            },
          });
        }
        else {
          this.toastr.success('Saved successfully', '');
          this.ngOnInit();
        }


      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  editClick(model: Vendor) {

    // if (!(model.panCardNo == undefined || model.panCardNo == null || model.panCardNo == "")) {

    //   let dataURI = this.getBase64Image(document.getElementById("imageid"));

    //   var byteString = atob(dataURI.split(',')[1]);
    //   var ab = new ArrayBuffer(byteString.length);
    //   var ia = new Uint8Array(ab);
    //   for (var i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    //   }
    //   var blob = new Blob([ia], {
    //     type: 'image/jpg'
    //   });
    //   this.file = new File([blob], "image.jpg");
    // }


    this.editVendor = model;
  }

  ActiveInactive(id: any) {
    this._loader.callLoaderMethod('show');

    this._vendorService.VendorActiveInactive(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');


      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  ifscChange() {
    this._vendorService.getIFSCDetails(this.vendor.ifscCode).subscribe({
      next: (x) => {
        console.log(x);
        this.vendor.bankName = x.BANK;


      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  stateChange() {
    this._vendorService.getcitiesFromAPi(this.apiToken, this.vendor.state).subscribe({
      next: (x) => {
        this.cityDD = x;
        console.log("states  " + JSON.stringify(this.cityDD));


      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }

  getBase64Image(img: any) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpg");
    return dataURL.replace(/^data:image\/(jpg);base64,/, "");
  }

  getUpperCaseOfFirstLetterOfEveryWord(value: string): string {
    return value.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(); });
  }

  getUpperCaseofFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  onchange_accName() {
    if (!(this.vendor.accountName == undefined || this.vendor.accountName == null || this.vendor.accountName == "")) {
      this.vendor.accountName = this.getUpperCaseOfFirstLetterOfEveryWord(this.vendor.accountName);
      console.log("account name " + this.vendor.accountName);
    }
  }

  onchange_vendorName() {
    if (!(this.vendor.name == undefined || this.vendor.name == null || this.vendor.name == "")) {
      this.vendor.name = this.getUpperCaseOfFirstLetterOfEveryWord(this.vendor.name);
      console.log("vendor name " + this.vendor.name);
    }
  }

  onchange_pancardNo() {
    this.vendor.panCardNo = this.vendor.panCardNo?.toUpperCase();

    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if (regpan.test(this.vendor.panCardNo ?? '')) {

    } else {
      alert('Kindly enter valid Pan Card No');
      return;
    }
  }

  onchange_ifsc() {
    this.vendor.ifscCode = this.vendor.ifscCode?.toUpperCase();
  }

  onchange_address() {
    this.vendor.address = this.getUpperCaseOfFirstLetterOfEveryWord(this.vendor.address ?? '');
  }

  onchange_mobile() {
    if (this.vendor.mobileNo?.length != 10) {
      alert('Kindly enter valid Mobile No');
      return;
    }
  }

  addOnlineUser() {

    if (this.vendor.name == undefined || this.vendor.name == null || this.vendor.name == "") {
      alert('Kindly enter Online User name');
      return;
    }

    if (this.vendor.ifscCode == undefined || this.vendor.ifscCode == null || this.vendor.ifscCode == "") {
      alert('Kindly enter ifsc code');
      return;
    }

    if (this.vendor.bankName == undefined || this.vendor.bankName == null || this.vendor.bankName == "") {
      alert('Kindly enter bank name');
      return;
    }

    if (this.vendor.accountNo == undefined || this.vendor.accountNo == null || this.vendor.accountNo == "") {
      alert('Kindly enter account number');
      return;
    }
    if (this.vendor.accountName == undefined || this.vendor.accountName == null || this.vendor.accountName == "") {
      alert('Kindly enter account name');
      return;
    }


    this._loader.callLoaderMethod('show');


    this._vendorService.addOnlineUser(this.vendor).subscribe({
      next: (x) => {
        this.vendor = new Vendor();
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.ngOnInit();

      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  deleteOnlineUser(id: any, name: string) {
    var go = confirm('Are you sure you want to delete the Online Payment User: ' + name + '?');
    if (!go) return;


    this._vendorService.deleteOnlineUser(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

}
