import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medical } from 'src/app/AAAA_Models/Medical-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { AuthService } from 'src/app/Services/auth.service';

declare var swal: any;
@Component({
  selector: 'app-applicantbills',
  templateUrl: './applicantbills.component.html',
  styleUrls: ['./applicantbills.component.scss'],
})
export class ApplicantbillsComponent implements OnInit {
  constructor(
    private _medicalService: MedicalService,
    private route: ActivatedRoute,
    private _router: Router,
    private _loader: LoaderService,
    private _authService:AuthService
  ) {}

  public selectAll: boolean | undefined;
  public MedicalBillsList = Array<Medical>();
  public userData = new Medical();
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
          this._medicalService.getApplicantBills(this.id).subscribe({
            next: (x) => {
              this._loader.callLoaderMethod('hide');
              this.MedicalBillsList = x.billModel;
              this.userData = x.userdata;

              this.calculateSummary();

              // this.userData.spouseAmount = 0;
              // this.userData.childerenAmount = 0;
            },
            error: (err) => {},
          });
        }

      },
      error: (err) => {},
    });



  }

  AcceptBills(s: string) {
    this._medicalService.ChangeBillStatus(s, this.MedicalBillsList).subscribe({
      next: (x) => {
        this.ngOnInit();
      },
      error: (err) => {},
    });
  }
  changeAmount(m: Medical, amount: number) {
    this._loader.callLoaderMethod('show');
    this.calculateSummary();
    this._loader.callLoaderMethod('hide');
  }

  select() {
    if (this.selectAll == true) {
      for (var y in this.MedicalBillsList) {
        this.MedicalBillsList[y].select = true;
      }
    } else {
      for (var y in this.MedicalBillsList) {
        this.MedicalBillsList[y].select = false;
      }
    }
  }

  submitSuratAudit() {
    this._loader.callLoaderMethod('show');
    this._medicalService.submitSuratAudit(this.MedicalBillsList).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this._router.navigate(['/enayat/medical/billclearance-audit']);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');

      },
    });
  }

  calculateSummary()
  {
    const i1 = this.MedicalBillsList.filter(
      ({ billRelation }) => billRelation == 1
    ).reduce((sum, record) => sum + (record.amount_billClearance ?? 0), 0);
    this.userData.selfAmount = i1;
    const i2 = this.MedicalBillsList.filter(
      ({ billRelation }) => billRelation == 2
    ).reduce((sum, record) => sum + (record.amount_billClearance ?? 0), 0);
    this.userData.spouseAmount = i2;
    const i3 = this.MedicalBillsList.filter(
      ({ billRelation }) =>
        billRelation == 3 || billRelation == 4 || billRelation == 5
    ).reduce((sum, record) => sum + (record.amount_billClearance ?? 0), 0);
    this.userData.childerenAmount = i3;

    this.userData.billAmount =
      this.userData.selfAmount +
      this.userData.spouseAmount +
      this.userData.childerenAmount;

  }
}
