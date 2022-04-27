import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MultiSearchExpensePipe } from 'src/app/AAAA_FilterPipe/multi-search-expense.pipe';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
import { environment } from 'src/environments/environment';
declare var swal: any;

@Component({
  selector: 'app-approve-reject-bill',
  templateUrl: './approve-reject-bill.component.html',
  styleUrls: ['./approve-reject-bill.component.scss']
})
export class ApproveRejectBillComponent implements OnInit {

  page: any;
  public bills = new Array<BillManagement>();
  public viewBillItems = new Array<BillManagement>();
  public searchObject = new BillManagement();
  public filterMetadata = { count: 0, data: new Array<any>() };
  public filteredBills = new Array<BillManagement>();

  public filterdeptVenueNameDD = new Array<any>();
  public filterbaseItemNameDD = new Array<any>();
  public filterVendorNameDD = new Array<any>();


  totalsum2: any;
  vendorName: any;
  billId: any;
  totalsum3: any;
  reason: any;

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
        this.page = x.includes(91);


        this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._vendorService.getPendingBillDetails().subscribe({
      next: (x) => {
        this.bills = x;
        this.filteredBills = this.bills;
        this.setDropDown();
        this.totalsum2 = this.bills.reduce((sum, record) => sum + (record.totalAmount != undefined ?
          record.totalAmount : 0), 0);
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  getItemsForBill(bill: BillManagement) {
    this.vendorName = bill.vendorName;
    this.billId = bill.id;
    this._vendorService.getItemForBill(bill.id).subscribe({
      next: (x) => {
        this.viewBillItems = x;
        this.totalsum3 = this.viewBillItems.reduce((sum, record) => sum + (record.quantity != undefined ?
          record.quantity : 0) * (record.amountPerUom != undefined ?
            record.amountPerUom : 0) + (record.itemGstAmount != undefined ?
              record.itemGstAmount : 0), 0);
      },
      error: (err) => {
        //this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  onchange_searchObject() {

    const filterPipe = new MultiSearchExpensePipe();
    this.filteredBills = filterPipe.transform(this.bills, this.searchObject, this.filterMetadata);
    this.setDropDown()
    //console.log("Change working " + JSON.stringify(this.filterVendorNameDD));
    this.totalsum2 = this.filteredBills.reduce((sum, record) => sum + (record.totalAmount != undefined ?
      record.totalAmount : 0), 0);
  }

  setDropDown() {
    //Item Name
    let vendorName = [...new Set(this.filteredBills.map(item => item.vendorName))];
    this.filterVendorNameDD = new Array<any>();
    vendorName.forEach((value) => this.filterVendorNameDD.push({ name: value }));


    //BaseItem Name
    let baseItemName = [...new Set(this.filteredBills.map(item => item.baseItemName))];
    this.filterbaseItemNameDD = new Array<any>();
    baseItemName.forEach((value) => this.filterbaseItemNameDD.push({ name: value }));

    //deptVenue Name
    let deptVenueName = [...new Set(this.filteredBills.map(item => item.deptVenueName))];
    this.filterdeptVenueNameDD = new Array<any>();
    deptVenueName.forEach((value) => this.filterdeptVenueNameDD.push({ name: value }));
  }

  changestatus(status: string, id: number) {
    if (status == 'Rejected') {
      if (this.reason == '' || this.reason == undefined || this.reason == null) {
        alert('Please enter reason for rejection');
        return;
      }
    }

    this._loader.callLoaderMethod('show');
    this._vendorService.ApproveRejectBillStatus(id, status, this.reason).subscribe({
      next: (x) => {
        this.toastr.success('Bill Status Updated Successfully', 'Success');
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  viewPdf(id: any) {
    localStorage.setItem('billId', id);
    //window.open(environment.baseUrl + "/lite/student/imtehaan-result", "_blank");
    window.open("http://localhost:4200" + "/expense/view-bill-pdf", "_blank");
  }

}
