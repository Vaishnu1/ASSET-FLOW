import { BaseModel } from '../base/baseModel';

export class BuildingSegmentModel extends BaseModel{
     
    public orgId ?: number;

    public locationName ?: string;

    public locationId ?: number;

    public buildingSegmentId ?: number;

    public segmentName ?: string;

    public segmentDesc ?: string;

    public active ?: boolean;
    
    public createdBy ?: string;
    
    public createdDt ?: Date;
    
    public updatedBy ?: string;
    
    public updatedDt ?: Date;
    
	public pageNumber ?: number;

	public recordsPerPage ?: number;

	public updatedDtDisp ?: string;

	public createdDtDisp ?: string;
	
	public logInUserOrgId ?: number;
	
	public logInUserLocId ?: number;
	
    public logInUserId ?: number;
    
    public activeDisp ?: boolean;

    public activeDisplay ?: string

}