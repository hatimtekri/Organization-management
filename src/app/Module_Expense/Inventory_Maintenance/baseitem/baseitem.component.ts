import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-baseitem',
  templateUrl: './baseitem.component.html',
  styleUrls: ['./baseitem.component.scss']
})
export class BaseitemComponent implements OnInit {

  edit: boolean = false;
  public baseitems = new Array<any>();

  baseitemName: any;
  public searchText: any;

  page: any;
  add: any;
  delete: any;

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
        this.page = x.includes(87);


        //this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._authService.getAdminSubRights(87).subscribe({
      next: (x) => {
        this.add = x.includes(52);
        this.edit = x.includes(53);


        //this._loader.callLoaderMethod('hide');

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._vendorService.getallBaseItem().subscribe({
      next: (x) => {
        this.baseitems = x;
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  Edit_BaseItem(baseitem: any) {
    if (baseitem.name == null || baseitem.name == '' || baseitem.name == undefined) {
      alert('Please Enter Expense Head');
      return;
    }

    var go = confirm('Are you sure you want to EDIT the Expense Head?');
    if (!go) return;

    let editbaseitem = new BillManagement();
    editbaseitem.baseItemName = baseitem.name;
    editbaseitem.baseItemId = baseitem.id;
    editbaseitem.itemName = '';

    this._vendorService.addBaseItem(editbaseitem).subscribe({
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

  Add_BaseItem() {
    if (this.baseitemName == null || this.baseitemName == '' || this.baseitemName == undefined) {
      alert('Please Enter Expense Head');
      return;
    }

    let baseitem = new BillManagement();
    baseitem.baseItemName = this.baseitemName;
    baseitem.itemName = 'New';

    this._vendorService.addBaseItem(baseitem).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.baseitemName = '';
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }

  changeStatus(status: any, id: any) {

    if (status) {
      this._loader.callLoaderMethod('show');
      this._vendorService.activeBaseItem(id).subscribe({
        next: (x) => {
          this.toastr.success('Expense Head Activated', 'Success');
          this._loader.callLoaderMethod('hide');
          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
    }
    else {
      var go = confirm('Are you sure you want deactivate expense head? All tagging will be removed.');  
      if (!go) return;
      this._loader.callLoaderMethod('show');
      this._vendorService.inActiveBaseItem(id).subscribe({
        next: (x) => {
          this.toastr.error('Expense Head Deactivated', 'Success');
          this._loader.callLoaderMethod('hide');
          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
    }

  }

}
