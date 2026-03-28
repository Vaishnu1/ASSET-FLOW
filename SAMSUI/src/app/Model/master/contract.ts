
export class ContractHeaderModel {
    public columnName ?:string;
    public direction ?:string;

    public locationId?: number;
    public locationName?: string;
    public contractHdrId?: number;
    public contractNo?: string;
    public contractName?: string;
    public contractType?: string;
    public coverageType?: string;
    public contractingPartyType?: string;
    public contractPartyId?: number;
    public contractPartyName?: string;
    public contractPartyLocationId?: number;
    public contractPartyLocationName?: string;
    public active?: boolean;

    public termsConditions?: string;
    public contactPerson?: string;
    public phoneNumber?: string;
    public curCd?: string;

    public contractStartDt?: Date;
    public contractStartDtDisp?: string;
    public contractEndDt?: Date;
    public contractEndDtDisp?: string;
    public expiryPriorNotifyDays?: number;

    public contractBasicValue?: number;
    public discountRate?: number;
    public discountAmt?: number;
    public contractGrossValue?: number;
    public taxCode1?: string;
    public taxCode2?: string;
    public taxCode3?: string;
    public taxRate1?: number;
    public taxRate2?: number;
    public taxValue1?: number;
    public taxValue2?: number;
    public netContractValue?: number;

    public includedService?: string;
    public excludedService?: string;
    public autoRenewal?: string;

    public expiredContracts?: boolean;
    public intervalBasedContract?: string;

    public createdBy?: string;
    public createdDt?: Date;
    public updatedBy?: string;
    public updatedDt?: Date;
    public orgId?: number;

    public pageNumber?: number;
    public recordsPerPage?: number;
    public updatedDtDisp?: string;
    public createdDtDisp?: string;
    public logInUserOrgId?: number;
    public logInUserLocId?: number;
    public logInUserId?: number;
    public assetList?: any[];
    public searchValue?: string;
    public searchValue1?: string;
    public contractStatus?: string;
    public contractStatusId?: number;
    public daysElapsed: number;
    public approvalId ?: number;

    public contractWithoutPrice?: boolean;
    public contractWithoutSupplier?: boolean;
    
    public processStatus ?: string;
    public workflowProcessStatusId ?: number;

    public selectedLocationIds ?: number[];

    public selectedLocationNames : any = null;

}
