import { BaseModel } from "../base/baseModel";

export class Attribute3Model extends BaseModel {

    public srAttributeId3 ?: number;

    public orgId ?: number;

    public attribute3Name ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;
    
    public isListEmpty?:boolean;

    public locationId ?:number;

    public locationName ?:string;
}