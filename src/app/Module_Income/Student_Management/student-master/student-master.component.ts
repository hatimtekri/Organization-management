import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-student-master',
  templateUrl: './student-master.component.html',
  styleUrls: ['./student-master.component.scss']
})
export class StudentMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;

  constructor(private _router: Router,private _authService:AuthService, private _loader: LoaderService,) { 
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/income/student-management/student') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/income/student-management/exclude-student') {
      this.selectedvalue = 2;
    }
  }

  ngOnInit(): void {
  }

}
