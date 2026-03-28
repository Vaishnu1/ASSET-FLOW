
import { Model } from './model';
import { AssetGroupModel } from './asset-group';
import { BaseModel } from '../base/baseModel';

export class AssetModel extends BaseModel {

	public assetHdrId?: number;
	public assetCode?: string;
	public orgId?: number;
	public locationName?: string;
	public locationId?: number;
	public modelTO?: Model;
	public modelId?: number;
	public modelName?: string;
	public manufacturerId?: number;
	public manufacturerName?: string;
	public warrantyPeriod?: number;
	public contractType?: string;

	public assetCategoryId?: number;
	public assetCategoryName?: string;
	public subCategoryId?: number;
	public subCategoryName?: string;
	public assetGroupId?: number;
	public assetGroupName?: string;
	public assetHdrTypeId?: number;
	public assetHdrTypeName?: string;
	public assetStatusId?: number;
	public assetStatus?: string;

	public assetName?: string;
	public assetDesc?: string;
	public functionalStatus?: string;
	public departmentId?: number;
	public departmentName?: string;
	public subDepartment?: string;
	public subDepartmentId?: number;
	public personInChargeId?: number;
	public personInCharge?: string;
	public contactNo?: string;
	public serialNo?: string;
	public businessPartnerId?: number;
	public businessPartnerName?: string;
	public purchaseDt?: Date;
	public installationDt?: Date;
	public purchaseDtDisp?: string;
	public installationDtDisp?: string;
	public installationRemarks?: string;
	public parentAssetCode?: string;
	public purchaseCurrencyCode?: string;
	public originalPurchaseAmt?: number;
	public exchangeRt?: number;
	public localPurchaseAmt?: number;
	public localTaxRate?: number;
	public localTaxAmt?: number;
	public totalPurchaseAmt?: number;
	public assetLifeInYears?: number;
	public returnDownValue?: number;
	public depreciationMethod?: string;
	public yearOfManufacture?: string;
	public depreciationPercent?: number;
	public disposalRemarks?: string;
	public disposalSuppplier?: string;
	public disposalValue?: number;
	public disposalDt?: any;
	public disposalDtDisp?: string;
	public warrentyDays?: number;
	public warrentyStartDt?: Date;
	public warrentyEndDt?: Date;
	public warrentyStartDtDisp?: string;
	public warrentyEndDtDisp?: string;
	public residualValue?: number;
	public assetRetiredDt?: any;
	public assetRetiredDtDisp?: string;
	public assetRetiredReason?: string;
	public assetHdrAttribute1?: string;
	public assetHdrAttribute2?: string;
	public assetHdrAttribute3?: string;
	public assetHdrAttribute4?: string;
	public assetHdrAttribute5?: string;
	public assetHdrAttribute6?: string;
	public assetHdrAttribute7?: string;
	public assetHdrAttribute8?: string;
	public assetHdrAttribute9?: string;
	public assetHdrAttribute10?: string;
	public createdBy?: string;
	public createdDt?: Date;
	public updatedBy?: string;
	public updatedDt?: any;
	public logInUserId?: number;
	public logInUserOrgId?: number;
	public logInUserLocId?: number;
	public pageNumber?: number;
	public recordsPerPage?: number;
	public updatedDtDisp?: string;
	public createdDtDisp?: string;

	//public maintenanceType?: string;
	public serviceEngg1?: string;
	public serviceEngg2?: string;
	public serviceEngg3?: string;
	public serviceEngg4?: string;
	public serviceEngg5?: string;
	public serviceEngg1Id?: number;
	public serviceEngg2Id?: number;
	public serviceEngg3Id?: number;
	public serviceEngg4Id?: number;
	public serviceEngg5Id?: number;

	public assetList?: AssetModel[];

	public displayAddIconFlag?: boolean;
	public reportType?: string;
	public srCheckBox?: string;
	public scheduleCheckBox?: string;
	public contractCheckBox?: string;
	public purchaseCheckBox?: string;

	public ownershipType?: string;
	public purchaseOrderNo?: string;
	public scrapValue?: number;
	public assetModel?: string;

	public assignTo?: string;

	public assetGroupTO?: AssetGroupModel;

	public searchValue: string;
	public searchValue1: string;

	public amcPercent: number;
	public cmcPercent: number;
	public unMatched: boolean;
	public valuePerUnit: number;

