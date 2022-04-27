import { Component, OnInit } from '@angular/core';
import { EnayatHistorySerach } from 'src/app/AAAA_Models/EnayatHistory_Serach-Model';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { ScholarshipService } from 'src/app/Modules_Admin/Services/scholarship.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
declare var swal: any;

@Component({
  selector: 'app-scholarship-history',
  templateUrl: './scholarship-history.component.html',
  styleUrls: ['./scholarship-history.component.scss'],
})
export class ScholarshipHistoryComponent implements OnInit {
  category = [
    { id: 1, name: 'All' },
    { id: 2, name: 'India' },
    { id: 3, name: 'International' },
  ];
  type = [
    { id: 1, name: 'Medical' },
    { id: 2, name: 'Scholarship' },
  ];

  public serach = new EnayatHistorySerach();

  public periods_m = Array<any>();
  public colums = Array<WorkshreetColums>();
  public periods_s = Array<any>();
  public pending: any;
  public data = Array<any>();
  public data2 = Array<any>();
  public searchText: any;

  constructor(
    private _medicalService: MedicalService,
    private _scholarService: ScholarshipService,
    private _loader: LoaderService
  ) {}

  ngOnInit(): void {
    this._loader.callLoaderMethod('show');
    this._medicalService.getPeriods().subscribe({
      next: (x) => {
        //this._loader.callLoaderMethod('hide');
        this.periods_m = x.medical;
        this.periods_s = x.scholar;

        this._scholarService.getHistory().subscribe({
          next: (x) => {
            this._loader.callLoaderMethod('hide');
            this.data = x;
            this.pending = this.data.length;
          },
          error: (err) => {
            this._loader.callLoaderMethod('hide');
            swal('Error!', err.error.message, 'error');
          },
        });
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  openBulk(id: any) {
    this._loader.callLoaderMethod('show');
    this._scholarService.getBulkBills(id).subscribe({
      next: (x) => {
        //console.log(JSON.stringify(x));
        this._loader.callLoaderMethod('hide');
        window.open(
          'https://mahadalzahra.org/uploads/ScholarshipAttachments/bulkbillpdf.pdf'
        );
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }

  printBillSummary(itsid: string) {
    let report = new ReportFilter();

    report.id = 23;

    report.itsId = itsid;
    this._loader.callLoaderMethod('show');
    this._medicalService.printReport(report).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        window.open(x);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  printBills(itsid: string, currency: string) {
    let report = new ReportFilter();

    if (currency === 'INR') {
      report.id = 21;
    } else {
      report.id = 22;
    }

    report.itsId = itsid;
    this._loader.callLoaderMethod('show');
    this._medicalService.printReport(report).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        window.open(x);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  exportExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ScholarshipHistory');

    for (const element of Object.keys(this.data[0])) {
      if (element != 'photo') {
        this.colums.push({ header: element, key: element,style: {  } });
      }
    }
    worksheet.columns = this.colums;

    this.data.forEach((e) => {
      worksheet.addRow(e, 'n');
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'ScholarshipHistory.xlsx');
    });
  }
}
