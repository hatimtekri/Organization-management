import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillManagement } from 'src/app/AAAA_Models/BillManagement-Model';
import { BudgetAraz } from 'src/app/AAAA_Models/BudgetAraz-Model';
import { FeeCategoryModel } from 'src/app/AAAA_Models/FeeCategoryModel-Model';
import { FeeTransaction } from 'src/app/AAAA_Models/FeeTransactionModel';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { Vendor } from 'src/app/AAAA_Models/Vendor-Model';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorDetailsService {
  constructor(private http: HttpClient, private _loader: LoaderService) {

  }

  headers1 = new HttpHeaders({
    'firstrequest': 'no',
    'requestfromangular': 'yes',
    'Authorization': localStorage.getItem('newtoken') ?? ''
  });


  getVendorDetails(): Observable<any[]> {
    //this._loader.callLoaderMethod('show');
    var url = "/api/expensebillentry/getAllVendors";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  VendorActiveInactive(id: any): Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/expensebillentry/activeinactiveVendor/" + id;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }
  getIFSCDetails(ifsc: any): Observable<any> {

    var url = "https://ifsc.razorpay.com/" + ifsc;
    var fullUrl = url;

    return this.http.get<any>(fullUrl);
  }

  addVendorDetails(data: Vendor): Observable<any[]> {
    this._loader.callLoaderMethod('show');
    var url = "/api/expensebillentry/addVendor";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any[]>(fullUrl, data, { headers: this.headers1 });
  }

  editVendorDetails(data: Vendor): Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/expensebillentry/editVendor";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
  }


  getstatesCityApiAuthToken(): Observable<any> {
    let hed = new HttpHeaders({
      "Accept": "application/json",
      'api-token': 'Mjroc6AjeCIXbp4i5R9JC9jNQ-CxC9txt6I-KNmdRb_kRFLTTZL8bdGumtM2A9XHZJg',
      "user-email": "itsupport@mahadalzahra.com"
    });


    var url = "https://www.universal-tutorial.com/api/getaccesstoken";
    var fullUrl = url;

    return this.http.get<any>(fullUrl, { headers: hed });

  }

  getstatesFromAPi(token: any): Observable<any[]> {
    let hed = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Accept": "application/json"
    });


    var url = "https://www.universal-tutorial.com/api/states/India";
    var fullUrl = url;

    return this.http.get<any[]>(fullUrl, { headers: hed });

  }

  getcitiesFromAPi(token: any, state: any): Observable<any[]> {
    let hed = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Accept": "application/json"
    });


    var url = "https://www.universal-tutorial.com/api/cities/" + state;
    var fullUrl = url;

    return this.http.get<any[]>(fullUrl, { headers: hed });

  }

  submitVendorPancardAttachment(id: any, f: FormData): Observable<any> {
    var url = '/api/expensebillentry/submitpancard/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  addOnlineUser(data: Vendor): Observable<any[]> {
    var url = "/api/vendor/AddOnlinePaymentsUser";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any[]>(fullUrl, data, { headers: this.headers1 });
  }

  deleteOnlineUser(id: number) {
    var url = '/api/deleteOnlinePaymentsUser/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
  }

  //Budet araz apis

  getdeptvenuebaseitemtruerightforbudgetaraz(itsId: any, deptVenueId: any): Observable<any> {
    var url = "/api/budgetaraz/getdeptvenuebaseitemtruerightforbudgetaraz/expense/" + itsId + "/" + deptVenueId;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }

  getDataForEstimateIncome(itsId: any): Observable<any> {
    var url = "/api/budgetaraz/getDataForEstimateIncome/" + itsId;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }

  getBaseItemForDeptVenueId(deptVenueId: any): Observable<any[]> {
    var url = "/api/budgetaraz/getbaseItems/" + deptVenueId;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getItemForBaseItemId(baseItemId: any): Observable<any[]> {
    var url = "/api/budgetaraz/getItems/" + baseItemId;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  arazBudget(data: BudgetAraz): Observable<any[]> {
    var url = "/api/budgetaraz/submit/budgetaraz";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any[]>(fullUrl, data, { headers: this.headers1 });
  }

  submitStudentCount(data: Array<FeeCategoryModel>): Observable<any[]> {
    var url = "/api/budgetaraz/submit/EstimateIncome";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any[]>(fullUrl, data, { headers: this.headers1 });
  }

  deleteBudgetAraz(id: number) {
    var url = '/api/budgetaraz/deletearaz/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
  }

  submitBudgetAudit(model: Array<BudgetAraz>): Observable<any> {

    var url = "/api/budgetaraz/submit/budgetarazbyAdmin";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
  }

  //bill entry management

  submitBills(data: Array<BillManagement>): Observable<any> {
    var url = "/api/billmanagement/addBill";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
  }

  getTodayBillDetails(): Observable<any[]> {
    var url = "/api/billmanagement/gettodaysEnteredBills";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getItemForBill(billId: any): Observable<any[]> {
    var url = "/api/billmanagement/getItemsOfBill/" + billId;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getBillLogs(billId: any): Observable<any[]> {
    var url = "/api/billmanagement/getLogsOfBill/" + billId;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  submitBillAttachment(id: any, f: FormData): Observable<any> {
    var url = '/api/billmanagement/billattachments/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  submitToBePaidBills(f: Array<BillManagement>): Observable<any> {
    var url = '/api/billmanagement/AddtobepaidtoBills';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  payBills(f: Array<BillManagement>): Observable<any> {
    var url = '/api/billmanagement/AddtoPaidtoBills';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  backToApprovedBills(f: Array<BillManagement>): Observable<any> {
    var url = '/api/billmanagement/gobacktoApprovedStatus';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  getBillDetails(): Observable<any[]> {
    var url = "/api/billmanagement/getallbills";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getOnlinePaymentUsers(): Observable<any[]> {
    //this._loader.callLoaderMethod('show');
    var url = "/api/vendor/getOnlinePaymentsUser";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getPendingBillDetails(): Observable<any[]> {
    var url = "/api/billmanagement/billstep1getBillsForapprovedorrejected";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  ApproveRejectBillStatus(id: number, status: string, reason: string): Observable<any[]> {
    var url = "/api/billmanagement/billstep1approvedorrejected/" + id + "/" + status + "/" + reason;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getVendorLeader(id: number): Observable<any> {
    this._loader.callLoaderMethod('show');
    var url = "/api/feecontroller/getVendorLedger/" + id;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }

  getBillBankDetails(id: number): Observable<any> {
    //this._loader.callLoaderMethod('show');
    var url = "/api/billmanagement/getBillDetails/" + id;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }

  getApprovedBillDetails(): Observable<any[]> {
    var url = "/api/billmanagement/billstep2getApprovedBills";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getToBePaidBillDetails(): Observable<any[]> {
    var url = "/api/billmanagement/billstep2getToPaidBills";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getRemainingBudget(deptVenueId:number, baseItemId:number): Observable<any[]> {
    var url = "/api/budgetaraz/getSpecificsanctionedBudget/" + deptVenueId + "/" + baseItemId;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getDeptVenueCashWalletLedger(id:number) : Observable<any> {

    var url = "/api/imprestcash/getDeptVenueWalletLeader/"+id;
    var fullUrl = environment.baseUrl + url;
  
    return this.http.get<any>(fullUrl, { headers: this.headers1 });
  }

  refillDeptVenueCashWallet(model:FeeTransaction) : Observable<any[]> {
 
    var url = "/api/imprestcash/addamounttodeptvenuewallet";
    var fullUrl = environment.baseUrl + url;
  
    return this.http.post<any[]>(fullUrl, model, { headers: this.headers1 });
  }

  getVendorPayments(model: Reciept): Observable<any> {

    var url = "/api/billmanagement/getpayments";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, model, { headers: this.headers1 });
  }

  GetNEFTBobToOtherDataToExport(f: any) {
    var url = '/api/exporttoexcelnew/bobtoother';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  GetNEFTBobToBobDataToExport(f: any) {
    var url = '/api/exporttoexcelnew/bobtoBOB';
    var fullUrl = environment.baseUrl + url;
    return this.http.post<any>(fullUrl, f, { headers: this.headers1 });
  }

  //inventory maintenance
  getallBaseItem(): Observable<any[]> {
    var url = "/api/newitem/getallbaseitem";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getallItems(): Observable<any[]> {
    var url = "/api/newitem/getallitem";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  getItemBaseitem(): Observable<any[]> {
    var url = "/api/newitem/getitembaseitem";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  addItem(data: BillManagement): Observable<any> {
    var url = "/api/newitem/additem";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
  }

  addBaseItem(data: BillManagement): Observable<any> {
    var url = "/api/newitem/addbaseitem";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
  }

  addItemBaseItem(data: BillManagement): Observable<any> {
    var url = "/api/newitem/additem_baseitem";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any>(fullUrl, data, { headers: this.headers1 });
  }

  deleteItemBaseItemMapping(id: number) {
    var url = '/api/item/deleteitembaseitemmapping/' + id;
    var fullUrl = environment.baseUrl + url;
    return this.http.delete<any[]>(fullUrl, { headers: this.headers1 });
  }

  getBudgetSanction(): Observable<any[]> {
   
    var url = "/api/budgetaraz/getsanctionedBudget";
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  sanctionBudget(data: BudgetAraz): Observable<any[]> {
    var url = "/api/budgetaraz/submit/budgetarazsanctioned";
    var fullUrl = environment.baseUrl + url;

    return this.http.post<any[]>(fullUrl, data, { headers: this.headers1 });
  }

  activeBaseItem(id: number): Observable<any[]> {
    var url = "/api/newitem/activebaseitem/" + id ;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }

  inActiveBaseItem(id: number): Observable<any[]> {
    var url = "/api/newitem/INactivebaseitem/" + id ;
    var fullUrl = environment.baseUrl + url;

    return this.http.get<any[]>(fullUrl, { headers: this.headers1 });
  }


}
