import { BaseModel } from "../base/baseModel";

export class POPricelistDtl extends BaseModel {

public poPriceDtlId ? : number;

public poPriceHdrId ? : number;
    
public itemId ? : number;

public itemName ? : string;

public unitPrice ? : string;

public uomCode ? : string;

public supplierId ?: number;

public supplierName ?: string;

public currency ?: string;

public startDate ?: Date;

public startDateDisp ?: string;

public endDate ?: Date;

public endDateDisp ?: string;

public createdBy ?:string;

public createdDtDisp ?: string;

public updatedBy ?: string;

public updatedDtDisp ?: string;

}