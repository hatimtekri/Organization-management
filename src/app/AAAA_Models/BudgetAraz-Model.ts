export class BudgetAraz {

    public id: number | undefined;
    public deptVenueId: number | undefined;
    public baseItemId: number | undefined;
    public itemId: number | undefined;
    public amountPerUom: number | undefined;
    public quantity: number | undefined;
    public uom: string | undefined;
    public justification: string | undefined;
    public createdOn: Date | undefined;
    public createdBy: string | undefined;
    public amountPerUom_admin: number | undefined;
    public quantity_admin: number | undefined;
    public remarks_admin: string | undefined;
    public updatedOn: Date | undefined;
    public updatedBy: string | undefined;
    public adminWorkStatus: boolean | undefined;
    public financialYear: number | undefined;
    public deptVenueName: string | undefined;
    public baseItemName: string | undefined;
    public itemName: string | undefined;
    public totalAmount: number | undefined;
    public select: boolean | undefined;
    public adminWorkStatusString: string | undefined;

    public search_deptVenueNameDD: Array<string> | undefined;
    public search_baseItemNameDD: Array<string> | undefined;
    public search_itemNameDD: Array<string> | undefined;
    public search_workStatusNameDD: Array<string> | undefined;



    constructor() { }
}
