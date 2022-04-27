import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medical } from 'src/app/AAAA_Models/Medical-Model';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { AuthService } from 'src/app/Services/auth.service';

declare var swal: any;
@Component({
  selector: 'app-billclearance-audit',
  templateUrl: './billclearance-audit.component.html',
  styleUrls: ['./billclearance-audit.component.scss'],
})
export class BillclearanceAuditComponent implements OnInit {
  players = [
    { id: 1, name: 'Cristiano Ronaldo' },
    { id: 2, name: 'Lionel Messi' },
    { id: 3, name: 'Neymar Jr' },
    { id: 4, name: 'Toni Kroos' },
    { id: 5, name: 'Luiz Suarez' },
    { id: 6, name: 'Karim Benzema' },
    { id: 7, name: 'Eden Hazard' },
  ];

  searchText = "";
  true = true;
  total = 0;
  originalBills = 0;
  audited = 0;
  pending = 0;

  public MedicalPendingList = Array<Medical>();
  public MedicalsuratAuditList = Array<Medical>();
  public MedicalEntriesStatusList = Array<Medical>();
  page = false;
  constructor(
    private _medicalService: MedicalService,
    private _router: Router,
    private _loader: LoaderService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('countnew') == '1') {
      localStorage.removeItem('countnew');
      localStorage.setItem('countnew', '2');
      window.location.reload();
    }

    this._medicalService.getBillEntriesAndStatus().subscribe({
      next: (x) => {

        console.log(JSON.stringify(x));
        this.MedicalEntriesStatusList = x;
      },
      error: (err) => { },
    });

    this.getSuratAudit();
    this.getSummaryCount();

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(59);

        if (this.page == true) {
          this._loader.callLoaderMethod('show');
          this._medicalService.getPendingMedical().subscribe({
            next: (x) => {
              this._loader.callLoaderMethod('hide');
              this.MedicalPendingList = x.billModel;

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

  loadBills(id: number) {
    this._router.navigate(['/enayat/medical/applicantbills', id]);
  }

  changeoriginalbillstatus(data: Medical) {
    this._loader.callLoaderMethod('show');
    this._medicalService.ChangeOriginalBillStatus(data).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }

  getSuratAudit() {
    this._loader.callLoaderMethod('show');
    this._medicalService.getSuratAuditBills().subscribe({
      next: (x) => {
        //console.log(JSON.stringify(x));
        this._loader.callLoaderMethod('hide');
        this.MedicalsuratAuditList = x.billModel;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }
  getSummaryCount() {
    this._loader.callLoaderMethod('show');
    this._medicalService.getSummaryCount().subscribe({
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

  openBulk(id: any) {

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

  printBillSummary(itsid: string) {
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
  printBills(itsid: string, currency: string) {
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
