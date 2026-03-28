import { CusFieldHdr } from "./cusFieldHdr";

export class AssetCustFieldValue {
    public customFieldValId ?: number;
    public customHdrId?: number;
    public assetCategoryId?: number;
    public orgId?: number;
    public locationId?: number;
    public transactionId?: number;
    public transactionSource?: string;
    public value?: string;
    public  createdBy?:string; 
    public  createdDt?:Date; 
    public  updatedBy?:string; 
    public  updatedDt?:Date; 

    

}
