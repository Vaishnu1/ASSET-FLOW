import { BaseModel } from '../base/baseModel';

export class ChangeCeidRequestModel extends BaseModel {

    public  assetCodeChangeReqId ?:number;
    
    public  assetId ?: number;
    
    public  assetCode ?: string;
    
    public  newAssetCode ?: string;
    
    public  reason ?: string;
    
    public  newCeidStatus ?: string;
    
    public  requestRaisedBy ?: string;
    
    public  requestRaisedDt ?: Date;
    
    public  requestRaisedDtDisp ?: string;
    
    public  approvedOrRejectedBy ?: string;
    
    public  approvedOrRejectedDt ?: Date;
    
    public  approvedOrRejectedDtDisp ?: string;

}