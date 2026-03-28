import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { SupplierSiteCreateComponent } from '../supplier-site-create/supplier-site-create.component';
import { MatDialog } from '@angular/material/dialog';
import { SupplierModel } from 'src/app/Model/master/supplier';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupplierLocationModel } from 'src/app/Model/master/supplier-location';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { Title } from '@angular/platform-browser';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { Model } from 'src/app/Model/master/model';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  // Set Page Title
  title = 'Asset Optima - Supplier';
  step = 0;
  accessoriesDispCol = ['sno','supplierSiteName','suppLocArea','suppLocCity','suppLocState','suppLocCurCd','contactPerson',
                        'supplierSiteContactEmailId','supplierSitePersonPhoneNo','isServiceCenter','action'];
  assetsSuppliedDispCol = ['sno','modelName','assetGroupName','manufacturerName','action'];
  supplierForm: FormGroup;

  assetSupplierFormGroup: FormGroup;

  supplier : SupplierModel;

  supplierLocList: any[]=[];

  selectedIndex:number;

  supplierLocationList:SupplierLocationModel[];
  modelMainTempPush: any = [];

  //BUTTON
  buttonSubmit: string;
  headingDisplay: string;
  buttonDisableInEdit: boolean;
  ErrorMsg: String = '';
  tempValue: String = '';
  uploadFlagSupplier: boolean = false;

  table: boolean = true;
  modeDisplay: boolean = false;

  //ENABLE CHECKBOX ONLY IN EDIT MODE
  isCheckBoxVisible:boolean=false;

  inactiveDtDisplay: boolean = false;

  modelMainDataSource: any =[];
   //LOADER
   subloaderModel: boolean =false;
   length: String = '0';
  // public supplierTypeList : any = [{supplierType:'Supplier'},{supplierType:'OEM'},{supplierType:'Service Provider'},{supplierType:'Supplier and Service Provider'}];

  @ViewChild('supplierfocus') supplierfocusSet: ElementRef;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  limitCount : any;
  recordsPerPageForCombo: string;

  supplierTypecombo: any=[];
  serviceTypecombo: any=[];

  supplierTypePageNumber: number;
  serviceTypePageNumber: number;

  manufacturerListPageNumber: number = 0;
  manufacturerList: any = [];

  scrollsyncModel: boolean = false;
  modelComboPageNumber: number;
  modelCombo: any = [];

  scrollsyncAssetGroup: boolean = false;
  assetGroupPageNumber: number;
  assetGroup: any = [];
  supplierTypeScrollSync: boolean = false;
  ManufacturerScrollSync: boolean = false;
  serviceTypeTypeScrollSync: boolean = false;

  public model: Model;
  getData: getData;

  constructor(private dialog: MatDialog,
              private commonService: CommonService,
              private service: AssetOptimaServices,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private detectorRefs: ChangeDetectorRef,
              private titleService: Title,
              private userSession: UserSessionService,
              private readonly router: Router) {
        this.supplierTypePageNumber=1;
        this.serviceTypePageNumber=1;
        this.manufacturerListPageNumber=1;
        this.modelComboPageNumber = 1;
        this.assetGroupPageNumber=1;
        this.model = new Model();
        this.getData = new getData();
               }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    //document.getElementById('commonFooter').style.display='none';
    this.supplierForm = new FormGroup({
      supplierId : new FormControl(''),
      orgId : new FormControl(''),
      orgName : new FormControl(''),
      supplierName : new FormControl('',[Validators.required,Validators.maxLength(150)]),
      supplierType : new FormControl(''),
      serviceType : new FormControl(''),
      active : new FormControl(),
      inactiveFromDt : new FormControl(''),
      inactiveFromDtDisp: new FormControl(''),
      createdBy : new FormControl(''),
      createdDt : new FormControl(''),
      updatedBy : new FormControl(''),
      updatedDtDt : new FormControl(''),
      pageNumber : new FormControl(''),
      recordsPerPage : new FormControl(''),
      supplierCode : new FormControl('',[Validators.maxLength(50)]),
      supplierLocList: new FormControl('',[]),
      modelsSuppliedList: new FormControl('',[]),
      sourceScreen : new FormControl('SUPPLIER')
    });

    this.assetSupplierFormGroup = new FormGroup({
      assetSuppliedId : new FormControl(0),
      supplierId: new FormControl(''),
      orgId: new FormControl(''),
      manufacturerId: new FormControl(''),
      manufacturerName: new FormControl(''),
      assetGroupId: new FormControl(''),
      assetGroupName: new FormControl(''),
      modelId: new FormControl(''),
      modelName: new FormControl(''),
      createdBy : new FormControl(''),
      createdDt : new FormControl(''),
      updatedBy : new FormControl(''),
      updatedDtDt : new FormControl('')
    });
    this.validateEditMode();
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.supplierfocusSet);
  }

  addSupplierSite(supplierSite,index,mode,sourceScreen){

    let dialogRef = this.dialog.open(SupplierSiteCreateComponent, {
      width: '90%',
      data: {
        'supplierSite' : supplierSite,
        'sourceScreen' : sourceScreen,
        'supplierName': this.supplierForm.controls.supplierName.value,
        'mode':mode
      }
    });
     dialogRef.disableClose = true;
     dialogRef.afterClosed().subscribe(
      data => {
          if(data){
            if(index===null){
              this.supplierLocList = this.supplierLocList.concat([data]);
            }else if (index !== null && index !== undefined && index !== ''){
              this.supplierLocList.splice(index, 1);
              this.supplierLocList = this.supplierLocList.concat([data]);
            }
          }
          this.tabelValidation();

      });
  }

  setStep(index: number) {
    this.step = index;
  }

  backTOItemScreen(){
    localStorage.setItem('presentRoute', this.router.url);
    this.location.back();
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  save(){
    this.uploadFlagSupplier = true;
    this.supplierForm.controls.supplierLocList.setValue(this.supplierLocList);
    this.supplierForm.controls.modelsSuppliedList.setValue(this.modelMainDataSource);
    this.commonService.commonInsertService(this.service.saveUpdateSupplier,this.supplierForm.getRawValue()).subscribe(
      data => {
        if(data.success){
          this.commonService.openToastSuccessMessage(data.message);
          this.exit();
          this.uploadFlagSupplier = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlagSupplier = false;
        }
      }
    );
  }

  exit(){
    localStorage.setItem('presentRoute', this.router.url);
    this.location.back();
  }

  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId =Number(primaryId);
        if(primaryId <= 0){
          this.buttonSubmit='Submit';
          this.headingDisplay = 'Create';
          this.buttonDisableInEdit=false;
          this.supplierForm.get('active').setValue(true);
        }else{
        if(mode=='view'){
          this.headingDisplay = "View";
          this.modeDisplay=true;
          this.supplierForm.disable();
        }else{
        //button and heading names for edit
        this.buttonSubmit='Update';
        this.headingDisplay = 'Edit';
        this.buttonDisableInEdit=true;
        }
          this.commonService.commonGetService(this.service.fetchSupplierInfo,primaryId).subscribe(
            data => {
              this.supplierForm.patchValue(data.responseData);
              this.supplierLocList = data.responseData.supplierLocList;
              this.modelMainDataSource = data.responseData.modelsSuppliedList;
              this.length = data.responseData.modelsSuppliedList.length;
              this.tempValue = data.responseData.supplierCode!= null ? data.responseData.supplierCode : '';
              this.tabelValidation();
              if(!this.supplierForm.controls.active.value){
                this.inactiveDtDisplay = true;
              }

            }
          )
        }
      }
  );
  this.supplierForm.get('supplierCode').disable();

  }

  clear(){
      this.supplierLocList = [];
      this.modelMainDataSource = [];
      this.supplierForm.reset();
      this.supplierForm.updateValueAndValidity();
  }

  tabelValidation() {
    this.table = (this.supplierLocList.length > 0) ? false : true;
  }


 // Delete Supplier Site
  DeleteSupplierSite(deleteid,index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Supplier Site'
      }
    });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
      data => {
          if(data.status){
            if(deleteid <= 0){
              this.supplierLocList.splice(index, 1);
              this.refreshSupplierSiteList();
            } else {
              this.commonService.commonGetService('deleteModelItemInfo.sams',deleteid).subscribe(
                data=>{
                  if(data.success){
                    this.commonService.openToastSuccessMessage(data.message);
                    this.supplierLocList.splice(index, 1);
                    this.refreshSupplierSiteList();
                  }else{
                    this.commonService.openToastErrorMessage(data.message);
                  }
                }
              );
            }
          }
      });
    }

    refreshSupplierSiteList() {
      let tempArray = this.supplierLocList;
      this.supplierLocList = [];
      for (var i = 0; i < tempArray.length; i++) {
        this.supplierLocList.push(tempArray[i]);
        this.detectorRefs.detach();
      }
      this.detectorRefs.detectChanges();
    }

    //Check Supplier Code existence
  checkForSupplierCodeExistence() {
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.supplierForm.controls.supplierCode.value!= null) ? this.supplierForm.controls.supplierCode.value.toLowerCase():'')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.SupplierTO";
      constraintData.constraints = {
      'supplierCode': this.supplierForm.controls.supplierCode.value.toLowerCase(),
      'orgId':this.userSession.getUserOrgId()

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          //show the warning invalidate the form group
          this.ErrorMsg = data.message;
          this.supplierForm.controls.supplierCode.setErrors(Validators.minLength);
          this.supplierForm.controls.supplierCode.setErrors({"notUnique": true});
        } else {
          this.ErrorMsg = '';
          this.supplierForm.controls.supplierCode.setErrors(null);
        }

      });
    }

  }

