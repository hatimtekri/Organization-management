import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EwalletLedgerService {

  constructor(private http: HttpClient, private _loader: LoaderService) {
   
   }


  
  headers1 = new HttpHeaders({
    'firstrequest': 'no',
    'requestfromangular': 'yes',
    'Authorization': localStorage.getItem('newtoken') ?? ''
  });

  getStudentWalletLeader(id:number) : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/walletcontroller/getStudentWalletLeader/"+id;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }
  WalletToWallet_Transfer(model:FeeTransaction) : Observable<any[]> {
 
    var url = "/api/walletcontroller/transferwallettowallet";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
  }


}
