import { BaseModel } from '../base/baseModel';

export class CustomerSiteModel extends BaseModel{
    
    public customerSiteId ?: number
	
    public customerId ?: number;

	public  customerSiteName ?: string;

	public   custContactPerson ?: string;
	
	public   custContactPersonContactNo ?:string;

	public   custContactPersonEmailId ?: string;
	
	public   custSiteAddress1 ?: string;

	public   custSiteAddress2 ?: string;

	public   customerArea ?: string;

	public   customerCity ?: string;
	
	public   customerState ?: string;

	public   customerCountry ?: string;
	
	public   custSitePinCode ?: string;

	public   custSiteCompanyPhoneNo ?: string;
	
	public   custSiteCompanyLandLineNo ?: string;	

	public   custSiteCompanyEmailId ?: string;

	public   custSiteCurrencyCode ?: string;

	public   custSitePaymentTerms ?: string;

	public   custSitePaymentMethod ?: string;
	
    public   custSiteWebsite ?: string;
    
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
	
	public customerSiteRegList ?:[]

}