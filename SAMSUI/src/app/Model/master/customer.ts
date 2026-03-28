import { BaseModel } from "../base/baseModel";
import { CustomerSiteModel } from "./customerSiteInfo";

export class CustomerModel extends BaseModel{

    public customerId ?:number;

    public orgId ?: number;

    public orgName ?: string;

    public customerName ?:string;

    public customerCode ?:string;

    public customerType ?:string;

    public createdBy ?: string;

    public createdDt ?: Date;

    public createdDtDisp ?: string;
    
    public updatedBy ?: string;
    
    public updatedDt ?: Date;

    public updatedDtDisp ?:string;
    
    public pageNumber ?: number;
    
    public recordsPerPage ?: number;

    public customerSiteList ?:CustomerSiteModel[];

    public isListEmpty ?:boolean;

}