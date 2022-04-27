import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// import { AdminModule } from './Modules_Admin/admin.module';
// import { DashboardModule } from './Modules_Dashboard/dashboard.module';
// import { EnayatModule } from './Module_Enayat/enayat.module';
// import { ExpenseModule } from './Module_Expense/expense.module';
// import { IncomeModule } from './Module_Income/income.module';
// import { LoginModule } from './Module_Login/login.module';
const routes: Routes = [

 
  {
    path: 'dashboard',
    loadChildren:() => import('./Modules_Dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  {
    path: 'adminlogin',
    loadChildren:() => import('./Module_Login/login.module').then(m => m.LoginModule)  
  },
  {
    path: 'admin',
    loadChildren:() => import('./Modules_Admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path: 'enayat',
    loadChildren:() => import('./Module_Enayat/enayat.module').then(m => m.EnayatModule)  
  },
  {
    path: 'income',
    loadChildren:() => import('./Module_Income/income.module').then(m => m.IncomeModule) 
  },
  {
    path: 'expense',
    loadChildren:() =>import('./Module_Expense/expense.module').then(m => m.ExpenseModule)  
  },
  {path:'',redirectTo:'adminlogin',pathMatch:'full'},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
