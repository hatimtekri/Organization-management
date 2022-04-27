import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FeeAllotmentModel } from 'src/app/AAAA_Models/FeeAllotment-Model';
import { FeeCategoryModel } from 'src/app/AAAA_Models/FeeCategoryModel-Model';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { StudentModel } from 'src/app/AAAA_Models/Student-Model';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';

import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import * as fs from 'file-saver';
import { IncomeService } from 'src/app/Services/income.service';
import { Workbook } from 'exceljs';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
declare var swal: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  edit: boolean = false;

  public FieldNames = new Array<any>();
  public colums = Array<WorkshreetColums>();

  public programDD = new Array<DropDownData>();
  public programDD1 = new Array<DropDownData>();
  public nameDD = new Array<DropDownData>();
  public itsIdDD = new Array<DropDownData>();
  public stdfeecategoryDD = new Array<DropDownData>();
  public feecategoryDD = new Array<DropDownData>();
  public students = new Array<StudentModel>();
  public studentContacts = new StudentModel();
  public searchObject = new StudentModel();
  public filterMetadata = { count: 0, data: new Array<any>() };
  psetId: any;
  public allocateManual = new FeeAllotmentModel();


  page: any;
  isloaded: any;
  isInActive: any;

  excludeHijriMonth: any;
  excludeHijriYear: any;



  public leaders = new Array<FeeTransaction>();
  public categories = new Array<FeeCategoryModel>();
  itsId: any;

  allocated: any;
  fcId: any;
  paid: any;
  waived: any;
  reversed: any;
  wallet_b: any;
  wallet_d: any;
  wallet_c: any;
  balance: any;
  fcName: any;
  name: any;
  program: any;
  isShow: any;
  amount: any;
  fcEdit: any;
  onOffModule: any;

  changestatus: any;

  public allocateMonthDD = [

    { id: 1, name: "Moharram al-Haraam" },
    { id: 2, name: "Safar al-Muzaffar" },
    { id: 3, name: "Rabi al-Awwal" },
    { id: 4, name: "Rabi al-Akhar" },
    { id: 5, name: "Jumada al-Ula" },
    { id: 6, name: "Jumada al-Ukhra" },
    { id: 7, name: "Rajab al-Asab" },
    { id: 8, name: "Shaban al-Karim" },
    { id: 9, name: "Ramadan al-Moazzam" },
    { id: 10, name: "Shawwal al-Mukarram" },
    { id: 11, name: "Zilqada til-Haraam" },
    { id: 12, name: "Zilhijja til-Haraam" },

  ];

  public allocateYearDD = [
    { name: "1442" },
    { name: "1443" },
    { name: "1444" },
    { name: "1445" },
    { name: "1446" },
    { name: "1447" },
    { name: "1448" },
    { name: "1449" },
    { name: "1450" },
    { name: "1451" },
    { name: "1452" },
    { name: "1453" },
    { name: "1454" },
    { name: "1455" },
    { name: "1456" },
    { name: "1457" },
    { name: "1458" },
    { name: "1459" },
    { name: "1460" },

  ];



  constructor(private _incomeService: IncomeService, private _profileService: FacultyProfileService, private _authService: AuthService, private toastr: ToastrService, private _loader: LoaderService,) {

  }

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(78);

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

    this._authService.getAdminSubRights(78).subscribe({
      next: (x) => {
        this.changestatus = x.includes(41);

        if (this.changestatus == true) {

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


    this._incomeService.getPsetData(500).subscribe({
      next: (x) => {
        this.programDD = x;


        if (this.programDD.length == 1) {
          let aaa = [this.programDD[0].id ?? 0];
          this.allocateManual.monthList = aaa;
          this.search();
        }
        else {
          this._loader.callLoaderMethod('hide');

        }


      },
      error: (err) => { },
    });

    this._profileService.getModuleStatus(1).subscribe({
      next: (x) => {

        this.onOffModule = x;


      },
      error: (err) => {

      },
    });



  }

  isCopied = false;

  copied(event: any) {
    this.isCopied = event.isSuccess;
  }

  copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.toastr.success('Copied to clipboard!', '');
  }

  contactClick(data: StudentModel) {
    this.studentContacts = data;
  }

  excludeClick(data: StudentModel) {
    this.studentContacts = data;
  }

  excludestudent(){

    if(this.excludeHijriMonth == undefined || this.excludeHijriMonth == null || this.excludeHijriMonth == ""){
      alert('Kindly select Hijri Month');
      return;
    }
    if(this.excludeHijriYear == undefined || this.excludeHijriYear == null || this.excludeHijriYear == ""){
      alert('Kindly select Hijri Year');
      return;
    }

    var r = confirm("Are you sure you want to Exclude " + this.studentContacts.itsId + "?");
      if (r == false) {
        return;
      }

    this._loader.callLoaderMethod('show');
    this._incomeService.excludeStudent(this.studentContacts.mzId??0,this.studentContacts.programSetId??0,this.excludeHijriMonth,this.excludeHijriYear).subscribe({
      next: x => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Updated successfully', '');


      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');


      }
    });

  }

  changeStudentStatus(itsId: number, status: string, remarks: any) {
    if (status == "InActive") {
      var r = confirm("Are you sure you want to Active " + itsId + "?");
      if (r == false) {
        return;
      }
    }

    else {
      var r = confirm("Are you sure you want to InActive " + itsId + "?");
      if (r == false) {
        return;
      }
    }

    this._loader.callLoaderMethod('show');
    this._incomeService.changeStudentStatus(itsId, "dummy").subscribe({
      next: (x) => {


        this._loader.callLoaderMethod('hide');
        this.search();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');

      },
    });
  }

  refreshFromIts(id: number) {
    this._loader.callLoaderMethod('show');
    this._incomeService.refreshDataFromIts(id).subscribe({
      next: x => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Updated successfully', '');


      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');


      }
    });

  }



  search() {
    this.isInActive = false;
    this._loader.callLoaderMethod('show');
    this._incomeService.getAllActiveStudentData(this.allocateManual).subscribe({
      next: (x) => {
        this.students = x.model;
        this.nameDD = x.nameDD;
        this.itsIdDD = x.itsIdDD;
        this.programDD1 = x.programDD;
        this.feecategoryDD = x.fcNameDD;
        this.searchObject.search_Active = true;
        this.isloaded = true;
        this.allocateManual.id = this.students.length.toString();

        this._incomeService.getAllInActiveStudentData(this.allocateManual).subscribe({
          next: (x) => {

            for (let i = 0; i < x.model.length; i++) {

              this.students.push(x.model[i]);

            }
            for (let i = 0; i < x.nameDD.length; i++) {

              this.nameDD.push(x.nameDD[i]);

            }
            for (let i = 0; i < x.itsIdDD.length; i++) {

              this.itsIdDD.push(x.itsIdDD[i]);

            }
            for (let i = 0; i < x.programDD.length; i++) {

              this.programDD1.push(x.programDD[i]);

            }
            for (let i = 0; i < x.fcNameDD.length; i++) {

              this.feecategoryDD.push(x.fcNameDD[i]);

            }


            this.isInActive = true;
            this.allocateManual.id = this.students.length.toString();



          },
          error: (err) => {

            this._loader.callLoaderMethod('hide');
            swal('Error!', err.error.message, 'error');
          },
        });


        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
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

        this.wallet_b = x.wallet_b;
        this.wallet_d = x.wallet_d;
        this.wallet_c = x.wallet_c;


        this.paid = x.paid;
        this.name = x.name;
        this.program = x.program;

        this.isShow = true;
        this.fcName = x.fcName;
        this.categories = x.categories;
        this.amount = x.amount;
        this.fcId = x.fcId;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  ExportStudentData() {
    const count = this.students.length;

    if (count == 0) {
      alert('Kindly Load Data');
      return;
    }

    this._loader.callLoaderMethod('show');

    this._incomeService.GetStudentDataToExport(this.filterMetadata.data).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.exportExcel(x.export, 17);
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

}
