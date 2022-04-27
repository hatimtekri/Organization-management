import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FeeAllotmentModel } from 'src/app/AAAA_Models/FeeAllotment-Model';
import { FeeCategoryModel } from 'src/app/AAAA_Models/FeeCategoryModel-Model';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { StudentModel } from 'src/app/AAAA_Models/Student-Model';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { IncomeService } from 'src/app/Services/income.service';
declare var swal: any;

@Component({
  selector: 'app-exclude-student',
  templateUrl: './exclude-student.component.html',
  styleUrls: ['./exclude-student.component.scss']
})
export class ExcludeStudentComponent implements OnInit {

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

  delete: any;


  

  constructor(private _incomeService: IncomeService, 
    private _profileService: FacultyProfileService,
    private _authService: AuthService, 
    private toastr: ToastrService, 
    private _loader: LoaderService,) { }

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(85);

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

    this._authService.getAdminSubRights(85).subscribe({
      next: (x) => {
        this.delete = x.includes(48);

        if (this.delete == true) {

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

    this._loader.callLoaderMethod('show');
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

  search() {
    this.isInActive = false;
    this._loader.callLoaderMethod('show');
    this._incomeService.getExcludedStudents(this.allocateManual).subscribe({
      next: (x) => {
        this.students = x.model;
        this.nameDD = x.nameDD;
        this.itsIdDD = x.itsIdDD;
        this.programDD1 = x.programDD;
        this.feecategoryDD = x.fcNameDD;
        this.searchObject.search_Active = true;
        this.isloaded = true;
        this.allocateManual.id = this.students.length.toString();


        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  deleteFromExcluded(id:any){
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._incomeService.deleteExcludedStudent(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.error('Entry Deleted', '');
        // this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  contactClick(data: StudentModel) {
    this.studentContacts = data;
  }

}
