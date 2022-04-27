import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { StudentModel } from 'src/app/AAAA_Models/Student-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.scss']
})
export class SearchStudentComponent implements OnInit {

  edit: boolean = false;
 


  public programDD = new Array<DropDownData>();
  public nameDD = new Array<DropDownData>();
  public itsIdDD = new Array<DropDownData>();
  public stdfeecategoryDD = new Array<DropDownData>();
  public feecategoryDD = new Array<DropDownData>();
  public activeStatusDD = new Array<DropDownData>();
  public students = new Array<StudentModel>();
  public studentContacts = new StudentModel ();
  public searchObject =new StudentModel();
  public filterMetadata = { count: 0, data: new Array<any>() };

  constructor(private toastr: ToastrService,private _profileService: FacultyProfileService,private _loader: LoaderService,) {
    
  }

  ngOnInit(): void {

    // this._loader.callLoaderMethod('show');
    // this._profileService.getAllStudentData().subscribe({
    //   next: (x) => {
    //     this.students = x.model;
    //     this.nameDD=x.nameDD;
    //     this.itsIdDD=x.itsIdDD;
    //     this.programDD=x.programDD;
    //     this.feecategoryDD=x.fcNameDD;
    //     this.searchObject.search_Active = true;

    //     this._loader.callLoaderMethod('hide');
    //   },
    //   error: (err) => { },
    // });

  }

  isCopied = false;

  copied(event:any) {
    this.isCopied = event.isSuccess;
  }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.toastr.success('Copied to clipboard!', '');
  }

  contactClick(data:StudentModel)
  {
    this.studentContacts=data;
  }

  changeStudentStatus(itsId:number,remarks:any)
  {
    // this._loader.callLoaderMethod('show');
    //  this._profileService.changeStudentStatus(itsId,"dummy").subscribe({
    //   next: (x) => {
        

    //     this._loader.callLoaderMethod('hide');
    //     this.ngOnInit();
    //   },
    //   error: (err) => {
    //     this._loader.callLoaderMethod('hide');

    //    },
    // });
  }


}
