
export class PrinterTemplateModel {

    public printerTemplateId?: number;
    public printerModelId?: number;
    public printerLabelId?: number;

    public printerModel?: string;
    public printerLabelSize?: string;
    public templatePath?: string;

    public fileName?: string;
    public fileType?: string;

    public defaultTemplate?: boolean;
    
    public active?: boolean; 
    public columnName ?:string;
    public direction ?:string;
    
    public createdBy?: string;
    public createdDt?: Date;
    public updatedBy?: string;
    public updatedDt?: Date;

    public orgId?: number;
    public locationId?: number;
    public locationName?: string;

    public pageNumber?: number;
    public recordsPerPage?: number;
    public updatedDtDisp?: string;
    public createdDtDisp?: string;
    public logInUserOrgId?: number;
    public logInUserLocId?: number;
    public logInUserId?: number;  
    public searchValue?: string;
    public searchValue1?: string;

}