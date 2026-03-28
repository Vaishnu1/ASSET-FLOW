import { BaseModel } from "./baseModel";

export class EntityGroup extends BaseModel {

    public entityGroupId ?: number;

    public orgId ?: number;

    public orgName ?: string;

    public entityGroupName : string;

    public entityGroupDesc ?: string;

    public active ?: boolean;

    public createdBy ?:string;
	
	public createdDt ?:Date;;
	
	public updatedBy ?:string;
	
	public updatedDt ?:Date;
	
	public pageNumber ?:number;

	public recordsPerPage ?:number;

	public updatedDtDisp ?:string;

    public createdDtDisp ?:string;
    
}
