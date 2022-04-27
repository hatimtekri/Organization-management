import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';

import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import * as fs from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';


import { ReceiptStatementService } from 'src/app/Services/Income/receipt-statement.service';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.scss'],
  providers: [ReceiptStatementService]

})
export class PrintReceiptComponent implements OnInit {

  public paymentModeDD = new Array<DropDownData>();
  public statusDD = new Array<DropDownData>();
  searchObject = new Reciept();
  loader: any;
  reverseId: any;
  reverseReason: any;
  reverseNote: any;
  reverse: any;
  represent: any;
  isGaramat: any;
  public reciepts = new Array<Reciept>();
  public filterMetadata = { count: 0, data: new Array<any>() };
  
  recieptPrint = new Reciept();
  public reciepts_print = new Array<Reciept>();
  constructor(private _incomeService: ReceiptStatementService,private _profileService: FacultyProfileService,private _spinner: NgxSpinnerService, private _loader: LoaderService, private toastr: ToastrService, private _authService: AuthService) { }
  selectAll: any;
  public FieldNames = new Array<any>();
  public colums = Array<WorkshreetColums>();
  public reasonDD = [
    {
      name: 'Funds Insufficient'
    },
    {
      name: 'Drawers Signature differs'
    },
    {
      name: 'Kindly contact Drawer or Drawee Bank'
    },
    {
      name: 'Exceeds arrangement'
    },
    {
      name: 'Account blocked'
    },
    {
      name: 'PAN Required'
    },
    {
      name: 'Wrong Entry'
    },
    {
      name: 'Alteration'
    },
    {
      name: 'Connectivity failure'
    },
    {
      name: 'Item listed twice'
    },
    {
      name: 'Payment stopped by drawer'
    },
    {
      name: 'Effects not cleared, present again'
    },
    {
      name: 'Instrument without proper date'
    },
    {
      name: 'Do not participate in CTS clearing'
    },
    {
      name: 'Invalid Instrument Type'
    },
    {
      name: 'Exit'
    },
  ];

  public garamatDD = [
    { name: 'Yes' },
    { name: 'No' },
  ];

  public garaamatAmount = 500;

  page: any;
  ngOnInit(): void {



    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(73);

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


    this._authService.getAdminSubRights(73).subscribe({
      next: (x) => {
        this.reverse = x.includes(43);
        this.represent = x.includes(44);

        if (this.reverse == true) {

        }
        else {
          this._loader.callLoaderMethod('hide');
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

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
    this._incomeService.getSearchRecipt(this.searchObject).subscribe({
      next: (x) => {
        // this._loader.callLoaderMethod('hide');
        this.loader = false;
        this.reciepts = x.model;
        this.FieldNames = x.exportCategory;
        this.garaamatAmount = 500;
        this.paymentModeDD=x.paymentModeDD;
        this.statusDD=x.statusDD;

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

  print_dublicate(i: Reciept) {

    this.recieptPrint = i;

  }
  print_original(i: Reciept) {
    this.recieptPrint = i;
  }

  setSelectAll() {
    if (this.selectAll == false) {
      for (var y in this.reciepts) {
        this.reciepts[y].select = false;
      }
    } else {
      for (var y in this.reciepts) {
        this.reciepts[y].select = true;
      }
    }
  }

  ExportRecieptStatement() {
    const count = this.reciepts.length;

    if (count == 0) {
      alert('Kindly Load Data');
      return;
    }

    this._loader.callLoaderMethod('show');

    this._incomeService.GetReceiptStatementDataToExport(this.filterMetadata.data).subscribe({
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

  ReverseReceipt(id: any) {
    this.reverseId = id;
  }

  Reversesubmit() {

    if (this.reverseNote == undefined || this.reverseNote == "" || this.reverseNote == null) {
      alert('Kindly write any notes.');
      return;
    }
    if (this.reverseReason == undefined || this.reverseReason == "" || this.reverseReason == null) {
      alert('Kindly select reason.');
      return;
    }
    if (this.isGaramat == undefined || this.isGaramat == "" || this.isGaramat == null) {
      alert('Kindly select  Garamat.');
      return;
    }

    if (this.isGaramat == "Yes") {
      if (this.garaamatAmount == undefined || this.garaamatAmount == null) {
        alert('Kindly enter  Garamat amount');
        return;
      }
    }
    else {
      this.garaamatAmount = 0;
    }

    var r = confirm("Are you sure you want to In-Active this receipt (unique id: " + this.reverseId + ") ?");
    if (r == false) {
      return;
    }

    this._loader.callLoaderMethod('show');
let model={rId:this.reverseId,reason:this.reverseReason,note:this.reverseNote,isgaramat:this.isGaramat,amount1:this.garaamatAmount};



    this._incomeService.ReverseReceipt(model).subscribe({
      next: (x) => {

        this._loader.callLoaderMethod('hide');
        this.search();
        // $("#exampleModal").modal("hide");
        this.reverseReason = undefined;
        this.reverseNote = undefined;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  ReceiptRepresent()
  {
    
  }
}
