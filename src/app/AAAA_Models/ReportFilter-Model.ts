import { PrintProfileSuppressDetails } from "./PrintProfile_Suppress_Details";

export class ReportFilter {



  public  id : number | undefined;
  public  reciptId : number | undefined;
  public  itsId : string | undefined;
  public  deptVenueId : number | undefined;
  public  fromDate : Date | undefined;
  public  toDate : Date | undefined;


  public  hijriMonth : number | undefined;
  public  hijriYear : number | undefined;

  public  type : string | undefined;
  public  copyType : string | undefined;
  public supress:PrintProfileSuppressDetails|undefined;
  
  constructor(
      ){

      }

   }
