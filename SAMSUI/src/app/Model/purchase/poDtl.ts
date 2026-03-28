import { BaseModel } from "../base/baseModel";

export class PurchaseOrderDtl extends BaseModel {

    public poDtlId ? : number;

    public poId ? : number;
    
    public poNo ? : string;
    
    public poLineNo ? : number;
        
    public itemId ? : number;

    public itemCd ? : string;
    
    public itemDesc ?: string;

    public suppItemCd ?: string;
    
    public uomCd ?: string;
    
    public poQty ?: number;
    
    public cancelQty ?: number;
    
    public cancelReason ?: string;
    
    public receivedQty ?: number;
    
    public invoicedQty ?: number;
    
    public unitPrice ?: number;
    
    public locUnitPrice ?: number;
    
    public poBasicAmt ?: number;
    
    public localPoBasicAmt ?: number;
    
    public inspectionRequired ?: string;
    
    public poReqDt ?: Date;

    public poReqDtDisp ?: string;
    
    public lastReceivedDt ?: Date;

    public lastReceivedDtDisp ?: string;
    
    public custPoNo ?: string
        
    public remarks ?: string;
    
    public holdFlg ?:string;

    public taxCd1 ?:string;

    public taxRate1 ?:number;

    public taxAmt1 ?:number;

    public taxCd2 ?:string;

    public taxRate2 ?:number;

    public taxAmt2 ?:number;

    public taxCd3 ?:string;

    public taxRate3 ?:number;

    public taxAmt3 ?:number;

    public netAmt ?:number;

    public shipType ?:string;

    public expDeliveryDt ?:Date;

    public expDeliveryDtDisp ?:string;

    public prDtlId ?:number;

    public invoiceRdvcDt ?:Date;

    public invoiceRcvdDtDisp ?:string;

    public invoiceClear ?:number;

    public pendingInvAmt ?:number;

    public rejectQty ?:number;

    public prId ?:number;

    public prReqNo ?:string;
    
    public  deliveryCfmDt ?: Date;

    public  deliveryCfmDtDisp ?: string;

    public supplierName ?:string;

    public outsourceFromCurrency ?:string;

    public outsourceToCurrency ?:string;

    public outsourceConvertValue ?:string;

    public outsourceConvertionRate ?:string;

    public outsourceBasicValue ?:number;

    public typeOfOutsource ?:string;

    public outsourceStartDate ?:Date;

    public outsourceStartDateDisp ?:string;

    public outsourceEndDate ?:Date;

    public outsourceEndDateDisp ?:string;

    public noOfOutsourcedays ?:number;

    public outsourceTax ?:number;

    public outsourceExTax ?:number;

    public outsourceInclusTax ?:number;

    public prType ?:string;

    public poReqType ?:string;

    public createdBy ?:Date;
    
    public createdDtDisp ?: string;
    
    public updatedBy ?: Date;
    
    public updatedDtDisp ?: string;

    }