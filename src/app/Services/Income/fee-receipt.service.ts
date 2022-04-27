import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeAllotment } from 'src/app/AAAA_Models/FeeAllotmentModel';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeReceiptService {

  
  constructor(private http: HttpClient, private _loader: LoaderService) {
   
  }


 
 headers1 = new HttpHeaders({
   'firstrequest': 'no',
   'requestfromangular': 'yes',
   'Authorization': localStorage.getItem('newtoken') ?? ''
 });

  
getBanksList() : Observable<any[]> {
  this._loader.callLoaderMethod('show');
  var url = "/api/GetBankMaster";
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
}
getStudentFeeLeader(id:number) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/feecontroller/getStudentLeader/"+id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
getFeeAllocationForPayment(id:number) : Observable<any[]> {
  this._loader.callLoaderMethod('show');
  var url = "/api/feecontroller/getFeeAllocationForPayment/"+id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
}

createReciept(model:Array<FeeAllotment>) : Observable<any> {
 
  var url = "/api/feecontroller/createReciept";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
}
useEWallet(model:Array<FeeAllotment>) : Observable<any> {
 
  var url = "/api/feecontroller/useEwallet";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
}

createSundryReciept(model:FeeTransaction) : Observable<any> {
 
  var url = "/api/user/miscellaneous/receipt/payment_new";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
}


}
