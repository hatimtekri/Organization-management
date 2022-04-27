import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMasterComponent } from './admin-master/admin-master.component';
import { AuthGuard } from './auth.guard';
// import { HistoryMasterComponent } from './Enayat_History/history-master/history-master.component';
// import { IndividualComponent } from './Enayat_History/individual/individual.component';
// import { MedicalHistoryComponent } from './Enayat_History/medical-history/medical-history.component';
// import { ScholarshipHistoryComponent } from './Enayat_History/scholarship-history/scholarship-history.component';
// import { TermYearWiseComponent } from './Enayat_History/term-year-wise/term-year-wise.component';
import { AcademicComponent } from './Faculty_Profile/academic/academic.component';
import { BankDetailsComponent } from './Faculty_Profile/bank-details/bank-details.component';
import { EnaayatComponent } from './Faculty_Profile/enaayat/enaayat.component';
import { FamilyDetailsComponent } from './Faculty_Profile/family-details/family-details.component';
import { KhidmatDetailsComponent } from './Faculty_Profile/khidmat-details/khidmat-details.component';
import { MawazeComponent } from './Faculty_Profile/mawaze/mawaze.component';
import { PassportDetailsComponent } from './Faculty_Profile/passport-details/passport-details.component';
import { PersonalInfoComponent } from './Faculty_Profile/personal-info/personal-info.component';
import { ProfileMasterComponent } from './Faculty_Profile/profile-master/profile-master.component';
import { SalaryComponent } from './Faculty_Profile/salary/salary.component';
import { SelfInfoComponent } from './Faculty_Profile/self-info/self-info.component';
import { HrMasterComponent } from './Human_Resources/hr-master/hr-master.component';
import { KhidmatGuzaarComponent } from './Human_Resources/khidmat-guzaar/khidmat-guzaar.component';
import { AddKgComponent } from './KG_Management/add-kg/add-kg.component';
import { BulkUpdateComponent } from './KG_Management/bulk-update/bulk-update.component';
import { ManagementMasterComponent } from './KG_Management/management-master/management-master.component';
// import { ApplicantbillsComponent } from './Medical/applicantbills/applicantbills.component';
// import { BillclearanceAuditComponent } from './Medical/billclearance-audit/billclearance-audit.component';
// import { MedicalBillentriesStatusComponent } from './Medical/medical-billentries-status/medical-billentries-status.component';
// import { MedicalFinalsanctionComponent } from './Medical/medical-finalsanction/medical-finalsanction.component';
// import { MedicalMasterComponent } from './Medical/medical-master/medical-master.component';
// import { MedicalMumbaiauditComponent } from './Medical/medical-mumbaiaudit/medical-mumbaiaudit.component';
// import { TestComponent } from './Medical/test/test.component';
// import { ScholarApplicantbillsComponent } from './Scholarship/scholar-applicantbills/scholar-applicantbills.component';
// import { ScholarBillclearanceAuditComponent } from './Scholarship/scholar-billclearance-audit/scholar-billclearance-audit.component';
// import { ScholarBillentriesStatusComponent } from './Scholarship/scholar-billentries-status/scholar-billentries-status.component';
// import { ScholarFinalsanctionComponent } from './Scholarship/scholar-finalsanction/scholar-finalsanction.component';
// import { ScholarMumbaiauditComponent } from './Scholarship/scholar-mumbaiaudit/scholar-mumbaiaudit.component';
// import { ScholarshipMasterComponent } from './Scholarship/scholarship-master/scholarship-master.component';
import { TrainingMasterComponent } from './Training/training-master/training-master.component';
import { WhTrainingComponent } from './Training/wh-training/wh-training.component';
import { WajebaatMasterComponent } from './Wajebaat/wajebaat-master/wajebaat-master.component';
import { WajebaatTakhmeenComponent } from './Wajebaat/wajebaat-takhmeen/wajebaat-takhmeen.component';

const routes: Routes = [
  {
    path: '', component: AdminMasterComponent,
    //canActivate:[AuthGuard],
    children: [

      // {
      //   path: 'medical', component: MedicalMasterComponent,
      //   children: [
      //     { path: 'billclearance-audit', component: BillclearanceAuditComponent },
      //     { path: 'applicantbills/:id', component: ApplicantbillsComponent },
      //     { path: 'billentries-status', component: MedicalBillentriesStatusComponent },
      //     { path: 'mumbai-audit', component: MedicalMumbaiauditComponent },
      //     { path: 'final-sanction', component: MedicalFinalsanctionComponent },
      //     { path: 'test', component: TestComponent },

      //     { path: '', redirectTo: 'billclearance-audit', pathMatch: 'full' },
      //   ]
      // },

      // {
      //   path: 'scholarship', component: ScholarshipMasterComponent,
      //   children: [
      //     { path: 'billclearance-audit', component: ScholarBillclearanceAuditComponent },
      //     { path: 'applicantbills/:id', component: ScholarApplicantbillsComponent },
      //     { path: 'billentries-status', component: ScholarBillentriesStatusComponent },
      //     { path: 'mumbai-audit', component: ScholarMumbaiauditComponent },
      //     { path: 'final-sanction', component: ScholarFinalsanctionComponent },

      //     { path: '', redirectTo: 'billclearance-audit', pathMatch: 'full' },
      //   ]
      // },

      // {
      //   path: 'enayat-history', component: HistoryMasterComponent,
      //   children: [
      //     { path: 'term-year-wise', component: TermYearWiseComponent },
      //     { path: 'individual', component: IndividualComponent },
      //     { path: 'medical-history', component: MedicalHistoryComponent },
      //     { path: 'scholarship-history', component: ScholarshipHistoryComponent },

      //     { path: '', redirectTo: 'medical-history', pathMatch: 'full' },
      //   ]
      // },

      {
        path: 'hr-master', component: HrMasterComponent,
        children: [
          { path: 'khidmat-guzaar', component: KhidmatGuzaarComponent },

          { path: '', redirectTo: 'khidmat-guzaar', pathMatch: 'full' },
        ]
      },

      {
        path: 'profile', component: ProfileMasterComponent,
        children: [
          { path: 'personal-info/:id', component: PersonalInfoComponent },
          { path: 'family-details/:id', component: FamilyDetailsComponent },
          { path: 'academic/:id', component: AcademicComponent },
          { path: 'self-info/:id', component: SelfInfoComponent },
          { path: 'mawaze/:id', component: MawazeComponent },
          { path: 'bank-details/:id', component: BankDetailsComponent },
          { path: 'passport-details/:id', component: PassportDetailsComponent },
          { path: 'enaayat/:id', component: EnaayatComponent },
          { path: 'khidmat-details/:id', component: KhidmatDetailsComponent },
          { path: 'salary/:id', component: SalaryComponent },

        ]
      },

      {
        path: 'kg-management', component: ManagementMasterComponent,
        children: [
          { path: 'add-kg', component: AddKgComponent },
          { path: 'bulk-update', component: BulkUpdateComponent },

          { path: '', redirectTo: 'add-kg', pathMatch: 'full' },
        ]
      },

      {
        path: 'training', component: TrainingMasterComponent,
        children: [
          { path: 'wh-training', component: WhTrainingComponent },

          { path: '', redirectTo: 'wh-training', pathMatch: 'full' },
        ]
      },

      {
        path: 'wajebaat', component: WajebaatMasterComponent,
        children: [
          { path: 'takhmeen', component: WajebaatTakhmeenComponent },

          { path: '', redirectTo: 'takhmeen', pathMatch: 'full' },
        ]
      },


      { path: '', redirectTo: 'hr-master', pathMatch: 'full' },
    ]



  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
