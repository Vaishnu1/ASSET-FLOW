import { BaseModel } from '../base/baseModel';

export class subDepartmentModel extends BaseModel{

    public departmentId ?: number;

    public departmentName ?: string;

    public subDepartmentId ?: number;

    public subDepartmentName ?: string;

    public employeeId ?: number;

    public subDepEmployeeName ?: string;
   
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
    
    public isListEmpty ?:boolean;

    public subDepEmailId ?: string;

    public subDepContactNo ?: string;

    public orgId ?: number;

    public orgName ?: string;

    public subDepartmentCode ?: string;

	
}