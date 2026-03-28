import { SupplierLocationModel } from "./supplier-location";
import { BaseModel } from "../base/baseModel";
import { SupplierModelSuppliedModel } from './supplier-model-supplied';

export class BusinessPartnerModel extends BaseModel{

    public orgId ?: number;

    public orgName ?: string;

    public active ?: boolean;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public businessPartnerId ?: number;

    public businessPartnerName ?: string;

    public partnerSiteId ?: number;

    public partnerSiteName ?: string;

    public partnerSiteCountry ?: string;

    public partnerSiteCountryId ?: number;

    public partnerSiteStateId ?: number;

    public partnerSiteState ?: string;

    public partnerSiteCity ?: string;

    public partnerSiteArea ?: string;

    public activeFromDtDisp ?: string;

    public activeTillDtDisp ?: string;

    public selectedRolesList: number[];

    public businessPartnerRoleId?: number;

	public businessPartnerRoleName?: string;
}
