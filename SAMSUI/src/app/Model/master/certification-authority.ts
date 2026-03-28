import { BaseModel } from '../base/baseModel';

export class CertificationAuthorityModel extends BaseModel{

    public certificationAuthorityId ?: number;

    public orgId ?: number;

    public certificationAuthorityName ?:string;

    public issuingAuthority ?: string;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public orgName ?: string;

    public columnName ?: string;

    public direction ?: string;

}