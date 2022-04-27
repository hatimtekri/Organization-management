import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { wafd_mahadpast_mawaze } from 'src/app/AAAA_Models/Wafd_MahadPast_Mawaze-Model';
import { wafd_otheridara_mawaze } from 'src/app/AAAA_Models/Wafd_OtherIdara_Mawaze-Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyMawazeService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    requestfromangular: 'yes',
    firstrequest: 'no',
    Authorization: localStorage.getItem('newtoken') ?? '',
  });

  //Other Idara Mawaze

  getOtherIdaraMawazeDetails(itsId: number): Observable<any[]> {
    var url = '/api/wafdalhuffaz/getwafdotheridaramawaze/' + itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }

  submitOtherIdaraMawaze(model: wafd_otheridara_mawaze) {
    var url = '/api/wafdalhuffaz/addwafdotheridaramawaze';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers });
  }

  deleteOtherIdaraMawaze(id: number) {
    var url = '/api/wafdalhuffaz/deletewafdotheridaramawaze/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers });
  }



  // mahad past mawaze

  getMahadPastMawazeDetails(itsId: number): Observable<any[]> {
    var url = '/api/wafdalhuffaz/getwafdmahadpastmawaze/' + itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }

  submitMahadPastMawaze(model:wafd_mahadpast_mawaze) {
    var url = '/api/wafdalhuffaz/addwafdmahadpastmawaze';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers });
  }

  deleteMahadPastMawaze(id: number) {
    var url = '/api/wafdalhuffaz/deletewafdmahadpastmawaze/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers });
  }




}
