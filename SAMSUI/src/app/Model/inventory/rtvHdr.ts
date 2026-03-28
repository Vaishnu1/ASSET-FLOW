import { BaseModel } from "../base/baseModel";

export class RTVHdrModel extends BaseModel{
    public invHdrId ?: number;
    public srId ?: number;
    public srNo ?: string;
    public errorFlg ?: string;
    public errorMessage ?: string;
    public pageNumber ?: number;
    public recordsPerPage ?: number;
    public locationId ?: number;
    public locationName ?: string;
    public supplierName ?: string;
    public supplierId ?: number;
    public rtvNo ?: string;
    public fromDate ?: Date;
    public toDate ?: Date;
    public grnNo ?: Date;
    public createdBy ?: string;
    public doNo ?: string;
    public poNo ?: string;
    public searchPoNo ?: string;
    public itemName ?: string;
    public searchItemName ?: string;
    public rtvStatus ?: string;
    public fromDateDisp ?: string;
    public toDateDisp ?: string;
    public searchItemTypeId ?: number;
    public searchItemTypeName: string;
}