import { BaseModel } from "../base/baseModel";

export class CheckPointsModel extends BaseModel {

   public checkPointsId ?: number;

   public srId ?: number;

   public modelId ?: number;

   public modelCheckPointsId ?: number;

   public checkPointName ?: string;

   public uom ?: string;

   public frequency ?: string;

   public duration ?: string;

   public result ?: string;

   public createdBy ?:string;

   public createdDtDisp ?: string;

   public updatedBy ?: string;

   public updatedDtDisp ?: string;

}
