import { BaseModel } from "../base/baseModel";

export class WareHouseModel extends BaseModel {

    public locationId ? : number;
    
    public locationName ? : string;

    public wareHouseId ?: number;

    public wareHouseCode ?: string;

    public description ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;
}
