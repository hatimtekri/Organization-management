import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { AuthService } from 'src/app/Services/auth.service';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;

@Component({
  selector: 'app-add-kg',
  templateUrl: './add-kg.component.html',
  styleUrls: ['./add-kg.component.scss']
})
export class AddKgComponent implements OnInit {

  public tayeeninmahadDD = new Array<DropDownData>();
  public kg = new FacultyProfile();

  public farigYearDD = new Array<DropDownData>();
  public farigDarajagDD = new Array<DropDownData>();
  public categoryDD = new Array<DropDownData>();
  public alJameaDegreeDD = new Array<DropDownData>();
  public khidmatYearDD = new Array<DropDownData>();
  public khidmatinMahadDD = new Array<DropDownData>();
  public mainDepartmentDD = new Array<DropDownData>();
 

  constructor(  private _loader: LoaderService,
    private _profileService: FacultyProfileService,
    private _router: Router,
    private toastr: ToastrService,
    private _authService: AuthService,
    private route: ActivatedRoute) { }
    name:any;
    level1:any;
    itsId3:any;
    page:any;

    category = [
      { Name: 'MZ KHDGZ (Non Tayeen)',Name1: 'WafdAlHuffaz' },
      { Name: 'MZ KHDGZ (Tayeen)',Name1: 'MAHADALZAHRA KHDGZ' },
      { Name: 'Other Idara KG',Name1: 'Other Idara KG' },
      { Name: 'Recruited Muhaffiz',Name1: 'Recruited Muhaffiz' },   
      { Name: 'Recruited Teacher',Name1: 'Recruited Teacher' },             
    ];
  ngOnInit(): void {



    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(67);

        if (this.page == true) {
         
        }
        else{
          this._loader.callLoaderMethod('hide');
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });


    this.itsId3=this._profileService.getITSIDData3();
    this._profileService.getITSIDData3Observable().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.itsId3=x;
        
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

   
    this._profileService.getDropdownData(2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.farigYearDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(20).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.farigDarajagDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(4).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.categoryDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(7).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.alJameaDegreeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.khidmatYearDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.khidmatinMahadDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    
   


  }

  fetchName(itsId: any) {

    this.kg.mz_idara=undefined;
    this.kg.fariqYear=undefined;
    this.kg.farigDarajah=undefined;
    this.kg.category=undefined;
    this.kg.alJameaDegree=undefined;
    this.kg.khidmatYear=undefined;
    this.kg.mahad_khidmatYear=undefined;
    this.kg.tayeenYear=undefined;
    this.kg.deptVenueId=undefined;
    this.kg.trNo=undefined;
    


    this._loader.callLoaderMethod('show');
    this._profileService.getNameWithPhoto(itsId).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.name = x.name;
       this.level1=true;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
    
    this._profileService.getMozeDD(this.itsId3).subscribe({
      next: x => {
        
        this.mainDepartmentDD = x;
      },
      error: err => {
        
        swal('Error!', err.error.message, 'error');
      }
    });
  }

  mzidarachange()
  {
    this.kg.fariqYear=undefined;
    this.kg.farigDarajah=undefined;
    this.kg.category=undefined;
    this.kg.alJameaDegree=undefined;
    this.kg.khidmatYear=undefined;
    this.kg.mahad_khidmatYear=undefined;
    this.kg.tayeenYear=undefined;
    this.kg.deptVenueId=undefined;
    this.kg.trNo=undefined;
    




  }


