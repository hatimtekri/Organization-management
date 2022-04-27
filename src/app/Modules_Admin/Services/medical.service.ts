import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medical } from 'src/app/AAAA_Models/Medical-Model';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    requestfromangular: 'yes',
    firstrequest: 'no',
    Authorization: localStorage.getItem('newtoken') ?? '',
  });

//Bill Clearance
  getPendingMedical(): Observable<any> {
    var url='/api/facultymedicalenayat/getallbillclearancepending';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getSuratAuditBills(): Observable<any> {
    var url='/api/facultymedicalenayat/adminlevel1/getsuratauditeddata';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }
  getBulkBills(id:any): Observable<any> {
    var url='/api/facultymedicalenayat/getbulkbills/'+id;
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  printReport(model:ReportFilter) {
    var url = '/api/printableformat_report/getdata';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, model, { headers: this.headers });
  }
  exportReport(model:ReportFilter) {
    var url = '/api/queryReport/getReportData';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, model, { headers: this.headers });
  }

  getSummaryCount(): Observable<any> {
    var url='/api/facultymedicalenayat/getsummarycount';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }


  getApplicantBills(id:any): Observable<any> {
    var url='/api/facultymedicalenayat/getpendidngbillsforbillclearance/'+id;
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getPeriods(): Observable<any> {
    var url='/api/facultymedicalenayat/getPeriods';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getHistory(): Observable<any[]> {
    var url='/api/facultymedicalenayat/getenayathistorydata';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any[]>(fullUrl,{headers:this.headers });
  }

  getBillEntriesAndStatus(): Observable<any> {
    var url='/api/facultymedicalenayat/admin2/getbillentrieanststaus';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }
  getDataForMumbaiAudit(): Observable<any> {
    var url='/api/facultymedicalenayat/admin2/getdataformumbaiaudit';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getDataForMumbaiAudit_Part2(): Observable<any> {
    var url='/api/facultymedicalenayat/admin2/getdataformumbaiaudit_part2';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getDataForFinalsancantion(): Observable<any> {
    var url='/api/facultymedicalenayat/admin2/getdataforfinalsanction';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }

  getDataAfterFinalsancantion(): Observable<any> {
    var url='/api/facultymedicalenayat/admin2/getdataafterfinalsanction';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }


  ChangeOriginalBillStatus(data:Medical): Observable<any> {
    var url='/api/facultymedicalenayat/adminlevel1/changeoriginalBillstatus';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }

  BacktoPending(data:Array<Medical>): Observable<any> {
    var url='/api/facultymedicalenayat/admin/fromlevel1_1clearedto_pending';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }

  Backtopart1(data:Array<Medical>): Observable<any> {
    var url='/api/facultymedicalenayat/admin/fromlevel1_1_part2_to_part1';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }

  finalsanction(data:Array<Medical>): Observable<any> {
    var url='/api/facultymedicalenayat/admin/fromlevel3finalsanction';
    var fullUrl =environment.baseUrl+url;
    return this.http.put<any>(fullUrl,data,{headers:this.headers });
  }

ChangeBillStatus(s:string,data:Array<Medical>)
{
  var url='/api/facultymedicalenayat/adminlevel1/changeBillstatus/'+s;
  var fullUrl =environment.baseUrl+url;
  return this.http.put<any>(fullUrl,data,{headers:this.headers });
}

submitSuratAudit(data:Array<Medical>)
{
  var url='/api/facultymedicalenayat/admin1/surataudit';
  var fullUrl =environment.baseUrl+url;
  return this.http.put<any>(fullUrl,data,{headers:this.headers });
}
submitMumbaiAudit_Part1(data:Medical)
{
  var url='/api/facultymedicalenayat/adminforsinglesubmit/clearedlevel1_1one';
  var fullUrl =environment.baseUrl+url;
  return this.http.put<any>(fullUrl,data,{headers:this.headers });
}

submitMumbaiAudit_Bulk_Part1(data:Array<Medical>)
{
  var url='/api/facultymedicalenayat/adminforBulksubmit/clearedlevel1_1one';
  var fullUrl =environment.baseUrl+url;
  return this.http.put<any>(fullUrl,data,{headers:this.headers });
}


submitMumbaiAudit_Part2(data:Medical)
{
  var url='/api/facultymedicalenayat/adminforsinglesubmit/clearedlevel1_1one_part2';
  var fullUrl =environment.baseUrl+url;
  return this.http.put<any>(fullUrl,data,{headers:this.headers });
}

submitMumbaiAudit_Bulk_Part2(data:Array<Medical>)
{
  var url='/api/facultymedicalenayat/adminforBulksubmit/clearedlevel1_1one_part2';
  var fullUrl =environment.baseUrl+url;
  return this.http.put<any>(fullUrl,data,{headers:this.headers });
}

getExportFileNameData(id: number) : Observable<any> {

  var url = "/api/exporttoexcel/getExportTypeFilename/" + id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers });
}

}
