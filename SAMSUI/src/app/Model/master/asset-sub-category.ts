import { BaseModel } from "../base/baseModel";

export class AssetSubCategoryModel extends BaseModel{

    public subCategoryId ?: number;

    public orgId ?: number;

    public subCategoryName ?: string;

    public categoryId ?: number;

    public categoryName ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public isListEmpty ?:boolean;

    public sourceScreen ?:string;

    public expectedLifeInYears ?: number;

    public maintainanceThresholdPer ?: number;

    public DepreciationMethodId ?: number;

    public DepreciationMethodName ?:string;

    public rateOfDepreciation ?: number;

    public scrapValuePer ?: number;

    public assetSubCategoryCode ?:string;

}
