export class PhysicalAuditNewlyFoundModel{

    public  newlyFoundAssetId ?:number;

	public  assetPhyAuditHdrId ?:number;

	public  assetCode ?:string;

	public  departmentName ?:string;

	public  subDepartment ?: string;

	public  assetStatus ?: string;

	public model ?: string;

	public assetCategoryName ?: string;

	public subCategoryName ?: string;

	public assetGroupName ?: string;

	public supplierName ?: string;

	public blockName ?: string;

	public floorName ?: string;

	public segmentName ?: string;

	public roomName ?: string;

	public auditStatus ?: string;

	public  createdBy ?: string;

	public  createdDt ?: Date;

	public  updatedBy ?: string;

	public  updatedDt ?: Date;

	public  active ?: boolean;

	public recordsPerPage ?:number;

	public pageNumber?:number;

	public statusTypeId?:number;

	public assetConditionId?:number;

  public  assetCondition ?: string;

  public  statusType ?: string;
}
