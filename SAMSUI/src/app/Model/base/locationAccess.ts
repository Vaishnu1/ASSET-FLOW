import { BaseModel } from "./baseModel";

export class LocationAccessModel extends BaseModel {

    public userLocAccessId?:number;
	
	public locationId?:number;
	
	public userId?:number;
	
	public accessLocationId?:number;
	
	public accessLocName?:string;
	
	public createdBy?:string;
	
	public createdDt?:Date;
	
	public allocateFlag?:boolean;
	
    public userName?:string;

    public loginId?:string;
    
	public pageNumber?:number;

	public recordsPerPage?:number;

	public createdDtDisp?:string;

	public locationName?:string;

	public locationCode?:String;

	public locShortName?:String;
}