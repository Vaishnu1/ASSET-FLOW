import { AssetModel } from "./asset";
import { AssetGroupModel } from "./asset-group";
import { BaseModel } from '../base/baseModel';
import { ChildAssetModel } from '../asset/childAsset';

export class Model extends BaseModel{

    public modelId ?: number;

    public orgId ?: number;

    public orgName ?: string;

    public modelName ?: string;

    public modelNo ?: string;

    public businessPartnerName ?: string;

    public assetTypeName ?: string;

    public assetCategoryName ?: string;

    public assetGroupName ?: string;

    public businessPartnerId ?: number;

    public assetTypeId ?: number;

    public assetCategoryId ?: number;

    public assetGroupId ?: number;

    public subCategoryId ?: number;

    public subCategoryName ?: string;

    public active ?: boolean;

    public assetName ?: string;

    public assetDesc ?: string;

    public warrantyPeriod ?: string;

    public modelAttribute1 ?: string;

    public modelAttribute2 ?: string;

    public modelAttribute3 ?: string;

    public modelAttribute4 ?: string;

    public modelAttribute5 ?: string;

    public modelAttribute6 ?: string;

    public modelAttribute7 ?: string;

    public modelAttribute8 ?: string;

    public modelAttribute9 ?: string;

    public modelAttribute10 ?: string;

    public modelAttribute11 ?: string;

    public modelAttribute12 ?: string;

    public modelAttribute13 ?: string;

    public modelAttribute14 ?: string;

    public modelAttribute15 ?: string;

    public modelAttribute16 ?: string;

    public modelAttribute17 ?: string;

    public modelAttribute18 ?: string;

    public modelAttribute19 ?: string;

    public modelAttribute20 ?: string;

    public createdBy ?: string;

    public createdDt ?: any;

    public updatedBy ?: string;

    public updatedDt ?: any;

    public pageNumber ?: number;

	public recordsPerPage ?: number;

	public updatedDtDisp ?: string;

    public createdDtDisp ?: string;

    public assetList?:AssetModel[];

    public modelItemtList?:Model[];

    public imagePath ?:string;

    public assetGroupDesc ?:string;

    public lifeSpan ?:number;

    public functionality ?:string;

    public maintenanceFreq ?:string;

    public assetGroupTO ?:AssetGroupModel;

    public searchValue?: string;

    public pmfComplexity?: string;

    public selfAnalysisList?:Model[];

    public additionalInfoList?:Model[];

    public solutionBankList?:Model[];

    public checkPointsList ?: Model[];

    public modelDocList ?: Model[];

    public modelImageList ?: Model[];

    public childAssetList ?: ChildAssetModel[];

    public expectedLifeInYears ?: number;

    public maintainanceThresholdPer ?: number;

    public DepreciationMethodId ?: number;

    public DepreciationMethodName ?:string;

    public rateOfDepreciation ?: number;

    public setScrapValuePer ?: number;

    public activeDisplay ?: string;

 }
