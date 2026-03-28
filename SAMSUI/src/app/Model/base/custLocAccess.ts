import { BaseModel } from "./baseModel";

export class CustSiteAccessModel extends BaseModel{

    public custLocAccessId ?: number;

    public customerId ?: number;

    public custSiteId ?:number;

    public custAccessLocId ?: number;

    public custAccessLocName ?: string;

    public custLocAccessSelected ?: Boolean;
}
