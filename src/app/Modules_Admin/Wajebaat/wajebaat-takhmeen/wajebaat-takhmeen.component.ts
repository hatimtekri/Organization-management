import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { AuthService } from 'src/app/Services/auth.service';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { MedicalService } from '../../Services/medical.service';
declare var swal: any;

@Component({
  selector: 'app-wajebaat-takhmeen',
  templateUrl: './wajebaat-takhmeen.component.html',
  styleUrls: ['./wajebaat-takhmeen.component.scss']
})
export class WajebaatTakhmeenComponent implements OnInit {

  lastYear: any;
  thisYear: any;
  listselectAll: any;
  public dataAfterTakhmin = new Array<any>();
  public currenceis = new Array<any>();
  public dataForTakhmin = new Array<any>();
  public dataForTakhmin2 = new Array<any>();
  public colums = Array<WorkshreetColums>();
  page: any;
  printItsId: any;
  edit: boolean = false;
  //onOffModule: any;

  rate: any;
  toCurrency: any;
  fromCurrency: any;

  public currencyDD = [
    { "code": "AED", "display": "AED - United Arab Emirates Dirham" },
    { "code": "AUD", "display": "AUD - Australian Dollar" },
    { "code": "CAD", "display": "CAD - Canadian Dollar" },
    { "code": "EGP", "display": "EGP - Egyptian Pound" },
    { "code": "EUR", "display": "EUR - Euro" },
    { "code": "GBP", "display": "GBP - British Pound" },
    { "code": "INR", "display": "INR - Indian Rupee" },
    { "code": "KES", "display": "KES - Kenyan Shilling" },
    { "code": "KWD", "display": "KWD - Kuwait Dinar" },
    { "code": "LKR", "display": "LKR - Sri Lankan Rupee" },
    { "code": "PKR", "display": "PKR - Pakistani Rupee" },
    { "code": "TZS", "display": "TZS - Tanzanian Shilling" },
    { "code": "USD", "display": "USD - United States Dollar" },
    { "code": "YER", "display": "YER - Yemeni Riyal" },
  ];

  constructor(private _profileService: FacultyProfileService, private _loader: LoaderService, private _authService: AuthService,
    private toastr: ToastrService, private _medicalService: MedicalService,) { }

  ngOnInit(): void {

    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(84);

        if (this.page == true) {

        }
        else {

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getDataForwajebaatTakhmin().subscribe({
      next: (x) => {
        this.dataForTakhmin = x.models;
        this.lastYear = x.lastHijriYear;
        this.thisYear = x.currentHijriyear;

        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });
    this._loader.callLoaderMethod('show');
    this._profileService.getDataFroWajebaatAfterTakhmin().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.dataAfterTakhmin = x;
        console.log(JSON.stringify(this.dataAfterTakhmin));

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });


    this._loader.callLoaderMethod('show');
    this._profileService.getCurrecyConversion().subscribe({
      next: (x) => {

        this.currenceis = x;

        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    // this._profileService.getModuleStatus(4).subscribe({
    //   next: (x) => {

    //     this.onOffModule = x;

    //     this._loader.callLoaderMethod('hide');
    //   },
    //   error: (err) => {
    //     this._loader.callLoaderMethod('hide');
    //     swal('Error - 1!', err.error.message, 'error');
    //   },
    // });



  }


  submit() {
    const count = this.dataForTakhmin.filter(x => x.select == true).length;


    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }
    this._loader.callLoaderMethod('show');
    this.dataForTakhmin2 = this.dataForTakhmin.filter(x => x.select == true);

    this._profileService.wajebaatTakhmin(this.dataForTakhmin2).subscribe({
      next: (x) => {

        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });
  }
  
  Export_fortakhmin() {
    const count = this.dataForTakhmin.filter(x => x.select == true).length;


    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }

    this._loader.callLoaderMethod('show');

    this._profileService.GetWajeebatDataToExport(this.dataForTakhmin.filter(x => x.select == true)).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.exportExcel_New(x.export, 21);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log('Error');
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



  printProfile() {

    let report = new ReportFilter();
    console.log(this.printItsId);
    report.id = 25;
    report.itsId = this.printItsId;


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


  setPrintBulkITS() {
    const count = this.dataForTakhmin.filter((x) => x.select == true).length;

    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }
    this.printItsId = undefined;
    let list = this.dataForTakhmin.filter((x) => x.select == true);
    this._loader.callLoaderMethod('show');
    for (let i = 0; i < list.length; i++) {
      list[i].itsId;

      if (this.printItsId == undefined) {
        this.printItsId = list[i].itsId;
      }
      else {
        this.printItsId = this.printItsId + ',' + list[i].itsId;
      }

    }


    this.printProfile();
  }

  ListSelectAll() {
    if (this.listselectAll == true) {
      for (var y in this.dataForTakhmin) {
        this.dataForTakhmin[y].select = false;
      }
    } else {
      for (var y in this.dataForTakhmin) {
        this.dataForTakhmin[y].select = true;
      }
    }
  }



  addCurrencyConversion() {

    if (this.fromCurrency == undefined || this.fromCurrency == '') {
      alert('Kindly select From Currency');
      return;
    }
    if (this.toCurrency == undefined || this.toCurrency == '') {
      alert('Kindly select To Currency');
      return;
    }
    if (this.fromCurrency == this.toCurrency) {
      alert('From and To Currency cannot be same');
      return;
    }
    if (this.rate == undefined || this.rate == '') {
      alert('Kindly enter rate');
      return;
    }
    this._loader.callLoaderMethod('show');
    this._profileService.addCurrecyConversion(this.fromCurrency, this.toCurrency, (this.rate * 10000)).subscribe({
      next: (x) => {

        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.ngOnInit();

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });
  }
  editCurrencyConversion(data: any) {
    if (data.value == undefined || data.value == '' || data.value == 0) {
      alert('Rate cannot be zero');
      return;
    }
    this._loader.callLoaderMethod('show');
    this._profileService.addCurrecyConversion(data.fromCurrencyName, data.toCurrencyName, (data.value * 10000)).subscribe({
      next: (x) => {

        this._loader.callLoaderMethod('hide');
        this.toastr.success('Saved successfully', '');
        this.edit = false;
        this.ngOnInit();


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });
  }


}
