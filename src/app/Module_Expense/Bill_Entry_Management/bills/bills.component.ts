import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MultiSearchExpensePipe } from 'src/app/AAAA_FilterPipe/multi-search-expense.pipe';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
import { environment } from 'src/environments/environment';
declare var swal: any;
import * as fs from 'file-saver';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { Workbook } from 'exceljs';
@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  page: any;
  public bills = new Array<BillManagement>();
  public viewBillItems = new Array<BillManagement>();
  public searchObject = new BillManagement();
  public filterMetadata = { count: 0, data: new Array<any>() };
  public filteredBills = new Array<BillManagement>();

  public filterdeptVenueNameDD = new Array<any>();
  public filterbaseItemNameDD = new Array<any>();
  public filterpaymentModeDD = new Array<any>();

  public filterVendorNameDD = new Array<any>();
  public billLogs = new Array<any>();
  public colums = Array<WorkshreetColums>();

  totalsum2: any;
  vendorName: any;
  billId: any;
  totalsum3: any;

  constructor(
    private _vendorService: VendorDetailsService,
    private _loader: LoaderService,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _profileService: FacultyProfileService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(86);


        this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._vendorService.getBillDetails().subscribe({
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

      },
    });
  }

  getLogsForBill(bill: BillManagement) {
    this.vendorName = bill.vendorName;
    this.billId = bill.id;
    this._vendorService.getBillLogs(bill.id).subscribe({
      next: (x) => {
        this.billLogs = x;
      },
      error: (err) => {

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

//payment mode
let paymentMode = [...new Set(this.filteredBills.map(item => item.paymentMode_User))];
this.filterpaymentModeDD = new Array<any>();
paymentMode.forEach((value) => this.filterpaymentModeDD.push({ name: value }));




  }

  printDetails(id:any)
  {
    localStorage.setItem("billId",id);
    //this._router.navigate(['/expense/view-bill-pdf']);
    
    window.open(environment.baseUrl+"/new_admin/expense/view-bill-pdf")

  }

  exportExcel(data: Array<any>) {
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();
    let FileName = 'test';

   

    let worksheet = workbook.addWorksheet(FileName);


    for (const element of Object.keys(data[0])) {
      this.colums.push({ header: element, key: element, style: {} });

    }
    worksheet.columns = this.colums;
    let c = 1;
    data.forEach((e) => {

      if (e.photo2 != null) {
        const imageId2 = workbook.addImage({
          base64: e.photo2,
          extension: 'jpeg',
        });

        worksheet.addImage(imageId2, {
          tl: { col: 1, row: c },
          ext: { width: 50, height: 50 },
        });
      }

      worksheet.addRow(e, 'n');
      if (e.photo2 != null) {
        worksheet.getRow(c + 1).height = 38;
      }
      else {
        worksheet.getRow(c + 1).height = 15;
      }

      worksheet.getRow(c + 1).alignment = { vertical: 'middle', horizontal: 'left' };
      let cc = 1;
      for (const element of this.colums) {
        worksheet.getRow(1).getCell(cc).border = {
          top: { style: 'thin', color: { argb: '#000000' } },
          left: { style: 'thin', color: { argb: '#000000' } },
          bottom: { style: 'thin', color: { argb: '#000000' } },
          right: { style: 'thin', color: { argb: '#000000' } },
        };

        worksheet.getRow(c + 1).getCell(cc).border = {
          top: { style: 'thin', color: { argb: '#000000' } },
          left: { style: 'thin', color: { argb: '#000000' } },
          bottom: { style: 'thin', color: { argb: '#000000' } },
          right: { style: 'thin', color: { argb: '#000000' } },
        };
        cc = cc + 1;
      }

      worksheet.getRow(1).height = 20;
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      // worksheet.getCell('B'+(c+1)).alignment = { vertical: 'middle', horizontal: 'center' };
      c = c + 1;
    });

    // worksheet.getCell(Object.keys(this.data[0]).length+1).alignment = { wrapText: true };

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, "Fund Request" + '.xlsx');
    });

    
  }

}
