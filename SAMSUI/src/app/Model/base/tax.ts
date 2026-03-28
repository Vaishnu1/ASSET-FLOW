export class taxModel{

     public taxId ?: number;

     public orgId ?: number;

     public locationId ?: number;  
     
     public locationName ?: string;

     public taxCode ?: string;

     public tacRate ?: number; 

     public taxDesc ?: string; 
     
     public active ?: boolean; 

     public createdBy ?: string;
     
     public createdDt ?: Date;  
     
     public updatedBy ?: string; 
     
     public updatedDt ?: Date;   

     public select ?: boolean;

     public taxComputation ?: object;

     public taxRate ?: string;

     public remarks ?: string;

     public pageNumber ?: Number;

     public recordsPerPage ?: Number;

     public direction ?: string;

     public columnName ?: string;

}