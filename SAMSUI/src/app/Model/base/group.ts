import { GroupMenuModel } from "./groupMenu";
import { BaseModel } from "./baseModel";

export class GroupModel extends BaseModel{

    public groupId ?: number;

    public orgId ?: number;

    public groupName ?:string;

    public createdBy ?: string;

    public createdDt ?: Date;

    public createdDtDisp ?:String;

    public recordsPerPage ?: number;

    public pageNumber ?:number;

    public orgName ?: string;

    public locationId ?: number;

    public locationName ?: string;

    public groupMenuList ?:GroupMenuModel[];

    public superAdmin ?: boolean;
}
