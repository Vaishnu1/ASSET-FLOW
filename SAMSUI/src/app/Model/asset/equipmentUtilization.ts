export class AssetEquipmentUtilization {

    public equipmentUtilizationId ?:number;

    public orgId ?: number;

    public locationId ?: number;

    public locationName ?: string;

    public assetId ?: number;

    public assetCode ?: string;

    public modelName ?: string;

    public departmentName ?: string;

    public activityStartDt ?: Date;

    public activityEndDt ?: Date;

    public assetStartTime?: string;

    public assetEndTime ?: string;

    public totalEquipmentHours?: string ;

    public totalUtilizationHours?: string ;

    public active?: boolean;

    public createdBy?: string;

    public createdDt?: Date;

    public updatedBy?: string;

    public updatedDt?: Date;
}