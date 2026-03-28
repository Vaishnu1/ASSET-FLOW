import { BaseModel } from "../base/baseModel";

export class Attribute4Model extends BaseModel {

    public srAttributeId4 ?: number;

    public orgId ?: number;

    public attribute4Name ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public isListEmpty?:boolean;
}