  AddTayeen()
  {
    if (this.kg.fariqYear === null || this.kg.fariqYear === undefined) {
      alert('please enter farig year !');
      return;
    }

    if (this.kg.farigDarajah === null || this.kg.farigDarajah === undefined) {
      alert('please enter farig darajah');
      return;
    }
    if (this.kg.category === null || this.kg.category === undefined) {
      alert('please enter Farig from');
      return;
    }
    if (this.kg.trNo === null || this.kg.trNo === undefined) {
      alert('please enter Tr No.');
      return;
    }
    if (this.kg.alJameaDegree === null || this.kg.alJameaDegree === undefined) {
      alert('please enter Al Jamea Degree');
      return;
    }
    if (this.kg.khidmatYear === null || this.kg.khidmatYear === undefined) {
      alert('please enter Khidmat Year');
      return;
    }
    if (this.kg.mahad_khidmatYear === null || this.kg.mahad_khidmatYear === undefined) {
      alert('please enter Khidmat in Mahad');
      return;
    }
    if (this.kg.tayeenYear === null || this.kg.tayeenYear === undefined) {
      alert('please enter Tayeen Year');
      return;
    }

    if (this.kg.deptVenueId === null || this.kg.deptVenueId === undefined) {
      alert('please enter Main Dept');
      return;
    }
    this.kg.isMahadWazifa=false;
    this._loader.callLoaderMethod('show');

    this._profileService.ADDFacultyProfile(this.kg).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal('Successfull!', 'You have successfully submitted the data', 'success');
        console.log('Saved');
        try {
          this.toastr.success('Saved successfully', '');
        } catch (e) {
          console.error(e);
        }


        window.setTimeout(function () {
          location.reload();
        }, 500);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }
  AddNonTayeen()
  {
    if (this.kg.fariqYear === null || this.kg.fariqYear === undefined) {
      alert('please enter farig year !');
      return;
    }

    if (this.kg.farigDarajah === null || this.kg.farigDarajah === undefined) {
      alert('please enter farig darajah');
      return;
    }
    if (this.kg.category === null || this.kg.category === undefined) {
      alert('please enter Farig from');
      return;
    }
    if (this.kg.trNo === null || this.kg.trNo === undefined) {
      alert('please enter Tr No.');
      return;
    }
    if (this.kg.alJameaDegree === null || this.kg.alJameaDegree === undefined) {
      alert('please enter Al Jamea Degree');
      return;
    }
    if (this.kg.khidmatYear === null || this.kg.khidmatYear === undefined) {
      alert('please enter Khidmat Year');
      return;
    }
    if (this.kg.mahad_khidmatYear === null || this.kg.mahad_khidmatYear === undefined) {
      alert('please enter Khidmat in Mahad');
      return;
    }
    

    if (this.kg.deptVenueId === null || this.kg.deptVenueId === undefined) {
      alert('please enter Main Dept');
      return;
    }
    this.kg.isMahadWazifa=false;
    this._loader.callLoaderMethod('show');

    this._profileService.ADDFacultyProfile(this.kg).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal('Successfull!', 'You have successfully submitted the data', 'success');
        console.log('Saved');
        try {
          this.toastr.success('Saved successfully', '');
        } catch (e) {
          console.error(e);
        }
        window.setTimeout(function () {
          location.reload();
        }, 500);
       
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  AddOtherIdara()
  {
    this.kg.isMahadWazifa=false;
    if (this.kg.fariqYear === null || this.kg.fariqYear === undefined) {
      alert('please enter farig year !');
      return;
    }

    if (this.kg.farigDarajah === null || this.kg.farigDarajah === undefined) {
      alert('please enter farig darajah');
      return;
    }
    if (this.kg.category === null || this.kg.category === undefined) {
      alert('please enter Farig from');
      return;
    }
    if (this.kg.trNo === null || this.kg.trNo === undefined) {
      alert('please enter Tr No.');
      return;
    }
    if (this.kg.alJameaDegree === null || this.kg.alJameaDegree === undefined) {
      alert('please enter Al Jamea Degree');
      return;
    }
    if (this.kg.khidmatYear === null || this.kg.khidmatYear === undefined) {
      alert('please enter Khidmat Year');
      return;
    }
   
    if (this.kg.deptVenueId === null || this.kg.deptVenueId === undefined) {
      alert('please enter Main Dept');
      return;
    }
    this._loader.callLoaderMethod('show');

    this._profileService.ADDFacultyProfile(this.kg).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal('Successfull!', 'You have successfully submitted the data', 'success');
        console.log('Saved');
        try {
          this.toastr.success('Saved successfully', '');
        } catch (e) {
          console.error(e);
        }

        window.setTimeout(function () {
          location.reload();
        }, 500);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
   
  }
  AddrecrutedMuffiz()
  {
    if (this.kg.deptVenueId === null || this.kg.deptVenueId === undefined) {
      alert('please enter Main Dept');
      return;
    }
    this._loader.callLoaderMethod('show');

    this._profileService.ADDFacultyProfile(this.kg).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal('Successfull!', 'You have successfully submitted the data', 'success');
        console.log('Saved');
        try {
          this.toastr.success('Saved successfully', '');
        } catch (e) {
          console.error(e);
        }

        window.setTimeout(function () {
          location.reload();
        }, 500);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

 AddrecrutedTeacher()
  {
    if (this.kg.deptVenueId === null || this.kg.deptVenueId === undefined) {
      alert('please enter Main Dept');
      return;
    }
    this._loader.callLoaderMethod('show');

    this._profileService.ADDFacultyProfile(this.kg).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal('Successfull!', 'You have successfully submitted the data', 'success');
        console.log('Saved');
        try {
          this.toastr.success('Saved successfully', '');
        } catch (e) {
          console.error(e);
        }

        window.setTimeout(function () {
          location.reload();
        }, 500);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  
}
