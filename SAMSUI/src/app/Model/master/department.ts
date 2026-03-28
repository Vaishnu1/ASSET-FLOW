import { BaseModel } from "../base/baseModel";

export class departmentModel extends BaseModel{

    public departmentId ?: number;

    public orgId ?: number;
    
    public departmentName ?: string;

    public departmentDesc ?: string;
   
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
	
    public orgName ?: string;
    
    public locationId ?: number;

    public locationName ?: string;

    public emailId ?: string;

    public contactNo ?: string;

    public departmentCode ?: string;
}