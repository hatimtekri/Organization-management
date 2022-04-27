import { Component, OnInit } from '@angular/core';
import { Medical } from 'src/app/AAAA_Models/Medical-Model';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { AuthService } from 'src/app/Services/auth.service';
declare var swal: any;
@Component({
  selector: 'app-medical-billentries-status',
  templateUrl: './medical-billentries-status.component.html',
  styleUrls: ['./medical-billentries-status.component.scss']
})
export class MedicalBillentriesStatusComponent implements OnInit {

  constructor(private _medicalService: MedicalService,private _loader: LoaderService,private _authService:AuthService) { }
  public MedicalEntriesStatusList = Array<Medical>();
  searchText:any;
  total:any;
  originalBills:any;
  suratAudit:any;
  page:any;
  ngOnInit(): void {


    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(61);

        if (this.page == true) {
          this.get();
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




  }
  get()
  {
    this._loader.callLoaderMethod('show');
    this._medicalService.getBillEntriesAndStatus().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        //console.log(JSON.stringify(x));
        this.MedicalEntriesStatusList = x.model;
        this.total = x.total;
        this.suratAudit = x.suratAudit;
        this.originalBills = x.originalBills;



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  openBulk(id:any)
  {

    this._loader.callLoaderMethod('show');
    this._medicalService.getBulkBills(id).subscribe({
      next: (x) => {
        //console.log(JSON.stringify(x));
        this._loader.callLoaderMethod('hide');
        window.open("https://mahadalzahra.org/uploads/medicalBills/bulkbillpdf.pdf");
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

  }

  printBillSummary(itsid:string)
  {
    let report = new ReportFilter();

    report.id = 20;

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

    report.id = 18;

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
