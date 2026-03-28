import { BaseModel } from '../base/baseModel';

export class StoreModel extends BaseModel{

    public storeId?: number;
    public storeName?: string;
    public storeCode?: string;
    public storeDescription?: string;
    public inchargeName?: string;
    public inchargeId?: string;
    public pageNumber ?: number;
    public recordsPerPage ?: number;
    public createdBy ?:string;
    public createdDtDisp ?: string;
    public updatedBy ?: string;
    public updatedDtDisp ?: string;


}