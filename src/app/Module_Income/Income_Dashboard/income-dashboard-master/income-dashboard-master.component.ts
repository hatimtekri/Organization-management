import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income-dashboard-master',
  templateUrl: './income-dashboard-master.component.html',
  styleUrls: ['./income-dashboard-master.component.scss']
})
export class IncomeDashboardMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;
  constructor(private _router: Router) {
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/income/income-dashboard/actual-income') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/income/income-dashboard/accrual-income') {
      this.selectedvalue = 2;
    }


    console.log(this._router.url);
  }

  ngOnInit(): void {
  }

}
