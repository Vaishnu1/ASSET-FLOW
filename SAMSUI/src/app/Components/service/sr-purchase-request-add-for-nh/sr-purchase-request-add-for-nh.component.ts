import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { PurchaseRequestDtl } from 'src/app/Model/purchase/prReqDtl';
import { PurchaseRequestHdr } from 'src/app/Model/purchase/prReqHdr';

@Component({
  selector: 'app-sr-purchase-request-add-for-nh',
  templateUrl: './sr-purchase-request-add-for-nh.component.html',
  styleUrls: ['./sr-purchase-request-add-for-nh.component.css']
})
export class SrPurchaseRequestAddForNhComponent implements OnInit {

  prGroup1: string;
  srNo: string;
  poReqDtDisp: Date;

  purchaseRequestCreate: FormGroup;

  srModel: ServiceRequestModel;

  accessoriesList: any = [];
  skipCount: number;
  limitCount: any;
  scrollsyncItemName: boolean = false;

  prReqDtl: PurchaseRequestDtl;
  prReqHdr: PurchaseRequestHdr;
  prReqDtlList: PurchaseRequestDtl[];
  prReqHdrList: PurchaseRequestHdr[] = [];

  scrollorderReasonsync: boolean = false;
  orderReasonPageNumber: number;
  orderReasonList: any = [];

  constructor(public purDialog: MatDialogRef<SrPurchaseRequestAddForNhComponent>,
    public commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private data,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSessionService: UserSessionService,
    private assetOptimaServices: AssetOptimaServices) {
    this.skipCount = 1;
    this.orderReasonPageNumber=1;
    this.prReqHdr = new PurchaseRequestHdr();
    this.prReqDtl = new PurchaseRequestDtl();
    this.srModel = new ServiceRequestModel();
  }

  ngOnInit() {
    this.prGroup1 = this.data.prFor;
    this.srModel = this.data.srModel;
    this.srNo = this.srModel.srNo;
    this.purchaseRequestCreate = new FormGroup({
      prCategory: new FormControl('', []),
      poReqNo: new FormControl(''),
      poReqDt: new FormControl(''),
      poReqDtDisp: new FormControl(''),
      requestedBy: new FormControl(''),
      prType: new FormControl(''),
      prGroup: new FormControl(''),
      itemId: new FormControl(0),
      itemName: new FormControl('',[Validators.required]),
      poReqQty: new FormControl(0,[Validators.required]),
      requiredDt: new FormControl(''),
      prGroupType: new FormControl(''),
      itemCategoryName: new FormControl(''),
      itemTypeName: new FormControl('',[Validators.required]),
      itemTypeId: new FormControl(''),
      itemCategoryId: new FormControl(''),
      makerPartCode: new FormControl(''),
      description: new FormControl('',[Validators.required]),
      uomCode: new FormControl(''),
      unmatchedFlag: new FormControl(''),
      orderReason: new FormControl('',[Validators.required]),
    });
    this.poReqDtDisp = new Date();
    this.purchaseRequestCreate.controls.requestedBy.setValue(this.userSessionService.getUserName());
    this.purchaseRequestCreate.controls.unmatchedFlag.setValue(false);  
  }

  ngAfterViewInit() {
    this.setPRtype(this.srModel.ecs);
  }

  setPRtype(ecs){
    if(ecs=='IN HOUSE'){
      this.prTypeList=this.prTypeOption1;
      this.purchaseRequestCreate.controls.prType.setValue('OUTRIGHT EXCHANGE');
    }else if(ecs=='WARRANTY'){
      this.prTypeList=this.prTypeOption2;
      this.purchaseRequestCreate.controls.prType.setValue('WARRANTY');
    }else if(ecs=='CMC'){
      this.prTypeList=this.prTypeOption2;
      this.purchaseRequestCreate.controls.prType.setValue('CMC');
    }else if(ecs=='AMC'){
      this.prTypeList=this.prTypeOption2;
      this.purchaseRequestCreate.controls.prType.setValue('AMC');
    }else if(ecs=='RENTAL'){
      this.prTypeList=this.prTypeOption2;
      this.purchaseRequestCreate.controls.prType.setValue('RENTAL');
    }else if(ecs=='LEASE'){
      this.prTypeList=this.prTypeOption2;
      this.purchaseRequestCreate.controls.prType.setValue('LEASE');
    }
  }

