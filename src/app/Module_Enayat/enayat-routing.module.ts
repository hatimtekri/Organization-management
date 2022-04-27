import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnayatMasterComponent } from './enayat-master/enayat-master.component';
import { HistoryMasterComponent } from './Enayat_History/history-master/history-master.component';
import { IndividualComponent } from './Enayat_History/individual/individual.component';
import { MedicalHistoryComponent } from './Enayat_History/medical-history/medical-history.component';
import { ScholarshipHistoryComponent } from './Enayat_History/scholarship-history/scholarship-history.component';
import { TermYearWiseComponent } from './Enayat_History/term-year-wise/term-year-wise.component';
import { ApplicantbillsComponent } from './Medical/applicantbills/applicantbills.component';
import { BillclearanceAuditComponent } from './Medical/billclearance-audit/billclearance-audit.component';
import { MedicalBillentriesStatusComponent } from './Medical/medical-billentries-status/medical-billentries-status.component';
import { MedicalFinalsanctionComponent } from './Medical/medical-finalsanction/medical-finalsanction.component';
import { MedicalMasterComponent } from './Medical/medical-master/medical-master.component';
import { MedicalMumbaiauditComponent } from './Medical/medical-mumbaiaudit/medical-mumbaiaudit.component';
import { ScholarApplicantbillsComponent } from './Scholarship/scholar-applicantbills/scholar-applicantbills.component';
import { ScholarBillclearanceAuditComponent } from './Scholarship/scholar-billclearance-audit/scholar-billclearance-audit.component';
import { ScholarBillentriesStatusComponent } from './Scholarship/scholar-billentries-status/scholar-billentries-status.component';
import { ScholarFinalsanctionComponent } from './Scholarship/scholar-finalsanction/scholar-finalsanction.component';
import { ScholarMumbaiauditComponent } from './Scholarship/scholar-mumbaiaudit/scholar-mumbaiaudit.component';
import { ScholarshipMasterComponent } from './Scholarship/scholarship-master/scholarship-master.component';


const routes: Routes = [{

  path: '', component: EnayatMasterComponent,
  //canActivate:[AuthGuard],
  children: [

    {
      path: 'medical', component: MedicalMasterComponent,
      children: [
        { path: 'billclearance-audit', component: BillclearanceAuditComponent },
        { path: 'applicantbills/:id', component: ApplicantbillsComponent },
        { path: 'billentries-status', component: MedicalBillentriesStatusComponent },
        { path: 'mumbai-audit', component: MedicalMumbaiauditComponent },
        { path: 'final-sanction', component: MedicalFinalsanctionComponent },

        { path: '', redirectTo: 'billclearance-audit', pathMatch: 'full' },
      ]
    },
    {
      path: 'scholarship', component: ScholarshipMasterComponent,
      children: [
        { path: 'billclearance-audit', component: ScholarBillclearanceAuditComponent },
        { path: 'applicantbills/:id', component: ScholarApplicantbillsComponent },
        { path: 'billentries-status', component: ScholarBillentriesStatusComponent },
        { path: 'mumbai-audit', component: ScholarMumbaiauditComponent },
        { path: 'final-sanction', component: ScholarFinalsanctionComponent },

        { path: '', redirectTo: 'billclearance-audit', pathMatch: 'full' },
      ]
    },

    {
      path: 'enayat-history', component: HistoryMasterComponent,
      children: [
        { path: 'term-year-wise', component: TermYearWiseComponent },
        { path: 'individual', component: IndividualComponent },
        { path: 'medical-history', component: MedicalHistoryComponent },
        { path: 'scholarship-history', component: ScholarshipHistoryComponent },

        { path: '', redirectTo: 'medical-history', pathMatch: 'full' },
      ]
    },
    { path: '', redirectTo: 'medical', pathMatch: 'full' },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnayatRoutingModule { }
