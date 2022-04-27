import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FeeAllotment } from 'src/app/AAAA_Models/FeeAllotmentModel';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { mz_fee_collection_center } from 'src/app/AAAA_Models/mz_fee_collection_center';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';

import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import * as fs from 'file-saver';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { Workbook } from 'exceljs';
import { IncomeService } from 'src/app/Services/income.service';
import { ManualOnlineReceiptService } from 'src/app/Services/Income/manual-online-receipt.service';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { FeePayment } from 'src/app/AAAA_Models/FeePaymentModel';
declare var swal: any;

@Component({
  selector: 'app-manual-online-receipt',
  templateUrl: './manual-online-receipt.component.html',
  styleUrls: ['./manual-online-receipt.component.scss'],
  providers: [ManualOnlineReceiptService]
})
export class ManualOnlineReceiptComponent implements OnInit {

  public actionDD = new Array<DropDownData>();

  constructor(private _incomeService: ManualOnlineReceiptService,private _profileService: FacultyProfileService,private _loader: LoaderService, private toastr: ToastrService,private _authService:AuthService) { }

  public leaders = new Array<FeeTransaction>();
  itsId: any;
  edit: boolean = true;
  allocated: any;
  paid: any;
  waived: any;
  reversed: any;
  balance: any;
  totalAmount: any;
  selectedId: number = 1;
  name: any;
  program: any;
  isShow: any;
  recieptPrint = new Reciept();
  isPrint: any;
  csvs:any;
  public feeallocatedDD = new Array<FeeAllotment>();
  public feePaidList = new Array<FeeAllotment>();
  public banksDD = new Array<DropDownData>();
  public reciept = new FeeTransaction();
  public cCenter = new Array<mz_fee_collection_center>();
  public colums = Array<WorkshreetColums>();
  public paymentMode = [
    { name: "Cash" },
    { name: "Cheque" },
  ];


  public collectionCenter = [
    { id: 2, name: "Surat Office" },

  ];

  page:any;

  ngOnInit(): void {

    this.isShow = false;
    
    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(79);

        if (this.page == true) {
          this._loader.callLoaderMethod('hide');
        }
        else
        {
        this._loader.callLoaderMethod('hide');

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });


  

  }
  clear()
  {
    this.ngOnInit();
  }
  loadData(id: number) {
    this._loader.callLoaderMethod('show');
    this._incomeService.getStudentFeeLeader(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.leaders = x.models;

        this.balance = x.balance;
        this.reversed = x.reversed;
        this.waived = x.waived;
        this.allocated = x.allocated;
        this.paid = x.paid;
        this.name = x.name;
        this.program = x.program;
        this.cCenter = x.cCenters;
        this.isShow = true;



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
    this._incomeService.getFeeAllocationForPayment(this.itsId).subscribe({
      next: x => {
        this._loader.callLoaderMethod('hide');
        this.feeallocatedDD = x;
        this.setFeePaid();

      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        //swal('Error!', err.error.message, 'error');
      }
    });

  }
  setFeePaid() {
    this._loader.callLoaderMethod('show');
    let c = 1;
    this.feePaidList = new Array<any>();

    for (let i = 0; i < this.feeallocatedDD.length; i++) {
      let ccc = this.feeallocatedDD[i];
      if (ccc.id) {
        if (ccc.id > this.selectedId) {
          break;
        }
        let aaa = new FeeAllotment();
        aaa.id = this.feeallocatedDD[i].id;
        aaa.name = this.feeallocatedDD[i].name;
        aaa.amount = this.feeallocatedDD[i].amount;
        aaa.allotmentId = this.feeallocatedDD[i].allotmentId;

        this.feePaidList.push(aaa);

      }

    }

    this.totalAmount = this.feePaidList.reduce((sum, record) => sum + (record.amount ?? 0), 0);

    this._loader.callLoaderMethod('hide');

  }
  amountChange(id: number, amount: number) {
    this._loader.callLoaderMethod('show');
    const a = this.feeallocatedDD.find(x => x.id == id)?.amount;
    const a2 = this.feePaidList.find(x => x.id == id)?.amount;

    console.log("A2 - " + a2);
    console.log("A - " + a);

    if (a2 && a) {
      if (a2 > a) {
        alert("Payment amount cannot exceed Pending Amount!");
        let bb = this.feePaidList.find(x => x.id == id);
        //this.feePaidList.find(x=>x.id == id).amount=a;
        if (bb) {
          bb.amount = a;
        }

      }
      else if (a2 <= 0) {
        alert("Payment amount cannot be equal to or less them zero!");
        let bb = this.feePaidList.find(x => x.id == id);
        //this.feePaidList.find(x=>x.id == id).amount=a;
        if (bb) {
          bb.amount = a;
        }


      }

    }
    else {
      alert("Payment amount cannot be equal to or less them zero!");
      let bb = this.feePaidList.find(x => x.id == id);
      //this.feePaidList.find(x=>x.id == id).amount=a;
      if (bb) {
        bb.amount = a;
      }
    }

    this.totalAmount = this.feePaidList.reduce((sum, record) => sum + (record.amount ?? 0), 0);

    this._loader.callLoaderMethod('hide');

  }

  submitReciet() {
    this.reciept.debit = this.totalAmount;
    this.reciept.itsId = this.itsId;
    this.reciept.paymentType="Online";

    this.reciept.collectioncenterId="1";

    if (this.reciept.collectioncenterId == "" || this.reciept.collectioncenterId == null || this.reciept.collectioncenterId == undefined) {
      alert('Kindly enter collectioncenter');
      return;
    }
    if (this.reciept.paymentType == "" || this.reciept.paymentType == null || this.reciept.paymentType == undefined) {
      alert('Kindly enter payment Mode');
      return;
    }
    if (this.reciept.debit == "" || this.reciept.debit == '0' || this.reciept.debit == null || this.reciept.debit == undefined) {
      alert('Kindly enter amount');
      return;
    }



    if (this.reciept.paymentType == "Cheque") {
      if (this.reciept.chequeDate1 == null || this.reciept.chequeDate1 == undefined) {
        alert('Kindly enter cheque Date');
        return;
      }

      if (this.reciept.reference == null || this.reciept.reference == undefined) {
        alert('Kindly enter cheque Number');
        return;
      }

      if (this.reciept.bankName == null || this.reciept.bankName == undefined || this.reciept.bankName == "") {
        alert('Kindly enter bank Name');
        return;
      }

    }
    this.reciept.chequeDate = new Date(this.reciept.chequeDate1 ?? '');

    this.reciept.chequeDate.setDate(this.reciept.chequeDate.getDate() + 1);
    

    this.feePaidList[0].reciept = this.reciept;
    this.feePaidList[0].paymentId = this.reciept.reference;
    

    this._loader.callLoaderMethod('show');
    this._incomeService.createOnlineManualReciept(this.feePaidList).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.recieptPrint = x;
        this.isPrint = true;
        this.reciept = new FeeTransaction();
        this.totalAmount = undefined;


        this.toastr.success('Saved successfully', '');
        this.loadData(this.itsId);

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }

  getpendingReport()
  {
    this._loader.callLoaderMethod('show');
   console.log("1");
   let f=new FeePayment();
   f.name=this.csvs;
    this._incomeService.GetPendingTxnDataToExport(f).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        console.log("2");
        this.exportExcel(x.export, 15);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log('Error');
      },
    });
  }

  clear2()
  {
    this.csvs=undefined;
  }
 
  exportExcel(data: Array<any>, id: any) {
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();
    let FileName = 'Razor pay Txn';

   
    let worksheet = workbook.addWorksheet("Razor pay Txn");


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
