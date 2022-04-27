import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  //edit: boolean = false;
  public items = new Array<any>();

  itemName: any;
  uom: any;
  uomDD: any;
  public searchText: any;

  page: any;
  add: any;
  edit: any;

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
        this.page = x.includes(88);


        //this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._authService.getAdminSubRights(88).subscribe({
      next: (x) => {
        this.add = x.includes(50);
        this.edit = x.includes(51);


        //this._loader.callLoaderMethod('hide');

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._vendorService.getallItems().subscribe({
      next: (x) => {
        this.items = x;

        this.uomDD = this.items.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.uom === item.uom
          ))
        );
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  Edit_Item(item: any) {
    if (item.name == null || item.name == '' || item.name == undefined) {
      alert('Please Enter Item Name');
      return;
    }
    if (item.uom == null || item.uom == '' || item.uom == undefined) {
      alert('Please Select UOM');
      return;
    }

    var go = confirm('Are you sure you want to edit the Item Name?');
    if (!go) return;

    let edititem = new BillManagement();
    edititem.itemName = item.name;
    edititem.itemId = item.id;
    edititem.remarks = item.uom;
    item.baseItemName = '';

    this._vendorService.addItem(edititem).subscribe({
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
    if (this.itemName == null || this.itemName == '' || this.itemName == undefined) {
      alert('Please Enter Item Name');
      return;
    }
    if (this.uom == null || this.uom == '' || this.uom == undefined) {
      alert('Please Select UOM');
      return;
    }

    let item = new BillManagement();
    item.itemName = this.itemName;
    item.baseItemName = 'New';
    item.remarks = this.uom;

    this._vendorService.addItem(item).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.itemName = '';
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }

}
