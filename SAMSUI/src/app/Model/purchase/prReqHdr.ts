import { BaseModel } from "../base/baseModel";
import { PurchaseRequestDtl } from "./prReqDtl";

export class PurchaseRequestHdr extends BaseModel {

public orgId ? : number;

public orgName ?: string;

public locationId ? : number;
    
public locationName ? : string;

public supplierName ? : string;

public poReqId ?: number;

public poReqNo ?: string;
  
public poReqDt ?: Date;

public poReqDtDisp ?: string;

public prType ?: string;

public requestedBy ?: string;

public poReqStatus ?: string;

public totAmt ?: number;

public remarks ?: string;

public customerId ?: number;

public customerName ? : string;

public assetHdrId ?: number;

public assetCode ?: string;

public srId ?: number

public srNo ?: string;

public approvedBy ?: string;

public approvedDtDisp ?:string;

public createdBy ?:string;

public createdDtDisp ?: string;

public updatedBy ?: string;

public updatedDtDisp ?: string;

public pageNumber ?: number;

public recordsPerPage ?: number;

public poReqDtl ?:PurchaseRequestDtl;

public poReqDtlList ?:PurchaseRequestDtl[];
 
public prGroup ?: string;

public prReason ?: string;

public totalAmount ?: number;

public totalTaxAmount ?: number;

public grandAmount ?: number;

public fromDt?: string;

public endDt?: string;

public orderReason ?: string;

public processStatus ?: string;

public assetGroupId ?: number;

public modelId ?: number;

public physicalDamage ?: string;

public modelName ?: string;

public assetGroupName ?: string;

public workflowProcessStatusId ?: number;

public selectedLocationIds ?: number[];
public selectedAssetHdrIds ?: number[];
public selectedAssetGroupIds ?: number[];
public selectedModelIds ?: number[];
public selectedBusinessPartnerIds ?: number[];
public selectedSrIds ?: number[];

public selectedLocationNames : any = null;
public selectedAssetCodes ?: any = null;
public selectedAssetGroupNames ?: any = null;
public selectedModelNames ?: any = null;
public selectedBusinessPartnerNames ?: any = null;
public selectedSrNos ?: any = null;

} 