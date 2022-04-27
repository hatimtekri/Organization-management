import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeAllotmentModel } from 'src/app/AAAA_Models/FeeAllotment-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeAllocationService {

  constructor(private http: HttpClient, private _loader: LoaderService) {
  
   }


  
  headers1 = new HttpHeaders({
    'firstrequest': 'no',
    'requestfromangular': 'yes',
    'Authorization': localStorage.getItem('newtoken') ?? ''
  });

  AllocateBulkFee(model:FeeAllotmentModel) : Observable<any> {
   
    var url = "/api/studentfeeallotment/allocateStudentFeesbulk/"+model.monthId+"/"+model.hijriYear+"/"+model.pSetId+"/"+model.remarks;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any[]>(fullUrl, new FeeAllotmentModel(), { headers: this.headers1 });
  }
  AllocateManualFee(model:FeeAllotmentModel) : Observable<any> {
 
    var url = "/api/studentfeeallotment/allocateStudentFeesmanual";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
  }

  AllocateMiscellaneousFee(model:FeeAllotmentModel) : Observable<any> {
   
    var url = "/api/studentfeeallotment/allocateStudentFeesmiscellaneous";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
  }
  
  getStudents(itsCSV:any) : Observable<any[]> {
    this._loader.callLoaderMethod('show');
    var url = "/api/studentfeeallotment/getstudentsList/"+itsCSV;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getAllocatedFees(data:FeeAllotmentModel) : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/studentfeeallotment/getallfeealloted";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any>(fullUrl,data, { headers: this.headers1 });
  }

  getAllPsetForFeeAllotment() : Observable<any[]> {
    //this._loader.callLoaderMethod('show');
    var url = "/api/studentfeeallotment/getAllPsetForFeeAllotment";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  
}
