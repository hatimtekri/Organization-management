import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FeeAllotmentModel } from 'src/app/AAAA_Models/FeeAllotment-Model';
import { StudentModel } from 'src/app/AAAA_Models/Student-Model';

import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';

import { IncomeService } from 'src/app/Services/income.service';
import { FeeAllocationService } from 'src/app/Services/Income/fee-allocation.service';
declare var swal: any;

@Component({
  selector: 'app-fee-allocation',
  templateUrl: './fee-allocation.component.html',
  styleUrls: ['./fee-allocation.component.scss'],
  providers: [FeeAllocationService]
})
export class FeeAllocationComponent implements OnInit {

  edit: boolean = false;



  public allocateBulk = new FeeAllotmentModel();

  show3: any;
  public allocateManual = new FeeAllotmentModel();
  public getData = new FeeAllotmentModel();
  public loadData1 = new FeeAllotmentModel();
  public allocateMiscellaneous = new FeeAllotmentModel();
  public students = new Array<StudentModel>();
  public students2 = new Array<StudentModel>();
  public students3 = new Array<FeeAllotmentModel>();
  public students6 = new Array<FeeAllotmentModel>();
  public AmountDD = new Array<DropDownData>();
  public ProgramDD = new Array<DropDownData>();
  public CategoryDD = new Array<DropDownData>();
  public allocatepsetDD = new Array<DropDownData>();

  constructor(private _incomeService: FeeAllocationService, private _authService: AuthService, private _loader: LoaderService, private toastr: ToastrService) {
    // this.titleService.setTitle("MZ Income Manager");
  }

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
  page: any;
  ngOnInit(): void {
    this.students = new Array<StudentModel>();

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(70);

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

    this._incomeService.getAllPsetForFeeAllotment().subscribe({
      next: (x) => {
        
        this.allocatepsetDD = x;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });


  }

  bulkAllocateFee() {
    this._loader.callLoaderMethod('show');

    if (this.allocateBulk.pSetId == "" || this.allocateBulk.pSetId == null || this.allocateBulk.pSetId == undefined) {
      alert('Kindly select Program');
      return;
    }

    if (this.allocateBulk.hijriYear == "" || this.allocateBulk.hijriYear == null || this.allocateBulk.hijriYear == undefined) {
      alert('Kindly select Hijri Year');
      return;
    }

    if (this.allocateBulk.monthId == "" || this.allocateBulk.monthId == null || this.allocateBulk.monthId == undefined) {
      alert('Kindly select Month ');
      return;
    }


    this._incomeService.AllocateBulkFee(this.allocateBulk).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });


  }

  manualAllocateFee() {


    if (this.allocateManual.hijriYear == "" || this.allocateManual.hijriYear == null || this.allocateManual.hijriYear == undefined) {
      alert('Kindly enter Hijri Year');
      return;
    }

    if (this.allocateManual.monthList?.length == 0) {
      alert('Kindly enter Month ');
      return;
    }


    if (this.allocateManual.itsIdCSV == "" || this.allocateManual.itsIdCSV == null || this.allocateManual.itsIdCSV == undefined) {
      alert('Kindly enter ITS CSV');
      return;
    }
    this._loader.callLoaderMethod('show');
    this._incomeService.AllocateManualFee(this.allocateManual).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }
  MiscellaneousAllocateFee() {


    if (this.allocateMiscellaneous.remarks == "" || this.allocateMiscellaneous.remarks == null || this.allocateMiscellaneous.remarks == undefined) {
      alert('Kindly enter Note');
      return;
    }
    if (this.allocateMiscellaneous.feeAlloted == "" || this.allocateMiscellaneous.feeAlloted == null || this.allocateMiscellaneous.feeAlloted == undefined) {
      alert('Kindly enter amount');
      return;
    }
    if (this.allocateMiscellaneous.itsIdCSV == "" || this.allocateMiscellaneous.itsIdCSV == null || this.allocateMiscellaneous.itsIdCSV == undefined) {
      alert('Kindly enter ITS CSV');
      return;
    }
    this._loader.callLoaderMethod('show');
    this._incomeService.AllocateMiscellaneousFee(this.allocateMiscellaneous).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  getStudents() {
    if (this.allocateManual.itsIdCSV == "" || this.allocateManual.itsIdCSV == null || this.allocateManual.itsIdCSV == undefined) {
      alert('Kindly enter ITS CSV');
      return;
    }

    this._incomeService.getStudents(this.allocateManual.itsIdCSV).subscribe({
      next: (x) => {
        this.students = x;

        this._loader.callLoaderMethod('hide');
      },
      error: (err) => { },
    });

  }

  getStudents2() {
    if (this.allocateMiscellaneous.itsIdCSV == "" || this.allocateMiscellaneous.itsIdCSV == null || this.allocateMiscellaneous.itsIdCSV == undefined) {
      alert('Kindly enter ITS CSV');
      return;
    }

    this._incomeService.getStudents(this.allocateManual.itsIdCSV).subscribe({
      next: (x) => {
        this.students2 = x;

        this._loader.callLoaderMethod('hide');
      },
      error: (err) => { },
    });

  }

  loadData() {
    if (this.loadData1.monthList?.length == 0) {
      alert('Kindly enter months');
      return;
    }

    this._incomeService.getAllocatedFees(this.loadData1).subscribe({
      next: (x) => {
        this.students3 = x.model;
        this.show3 = true;
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => { },
    });
  }



}
