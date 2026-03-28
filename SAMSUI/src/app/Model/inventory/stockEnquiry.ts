import { BaseModel } from "../base/baseModel";

export class StockEnquiryModel extends BaseModel{
    
    public invDtlId ?: number;

    public storeId ?:number;

    public storeName ?: string;

    public itemId ?: number;

    public itemCd ?: string;

    public itemDesc ?: string;

    public itemTypeId ?: any;

    public itemTypeName ?: string;
    
    public uomCd ?: string;
 
    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public manufacturerPartNo ?: string;

    public doNo ?: string;

    public locationId ?: number;
    
    public locationName ?: string;

}