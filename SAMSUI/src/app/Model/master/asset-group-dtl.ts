import { Model } from "./model";
import { AssetCustFieldValue } from "./asset-cust-field-value";
import { BaseModel } from "../base/baseModel";
import { AssetGroupModel } from "./asset-group";

export class AssetGroupDtlModel extends BaseModel {

    public assetGroupDtlId ?: number;

    public assetGroupId ?: number;

    public modelId ?: number;

    public modelName ?: string;
    
    public active ?:boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public modelTO ?: Model;

    public assetGroupTO ?: AssetGroupModel;

    

}
