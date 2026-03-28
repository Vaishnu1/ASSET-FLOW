export class ModelItem{
    public  modelItemId ?:number;
    public  orgId?:number;
	public  modelId ?:number;
	public  itemMasterId ?:number;
    public 	itemMasterName?:string;
    public 	itemMasterDesc?:string;
    public 	itemTypeName?:string;
    public 	masterUOMName?:string;	
	public  active ?:string;
    public  activeDisp ?:boolean;
    public  createdBy?:string; 
	public  createdDt?:Date; 
	public  updatedBy?:string; 
    public  updatedDt?:Date; 
    public  updatedDtDisp?:string;
	public  createdDtDisp?:string;
}