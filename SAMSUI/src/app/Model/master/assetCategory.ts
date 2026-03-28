import { BaseModel } from "../base/baseModel";

export class AssetCategoryModel extends BaseModel {

    public assetCategoryId ?: number;

    public orgId ?: number;

    public assetCategoryName ?: string;

    public businessType ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public columnName ?: string;

    public direction ?: string;

    public isListEmpty ?:boolean;

    public maintenanceInchargeRequired ?: boolean;

    public specification ?:boolean;

    public depreciation ?:boolean;

    public modelItems ?:boolean;

    public document?:boolean;

    public selfAnalysis?:boolean;

    public additionalInfo?:boolean;

    public checkList?: boolean;

    public solutionBank?: boolean;

    public assetId ?: number;

    public technicalSpecelist?:boolean;

    public inventoryModule?:boolean

    public assetCategoryCode ?: string;

    public maintenanceSchedule?: boolean;

    public childModel?: boolean;

}
