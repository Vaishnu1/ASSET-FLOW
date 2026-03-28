import { BaseModel } from "../base/baseModel";

export class AssetStatusModel extends BaseModel {

    public assetStatusId ?: number;

    public assetStatusName ?: string;

    public orgId ?: number;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public isListEmpty ?:boolean;
}
