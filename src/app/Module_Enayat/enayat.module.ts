import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnayatRoutingModule } from './enayat-routing.module';
import { EnayatMasterComponent } from './enayat-master/enayat-master.component';

import { MedicalMasterComponent } from './Medical/medical-master/medical-master.component';
import { BillclearanceAuditComponent } from './Medical/billclearance-audit/billclearance-audit.component';
import { ApplicantbillsComponent } from './Medical/applicantbills/applicantbills.component';
import { ScholarshipMasterComponent } from './Scholarship/scholarship-master/scholarship-master.component';
import { ScholarBillclearanceAuditComponent } from './Scholarship/scholar-billclearance-audit/scholar-billclearance-audit.component';
import { ScholarApplicantbillsComponent } from './Scholarship/scholar-applicantbills/scholar-applicantbills.component';
import { MedicalBillentriesStatusComponent } from './Medical/medical-billentries-status/medical-billentries-status.component';
import { MedicalMumbaiauditComponent } from './Medical/medical-mumbaiaudit/medical-mumbaiaudit.component';
import { MedicalFinalsanctionComponent } from './Medical/medical-finalsanction/medical-finalsanction.component';
import { HistoryMasterComponent } from './Enayat_History/history-master/history-master.component';

import { TermYearWiseComponent } from './Enayat_History/term-year-wise/term-year-wise.component';
import { IndividualComponent } from './Enayat_History/individual/individual.component';
import { MedicalHistoryComponent } from './Enayat_History/medical-history/medical-history.component';
import { ScholarshipHistoryComponent } from './Enayat_History/scholarship-history/scholarship-history.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';


import { SearchnewPipe } from '../AAAA_FilterPipe/searchnew.pipe';

import { ScholarFinalsanctionComponent } from './Scholarship/scholar-finalsanction/scholar-finalsanction.component';
import { ScholarBillentriesStatusComponent } from './Scholarship/scholar-billentries-status/scholar-billentries-status.component';
import { ScholarMumbaiauditComponent } from './Scholarship/scholar-mumbaiaudit/scholar-mumbaiaudit.component';
import { CustomMaterialModule } from '../AAAA_custom-material/custom-material';


@NgModule({
  declarations: [
    SearchnewPipe,
    EnayatMasterComponent,
    ScholarshipHistoryComponent,
    MedicalHistoryComponent,
    IndividualComponent,
    TermYearWiseComponent,
    HistoryMasterComponent,
    MedicalFinalsanctionComponent,
    MedicalMumbaiauditComponent,
    MedicalBillentriesStatusComponent,
    ScholarApplicantbillsComponent,
    ScholarBillclearanceAuditComponent,
    ScholarshipMasterComponent,
    ApplicantbillsComponent,
    BillclearanceAuditComponent,
    MedicalMasterComponent,
    ScholarFinalsanctionComponent,
    ScholarBillentriesStatusComponent,
    ScholarMumbaiauditComponent
  ],
  imports: [
    CommonModule,
    EnayatRoutingModule,
    CustomMaterialModule,
    
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnayatModule {
  constructor() {
    console.log("Enayat Module");
  }
}
