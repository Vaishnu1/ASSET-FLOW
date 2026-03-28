import { BaseModel } from "./baseModel";

export class EmailReminderScheduleDtlModel extends BaseModel{
    public emailReminderScheduleDtlId?: number;
    public emailReminderScheduleHdrId?: number;
    public transId?: number;
    public numberOfDays?: number;
    public reminderType?: string;

    public active?: boolean; 
    public createdBy?: string;
    public createdDt?: Date;
    public updatedBy?: string;
    public updatedDt?: Date;
    public pageNumber?: number;
    public recordsPerPage?: number;
    public updatedDtDisp?: string;
    public createdDtDisp?: string;
    public logInUserOrgId?: number;
    public logInUserLocId?: number;
    public logInUserId?: number;  
    public searchValue?: string;
    public searchValue1?: string;
}