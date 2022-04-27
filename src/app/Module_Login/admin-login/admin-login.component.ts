import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorStatus } from 'src/app/AAAA_Models/ErrorStatus-Model';
import { LoginUser } from 'src/app/AAAA_Models/LoginUser-Model';
import { AuthService } from 'src/app/Services/auth.service';
declare var swal: any;

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public loginData=new LoginUser();

  public name="hatim";

 status=new ErrorStatus(false,'','');
 constructor( private _spinner: NgxSpinnerService, private _router:Router,private titleService: Title,private _authService:AuthService) {

   //localStorage.removeItem('token');
   this.titleService.setTitle("MZ Admin Login");

  }

 ngOnInit(): void {
   //console.log('Login page loaded');
   //localStorage.removeItem('token');
   //localStorage.removeItem('count');

   // if(localStorage.getItem('token'))
   // {
   //   localStorage.setItem('count','1');
   //   this._router.navigate(['/faculty']);

   // }



}


 loginButton()
{
  this._spinner.show();
  this._authService.getadminLoginAuth(this.loginData).subscribe({
    next:x=>
    {
      localStorage.setItem('newtoken',x);
      localStorage.setItem('countnew','1');
      this._router.navigate(['/dashboard']);
      this._spinner.hide();
    },
    error:err=>
    {
      this._spinner.hide();
      swal('Error..!',err.error.message , 'error');


    }
  });


 //console.log(this.loginData);
}

callAPi()
{


}

}
