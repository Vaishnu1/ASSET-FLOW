import { BaseModel } from "./baseModel";

export class LegalEntity extends BaseModel{

    public legalEntityId ?: number;

    public orgId ?: number;

    public orgName ?: string;

    public entityGroupId ?: number;

    public entityGroupName ?: string;

    public legalEntityName ?: string;

    public legalEntityDesc ?: string;

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
