import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';

import { Kg_FaimalyDetails } from 'src/app/AAAA_Models/Kg_FaimalyDetails';
import { Kg_IdentityCard } from 'src/app/AAAA_Models/Kg_IdentityCard';
import { Qualification } from 'src/app/AAAA_Models/Qualification-Model';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { WorkShop } from 'src/app/AAAA_Models/Workshop-Model';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class FacultyProfileService {



  private profileData;

  private profileDataCallSource = new Subject<any>();
  private FacultyVariablesDataCallSource = new Subject<any>();


  private ITSIDData;
  private ITSIDData3;
  private NameData;

  private ITSIDDataCallSource = new Subject<any>();
  private ITSIDData3CallSource = new Subject<any>();
  private NameDataCallSource = new Subject<any>();



  constructor(private http: HttpClient, private _loader: LoaderService) {
    this.profileData=new FacultyProfile();
    this.ITSIDData=0;
    this.ITSIDData3=0;
    this.NameData="";
    // this.FacultyVariablesData=new FacultyVariables();

   }



  headers1 = new HttpHeaders({
    'firstrequest': 'no',
    'requestfromangular': 'yes',
    'Authorization': localStorage.getItem('newtoken') ?? ''
  });




  setITSIDData(data:any)
  {
    //console.log("set data "+ data.itsId);
    this.ITSIDData=data;
    this.ITSIDDataCallSource.next(data);
  }
  getITSIDDataObservable()
  {
    return this.ITSIDDataCallSource.asObservable();
  }
  getITSIDData()
  {
    return this.ITSIDData;
  }

  setITSIDData3(data:any)
  {
    //console.log("set data "+ data.itsId);
    this.ITSIDData3=data;
    this.ITSIDData3CallSource.next(data);
  }
  getITSIDData3Observable()
  {
    return this.ITSIDData3CallSource.asObservable();
  }
  getITSIDData3()
  {
    return this.ITSIDData3;
  }

  setNameData(data:any)
  {
    //console.log("set data "+ data.itsId);
    this.NameData=data;
    this.NameDataCallSource.next(data);
  }
  getNameDataObservable()
  {
    return this.NameDataCallSource.asObservable();
  }
  getNameData()
  {
    return this.NameData;
  }

getfacultyProfileData(itsId: number): Observable<any> {

    var url = "/api/GetHuffazCompleteDetail/" + itsId;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
getWafdTrainingSummary(): Observable<any> {

  var url = "/api/wafd_profile/getwafdtraningsummary";
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
getWafdProfileRight(itsId: number): Observable<any> {

  var url = "/api/wafd_ul_huffaz/getWafdprofileRight/" + itsId;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
getKhidmatGuzaars(): Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/wafdalhuffaz/getAllWafdData";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
submitFacultyProfile(data: FacultyProfile): Observable<any> {

    var url = "/api/EditHuffazDetails";
    var fullUrl = environment.baseUrl + url;

    return this.http.put<any>(fullUrl, data, { headers: this.headers1 });
}
ADDFacultyProfile(data: FacultyProfile): Observable<any> {

  var url = "/api/AddHuffazDetails";
  var fullUrl = environment.baseUrl + url;

  return this.http.put<any>(fullUrl, data, { headers: this.headers1 });
}
BulkUpdateFromITS(data: any): Observable<any> {

  var url = "/api/wafd_ul_huffaz/update/ITSDATA";
  var fullUrl = environment.baseUrl + url;

  return this.http.put<any>(fullUrl, data, { headers: this.headers1 });
}
BulkUpdateAcedemic(data: any): Observable<any> {

  var url = "/api/wafd_ul_huffaz/update/wafdclassid";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
}
GetDataToExport(f:any) {
  var url = '/api/exporttoexcelnew/wafd_ul_huffaznew';
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
}
Get_WHTrainingDataToExport(f:any) {
  var url = '/api/exporttoexcelnew/whtrainingbasicwithoutphoto';
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
}
GetWafdExportTrainingSectionData(f:any) {
  var url = '/api/exporttoexcelnew/wafd_Training_SectionwizeExport';
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
}
GetWafdExportSectionData(f:any) {
  var url = '/api/exporttoexcelnew/wafd_ul_huffazSectionwizeExport';
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
}
GetBasicExportData(data:any[]) {
  var url = '/api/wafdalhuffaz/getExportBasicWithPhoto';
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
}
GetBasicExportDataWithoutPhoto(data:any[]) {
  var url = '/api/wafdalhuffaz/getExportBasicWithOutPhoto';
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
}
submitChequeAttachment(id: any,f:FormData) {
    var url = '/api/wafd_ul_huffaz/chequeattachments/'+id;
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, f, { headers: this.headers1 });
}
submitPassportCopyAttachment(id: any,f:FormData) {
    var url = '/api/wafd_ul_huffaz/passportcopyattachment/'+id;
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, f, { headers: this.headers1 });
}
getDropdownData(id: number) : Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/user/getDropdown/" + id;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
getExportHeadersData(id: number) : Observable<any[]> {
  this._loader.callLoaderMethod('show');
  var url = "/api/exporttoexcel/getExportTypeHeaders/" + id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
}
getWorkTypeDropdown(itsId:any) : Observable<any[]> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafdalhuffaz/getWorkTypeIdforadmin/"+itsId;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
}  
getNameWithPhoto(id: number) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafdalhuffaz/getnameandphoto/" + id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
getExportFileNameData(id: number) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/exporttoexcel/getExportTypeFilename/" + id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
submitPersonalityAttachment(id: any,f:FormData) {
    var url = '/api/wafd_ul_huffaz/personalityAttachment/'+id;
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any[]>(fullUrl, f, { headers: this.headers1 });
}

getProfileDataObservable()
{
  return this.profileDataCallSource.asObservable();
}

getFacultyVariablesDataObservable()
{
  return this.FacultyVariablesDataCallSource.asObservable();
}

setProfileData(data:FacultyProfile)
{
  this.profileData=data;
  this.profileDataCallSource.next(data);
}


submitCard(data: Kg_IdentityCard): Observable<any> {
  var url = "/api/wafd_ul_huffaz/addidentitycard";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
}

submitCardAttachment(id: any,f:FormData) {
  var url = '/api/wafd_ul_huffaz/cardattachments/'+id;
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any[]>(fullUrl, f, { headers: this.headers1 });
}

deleteCardData(id:number) : Observable<any[]> {
  var url = '/api/wafdalhuffaz/deleteidentitycard/' + id;
  var fullUrl = environment.baseUrl + url;
  return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
}

deleteFaimalyMemberData(id:number) : Observable<any[]> {
  var url = '/api/wafdalhuffaz/deletewafdfaimalymember/' + id;
  var fullUrl = environment.baseUrl + url;
  return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
}


getProfileData()
{
  return this.profileData;
}




//qualification

getQualificationDropdownData() : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_profile/getstagedegreedropdown";
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
getMozeDD(itsId:any) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/user/getdeptvenuetrueright/"+itsId;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

getQualificationData(itsId:any) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_profile/getqualificationdatanewnew/"+itsId;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

submitQualificationData(model:Qualification) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_profile/addqualificationnew";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
}

