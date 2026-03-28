import { BaseModel } from "../base/baseModel";

export class ManufacturerModel extends BaseModel{

    public manufacturerId ?: number;

    public orgId ?: number;

    public manufacturerName ?: string;

    public address ?: string;

    public area ?: string;

    public locCountry ?: string;

    public locCountryId ?: number;

    public locStateId ?: number;

    public locState ?: string;
    
    public locCityId ?: number;

    public locCity ?: string;

    public zipCode ?: number;

    public emailId ?: string;

    public phoneNo ?: string;

    public contactPerson ?: string;

    public contactPhoneNo ?: string;

    public altPhoneNo ?: string;

    public contactPersonEmailId ?: string;

    public active ?:boolean;

    public createdBy ?:string;

    public createdDt ?: Date;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public manufacturerCode ?: string;

    public source ?: string

    public manufacturerStatus ?: String;

    public reportType?: string;

    public supplierId ?: number;

    public supplierName ?: string;
    
}
