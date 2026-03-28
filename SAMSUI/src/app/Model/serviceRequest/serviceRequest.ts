import { SrAddLabourModel } from "./sr-add-labour";

export class ServiceRequestModel{
   
	public  srId ?: number;
		
	public  orgId ?: number;
	
	public  locationId ?: number;	

    public locationName ?: string;	
    
	public srNo ?: string;	
	
	public srType ?: string;	

    public srPriority ?: string;
    
	public srSeverity ?: string;
	
	public srStatus ?: string;

	public srStatusId ?: number;
	
	public  srAttributeId3 ?: number;
	
	public attribute3Name ?: string;
	
	public  srAttributeId4 ?: number;
	
	public attribute4Name ?: string;
	
	public  srAttributeId5 ?: number;
	
	public attribute5Name ?: string;
	
	public callerName ?: string;
	
	public callerContactNo ?: string;
	
	public problemReported ?: string;
	
	public problemObserved ?: string;
	
	public  totalDownHrs ?: string;
	
	public approvedBy ?: string;
	
	public approvedDt ?: Date;
	
	public cancelledBy ?: string;
	
	public cancelledDt ?: Date;
	
	public assignedTo ?: string;
	
	public assignedDt ?: Date;

	public assignedToContactNo ?: string;
	
	public reAssignedTo ?: string;

	public reAssignedToId ?: number;
	
	public reAssignedDt ?: Date;

	public reAssignedBy ?: string;
	
	public remarks ?: string;

	public assetId ?: number;
	
	public  assetHdrId ?: number;
	
	public assetCode ?: string;
	
	public assetSerialNo ?: string;
	
	public  departmentId ?: number;
	
	public departmentName ?: string;
	
	public  modelId ?: number;
	
	public modelName ?: string;
	
	public  manufacturerId ?: number;
	
	public manufacturerName ?: string;
	
	public  assetTypeId ?: number;
	
	public assetTypeName ?: string;
	
	public  assetCategoryId ?: number;
	
	public assetCategoryName ?: string;

	public subCategoryId?: number;
	
	public subCategoryName?: string;
	
	public  assetGroupId ?: number;
	
	public assetGroupName ?: string;
	
	public assetGroupDesc ?: string;
	
	public  assetStatusId ?: number;
	
	public assetStatus ?: string;
	
	public functionality ?: string;
	
	public maintenanceType ?: string;
	
	public createdBy ?: string;
	
	public  createdDt ?: Date;
	
	public updatedBy ?: string;
	
	public updatedDt ?: Date;
	
	public  pageNumber ?: number;

	public  recordsPerPage ?: number;

	public updatedDtDisp ?: string;

	public createdDtDisp ?: string;

	public ecs ?: string;

	public assignedToId ?:number; 
	
	public  subDepartment ?:String;

	public subDepartmentId ?:number;

	public  srUsrId ?: number;

	public  causeProblemObserved ?:String;

	public  actionTaken ?:String;

	public assignedDtDisp ?:string;

	public addLabourList ?: SrAddLabourModel[];
	 
	public isListEmpty: boolean;

	public  srCreateImages ?: string;

	public srRespondImages ?: string;
	
	public srCompletedImages ?: string;

	public columnName?:string;
	public direction?:string;

	public fromDt?:string;
	public endDt?:string;

	public  closedByComments?:string;
	public  closedByRating?:number;
	public  closedByName?:number;
	public  closeVerificationOtp?:number;

	public causeCode ?:string;
	
	public actionCode?:string;

	public defaultLocId: number = 0;

	public  scheduleDtlId ?: number;

	public  scheduleTitle ?: string;

	public parentSrId: number;

	public subTicketList  ?: ServiceRequestModel[]

	public isParent ?: boolean;

	public efs ?: string;

	public closedSubticketCount ?: number;

	public subTicketCount ?: number;

	public srRemarks ?: number;

	public contractType ?: string;

	public subTicketFor ?: string;

	public incidentPhysicalDamage ?: boolean;

	public incidentDescription ?: string;

	public itemName ?: string;

	public poNo ?: string;

	public updateByBatch ?: boolean;

	public selectedSrIdList ?: []

	public srReportType ?: string; 

	public physicalDamage ?: string;

	public assignToTimeDisp ?: string;

	public reOpenBtn ?: boolean;

	public srEFSValue ?: string;
	
	public srTypeName ?: string;
	
	public fromDashboard: boolean;

	public selectedLocationIds ?: number[];
	public selectedAssetCategoryIds ?: number[];
	public selectedSubCategoryIds ?: number[];
	public selectedAssetGroupIds ?: number[];
	public selectedDepartmentIds ?: number[];
	public selectedModelIds ?: number[];
	public selectedAssignedToIds ?: number[];
	
	public selectedLocationNames : any = null;
	public selectedAssetCategoryNames ?: any = null;
	public selectedSubCategoryNames ?: any = null;
	public selectedAssetGroupNames ?: any = null;
	public selectedDepartmentNames ?: any = null;
	public selectedModelNames ?: any = null;
	public selectedAssetCodes ?: any = null;
	public selectedAssignedToNames ?: any = null;

}