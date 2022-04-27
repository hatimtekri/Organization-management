import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medical } from 'src/app/AAAA_Models/Medical-Model';
import { Scholarship } from 'src/app/AAAA_Models/Scholarship-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { ScholarshipService } from 'src/app/Modules_Admin/Services/scholarship.service';
import { AuthService } from 'src/app/Services/auth.service';

declare var swal: any;

@Component({
  selector: 'app-scholar-mumbaiaudit',
  templateUrl: './scholar-mumbaiaudit.component.html',
  styleUrls: ['./scholar-mumbaiaudit.component.scss']
})
export class ScholarMumbaiauditComponent implements OnInit {

  constructor(
    private _scholarService: ScholarshipService,
    private _loader: LoaderService,
    private _router: Router,
    private _authService:AuthService
  ) {}
  public scholardataForMumbaiAudit_part1 = Array<Scholarship>();
  public scholardataForMumbaiAudit_part2 = Array<Scholarship>();
  page=false;

 // public ScholardataForMumbaiAudit_part2 = Array<Scholarship>();

  searchText: any;
  pending: any;
  pending2: any;
  selectAll: any;
  selectAll2: any;

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(64);
        this._loader.callLoaderMethod('hide');
        if (this.page == true) {
          this._loader.callLoaderMethod('show');
          this._scholarService.getDataForMumbaiAudit().subscribe({
            next: (x) => {
             // this._loader.callLoaderMethod('hide');
              this.scholardataForMumbaiAudit_part1 = x.model;
              this.pending = x.pending;
              this._loader.callLoaderMethod('hide');
              this._loader.callLoaderMethod('show');
              this._scholarService.getDataForMumbaiAudit_Part2().subscribe({
                next: (x) => {
                  this._loader.callLoaderMethod('hide');
                 // console.log(JSON.stringify(this.MedicaldataForMumbaiAudit_part2));
                  this.scholardataForMumbaiAudit_part2 = x.model;
                  this.pending2 =  this.scholardataForMumbaiAudit_part2.filter(x=>x.display==true).length;
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

      },
      error: (err) => {},
    });




  }



  submitBulkPart1() {
    this._loader.callLoaderMethod('show');
    this._scholarService
      .submitMumbaiAudit_Bulk_Part1(this.scholardataForMumbaiAudit_part1)
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
  submitBulkPart2() {
    this._loader.callLoaderMethod('show');
    this._scholarService
      .submitMumbaiAudit_Bulk_Part2(this.scholardataForMumbaiAudit_part2)
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
  select1() {
    if (this.selectAll == true) {
      for (var y in this.scholardataForMumbaiAudit_part1) {
        this.scholardataForMumbaiAudit_part1[y].selected = true;
      }
    } else {
      for (var y in this.scholardataForMumbaiAudit_part1) {
        this.scholardataForMumbaiAudit_part1[y].selected = false;
      }
    }
  }
  openBulk(id:any,relationId:any,category:any,subcategory:any)
  {
    this._loader.callLoaderMethod('show');
    this._scholarService.getBulkReports(id,relationId,category,subcategory).subscribe({
      next: (x) => {
        //console.log(JSON.stringify(x));
        this._loader.callLoaderMethod('hide');
        window.open("https://mahadalzahra.org/uploads/ScholarshipAttachments/bulkreportpdf.pdf");
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }
  select2() {
    if (this.selectAll2 == true) {
      for (var y in this.scholardataForMumbaiAudit_part2) {
        this.scholardataForMumbaiAudit_part2[y].selected = true;
      }
    } else {
      for (var y in this.scholardataForMumbaiAudit_part2) {
        this.scholardataForMumbaiAudit_part2[y].selected = false;
      }
    }
  }

  backtoPart1()
{
  this._loader.callLoaderMethod('show');
  this._scholarService
    .Backtopart1(this.scholardataForMumbaiAudit_part2)
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
