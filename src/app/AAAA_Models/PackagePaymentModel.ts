import { BillManagement } from "./BillManagement-Model";

export class PackagePayment {
    

    public id: number | undefined;
    public name: string | undefined;
    public sum: number | undefined;
    public sumPayableAmount: number | undefined;

    public bills : Array<BillManagement> | undefined;

    constructor(
        
         
    ){
          
    }
    
 }