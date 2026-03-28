import { BaseModel } from "./baseModel";

export class PurchaseParameter extends BaseModel{

    public tcParameterId ?: number;

    public orgId ?: number;

    public orgName ?: string;

    public tcParameterName ?: string;

    public tcParameterInputType ?: string;

    public tcParameterInputValues ?: string;

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
