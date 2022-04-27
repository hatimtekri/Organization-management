import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-management-master',
  templateUrl: './bill-management-master.component.html',
  styleUrls: ['./bill-management-master.component.scss']
})
export class BillManagementMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;
  constructor(private _router: Router) {
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/expense/bill-entry-management/vendor-details') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/expense/bill-entry-management/bill-entry') {
      this.selectedvalue = 2;
    }
    else if (this._router.url == '/expense/bill-entry-management/bills') {
      this.selectedvalue = 3;
    }
    else if (this._router.url == '/expense/bill-entry-management/approve-reject-bill') {
      this.selectedvalue = 4;
    }
    else if (this._router.url == '/expense/bill-entry-management/vendor-ledger') {
      this.selectedvalue = 5;
    }
    else if (this._router.url == '/expense/bill-entry-management/payment-from-bank-selection') {
      this.selectedvalue = 6;
    }
    else if (this._router.url == '/expense/bill-entry-management/tobepaid-bills') {
      this.selectedvalue = 7;
    }
    else if (this._router.url == '/expense/bill-entry-management/vendor-payments') {
      this.selectedvalue = 8;
    }


    console.log(this._router.url);
  }

  ngOnInit(): void {
  }

}
