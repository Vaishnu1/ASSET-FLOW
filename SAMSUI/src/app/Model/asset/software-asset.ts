export class SoftwareAsset {
    public assetSWDtlId?: number;
    public assetHdrId?: number;
    public orgId?: number;
    public assetCode?: string;
    public softwareName?: string;
    public version?: string;
    public licenceKey?: string;
    public noOfLicence?: string;
    public childAssetGroupId?: number;
    public activationDt?: Date;
    public activationDtDisp?: string;
    public expiryDtSW?: Date;
    public expiryDtSWDisp?: string;
    public remarks?: string;
    
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
