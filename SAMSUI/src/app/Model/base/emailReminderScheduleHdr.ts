import { BaseModel } from "./baseModel";

export class EmailReminderScheduleHdrModel extends BaseModel{
    
    public emailReminderScheduleHdrId?: number;
    public orgId?: number;
    public locationId?: number;
    public locationName?: string;
    public processName?: string;
    public processId?: number;

    public activeDisplay ?: string;
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