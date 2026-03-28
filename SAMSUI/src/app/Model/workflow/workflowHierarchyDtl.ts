export class WorkflowHierarchyDtlModel {   

    public workflowHierarchyDtlId?: number;
    public workflowHierarchyHdrId?: number;
    
    public levelName ?:string;
    public levelSeqNo?: number;
    public employeeId1?: number;
    public employeeId2?: number;
    public employeeId3?: number;

    public condition1?: string;
    public condition2?: string;

    public active?: boolean; 
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

}