import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { User } from 'src/app/AAAA_Models/User-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.scss']
})
export class NavigationsComponent implements OnInit {
  constructor(private _router: Router,private titleService: Title ,private _loader: LoaderService, private _authService: AuthService, private _profileService: FacultyProfileService,) {
  
   }
  public income:any;
  public enayat:any;
  public kgs:any;
  public expense:any;

  public profileData = new FacultyProfile();
  public user1 = new User();
  ngOnInit(): void {
    if (localStorage.getItem('countnew') == '1') {
      localStorage.removeItem('countnew');
      localStorage.setItem('countnew', '2');
      window.location.reload();
   //  this.ngOnInit();
    }


    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.income = x.includes(69);
        this.enayat = x.includes(75);
        this.kgs = x.includes(76);
        this.expense = x.includes(82);

        if (this.income == true) {
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

    this._authService.getUser().subscribe({
      next: (x) => {
        this.user1 = x;

        this._profileService.setITSIDData3(this.user1.itsId);
        console.log(JSON.stringify(x));
      },
      error: (er) => { },
    });
  }
  logout() {

    localStorage.removeItem('newtoken');
    this._router.navigate(['/adminlogin']);
    localStorage.removeItem('countnew');
  }
}
