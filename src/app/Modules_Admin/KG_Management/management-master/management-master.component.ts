import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-management-master',
  templateUrl: './management-master.component.html',
  styleUrls: ['./management-master.component.scss']
})
export class ManagementMasterComponent implements OnInit {

  selected : boolean;
  selectedvalue : number;

  constructor(private _router: Router) {
    this.selected = false;

    this.selectedvalue = 0;
    if (this._router.url == '/admin/kg-management/add-kg'){
      this.selectedvalue = 1;
    }
    else if (this._router.url == '/admin/kg-management/bulk-update'){
      this.selectedvalue = 2;
    }
   }

  ngOnInit(): void {
  }

}
