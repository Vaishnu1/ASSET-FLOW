import { BaseModel } from '../base/baseModel';

export class StockTransferModel extends BaseModel {
   
	public  orgId ?: number;
	
	public  locationId ?: number;	

	public locationName ?: string;	
	
	public pageNumber ?: number;
	
	public recordsPerPage ?: number;

	public stockTransferType ?: string;	

	public stockTransferFor ?: string;	

	public fromDt?: string;

	public endDt?: string;
	
}