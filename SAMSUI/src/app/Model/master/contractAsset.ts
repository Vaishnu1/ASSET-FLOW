export class ContractDetailAssetModel {
    public contractAssetId?: number;
    public contractHdrId?: number;

    public assetHdrId?: number;
    public active?: boolean;
    public modelId?: number;
    public modelName?: string;
    public assetCode?: string;
    public assetGroupName?: string;
    public manufacturerName?: string;
    public description?: string;
    public equipmentCode?: string;

    public contractAlreadyExistForPeriod?: boolean;
    
    public createdBy?: string;
    public createdDt?: Date;
    public updatedBy?: string;
    public updatedDt?: Date;

    public pageNumber?: number;
    public recordsPerPage?: number;
    public updatedDtDisp?: string;
    public createdDtDisp?: string;
    public serialNo ?: number;
    public totalPurchaseAmt ?: number;
    public subCategoryName ?: string;
    public excludedServices ?: string;
    public includedServices ?: string;
    public contractAmnt ?: number;
}