import { BaseModel } from "../base/baseModel";

export class ParameterGroupModel extends BaseModel {

    public parameterGroupId ?: number;

    public orgId ?: number;

    public parameterGroupName ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public locationId ?:number;

    public locationName ?:string;
}
