import { BaseModel } from '../base/baseModel';


export class GatePassHdrModel extends BaseModel {

    public  gatePassHdrId ?:number;

    public  orgId ?: number;

	public  locationId ?: number;

    public  locationName ?: string;

	public  gatePassNo ?: string;

	public  generatedDate ?:Date;

	public  generatedBy ?: string;

    public  gatePassStatus ?: string;

    public  remarks ?: string;

    public  approvedBy ?: string;

	public  approvedDate ?: Date;

	public  createdBy ?: string;

	public  createdDt ?: Date;

	public  updatedBy ?: string;

	public  updatedDt ?: Date;

	public  active ?: boolean;

	public  generatedDateDisp ?: string;

    public  approvedDateDisp ?: string;

	public recordsPerPage ?:number;

	public pageNumber?:number;

	public assetGroupName ?: string;

	public assetGroupId ?: number;

	public duration ?: string;

	public createdDtDisp ?: string;

	public updatedDtDisp ?: string;

  public gatePassStatusId ?:number;

  public assetCode ?: string;

	public assetId ?: number;

}
