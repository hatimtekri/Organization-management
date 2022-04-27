import { Component, OnInit } from '@angular/core';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Medical } from 'src/app/AAAA_Models/Medical-Model';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { AuthService } from 'src/app/Services/auth.service';

declare var swal: any;

@Component({
  selector: 'app-medical-finalsanction',
  templateUrl: './medical-finalsanction.component.html',
  styleUrls: ['./medical-finalsanction.component.scss'],
})
export class MedicalFinalsanctionComponent implements OnInit {
  constructor(
    private _medicalService: MedicalService,
    private _loader: LoaderService,
    private _authService: AuthService,
    private _profileService: FacultyProfileService,
  ) { }
  public MedicalEntriesStatusList = Array<Medical>();
  public MedicalAfterFinalSanction = Array<Medical>();
  public sanctioned: any;
  public data = Array<any>();
  searchText: any;
  searchText2: any;
  totalsum: any;
  totalsum2: any;
  printItsId: any;
  public pending: any;
  public colums = Array<WorkshreetColums>();
  selectAll: any;
  page = false;

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(63);
        this._loader.callLoaderMethod('hide');
        if (this.page == true) {
          this._loader.callLoaderMethod('show');
          this._medicalService.getDataForFinalsancantion().subscribe({
            next: (x) => {
              //console.log(JSON.stringify(x));
              this.MedicalEntriesStatusList = x.model;
              this.pending = this.MedicalEntriesStatusList.filter(
                (x) => x.display == true
              ).length;
              this.totalsum = this.MedicalEntriesStatusList.filter(
                (x) => x.display == true
              ).reduce((sum, record) => sum + (record.sum ?? 0), 0);

              this._medicalService.getDataAfterFinalsancantion().subscribe({
                next: (x) => {
                  this._loader.callLoaderMethod('hide');
                  //console.log(JSON.stringify(x));
                  this.MedicalAfterFinalSanction = x.model;
                  this.sanctioned = this.MedicalAfterFinalSanction.filter(
                    (x) => x.display == true
                  ).length;

                  this.totalsum2 = this.MedicalAfterFinalSanction.filter(
                    (x) => x.display == true
                  ).reduce((sum, record) => sum + (record.sum ?? 0), 0);
                },
                error: (err) => {
                  this._loader.callLoaderMethod('hide');
                },
              });
            },
            error: (err) => {
              this._loader.callLoaderMethod('hide');
            },
          });

        }
      },
      error: (err) => { },
    });



  }

  select() {
    if (this.selectAll == true) {
      for (var y in this.MedicalEntriesStatusList) {
        this.MedicalEntriesStatusList[y].selected = true;
      }
    } else {
      for (var y in this.MedicalEntriesStatusList) {
        this.MedicalEntriesStatusList[y].selected = false;
      }
    }
  }
  printSummaryIndian() {
    let report = new ReportFilter();

    report.id = 3;

    this.setPrintBulkITS();
    //console.log(this.printItsId);
    report.itsId = this.printItsId;
    if (this.printItsId != undefined) {

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
  }

  setPrintBulkITS() {
    const count = this.MedicalEntriesStatusList.filter((x) => x.selected == true).length;

    if (count == 0) {
      this.printItsId = undefined;
      alert('Kindly select KGs');
      return;
    }
    this.printItsId = undefined;
    let list = this.MedicalEntriesStatusList.filter((x) => x.selected == true);
    this._loader.callLoaderMethod('show');
    for (let i = 0; i < list.length; i++) {
      list[i].aplicantItsId;

      if (this.printItsId == undefined) {
        this.printItsId = list[i].aplicantItsId;
      }
      else {
        this.printItsId = this.printItsId + ',' + list[i].aplicantItsId;
      }

    }
    this._loader.callLoaderMethod('hide');


  }
  printNEFT() {
    let report = new ReportFilter();

    report.id = 14;

    this.setPrintBulkITS();
    //console.log(this.printItsId);
    report.itsId = this.printItsId;
    if (this.printItsId != undefined) {

      this._loader.callLoaderMethod('show');
      this._medicalService.exportReport(report).subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          //window.open(x);

          this.data = JSON.parse(x.rData);
          this.exportExcel_New(this.data, 22);
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
    }
  }
  backtoPending() {
    this._loader.callLoaderMethod('show');
    this._medicalService
      .BacktoPending(this.MedicalEntriesStatusList)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
        },
      });
  }
  sanction() {
    this._loader.callLoaderMethod('show');
    this._medicalService
      .finalsanction(this.MedicalEntriesStatusList)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
        },
      });
  }

  exportExcel_New(data: Array<any>, id: any) {
    let FileName = '';
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();

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
            this.colums.push({
              header: 'Photo',
              key: 'photonew',
              style: {},
            });
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
        let start = 0;
        let end = 1;
        let itsId: any = undefined;
        data.forEach((e) => {

          if (itsId == undefined) {
            itsId = e.itsId;
            const count = data.filter(x => x.itsId == itsId).length;
            start = end + 1;
            end = count + (start - 1);
            //worksheet.mergeCells('A2:A6');

            worksheet.mergeCells('A' + start + ':' + 'A' + end);
            worksheet.mergeCells('B' + start + ':' + 'B' + end);
            worksheet.mergeCells('C' + start + ':' + 'C' + end);
            worksheet.mergeCells('D' + start + ':' + 'D' + end);
            worksheet.mergeCells('E' + start + ':' + 'E' + end);
            worksheet.mergeCells('F' + start + ':' + 'F' + end);
            worksheet.mergeCells('G' + start + ':' + 'G' + end);
          }
          else {
            if (itsId != e.itsId) {
              itsId = e.itsId;
              const count = data.filter(x => x.itsId == itsId).length;
              start = end + 1;
              end = count + (start - 1);

              worksheet.mergeCells('A' + start + ':' + 'A' + end);
              worksheet.mergeCells('B' + start + ':' + 'B' + end);
              worksheet.mergeCells('C' + start + ':' + 'C' + end);
              worksheet.mergeCells('D' + start + ':' + 'D' + end);
              worksheet.mergeCells('E' + start + ':' + 'E' + end);
              worksheet.mergeCells('F' + start + ':' + 'F' + end);
              worksheet.mergeCells('G' + start + ':' + 'G' + end);
            }

          }

        });

        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          fs.saveAs(blob, FileName + "( " + Date.now() + " )" + '.xlsx');
        });
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
}
