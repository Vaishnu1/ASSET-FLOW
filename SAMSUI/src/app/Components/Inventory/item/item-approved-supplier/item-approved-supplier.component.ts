import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { MatTableDataSource } from '@angular/material/table';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-item-approved-supplier',
  templateUrl: './item-approved-supplier.component.html',
  styleUrls: ['./item-approved-supplier.component.css']
})
export class ItemApprovedSupplierComponent implements OnInit{

  displayedColumns = ['sno', 'priceEffFromDt', 'priceEffToDt', 'unitPurchasePrice', 'active','action'];

  itemApprovedSupplierForm: FormGroup;
  itemPurchasePriceFormGroup: FormGroup;
  itemPurchasePriceListDataSource= new MatTableDataSource<any>();

  headingDisplay: string;
  buttonDisplay: string;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  itemPPbuttonDisplay: String = 'Add';
  itemPPIndex:number = 0;

  subLoaderItemSupplier: boolean = false;
  maxDate:String;
  mode:String;
  toDate:String;
  currentDate: Date;

  constructor(public dialogRef: MatDialogRef<ItemApprovedSupplierComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              public commonService: CommonService,
              public assetOptimaServices: AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSessionService: UserSessionService,
              ) { }

  ngOnInit() {  
    this.currentDate = new Date();  
    this.itemPurchasePriceListDataSource.data=[]

    this.itemApprovedSupplierForm = new FormGroup({
      itemApprovedSuppId:  new FormControl(0),
      itemLocId:  new FormControl(0),
      supplierId:  new FormControl(0),
      supplierSiteId:  new FormControl(0),
      supplierName:  new FormControl(null),
      supplierSiteName:  new FormControl(null),
      suppItemCd:  new FormControl(null,[Validators.maxLength(100)]),
      moq:  new FormControl(0,[this.assetOptimaConstants.customDecimalValidator(6,2)]),
      leadTimeDays:  new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      createdBy:  new FormControl(''),
      createdDt:  new FormControl(''),
      updatedBy:  new FormControl(''),
      updatedDt:  new FormControl(''),
      active: new FormControl(true),
      itemPurchasePriceList: new FormControl([]),
      suppSiteCurCd: new FormControl('')
    });

    this.itemPurchasePriceFormGroup = new FormGroup({
      itemPurchasePriceId: new FormControl(0),
      itemLocId: new FormControl(0),
      supplierSiteId:  new FormControl(0),
      priceEffFromDt: new FormControl(''),
      priceEffToDt: new FormControl(''),
      unitPurchasePrice: new FormControl('', [Validators.required,
        this.assetOptimaConstants.multpliePatternsValidator(this.assetOptimaConstants.decimalValidation1,{'numbersOnly':true}),
        this.assetOptimaConstants.multpliePatternsValidator(this.assetOptimaConstants.greaterThanZeroValidation,{'greaterThanZero':true}),
        this.assetOptimaConstants.customDecimalValidator(15,5) ]),
      createdBy:  new FormControl(''),
      createdDt:  new FormControl(''),
      updatedBy:  new FormControl(''),
      updatedDt:  new FormControl(''),
      active: new FormControl(true),
      priceEffFromDtDisp: new FormControl('',[Validators.required]),
      priceEffToDtDisp: new FormControl(''),
    });

    this.disableToDate();
    this.mode = this.data.action;
    this.itemApprovedSupplierForm.patchValue(this.data.itemAppSuppTO);
    if (this.data.itemAppSuppTO.itemPurchasePriceList.length > 0) {
      this.itemPurchasePriceListDataSource.data = this.data.itemAppSuppTO.itemPurchasePriceList;   
      this.getMaxDate();            
    }

    this.itemApprovedSupplierForm.controls.supplierName.disable();
    this.itemApprovedSupplierForm.controls.supplierSiteName.disable();
    this.itemApprovedSupplierForm.controls.suppSiteCurCd.disable();

    this.itemApprovedSupplierForm.patchValue(this.itemApprovedSupplierForm.getRawValue());

    if (this.mode === 'Add') {
      this.headingDisplay="Add Item Supplier";
      this.buttonDisplay="Submit";
    }else if (this.mode === 'edit'){
      this.headingDisplay="Edit Item Supplier";
      this.buttonDisplay="Update";
    }else if (this.mode === 'view'){
      this.headingDisplay="View Item Supplier";
      this.itemApprovedSupplierForm.disable();
    }
  }

  closeModal(){
    this.dialogRef.close();
  }

  submit(){    
    this.itemApprovedSupplierForm.controls.itemPurchasePriceList.setValue(this.itemPurchasePriceListDataSource.data);
    this.dialogRef.close(this.itemApprovedSupplierForm.getRawValue());
  }

