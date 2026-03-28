import { BaseModel } from "../base/baseModel";

export class DeviceCodeModel extends BaseModel{
    public deviceCodeId ?: number;

    public deviceCode ?: string;

    public deviceConcept ?: string;

    public active ?: boolean;

    public createdBy ?: string;

    public createdDt ?: Date;

    public updatedBy ?: string;

    public updatedDt ?: Date;

     public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public createdDtDisp ?: string;

    public orgId ?: number;
}