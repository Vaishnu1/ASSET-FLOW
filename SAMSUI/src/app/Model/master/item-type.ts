import { BaseModel } from "../base/baseModel";

export class ItemTypeModel extends BaseModel{

   public orgId ?: number;

   public itemTypeDesc ?: string;

   public active ?: boolean;

   public itemTypeId ?: number;

   public itemTypeName ?: string;

   public createdBy ?:string;

   public createdDtDisp ?: string;

   public updatedBy ?: string;

   public updatedDtDisp ?: string;

   public pageNumber ?: number;

   public recordsPerPage ?: number;

   public orgName ?: string;

   public isListEmpty ?:boolean;

   public createdDt ?:Date;
   
   public updatedDt ?: Date;

   public systemGenerated ?:boolean;
}
