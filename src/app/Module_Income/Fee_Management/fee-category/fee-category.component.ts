import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';

import { FeeCategoryModel } from 'src/app/AAAA_Models/FeeCategoryModel-Model';

import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';

import { IncomeService } from 'src/app/Services/income.service';
import { FeeCategoryService } from 'src/app/Services/Income/fee-category.service';
declare var swal: any;

@Component({
  selector: 'app-fee-category',
  templateUrl: './fee-category.component.html',
  styleUrls: ['./fee-category.component.scss'],
  providers: [FeeCategoryService]
})
export class FeeCategoryComponent implements OnInit {
  players = [
    { id: 1, playerName: 'Cristiano Ronaldo' },
    { id: 2, playerName: 'Lionel Messi' },
    { id: 3, playerName: 'Neymar Jr' },
    { id: 4, playerName: 'Toni Kroos' },
    { id: 5, playerName: 'Luiz Suarez' },
    { id: 6, playerName: 'Karim Benzema' },
    { id: 7, playerName: 'Eden Hazard' },
  ];
  edit: boolean = false;
  public filterMetadata = { count: 0, data: new Array<any>() };
  public amountDD = new Array<DropDownData>();
  public data = new Array<FeeCategoryModel>();
  public searchObject =new FeeCategoryModel();
  public category: any;
  public programDD = new Array<DropDownData>();
  public feeCategoryDD = new Array<FeeCategoryModel>();
  public bindCategoryDD = new Array<DropDownData>();
  public bindProgramDD = new Array<DropDownData>();
  public bindAmountDD = new Array<DropDownData>();
  page:any;
  public binding = new FeeCategoryModel()
  constructor(private _incomeService: FeeCategoryService, private _authService:AuthService,private _loader: LoaderService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.edit=false;


    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(68);

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

    this._incomeService.getFeeCategoryData().subscribe({
      next: (x) => {
        this.feeCategoryDD = x;

        console.log(JSON.stringify(this.feeCategoryDD));
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => { },
    });

    this._incomeService.getPsetData(500).subscribe({
      next: (x) => {
        this.programDD = x;
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => { },
    });

    this._incomeService.getFeeCategoryPsetData().subscribe({
      next: (x) => {
        this.bindCategoryDD = x.categoryDD;
        this.bindProgramDD = x.programDD;
        this.bindAmountDD=x.amountDD
        this.data = x.data;
        console.log(JSON.stringify(this.data));
        this._loader.callLoaderMethod('hide');

      },
      error: (err) => { },
    });


  }


  AddFeeCategory() {
    this._loader.callLoaderMethod('show');

    if (this.category == "" ||this.category == null || this.category == undefined ) {
      alert('Kindly enter Fee category');
      return;
    }

    this._incomeService.Add_FeeCategory(this.category).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }
  AddFeeCategory_Pset() {
    
    if (this.binding.categoryId == undefined || this.binding.categoryId == null) {
      alert('Kindly select Fee category');
      return;
    }
    if (this.binding.psetId == undefined || this.binding.psetId == null) {
      alert('Kindly select Program');
      return;
    }
    if (this.binding.amount == undefined || this.binding.amount == null) {
      alert('Kindly enter Amount');
      return;
    }
    
    
    this._loader.callLoaderMethod('show');

    this._incomeService.Add_FeeCategory_Pset(this.binding).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }

  Delete_FeeCategory_Pset(id:number)
  {
    this._loader.callLoaderMethod('show');

    this._incomeService.Delete_FeeCategory_PSet(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.success('Deleted successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  Edit_FeeCategory_Pset(id:number,amount:number)
  {
    this._loader.callLoaderMethod('show');

    this._incomeService.Edit_FeeCategory_PSet(id,amount).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  Edit_FeeCategory(id:number,category:string)
  {
    this._loader.callLoaderMethod('show');

    this._incomeService.Edit_FeeCategory(id,category).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

}
