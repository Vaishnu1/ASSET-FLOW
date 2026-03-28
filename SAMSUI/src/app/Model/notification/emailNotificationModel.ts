import { BaseModel } from '../base/baseModel';

export class EmailNotificationModel extends BaseModel{
    
    public emailMsgId ?: number;

    public emailInfoId ?: number;

    public messageSent ?: number;

    public messageNew ?: number;

    public messageDelete ?: number;

    public msgDestinationEmailId ?: string;

    public msgDestinationCcEmailId ?: string;

    public readState ?: boolean;

    public userId ?: number;

    public emailSubject ?: string;

    public emailBody ?: string;

    public setLogInUserId?: number; 

    public columnName ?: string;

    public direction ?: string;

    public createdDt?: Date;
   
    public createdBy?: string;

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