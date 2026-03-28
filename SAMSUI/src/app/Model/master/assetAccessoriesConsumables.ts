import { BaseModel } from "../base/baseModel";

export class AccConModel extends BaseModel{

    public accessorieConsumableId ?:number;

    public assetHdrId ?: number;

    public itemId ?:number;

    public itemName ?:string;

    public itemDesc ?:string;

    public itemType ?:string;

    public itemCategoryCode ?: string;

    public manufacturerName ?: string;

    public createdBy ?: string;

    public createdDt ?: Date;

    public createdDtDisp ?: string;
    
    public updatedBy ?: string;
    
    public updatedDt ?: Date;

    public updatedDtDisp ?:string;
    
    public pageNumber ?: number;
    
    public recordsPerPage ?: number;

}