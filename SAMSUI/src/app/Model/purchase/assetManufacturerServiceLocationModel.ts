import { BaseModel } from '../base/baseModel';

export class AssetManufacturerServiceLocationModel {

    public manufacturerServiceLocId ?: number;

    public manufacturerId ?: number;

    public serviceLocationName ?: String;

    public address1 ?: String;

    public address2 ?: String;

    public city ?: String;

    public state ?: String;

    public country ?: String;

    public postalCode ?: String;

    public contactPersonName ?: String;

    public contactPersonLandLineNo ?: String;

    public contactPersonPhoneNo ?: String;

    public contactPersonEmailId ?: String;

    public index ?: number;

    public createdBy ?:Date;
        
    public createdDtDisp ?: string;

    public updatedBy ?: Date;

    public updatedDtDisp ?: string;

}