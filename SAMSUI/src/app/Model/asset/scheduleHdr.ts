export class ScheduleHdrModel{

    public  scheduleHdrId ?:number;
	
	public  locationId ?: number;
	
	public  scheduleTitle ?: string;
	
	public  scheduleType ?:string;

	public  priority ?: string;
                  
	public  frequency ?: string; 
	
	public  startDate ?: Date;
	
	public  endDate ?: Date;

	public  occurances ?: number;

	public  createdBy ?: string; 

	public  createdDt ?: Date;
	
	public  updatedBy ?: string;

	public  updatedDt ?: Date;

	public  active ?: boolean;

	public  startDateDisp ?: string;
	
	public  endDateDisp ?: string;

	public scheduleEndType ?:string;

	public assetList ?:number[];

	public recordsPerPage ?:number;
	
	public pageNumber?:number;

	public  locationName ?: string;

}