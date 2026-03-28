import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Title } from '@angular/platform-browser';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PurchaseRequestDtl } from 'src/app/Model/purchase/prReqDtl';
import { PurchaseRequestHdr } from 'src/app/Model/purchase/prReqHdr';

@Component({
  selector: 'app-request-for-stock-create',
  templateUrl: './request-for-stock-create.component.html',
  styleUrls: ['./request-for-stock-create.component.css']
})
export class RequestForStockCreateComponent implements OnInit {

  //Set Page title
  title = 'Asset Optima - Request For Stock'; 

  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlag: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  rfsForm: FormGroup;
  prCreateForm: FormGroup;

  //COMBO
  locationCombo: any = [];
  departmentCombo: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  itemCombo: any = [];
  orderReasonList: any = [];
  supplierCombo: any = [];

  locationPageNumber:number;
  departmentPageNumber:number;
  assetGroupPageNumber:number;
  modelComboPageNumber:number;
  itemComboPageNumber:number;
  orderReasonPageNumber: number;
  supplierPageNumber:number;

  scrollsyncLocation:boolean=false;
  scrollsyncDepartment:boolean=false;
  scrollsyncAssetGroup:boolean=false;
  scrollsyncModel:boolean=false;
  scrollsyncItemName:boolean=false;
  scrollorderReasonsync: boolean = false;
  scrollsyncSupplier:boolean=false;

  recordsPerPageForCombo:string;

  prReqDtl: PurchaseRequestDtl;
  prReqHdr: PurchaseRequestHdr;
  prReqDtlList: PurchaseRequestDtl[];
  prReqHdrList: PurchaseRequestHdr[] = [];

  createDisplay: boolean = false;     
  editDisplay: boolean = false;
  viewDisplay: boolean = false;

  purchaseDtlList: any[] =[];              

  displayedColumnsPurchaseDtl= ['sNo','poReqNo','poReqDtDisp','itemName','description','itemTypeName','supplierName','poReqQty'];  

