import { BaseModel } from "../base/baseModel";

export class PurchaseRequestDtl extends BaseModel {

    public poReqDtlId?: number;

    public supplierId?: number;

    public supplierName?: string;

    public itemId?: number;

    public itemName?: number;

    public itemCode?: number;

    public itemCd?: number;

    public suppItemCd?: string;

    public poReqQty?: number;

    public unitPrice?: number;

    public requiredDt?: Date;

    public requiredDtDisp?: string;

    public poConverted?: string;

    public basicAmt?: number;

    public uomCode?: string;

    public taxCd1?: string;

    public taxRate1?: number;

    public taxAmt1?: number;

    public taxCd2?: string;

    public taxRate2?: number;

    public taxAmt2?: number;

    public taxCd3?: string;

    public taxRate3?: number;

    public taxAmt3?: number;

    public totalAmt?: number;

    public totalQty?: number;

    public termsConditions?: string;

    public shipTo?: string;

    public shipInfoId?: number;

    public shipInfoName?: string;

    public shipAddress1?: string;

    public shipAddress2?: string;

    public shipCity?: string;

    public shipState?: string;

    public shipCountry?: string;

    public shipZipCode?: number = 0;

    public outSourceFromcurrency?: string;

    public outSourceToCurrency?: string;

    public outSourceConvertValue?: string;

    public outSourceConvertionRate?: string;

    public outSourceBasicValue?: number;

    public createdBy?: string;

    public createdDtDisp?: string;

    public updatedBy?: string;

    public updatedDtDisp?: string;

    public tlAppId?: number;

    public payTermsCd?: string;

    public payTermDays?: number;

    public curCd?: string;

    public transporterName?: string;

    public transporterAddress?: string;

    public supplierLocName?: string;

    public supplierLocId?: number;
    
    public manufacturerId?: number;

    public manufacturerName?: string;

    public itemCategoryId?: number;

    public itemCategoryName?: string;

    public itemTypeId?: number;

    public itemTypeName?: string;

    public description ?: string;

    public makerPartCode ?: string;

    public poReqDtl ?:PurchaseRequestDtl;

    public poReqDtlList ?:PurchaseRequestDtl[];

    public unmatchedFlag ?; boolean = false;

}