import { BaseModel } from '../base/baseModel';

export class MaintenanceScheduleHdrModel extends BaseModel{
    public scheduleHdrId ?: number;
    public scheduleTitle ?: string;
    public scheduleType  ?: string;
    public priority      ?: string;
    public frequency     ?: string;
    public startDate     ?: Date;
    public srCreateBfrSch ?: number;
    public occurances    ?: number;
    public scheduleEndType ?: string;
    public startDateDisp ?: string;
    public endDateDisp ?: string;
	public recordsPerPage ?:number;	
    public pageNumber?:number;
    public assetList ?:number[];
    public assetHdrId ?: number;
    public locationId ? : number;
    public locationName ? : string;
    public assetCode?: string;
    public scheduleTypeName?: string;
   
}