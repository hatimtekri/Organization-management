import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-item-baseitem',
  templateUrl: './item-baseitem.component.html',
  styleUrls: ['./item-baseitem.component.scss']
})
export class ItemBaseitemComponent implements OnInit {

  edit: boolean = false;
  public itemDD = new Array<any>();
  public baseitemDD = new Array<any>();
  public itemBaseitems = new Array<any>();

  //itemName: any;
  itemId: any;
  baseItemId: any;
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
        this.page = x.includes(89);


        //this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._authService.getAdminSubRights(89).subscribe({
      next: (x) => {
        this.add = x.includes(54);
        this.delete = x.includes(55);


        //this._loader.callLoaderMethod('hide');

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });



    this._vendorService.getallItems().subscribe({
      next: (x) => {
        this.itemDD = x;
        //this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    //this._loader.callLoaderMethod('show');
    this._vendorService.getallBaseItem().subscribe({
      next: (x) => {
        this.baseitemDD = x;
        //this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._vendorService.getItemBaseitem().subscribe({
      next: (x) => {
        this.itemBaseitems = x;
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    //this._loader.callLoaderMethod('hide');
  }

  delete_mapping(id: any) {
    var go = confirm('Are you sure you want to delete the Mapping ID: ' + id + '?');
    if (!go) return;


    this._vendorService.deleteItemBaseItemMapping(id).subscribe({
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

  Add_Item() {
    if (this.itemId == null || this.itemId == '' || this.itemId == undefined) {
      alert('Please Select Item');
      return;
    }
    if (this.baseItemId == null || this.baseItemId == '' || this.baseItemId == undefined) {
      alert('Please Select Expense Head');
      return;
    }

    let item = new BillManagement();
    item.itemId = this.itemId;
    item.baseItemId = this.baseItemId;

    this._vendorService.addItemBaseItem(item).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.itemId = '';
        this.baseItemId = '';
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }


}
