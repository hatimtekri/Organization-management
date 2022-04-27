import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wafd_Khidmat_Mawaze } from 'src/app/AAAA_Models/Wafd_Khidmat_Mawaze-Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MawazeService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'requestfromangular': 'yes',
    'firstrequest': 'no',
    'Authorization': localStorage.getItem('newtoken') ?? ''
  });

  submitMauze(mauze: Wafd_Khidmat_Mawaze) {
    var url = '/api/faculty/addmoze';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, mauze, { headers: this.headers });
  }
  deleteMauze(id: number) {
     var url = '/api/faculty/deletemoze/' + id;
     var fullUrl = environment.baseUrl + url;
     //console.log("call api "+fullUrl);
     return this.http.delete<any[]>(fullUrl, { headers: this.headers });
   }


   //api/faculty/getkhidmatmawaze
   getMawazwDetails(itsId:any): Observable<any> {
    var url = '/api/faculty/getkhidmatmawazenew/'+itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any>(fullUrl, { headers: this.headers });
  }

}

