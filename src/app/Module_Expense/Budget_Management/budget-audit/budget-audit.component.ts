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
  selector: 'app-budget-audit',
  templateUrl: './budget-audit.component.html',
  styleUrls: ['./budget-audit.component.scss']
})
export class BudgetAuditComponent implements OnInit {

  bdgtArazList = new Array<BudgetAraz>();
  public bdgtAraz = new BudgetAraz();
  public searchObject = new BudgetAraz();
  public deptVenueNameDD = new Array<DropDownData>();
  public baseItemNameDD = new Array<DropDownData>();
  public itemNameDD = new Array<DropDownData>();
  public filterdeptVenueNameDD = new Array<any>();
  public filterbaseItemNameDD = new Array<any>();
  public filteritemNameDD = new Array<any>();
  public filterWorkStatusDD = new Array<any>();
  public psetFcIddata = new Array<FeeCategoryModel>();
  public filterMetadata = { count: 0, data: new Array<any>() };
  page: any;
  totalsum: any;
  totalsumAdmin: any;
  listselectAll: any;
  bdgtArazFilteredList = new Array<BudgetAraz>();
  bdgtArazFilteredList2 = new Array<BudgetAraz>();

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
        this.page = x.includes(56);

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
        this.searchObject.search_workStatusNameDD=['Not Done']

       // this.setDropDown()
        this.onchange_searchObject();

        this.totalsum = this.bdgtArazFilteredList.reduce((sum, record) => sum + (record.amountPerUom != undefined ?
          record.amountPerUom : 0) * (record.quantity != undefined ?
            record.quantity : 0), 0);
        this.totalsumAdmin = this.bdgtArazFilteredList.reduce((sum, record) => sum + (record.amountPerUom_admin != undefined ?
          record.amountPerUom_admin : 0) * (record.quantity_admin != undefined ?
            record.quantity_admin : 0), 0);
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    // this._loader.callLoaderMethod('show');
    // this._vendorService.getDataForEstimateIncome(500).subscribe({
    //   next: (x) => {
    //     this.psetFcIddata = x.data;
    //     this.totalsum2 = this.psetFcIddata.reduce((sum, record) => sum + (record.amount != undefined ?
    //       record.amount : 0) * (record.studentCount != undefined ?
    //         record.studentCount : 0), 0);
    //     this._loader.callLoaderMethod('hide');
    //   },
    //   error: (err) => {

    //     this._loader.callLoaderMethod('hide');
    //     swal('Error!', err.error.message, 'error');
    //   },
    // });

    this._profileService.getMozeDD(500).subscribe({
      next: x => {

        this.deptVenueNameDD = x;
      },
      error: err => {

        swal('Error!', err.error.message, 'error');
      }
    });
  }

  ListSelectAll() {
    if (this.listselectAll == true) {
      for (var y in this.bdgtArazFilteredList) {
        this.bdgtArazFilteredList[y].select = false;
      }
    } else {
      for (var y in this.bdgtArazFilteredList) {
        this.bdgtArazFilteredList[y].select = true;
      }
    }
  }

  submit() {
    const count = this.bdgtArazFilteredList.filter(x => x.select == true).length;


    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }
    this._loader.callLoaderMethod('show');
    //this.bdgtArazFilteredList2 = this.bdgtArazFilteredList.filter(x => x.select == true);

    this._vendorService.submitBudgetAudit(this.bdgtArazFilteredList).subscribe({
      next: (x) => {

        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 53!', err.error.message, 'error');
      },
    });
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

    //work status dd
    let workstatus = [...new Set(this.bdgtArazFilteredList.map(item => item.adminWorkStatusString))];
    this.filterWorkStatusDD = new Array<any>();
    workstatus.forEach((value) => this.filterWorkStatusDD.push({ name: value }));

  }

  onchange_searchObject() {

    console.log(this.searchObject.adminWorkStatusString);
    let searchObject={
      baseItemName:this.searchObject.search_baseItemNameDD,
      adminWorkStatusString:this.searchObject.search_workStatusNameDD,
      deptVenueName:this.searchObject.search_deptVenueNameDD,
      itemName:this.searchObject.search_itemNameDD,
    };
    
    
    const filterPipe = new MultiSearchExpensePipe();
    this.bdgtArazFilteredList = filterPipe.transform(this.bdgtArazList, searchObject, this.filterMetadata);
    this.setDropDown()
    //console.log("Change working " + JSON.stringify(this.filteritemNameDD));
    this.totalsum = this.bdgtArazFilteredList.reduce((sum, record) => sum + (record.amountPerUom != undefined ?
      record.amountPerUom : 0) * (record.quantity != undefined ?
        record.quantity : 0), 0);
    this.totalsumAdmin = this.bdgtArazFilteredList.reduce((sum, record) => sum + (record.amountPerUom_admin != undefined ?
      record.amountPerUom_admin : 0) * (record.quantity_admin != undefined ?
        record.quantity_admin : 0), 0);
    
  }

}