deleteQualificationData(id:number) : Observable<any> {
  var url = '/api/wafd_profile/deletequalificationnew/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
}

submitQualificationDataAttachment(id: any,f:FormData) {
  var url = '/api/wafd_profile/addqualificationnewattachments/'+id;
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any[]>(fullUrl, f, { headers: this.headers1 });
}

ChangeStatus(id:number) : Observable<any> {
  var url = '/api/wafd_ul_huffaz/Activestatus/' + id;
  var fullUrl = environment.baseUrl + url;
  return this.http.put<any>(fullUrl,id, { headers: this.headers1 });
}

//courses

getcoursesDropdownData() : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_profile/getcategorySubcategorydropdown";
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
getWorkshopData(itsId:any) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_profile/getworkshopdatanewnewnew/"+itsId;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
submitWorkShopData(model:WorkShop) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_profile/addworkshopnew";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
}
fetchDataFromIts(model:WorkShop,itsId:any) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_ul_huffaz/updateSpecific/ITSDATA/"+itsId;
  var fullUrl = environment.baseUrl + url;

  return this.http.put<any[]>(fullUrl,model, { headers: this.headers1 });
}
submitWorkshopDataAttachment(id: any,f:FormData) {
  var url = '/api/wafd_profile/addworkshopnewattachments/'+id;
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any[]>(fullUrl, f, { headers: this.headers1 });
}
deleteWorkshopData(id:number) : Observable<any> {
  var url = '/api/wafd_profile/deleteworkshopnew/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
}




