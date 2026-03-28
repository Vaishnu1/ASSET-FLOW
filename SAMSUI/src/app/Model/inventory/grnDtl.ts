import { PurchasingBase } from './purchasingBase';

export class GrndtlModel extends PurchasingBase{

    public grnDtlId?: number;
    public grnId?: number;
    public grnNo?: string;
    public revisionNo?: string;
    public description?: string;
    public makerPartCode?: string;
    public poQty?: number;
    public shipQty?: number;
    public acceptQty?: number;
    public rejectQty?: number;
    public supplierReceiptNo?: string;
    public uom?: string;
    public unitPrice?: number;
    public itemId ?: number;
    public itemName ?: string;
    public supplierId ?: number;
    public supplierName ?: string;
    public supplierSiteId ?: number;
    public supplierSiteName ?: string;
    public poId ?: number;
    public poNo ?: string;
    public poDate ?: Date;
    public requisitionId ?: number;
    public requisitionNo ?: string;
    public reqDt ?: Date;
    public custId ?: number;
    public custCd ?: string;    
    public custName ?: string;    
    public ceid ?: string;
    public depName ?: string;
    public depId ?: number;
    public receiptDt ?: Date;
    public companyId ?: number;
    public companyName ?: string;
    public address ?: string;
    public storeId ?: number;
    public storeName ?: string;


}