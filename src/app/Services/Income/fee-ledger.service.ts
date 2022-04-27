import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeLedgerService {

  constructor(private http: HttpClient, private _loader: LoaderService) {
   
   }


  
  headers1 = new HttpHeaders({
    'firstrequest': 'no',
    'requestfromangular': 'yes',
    'Authorization': localStorage.getItem('newtoken') ?? ''
  });


  getPsetData(itsId:any) : Observable<any[]> {
    this._loader.callLoaderMethod('show');
    var url = "/api/user/getregistrationpagetrueright/"+itsId;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }
  
getStudentFeeLeader(id:number) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/feecontroller/getStudentLeader/"+id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

getStudentLogs(id:number) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/feecontroller/getStudentLogs/"+id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}


WaiveAndReverse(model:FeeTransaction) : Observable<any[]> {
 
  var url = "/api/feecontroller/waiveandreverse";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
}

submitFcId(itsId:number,id:number) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/feecontroller/submitFcId/"+itsId+"/"+id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}


submitPsetId(itsId:number,id:number) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/feecontroller/submitPsetId/"+itsId+"/"+id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

getWaiveandReverseAmount(itsId:number,allotmentId:number,type:any) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/feecontroller/getwaiveandreverseamount/"+itsId+"/"+allotmentId+"/"+type;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}


}
