import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { Scholarship } from 'src/app/AAAA_Models/Scholarship-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { ScholarshipService } from 'src/app/Modules_Admin/Services/scholarship.service';
import { AuthService } from 'src/app/Services/auth.service';

declare var swal: any;

@Component({
  selector: 'app-scholar-billclearance-audit',
  templateUrl: './scholar-billclearance-audit.component.html',
  styleUrls: ['./scholar-billclearance-audit.component.scss']
})
export class ScholarBillclearanceAuditComponent implements OnInit {

  constructor(private _scholarshipService: ScholarshipService,
    private _router: Router,
    private _loader: LoaderService,
    private _authService: AuthService,
    private _medicalService:MedicalService
    ) { }

  searchText="";
  true = true;
  total = 0;
  originalBills = 0;
  audited = 0;
  pending = 0;

  public ScholarshipPendingList = Array<Scholarship>();
  public ScholashipsuratAuditList = Array<Scholarship>();
  page = false;

  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(59);

        if (this.page == true) {
          this._loader.callLoaderMethod('show');
          this._scholarshipService.getPendingScholarship().subscribe({
            next: (x) => {
              this._loader.callLoaderMethod('hide');
              this.ScholarshipPendingList = x.billModel;
               this.getSuratAudit();
               this.getSummaryCount();
            },
            error: (err) => {
              this._loader.callLoaderMethod('hide');
            },
          });
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });


  }
  changeoriginalbillstatus(data:Scholarship)
  {
    this._loader.callLoaderMethod('show');
    this._scholarshipService.ChangeOriginalBillStatus(data).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }
  loadBills(id:number)
  {
    this._router.navigate(['/enayat/scholarship/applicantbills', id]);
  }
  getSuratAudit() {
    this._loader.callLoaderMethod('show');
    this._scholarshipService.getSuratAuditBills().subscribe({
      next: (x) => {
       // console.log(JSON.stringify(x));
        this._loader.callLoaderMethod('hide');
        this.ScholashipsuratAuditList = x.billModel;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }
  getSummaryCount() {
    this._loader.callLoaderMethod('show');
    this._scholarshipService.getSummaryCount().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.total = x.totaluser;
        this.originalBills = x.originalbills;
        this.audited = x.audited;
        this.pending = x.totaluser - x.audited;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }

  openBulk(id:any)
  {

    this._loader.callLoaderMethod('show');
    this._scholarshipService.getBulkBills(id).subscribe({
      next: (x) => {
        //console.log(JSON.stringify(x));
        this._loader.callLoaderMethod('hide');
        window.open("https://mahadalzahra.org/uploads/ScholarshipAttachments/bulkbillpdf.pdf");
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

  }

  printBillSummary(itsid:string)
  {
    let report = new ReportFilter();

    report.id = 23;

    report.itsId = itsid;
    this._loader.callLoaderMethod('show');
    this._medicalService.printReport(report).subscribe({
      next: x => {
        this._loader.callLoaderMethod('hide');
        window.open(x);
      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      }
    });

  }
  printBills(itsid:string,currency:string)
  {
    let report = new ReportFilter();

    if (currency === 'INR') {
      report.id = 21;
    }
    else {
      report.id = 22;
    }

    report.itsId = itsid;
    this._loader.callLoaderMethod('show');
    this._medicalService.printReport(report).subscribe({
      next: x => {
        this._loader.callLoaderMethod('hide');
        window.open(x);
      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      }
    });

  }
}
