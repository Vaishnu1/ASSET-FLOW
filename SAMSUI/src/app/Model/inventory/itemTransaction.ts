import { BaseModel } from '../base/baseModel';

export class ItemTransactionModel extends BaseModel{

    public itemRegisterId ?: number;
  
    public itemId ?: number;

    public itemName ?: string;

    public itemDesc ?: string;

    public storeId ?: number;

    public transactionDt ?: Date;

    public transactionDesc ?: string;

    public inQty ?: number;

    public outQty ?: number;
 
    public balanceQty ?: number;
  
    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public locationId ?: number;

    public locationName ?: string;

    public transFromDtDisp ?: string;

    public transToDtDisp ?: string;
}