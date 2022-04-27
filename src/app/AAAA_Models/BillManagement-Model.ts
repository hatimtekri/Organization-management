export class BillManagement {


    public id: number | undefined;
    public vendorId: number | undefined;
    public baseItemId: number | undefined;
    public deptVenueId: number | undefined;
    public billNumber: string | undefined;
    public billDate: Date | undefined;
    public itemId: number | undefined;
    public quantity: number | undefined;
    public amountPerUom: number | undefined;
    public totalAmount: number | undefined;
    public remarks: string | undefined;
    public itemName: string | undefined;
    public deptVenueName: string | undefined;
    public vendorName: string | undefined;
    public baseItemName: string | undefined;
    public createdBy: string | undefined;
    public createdOn: Date | undefined;
    public paymentMode_User: string | undefined;
    public paymentMode_Admin: string | undefined;
    public paymentTo_AccNum: string | undefined;
    public paymentTo_AccName: string | undefined;
    public paymentTo_BankName: string | undefined;
    public paymentTo_ifsc: string | undefined;
    public paymentFrom_BankName: string | undefined;
    public status: string | undefined;
    public isWaived: boolean | undefined;
    public packageId: number | undefined;
    public select: boolean | undefined;
    public payableAmount: number | undefined;

    public gstPercentage: number | undefined;
    public gstAmount: number | undefined;
    public tdsApplicableAmount: number | undefined;
    public tdsPercentage: number | undefined;
    public tdsAmount: number | undefined;
    public conveyanceAmount: number | undefined;
    public isReconciled: boolean | undefined;

    public itemGstPercentage: number | undefined;
    public itemGstAmount: number | undefined;
    public paymentMode: number | undefined;


    public search_deptVenueNameDD: Array<string> | undefined;
    public search_baseItemNameDD: Array<string> | undefined;
    public search_vendorNameDD: Array<string> | undefined;

    public txnId: string | undefined;

    constructor(


    ) {

    }

}