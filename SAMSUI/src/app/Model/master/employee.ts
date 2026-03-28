import { BaseModel } from "../base/baseModel";

export class EmployeeModel extends BaseModel{

    public employeeId ?:number;

    public locationId ?:number;

    public employeeCode ?:string;

    public employeeFirstName ?:string;

    public employeeLastName ?:string;

    public gender ?:string;

    public dateOfJoining ?: Date;

    public dateofRelieving ?: Date;

    public officeContactNo ?:string;

    public personalContactNo ?:string;

    public employeeSurName ?:string;

    public employeeGivenName ?:string;

    public officeEmailId ?:string;

    public personalEmailId ?:string;

    public resAddress1 ?:string;

    public resAddress2 ?:string;

    public resCity ?:string;

    public resState ?:string;

    public resCountry ?:string;

    public resPostalCd ?:string;

    public active ?: boolean;

    public employeeStatus ?:string;

    public createdBy ?: string;

    public createdDt ?: Date;

    public createdDtDisp ?: string;
    
    public updatedBy ?: string;
    
    public updatedDt ?: Date;

    public updatedDtDisp ?:string;
    
    public pageNumber ?: number;
    
    public recordsPerPage ?: number;

    public dateOfRelievingDisp ?: string;

    public dateOfJoiningDisp ?:string;

    public orgName ?: string;

    public orgId ?: number;

    public isListEmpty ?: boolean;

    public imagePath ?: string;

    public departmentId ?: number;

    public departmentName ?: string;

    public designationId ?: number;

    public designationName ?: string;

    public locationName ?: string;

    public accessLocName ?: string;

    public activeDisplay ?: string;

    public displayName ?: string;

    public accessLocId ?: number;

}