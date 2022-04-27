import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../AAAA_Models/LoginUser-Model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    requestfromangular: 'yes',
    firstrequest: 'no',
    Authorization: localStorage.getItem('newtoken') ?? '',
  });

  headers1 = new HttpHeaders({
    firstrequest: 'yes',
    requestfromangular: 'yes',
  });

  getadminLoginAuth(data: LoginUser): Observable<any> {
    var url = '/api/loginauthentication/getAdminloginauthentication';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
  }

  getAdminRights(): Observable<any[]> {
    var url = '/api/module/getrights/500';
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }

  getTokenVerification(): Observable<any> {
    var url='/api/loginauthentication/getTokenVerification';
    var fullUrl =environment.baseUrl+url;
    return this.http.get<any>(fullUrl,{headers:this.headers });
  }


  getUser(): Observable<any> {
    var url = '/api/user/getsingleuser';
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any>(fullUrl, { headers: this.headers });
  }
  getAdminSubRights(id: number): Observable<any[]> {
    var url = '/api/module/getsubrights/500/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }


  getAdminLoogedIn() {
    return !!localStorage.getItem('newtoken');
  }

  getITSDetails(itsId:number): Observable<any> {
    var url = '/api/user/its/'+itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any>(fullUrl, { headers: this.headers });
  }





}
