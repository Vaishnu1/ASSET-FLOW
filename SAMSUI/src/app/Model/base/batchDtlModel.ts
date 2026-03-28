import { BaseModel } from './baseModel';

export class BatchDtlModel extends BaseModel{

    public batchDtlId?: number;

    public batchHdrId?: number;

    public assetId?: number;

    public assetCode?: string;

    public description?: string;

    public serialNo?: string;

    public assetCategoryName?: string;

    public subCategoryName?: string;

    public assetGroupName?: string;

    public modelName?: string;

    public supplierName?: string;

    public manufacturerName?: string;

    public departmentName?: string;

    public functionalStatus?: string;

    public priorityName?: string;

    public riskNature?: string;

    public assetStatus?: string;

    public assetStatusId?: number;

    public modelId?: number;

    public supplierId?: number;

    public locationName?: string;

    public locationId?: number;

    public locationType?: string;

    public manufacturerId?: number;

    public assetGroupId?: number;

    public subCategoryId?: number;

    public departmentId?: number;

    public subDepartmentId?: number;

    public subDepartment?: string;

}