	public amcValue: number;
	public cmcValue: number;
	public amcEscalationPercentage: number;
	public cmcEscalationPercentage: number;
	public amcEscalationValue: number;
	public cmcEscalationValue: number;

	public warrantyCoveragePart: string;
	public warrantyCoverageLabor: string;

	public criticalNatureUnit: string;

	public warrentyEndDtForLabor?: Date;
	public warrentyEndDtDispForLabor?: string;


	public accessoriesConsumablesTOList?= [];
	
	public cusFieldList?= [];
	public pmFrequency: string;
	public pmMonth: string;
	public lastPMdoneBy: string;
	public lastPMdoneDt: any;
	public lastPMdoneDtDisp: string;

	public paFrequency: string;
	public paMonth: string;
	public lastPAdoneBy: string;
	public lastPAdoneDt: any;
	public lastPAdoneDtDisp: string;

	public qaFrequency: string;
	public qaMonth: string;
	public lastQAdoneBy: string;
	public lastQAdoneDt: any;
	public lastQAdoneDtDisp: string;

	public customerName: string;
	public customerId: Number;

	public defaultLocId: number = 0;

	public doNo?: string;
	public doDt?: Date;
	public doDtDisp?: string;
	public bookedValue?: number;
	public noOfYears?: number;
	public insertMode?: string;

	//FOR LIST CONDITION
	public source: string;

	public changeCeidReqFlag : boolean = false;

	public equipmentCode :string;

	//For Validation Check In Contract Asset Add
	public contractStartDt :string;
	public contractEndDt :string;
	public coverageType :string;

	public assignToPersonId :number;

	public maintainanceThreshold : number;

	public description :string;

	public priorityName : string;

	public riskNature : string;


	public screenType : string;
	public approvalStatusAsset: string;

	public scheduleType : string;
	public scheduleStartDt: string;
	public scheduleEndDt : string;
	public locationType : string;

	public certificateId ?: number;
	public certificateName ?: String;

	public handoverDtDisp ?: string;

	public handoverStatusDisplay ?: string;

	public handoverCompletedStatus ?: boolean;

	public statusType ?: string;
	public assetCondition ?: string;
	public statusTypeId?: number;
	public assetConditionId?: number;
	public processStatusId?: number;
	public processStatus ?: string;
	public processName ?: string;
	public processId?: number;
  	public remarks ?: string;
  	public transactionSrc ?: string;
  	public avilableToProcess ?: boolean;
	public minAge ?: number;
	public maxAge ?: number;
	public workflowProcessStatusId ?: number;

	public changeAssetCodeReqFlagDisp ?: string;
	public changeAssetCodeReqFlag ?: boolean;

	public technicianType?: string;

	public printAssetAssigneeInfo?: string;
	public printChildAssetInfo?: string;
	public printContractInfo?: string;
	public printMaintenanceScheduleInfo?: string;
	public printCertificatesInfo?: string;
	public printSRInfo?: string;
	public printCustomFieldsInfo?: string;

	public amFrequency: string;
	public amMonth: string;

	public pmDtDisp?: string;
	public paDtDisp?: string;
	public qaDtDisp?: string;
	public amDtDisp?: string;

	public selectedLocationIds ?: number[];
	public selectedModelIds ?: number[];
	public selectedBusinessPartnerIds ?: number[];
	public selectedAssetStatusIds ?: number[];
	public selectedOwnershipTypes ?: string[];
	public selectedFunctionalStatus ?: string[];
	public selectedAssetCategoryIds ?: number[];
	public selectedSubCategoryIds ?: number[];
	public selectedAssetGroupIds ?: number[];
	public selectedDepartmentIds ?: number[];
	public selectedAssignedToIds ?: number[];
	public selectedManufacturerIds ?: number[];


	public selectedLocationNames : any = null;
	public selectedModelNames ?: any = null;
	public selectedBusinessPartnerNames ?: any = null;
	public selectedAssetStatusNames ?: any = null;
	public selectedAssetCategoryNames ?: any = null;
	public selectedSubCategoryNames ?: any = null;
	public selectedAssetGroupNames ?: any = null;
	public selectedDepartmentNames ?: any = null;
	public selectedAssetCodes ?: any = null;
	public selectedAssignedToNames ?: any = null;
	public selectedManufacturerNames ?: any = null;

	// For Dashboard Navigation
	public searchFor?: string;
	public maintenanceThresholdExceeded?: boolean;
	public loanedOutInternal?: boolean;
	public loanedOutExternal?: boolean;
	public unCoveredAssets?: boolean;
}
