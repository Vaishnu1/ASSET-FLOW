export class GroupModuleAccessModel {
	
	public orgId ?:number;
	
	public groupId ?:number;

	public groupName ?:String;
	
	public moduleIdView ?:number;

	public moduleNameView ?:String;

	public moduleDescView ?:String;
	
	public menuId ?:number;

	public menuName ?:String;
	
	public createFlag ?:String;
	
	public readFlag ?:String;
	
	public updateFlag ?:String;
	
	public deleteFlag ?:String;

	public createFlagView ?:String;
	
	public readFlagView ?:String;
	
	public updateFlagView ?:String;
	
	public deleteFlagView ?:String;

	public createFlagDisplay ?:boolean;
	
	public readFlagDisplay ?:boolean;
	
	public updateFlagDisplay ?:boolean;
	
	public deleteFlagDisplay ?:boolean;
    
    public recordsPerPage ?: number;

	public pageNumber ?:number;
	
}