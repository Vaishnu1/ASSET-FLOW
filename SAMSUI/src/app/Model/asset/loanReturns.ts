import { BaseModel } from '../base/baseModel';

export class LoanReturnsModel extends BaseModel{

    public loanId ?: number;

    public orgId ?: number;

    public assetId ?: number;

    public loanNo ?: string;

    public assetCode ?: string;

    public loanedTo ?: string;

    public loanStatus ?: string;

    public loanStatusId?: number;

    public modelId?: number;

    public modelName ?: string;

    public manufacturer ?: string;

    public fromDt ?: Date;

    public toDt ?: Date;

    public fromDtDisp ?: string;

    public toDtDisp ?: string;

    public active ?: boolean;

    public createdBy ?: string;

    public createdDt ?: Date;

    public updatedBy ?: string;

    public updatedDt ?: Date;

    public updatedDtDisp ?: string;

    public createdDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public loanRaisedDt ?: Date;

    public loanRaisedDtDisp ?: string;

    public loanStatusName ?: string;

    public description ?: string;

    public manufacturerName ?: string;

    public locationId ?: number;

    public locationName ?: string;

    public loanedToId ?: number;

    public loanType ?: string;

    public loanedToSiteId ?: number;

    public loanedToSiteName ?: string;

    public sourceScreen ?: string;

    public groupNo ?: string;

    public loanIdList?: any[];

    public generateGatePass ?: boolean;

    public loanStatusUpdateId ?: number;

    public assetStatusPreviousId ?: number;

    public assetGroupId ?: number;

    public assetGroupName ?: string;

    public gatePassReturned ?: boolean;

}
