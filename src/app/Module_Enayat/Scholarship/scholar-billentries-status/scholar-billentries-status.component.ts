import { Component, OnInit } from '@angular/core';
import { Medical } from 'src/app/AAAA_Models/Medical-Model';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { Scholarship } from 'src/app/AAAA_Models/Scholarship-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { ScholarshipService } from 'src/app/Modules_Admin/Services/scholarship.service';

declare var swal: any;


@Component({
  selector: 'app-scholar-billentries-status',
  templateUrl: './scholar-billentries-status.component.html',
  styleUrls: ['./scholar-billentries-status.component.scss']
})
export class ScholarBillentriesStatusComponent implements OnInit {

  constructor(private _scholarService: ScholarshipService, private _loader: LoaderService, private _medicalService:MedicalService) { }
  public MedicalEntriesStatusList = Array<Scholarship>();
  searchText: any;
  total: any;
  originalBills: any;
  suratAudit: any;

  ngOnInit(): void {
    this._loader.callLoaderMethod('show');
    this._scholarService.getBillEntriesAndStatus().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        //console.log(JSON.stringify(x));
        this.MedicalEntriesStatusList = x.model;
        this.total = x.total;
        this.suratAudit = x.suratAudit;
        this.originalBills = x.originalBills;



      },
      error: (err) => { },
    });

  }


  openBulk(id:any)
  {

    this._loader.callLoaderMethod('show');
    this._scholarService.getBulkBills(id).subscribe({
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
