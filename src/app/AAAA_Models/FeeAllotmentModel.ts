import { FeeTransaction } from "./FeeTransactionModel";

export class FeeAllotment {
    

    public id: number | undefined;
    public allotmentId: number | undefined;
    public amount: number | undefined;
    public name: string | undefined;
    public paymentId: string | undefined;

    public reciept: FeeTransaction | undefined;

    constructor(
        
         
    ){
          
    }
    
 }