import { BaseModel } from "../base/baseModel";

export class SupplierInvoiceHdr extends BaseModel {

    public supplierInvoiceHdrId ? : number;

    public supplierId ? : number;

    public matchAction ? : string;

    public invoiceStatus ? : string;

    public supplierInvoiceNo ? : string;

    public orgId ? : number;

    public orgName ? : string;
    
    public locationId ? : number;
        
    public locationName ? : string;

    public createdBy ?:string;

    public createdDt ?: Date;
    
    public createdDtDisp ?: string;
    
    public updatedBy ?: string;

    public updatedDt ?: Date;
    
    public updatedDtDisp ?: string;

    public pageNumber?: number;
    
    public recordsPerPage?: number;

    public active?: boolean;

    public fromDt ?: string;

    public endDt ?: string;

    public invoiceDtDisp ?: string;

    }