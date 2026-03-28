import { BaseModel } from '../base/baseModel';

export class CustomerModel extends BaseModel {

   public customerId  ?: number;
   
    public customerName ?:  string;
   
    public customerCode ?: string;
   
    public customerSiteList ?:string;

    public pageNumber ?: number;

	public recordsPerPage ?: number; 
	
	public  updatedDtDisp ?: string;

    public createdDtDisp ?: string;
    
    public createdBy ?: string;
	
    public createdDt ?: Date;
	
	public updatedBy ?:string;
	
	public updatedDt ?: Date;
	
    public active ?: boolean;
    
    public orgId ?: number;

    public  customerArea ?: string;
    
    public  customerCity ?: string;
    
    public  customerState ?: string;
   
    public  customerCountry ?: string;
    
    public  customerCountryId ?: string;

    public activeDisp ?:boolean;

    public activeDisplay ?:string;

    public customerSiteName ?: string;

    public customerSinceDtDisp ?: string;

    public customerSinceDt ?: string;

    public activeYOrN ?: string;

    public contactPersonNo ?: string;
}