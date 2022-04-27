import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeAllotment } from 'src/app/AAAA_Models/FeeAllotmentModel';
import { FeePayment } from 'src/app/AAAA_Models/FeePaymentModel';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManualOnlineReceiptService {

  constructor(private http: HttpClient, private _loader: LoaderService) {
   
  }


 
 headers1 = new HttpHeaders({
   'firstrequest': 'no',
   'requestfromangular': 'yes',
   'Authorization': localStorage.getItem('newtoken') ?? ''
 });
  getStudentFeeLeader(id:number) : Observable<any> {
    
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
  createOnlineManualReciept(model:Array<FeeAllotment>) : Observable<any> {
 
    var url = "/api/feecontroller/createOnlineManualReciept";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
  }

  GetPendingTxnDataToExport(f:FeePayment) {
    var url = '/api/feecontroller/getPendingTransactionsList';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl,f, { headers: this.headers1 });
  }
  
}
