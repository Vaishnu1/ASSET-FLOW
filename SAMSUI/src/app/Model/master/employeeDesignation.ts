import { BaseModel } from "../base/baseModel";

export class EmployeeDesignation extends BaseModel{

    public employeeDesignationId ?:number;

    public employeeId ?:number;

    public designationId ?:string;

    public designationName ?:string;

    public designationfromDate ?:Date;

    public designationtillDate ?: Date;

    public reportingPersonId ?: number;

    public reportingPersonName ?:string;

    public status ?:string;

    public createdBy ?: string;

    public createdDt ?: Date;

    public createdDtDisp ?: string;
    
    public updatedBy ?: string;
    
    public updatedDt ?: Date;

    public updatedDtDisp ?:string;
    
    public pageNumber ?: number;
    
    public recordsPerPage ?: number;

}