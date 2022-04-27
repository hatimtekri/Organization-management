import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scholarship } from 'src/app/AAAA_Models/Scholarship-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { ScholarshipService } from 'src/app/Modules_Admin/Services/scholarship.service';
import { AuthService } from 'src/app/Services/auth.service';

declare var swal: any;
@Component({
  selector: 'app-scholar-applicantbills',
  templateUrl: './scholar-applicantbills.component.html',
  styleUrls: ['./scholar-applicantbills.component.scss']
})
export class ScholarApplicantbillsComponent implements OnInit {

  constructor(
    private _scholarshipService: ScholarshipService,
    private route: ActivatedRoute,
    private _router: Router,
    private _loader: LoaderService,
    private _authService:AuthService

  ) { }

  public selectAll: boolean | undefined;
  public ScholarBillsList = Array<Scholarship>();
  public userData = new Scholarship();
  page=false;
  id = '0';

  ngOnInit(): void {

    this.selectAll = false;

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(60);

        if (this.page == true) {
          const id1 = this.route.snapshot.paramMap.get('id');

          this.id = id1 ?? '0';
          this._loader.callLoaderMethod('show');
          this._scholarshipService.getApplicantBills(this.id).subscribe({
            next: (x) => {
              this._loader.callLoaderMethod('hide');
              this.ScholarBillsList = x.billModel;
              this.userData = x.userdata;

              this.calculateSummary();

              // this.userData.spouseAmount = 0;
              // this.userData.childerenAmount = 0;
            },
            error: (err) => {
              this._loader.callLoaderMethod('hide');
              swal('Error!', err.error.message, 'error');
            },
          });
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  changeAmount(m: Scholarship, amount: number) {
    this._loader.callLoaderMethod('show');
    this.calculateSummary();
    this._loader.callLoaderMethod('hide');
  }
  calculateSummary()
  {
    const i1 = this.ScholarBillsList.filter(
      ({ relationTypeId }) => relationTypeId == 1
    ).reduce((sum, record) => sum + (record.amount_billClearance ?? 0), 0);
    this.userData.selfAmount = i1;
    const i2 = this.ScholarBillsList.filter(
      ({ relationTypeId }) => relationTypeId == 2
    ).reduce((sum, record) => sum + (record.amount_billClearance ?? 0), 0);
    this.userData.spouseAmount = i2;
    const i3 = this.ScholarBillsList.filter(
      ({ relationTypeId }) =>
      relationTypeId == 3 || relationTypeId == 4 || relationTypeId == 5
    ).reduce((sum, record) => sum + (record.amount_billClearance ?? 0), 0);
    this.userData.childerenAmount = i3;

    this.userData.totalAmount =
      this.userData.selfAmount +
      this.userData.spouseAmount +
      this.userData.childerenAmount;

  }
  select() {
    if (this.selectAll == true) {
      for (var y in this.ScholarBillsList) {
        this.ScholarBillsList[y].select = true;
      }
    } else {
      for (var y in this.ScholarBillsList) {
        this.ScholarBillsList[y].select = false;
      }
    }
  }
  AcceptBills(s: string) {
    this._scholarshipService.ChangeBillStatus(s, this.ScholarBillsList).subscribe({
      next: (x) => {
        this.ngOnInit();
      },
      error: (err) => {},
    });
  }

  submitSuratAudit()
  {
    this._loader.callLoaderMethod('show');
    this._scholarshipService.submitSuratAudit(this.ScholarBillsList).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this._router.navigate(['/admin/scholarship/billclearance-audit']);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');

      },
    });
  }

}
