import { BaseModel } from "./baseModel";

export class SuppLocAccessModel extends BaseModel{

    public suppLocAccessId ?: number;

    public supplierId ?: number;

    public supplierLocId ?:number;

    public accessLocId ?: number;

    public accessLocName ?: string;

    public accLocSelected ?: Boolean;
}
