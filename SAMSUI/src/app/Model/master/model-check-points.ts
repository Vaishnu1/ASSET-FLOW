import { BaseModel } from "../base/baseModel";
export class ModelCheckPointsModel extends BaseModel {

    public orgId ?: number;
    
    public assetGroupId ?: number;

    public modelId ?: number;
    
    public active ?:boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

}
