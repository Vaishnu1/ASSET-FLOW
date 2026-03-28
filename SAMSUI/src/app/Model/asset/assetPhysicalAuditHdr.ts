import { BaseModel } from '../base/baseModel';

export class AssetPhysicalAuditHdrModel extends BaseModel {

    public  assetPhyAuditHdrId ?:number;

    public  orgId ?: number;
	
	public  locationId ?: number;

    public  locationName ?: string;
	
	public  phyAuditName ?: string;
	
	public  phyAuditDate ?:Date;

	public  phyAuditStatus ?: string;

	public assetAuditStatusId ?: number;
                  
	public  approvedBy ?: string; 
	
	public  approvedDate ?: Date;
	
	public  endDate ?: Date;

	public noOfAssetAudited?:number;

	public noOfAssetUnAudited?:number;

	public  createdBy ?: string; 

	public  createdDt ?: Date;
	
	public  updatedBy ?: string;

	public  updatedDt ?: Date;

	public  active ?: boolean;

	public  phyAuditDateDisp ?: string;
	
    public  approvedDateDisp ?: string;
    
	public recordsPerPage ?:number;
	
	public pageNumber?:number;

	public scheduleFromDate ?: string;

	public scheduleToDate ?: string;


}