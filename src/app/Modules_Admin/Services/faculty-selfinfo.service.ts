import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { wafd_fieldofinterest } from 'src/app/AAAA_Models/wafd_fieldofinterest-Model';
import { wafd_languageproficiency } from 'src/app/AAAA_Models/Wafd_LanguageProficiency';
import { wafd_physicalfitness } from 'src/app/AAAA_Models/Wafd_Physicalfitness';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultySelfinfoService {

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    requestfromangular: 'yes',
    firstrequest: 'no',
    Authorization: localStorage.getItem('newtoken') ?? '',
  });

  //Other Idara Mawaze

  getLanguageProficiencyDetails(itsId: number): Observable<any[]> {
    var url = '/api/wafd_selfinfo/getlanguageproficiencydetails/' + itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }

  submitLanguageProficiency(model: wafd_languageproficiency) {
    var url = '/api/wafd_selfinfo/submitlanguageproficiencydetails';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers });
  }

  deleteLanguageProficiency(id: number) {
    var url = '/api/wafd_selfinfo/deletelanguageproficiency/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers });
  }

  // mahad past mawaze

  getPhysicalFitnessDetails(itsId: number): Observable<any[]> {
    var url = '/api/wafd_selfinfo/getphysicalfitnessdetails/' + itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }

  getfieldofinterestDetails(itsId: number): Observable<any[]> {
    var url = '/api/wafd_selfinfo/getfieldofinterestdetails/' + itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }

  submitPhysicalFitness(model:wafd_physicalfitness) {
    var url = '/api/wafd_selfinfo/submitphysicalfitnessdetails';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers });
  }

  submitFieldofinterest(model:wafd_fieldofinterest) {
    var url = '/api/wafd_selfinfo/submitfieldofinterestdetails';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers });
  }

  deletePhysicalFitness(id: number) {
    var url = '/api/wafd_selfinfo/deletephysicalfitness/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers });
  }

  deleteFieldofinterest(id: number) {
    var url = '/api/wafd_selfinfo/deletefieldofinterest/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers });
  }


  //BMI

  getBMIDetails(itsId:any): Observable<any[]> {
    var url = '/api/bmi_calculator/getbmidataforadmin/'+itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }
//fitness
  getFitnessAcitvityDetails(itsId:any): Observable<any[]> {
    var url = '/api/fitnessactivity/getfitnessdataofsingleuser/'+itsId;
    var fullUrl = environment.baseUrl + url;
    return this.http.get<any[]>(fullUrl, { headers: this.headers });
  }

  deleteFitnessActivity(id: number) {
    var url = '/api/fitnessactivity/deleteFitness/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers });
  }


}
