import { BaseModel } from '../base/baseModel';


export class GatePassDtlModel extends BaseModel {  

    public  gatePassDtlId ?:number;

    public  orgId ?: number;
	
	public  locationId ?: number;

	public  locationName ?: string;
	
	public  gatePassHdrId ?:number;

	public  assetHdrId ?:number;

	public  assetCode ?: string;

	public  assetRemarks ?: string;

	public  returnType ?: string;  

	public  quantity ?:number;

	public  createdBy ?: string; 

	public  createdDt ?: Date;
	
	public  updatedBy ?: string;

	public  updatedDt ?: Date;

	public  active ?: boolean;
    
	public recordsPerPage ?:number;
	
	public pageNumber?:number;

}