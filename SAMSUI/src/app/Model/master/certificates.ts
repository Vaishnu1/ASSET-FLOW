import { BaseModel } from '../base/baseModel';

export class CertificateModel extends BaseModel{

    public certificateId ?: number;

    public orgId ?: number;

    public certificationAuthorityId ?: number;

    public certificationAuthorityName ?:string;

    public certificateName ?: string;

    public renewalRequired ?: string;

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