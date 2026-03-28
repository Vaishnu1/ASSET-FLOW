
export class WorkflowDescriptionModel {

    public workflowDescriptionId?: number;
    public orgId?: number;
    public locationId?: number;
    public locationName?: string;
    public workflowName?: string;
    public workflowProcessId?: number;
    public workflowProcessName?: string;
    
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