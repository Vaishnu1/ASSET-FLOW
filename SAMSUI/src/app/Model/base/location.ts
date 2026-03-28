import { BaseModel } from "./baseModel";


export class LocationModel extends BaseModel {
	public locId ?:number;
	
	public orgId ?:number;

	public orgName ?:string;
	
	public locationName ?:string;

	public locationType ?:string;

	public languageCode ?:string;
	
	public phoneNo ?:string;
	
	public altPhoneNo ?:string;
	
	public contactName ?:string;
	
	public contactPhoneNo ?:string;
	
	public locAddress1 ?:string;
	
	public locAddress2 ?:string;
	
	public locCity ?:string;
	
	public locState ?:string;
	
	public locCountry ?:string;
	
	public locPinCode ?:number;
	
	public locEmailId ?:string;
	
	public locWebURL ?:string;
	
	public gstinNo ?:string;
	
	public panNo ?:string;
	
	public active ?:boolean;
	
	public locCurCd ?:string;
	
	public smtpPortNo ?:number;
	
	public smtpServerName ?:string;
	
	public popPortNo ?:number;
	
	public popAccountId ?:string;
	
	public popAccountPwd ?:string;
	
	public createdBy ?:string;
	
	public createdDt ?:Date;

	public locationCode ?:string;
	
	public updatedBy ?:string;
	
	public updatedDt ?:Date;;
	
	public pageNumber ?:number;

	public recordsPerPage ?:number;

	public updatedDtDisp ?:string;

	public createdDtDisp ?:string;

	public regionId ?: number;

	public regionName ?: string;

	public legalEntityId ?: number;

	public legalEntityName ?: string;

	public srValidation ?:boolean;

	public locShortName ?: string;

	public pmGenerateDt ?: number;

	public userLocationSessionTimeOut ?: number;

	public locCityId ?:number;

	public locStateId ?: number;

	public entityGroupName ?: string;

	public locCountryId ?: number;
	
}