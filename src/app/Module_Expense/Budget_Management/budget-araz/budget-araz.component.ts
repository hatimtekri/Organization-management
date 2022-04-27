import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MultiSearchExpensePipe } from 'src/app/AAAA_FilterPipe/multi-search-expense.pipe';
import { BudgetAraz } from 'src/app/AAAA_Models/BudgetAraz-Model';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FeeCategoryModel } from 'src/app/AAAA_Models/FeeCategoryModel-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-budget-araz',
  templateUrl: './budget-araz.component.html',
  styleUrls: ['./budget-araz.component.scss']
})
export class BudgetArazComponent implements OnInit {

  bdgtArazList = new Array<BudgetAraz>();
  public bdgtAraz = new BudgetAraz();
  public searchObject = new BudgetAraz();
  public deptVenueNameDD = new Array<DropDownData>();
  public baseItemNameDD = new Array<DropDownData>();
  public itemNameDD = new Array<DropDownData>();
  public filterdeptVenueNameDD = new Array<any>();
  public filterbaseItemNameDD = new Array<any>();
  public filteritemNameDD = new Array<any>();
  public psetFcIddata = new Array<FeeCategoryModel>();
  public filterMetadata = { count: 0, data: new Array<any>() };
  page: any;
  totalsum: any;
  totalsum2: any;
  onOffModule: any;
  bdgtArazFilteredList = new Array<BudgetAraz>();

  constructor(private _vendorService: VendorDetailsService,
    private _loader: LoaderService,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _profileService: FacultyProfileService,
  ) { }

  ngOnInit(): void {



    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(55);

        this._loader.callLoaderMethod('hide');

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });


    this._loader.callLoaderMethod('show');
    this._vendorService.getdeptvenuebaseitemtruerightforbudgetaraz(500, 500).subscribe({
      next: (x) => {
        this.bdgtArazList = x.data;

        this.bdgtArazFilteredList = this.bdgtArazList;

        this.setDropDown()


        this.totalsum = this.bdgtArazFilteredList.reduce((sum, record) => sum + (record.totalAmount != undefined ?
          record.totalAmount : 0), 0);
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
    this._vendorService.getDataForEstimateIncome(500).subscribe({
      next: (x) => {
        this.psetFcIddata = x.data;
        this.totalsum2 = this.psetFcIddata.reduce((sum, record) => sum + (record.amount != undefined ?
          record.amount : 0) * (record.studentCount != undefined ?
            record.studentCount : 0), 0);
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._profileService.getMozeDD(500).subscribe({
      next: x => {

        this.deptVenueNameDD = x;
      },
      error: err => {

        swal('Error!', err.error.message, 'error');
      }
    });

    this._profileService.getModuleStatus(5).subscribe({
      next: (x) => {

        this.onOffModule = x;


      },
      error: (err) => {

      },
    });
  }

  getUpperCaseofFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  onchange_justification() {
    if (!(this.bdgtAraz.justification == undefined || this.bdgtAraz.justification == null || this.bdgtAraz.justification == '')) {
      this.bdgtAraz.justification = this.getUpperCaseofFirstLetter(this.bdgtAraz.justification);
    }
  }

  arazBudget() {

    if (this.bdgtAraz.deptVenueId == undefined || this.bdgtAraz.deptVenueId == null) {
      alert('Kindly select Dept. Venue');
      return;
    }
    if (this.bdgtAraz.baseItemId == undefined || this.bdgtAraz.baseItemId == null) {
      alert('Kindly select Base Item');
      return;
    }
    if (this.bdgtAraz.itemId == undefined || this.bdgtAraz.itemId == null) {
      alert('Kindly select Item');
      return;
    }
    if (this.bdgtAraz.quantity == undefined || this.bdgtAraz.quantity == null) {
      alert('Kindly enter Quantity');
      return;
    }
    if (this.bdgtAraz.amountPerUom == undefined || this.bdgtAraz.amountPerUom == null) {
      alert('Kindly enter Amount Per Pc/Kg');
      return;
    }
    if (this.bdgtAraz.justification == undefined || this.bdgtAraz.justification == null || this.bdgtAraz.justification == '') {
      alert('Kindly enter Justification');
      return;
    }


    this._loader.callLoaderMethod('show');
    //console.log(JSON.stringify(this.bdgtAraz));
    this._vendorService.arazBudget(this.bdgtAraz).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();
        this.toastr.success('Saved successfully', '');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  submitStudentCount() {


    this._loader.callLoaderMethod('show');
    //console.log(JSON.stringify(this.bdgtAraz));
    this._vendorService.submitStudentCount(this.psetFcIddata).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();
        this.toastr.success('Saved successfully', '');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  onchange_baseItemId() {
    this.bdgtAraz.itemId = undefined;
    this._vendorService.getItemForBaseItemId(this.bdgtAraz.baseItemId).subscribe({
      next: (x) => {
        this.itemNameDD = x;
      },
      error: (err) => {

      },
    });
  }

  onchange_deptVenueId() {
    this.bdgtAraz.baseItemId = undefined;
    this._vendorService.getBaseItemForDeptVenueId(this.bdgtAraz.deptVenueId).subscribe({
      next: (x) => {
        this.baseItemNameDD = x;
      },
      error: (err) => {

      },
    });
  }

  onchange_studentCount() {
    this.totalsum2 = this.psetFcIddata.reduce((sum, record) => sum + (record.amount != undefined ?
      record.amount : 0) * (record.studentCount != undefined ?
        record.studentCount : 0), 0);
  }

  onchange_searchObject() {

    const filterPipe = new MultiSearchExpensePipe();
    this.bdgtArazFilteredList = filterPipe.transform(this.bdgtArazList, this.searchObject, this.filterMetadata);
    this.setDropDown()
    console.log("Change working " + JSON.stringify(this.filteritemNameDD));
    this.totalsum = this.bdgtArazFilteredList.reduce((sum, record) => sum + (record.amountPerUom != undefined ?
      record.amountPerUom : 0) * (record.quantity != undefined ?
        record.quantity : 0), 0);
  }

  setDropDown() {
    //Item Name
    let itemName = [...new Set(this.bdgtArazFilteredList.map(item => item.itemName))];
    this.filteritemNameDD = new Array<any>();
    itemName.forEach((value) => this.filteritemNameDD.push({ name: value }));


    //BaseItem Name
    let baseItemName = [...new Set(this.bdgtArazFilteredList.map(item => item.baseItemName))];
    this.filterbaseItemNameDD = new Array<any>();
    baseItemName.forEach((value) => this.filterbaseItemNameDD.push({ name: value }));

    //deptVenue Name
    let deptVenueName = [...new Set(this.bdgtArazFilteredList.map(item => item.deptVenueName))];
    this.filterdeptVenueNameDD = new Array<any>();
    deptVenueName.forEach((value) => this.filterdeptVenueNameDD.push({ name: value }));



  }

  deleteBudgetAraz(id: number) {
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._vendorService.deleteBudgetAraz(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.error('Entry Deleted', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

}
