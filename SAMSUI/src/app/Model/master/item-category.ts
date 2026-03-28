import { BaseModel } from "../base/baseModel";

export class ItemCategoryModel extends BaseModel{
    
   public orgId ?: number;

   public categoryDesc ?: string;

   public active ?: boolean;

   public categoryId ?: number;

   public categoryName ?: string;

   public createdBy ?:string;

   public createdDtDisp ?: string;

   public updatedBy ?: string;

   public updatedDtDisp ?: string;

   public pageNumber ?: number;

   public recordsPerPage ?: number;

   public orgName ?: string;

   public isListEmpty ?:boolean;


}
