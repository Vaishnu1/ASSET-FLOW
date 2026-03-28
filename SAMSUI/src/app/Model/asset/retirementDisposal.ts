import { BaseModel } from '../base/baseModel';

export class RetirementDisposal extends BaseModel{

    public retireDisposalId ?: number;

    public orgId ?: number;
 
    public locationId ?: number;

    public locationName ?: string;

    public retirementNo ?: string;

    public retirementStatus ?: string;

    public requestedBy ?: string;

    public requestedDt ?:Date;

    public requestedDtDisp ?:string;

    public requestReason ?: string;

    public remarks ?: string;

    public approvedBy ?: string;

    public approvedDt ?:Date;

    public approvedDtDisp ?:string;

    public noOfYrsUsed ?:number;

    public utilizationHrs ?:number;

    public breakDownHrs ?:number;

    public assetCode ?:string;

    public disposedDt ?:Date;

    public disposedDtDisp ?:string;

    public disposedValue ?:number;

    public disposedTo ?:string;

    public active ?: boolean;

    public createdBy ?:string;
	
	public createdDt ?:Date;;
	
	public updatedBy ?:string;
	
	public updatedDt ?:Date;
	
	public pageNumber ?:number;

	public recordsPerPage ?:number;

	public updatedDtDisp ?:string;

    public createdDtDisp ?:string;

    public startDt ?: Date;

    public endDt ?: Date;

    public assetHdrId ?: number;

	public startDtDisp ?:string;

    public endDtDisp ?:string;

    public approvalStatusRetirement?: string;

    public assetCategoryName?: string;

    public assetCategoryId?: number;

    public subCategoryName?: string;

    public assetGroupId?: number;

    public assetGroupName?: string;

    public retirementStatusId?: number;

}