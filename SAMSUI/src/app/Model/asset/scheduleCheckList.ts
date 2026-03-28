export class ScheduleChecklistModel{

    public  checkPointId ?:number;
	
	public  scheduleDtlId ?:number;
	
	public  checkPointsName ?:string;
	
	public  checkPointsType ?:string;
	
	public  uom ?:string;

	public  unit ?:number;
	
	public  standardValue ?:number;
	
	public  measuredValue ?:number;
	
	public  tolerance:number;
	         
	public  result ?: boolean;
	 
	public  active ?: boolean;
	
	public  createdBy ?: string;
	 
	public  createdDt ?: Date;
	
	public  updatedBy ?: string;
	
	public  updatedDt ?: Date;

	public  pageNumber ?: number;

	public  recordsPerPage ?: number;

	public  updatedDtDisp ?: string;

    public  createdDtDisp ?: string;
    
    public activeDisp ?: string;
}