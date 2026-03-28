import { SupplierLocationModel } from "./supplier-location";
import { BaseModel } from "../base/baseModel";
import { SupplierModelSuppliedModel } from './supplier-model-supplied';

export class SupplierModel extends BaseModel{

    public supplierId ?: number;

    public orgId ?: number;

    public orgName ?: string;

    public supplierName ?: string;

    public supplierType ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public supplierLocList ?:SupplierLocationModel[];    

    public isListEmpty ?:boolean;

    public supplierCode ?: string;

    public sourceScreen ?: string;

    public activeStatusDisp ?: string;

    public supSiteState ?: string;

    public supplierLocationName ?: string;

    public supSiteCity ?: string;

    public supSiteArea ?: string;

    public activeDisplay ?: string;

    public contactPersonNo ?: string;

    public activeDisp ?: boolean;

    public modelsSuppliedList ?:SupplierModelSuppliedModel[]; 

    public supCountry ?: string;

    public supCountryId ?: number;

    public supSiteStateId ?: number;
}
