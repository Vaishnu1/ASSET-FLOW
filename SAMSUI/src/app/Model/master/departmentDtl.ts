import { BaseModel } from "../base/baseModel";

export class departmentDtlModel extends BaseModel{

    public departFacultyId ?: number;

    public departmentId ?: number;

    public departmentName ?: string;

    public employeeId ?: number;

    public employeeName ?: string;

    public facultyContactNo ?: string;

    public facultyEmailId ?: string;
   
    public active ?:string;

    public activeDisp ?:boolean;

    public createdBy ?: string;

    public createdDt ?: Date;

    public createdDtDisp ?: string;
    
    public updatedBy ?: string;

    public updatedDt ?: Date;
    
    public updatedDtDisp ?: string;
    
    public pageNumber ?: number;
    
    public recordsPerPage ?: number;
	
	public isListEmpty ?:boolean;
}