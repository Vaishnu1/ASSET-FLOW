export class WorkflowApprovalModel {   

    public workflowApprovalId?: number;
	public orgId?: number;
	
    public transactionId?: number;
	public transactionNo ?:string;
	public transactionSource ?:string;
	
	public workflowDescriptionId?: number;
    public workflowName ?:string;
    
    public workflowProcessId ?: number;
	public workflowProcessName ?: string;
	   
	public workflowHierarchyHdrId?: number;
    
    public levelName ?:string;
    public levelSeqNo?: number;
	
    public employeeId1?: number;
	public employeeName1 ?:string;
	
    public employeeId2?: number;
	public employeeName2 ?:string;
	
    public employeeId3?: number;
	public employeeName3 ?:string;

    public condition1?: string;
    public condition2?: string;
	
	public emp1ApproveStatuts ?:string;
	public emp2ApproveStatuts ?:string;
    public emp3ApproveStatuts ?:string;
    
    public loginEmployeeId?: number; 

    public columnName ?:string;
    public direction ?:string;
    
    public createdBy?: string;
    public createdDt?: Date;
    public updatedBy?: string;
    public updatedDt?: Date;

    public pageNumber?: number;
    public recordsPerPage?: number;
    public updatedDtDisp?: string;
    public createdDtDisp?: string;
    public logInUserOrgId?: number;
    public logInUserLocId?: number;
    public logInUserId?: number;  
    public searchValue?: string;
    public searchValue1?: string;

    public assetRetireId: number;
    public superAdmin:boolean;

}