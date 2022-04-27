import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationsComponent } from './navigations/navigations.component';


const routes: Routes = [
  {

    path: '', component: NavigationsComponent,
    //canActivate:[AuthGuard],
    
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