    //This valiadtion for PR type combo value list & set START 
    prTypeList:any[]=[];
    prTypeOption1=[
      {lable:'OUTRIGHT EXCHANGE',value:'OUTRIGHT EXCHANGE'},
      {lable:'OUTRIGHT NON-EXCHANGE',value:'OUTRIGHT NON-EXCHANGE'}
    ];
    prTypeOption2=[
      {lable:'WARRANTY',value:'WARRANTY'},
      {lable:'CMC',value:'CMC'},
      {lable:'AMC',value:'AMC'},
      {lable:'RENTAL',value:'RENTAL'},
      {lable:'LEASE',value:'LEASE'}
    ];

  closePurchaseNHModal() {
    this.purDialog.close();
  }

  itemCatList: any[] = [];
  selectRadioValue(e) {
    if (e.value == 'Service') {
      this.itemCatList = this.Services;
    } else if (e.value == 'Material') {
      this.itemCatList = this.Materials;
    }
  }

  selectRadioValueForEdit(e) {
    if (e== 'Service') {
      this.itemCatList = this.Services;
    } else if (e== 'Material') {
      this.itemCatList = this.Materials;
    }
  }

  Materials = [
    { lable: 'SPARE PARTS', value: 'Spare part' },
    { lable: 'ACCESSORIES', value: 'Accessories' },
    { lable: 'CONSUMABLES', value: 'Consumables' },
  ];

  Services = [
    { lable: 'SERVICE ONSITE', value: 'SERVICE ONSITE' },
    { lable: 'SERVICE OFFSITE', value: 'SERVICE OFFSITE' },
    { lable: 'CALIBRATION ONSITE', value: 'CALIBRATION ONSITE' },
    { lable: 'CALIBRATION OFFSITE', value: 'CALIBRATION OFFSITE' }
  ];

