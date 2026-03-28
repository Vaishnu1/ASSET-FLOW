import { BaseModel } from "./baseModel";

export class CurrencyModel extends BaseModel {

    public curId?: number;

    public curCd?: string;

    public curName?: string;

    public precision?: number;

    public orgId?: number;

    public createdBy?: number;

    public createdDtDisp?: number;

    public updatedBy?: number;

    public updatedDtDisp?: number;

    public pageNumber?: number;

    public recordsPerPage?: number;

    public orgName?: number;
}