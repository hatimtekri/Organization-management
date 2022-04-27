import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMasterComponent } from './admin-master/admin-master.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { SearchPipe } from '../AAAA_FilterPipe/search.pipe';
import { HrMasterComponent } from './Human_Resources/hr-master/hr-master.component';
import { KhidmatGuzaarComponent } from './Human_Resources/khidmat-guzaar/khidmat-guzaar.component';
import { PersonalInfoComponent } from './Faculty_Profile/personal-info/personal-info.component';
import { ProfileMasterComponent } from './Faculty_Profile/profile-master/profile-master.component';
import { SelfInfoComponent } from './Faculty_Profile/self-info/self-info.component';
import { FamilyDetailsComponent } from './Faculty_Profile/family-details/family-details.component';
import { AcademicComponent } from './Faculty_Profile/academic/academic.component';
import { BankDetailsComponent } from './Faculty_Profile/bank-details/bank-details.component';
import { EnaayatComponent } from './Faculty_Profile/enaayat/enaayat.component';
import { KhidmatDetailsComponent } from './Faculty_Profile/khidmat-details/khidmat-details.component';
import { MawazeComponent } from './Faculty_Profile/mawaze/mawaze.component';
import { PassportDetailsComponent } from './Faculty_Profile/passport-details/passport-details.component';
import { MultisearchPipe } from '../AAAA_FilterPipe/multisearch.pipe';
import { SalaryComponent } from './Faculty_Profile/salary/salary.component';
import { ToastrModule } from 'ngx-toastr';
import { ManagementMasterComponent } from './KG_Management/management-master/management-master.component';
import { AddKgComponent } from './KG_Management/add-kg/add-kg.component';
import { BulkUpdateComponent } from './KG_Management/bulk-update/bulk-update.component';
import { TrainingMasterComponent } from './Training/training-master/training-master.component';
import { WhTrainingComponent } from './Training/wh-training/wh-training.component';
import { CustomMaterialModule } from '../AAAA_custom-material/custom-material';
import { WajebaatMasterComponent } from './Wajebaat/wajebaat-master/wajebaat-master.component';
import { WajebaatTakhmeenComponent } from './Wajebaat/wajebaat-takhmeen/wajebaat-takhmeen.component';


@NgModule({
  declarations: [MultisearchPipe,SearchPipe, AdminMasterComponent, HrMasterComponent, KhidmatGuzaarComponent, PersonalInfoComponent, ProfileMasterComponent, SelfInfoComponent, FamilyDetailsComponent, AcademicComponent, BankDetailsComponent, EnaayatComponent, KhidmatDetailsComponent, MawazeComponent, PassportDetailsComponent, SalaryComponent, ManagementMasterComponent, AddKgComponent, BulkUpdateComponent, TrainingMasterComponent, WhTrainingComponent, WajebaatMasterComponent, WajebaatTakhmeenComponent],
  imports: [
    
    CommonModule,
    AdminRoutingModule,
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
export class AdminModule {


  constructor() {
    console.log("Admin Module");
  }

}