  listOfItem(searchValue) {
    this.scrollsyncItemName = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchValue.term, '', '', this.limitCount, this.skipCount, this.purchaseRequestCreate.controls.itemTypeName.value).subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.skipCount === 1) {
            this.accessoriesList = data.responseData.comboList;
          } else {
            this.accessoriesList = this.accessoriesList.concat(data.responseData.comboList);
          }
        } else {
          this.accessoriesList = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.skipCount += 1 : this.skipCount = 1;
      }
    );
    this.scrollsyncItemName = false;
  }

  getAccessoriesComboValue(event) {
    if (event != undefined) {
      this.purchaseRequestCreate.controls.uomCode.setValue(event.uomCode);
      this.purchaseRequestCreate.controls.itemId.setValue(event.itemId);
      this.purchaseRequestCreate.controls.itemName.setValue(event.itemName);
      this.purchaseRequestCreate.controls.description.setValue(event.itemDesc);
      this.purchaseRequestCreate.controls.makerPartCode.setValue(event.oemCode);
      this.purchaseRequestCreate.controls.itemCategoryName.setValue(event.itemCategoryName);
      this.purchaseRequestCreate.controls.itemTypeName.setValue(event.itemTypeName);
      this.purchaseRequestCreate.controls.itemCategoryId.setValue(event.itemCategoryId);
      this.purchaseRequestCreate.controls.itemTypeId.setValue(event.itemTypeId);
    } else {
      this.purchaseRequestCreate.controls.uomCode.setValue('');
      this.purchaseRequestCreate.controls.itemId.setValue(0);
      this.purchaseRequestCreate.controls.itemName.setValue('');
      this.purchaseRequestCreate.controls.description.setValue('');
      this.purchaseRequestCreate.controls.makerPartCode.setValue('');
      this.purchaseRequestCreate.controls.itemCategoryName.setValue('');
      this.purchaseRequestCreate.controls.itemTypeName.setValue('');
      this.purchaseRequestCreate.controls.itemCategoryId.setValue(0);
      this.purchaseRequestCreate.controls.itemTypeId.setValue(0);
    }
  }

  raisePurchaseRequest() {
    this.prReqHdr.poReqNo = this.purchaseRequestCreate.controls.poReqNo.value;
    this.prReqHdr.poReqDt = this.purchaseRequestCreate.controls.poReqDt.value;
    this.prReqHdr.requestedBy = this.purchaseRequestCreate.controls.requestedBy.value;
    this.prReqHdr.prType = this.purchaseRequestCreate.controls.prType.value;
    this.prReqHdr.prGroup = this.data.prFor;
    this.prReqHdr.locationId = this.srModel.locationId;
    this.prReqHdr.locationName = this.srModel.locationName;
    this.prReqHdr.assetHdrId = this.srModel.assetHdrId;
    this.prReqHdr.assetCode = this.srModel.assetCode;
    this.prReqHdr.srNo = this.srModel.srNo;
    this.prReqHdr.srId = this.srModel.srId;
    this.prReqHdr.poReqStatus = 'REQUEST RAISED';
    this.prReqHdr.prReason = this.purchaseRequestCreate.controls.prGroupType.value;
    this.prReqHdr.orderReason = this.purchaseRequestCreate.controls.orderReason.value;
    
    this.prReqDtl.itemId = this.purchaseRequestCreate.controls.itemId.value;
    this.prReqDtl.itemName = this.purchaseRequestCreate.controls.itemName.value;
    this.prReqDtl.poReqQty = this.purchaseRequestCreate.controls.poReqQty.value;
    this.prReqDtl.requiredDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.purchaseRequestCreate.controls.requiredDt.value);
    this.prReqDtl.itemCategoryId = this.purchaseRequestCreate.controls.itemCategoryId.value;
    this.prReqDtl.itemCategoryName = this.purchaseRequestCreate.controls.itemCategoryName.value;
    this.prReqDtl.itemTypeId = this.purchaseRequestCreate.controls.itemTypeId.value;
    this.prReqDtl.itemTypeName = this.purchaseRequestCreate.controls.itemTypeName.value;
    this.prReqDtl.description = this.purchaseRequestCreate.controls.description.value;
    this.prReqDtl.makerPartCode = this.purchaseRequestCreate.controls.makerPartCode.value;
    this.prReqHdr.poReqDtl = this.prReqDtl;

    this.prReqHdrList.push(JSON.parse(JSON.stringify(this.prReqHdr)));
    this.clear();
  }

  delete(index) {
    this.prReqHdrList.splice(index, 1);
  }

  clear() {
    this.purchaseRequestCreate.reset();
    this.purchaseRequestCreate.updateValueAndValidity();
    this.itemCatList=[];
    this.purchaseRequestCreate.controls.requestedBy.setValue(this.userSessionService.getUserName());
    this.purchaseRequestCreate.controls.unmatchedFlag.setValue(false);
    this.purchaseRequestCreate.controls.itemName.enable();
    this.ngAfterViewInit();
  }

  savePurchase() {
    if(this.prReqHdrList.length>0){
      let obj={ 'prServiceRequestList':this.prReqHdrList }
      this.commonService.commonInsertService('saveOrUpdatePRFromServiceRequest.sams', obj).subscribe(
        data => {
          if (data.success) {
            //set the response data to the local variable
            this.commonService.openToastSuccessMessage(data.message);
            this.clear();
            this.closePurchaseNHModal();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
          this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
          //show error message if error
        }
      );
    }
  }

  disableFieldsForUnmatched(){
    if(!this.purchaseRequestCreate.controls.unmatchedFlag.value){
      this.purchaseRequestCreate.controls.itemName.disable();
      this.prReqDtl.unmatchedFlag=true;      
    }else{
      this.purchaseRequestCreate.controls.itemName.enable();
      this.prReqDtl.unmatchedFlag=false;
    }   
      this.purchaseRequestCreate.controls.itemId.setValue(0);
      this.purchaseRequestCreate.controls.itemName.setValue(''); 
      this.purchaseRequestCreate.controls.itemTypeId.setValue(0);
      this.purchaseRequestCreate.controls.itemCategoryId.setValue(0);
      this.purchaseRequestCreate.controls.itemCategoryName.setValue('');
      this.purchaseRequestCreate.controls.makerPartCode.setValue('');
  }

  loadOrderReasonComboData(searchValue) {
    this.scrollorderReasonsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllOrderReasons.sams', searchValue.term, '', '', this.limitCount, this.orderReasonPageNumber).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.orderReasonPageNumber === 1) {
              this.orderReasonList = data.responseData.comboList;
            } else {
              this.orderReasonList = this.orderReasonList.concat(data.responseData.comboList);
            }
          } else {
            this.orderReasonList = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.orderReasonPageNumber += 1 : this.orderReasonPageNumber = 1;
        }
      }
    );
    this.scrollorderReasonsync = false;
  }

  selectedOrderReasonData(event) {
    if (event === undefined) {
      this.purchaseRequestCreate.controls['orderReason'].setValue('');
      this.orderReasonPageNumber = 1;
      this.orderReasonList = [];
    } else {
      this.purchaseRequestCreate.controls['orderReason'].setValue(event.orderReasonName);
    }
  }

}
