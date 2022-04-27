import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActualIncome } from 'src/app/AAAA_Models/ActualIncome-Model';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ReceiptStatementService } from 'src/app/Services/Income/receipt-statement.service';
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-actual-income',
  templateUrl: './actual-income.component.html',
  styleUrls: ['./actual-income.component.scss']
})
export class ActualIncomeComponent implements OnInit {

  searchObject = new Reciept();
  psetIncomes=new Array<ActualIncome>();

gTotal:any;
page:any;

  //Main Chart Variables
  public mainChartOptions: ChartOptions = {
    responsive: true,
  };
  public mainChartLabels = ['Taherabad', 'Burhanpur', 'Surat', 'Denmaal', 'Mumbai', 'Panchgani','Taherabad', 'Burhanpur', 'Surat', 'Denmaal', 'Mumbai', 'Panchgani'];
  public mainChartType: ChartType = 'horizontalBar';
  public mainChartLegend = true;
  public mainChartPlugins = [];

  public mainChartData = [
    { data: [65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55], label: 'Online' }
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

  constructor(private _authService:AuthService,private _incomeService: ReceiptStatementService,private _loader: LoaderService) { }

  ngOnInit(): void {



    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(80);

        if (this.page == true) {
          this._loader.callLoaderMethod('hide');
        }
        else
        {
        this._loader.callLoaderMethod('hide');

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });




    this.searchObject.fromDate = undefined;
    this.searchObject.toDate = undefined;
    this._loader.callLoaderMethod('show');
 
    this._incomeService.getActualIncomeReport(this.searchObject).subscribe({
      next: (x) => {
         
        this._loader.callLoaderMethod('hide');        
        this.psetIncomes = x.model;       
       
        this.gTotal=this.psetIncomes[0].gTotalIncome;
        this.mainChartLabels=x.psetNames;
        this.mainChartData=[{data:x.psetIncomes,label:"Online"}]

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }


  search() {



    if (this.searchObject.fromDate1 != undefined) {

      if (this.searchObject.toDate1 == null || this.searchObject.toDate1 == undefined) {
        alert('Kindly enter to Date');
        return;
      }


      this.searchObject.fromDate = new Date(this.searchObject.fromDate1 ?? '');
      this.searchObject.toDate = new Date(this.searchObject.toDate1 ?? '');

      this.searchObject.fromDate.setDate(this.searchObject.fromDate.getDate() + 1);
      this.searchObject.toDate.setDate(this.searchObject.toDate.getDate() + 1);


    }
    else {
      this.searchObject.fromDate = undefined;
      this.searchObject.toDate = undefined;

      if (this.searchObject.itsCsv == null || this.searchObject.itsCsv == undefined || this.searchObject.itsCsv == "") {
        alert('Kindly enter its Csv');
        return;
      }
    }

    this._loader.callLoaderMethod('show');
 
    this._incomeService.getActualIncomeReport(this.searchObject).subscribe({
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
        swal('Error!', err.error.message, 'error');
      },
    });



  }

  clear() {
    this.searchObject.fromDate1 = undefined;
    this.searchObject.toDate1 = undefined;
    this.searchObject.itsCsv = undefined;
  }



}
