import { BaseModel } from '../base/baseModel';

export class GRNHdrModel extends BaseModel{
    public grnId: number;
    public grnNo: string;
    public revisionNo: string;
    public caNo: string;
    public vehicleCarrierNo: string;
    public transporterName: string;
    public orderType: string;
    public grnDate: Date;
    public errorFlg: string;
    public errorMessage: string;
    public supplierReceiptNo: string;
    public billDate: Date;
    public grnStatus: string;
    public totalPoQty: number;
    public pageNumber ?: number;
    public recordsPerPage ?: number;
    public createdBy ?:string;
    public createdDtDisp ?: string;
    public updatedBy ?: string;
    public updatedDtDisp ?: string;
    public supplierName ?: string;
    public supplierSiteName ?:string;
    public supplierId ?:number;
    public supplierSiteId ?:number;
    public grnDateDisp ?:string;
    public doDateDisp ?: string;
    public doNo: string;
    public locationId ?: number;
    public locationName ?: string;
    public supplierInvoiceNo ?: string;

    public selectedLocationIds ?: number[];
    public selectedBusinessPartnerIds ?: number[];
    public selectedBusinessPartnerSiteIds ?: number[];

    public selectedLocationNames : any = null;
    public selectedBusinessPartnerNames ?: any = null;
    public selectedGrnStatusNames ?: any = null;
    public selectedBusinessPartnerSiteNames ?:  any = null;
}