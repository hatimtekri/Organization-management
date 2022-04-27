import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
import * as fs from 'file-saver';
declare var swal: any;

@Component({
  selector: 'app-tobepaid-bills',
  templateUrl: './tobepaid-bills.component.html',
  styleUrls: ['./tobepaid-bills.component.scss']
})
export class TobepaidBillsComponent implements OnInit {

  //selectedBankBills : any;
  totalsum1: any;
  public packages = new Array<any>();
  page: any;
  public colums = Array<WorkshreetColums>();
  //paybills = new Array<BillManagement>();


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
        this.page = x.includes(96);


        this._loader.callLoaderMethod('hide');


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._vendorService.getToBePaidBillDetails().subscribe({
      next: (x) => {
        this.packages = x;

        //sort package by id
        this.packages.sort(function (a, b) {
          return a.id - b.id;
        });

        //sort bills in each package by bill id then by vendorId
        for (var i = 0; i < this.packages.length; i++) {
          this.packages[i].bills?.sort(function (a: any, b: any) {
            return (a.vendorId ?? 0) - (b.vendorId ?? 0);
          });
        }

        //get first or default paymentFrom_BankName of each package
        for (var i = 0; i < this.packages.length; i++) {
          this.packages[i].paymentFrom_BankName = this.packages[i].bills?.[0].paymentFrom_BankName ?? 'NOT FOUND';
        }

        //get first or default paymentMode_Admin of each package
        for (var i = 0; i < this.packages.length; i++) {
          this.packages[i].paymentMode_Admin = this.packages[i].bills?.[0].paymentMode_Admin ?? 'NOT FOUND';
        }


        //calculate sum of bill amount in each package
        for (var i = 0; i < this.packages.length; i++) {
          this.packages[i].sum = 0;
          for (var j = 0; j < this.packages[i].bills?.length; j++) {
            this.packages[i].sum = this.packages[i].sum + this.packages[i].bills[j].totalAmount;
          }
        }

        //payable amount in each bill of every package is totalAmount - tdsAmount
        for (var i = 0; i < this.packages.length; i++) {
          for (var j = 0; j < this.packages[i].bills?.length; j++) {
            this.packages[i].bills[j].payableAmount = this.packages[i].bills[j].totalAmount - this.packages[i].bills[j].tdsAmount;
          }
        }

        //calculate sum of payableAmount in each package
        for (var i = 0; i < this.packages.length; i++) {
          this.packages[i].sumPayableAmount = 0;
          for (var j = 0; j < this.packages[i].bills?.length; j++) {
            this.packages[i].sumPayableAmount = this.packages[i].sumPayableAmount + this.packages[i].bills[j].payableAmount;
          }
        }



        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  payBills(data: Array<any>) {

    for (var y in data) {

      if (data[y].txnId == null || data[y].txnId == undefined || data[y].txnId == '') {
        alert('Please Enter Transaction Id');
        return;
      }
    }

    //check same vendor have the same txn id
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (i != j) {
          if (data[i].vendorId == data[j].vendorId) {
            if (data[i].txnId != data[j].txnId) {
              alert('Same Vendor must have same TXN Id');
              return;
            }
          }
        }
      }
    }



    this._loader.callLoaderMethod('show');
    this._vendorService.payBills(data).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        window.location.reload();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  reverseBills(data: Array<any>) {

    var go = confirm('Are you sure you want to break package id: ' + data[0].packageId + '?');
    if (!go) return;

    this._loader.callLoaderMethod('show');
    this._vendorService.backToApprovedBills(data).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        window.location.reload();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  ExportNEFT(data: Array<any>) {

    if (data[0].paymentFrom_BankName == 'Bank of Baroda') {

      if (data[0].paymentFrom_BankName != data[0].paymentTo_BankName) {
        this._loader.callLoaderMethod('show');

        this._vendorService.GetNEFTBobToOtherDataToExport(data).subscribe({
          next: (x) => {
            this._loader.callLoaderMethod('hide');

            this.exportExcel(x.export, 29);
          },
          error: (err) => {
            this._loader.callLoaderMethod('hide');
            console.log('Error');
          },
        });
      }

      else {
        this._loader.callLoaderMethod('show');

        this._vendorService.GetNEFTBobToBobDataToExport(data).subscribe({
          next: (x) => {
            this._loader.callLoaderMethod('hide');

            this.exportExcel(x.export, 30);
          },
          error: (err) => {
            this._loader.callLoaderMethod('hide');
            console.log('Error');
          },
        });
      }

    }

    if (data[0].paymentFrom_BankName == 'Kotak Mahindra Bank') {

      if (data[0].paymentFrom_BankName != data[0].paymentTo_BankName) {
        // this._loader.callLoaderMethod('show');

        // this._vendorService.GetNEFTBobToOtherDataToExport(data).subscribe({
        //   next: (x) => {
        //     this._loader.callLoaderMethod('hide');

        //     this.exportExcel(x.export, 15);
        //   },
        //   error: (err) => {
        //     this._loader.callLoaderMethod('hide');
        //     console.log('Error');
        //   },
        // });
      }

      else {

      }

    }

  }




  exportExcel(data: Array<any>, id: any) {
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();
    let FileName = 'test';

    this._profileService.getExportFileNameData(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        FileName = x;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    let worksheet = workbook.addWorksheet(FileName);


    this._profileService.getExportHeadersData(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');


        for (const element of Object.keys(data[0])) {
          if (element == 'photo2') {
            this.colums.push({ header: 'Photo', key: 'photonew', style: {} });
          } else {
            if (element != 'photo') {
              const f = x.find((y) => y.actualName == element);

              let f2 = element;

              if (f != undefined) {
                f2 = f.displayName;
              }

              this.colums.push({ header: f2, key: element, style: {} });
            }
          }
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
          fs.saveAs(blob, FileName + '.xlsx');
        });



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });



  }

}
