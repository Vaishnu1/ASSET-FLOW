import { BaseModel } from '../base/baseModel';

export class DesignationModel extends BaseModel{

    public designationId ?:number;

    public locationId ?:number;

    public designationName ?:string;

    public designationDesc ?:string;

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