  addItemPurchasePriceToList(mode,itemPPIndex){
    const toDate = this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.value;

    const priceEfffromDt = new Date(this.itemPurchasePriceFormGroup.controls.priceEffFromDtDisp.value);    
    this.itemPurchasePriceFormGroup.controls.priceEffFromDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(priceEfffromDt));
    if (this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.value != null &&
         this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.value !== "") {
      const priceEffToDt = new Date(this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.value);
      this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(priceEffToDt));  
    }
   
    if (mode === 'Add') {
      this.itemPurchasePriceFormGroup.controls.supplierSiteId.setValue(this.itemApprovedSupplierForm.controls.supplierSiteId.value);
      this.itemPurchasePriceListDataSource.data.push(this.itemPurchasePriceFormGroup.getRawValue());
    }else if(mode === 'Update'){   
      this.itemPurchasePriceListDataSource.data[itemPPIndex].itemPurchasePriceId = this.itemPurchasePriceFormGroup.controls.itemPurchasePriceId.value;
      this.itemPurchasePriceListDataSource.data[itemPPIndex].priceEffFromDtDisp = this.itemPurchasePriceFormGroup.controls.priceEffFromDtDisp.value;
      this.itemPurchasePriceListDataSource.data[itemPPIndex].priceEffToDtDisp = this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.value;
      this.itemPurchasePriceListDataSource.data[itemPPIndex].unitPurchasePrice = this.itemPurchasePriceFormGroup.controls.unitPurchasePrice.value;
      this.itemPurchasePriceListDataSource.data[itemPPIndex].active = this.itemPurchasePriceFormGroup.controls.active.value;      
      this.itemPPbuttonDisplay = 'Add';  
        
      this.itemPurchasePriceFormGroup.get('unitPurchasePrice').enable();
      this.itemPurchasePriceFormGroup.get('priceEffFromDtDisp').enable();
      this.itemPurchasePriceFormGroup.get('priceEffToDtDisp').enable();
    }
    if (toDate != null && toDate !== "") {
      this.maxDate = toDate;
    }
    this.disableToDate();

    this.itemPurchasePriceListDataSource._updateChangeSubscription();
    this.itemPurchasePriceFormGroup.reset();
    this.itemPurchasePriceFormGroup.controls.itemPurchasePriceId.setValue(0);
    this.itemPurchasePriceFormGroup.controls.itemLocId.setValue(0);
    this.itemPurchasePriceFormGroup.controls.supplierSiteId.setValue(0);
    this.itemPurchasePriceFormGroup.controls.unitPurchasePrice.setValue('');
    this.itemPurchasePriceFormGroup.controls.active.setValue(true);
  }

  editItemPurchasePrice(element,i){     
    this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.enable();

    this.itemPPbuttonDisplay = 'Update';
    this.itemPPIndex = i;
    const priceEfffromDt = this.coventStringToDate(element.priceEffFromDtDisp);
    const priceEffToDt = this.coventStringToDate(element.priceEffToDtDisp);    
    
    this.itemPurchasePriceFormGroup.patchValue(element);
    this.itemPurchasePriceFormGroup.controls.priceEffFromDtDisp.setValue(priceEfffromDt);
    this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.setValue(priceEffToDt);

    this.itemPurchasePriceFormGroup.get('priceEffFromDtDisp').disable();
    this.toDate = this.commonService.convertToDateStringyyyy_mm_dd(new Date());
  }

  getMaxDate(){   
    var maxIdx = 0;
    for(var i = 0; i < this.itemPurchasePriceListDataSource.data.length; i++) {
        if(this.itemPurchasePriceListDataSource.data[i].priceEffToDtDisp > this.itemPurchasePriceListDataSource.data[maxIdx].priceEffToDtDisp){
          maxIdx = i;
        } 
    }
    this.maxDate = this.coventStringToDate(this.itemPurchasePriceListDataSource.data[maxIdx].priceEffToDtDisp);    
  }

  dateValidation(event) {   
    if (this.itemPurchasePriceFormGroup.controls.priceEffFromDtDisp.value == null) {
      this.disableToDate();
    }else{
      this.itemPurchasePriceFormGroup.controls.priceEffToDtDisp.enable();
    }
    
    this.toDate = this.itemPurchasePriceFormGroup.controls.priceEffFromDtDisp.value;
    return false;
  }

  coventStringToDate(dateString){    
    if (dateString != null && dateString !== "") {
      const dateParts = dateString.split('-');
      const dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      dateObject.setHours(5, 30, 0, 0);
      const convertedDateString = dateObject.toISOString().slice(0, 10);    
      return convertedDateString;
    }
  }
  
  checkActiveOrNot(element){
    var dt = new Date(this.coventStringToDate(element.priceEffToDtDisp));
    if (new Date() > dt) {
        element.active = false;
        return false;
    }else{
      element.active = true;
      return true;
    }
  }

  toDateValidation(event){
    return false;
  }

  disableToDate(){
    this.itemPurchasePriceFormGroup.get('priceEffToDtDisp').disable();
  }

}
