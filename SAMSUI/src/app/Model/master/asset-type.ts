import { BaseModel } from "../base/baseModel";

export class AssetTypeModel extends BaseModel{

    public assetTypeId ?: number;

    public assetTypeName ?: string;

    public orgId ?: number;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public  createdDt?:Date; 
    
    public  updatedDt?:Date;

    public subCategoryName ?: string;

    public subCategoryId ?: number;

}
