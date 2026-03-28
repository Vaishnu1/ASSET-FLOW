import { BaseModel } from "./baseModel";


export class UserModel extends BaseModel{

public userId ?: number;

public orgId ?:number;

public locationId ?:number;

public locationName ?: string;

public loginId ?:string;

public password ?:string;

public userName ?:string;

public userType ?:string;

public userTypeSrcId ?:number;

public emailId ?:string;

public phoneNumber ?:string;

public activeDisp ?:boolean;

public empId ?:number;

public empCode ?: string;

public createdBy ?: string;

public createdDateDisp ?: string;

public updatedBy ?: string;

public updatedDateDisp ?: string;

public pageNumber ?: number;

public recordsPerPage ?: number;

public lastLoginTime ?: string;

public groupName ?:string;

public groupId ?:number;

public  baseCurrency ?:string;

public  countryCode  ?:string;

public  languageCode  ?:string;

public validFromDt ?:Date;

public validToDt ?:Date;

public validFromDtDisp ?:any;

public validToDtDisp ?:any;

public  orgLogoPath ?:string;

public assetMasterMapping ?: boolean;

public srValidation ?: boolean;

public locationCode?:String;

public locShortName?:String;

public isListEmpty?:boolean;

public userLocationSessionTimeOut?:number;
  
public locDisplayField?: String;

public itemApproval: boolean;

public srTLApproval: boolean;

public srRMApproval: boolean;

public purchaseRMApproval: boolean;

public purchaseSourcingApproval: boolean;

public purchaseCustomerApproval: boolean;

public manufacturerApproval : boolean;

public userGroupId ?= [];
}