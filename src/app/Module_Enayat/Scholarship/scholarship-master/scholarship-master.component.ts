import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scholarship-master',
  templateUrl: './scholarship-master.component.html',
  styleUrls: ['./scholarship-master.component.scss']
})
export class ScholarshipMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;
  constructor(private _router: Router) {
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/enayat/scholarship/billclearance-audit') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/enayat/scholarship/applicantbills') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/enayat/scholarship/billentries-status') {
      this.selectedvalue = 2;
    }
    else if (this._router.url == '/enayat/scholarship/mumbai-audit') {
      this.selectedvalue = 3;
    }
    else if (this._router.url == '/enayat/scholarship/final-sanction') {
      this.selectedvalue = 4;
    }

    console.log(this._router.url);
  }

  ngOnInit(): void {
  }

}
