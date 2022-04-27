import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ActualIncome } from 'src/app/AAAA_Models/ActualIncome-Model';
import { FeeAllotmentModel } from 'src/app/AAAA_Models/FeeAllotment-Model';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ReceiptStatementService } from 'src/app/Services/Income/receipt-statement.service';

@Component({
  selector: 'app-accrual-income',
  templateUrl: './accrual-income.component.html',
  styleUrls: ['./accrual-income.component.scss']
})
export class AccrualIncomeComponent implements OnInit {

  searchObject = new FeeAllotmentModel();
  psetIncomes = new Array<ActualIncome>();

  gTotal: any;
  page: any;

  //Main Chart Variables
  public mainChartOptions: ChartOptions = {
    responsive: true,
  };
  public mainChartLabels = ['Taherabad', 'Burhanpur', 'Surat', 'Denmaal', 'Mumbai', 'Panchgani', 'Taherabad', 'Burhanpur', 'Surat', 'Denmaal', 'Mumbai', 'Panchgani'];
  public mainChartType: ChartType = 'horizontalBar';
  public mainChartLegend = true;
  public mainChartPlugins = [];

  public mainChartData = [
    { data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55], label: 'Online' }
  ];

  //PSet Chart Variables
  public pSetChartOptions: ChartOptions = {
    responsive: true,
  };
  public pSetChartLabels = ['Cash', 'Cheque', 'Online', 'E-Wallet'];
  public pSetChartType: ChartType = 'pie';
  public pSetChartLegend = true;
  public pSetChartPlugins = [];

  public pSetChartData = [
    { data: [65, 59, 80, 81], label: 'Online' }
  ];

  constructor(private _authService: AuthService, private _incomeService: ReceiptStatementService, private _loader: LoaderService) { }


  ngOnInit(): void {

    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(81);

        if (this.page == true) {
          this._loader.callLoaderMethod('hide');
        }
        else {
          this._loader.callLoaderMethod('hide');

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

  }

  search() {



   this.searchObject.hijriYear="1443";
   this.searchObject.hijriYear="3";


    this._loader.callLoaderMethod('show');
 
    this._incomeService.getAcrualIncomeReport(this.searchObject).subscribe({
      next: (x) => {
         
        this._loader.callLoaderMethod('hide');        
        this.psetIncomes = x.model;       
        console.log(JSON.stringify(this.psetIncomes));
        this.gTotal=this.psetIncomes[0].gTotalIncome;
        this.mainChartLabels=x.psetNames;
        this.mainChartData=[{data:x.psetIncomes,label:"Online"}]

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        
      },
    });



  }

  clear() {
    this.searchObject.hijriYear = undefined;
    this.searchObject.monthId = undefined;
    
  }

}
