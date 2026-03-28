import { BaseModel } from "../base/baseModel";

export class MailNotificationModel extends BaseModel {

    public mailNotificationId ?: number;

    public mainProcessId ?: number;

    public subProcessId ?: number;

    public subProcessName ?: string;

    public  mainProcessName?: string;

    public toEmail ?: string;

    public ccEmail ?: string;

    public bccEmail ?: string;

    public orgId ?: number;

    public locationId ?: number;

    public active ?: string;

    public activeDisp ?:boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public locationName ?: string;
}