  constructor(private activatedRoute: ActivatedRoute, 
              private commonService: CommonService,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSessionService: UserSessionService,
              private titleService: Title,
              private location : Location,
              private router: Router) { 
              
          this.locationPageNumber = 1;
          this.departmentPageNumber = 1;
          this.assetGroupPageNumber = 1;
          this.modelComboPageNumber = 1;
          this.itemComboPageNumber = 1;
          this.orderReasonPageNumber=1;
          this.supplierPageNumber = 1;
          this.prReqHdr = new PurchaseRequestHdr();
          this.prReqDtl = new PurchaseRequestDtl();
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.rfsForm = new FormGroup({
      orgId : new FormControl(''),
      locationName : new FormControl('',[Validators.required]),
      locationId : new FormControl(''),
      departmentName : new FormControl(null,[Validators.required]),
      departmentId : new FormControl(''),
      assignedTo : new FormControl(''),
      assignedToId: new FormControl(0),
      assetCode : new FormControl(''),
      subDepartment : new FormControl(''),
      callerName : new FormControl(''),
      callerContactNo : new FormControl(''),
      problemReported : new FormControl(''),
      srPriority : new FormControl(''),
      srSeverity : new FormControl(''),  
      assetHdrId : new FormControl(''),
      assetSerialNo : new FormControl(''),
      modelId : new FormControl(''),
      modelName : new FormControl(null,[Validators.required]),
      assetGroupId : new FormControl(''),
      assetGroupName : new FormControl(null,[Validators.required]),
      maintenanceType : new FormControl(''),
      subDepartmentId : new FormControl(0),
      srType : new FormControl(null,[Validators.required]),
      assetCategoryId : new FormControl(0),
      assetCategoryName : new FormControl(''),
      subCategoryId : new FormControl(0),
      subCategoryName : new FormControl(''),
      assetTypeName : new FormControl(''),
      assetTypeId : new FormControl(0),
      functionality : new FormControl(''),
      ecs: new FormControl(''),
      manufacturerId : new FormControl(''),
      manufacturerName : new FormControl(''),
      causeCode : new FormControl(),
      actionCode : new FormControl(),
      assetStatusId : new FormControl(0),
      assetStatus : new FormControl(),
      approvedBy : new FormControl(''),
      isParent :new FormControl(false),
      parentSrId : new FormControl(0)
    });
     
    this.prCreateForm = new FormGroup({
      prCategory: new FormControl('', []),
      poReqNo: new FormControl(''),
      poReqDt: new FormControl(''),
      poReqDtDisp: new FormControl(''),
      requestedBy: new FormControl(this.userSessionService.getUserName()),
      prType: new FormControl('',[Validators.required]),
      prGroup: new FormControl(''),
      itemId: new FormControl(0),
      itemName: new FormControl('',[Validators.required]),
      poReqQty: new FormControl('',[Validators.required,Validators.pattern(this.assetOptimaConstants.numericValidation)]),
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
      payType: new FormControl('',[Validators.required]),
      supplierId: new FormControl(0),
      supplierName: new FormControl('',[Validators.required]) 

    });
    this.rfsForm.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.rfsForm.controls['locationId'].setValue(this.userSessionService.getUserLocationId());    
    this.rfsForm.controls['srType'].setValue('RFS'); 
    this.validateEditMode(); 
  }

  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId =Number(primaryId);
        var mode = params.mode;
        if(primaryId <= 0){
          this.createDisplay=true;
          this.editDisplay=false;
          this.viewDisplay=false;
        }else{
          this.commonService.commonGetService('getRFSByServiceRequestId.sams',primaryId).subscribe(
            data => {
              this.rfsForm.patchValue(data.responseData);
              this.purchaseDtlList=data.responseData.poItemList;    
            });
            if(mode=='view'){
              this.editDisplay=false;
              this.viewDisplay=true;
            }else{
              this.editDisplay=true;
              this.viewDisplay=false;
            }
          }
        }
  );
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.locationPageNumber).subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.locationPageNumber=== 1){
            this.locationCombo = data.responseData.comboList;
          }else{
            this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
          }
        } else {
          this.locationCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.locationPageNumber += 1 : this.locationPageNumber = 1;  
     }
    );
    this.scrollsyncLocation=false;
  }

  selectedLocationData(event) {
    if(event===undefined){
      this.rfsForm.controls['locationId'].setValue(0);
      this.rfsForm.controls['locationName'].setValue('');
      this.locationPageNumber=1;
      this.locationCombo=[];
    }else{
      this.rfsForm.controls['locationId'].setValue(event.locationId);
      this.rfsForm.controls['locationName'].setValue(event.locationName);
    }
  }

  loadDepartmentComboData(searchValue) {
    this.scrollsyncDepartment=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.departmentPageNumber).subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.departmentPageNumber=== 1){
            this.departmentCombo = data.responseData.comboList;
          }else{
            this.departmentCombo = this.departmentCombo.concat(data.responseData.comboList);
          }
        } else {
          this.departmentCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.departmentPageNumber += 1 : this.departmentPageNumber = 1;  
     }
    );
    this.scrollsyncDepartment=false;
  }

  selectedDepartmentData(event) {
    if(event===undefined){
      this.rfsForm.controls['departmentId'].setValue(0);
      this.rfsForm.controls['departmentName'].setValue('');
      this.departmentPageNumber=1;
      this.departmentCombo=[];
    }else{
      this.rfsForm.controls['departmentId'].setValue(event.departmentId);
      this.rfsForm.controls['departmentName'].setValue(event.departmentName);
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetGroupCombo.sams', searchKey.term, '', '',
                                       this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
    (data) => {
      if (!(this.commonService.fetchSearchValue(searchKey))) {
        if(this.assetGroupPageNumber=== 1){
          this.assetGroup = data.responseData.comboList;
        }else{
          this.assetGroup = this.assetGroup.concat(data.responseData.comboList);
        }
      } else {
        this.assetGroup = data.responseData.comboList;
      }
      data.responseData.comboList.length != 0 ? this.assetGroupPageNumber += 1 : this.assetGroupPageNumber = 1;     
    });
    this.scrollsyncAssetGroup=false;
  }
  
  getAssetGroupComboValue(event) {
    if (event != null) {
      this.rfsForm.controls['assetGroupName'].setValue(event.assetGroupName);
      this.rfsForm.controls['assetGroupId'].setValue(event.assetGroupId);
      this.modelCombo=[];
      this.modelComboPageNumber=1;
    }else{
      this.rfsForm.controls['assetGroupName'].setValue("");
      this.rfsForm.controls['assetGroupId'].setValue(0);
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
      this.modelCombo=[];
      this.modelComboPageNumber=1;  
    }
  }
  
  listOfAllModel(searchKey) {
    this.scrollsyncModel=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', 
                   this.rfsForm.controls.assetGroupId.value > 0 ? this.rfsForm.controls.assetGroupId.value : '',
                                       this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
    (data) => {
      if (!(this.commonService.fetchSearchValue(searchKey))) {
        if(this.modelComboPageNumber=== 1){
          this.modelCombo = data.responseData.comboList;
        }else{
          this.modelCombo = this.modelCombo.concat(data.responseData.comboList);
        }
      } else {
        this.modelCombo = data.responseData.comboList;
      }
      data.responseData.comboList.length != 0 ? this.modelComboPageNumber += 1 : this.modelComboPageNumber = 1;     
    });
    this.scrollsyncModel=false;
  }
  
  getModelComboValue(event) {
    if (event != null) {
      this.rfsForm.controls['modelId'].setValue(event.modelId);
      this.rfsForm.controls['manufacturerId'].setValue(event.manufacturerId);
      this.rfsForm.controls['manufacturerName'].setValue(event.manufacturerName);
      this.rfsForm.controls['assetGroupName'].setValue(event.assetGroupTO.assetGroupName);
      this.rfsForm.controls['assetGroupId'].setValue(event.assetGroupTO.assetGroupId);
    }else{  
      this.rfsForm.controls['modelId'].setValue(0);
      this.rfsForm.controls['manufacturerId'].setValue(0);
      this.rfsForm.controls['manufacturerName'].setValue('');
      this.rfsForm.controls['assetGroupName'].setValue("");
      this.rfsForm.controls['assetGroupId'].setValue(0);
      this.rfsForm.controls['assetGroupName'].enable();     
      this.modelCombo=[];
      this.modelComboPageNumber=1;
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
    }
  }

  srType= [
    {id: 'RFS', name: 'REQUEST FOR STOCK'}  
  ];

  itemCatList = [
    { lable: 'SPARE PARTS', value: 'Spare part' },
    { lable: 'ACCESSORIES', value: 'Accessories' },
    { lable: 'CONSUMABLES', value: 'Consumables' },
  ];

  listOfItem(searchValue) {
    this.scrollsyncItemName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllItemCombo.sams', searchValue.term, '', '', 
                     this.recordsPerPageForCombo, this.itemComboPageNumber, this.prCreateForm.controls.itemTypeName.value).subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.itemComboPageNumber === 1) {
            this.itemCombo = data.responseData.comboList;
          } else {
            this.itemCombo = this.itemCombo.concat(data.responseData.comboList);
          }
        } else {
          this.itemCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.itemComboPageNumber += 1 : this.itemComboPageNumber = 1;
      }
    );
    this.scrollsyncItemName = false;
  }

  getAccessoriesComboValue(event) {
    if (event != undefined) {
      this.prCreateForm.controls.uomCode.setValue(event.uomCode);
      this.prCreateForm.controls.itemId.setValue(event.itemId);
      this.prCreateForm.controls.itemName.setValue(event.itemName);
      this.prCreateForm.controls.description.setValue(event.itemDesc);
      this.prCreateForm.controls.makerPartCode.setValue(event.oemCode);
      this.prCreateForm.controls.itemCategoryName.setValue(event.itemCategoryName);
      this.prCreateForm.controls.itemTypeName.setValue(event.itemTypeName);
      this.prCreateForm.controls.itemCategoryId.setValue(event.itemCategoryId);
      this.prCreateForm.controls.itemTypeId.setValue(event.itemTypeId);
    } else {
      this.prCreateForm.controls.uomCode.setValue('');
      this.prCreateForm.controls.itemId.setValue(0);
      this.prCreateForm.controls.itemName.setValue('');
      this.prCreateForm.controls.description.setValue('');
      this.prCreateForm.controls.makerPartCode.setValue('');
      this.prCreateForm.controls.itemCategoryName.setValue('');
      this.prCreateForm.controls.itemTypeName.setValue('');
      this.prCreateForm.controls.itemCategoryId.setValue(0);
      this.prCreateForm.controls.itemTypeId.setValue(0);
    }
  }

  loadOrderReasonComboData(searchValue) {
    this.scrollorderReasonsync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllOrderReasons.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.orderReasonPageNumber).subscribe(
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
      this.prCreateForm.controls['orderReason'].setValue('');
      this.orderReasonPageNumber = 1;
      this.orderReasonList = [];
    } else { 
      this.prCreateForm.controls['orderReason'].setValue(event.orderReasonName);
      if(event.orderReasonName == 'CMC' || event.orderReasonName == 'UNDER WARRANTY'){
        this.prCreateForm.controls['payType'].setValue('NON PAYABLE');
        this.prCreateForm.controls['payType'].disable();
      }else if(event.orderReasonName == 'AMC' || event.orderReasonName == 'CMC PHYSICAL DAMAGE' || event.orderReasonName == 'WARRANTY PHYSICAL DAMAGE'
               || event.orderReasonName == 'OUTRIGHT TYPE' || event.orderReasonName == 'EXCHANGE'){
        this.prCreateForm.controls['payType'].setValue('PAYABLE');
        this.prCreateForm.controls['payType'].enable();    
      }
    }
  }

  payTypeList = [
    { id: 1, name: 'PAYABLE' },
    { id: 2, name: 'NON PAYABLE' },
  ];

  prTypeList = [
    { id: 1, name: 'BUDGETED' },
    { id: 2, name: 'NON BUDGETED' },
    { id: 3, name: 'RENTAL' },
    { id: 4, name: 'PHYSICAL DAMAGE' },
    { id: 5, name: 'WARRANTY' },
  ];

  loadSupplierComboData(searchValue) {
    this.scrollsyncSupplier=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSupplierNameCombo.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.supplierPageNumber,'','supplier').subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.supplierPageNumber=== 1){
            this.supplierCombo = data.responseData.comboList;
          }else{
            this.supplierCombo = this.supplierCombo.concat(data.responseData.comboList);
          }
        } else {
          this.supplierCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.supplierPageNumber += 1 : this.supplierPageNumber = 1;  
     }
    );
    this.scrollsyncSupplier=false;
  }
  
  selectedSupplierList(event) {
    if(event===undefined){
      this.prCreateForm.controls['supplierId'].setValue(0);
      this.prCreateForm.controls['supplierName'].setValue('');  
      this.supplierPageNumber=1;
      this.supplierCombo=[];
    }else{
      this.prCreateForm.controls['supplierId'].setValue(event.supplierId);   
      this.prCreateForm.controls['supplierName'].setValue(event.supplierName);
    }
  }

  raisePurchaseRequest() {
    this.prReqHdr.poReqNo = this.prCreateForm.controls.poReqNo.value;
    this.prReqHdr.poReqDt = this.prCreateForm.controls.poReqDt.value;
    this.prReqHdr.requestedBy = this.prCreateForm.controls.requestedBy.value;
    this.prReqHdr.prType = this.prCreateForm.controls.prType.value;
    this.prReqHdr.locationId = this.rfsForm.controls.locationId.value;
    this.prReqHdr.locationName = this.rfsForm.controls.locationName.value;
    this.prReqHdr.poReqStatus = 'REQUESTED BY CE';
    //this.prReqHdr.prReason = this.prCreateForm.controls.prGroupType.value;
    this.prReqHdr.orderReason = this.prCreateForm.controls.orderReason.value;
    
    this.prReqDtl.itemId = this.prCreateForm.controls.itemId.value;
    this.prReqDtl.itemName = this.prCreateForm.controls.itemName.value;
    this.prReqDtl.poReqQty = this.prCreateForm.controls.poReqQty.value;
    this.prReqDtl.requiredDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.prCreateForm.controls.requiredDt.value);
    this.prReqDtl.itemCategoryId = this.prCreateForm.controls.itemCategoryId.value;
    this.prReqDtl.itemCategoryName = this.prCreateForm.controls.itemCategoryName.value;
    this.prReqDtl.itemTypeId = this.prCreateForm.controls.itemTypeId.value;
    this.prReqDtl.itemTypeName = this.prCreateForm.controls.itemTypeName.value;
    this.prReqDtl.description = this.prCreateForm.controls.description.value;
    this.prReqDtl.makerPartCode = this.prCreateForm.controls.makerPartCode.value;
    this.prReqDtl.supplierName = this.prCreateForm.controls.supplierName.value;
    this.prReqDtl.supplierId = this.prCreateForm.controls.supplierId.value;
    this.prReqHdr.poReqDtl = this.prReqDtl;

    this.prReqHdrList.push(JSON.parse(JSON.stringify(this.prReqHdr)));
    this.clearPrList();
  }

  delete(index) {
    this.prReqHdrList.splice(index, 1);
  }

  clearPrList() {
    this.prCreateForm.reset();
    this.prCreateForm.updateValueAndValidity();
    this.prCreateForm.controls.requestedBy.setValue(this.userSessionService.getUserName());
  }

  clear(){
    this.rfsForm.reset();
    this.prCreateForm.reset();
    this.prReqHdrList=[];  
    this.ngOnInit();
  }

  exit(){
    this.location.back();
  }

  saveSrAndPurchase() {
    if(this.prReqHdrList.length>0){
      let obj={ 'prServiceRequestList'  : this.prReqHdrList ,
                'srDetails'  : this.rfsForm.getRawValue()}
      this.commonService.commonInsertService('saveUpdateRFSServiceRequest.sams', obj).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.router.navigate(['home/serviceRequest']);
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
          this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
        }
      );
    } else{
        this.commonService.openToastWarningMessage("Kindly Add Atleast One Item");
    }
  }
  

}
