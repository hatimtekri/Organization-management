import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeCategoryModel } from 'src/app/AAAA_Models/FeeCategoryModel-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeCategoryService {

  constructor(private http: HttpClient, private _loader: LoaderService) {
  
  }


 
 headers1 = new HttpHeaders({
   'firstrequest': 'no',
   'requestfromangular': 'yes',
   'Authorization': localStorage.getItem('newtoken') ?? ''
 });

  getFeeCategoryData() : Observable<any[]> {
    this._loader.callLoaderMethod('show');
    var url = "/api/feeCategory/getallfeecategory";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }
  getPsetData(itsId:any) : Observable<any[]> {
    this._loader.callLoaderMethod('show');
    var url = "/api/user/getregistrationpagetrueright/"+itsId;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getFeeCategoryPsetData() : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/feeCategory/getallfeecategorypset";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }

  Add_FeeCategory(name:string) : Observable<any> {
   
    var url = "/api/feeCategory/addfeecategory/"+name;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any[]>(fullUrl,new FeeCategoryModel(), { headers: this.headers1 });
  }
  Add_FeeCategory_Pset(model:FeeCategoryModel) : Observable<any> {
   
    var url = "/api/feeCategory/addfeecategorypset";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
  }
  Delete_FeeCategory_PSet(id:number) : Observable<any> {
   
    var url = "/api/feeCategory/deletefeecategoryPset/"+id;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
  }

  Edit_FeeCategory_PSet(id:number,amount:number) : Observable<any> {
   
    var url = "/api/feeCategory/EditFeecategoryPset/"+id+"/"+amount;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.put<any[]>(fullUrl,new FeeCategoryModel(), { headers: this.headers1 });
  }
  Edit_FeeCategory(id:number,category:string) : Observable<any> {
   
    var url = "/api/feeCategory/EditFeecategory/"+id+"/"+category;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.put<any[]>(fullUrl,new FeeCategoryModel(), { headers: this.headers1 });
  }
  
}
