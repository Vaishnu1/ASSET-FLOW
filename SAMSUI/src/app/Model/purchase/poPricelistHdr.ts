import { BaseModel } from "../base/baseModel";
import { POPricelistDtl } from "./poPricelistDtl";

export class POPricelistHdr extends BaseModel {

public poPriceHdrId ? : number;

public orgId ? : number;

public locationId ? : number;
    
public locationName ? : string;

public poPriceName ? : string;

public poPriceDesc ?: string;

public curCd ?: string;

public effcFromDt ?: Date;

public effcFromDtDisp ?: string;

public effcToDt ?: Date;

public effcToDtDisp ?: string;

public active ?: boolean;

public createdBy ?:string;

public createdDt ?:Date;

public createdDtDisp ?: string;

public updatedBy ?: string;

public updatedDt ?: Date;

public updatedDtDisp ?: string;

public pageNumber ?: number;

public recordsPerPage ?: number;

public poPriceList ?:POPricelistDtl[];

}