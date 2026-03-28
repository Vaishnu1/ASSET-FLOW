import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {  MatTableDataSource, MatTable } from '@angular/material/table';
import { CommonService } from '../../../../Services/common-service/common.service';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../../../../Components/Common-components/delete-confirmation/delete-confirmation.component';
import { PreInwWarrantyContractComponent } from '../pre-inw-warranty-contract/pre-inw-warranty-contract.component';
import { PreinwDocumentComponent } from '../preinw-document/preinw-document.component';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { ModuleAccessModel } from '../../../../Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';

@Component({
  selector: 'app-pre-inward-inventory-add-model-dialog',
  templateUrl: './pre-inward-inventory-add-model-dialog.component.html',
  styleUrls: ['./pre-inward-inventory-add-model-dialog.component.css']
})
export class PreInwardInventoryAddModelDialogComponent implements OnInit {

  childAssetDisCol = ['sno', 'modelName', 'businessPartnerName','action'];

  warrantyContractDisCol = ['seqNo', 'coverageType', 'contractType', 'coverageStartingFrom','periodInYears','periodInMonths','amc','action'];
  assetDocumentDisCol = ['sno', 'docName', 'docType', 'createdBy', 'createdDt', 'action'];

  scrollsync:boolean=false;
  recordsPerPageForCombo:string;

  scrollsyncCertificateCombo: boolean = false;
  certificatePageNumber: number;
  certificateNameList: any = [];

  assetGroup : any = [];
  locationCombo: any = [];
  modelCombo : any[] =[];
  limitCount:any;
  partValue: any;

  assetGroupPageNumber : number;
  locationPageNumber:number;
  modelComboPageNumber : number;
  assetCategoryIdForAssetGroup: number = 0;

  assetGroupScrollsync : boolean = false;
  scrollsyncModel :boolean = false;
  scrollsyncManufacturer:boolean = false;
  currencyScrollsync: boolean = false;
  scrollsyncModelChild: boolean = false;
  isViewMode: boolean = false;
  currencyCdList: any = [];

  modelFormToBeAdded: FormGroup;
  childAssetPreInwardAsset: FormGroup;
  contractWarrantyPreInwardAsset: FormGroup;
  assetCertificateFormGroup: FormGroup;

  manufacturerPageNumber: number;
  manufactuer: any[] = [];

  addChildAssetDataSource = new MatTableDataSource<any>();
  @ViewChild('matChildAsset') tableChildAsset: MatTable<any>;

  addWarrantyContractDataSource = new MatTableDataSource<any>();
  @ViewChild('matWarrantyContractAsset') tableWarrantyContract: MatTable<any>;

  @ViewChild('assetCertificate') table1: MatTable<any>;

  modelAccessModule: ModuleAccessModel;
  modelAccessModuleForAssetMaster: ModuleAccessModel;
    statutoryRequirementCol = ['sno', 'certificateName', 'issueDt', 'startDt', 'expiryDt', 'fileCertificateNo', 'documentNo', 'action']

  listOfCertificates: any = [];
  childAssetTempPush: any = [];
  warrantyContractTempPush: any = [];

  ownership = [
    { id: 1, name: 'OWN' },
    { id: 2, name: 'OWNED BY CUSTOMER' },
    { id: 3, name: 'RENTAL' },
    { id: 4, name: 'LEASE' },
    { id: 5, name: 'LOAN' }
  ];

  statutoryRequirementList = new MatTableDataSource<any>();

  currencyCdPageNumber: number;
  getData: getData;
  formOneValid: boolean = false;
  formTwoValid: boolean = false;

  subloaderChildAsset: boolean = false;
  subloaderWarrantyContract: boolean = false;
  subloaderCertificates: boolean = false;
  certificateslength: Number = 0;
  warrantyContractlength: number = 0;
  childAssetlength: number = 0;

  purchaseStatusList = [
    { purchaseStatus: 'Actual' },
    { purchaseStatus: 'Estimated' }
  ];

  constructor(private readonly router: Router,
    private matDialogRef: MatDialogRef<PreInwardInventoryAddModelDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private readonly data,
              private readonly assetOptimaConstants: AssetOptimaConstants,
              private readonly samsServices: AssetOptimaServices,
              private readonly commonService: CommonService,
              private readonly changeDetectorRefs: ChangeDetectorRef,
              private readonly dialog: MatDialog,
              private readonly userSession: UserSessionService) {
                this.locationPageNumber=1;
                this.assetGroupPageNumber = 1;
                this.modelComboPageNumber = 1;
                this.certificatePageNumber = 1;
                this.manufacturerPageNumber = 1;
                this.currencyCdPageNumber = 1;
              }

