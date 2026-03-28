import { BaseModel } from '../base/baseModel';

export class BudgetModel extends BaseModel {

    public bdHdrId ?: number;

    public locationId  ?: number;
   
    public locationName ?:  string;
  
    public budgetName ?: string;

    public pageNumber ?: number;
    
    public recordsPerPage ?: number;
	
	public  updatedDtDisp ?: string;

    public createdDtDisp ?: string;
    
    public createdBy ?: string;
	
    public createdDt ?: Date;
	
	public updatedBy ?:string;
	
	public updatedDt ?: Date;
	
    public active ?: boolean;
    
    public orgId ?: number;

    public  fyStartYear ?: number;
    
    public  fyEndYear ?: number;
    
    public  fyStartMonth ?: string;

    public fyEndMonth ?: string;

    public activeDisp ?:boolean;

    public activeDisplay ?:string; 

    public budgetStatus ?: string;

    public curCd ?: string;

    public budgetItemList ?= [];
}