setInactiveDt(event){
    if(event.checked === true){

    }else if(event.checked === false){
      this.supplierForm.controls.inactiveFromDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
      this.supplierForm.controls.inactiveFromDtDisp.setValue(
        this.commonService.convertToDateStringyyyy_mm_dd(this.supplierForm.controls.inactiveFromDtDisp.value))
    }
  }

  getsupplierType(searchValue){
  this.supplierTypeScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllSupplierType.sams', searchValue.term,'', '', this.limitCount, this.supplierTypePageNumber).subscribe(
      (data) => {
        if (data.success) {
          this.supplierTypecombo = data.responseData.comboList;
          // this.getData = new getData();
          // this.getData = this.commonService.fetchDataList(searchValue, this.supplierTypePageNumber , this.supplierTypecombo , data.responseData.comboList)
          // this.supplierTypePageNumber = this.getData.pageNumber;
          // this.supplierTypecombo = this.getData.dataList;
          // this.supplierTypeScrollSync = false;
        }
        this.supplierTypeScrollSync = false;
    });
  }
  selectSupplierType(event){
    if(event===undefined){
      this.supplierTypecombo = [];
      this.supplierTypePageNumber = 1;
    }
  }

  getserviceType(searchValue){
    this.serviceTypeTypeScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllServiceType.sams', searchValue.term,'', '', this.limitCount, this.serviceTypePageNumber).subscribe(
      (data) => {
        if (data.success) {
          this.serviceTypecombo = data.responseData.comboList;
        }
        this.serviceTypeTypeScrollSync = false;
    });
  }

  listOfManufacturer(searchValue) {
    this.ManufacturerScrollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.service.listOfManufacturerCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.manufacturerListPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerListPageNumber , this.manufacturerList , data.responseData.comboList)
          this.manufacturerListPageNumber = this.getData.pageNumber;
          this.manufacturerList = this.getData.dataList;
          this.ManufacturerScrollSync = false;
        }
      );
  }

  getManfacturerComboValue(event) {
    if (event === undefined) {
      this.assetSupplierFormGroup.controls.manufacturerId.setValue(0);
      this.model.businessPartnerId=0;
      this.manufacturerListPageNumber = 1;
    } else {
      this.assetSupplierFormGroup.controls.manufacturerId.setValue(event.manufacturerId);
      this.assetSupplierFormGroup.controls.manufacturerName.setValue(event.manufacturerName);
      this.model.businessPartnerId=event.manufacturerId;
    }
  }

  listOfAllModel(searchValue) {
    this.scrollsyncModel = true;
    const manufId = this.assetSupplierFormGroup.controls.manufacturerId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchValue.term, manufId > 0 ? manufId : 0,
      this.assetSupplierFormGroup.controls.assetGroupId.value > 0 ? this.assetSupplierFormGroup.controls.assetGroupId.value : '',
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        });
  }

  getModelComboValue(event) {
    if (event != null) {
      this.assetSupplierFormGroup.controls.manufacturerId.setValue(event.manufacturerId);
      this.assetSupplierFormGroup.controls.manufacturerName.setValue(event.manufacturerName);
      this.assetSupplierFormGroup.controls.modelId.setValue(event.modelId);
      this.assetSupplierFormGroup.controls.modelName.setValue(event.modelName);
      this.model.modelId=event.modelId;
      this.model.businessPartnerId=event.manufacturerId;
    } else {
      this.assetSupplierFormGroup.controls.modelId.setValue(0);
      this.assetSupplierFormGroup.controls.modelName.setValue('');
      this.modelComboPageNumber = 1;
      this.model.modelId=0;
      this.model.businessPartnerId=0;
    }
  }

  listOfAllAssetGroup(searchValue) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.service.listAllAssetGroupCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroup = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.assetSupplierFormGroup.controls.assetGroupName.setValue(event.assetGroupName);
      this.assetSupplierFormGroup.controls.assetGroupId.setValue(event.assetGroupId);
      this.model.assetGroupId=event.assetGroupId;
    } else {
      this.assetSupplierFormGroup.controls.assetGroupName.setValue('');
      this.assetSupplierFormGroup.controls.assetGroupId.setValue(0);
      this.model.assetGroupId=0;
      this.assetGroupPageNumber = 1;
    }
  }

  loadModelItems(){

    let index = this.commonService.getIndexOfTheItem(this.modelMainDataSource, true, 'modelId',  this.model.modelId);
    if(index == -1){
      this.model.direction = 'desc';
      this.model.columnName = 'updatedDt';
      this.subloaderModel = true;
      this.commonService.commonListService('fetchListOfAllModelForSupplier.sams',this.model).subscribe(
        data => {
          if(data.success){
             this.subloaderModel=false;
             this.length = data.responseData.dataTotalRecCount;
             this.modelMainDataSource = this.modelMainDataSource.concat(data.responseData.dataList);
             this.clearModelsSuppliedFields();
          }else{
            this.subloaderModel=false;
          }
        }, error =>{
          this.subloaderModel=false;
        }
      );
    }else{
      this.commonService.openToastWarningMessage('Selected Model is Already Added');
    }

  }

  clearModelsSuppliedFields(){
    this.assetSupplierFormGroup.controls.modelId.setValue(0);
    this.assetSupplierFormGroup.controls.manufacturerId.setValue(0);
    this.assetSupplierFormGroup.controls.assetGroupId.setValue(0);
    this.assetSupplierFormGroup.controls.modelName.setValue('');
    this.assetSupplierFormGroup.controls.manufacturerName.setValue('');
    this.assetSupplierFormGroup.controls.assetGroupName.setValue('');
  }

  deleteSuppliedModels(deleteid,index){
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'the selected Model?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0 || deleteid == undefined) {
            this.modelMainDataSource.splice(index, 1);
            this.refreshModelsSuppliedList();
          } else {
            this.commonService.commonGetService('deleteModelsSuppliedInfo.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.modelMainDataSource.splice(index, 1);
                  this.refreshModelsSuppliedList();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

  refreshModelsSuppliedList(){
    let tempArray = this.modelMainDataSource;
    this.modelMainDataSource = [];
    for (var i = 0; i < tempArray.length; i++) {
      this.modelMainDataSource.push(tempArray[i]);
      this.detectorRefs.detach();
    }
    this.detectorRefs.detectChanges();
  }
}
