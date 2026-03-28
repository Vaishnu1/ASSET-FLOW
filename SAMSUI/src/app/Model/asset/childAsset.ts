export class ChildAssetModel {
    public childAssetId?: number;
    public assetHdrId?: number;
    public assetCode?: string;
    public childAssetHdrId?: number;
    public childAssetCode?: string;
    public childAssetModelId?: number;
    public childAssetModelName?: string;
    public childAssetGroupId?: number;
    public childAssetGroupName?: string;

    public pmFrequency?: string;
    public paFrequency?: string;
    public qaFrequency?: string;
    
    public active?: boolean;
    public createdBy?: string;
    public createdDt?: Date;
    public createdDtDisp?: string;
    public updatedBy?: string;
    public updatedDt?: Date;
    public updatedDtDisp?: string;

    public pageNumber?: number;
    public recordsPerPage?: number;
}