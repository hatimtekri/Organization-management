import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { AuthService } from 'src/app/Services/auth.service';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-profile-master',
  templateUrl: './profile-master.component.html',
  styleUrls: ['./profile-master.component.scss']
})
export class ProfileMasterComponent implements OnInit {

  selected : boolean;
  selectedvalue : number;
  itsId2:any;
  itsId3:any;
  name:any
  itsID:any;
  id: any;
  page:any;
  SalaryPage:any;
  public profileData = new FacultyProfile();
  constructor(private _router: Router,private _profileService: FacultyProfileService,
    private route: ActivatedRoute,private _authService: AuthService,) {

    this.selected = false;

    this.selectedvalue = 0;
    if (this._router.url == '/admin/profile/personal-info/'+this.profileData.itsId){
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/admin/profile/family-details'+this.profileData.itsId){
      this.selectedvalue = 2;
    }
    else if (this._router.url == '/admin/profile/academic'+this.profileData.itsId){
      this.selectedvalue = 3;
    }
    else if (this._router.url == '/admin/profile/self-info'+this.profileData.itsId){
      this.selectedvalue = 4;
    }
    else if (this._router.url == '/admin/profile/khidmat-details'+this.profileData.itsId){
      this.selectedvalue = 5;
    }
    else if (this._router.url == '/admin/profile/mawaze'+this.profileData.itsId){
      this.selectedvalue = 6;
    }
    else if (this._router.url == '/admin/profile/bank-details'+this.profileData.itsId){
      this.selectedvalue = 7;
    }
    else if (this._router.url == '/admin/profile/passport-details'+this.profileData.itsId){
      this.selectedvalue = 8;
    }
    else if (this._router.url == '/admin/profile/enaayat'+this.profileData.itsId){
      this.selectedvalue = 9;
    }
    else if (this._router.url == '/admin/profile/salary'+this.profileData.itsId){
      this.selectedvalue = 10;
    }
    console.log(this._router.url);
  }

  ngOnInit(): void {
    this.page = true;

    this._authService.getAdminSubRights(66).subscribe({
      next: (x) => {
        this.SalaryPage = x.includes(37);

        if (this.SalaryPage == true) {
         
        }
        else{
         
        }
      },
      error: (err) => {
       
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this.itsId2=this._profileService.getITSIDData();
    this.name=this._profileService.getNameData();

    this.profileData = this._profileService.getProfileData();
    this._profileService.getProfileDataObservable().subscribe({
      next: x => {
        this.profileData = x;
        this.check();
        this._profileService.getWafdProfileRight(x.itsId).subscribe({
          next: x => {
            console.log("entered");


          },
          error: err => {
            this.page=false;
            swal('Error!', err.error.message, 'error');
          }
        });
      },
      error: err => {

      }
    });


    // this.itsId2=this._profileService.getITSIDData();

  }


faimalyDetails()
{
 // this._router.navigate(['/admin/profile/family-details', id]);
}

routeLink(link:any,id:any)
{

  this.profileData = this._profileService.getProfileData();
  this._router.navigate([link, this.profileData.itsId]);
  this.selectedvalue=id;
}

check()
{
  if (this._router.url == '/admin/profile/personal-info/'+this.profileData.itsId){
    this.selectedvalue = 1;
  }
  else if (this._router.url == '/admin/profile/family-details'+this.profileData.itsId){
    this.selectedvalue = 2;
  }
  else if (this._router.url == '/admin/profile/academic'+this.profileData.itsId){
    this.selectedvalue = 3;
  }
  else if (this._router.url == '/admin/profile/self-info'+this.profileData.itsId){
    this.selectedvalue = 4;
  }
  else if (this._router.url == '/admin/profile/khidmat-details'+this.profileData.itsId){
    this.selectedvalue = 5;
  }
  else if (this._router.url == '/admin/profile/mawaze'+this.profileData.itsId){
    this.selectedvalue = 6;
  }
  else if (this._router.url == '/admin/profile/bank-details'+this.profileData.itsId){
    this.selectedvalue = 7;
  }
  else if (this._router.url == '/admin/profile/passport-details'+this.profileData.itsId){
    this.selectedvalue = 8;
  }
  else if (this._router.url == '/admin/profile/enaayat'+this.profileData.itsId){
    this.selectedvalue = 9;
  }
  else if (this._router.url == '/admin/profile/salary'+this.profileData.itsId){
    this.selectedvalue = 10;
  }
}

}
