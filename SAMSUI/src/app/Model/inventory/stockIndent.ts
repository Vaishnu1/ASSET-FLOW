import { BaseModel } from '../base/baseModel';

export class StockIndentModel extends BaseModel{
    public invHdrId ?: number;
    public indentNo ?: string;
    public indentDt ?: Date;
    public requestedBy ?: string;
    public requestedById ?: number;
    public requestedDt ?: Date;
    public indentStatus ?: string;
    public srId ?: number;
    public srNo ?: string;
    public errorFlg ?: string;
    public errorMessage ?: string;
    public approvedBy ?: string;
    public approvedDt ?: Date;
    public pageNumber ?: number;
    public recordsPerPage ?: number;
    public indentDtDisp ?: string;
    public requestedDtDisp ?: string;
    public contractType ?: string;
    public locationId ?: number;
    public locationName ?: string;

}