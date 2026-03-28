import { BaseModel } from '../base/baseModel';

export class AssetRelocationModel extends BaseModel {

    public assetRelocateId?: number;
    public relocateBatchNo?: number;
    public sourceLocId?: number;
    public sourceLocName?: string;
    public sourceDepId?: number;
    public sourceDepName?: string;
    public sourceSubDepId?: number;
    public sourceSubDepName?: string;
    public relocateLocId?: number;
    public relocateLocName?: string;
    public relocateDepId?: number;
    public relocateDepName?: string;
    public relocateSubDepId?: number;
    public relocateSubDepName?: string;
    public requestedBy?: string;
    public requestedDt?: Date;
    public requestedDtDisp?: string;
    public remarks?: string;
    public approvedDt?: Date;
    public approvedDtDisp?: string;
    public approvedBy?: string;
    public relocateStatus?: number;
    public assetCode?: string;
    public assetHdrId?: number;
    public relocateAssetCode?: number;
    public volumeLicensePresent?: boolean;
    public previousStatusId?: number;
    public relocateStatusName?: string;

    public primaryEnggName?: string;
    public primaryEnggNameId?: number;
    public secondaryEnggName?: string;
    public secondaryEnggNameId?: number;

}
