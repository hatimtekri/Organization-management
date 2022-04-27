import { Component, OnInit } from '@angular/core';
import { EnayatHistorySerach } from 'src/app/AAAA_Models/EnayatHistory_Serach-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
//import { EnayatHistorySerach } from 'src/app/AAAA_Models/EnayatHistory_Serach-model';

declare var swal: any;

@Component({
  selector: 'app-term-year-wise',
  templateUrl: './term-year-wise.component.html',
  styleUrls: ['./term-year-wise.component.scss']
})
export class TermYearWiseComponent implements OnInit {

  category = [
    { id: 1, name: 'All' },
    { id: 2, name: 'India' },
    { id: 3, name: 'International' },
  ];
  type = [
    { id: 1, name: 'Medical' },
    { id: 2, name: 'Scholarship' },
  ];

public serach=new EnayatHistorySerach();

public periods_m =Array<any>();

public periods_s =Array<any>();

  constructor(private _medicalService:MedicalService, private _loader: LoaderService,) { }

  ngOnInit(): void {
    this._loader.callLoaderMethod('show');
    this._medicalService.getPeriods().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
       this.periods_m=x.medical;
       this.periods_s=x.scholar;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');

      },
    });
  }

  setPeriod()
  {
    this.serach.periodId=undefined;
  }
}
