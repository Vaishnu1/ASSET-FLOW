import { BaseModel } from '../base/baseModel';

export class AssetAssignee extends BaseModel{

    public assetAssigneeId ?: number;

    public assignedToEmpId ?:number;

    public assetId  ?:number;

    public assigneeTypeId ?:number;

    public startDt ?:Date;

    public endDt ?:Date;

    public defaultPersonIncharge ?:boolean;

    public startDtDisp ?: string;

    public endDtDisp ?: string;

    public createdDtDisp ?:string;

    public updatedDTDisp ?:string;

    public assigneeTypeName ?:string;

    public assignedPersonContactNumber ?:string;

    public assignedPersonEmail ?: string;

    public assignToEmpName ?:string;

    public departmentName ?: string;

    public departmentId ?: string;

    public pageNumber?: number;

    public recordsPerPage?: number;

    public assetCode ?: string;

    public createdBy ?: string;

    public mode ?: string;

    public status ?: string;

    public rejectReason ?: string;

    public userId?: number;

    public createdById?: number;

    public assignedVolumeLicenseQty?: number;

    public approvalStatus?: string;

    public primaryTechnician?: boolean;

    public secondaryTechnician?: boolean;

    public empCode?: string;

    public pmPaTechnician?:  boolean;

    public qaTechnician?: boolean;

}
