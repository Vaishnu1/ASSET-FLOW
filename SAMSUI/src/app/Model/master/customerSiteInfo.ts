import { BaseModel } from "../base/baseModel";

export class CustomerSiteModel extends BaseModel {

    public customerId ?:number;

    public customerSiteId ?: number;

    public customerSiteName ?: string;

    public customerName ?:string;

    public custContactPerson ?: string;

    public address1 ?: string;

    public address2 ?: string;

    public city ?: string;

    public state ?: string;

    public country ?: string;

    public postalCd ?: string;

    public contactNo1 ?: string;

    public contactNo2 ?: string;

    public contactNo3 ?: string;

    public custEmailId ?: string;

    public custCurCd ?:string;

    public custShipTermsCd ?:string;

    public custShipModeCd ?:string;

    public custTransporterName ?:string;

    public custPayTermsCd ?:string;

    public custPayTermDays ?:string;

    public custGlAccCd ?:string;

    public custBankName ?:string;

    public custBankBranchName ?:string;

    public custBankAccNo ?:string;

    public custBankAddress1 ?:string;

    public custBankAddress2 ?:string;

    public custBankCity ?:string;

    public createdBy ?: string;

    public createdDt ?: Date;

    public createdDtDisp ?: string;
    
    public updatedBy ?: string;
    
    public updatedDt ?: Date;

    public updatedDtDisp ?:string;
    
    public pageNumber ?: number;
    
    public recordsPerPage ?: number;

}