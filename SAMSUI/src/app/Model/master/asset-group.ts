import { AssetCustFieldValue } from "./asset-cust-field-value";
import { BaseModel } from "../base/baseModel";

export class AssetGroupModel extends BaseModel {

    public assetGroupId ?: number;

    public assetGroupName ?: string;

    public assetGroupDesc ?: string;

    public assetTypeId ?: number;

    public assetTypeName ?: string;

    public assetCategoryId ?: number;

    public assetCategoryName ?: string;

    public subCategoryId ?: number;

    public subCategoryName ?: string;

    public orgId ?: number;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDt ?: Date;

    public createdDt ?: Date;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public frequency1 ?: string;

    public frequency2 ?: string; 

    public frequency3 ?: string; 

    public maintenanceStrategy ?: string;

    public criticalNature ?: string;

    public emScore ?: string;

    public childAsset ?: boolean;

    public assetCustomFieldValue ?:AssetCustFieldValue[];

    public assetGroupAttribute1 ?: string;
    public assetGroupAttribute2 ?: string;
    public assetGroupAttribute3 ?: string;
    public assetGroupAttribute4 ?: string;
    public assetGroupAttribute5 ?: string;

    public columnName ?: string;
    public direction ?: string;

    public isListEmpty ?:boolean;

    public specification ?: boolean;

    public deviceCode ?: string;

    public deviceConcept ?: string;

    public assetGroupCode ?:string;

}
