import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../Services/window-providers';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Injectable()
export class AssetOptimaConstants { 
    readonly localDevelopmentURL = 'http://localhost:8080/';   
    readonly basehref = 'SAMS';   

    constructor( @Inject(WINDOW) private window: Window){ 
    } 
 
    getServerURL() {
        if(this.window.location.hostname === 'localhost'){  
            return this.localDevelopmentURL; 
        }else{
            return this.window.location.protocol + '//' + this.window.location.host + '/' + this.basehref + '/';
        }
      }
 
    //npm install @angular/cli@7.3.8
    //node:10.16

    //npm install @angular/cli@9.1.3
    //node:12.16.2
      
    connectionUrl: string = this.getServerURL();           
	readonly numericValidation: string = "^([0-9]*$)"; 
    readonly phoneNumberValidation: string = "^[+]?[0-9]*$";
    //readonly emailValidation: string = "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-.]+[a-zA-Z]+$";
    readonly emailValidation: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";
    readonly multipleEmailValidation:string="^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}(;|$))"; 
    readonly percentageValidation: string = "([0-9]{0,})([.]{1})?([0-9]{1,2})";   
    readonly serverError: any ="Server Not Reachable";
    readonly loggedInUserInfo: string = 'LOGGED_IN_USER';
    readonly passwordValidation: string = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*[ ])(?=.*[!#-/:-@[-`{-~]).{8,100}$"; 
    readonly decimalValidation: string = "^[0-9]+(\.[0-9]{1,5})?$";
    readonly decimalValidation1: string =  "^[0-9]+([.][0-9]+)?$";
    readonly greaterThanZeroValidation: string = "^(?!0+(?:\.0+)?$)";
    readonly lessThanZeroValidation: RegExp = /^-\d+(\.\d+)?$/;

    //Assignee end date
    readonly defaultAssigneeEndDate = new Date(2099, 11, 31);


    //VERSION NUMBER FROM POM FILE
    version: string = "";

    //DEFAULT LOCATION
    defaultuserLocId :number=0;
    defaultuserLocName :string='';
    baseCurrencySymbol :string='';
    defaultuserLocRegionId: number = 0;
    defaultuserLocRegionName : string='';
    
    // DEFAULT COUNTRY NAME
    defaultCountryName : string = 'INDIA';

    //LOAD DATA BASED ON LOCATION IN HEADER
    userLocId: number=0;
    userLocName :string='';  
    
    //CALCULATE RETIRED AND DISPOSED BASED ON FINANCIAL YEAR
    fyStartYear :string=''; 
    fyEndYear :string='';
    locCurrCd :string='';

    //LOCATION TYPE
    locationType :string='';

    //flag
    retireDisposedApproval: boolean = false; 
    relocationApproval: boolean = true; 
    purchaseRequisitionApproval: boolean = false; 
    orgPurchaseReqForNHModule: boolean = false; 
    tlApproved: boolean = false; 
    rmApproved: boolean = false; 
    sourcingApproved: boolean = false; 
    defaultUseFulYrsForAsset: number=0;
    itemApproval: boolean = false;
    assetGatePassApproval:boolean = false;
    assetPhysicalAuditApproval:boolean = false;
    manufacturerApproval:boolean =false;
    loginUserPhoneNumber: Number = 0;  
    contractApproval:boolean = false;
    contractCancel:boolean =false;
    loanReturnApproval:boolean =false;

    //PASSWORD CHANGE COUNT
    pwdChangeCount: number  = 0;

    //EMAIL VALIDITY STATUS
    emailValidityStatus: boolean = false;

    formatList =[
        { format: 'DD-MM-YYYY'},
        { format: 'DD/MM/YY'},
      ];

     ISODate = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
     
     YYYY_MM_DD = 'YYYY-MM-DD';

     // Custom validator function for decimal validation
    customDecimalValidator(digitsBefore: number, digitsAfter: number): ValidatorFn {
        return (control: FormControl): {[key: string]: any} | null => {
        const regex = new RegExp(`^\\d{1,${digitsBefore}}(\\.\\d{1,${digitsAfter}})?$`);
        const valid = regex.test(control.value);
        return valid ? null : {customNumber: true};
        };
    }

    //custom validator function for multiple patterns
    multpliePatternsValidator(regExPattern, error: ValidationErrors): ValidatorFn {
        const regex = new RegExp(regExPattern);    
        return (control: AbstractControl): {[key: string]: any} => {
            if (!control.value) {
                return null;
            }
            const valid = regex.test(control.value);
            return valid ? null : error;
        }
    }
    
    //NOT APPLICABLE
    notApplicable: string  ='NOT APPLICABLE'
} 