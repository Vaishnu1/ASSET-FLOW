import { SupplierSiteRegModel } from './supplierSiteReg';

export class SupplierLocationModel {

    public supplierLocationId ?: number;

    public supplierId ?: number;

    public supplierSiteName ?: string;

    public contactPerson ?: string;

    public suppLocAddress1 ?: string;

    public suppLocAddress2 ?: string;

    public suppLocArea ?: string;

    public suppLocCity ?: string;

    public suppLocState ?: string;

    public suppLocCountry ?: string; 

    public suppLocPinCode ?: string;

    public companyRegistrationNumber ?: string;

    public taxRegistrationName1 ?: string;

    public taxRegistrationName2 ?: string;

    public taxRegistrationName3 ?: string;

    public mobileNumber ?: string;

    public landLineNumber ?: string;

    public suppLocEmail ?: string;

    public suppLocCurCd ?: string;

    // public paymentTerms ?: string;

    // public paymentMethod ?: string;

    public suppLocAttribute1 ?: string;

    public suppLocAttribute2 ?: string;

    public suppLocAttribute3 ?: string;

    public suppLocAttribute4 ?: string;

    public suppLocAttribute5 ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public isListEmpty ?:boolean;

    public supplierRegList ?: SupplierSiteRegModel[];

    public sourceScreen ?: string;

    public supplierType ?: string;

    public supplierName ?: string;



}
