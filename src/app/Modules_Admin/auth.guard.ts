import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authservice: AuthService, private _router: Router) {

  }

  canActivate(): boolean {
    debugger;
    if (this._authservice.getAdminLoogedIn()) {
      //return true;


      this._authservice.getTokenVerification().subscribe({
        next: x => {
          if (x == true) {
            
            return true;

          }
          else {
            this._router.navigate(['/adminlogin']);

            return false;
          }
        },
        error: err => {

          this._router.navigate(['/adminlogin']);

          return false;

        }
      });
      this._router.navigate(['/adminlogin']);

      return false;
      //   if(this._authservice.getisVarifted())
      // {
      //   return true;
      // }
      // else
      // {
      //   return false;
      // }
    }
    else {
      this._router.navigate(['/adminlogin']);
      return false;

    }


  }
}


