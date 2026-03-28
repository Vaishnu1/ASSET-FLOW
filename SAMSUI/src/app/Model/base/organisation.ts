import { BaseModel } from "./baseModel";

export class OrganisationModel extends BaseModel {

    public organizationId ?: number=0;

    public orgName ?:string='';

    public phoneNo ?:string='';

    public altPhoneNo ?:string='';

    public orgAddress1 ?:string='';

    public orgAddress2 ?:string='';

    public orgCity ?:string='';

    public orgState ?:string='';

    public orgCountry ?: string='';

    public orgPinCode ?: number=0;

    public orgEmailId ?: string='';

    public orgWebURL ?: string='';

    public orgCurCd ?: string='';

    public baseCurrency ?: string='';

    public countryCode ?: string='';

    public languageCode ?:string='';

    public active ?: boolean;

    public createdBy ?:string='';

    public createdDtDisp ?: string='';

    public updatedBy ?: string='';

    public updatedDtDisp ?: string='';

    public pageNumber ?: number=0;

    public recordsPerPage ?: number=0;

    public logoPath ?:string='';
    
    public assetMasterMapping ?:string='';

    public assetMasterMapDisp ?:boolean=false;

    public isListEmpty ?:boolean;

    public orgOldActiveValue ?: boolean;

} 
