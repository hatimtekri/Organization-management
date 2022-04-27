import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scholarship } from 'src/app/AAAA_Models/Scholarship-Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    requestfromangular: 'yes',
    firstrequest: 'no',
    Authorization: localStorage.getItem('newtoken') ?? '',
  });


  getPendingScholarship(): Observable<any> {
    var url='/api/facultyscholarshipenayat/getallbillclearancepending';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }
  getSuratAuditBills(): Observable<any> {
    var url='/api/facultyscholarshipenayat/adminlevel1/getsuratauditeddata';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }
  getBulkBills(id:any): Observable<any> {
    var url='/api/facultyscholarshipenayat/getbulkbills/'+id;
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getBulkReports(id:any,relationId:any,category:any,subcategory:any): Observable<any> {
    var url='/api/facultyscholarshipenayat/getbulkreports/'+id+'/'+relationId+'/'+category+'/'+subcategory;
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  ChangeBillStatus(s:string,data:Array<Scholarship>)
  {
    var url='/api/facultyscholarshipenayat/adminlevel1/changeBillstatus/'+s;
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }
  getApplicantBills(id:string): Observable<any> {
    var url='/api/facultyscholarshipenayat/getpendidngbillsforbillclearance/'+id;
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }
  submitSuratAudit(data:Array<Scholarship>)
  {
    var url='/api/facultyscholarshipenayat/admin1/surataudit';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }
  ChangeOriginalBillStatus(data:Scholarship): Observable<any> {
    var url='/api/facultyscholarshipenayat/adminlevel1/changeoriginalBillstatus';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }

  BacktoPending(data:Array<Scholarship>): Observable<any> {
    var url='/api/facultyscholarshipenayat/admin/fromlevel1_1clearedto_pending';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }

  Backtopart1(data:Array<Scholarship>): Observable<any> {
    var url='/api/facultyscholarshipenayat/admin/fromlevel1_1_part2_to_part1';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }

  finalsanction(data:Array<Scholarship>): Observable<any> {
    var url='/api/facultyscholarshipenayat/admin/fromlevel3finalsanction';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }


  getSummaryCount(): Observable<any> {
    var url='/api/facultyscholarshipenayat/getsummarycount';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }
  getDataForMumbaiAudit(): Observable<any> {
    var url='/api/facultyscholarshipenayat/admin2/getdataformumbaiaudit';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getBillEntriesAndStatus(): Observable<any> {
    var url='/api/facultyscholarshipenayat/admin2/getbillentrieanststaus';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getDataForMumbaiAudit_Part2(): Observable<any> {
    var url='/api/facultyscholarshipenayat/admin2/getdataformumbaiaudit__part2';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getDataForFinalsancantion(): Observable<any> {
    var url='/api/facultyscholarshipenayat/admin2/getdataforfinalsanction';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getHistory(): Observable<any[]> {
    var url='/api/facultyscholarshipenayat/getenayathistorydata';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any[]>(fullUrl,{headers:this.headers });
  }

  getDataAfterFinalsancantion(): Observable<any> {
    var url='/api/facultyscholarshipenayat/admin2/getdataafterfinalsanction';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }


  submitMumbaiAudit_Bulk_Part1(data:Array<Scholarship>)
{
  var url='/api/facultyscholarshipenayat/adminforBulksubmit/clearedlevel1_1one';
  var fullUrl =environment.baseUrl+url;
  return this.http.put<any>(fullUrl,data,{headers:this.headers });
}

submitMumbaiAudit_Bulk_Part2(data:Array<Scholarship>)
{
  var url='/api/facultyscholarshipenayat/adminforBulksubmit/clearedlevel1_1one_part2';
  var fullUrl =environment.baseUrl+url;
  return this.http.put<any>(fullUrl,data,{headers:this.headers });
}

}
