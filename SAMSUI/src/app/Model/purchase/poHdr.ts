import { BaseModel } from "../base/baseModel";

export class PurchaseOrderHdr extends BaseModel {

    public orgId ? : number;

    public orgName ? : string;
    
    public locationId ? : number;
        
    public locationName ? : string;

    public poId ? : number;
    
    public poNO ? : string;
    
    public poRevNo ? : string;
    
    public poDt ?: Date;

    public poDtDisp ?: string;
    
    public poStatus ?: string;

    public poStatusDisp ?: string;
    
    public poType ?: string;
    
    public completionFlg ?: number;

    public compFlgDisp ?: string;
    
    public businessPartnerId ?: number;
    
    public businessPartnerName ?: string;

    public businessPartnerSiteId ?: number;
    
    public businessPartnerSiteName ?: string;
    
    public shipToLocationId ?: number;
    
    public billToLocationId ?: number;
    
    public shipToLocationName ?: string;
    
    public billToLocationName ?: number;
    
    public contactPerson ?: string;
    
    public shipTermsCd ?: string;
    
    public shipModeCd ?: string;
    
    public payTermsCd ?: string;
    
    public payTermsDays ?: number
    
    public curCd ?: string;
    
    public exchRate ?: number;
    
    public transporterName ?:string;

    public transporterAddress ?:string;

    public poReqDt ?:Date;

    public totalAmt ?:number;

    public localCurCd ?:string;

    public localBasicAmt ?:number;

    public customerId ?:number;

    public customerName ?:string;

    public assetHdrId ?:number;

    public srId ?:number;

    public netTaxAmt ?:number;

    public totalBasicAmt ?:number;

    public freightCharges ?:number;

    public handlingCharges ?:number;

    public otherCharges ?:number;

    public locFreightCharges ?:number;

    public locHandlingCharges ?:number;

    public locOtherCharges ?:number;

    public grandTotal ?:number;

    public localGrandTotal ?:number;

    public createdBy ?:string;

    public createdDt ?: Date;
    
    public createdDtDisp ?: string;
    
    public updatedBy ?: string;

    public updatedDt ?: Date;
    
    public updatedDtDisp ?: string;

    public pageNumber?: number;
    
    public recordsPerPage?: number;

    public active?: boolean;

    public fromDt ?: string;

    public endDt ?: string;

    public prReqNo ?: string;

    public srNo ?: string;

    public poUsage ?: string;

    public processStatus ?: string;

    public workflowProcessStatusId ?: Number;

    public selectedLocationIds ?: number[];
    public selectedBusinessPartnerIds ?: number[];
    
    public selectedLocationNames : any = null;
    public selectedPoNOs ?: string[];
    public selectedBusinessPartnerNames : any = null;
    
    }