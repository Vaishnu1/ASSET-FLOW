import { BaseModel } from '../base/baseModel';

export class BuildingBlockModel extends BaseModel{
     
    public orgId ?: number;

    public locationName ?: string;

    public locationId ?: number;

    public buildingBlockId ?: number;

    public blockName ?: string;

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
    
    public columnName ?: string;

    public desc ?: string;

    public activeDisp ?: boolean;

    public activeDisplay ?: string

}