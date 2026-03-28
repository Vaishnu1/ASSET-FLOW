import { BaseModel } from "../base/baseModel";

export class PriorityModel extends BaseModel {

    public priorityId ?: number;

    public orgId ?: number;

    public priorityName ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDt ?: Date;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDt ?: Date;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;
    
    public locationId ?:number;

    public locationName ?:string;
}
