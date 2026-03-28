import { BaseModel } from '../base/baseModel';

export class SupplierModelSuppliedModel extends BaseModel{

    public assetSuppliedId ?: number;
    public  supplierId ?: number;
    public  orgId ?: number;
    public  manufacturerId ?: number;
    public  manufacturerName ?: string;
    public  assetGroupId ?: number;
    public  assetGroupName ?: string;
    public  modelId ?: number;
    public  modelName ?: string;
    public  createdBy  ?: string;
    public  createdDt  ?: string;
    public  updatedBy  ?: string;
    public  updatedDtDt ?: string;

}