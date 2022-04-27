import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medical } from 'src/app/AAAA_Models/Medical-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { AuthService } from 'src/app/Services/auth.service';

declare var swal: any;

@Component({
  selector: 'app-medical-mumbaiaudit',
  templateUrl: './medical-mumbaiaudit.component.html',
  styleUrls: ['./medical-mumbaiaudit.component.scss'],
})
export class MedicalMumbaiauditComponent implements OnInit {
  constructor(
    private _medicalService: MedicalService,
    private _loader: LoaderService,
    private _router: Router,
    private _authService:AuthService,

  ) {}
  public MedicaldataForMumbaiAudit = Array<Medical>();

  public MedicaldataForMumbaiAudit_part2 = Array<Medical>();

  searchText: any;
  searchText1: any;
  pending: any;
  pending2: any;
  selectAll: any;
  selectAll2: any;
  page:any;
  ngOnInit(): void {







    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(62);

        if (this.page == true) {
          this.get();
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });





  }

  submitPart1(data: Medical) {
    this._loader.callLoaderMethod('show');
    this._medicalService.submitMumbaiAudit_Part1(data).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  submitBulkPart1() {
    this._loader.callLoaderMethod('show');
    this._medicalService
      .submitMumbaiAudit_Bulk_Part1(this.MedicaldataForMumbaiAudit)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
  }

  submitPart2(data: Medical) {
    this._loader.callLoaderMethod('show');
    this._medicalService.submitMumbaiAudit_Part2(data).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  submitBulkPart2() {
    this._loader.callLoaderMethod('show');
    this._medicalService
      .submitMumbaiAudit_Bulk_Part2(this.MedicaldataForMumbaiAudit_part2)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
  }



  select() {
    if (this.selectAll == true) {
      for (var y in this.MedicaldataForMumbaiAudit) {
        this.MedicaldataForMumbaiAudit[y].selected = true;
      }
    } else {
      for (var y in this.MedicaldataForMumbaiAudit) {
        this.MedicaldataForMumbaiAudit[y].selected = false;
      }
    }
  }

  select2() {
    if (this.selectAll2 == true) {
      for (var y in this.MedicaldataForMumbaiAudit_part2) {
        this.MedicaldataForMumbaiAudit_part2[y].selected = true;
      }
    } else {
      for (var y in this.MedicaldataForMumbaiAudit_part2) {
        this.MedicaldataForMumbaiAudit_part2[y].selected = false;
      }
    }
  }

get()
{
  this._loader.callLoaderMethod('show');
    this._medicalService.getDataForMumbaiAudit().subscribe({
      next: (x) => {
       // this._loader.callLoaderMethod('hide');
        this.MedicaldataForMumbaiAudit = x.model;
        this.pending = x.pending;

        //this._loader.callLoaderMethod('show');
        this._medicalService.getDataForMumbaiAudit_Part2().subscribe({
          next: (x) => {
            this._loader.callLoaderMethod('hide');
           // console.log(JSON.stringify(this.MedicaldataForMumbaiAudit_part2));
            this.MedicaldataForMumbaiAudit_part2 = x.model;
            this.pending2 = x.pending;
          },
          error: (err) => {
            this._loader.callLoaderMethod('hide');
            swal('Error!', err.error.message, 'error');
          },
        });
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

}

backtoPart1()
{
  this._loader.callLoaderMethod('show');
  this._medicalService
    .Backtopart1(this.MedicaldataForMumbaiAudit_part2)
    .subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
}

}
