import { BaseModel } from "./baseModel";

export class Region extends BaseModel {

    public regionId ?: number;

    public orgId ?: number;

    public orgName ?: string;

    public locationId ?: number;

    public regionName ?: string;

    public regionDesc ?: string;

    public active ?: boolean;

    public createdBy ?:string;
	
	public createdDt ?:Date;;
	
	public updatedBy ?:string;
	
	public updatedDt ?:Date;;
	
	public pageNumber ?:number;

	public recordsPerPage ?:number;

	public updatedDtDisp ?:string;

	public createdDtDisp ?:string;

    public regionCode  ?:string;
}