//wajebaat 
getDataForwajebaatTakhmin() : Observable<any> {
  
  var url = "/api/wajebaat/getWajebaatDataforTakhmin";
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

addCurrecyConversion(fromCurrecy:any,toCurrency:any,rate:any) : Observable<any> {
  
  var url = "/api/wajebaat/addcurrencyConversion/"+fromCurrecy+"/"+toCurrency+"/"+rate;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

getCurrecyConversion() : Observable<any[]> {
  
  var url = "/api/wajebaat/getcurrencyConversionData";
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
}


getDataFroWajebaatAfterTakhmin() : Observable<any[]> {
  
  var url = "/api/wajebaat/getWajebaatDataAfterTakhmin" ;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
}
wajebaatTakhmin(model:Array<any>) : Observable<any> {
  
  var url = "/api/wajebaat/submitwajebaattakhmin";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
}
GetWajeebatDataToExport(f:any) {
  var url = '/api/exporttoexcelnew/wajebaatmodel';
  var fullUrl = environment.baseUrl + url;
  return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
}



//faimaly details

getFaimlyDetails(itsid:any) : Observable<any[]> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_ul_huffaz/getwafdfaimalydetailsnew/"+itsid;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
}
getFaimlyMemberName(itsid:number,itsid2:number) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_ul_huffaz/getfaimalyusernamenew/"+itsid+"/"+itsid2;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}
AddFaimaly(model:Kg_FaimalyDetails) : Observable<any> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_ul_huffaz/addfaimaly";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
}


//Identity Cards

getIdentityCardDetails(itsId:any) : Observable<any[]> {
  this._loader.callLoaderMethod('show');
  var url = "/api/wafd_ul_huffaz/getidentitycarddetailsnew/"+itsId;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
}

//Zip Files Download Apis
getInshaZipfile(year:any,month:any,classid:any) : Observable<any> {
  var url = "/api/wafdtrainingmasool/getinshazipfile/"+month+"/"+year+"/"+classid;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

getBRZipfile(year:any,month:any,classid:any) : Observable<any> {
  var url = "/api/wafdtrainingmasool/getbookreviewzipfile/"+month+"/"+year+"/"+classid;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

getNazamZipfile(data:any) : Observable<any> {
  var url = "/api/wafdtrainingmasool/getnazamzipfile";
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any>(fullUrl,data, { headers: this.headers1 });
}

//Module ON/OFF Apis
changeModuleStatus(data:any,id:any) : Observable<any> {
  var url = "/api/module/submitmoduleonof/"+id;
  var fullUrl = environment.baseUrl + url;

  return this.http.post<any>(fullUrl,data, { headers: this.headers1 });
}

getModuleStatus(id:any) : Observable<any> {
  var url = "/api/module/getmoduleonofdata/"+id;
  var fullUrl = environment.baseUrl + url;

  return this.http.get<any>(fullUrl, { headers: this.headers1 });
}

//Pset Data




}
