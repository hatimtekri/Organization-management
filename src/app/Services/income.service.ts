import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeeAllotmentModel } from '../AAAA_Models/FeeAllotment-Model';
import { FeeAllotment } from '../AAAA_Models/FeeAllotmentModel';
import { FeeCategoryModel } from '../AAAA_Models/FeeCategoryModel-Model';
import { FeePayment } from '../AAAA_Models/FeePaymentModel';
import { FeeTransaction } from '../AAAA_Models/FeeTransactionModel';
import { Reciept } from '../AAAA_Models/RecieptModel';
import { ReportFilter } from '../AAAA_Models/ReportFilter-Model';
import { LoaderService } from '../Modules_Admin/Services/loader.service';
import { IncomeModule } from '../Module_Income/income.module';




@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  

  constructor(private http: HttpClient, private _loader: LoaderService) { 
    console.log("income service")
  }


  
  headers1 = new HttpHeaders({
    'firstrequest': 'no',
    'requestfromangular': 'yes',
    'Authorization': localStorage.getItem('newtoken') ?? ''
  });


  changeStudentStatus(itsid:number,remarks:any) : Observable<any> {
 
    var url = "/api/feeCategory/Activestatus/"+itsid+"/"+remarks;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.put<any[]>(fullUrl,new FeeCategoryModel(), { headers: this.headers1 });
  }
  
  refreshDataFromIts(itsid:number) : Observable<any> {
 
    var url = "/api/student/refreshDataFromIts/"+itsid;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }
  

  getAllStudentData(data:FeeAllotmentModel) : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/studentfeeallotment/getAllStudents";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any>(fullUrl,data, { headers: this.headers1 });
  }


  getAllActiveStudentData(data:FeeAllotmentModel) : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/studentfeeallotment/getAllActiveStudents";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any>(fullUrl,data, { headers: this.headers1 });
  }
  getAllInActiveStudentData(data:FeeAllotmentModel) : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/studentfeeallotment/getAllInActiveStudents";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any>(fullUrl,data, { headers: this.headers1 });
  }

  getExcludedStudents(data:FeeAllotmentModel) : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/studentController/fees/getExcludingList";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any>(fullUrl,data, { headers: this.headers1 });
  }



  
 
  getStudentFeeLeader(id:number) : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/feecontroller/getStudentLeader/"+id;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }
  getPsetData(itsId:any) : Observable<any[]> {
    this._loader.callLoaderMethod('show');
    var url = "/api/user/getregistrationpagetrueright/"+itsId;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  GetStudentDataToExport(f:any) {
    var url = '/api/exporttoexcelnew/studentDetails';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  excludeStudent(mzid:number,psetId:number,monthId:number,yearId:number) : Observable<any[]> {
 
    var url = "/api/studentController/fees/setExcludingList/"+mzid+"/"+psetId+"/"+monthId+"/"+yearId;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  deleteExcludedStudent(id: number) {
    var url = '/api/student/deleteExcludedstudent/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
  }
}
