import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ReceiptStatementService } from 'src/app/Services/Income/receipt-statement.service';
import * as fs from 'file-saver';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-sundry-receipts',
  templateUrl: './sundry-receipts.component.html',
  styleUrls: ['./sundry-receipts.component.scss']
})
export class SundryReceiptsComponent implements OnInit {

  recieptPrint = new Reciept();

  public reciepts = new Array<Reciept>();
  public filteredReciepts = new Array<Reciept>();
  public colums = Array<WorkshreetColums>();
  searchObject = new Reciept();
  loader: any;
  page: any;
  totalsum2: any;
  public FieldNames = new Array<any>();
  //public filterMetadata = { count: 0, data: new Array<any>() };

  constructor(
    private _incomeService: ReceiptStatementService,
    private _profileService: FacultyProfileService,
    private _spinner: NgxSpinnerService,
    private _loader: LoaderService,
    private toastr: ToastrService,
    private _authService: AuthService) { }

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(94);

        if (this.page == true) {
          this._loader.callLoaderMethod('hide');
        }
        else {
          this._loader.callLoaderMethod('hide');

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }

  print_original(i: Reciept) {
    this.recieptPrint = i;
  }

  search() {

    if (this.searchObject.fromDate1 != undefined) {

      if (this.searchObject.toDate1 == null || this.searchObject.toDate1 == undefined) {
        alert('Kindly enter to Date');
        return;
      }


      this.searchObject.fromDate = new Date(this.searchObject.fromDate1 ?? '');
      this.searchObject.toDate = new Date(this.searchObject.toDate1 ?? '');

      this.searchObject.fromDate.setDate(this.searchObject.fromDate.getDate() + 1);
      this.searchObject.toDate.setDate(this.searchObject.toDate.getDate() + 1);


    }
    else {
      this.searchObject.fromDate = undefined;
      this.searchObject.toDate = undefined;

      if (this.searchObject.itsCsv == null || this.searchObject.itsCsv == undefined || this.searchObject.itsCsv == "") {
        alert('Kindly enter its Csv');
        return;
      }
    }

    // this._loader.callLoaderMethod('show');
    this.loader = true;
    this._incomeService.getSearchSundryRecipt(this.searchObject).subscribe({
      next: (x) => {
        // this._loader.callLoaderMethod('hide');
        this.loader = false;
        this.reciepts = x.model;
        console.log(JSON.stringify(this.reciepts));
        this.filteredReciepts = this.reciepts;
        console.log(JSON.stringify(this.filteredReciepts));
        this.FieldNames = x.exportCategory;
        this.totalsum2 = this.filteredReciepts.reduce((sum, record) => sum + (parseInt(record.feePaidAmount!) != undefined ?
          parseInt(record.feePaidAmount!) : 0), 0);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  clear() {
    this.searchObject.fromDate1 = undefined;
    this.searchObject.toDate1 = undefined;
    this.searchObject.itsCsv = undefined;
  }

  ExportRecieptStatement() {
    const count = this.reciepts.length;

    if (count == 0) {
      alert('Kindly Load Data');
      return;
    }

    this._loader.callLoaderMethod('show');

    this._incomeService.GetSundryReceiptStatementDataToExport(this.reciepts).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.exportExcel(x.export, 15);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log('Error');
      },
    });
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

    let worksheet = workbook.addWorksheet("Sundry Receipts Statements");


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
