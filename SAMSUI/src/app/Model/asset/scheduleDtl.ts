export class ScheduleDtlModel{

    public  scheduleDtlId ?:number;
	
	public  scheduleHdrId ?:number;
 
    public  assetHdrId ?:number;
    
    public scheduleTitle ?: string;
	
	public  occurrenceNo ?:number;

	public  scheduleDate ?:Date;

	public  startTime ?: Date;

	public  endTime ?: Date;

	public  assignedTechnician ?:number; 
	
	public  assignedBy ?:string;
	
	public  status ?:string;
	
	public  cancelledBy ?: string;
	
	public  cancelledReason ?: string;
	
	public  customerFeedback ?: string;

	public  maintenanceDocument ?: string;

	public  createdBy ?: string;
	
	public  createdDt ?: Date;
	
	public  updatedBy ?: string;
	
	public  updatedDt ?:Date;

	public  active ?:boolean;
	
	public  pageNumber ?: number;

	public  recordsPerPage ?:number;

	public  updatedDtDisp ?:string;

	public  createdDtDisp ?:string ;
	
	public  activeDisp ?:string;

	
	public  plannedSchedules ?:number;

	public  completedSchedules ?:number;
	

	public  startTimeDisp ?:string;


	public  endTimeDisp ?:string;

	public  upComingSchedule ?:string;

	public assetCode ?:string;

	public scheduleDateDisp?: string;

	public cancelledSchedules ?: string;

	public scheduleAlreadyExistForPeriod?: boolean;

	public scheduleAlreadyExistForPeriodScheduleName?: string;

}
