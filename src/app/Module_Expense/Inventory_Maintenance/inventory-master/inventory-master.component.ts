import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-master',
  templateUrl: './inventory-master.component.html',
  styleUrls: ['./inventory-master.component.scss']
})
export class InventoryMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;
  constructor(private _router: Router) {
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/expense/inventory-maintenance/baseitem') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/expense/inventory-maintenance/item') {
      this.selectedvalue = 2;
    }
    else if (this._router.url == '/expense/inventory-maintenance/dept-venue') {
      this.selectedvalue = 3;
    }
    else if (this._router.url == '/expense/inventory-maintenance/item-baseitem') {
      this.selectedvalue = 4;
    }



    console.log(this._router.url);
  }

  ngOnInit(): void {
  }

}
