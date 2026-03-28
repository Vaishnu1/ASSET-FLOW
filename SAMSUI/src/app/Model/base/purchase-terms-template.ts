import { BaseModel } from "./baseModel";

export class PurchaseTermsTemplate extends BaseModel{

    public tcTemplateHdrId ?: number;

    public orgId ?: number;

    public orgName ?: string;

    public processName ?: string;

    public templateName ?: string;

    public remarks ?: string;

    public active ?: boolean;

    public createdBy ?:string;
	
	public createdDt ?:Date;;
	
	public updatedBy ?:string;
	
	public updatedDt ?:Date;;
	
	public pageNumber ?:number;

	public recordsPerPage ?:number;

	public updatedDtDisp ?:string;

	public createdDtDisp ?:string;

}
