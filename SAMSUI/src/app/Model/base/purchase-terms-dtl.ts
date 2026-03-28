import { BaseModel } from "./baseModel";

export class PurchaseTermsTemplateDtl extends BaseModel{

    public tcTemplateDtlId ?: number;
	
	public tcTemplateHdrId ?: number;
	
	public tcParameterId ?: number;
	
	public tcParameterName ?: string;
	
	public displaySequenceNo ?: string;
	
	public remarks ?: string;
	
	public tcParameterChildId ?: number;
	
	public tcParameterChildName ?: string;
	
	public tcParameterInputType ?: string;
	
	public tcParameterInputValues ?: string;
	
	public tcParameterRemarks ?: string;
	
	public tcParameterChildInputType ?: string;
	
	public tcParameterChildInputValues ?: string;
	
	public tcParameterChildRemarks ?: string;

	public comboValues ?: any[];

	public value ?: any[];

	public comboValuesChild ?: any[];

	public valueChild ?: any[];

	public tcParameterChildId2 ?: number;
	
	public tcParameterChildName2 ?: string;
 
	public valueChild2 ?: any[];

	public editable ?: boolean;

	public tcParameterEditable ? : boolean;

	public tcParameterChildEditable ?: boolean;

}
