import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { AuthService } from 'src/app/Services/auth.service';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  edit: boolean = false;
  players = [
    { id: 1, playerName: 'Cristiano Ronaldo' },
    { id: 2, playerName: 'Lionel Messi' },
    { id: 3, playerName: 'Neymar Jr' },
    { id: 4, playerName: 'Toni Kroos' },
    { id: 5, playerName: 'Luiz Suarez' },
    { id: 6, playerName: 'Karim Benzema' },
    { id: 7, playerName: 'Eden Hazard' },
  ];

  currency = [
    { name: "INR"},
    { name: "USD"}
  ];
  id: any;
  isMahadWazifa = [
    { name: "true"},
    { name: "false"}
  ];
  selected = [
    { id: 2, playerName: 'Toni Kroos' }
  ];
  public itsId2:any;
  public itsId3:any;
  public mainDepartmentDD = new Array<DropDownData>();
  SalaryPage:any;
  public profileData = new FacultyProfile();

  constructor(private toastr:ToastrService,private _authService: AuthService,
    private route: ActivatedRoute, private _profileService: FacultyProfileService, private _router: Router, private _loader: LoaderService,) { }

  ngOnInit(): void {



    this._authService.getAdminSubRights(66).subscribe({
      next: (x) => {
        this.SalaryPage = x.includes(37);

        if (this.SalaryPage == true) {
         
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


    const id1 = this.route.snapshot.paramMap.get('id');

    this.id = id1 ?? '0';

    this.edit = false;

    // this.itsId=this._profileService.getITSIDData();
    this.itsId2 = this.id;
    this.itsId3=this._profileService.getITSIDData3();
    if(this.itsId2 == 0)
    {
     this._router.navigate(['/admin/hr-master']);
    }
    else
    {

      this._loader.callLoaderMethod('show');
      this._profileService.getfacultyProfileData(this.itsId2).subscribe({
        next: x => {
          this._loader.callLoaderMethod('hide');
          this.profileData = x.student;
          this._profileService.setProfileData(x.student);
        },
        error: err => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        }
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

  }

  submitdata() {
    this._loader.callLoaderMethod('show');

    this._profileService.submitFacultyProfile(this.profileData).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal('Successfull!', 'You have successfully submitted the data', 'success');

        //this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

}
