import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
declare var swal: any;

@Component({
  selector: 'app-budget-master',
  templateUrl: './budget-master.component.html',
  styleUrls: ['./budget-master.component.scss']
})
export class BudgetMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;
  onOffAraz: any;
  onOffModule: any;

  constructor(private _router: Router,
    private _loader: LoaderService,
    private _authService: AuthService,
    private _profileService: FacultyProfileService) {
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/expense/budget-management/budget-araz') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/expense/budget-management/budget-audit') {
      this.selectedvalue = 2;
    }
    else if (this._router.url == '/expense/budget-management/budget-sanction') {
      this.selectedvalue = 3;
    }
    else if (this._router.url == '/expense/budget-management/dept-venue-cash-wallet') {
      this.selectedvalue = 4;
    }
  }

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminSubRights(55).subscribe({
      next: (x) => {
        this.onOffAraz = x.includes(49);


        this._loader.callLoaderMethod('hide');

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._profileService.getModuleStatus(5).subscribe({
      next: (x) => {

        this.onOffModule = x;


      },
      error: (err) => {

      },
    });
  }

  changeModuleStatus() {
    
    // var r = confirm("Are you sure you want to Active/Deactive Wajebaat Niyyat Entry Module?");
    // if (r == false) {
    //   return;
    //}
    let a = {};
    // this._loader.callLoaderMethod('show');

    this._profileService.changeModuleStatus(a, 5).subscribe({
      next: (x) => {
        this.ngOnInit();
        this._loader.callLoaderMethod('hide');
        

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log('Error');
      },
    });
  }

}
