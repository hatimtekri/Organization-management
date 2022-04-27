import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SearchExpensePipe } from 'src/app/AAAA_FilterPipe/search-expense.pipe';
import { BudgetAraz } from 'src/app/AAAA_Models/BudgetAraz-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-budget-sanction',
  templateUrl: './budget-sanction.component.html',
  styleUrls: ['./budget-sanction.component.scss']
})
export class BudgetSanctionComponent implements OnInit {

  //edit: boolean = false;
  public deptVenueDD = new Array<any>();
  public baseitemDD = new Array<any>();
  public budgetSanctionList = new Array<any>();
  public filteredbudgetSanctionList = new Array<any>();

  //itemName: any;
  deptVenueId: any;
  baseItemId: any;
  public searchText: any;
  page: any;
  edit: any;
  sanctionAmount: any;
  add: any;

  totalamount1: any;
  totalamount2: any;
  totalamount3: any;
  iterableDiffer: any;

  constructor(
    private _vendorService: VendorDetailsService,
    private _loader: LoaderService,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _profileService: FacultyProfileService,
  ) {}

  ngOnInit(): void {
    //this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(58);


        //this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    //this._loader.callLoaderMethod('show');
    this._authService.getAdminSubRights(58).subscribe({
      next: (x) => {
        this.edit = x.includes(57);
        this.add = x.includes(58);


        // this._loader.callLoaderMethod('hide');

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
    this._vendorService.getBudgetSanction().subscribe({
      next: (x) => {
        this.budgetSanctionList = x;
        this.filteredbudgetSanctionList = this.budgetSanctionList;

        //sum of totalAmount in budgetSanctionList in totalamount1
        this.totalamount1 = this.filteredbudgetSanctionList.map(t => t.totalAmount).reduce((acc, value) => acc + value, 0);

        //sum of totalExpense in filteredbudgetSanctionList in totalamount2
        this.totalamount2 = this.filteredbudgetSanctionList.map(t => t.totalExpense).reduce((acc, value) => acc + value, 0);

        //sum of totalAmount-totalExpense in filteredbudgetSanctionList in totalamount3
        this.totalamount3 = this.filteredbudgetSanctionList.map(t => t.totalAmount - t.totalExpense).reduce((acc, value) => acc + value, 0);

        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._profileService.getMozeDD(500).subscribe({
      next: x => {

        this.deptVenueDD = x;
      },
      error: err => {

        swal('Error!', err.error.message, 'error');
      }
    });
  }

  sanctionBudget() {
    let data = new BudgetAraz();
    data.baseItemId = this.baseItemId;
    data.deptVenueId = this.deptVenueId;
    data.totalAmount = this.sanctionAmount;
    data.financialYear = 2022;

    this._vendorService.sanctionBudget(data).subscribe({
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

  Edit_Budget(data: any) {
    this._vendorService.sanctionBudget(data).subscribe({
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

  onchange_deptVenueId() {
    this.baseitemDD = new Array<any>();
    if (this.deptVenueId == undefined || this.deptVenueId == null) {
      this.baseItemId = undefined;
      this.baseitemDD = new Array<any>();
    }
    else {
      this._vendorService.getBaseItemForDeptVenueId(this.deptVenueId).subscribe({
        next: (x) => {
          this.baseitemDD = x;
        },
        error: (err) => {

        },
      });
    }
  }


}
