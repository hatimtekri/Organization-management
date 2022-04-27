import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-hr-master',
  templateUrl: './hr-master.component.html',
  styleUrls: ['./hr-master.component.scss']
})
export class HrMasterComponent implements OnInit {


  search:any;

  constructor(private _authService: AuthService,) { }

  ngOnInit(): void {

    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.search = x.includes(66);

        if (this.search == true) {
         
        }
        else{
        
        }
      },
      error: (err) => {
        
      },
    });

  }

}
