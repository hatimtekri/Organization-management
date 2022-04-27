import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-master',
  templateUrl: './medical-master.component.html',
  styleUrls: ['./medical-master.component.scss']
})
export class MedicalMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;
  constructor(private _router: Router,private titleService: Title) {
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/enayat/medical/billclearance-audit') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/enayat/medical/applicantbills') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/enayat/medical/billentries-status') {
      this.selectedvalue = 2;
    }
    else if (this._router.url == '/enayat/medical/mumbai-audit') {
      this.selectedvalue = 3;
    }
    else if (this._router.url == '/enayat/medical/final-sanction') {
      this.selectedvalue = 4;
    }

    console.log(this._router.url);

    this.titleService.setTitle("MZ Enayat");
  }

  ngOnInit(): void {
  }

}
