import { CustFieldDtl } from "./cust-field-dtl";
import { AssetCustFieldValue } from "./asset-cust-field-value";

export class CusFieldHdr{
    public  customHdrId ?:number;
    public customFieldValId ?:number;
    public  orgId ?:number;
	public  assetSubCategoryId ?:number;
	public  labelName ?:string;
	public  inputType ?: string;
    public  inputMaxLength ?:number;
    public  active ?: boolean;
    public  value?:string; 
    public  values?:string; 
    public  createdBy?:string; 
    public  createdDt?:Date; 
    public  updatedBy?:string; 
    public  updatedDt?:Date; 
    public  updatedDtDisp?:string;
    public  createdDtDisp?:string; 
    public customComboList ?: CustFieldDtl[];
    public assetCustomFieldValue ?:AssetCustFieldValue[];
    public value1?:any;
    public basedOn?:any;
    public basedOnDisp?: any[];
    public displayGroup?: string;
    public color?:string;
    public displayGroupId?: number;
    public assetGroupId?: number;
    public modelId?: number;
    public transactionId?: number;
    public transactionSrc?: string;
}