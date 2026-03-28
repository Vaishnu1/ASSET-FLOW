import { BaseModel } from "./baseModel";

export class numberControlModel extends BaseModel{

    public numberCtrlId ?: number;

    public orgId ?: number;

   // public orgName ?: string;

    public locationId ?: number;

    public locationName ?: string;

    public numberCtrlName ?:string;
    
    public numberCtrlDesc ?:string;
    
    public prefixCd ?:string;

    public suffixCd ?:string;   
    
    public lastNumber ?:number;

    public maxNumber ?:number;

    public numberCtrlModuleDisp ?: string;
    
    public createdBy ?:string;

   // public createdDtDisp ?: string;

    public updatedBy ?: string;

   // public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public updatedDt ?: Date;

    public createdDt ?: Date;

    public active ?: boolean;

   // public isListEmpty ?:boolean;


}
