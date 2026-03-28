import { BaseModel } from '../base/baseModel';

export class InwardInventoryHdrModel extends BaseModel{

    public orgId ?: number;
   
    public locationName ?: String;

    public businessPartnerName ?: String;
    
    public businessPartnerId ?: number;
	
	public businessPartnerSiteId ?: number;
	
	public businessPartnerSiteName ?: String;
	
	public locationId ?: number;
	
	public poNumber ?: String;
	
	public poDate ?: Date;
	
	public expectedArrivalDt ?: Date;
	
	public totalQty ?: number;
	
    public totalUnitPrice ?: number;
	
	public totalTaxAmount ?: number;
	
	public totalAmt ?: number;
	
	public active ?: boolean;
    
    public inwardInventoryDtlList ?: String[];
    
    public poDateDisp ?: String;
	
    public expectedArrivalDtDisp ?: String;
    
    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public preInwStatusId  ?: number;

    public preInwStatusName ?: String;

    public fromDt ?: Date; 

    public toDt ?: Date;
    
    public fromDtDisp ?: string;

    public toDtDisp ?: string;
	
}