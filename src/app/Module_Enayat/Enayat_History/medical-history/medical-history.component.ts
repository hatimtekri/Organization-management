import { Component, OnInit } from '@angular/core';
import { EnayatHistorySerach } from 'src/app/AAAA_Models/EnayatHistory_Serach-Model';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
declare var swal: any;

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
})
export class MedicalHistoryComponent implements OnInit {
  category = [
    { id: 2, name: 'India' },
    { id: 3, name: 'International' },
  ];
  type = [
    { id: 1, name: 'Medical' },
    { id: 2, name: 'Scholarship' },
  ];

  public serach = new EnayatHistorySerach();
  public pending: any;
  public periods_m = Array<any>();

  public periods_s = Array<any>();
  public colums = Array<WorkshreetColums>();
  public data = Array<any>();
  public data2 = Array<any>();
  public searchText: any;

  constructor(
    private _medicalService: MedicalService,
    private _loader: LoaderService
  ) { }

  ngOnInit(): void {
    

    this._loader.callLoaderMethod('show');
    this._medicalService.getPeriods().subscribe({
      next: (x) => {
        //this._loader.callLoaderMethod('hide');
        this.periods_m = x.medical;
        this.periods_s = x.scholar;

        this._medicalService.getHistory().subscribe({
          next: (x) => {
            this._loader.callLoaderMethod('hide');
            this.data = x;
            console.log(JSON.stringify(this.data));
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

  // setPeriod()
  // {
  //   this.serach.periodId=undefined;
  // }

  search1() {
    if (this.serach.periodId?.length != 0) {
      let data3 = Array<any>();

      this.serach.periodId?.map((x) =>
        this.data.filter((y) => y.billPeriodId == x).map((z) => data3.push(z))
      );
      this.data2 = data3;
    } else {
      this.data2 = this.data;
    }

    console.log('data -' + this.data2);
  }
  search2() {
    this.data2 = Array<any>();
    console.log('step 1 -' + this.serach.category);
    if (this.serach.category != undefined) {
      console.log('step 2');

      this.data2 = this.data.filter((x) => x.category === this.serach.category);
    } else {
      this.data2 = this.data;
    }
  }

  openBulk(id: any) {
    this._loader.callLoaderMethod('show');
    this._medicalService.getBulkBills(id).subscribe({
      next: (x) => {
        //console.log(JSON.stringify(x));
        this._loader.callLoaderMethod('hide');
        window.open(
          'https://mahadalzahra.org/uploads/medicalBills/bulkbillpdf.pdf'
        );
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }

  printBillSummary(itsid: string) {
    let report = new ReportFilter();

    report.id = 20;

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
      report.id = 18;
    } else {
      report.id = 19;
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
    let worksheet = workbook.addWorksheet('MedicalHistory');

    for (const element of Object.keys(this.data[0])) {
      if (element == 'photo') {
        this.colums.push({ header: "photonew", key: "photonew", style: {} });
      }
      else {
        if (element != 'photo2') {
          this.colums.push({ header: element, key: element, style: {} });
        }
      }

    }
    worksheet.columns = this.colums;

    let c = 1;
    this.data.forEach((e) => {

      if (e.photo2 != null) {
        const imageId2 = workbook.addImage({
          base64: e.photo2,
          extension: 'jpeg',
        });

        worksheet.addImage(imageId2, {
          tl: { col: 1, row: c },
          ext: { width: 50, height: 50 }
        });
      }



      worksheet.addRow(e, 'n');
      worksheet.getRow(c + 1).height = 38;
      worksheet.getCell("B" + c + 1).alignment = { vertical: 'middle', horizontal: 'center' };
      // worksheet.getCell('U'+c).alignment = { wrapText: true };
      c = c + 1;
    });

    // worksheet.getCell(Object.keys(this.data[0]).length+1).alignment = { wrapText: true };

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'MedicalHistory.xlsx');
    });
  }
}
