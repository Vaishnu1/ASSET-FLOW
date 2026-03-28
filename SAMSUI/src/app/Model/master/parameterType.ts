import { BaseModel } from "../base/baseModel";

export class ParameterTypeModel extends BaseModel {

    public parameterTypeId ?: number;

    public orgId ?: number;

    public parameterTypeName ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public locationId ?:number;

    public locationName ?:string;

	public parameterTypeNameDisp?:string;
	
}
