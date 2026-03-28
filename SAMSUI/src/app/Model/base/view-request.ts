import { BaseModel } from "./baseModel";

export class ViewRequest extends BaseModel {
    public requestId : number;

    public requestNo : string;

    public jobType : string;

    public programName : string;

    public serverFilePath : string;

    public requestStatus : number;

    public errorLog : string;

    public requestedBy : string;

    public requestedDt : Date;

    public requestEndDt : Date;

    public userId : number;

    public requestStatusDisp : string;

    public requestDtDisplay : string;

    public requestEndDtDisp : string;

    public pageNumber : number;

    public recordsPerPage : number;
}