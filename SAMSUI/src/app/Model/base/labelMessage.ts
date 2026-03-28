export class LabelMessageModel{

	public  locLabelId ?:number;

	public  orgId ?:number;

	public  locationId ?:number;

	public  languageCode ?:string;

	public  labelKey ?:string;
	
    public  labelType ?: string;

	public  labelActualValue ?: string;

	public  labelUpdateValue ?:string;

	public  createdBy ?:string;

	public  createdDt ?:Date;

	public  updatedBy ?:string;

	private  updatedDt ?:string;

	public  pageNumber :number;

	public  recordsPerPage :number; 

}