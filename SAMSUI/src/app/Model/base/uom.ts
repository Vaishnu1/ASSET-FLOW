import { BaseModel } from './baseModel';

export class UOMModel extends BaseModel{
 
    public uomCode ?:string;

    public uomDesc ?:string;

    public uomId ?:number;

    public orgId ?:number;

    public createdBy ?: number;

    public createdDtDisp ?: number;

    public updatedBy ?: number;

    public updatedDtDisp ?: number;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: number;


    

}