  ngOnInit() {

    this.addChildAssetDataSource.data=[];
    this.statutoryRequirementList.data=[];
    this.modelFormToBeAdded = new FormGroup({
      inwardInventoryDtlId: new FormControl(0),
      assetGroupId: new FormControl(0),
      assetGroupName: new FormControl(''),
      assetSubCategoryId: new FormControl(0),
      assetCategoryId: new FormControl(0),
      assetSubCategoryName: new FormControl(''),
      assetCategoryName: new FormControl(''),
      assetTypeId: new FormControl(0),
      assetTypeName: new FormControl(''),
      orgId:  new FormControl(0),
      ownershipType: new FormControl('', [Validators.required]),
      modelName: new FormControl(null,[Validators.required]),
      modelId: new FormControl(0),
      businessPartnerName: new FormControl(null,[Validators.required]),
      prQuantity: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(this.assetOptimaConstants.decimalValidation)]),
      prTaxAmount: new FormControl('', [Validators.required]),
      prTotalAmount: new FormControl('', [Validators.required]),
      previousPrQuantity: new FormControl(0),
      purchaseCurrencyCode: new FormControl(null,[Validators.required]),
      locationCurrencyCode: new FormControl(this.userSession.getlocCurrCd()),
      exchangeRate: new FormControl(0, [Validators.required, Validators.pattern(this.assetOptimaConstants.decimalValidation)]),
      originalPurchaseAmount: new FormControl('', [Validators.required, this.assetOptimaConstants.customDecimalValidator(10,5),Validators.min(0),
      this.assetOptimaConstants.multpliePatternsValidator(this.assetOptimaConstants.decimalValidation1,{'numbersOnly':true})]),
      totalPurchaseAmt: new FormControl(0),
      localPurchaseAmount: new FormControl(),
      localTaxRate: new FormControl(0,[Validators.required, Validators.pattern(this.assetOptimaConstants.decimalValidation)]),
      businessPartnerId: new FormControl(0),
      childAssetPreInwAsset: new FormControl([]),
      contractWarrantyPreInwAsset: new FormControl([]),
      createdBy: new FormControl(''),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(Date),
      updatedDt: new FormControl(Date),
      createdDtDisp: new FormControl(''),
      UpdatedDtDisp: new FormControl(''),
      preInwStatusId: new FormControl(''),
      installationType: new FormControl(''),
      inwardInventoryHdrId: new FormControl(0),
      purchaseStatus: new FormControl(''),
      statutoryRequirementList: new FormControl([]),
      createContractAMCCMC : new FormControl(false),
      deviceCode: new FormControl(''),
      deviceConcept: new FormControl('')
    });


    this.childAssetPreInwardAsset = new FormGroup({
      preInwChildAssetId: new FormControl(0),
      orgId: new FormControl(0),
      inwardInventoryDtlId: new FormControl(0),
      modelId: new FormControl(0),
      modelName: new FormControl(null,[Validators.required]),
      businessPartnerId: new FormControl(0),
      businessPartnerName: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(''),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(new Date()),
      updatedDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      UpdatedDtDisp: new FormControl('')
    });

    this.assetCertificateFormGroup = new FormGroup({
      assetCertificateId: new FormControl(0),
      orgId: new FormControl(0),
      preInwHdrId: new FormControl(this.data.hdrId),
      preInwDtlId: new FormControl(this.modelFormToBeAdded.controls.inwardInventoryDtlId.value),
      certificateId: new FormControl(0),
      startDt: new FormControl(''),
      startDtDisp: new FormControl(''),
      issueDt: new FormControl(''),
      issueDtDisp: new FormControl(''),
      expiryDt: new FormControl(''),
      expiryDtDisp: new FormControl(''),
      fileCertificateNo: new FormControl(''),
      documentNo: new FormControl(''),
      fileDocumentPath: new FormControl(''),
      certificateName: new FormControl('', [Validators.required]),
      certificationAuthorityName: new FormControl(''),
      issuingAuthority: new FormControl(''),
      inwardInventoryDtlId: new FormControl(0),
      inwardInventoryHdrId: new FormControl(0)
   });

   
   this.modelFormToBeAdded.controls.localPurchaseAmount.disable();
   this.modelFormToBeAdded.controls.totalPurchaseAmt.disable();

    this.modelFormToBeAdded.controls.ownershipType.setValue('OWN');
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_MANUFACTURER'];
    this.modelAccessModuleForAssetMaster = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_MASTER'];

  }

  exit() {
    this.matDialogRef.close();
  }

  ngAfterViewInit() {
    if(this.data.modelInfo !== 0){
      if(this.data.mode === 'view'){
        this.isViewMode = true;
        this.modelFormToBeAdded.disable();
      }
      this.modelFormToBeAdded.patchValue(this.data.modelInfo);

      let taxRt = this.modelFormToBeAdded.controls.localTaxRate.value;
      let prAmt = Number(this.modelFormToBeAdded.controls.localPurchaseAmount.value);
      let taxAmt = Number(prAmt) * Number(taxRt) / Number(100);

      this.modelFormToBeAdded.controls.prTaxAmount.setValue(Number(taxAmt));
      if(this.data.modelInfo.businessPartnerId > 0){
        if(this.data.mode === 'view'){
          this.modelFormToBeAdded.controls.modelName.disable();
        }
        else{
          this.modelFormToBeAdded.controls.modelName.enable();
        }
      }

      if(this.modelFormToBeAdded.controls['locationCurrencyCode'].value == this.modelFormToBeAdded.controls['purchaseCurrencyCode'].value){
        this.modelFormToBeAdded.controls['exchangeRate'].disable();
      }
      else{
        this.modelFormToBeAdded.controls['exchangeRate'].enable();
      }

      this.formValidation();
      this.totCallAmnt();
      this.subloaderWarrantyContract = true;
      this.subloaderChildAsset = true;
      this.addChildAssetDataSource.data = this.data.modelInfo.childAssetPreInwAsset;
      this.childAssetlength = this.addChildAssetDataSource.data.length;
      this.addWarrantyContractDataSource.data = this.data.modelInfo.contractWarrantyPreInwAsset;
      this.warrantyContractlength = this.addWarrantyContractDataSource.data.length;
      this.statutoryRequirementList.data = this.data.modelInfo.statutoryRequirementList;
      this.subloaderWarrantyContract = false;
      this.subloaderChildAsset = false;
      if(localStorage.getItem('navigateToOtherScreenFromPreInwardAdd') === 'true'){

        if(localStorage.getItem('businessPartnerName') !== null && localStorage.getItem('businessPartnerName')) {
          // set recently created Manufacturer
          const businessPartnerName = localStorage.getItem('businessPartnerName');
          this.modelFormToBeAdded.controls.businessPartnerName.setValue(businessPartnerName);
          setTimeout(() => {
          this.listOfManufacturer({term: businessPartnerName, items: []});
          setTimeout(() => {
            if(this.manufactuer.length > 0) {
              this.getManfacturerComboValue(this.manufactuer[0]);
            }
          localStorage.setItem('businessPartnerName', '');
          },500);
        }, 500);
        }


      if(localStorage.getItem('modelName') !== null && localStorage.getItem('modelName') !== '') {
        this.listOfAllModel(localStorage.getItem('modelName'));
        this.modelFormToBeAdded.controls.modelName.setValue(localStorage.getItem('modelName'));
        setTimeout(() => {
          this.listOfAllModel({term: localStorage.getItem('modelName'), items: []});
          setTimeout(() => {
            this.getModelComboValue(this.modelCombo[0]);
          });
        }, 500);
        localStorage.setItem('modelName', '');
    }
      localStorage.setItem('navigateToOtherScreenFromPreInwardAdd', 'false');
    }
      if(this.modelFormToBeAdded.controls.inwardInventoryHdrId.value >0 && this.modelFormToBeAdded.controls.inwardInventoryDtlId.value ){
      this.fetchListOfPreInwCertificates();
      }
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.assetGroupScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listAllAssetGroupCombo, searchKey.term,'', '',this.limitCount, this.assetGroupPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
      this.assetGroupPageNumber = this.getData.pageNumber;
      this.assetGroup = this.getData.dataList;
      this.assetGroupScrollsync = false;
    });
   }

  getAssetGroupComboValue(event) {
    if (event === undefined) {
      this.assetGroupPageNumber = 1;
      this.assetGroup = [];
    } else {
      this.modelFormToBeAdded.controls.assetGroupId.setValue(event.assetGroupId);
      this.modelFormToBeAdded.controls.assetGroupName.setValue(event.assetGroupName);
      this.modelFormToBeAdded.controls.deviceCode.setValue(event.deviceCode);
      this.modelFormToBeAdded.controls.deviceConcept.setValue(event.deviceConcept);
      //THE FOLLOWING COLUMNS ARE NOT AVAILABLE IN THE ASSET.M_ASSET_GROUP TABLE
      // this.modelFormToBeAdded.controls.maintenanceType.setValue(event.maintenanceStrategy);
      // this.modelFormToBeAdded.controls.qaFrequency.setValue(event.frequency3);
      // this.modelFormToBeAdded.controls.pmFrequency.setValue(event.frequency1);
      // this.modelFormToBeAdded.controls.paFrequency.setValue(event.frequency2);
      this.modelFormToBeAdded.controls.assetCategoryId.setValue(event.assetCategoryId);
      this.modelFormToBeAdded.controls.assetCategoryName.setValue(event.assetCategoryName);
      this.modelFormToBeAdded.controls.assetSubCategoryId.setValue(event.assetSubCategoryId);
      this.modelFormToBeAdded.controls.assetSubCategoryName.setValue(event.assetSubCategoryName);
      this.modelFormToBeAdded.controls.assetTypeId.setValue(event.assetTypeId);
      this.modelFormToBeAdded.controls.assetTypeName.setValue(event.assetTypeName);
    }
    this.modelComboPageNumber=1;
    this.modelCombo = [];
  }

  listOfAllModel(searchKey) {
    this.assetCategoryIdForAssetGroup = this.modelFormToBeAdded.controls.assetCategoryId.value;
    this.scrollsyncModel=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    const businessPartnerId = this.modelFormToBeAdded.controls.businessPartnerId.value
    const assetGrpId = this.modelFormToBeAdded.controls.assetGroupId.value;
    this.commonService.getComboResults(this.samsServices.listOfAllModelCombo, searchKey.term, businessPartnerId, assetGrpId, this.limitCount, this.modelComboPageNumber,'','Y').subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelCombo = this.getData.dataList
      this.scrollsyncModel=false;
    });
  }

  getModelComboValue(event) {
    if (event != null) {
      this.modelFormToBeAdded.controls.assetGroupName.enable();
      this.modelFormToBeAdded.controls.businessPartnerName.setValue(event.businessPartnerName);
      this.modelFormToBeAdded.controls.assetGroupName.setValue(event.assetGroupName);
      this.modelFormToBeAdded.controls.assetCategoryName.setValue(event.assetCategoryName);
      this.modelFormToBeAdded.controls.assetSubCategoryName.setValue(event.subCategoryName);
      this.modelFormToBeAdded.controls.assetTypeName.setValue(event.assetTypeName);
      this.modelFormToBeAdded.controls.modelId.setValue(event.modelId);
      this.modelFormToBeAdded.controls.installationType.setValue(event.installationType);
      this.modelFormToBeAdded.controls.assetGroupId.setValue(event.assetGroupId);
      this.modelFormToBeAdded.controls.assetCategoryId.setValue(event.assetCategoryId);
      this.modelFormToBeAdded.controls.assetSubCategoryId.setValue(event.assetSubCategoryId);
      this.modelFormToBeAdded.controls.assetTypeId.setValue(event.assetTypeId);
    }else{
      this.modelComboPageNumber=1;
      this.modelCombo=[];
      this.modelFormToBeAdded.controls.assetGroupName.setValue('');
      this.modelFormToBeAdded.controls.assetCategoryName.setValue('');
      this.modelFormToBeAdded.controls.assetSubCategoryName.setValue('');
      this.modelFormToBeAdded.controls.assetTypeName.setValue('');
      this.modelFormToBeAdded.controls.modelId.setValue(0);
      this.modelFormToBeAdded.controls.installationType.setValue('');
      this.modelFormToBeAdded.controls.assetGroupId.setValue(0);
    }
    this.formValidation();
  }

  getAssetGroupComboValueForAuxiliary(event) {
    if (event === undefined) {
      this.assetGroupPageNumber = 1;
      this.assetGroup = [];
    } else {
      this.modelFormToBeAdded.controls.assetGroupIdForAuxiliaryAsset.setValue(event.assetGroupId);
      this.modelFormToBeAdded.controls.assetGroupNameForAssetAuxiliary.setValue(event.assetGroupName);
      this.modelFormToBeAdded.controls.deviceCodeForAssetAuxiliary.setValue(event.deviceCode);
      this.modelFormToBeAdded.controls.deviceConceptForAssetAuxiliary.setValue(event.deviceConcept);
    }
  }

  getAssetGroupComboValueForChildAsset(event) {
    if (event === undefined) {
      this.assetGroupPageNumber = 1;
      this.assetGroup = [];
    } else {
      this.modelFormToBeAdded.controls.assetGroupIdForChildAsset.setValue(event.assetGroupId);
      this.modelFormToBeAdded.controls.assetGroupNameForChildAsset.setValue(event.assetGroupName);
      this.modelFormToBeAdded.controls.deviceCodeForChildAsset.setValue(event.deviceCode);
      this.modelFormToBeAdded.controls.deviceConceptForChildAsset.setValue(event.deviceConcept);
    }
  }

  totCallAmnt() {

    this.modelFormToBeAdded.controls.localPurchaseAmount.setValue((Number(this.modelFormToBeAdded.controls.originalPurchaseAmount.value)*
    Number(this.modelFormToBeAdded.controls.exchangeRate.value)));

    let taxRt = this.modelFormToBeAdded.controls.localTaxRate.value;
    let prAmt = (Number(this.modelFormToBeAdded.controls.localPurchaseAmount.value));
    
    let taxAmt = Number(prAmt) * Number(taxRt) / Number(100);
    this.modelFormToBeAdded.controls.prTaxAmount.setValue(Number(taxAmt).toFixed(2));

    this.modelFormToBeAdded.controls.prTotalAmount.setValue((Number(this.modelFormToBeAdded.controls.originalPurchaseAmount.value) *
    Number(this.modelFormToBeAdded.controls.prQuantity.value)*Number(this.modelFormToBeAdded.controls.exchangeRate.value))+(Number(this.modelFormToBeAdded.controls.prTaxAmount.value)*
     Number(this.modelFormToBeAdded.controls.prQuantity.value)));
     this.modelFormToBeAdded.controls.prTotalAmount.disable();
     this.totCallTaxAmt();
     this.formValidation();
  }

  enableAllFields() {
    this.modelFormToBeAdded.controls.maintenanceType.enable();
    this.modelFormToBeAdded.controls.qaFrequency.enable();
    this.modelFormToBeAdded.controls.pmFrequency.enable();
    this.modelFormToBeAdded.controls.paFrequency.enable();
    this.modelFormToBeAdded.controls.businessPartnerName.enable();
  }

  addInwardInventory() {
    this.modelFormToBeAdded.enable();
    this.matDialogRef.close(this.modelFormToBeAdded.value);
  }

  // listOfCurrencyCd(searchValue) {
  //   this.commonService.getComboResults(this.samsServices.listOfCurCdCombo, searchValue.term).subscribe(
  //     (data) => {
  //       this.currencyCdList = data.responseData.comboList;
  //     }
  //   );
  // }

  listOfCurrencyCd(searchValue) {
    this.currencyScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCdPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCdPageNumber , this.currencyCdList , data.responseData.comboList)
        this.currencyCdPageNumber = this.getData.pageNumber;
        this.currencyCdList = this.getData.dataList;
        this.currencyScrollsync = false;
      }
    );
  }

  checkLocAndPurCd(event) {
    this.modelFormToBeAdded.controls['exchangeRate'].setValue(0);
    if(event==undefined){
      this.currencyCdPageNumber = 1;
      this.currencyCdList = [];
    }
    else{
      if (event.curCd === this.modelFormToBeAdded.controls['locationCurrencyCode'].value) {
        this.modelFormToBeAdded.controls['exchangeRate'].setValue(1);
        this.modelFormToBeAdded.controls['exchangeRate'].disable();
      } else {
        this.modelFormToBeAdded.controls['exchangeRate'].enable();
        this.modelFormToBeAdded.controls['exchangeRate'].setValue(0);
      }
    }
  }

  createModel(modelId ?: number,mode ?: string){
    this.matDialogRef.close();
    this.router.navigate(['home/assetmaster/modelCreate/'+modelId + '/' + mode + '/model_basic_info']);
  }

  listOfManufacturer(searchValue) {
    this.scrollsyncManufacturer=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.samsServices.listAllBusinessPartnerCombo, searchValue.term,this.data.businessPartnerId, '', this.limitCount, this.manufacturerPageNumber,'', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.scrollsyncManufacturer=false;
      }
    );
  }

  getManfacturerComboValue(event) {
    if (event === undefined) {
      this.modelFormToBeAdded.controls.businessPartnerId.setValue(0);
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];
      this.modelFormToBeAdded.controls.modelId.setValue(0);
      this.modelFormToBeAdded.controls.modelName.setValue(null);
      this.modelCombo = [];
      this.modelComboPageNumber=1;
    } else {
      this.modelFormToBeAdded.controls.businessPartnerId.setValue(event.businessPartnerId);
      this.modelFormToBeAdded.controls.modelId.setValue(0);
      this.modelFormToBeAdded.controls.modelName.setValue(null);
        this.modelFormToBeAdded.controls.modelName.enable();

      this.modelCombo = [];
      this.modelComboPageNumber=1;
    }
    this.formValidation();
  }

  //CHILD ASSET

  getManfacturerComboValueChild(event) {
    if (event === undefined) {
      this.childAssetPreInwardAsset.controls.businessPartnerId.setValue(0);
      this.childAssetPreInwardAsset.controls.modelId.setValue(0);
      this.childAssetPreInwardAsset.controls.modelName.setValue(null);
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];
      this.modelCombo = [];
      this.modelComboPageNumber=1;
    } else {
      this.childAssetPreInwardAsset.controls.businessPartnerId.setValue(event.businessPartnerId);
      this.childAssetPreInwardAsset.controls.modelId.setValue(0);
      this.childAssetPreInwardAsset.controls.modelName.setValue(null);
      this.modelCombo = [];
      this.modelComboPageNumber=1;
    }
  }

  getModelComboValueChild(event){
    if (event === undefined) {
      this.modelComboPageNumber=1;
      this.modelCombo=[];
      this.childAssetPreInwardAsset.controls.modelId.setValue(0);
    }else{
      this.childAssetPreInwardAsset.controls.businessPartnerName.setValue(event.businessPartnerName);
      this.childAssetPreInwardAsset.controls.modelId.setValue(event.modelId);
    }
  }

  listOfAllModelChild(searchKey) {
    this.assetCategoryIdForAssetGroup = this.modelFormToBeAdded.controls.assetCategoryId.value;
    this.scrollsyncModelChild=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    const businessPartnerId = this.childAssetPreInwardAsset.controls.businessPartnerId.value
    this.commonService.getComboResults(this.samsServices.listOfAllModelCombo, (this.commonService.fetchSearchValue(searchKey)) , businessPartnerId , '', this.limitCount, this.modelComboPageNumber).subscribe(
    (data)=>{
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelCombo = this.getData.dataList;
      this.scrollsyncModelChild=false;
    });
  }

  addChildAssetPreInw(){
    let index=this.commonService.getIndexOfTheItem(this.addChildAssetDataSource.data, true, 'modelId', this.childAssetPreInwardAsset.controls.modelId.value)
    if(index== -1){
      this.addChildAssetDataSource.data.push(this.childAssetPreInwardAsset.value);
      this.childAssetlength = this.addChildAssetDataSource.data.length;
      this.modelFormToBeAdded.controls.childAssetPreInwAsset.setValue(this.addChildAssetDataSource.data);
      this.changeDetectorRefs.detectChanges();
      this.tableChildAsset.renderRows();
      this.clearFieldsAfterAdded();
    }else{
      this.commonService.openToastWarningMessage('Selected Model Is Already Added.')
    }

  }

  clearFieldsAfterAdded(){
    this.childAssetPreInwardAsset.controls.modelId.setValue(0);
    this.childAssetPreInwardAsset.controls.businessPartnerId.setValue(0);
    this.childAssetPreInwardAsset.controls.modelName.setValue('');
    this.childAssetPreInwardAsset.controls.businessPartnerName.setValue('');
  }

  deleteChildAssetInw(deleteid,index){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Child Asset'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0) {
            this.childAssetTempPush = this.addChildAssetDataSource.data;
            this.addChildAssetDataSource.data.splice(index, 1);
            this.addChildAssetDataSource.data = this.childAssetTempPush;
            this.childAssetlength = this.addChildAssetDataSource.data.length;
            this.addChildAssetDataSource._updateChangeSubscription();
          } else {
            this.commonService.commonGetService(this.samsServices.deleteChildAssetPreInw, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.childAssetTempPush = this.addChildAssetDataSource.data;
                  this.addChildAssetDataSource.data.splice(index, 1);
                  this.addChildAssetDataSource.data = this.childAssetTempPush;
                  this.childAssetlength = this.addChildAssetDataSource.data.length;
                  this.addChildAssetDataSource._updateChangeSubscription();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
    }

    dialogRefContract;

    addWarrantyContractInw(element,index,mode){
      this.dialogRefContract = this.dialog.open(PreInwWarrantyContractComponent, {
        height: '550px',
        width: '700px',
        data: {
          'unitPrice': this.modelFormToBeAdded.controls.originalPurchaseAmount.value,
          'warrantyContract': element,
          'type' : mode,
          'size' : this.addWarrantyContractDataSource.data.length
        }
      });
      this.dialogRefContract.disableClose = true;
      this.dialogRefContract.afterClosed().subscribe(
        data => {
          if(data != null && data !== undefined && data !== ''){
            if(mode === 'add'){
              this.addWarrantyContractDataSource.data.push(data);
              this.commonService.openToastSuccessMessage('Record Added Successfully.');
            }else{
              this.addWarrantyContractDataSource.data[index] = data
              this.commonService.openToastSuccessMessage('Record Updated Successfully.');
            }
              this.warrantyContractlength = this.addWarrantyContractDataSource.data.length;
              this.modelFormToBeAdded.controls.contractWarrantyPreInwAsset.setValue(this.addWarrantyContractDataSource.data);
              this.changeDetectorRefs.detectChanges();
              this.tableWarrantyContract.renderRows();
          }
        });
    }

    ngOnDestroy(){
      if(this.dialogRefContract!=null){
       this.dialogRefContract.close();
      }
    }

    deleteWarrantyContractInw(deleteid,index){
      const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'Text': 'Warranty/Contract'
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
            if (deleteid <= 0) {
              this.warrantyContractTempPush = this.addWarrantyContractDataSource.data;
              this.addWarrantyContractDataSource.data.splice(index, 1);
              this.addWarrantyContractDataSource.data = this.warrantyContractTempPush;
              this.warrantyContractlength = this.addWarrantyContractDataSource.data.length;
              this.addWarrantyContractDataSource._updateChangeSubscription();
              this.commonService.openToastSuccessMessage('Record Deleted Successfully.');
            } else {
              this.commonService.commonGetService(this.samsServices.deleteWarrantyContractPreInw, deleteid).subscribe(
                data => {
                  if (data.success) {
                    this.commonService.openToastSuccessMessage(data.message);
                    this.warrantyContractTempPush = this.addWarrantyContractDataSource.data;
                    this.addWarrantyContractDataSource.data.splice(index, 1);
                    this.addWarrantyContractDataSource.data = this.warrantyContractTempPush;
                    this.warrantyContractlength = this.addWarrantyContractDataSource.data.length;
                    this.addWarrantyContractDataSource._updateChangeSubscription();
                  } else {
                    this.commonService.openToastErrorMessage(data.message);
                  }
                }
              );
            }
          }
        });
    }

    addStatutoryRequirement() {
      this.listOfCertificates.push(this.assetCertificateFormGroup.value);
      this.listOfCertificates = this.listOfCertificates.reverse();
      this.changeDetectorRefs.detectChanges();
      this.table1.renderRows();
    }

    uploadDocDialog;
    uploadDocument(element,view) {
      const dialogRef = this.dialog.open(PreinwDocumentComponent, {
        height: 'auto',
        width: '500px',
        data: {
          'certificateModel': element,
          'dtlId':this.modelFormToBeAdded.controls.inwardInventoryDtlId.value,
          'mode': element.fileCertificateNo === '' ? 'add' : 'edit',
          'view':view
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          this.fetchListOfPreInwCertificates();
        });
    }

    fetchListOfPreInwCertificates() {
      this.subloaderCertificates = true;
      const inwardInventoryDtlId = this.modelFormToBeAdded.controls.inwardInventoryDtlId.value
      this.commonService.commonGetService(this.samsServices.loadOfPreInwardCertificate, this.modelFormToBeAdded.controls.inwardInventoryHdrId.value,inwardInventoryDtlId).subscribe(
        (data) => {
          if(data.success) {
          this.listOfCertificates = [];
          this.listOfCertificates = this.listOfCertificates.concat(data.responseData);
          this.certificateslength = this.listOfCertificates.length;
          this.modelFormToBeAdded.controls.statutoryRequirementList.setValue(this.listOfCertificates);
          this.subloaderCertificates = false;
          this.formTwoValidation();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.subloaderCertificates = false;
          }
        }
      )
    }

    loadCertificateComboData(searchValue) {
      this.scrollsyncCertificateCombo = true;
      this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults(this.samsServices.listOfAllCertificateCombo, searchValue.term, '', '',
        this.recordsPerPageForCombo, this.certificatePageNumber,'','').subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.certificatePageNumber , this.certificateNameList , data.responseData.comboList)
            this.certificatePageNumber = this.getData.pageNumber;
            this.certificateNameList = this.getData.dataList;
            this.scrollsyncCertificateCombo = false;
          }
        );
    }

    selectedCertificateAuthorityData(event) {
      if(event === 'undefined') {
        this.assetCertificateFormGroup.controls.certificateId.setValue(0);
        this.assetCertificateFormGroup.controls.certificationAuthorityName.setValue('');
        this.assetCertificateFormGroup.controls.issuingAuthority.setValue('');
      } else {
        this.assetCertificateFormGroup.controls.certificateId.setValue(event.certificateId);
        this.assetCertificateFormGroup.controls.certificationAuthorityName.setValue(event.certificationAuthorityName);
        this.assetCertificateFormGroup.controls.issuingAuthority.setValue(event.issuingAuthority);
      }
    }

    openManufactureCreateScreen() {
      const manufacturerPath = ['home/settingsmaster/businessPartnerCreate/'+ 0 + '/' + 'add'];
      localStorage.setItem('preInwardInfoIfModelNeedToBeAdded', JSON.stringify(this.modelFormToBeAdded.getRawValue()));
      localStorage.setItem('navigateToOtherScreenFromPreInwardAdd', 'true');
      this.matDialogRef.close();
      this.router.navigate(manufacturerPath);
    }

    openModelCreateScreen() {
      const modelPath =['home/assetmaster/modelCreate/'+ 0 + '/' + 'add' + '/model_basic_info'];
      localStorage.setItem('preInwardInfoIfModelNeedToBeAdded', JSON.stringify(this.modelFormToBeAdded.getRawValue()));
      localStorage.setItem('navigateToOtherScreenFromPreInwardAdd', 'true');
      localStorage.setItem('navigateToModelCreateScreen', 'true');
      this.matDialogRef.close();
      this.router.navigate(modelPath);
    }

    formValidation() {
      if (this.modelFormToBeAdded.valid) {
        this.formOneValid = true;
      } else {
        this.formOneValid = false;
      }
      return this.formOneValid;
    }

    formTwoValidation() {
      if(this.listOfCertificates.length > 0){
        for (let index = 0; index < this.listOfCertificates.length; index++) {
          const element = this.listOfCertificates[index];
          if (element.documentNo == '') {
            this.formTwoValid = false;
            return this.formTwoValid;
          } else {
            this.formTwoValid = true;
          }
        }
      }else{
        this.formTwoValid = true;
      }
      return this.formTwoValid;
    }

    fetchCallTaxAmt(){
      let taxAmt = this.modelFormToBeAdded.controls.prTaxAmount.value;
      let prAmt = (Number(this.modelFormToBeAdded.controls.localPurchaseAmount.value));
      
      let taxRt = (Number(taxAmt) /  Number(prAmt) ) * Number(100);
  
      this.modelFormToBeAdded.controls.localTaxRate.setValue(Number(taxRt).toFixed(2));
      if(this.modelFormToBeAdded.controls.prQuantity.value > 0) {
        this.modelFormToBeAdded.controls.prTotalAmount.setValue((Number(prAmt)*Number(this.modelFormToBeAdded.controls.prQuantity.value)) + (Number(taxAmt)*Number(this.modelFormToBeAdded.controls.prQuantity.value)));
        this.modelFormToBeAdded.controls.totalPurchaseAmt.setValue(this.modelFormToBeAdded.controls.prTotalAmount.value / this.modelFormToBeAdded.controls.prQuantity.value);
      } else {
        this.modelFormToBeAdded.controls.prTotalAmount.setValue(0);
        this.modelFormToBeAdded.controls.totalPurchaseAmt.setValue(0);
      }
    }

    totCallTaxAmt () {
      let taxRt = this.modelFormToBeAdded.controls.localTaxRate.value;
      let prAmt = (Number(this.modelFormToBeAdded.controls.localPurchaseAmount.value));
      
      let taxAmt = Number(prAmt) * Number(taxRt) / Number(100);
  
      this.modelFormToBeAdded.controls.prTaxAmount.setValue(Number(taxAmt).toFixed(2));
      
      if(this.modelFormToBeAdded.controls.prQuantity.value > 0) {
        let prTotalAmount = (Number(prAmt)*Number(this.modelFormToBeAdded.controls.prQuantity.value)) + (Number(taxAmt)*Number(this.modelFormToBeAdded.controls.prQuantity.value));
        this.modelFormToBeAdded.controls.prTotalAmount.setValue(Number(prTotalAmount).toFixed(2));
    
        this.modelFormToBeAdded.controls.totalPurchaseAmt.setValue(Number(this.modelFormToBeAdded.controls.prTotalAmount.value / this.modelFormToBeAdded.controls.prQuantity.value).toFixed(2));
      } else {
        this.modelFormToBeAdded.controls.prTotalAmount.setValue(0);
        this.modelFormToBeAdded.controls.totalPurchaseAmt.setValue(0);
      }
      
    }
}
