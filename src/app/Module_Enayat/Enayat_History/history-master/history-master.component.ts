import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-master',
  templateUrl: './history-master.component.html',
  styleUrls: ['./history-master.component.scss']
})
export class HistoryMasterComponent implements OnInit {

  selected: boolean;
  selectedvalue: number;
  constructor(private _router: Router) {
    this.selected = false;
    this.selectedvalue = 0;
    if (this._router.url == '/enayat/enayat-history/medical-history') {
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/enayat/enayat-history/scholarship-history') {
      this.selectedvalue = 2;
    }

    console.log(this._router.url);
  }

  ngOnInit(): void {
  }

}
