import { BaseModel } from "../base/baseModel";

export class SrAddLabourModel extends BaseModel {
    
    public srLabourId?:number;
    
    public srId ?: number;

    public srEngineerId ?: number;

    public srEngineerName ?: string;

    public activityDt ?: Date;

    public activityDtDisp ?: string;

    public activityStartDt ?: Date;

    public activityStartDtDisp ?: string;

    public activityEndDt ?: Date;

    public activityEndDtDisp ?: string;

    public totalHours ?: string;

    public activity1 ?: string;

    public activity2 ?: string;

    public activity3 ?: string;

    public activity4 ?: string;

    public srLabourAttribute1 ?: string;

    public startDtTime ?: string;

    public endDtTime ?: string;

    public totalHoursTemp ?: number;

    public startDtndTimeDisp ?: string;

    public endDtndTimeDisp ?: string;
    
    public  activityImage ?:string;
}
