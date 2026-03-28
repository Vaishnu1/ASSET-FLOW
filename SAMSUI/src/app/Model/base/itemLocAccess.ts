import { BaseModel } from "./baseModel";

export class ItemLocAccessModel extends BaseModel{

    public itemLocAccessId ?: number;

    public itemId ?: number;

    public accessLocId ?:number;

    public accessLocName ?: number;

    public itemLocSelected ?: Boolean;
}
