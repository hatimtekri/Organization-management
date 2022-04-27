import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeAllotmentModel } from 'src/app/AAAA_Models/FeeAllotment-Model';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptStatementService {
  constructor(private http: HttpClient, private _loader: LoaderService) {

  }



  headers1 = new HttpHeaders({
    'firstrequest': 'no',
    'requestfromangular': 'yes',
    'Authorization': localStorage.getItem('newtoken') ?? ''
  });

  getSearchRecipt(model: Reciept): Observable<any> {

    var url = "/api/feecontroller/getRecipets";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
  }

  getActualIncomeReport(model: Reciept): Observable<any> {

    var url = "/api/feecontroller/getActualIncomeDashboard";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
  }
  getAcrualIncomeReport(model: FeeAllotmentModel): Observable<any> {

    var url = "/api/feecontroller/getAcrualIncomeDashboard";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
  }

  GetReceiptStatementDataToExport(f: any) {
    var url = '/api/exporttoexcelnew/receiptstatementdata';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  ReverseReceipt(model: any) {
    var url = '/api/feecontroller/ReverseReceipt';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
  }

  getSearchSundryRecipt(model:Reciept) : Observable<any> {
 
    var url = "/api/yellow/getYellowRecipets";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
  }

  GetSundryReceiptStatementDataToExport(f: any) {
    var url = '/api/exporttoexcelnew/Yellowreceiptstatementdata';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }
}
