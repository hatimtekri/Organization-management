import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
declare var swal: any;

@Component({
  selector: 'app-fee-master',
  templateUrl: './fee-master.component.html',
  styleUrls: ['./fee-master.component.scss']
})
export class FeeMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;
  changePset: any;
  onOffModule: any;
  constructor(private _router: Router,private _authService:AuthService, private _loader: LoaderService,private _profileService: FacultyProfileService) {
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/income/fee-management/fee-category') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/income/fee-management/fee-allocation') {
      this.selectedvalue = 2;
    }
    else if (this._router.url == '/income/fee-management/fee-receipt') {
      this.selectedvalue = 3;
    }
    else if (this._router.url == '/income/fee-management/fee-ledger') {
      this.selectedvalue = 4;
    }
    else if (this._router.url == '/income/fee-management/receipt-statement') {
      this.selectedvalue = 5;
    }
    else if (this._router.url == '/income/fee-management/ewallet-ledger') {
      this.selectedvalue = 6;
    }
    else if (this._router.url == '/income/fee-management/manual-online') {
      this.selectedvalue = 7;
    }
    else if (this._router.url == '/income/fee-management/sundry-payment') {
      this.selectedvalue = 8;
    }
    else if (this._router.url == '/income/fee-management/sundry-receipt') {
      this.selectedvalue = 9;
    }


    console.log(this._router.url);
  }

  ngOnInit(): void {
    this._loader.callLoaderMethod('show');
    this._authService.getAdminSubRights(72).subscribe({
      next: (x) => {
        this.changePset = x.includes(42);

        if (this.changePset == true) {
          
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

    this._profileService.getModuleStatus(1).subscribe({
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

    this._profileService.changeModuleStatus(a, 1).subscribe({
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
