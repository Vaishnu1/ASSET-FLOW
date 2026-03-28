import { BaseModel } from "../base/baseModel";

export class LocatorWarehouseModel extends BaseModel{
    
    public locatorName ?: string;

    public locatorId ?: number;

    public dimension ?: string;

    public active ?: boolean;

    public warehouseId ?: number;

    public createdBy ?:string;

    public createdDtDisp ?: string;
 
}
