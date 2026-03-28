import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SparepartsCreateComponent } from 'src/app/Components/Model/subTabs/spareparts-create/spareparts-create.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AssetGroupDtlModel } from 'src/app/Model/master/asset-group-dtl';
import { AssetGroupModel } from 'src/app/Model/master/asset-group';
import { Model } from 'src/app/Model/master/model';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Title } from '@angular/platform-browser';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetCategoryModel } from 'src/app/Model/master/assetCategory';
import { CusFieldHdr } from 'src/app/Model/master/cusFieldHdr';
import { ChildAssetModel } from 'src/app/Model/asset/childAsset';
import { ModelModule } from 'src/app/Model/asset/modelModule';
import { TechnicalSpecialistPopupComponent } from '../technical-specialist-popup/technical-specialist-popup.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { SolutionBankCreateComponent } from '../subTabs/solution-bank-create/solution-bank-create.component';
import { SelfanalysisCreateComponent } from '../subTabs/selfanalysis-create/selfanalysis-create.component';
import { CheckpointsCreateComponent } from '../subTabs/checkpoints-create/checkpoints-create.component';
import { DocumentCreateComponent } from '../subTabs/document-create/document-create.component';
import { AdditionalinfoCreateComponent } from '../subTabs/additionalinfo-create/additionalinfo-create.component';
import { TranslateService } from '@ngx-translate/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { ModelScreenTabs } from '../../../../../Constants/ModelScreenTabs';
import { ModelCheckPointsModel } from 'src/app/Model/master/model-check-points';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ModelCreateComponent implements OnInit {

  _Delete: Boolean = false;
  public color: string = '#2889e9';

  displayedColumns = ['sno', 'itemModuleName', 'itemCount', 'active', 'action'];
  innerDisplayedColumns = ['sno', 'itemName', 'itemDesc', 'itemTypeName','uomCode', 'active'];
  
  specialistDispColumn = ['sno', 'orgType', 'orgName', 'specialistName', 'contactNo', 'emailId', 'action']

  //Set Page title
  title = 'Asset Optima - Model';

  @ViewChild('modelName1') focusModelName: ElementRef;
  @ViewChild('modelLifeSpan') modelLifeSpan: ElementRef;

  uploadModelFlag: boolean = false;
  scrollsyncInstallationType: boolean = false;
  uniqueModelFlag = false;

  modelForm: FormGroup;
  childAssetForm: FormGroup;
  checkPointsModelForm: FormGroup;
  itemModuleFormGroup: FormGroup;
  itemTypeForm: FormGroup;
  childModelForm: FormGroup;

  public assetCategoryModel: AssetCategoryModel;

  categoryScrollsync: Boolean = false;
  subScrollsync : boolean = false;
  manufacturerscrollSync : boolean =false;
  typeScrollsync : boolean =false;
  assetGroupNamescrollSync : boolean =false;
  subLoaderItemModule : boolean = false;

  depreciationMethodCombo: any = [];
  depreciationMethodPageNumber: number;
  scrollsyncDepreciationMethod: boolean=false;
  enableRateOfDepreciation: boolean=false;
  recordsPerPageForCombo1:string;

  step = 0;
  limitCount: any;
  skipCount: any;
  searchKey: any = '';
  noOfYears: boolean = false;

  selectedIndex: number = 0;
  maxNumberOfTabs: number = 11;
  length: number = 0;

  cusFieldHdrListGroupList: any = ['1', '2', '3', '4'];

  public imagePath;
  files = [];
  filesResultList = [];
  scrollModuleItemNameSync: boolean = false;


  display: string = '';

  //Disable clear button on edit
  disableClear: boolean = false;
  public pmfList: any = [{ pmfType: 'Minor' }, { pmfType: 'Major' }, { pmfType: 'Medium' }];
  public depriciationList: any = [{ id: 1, depriciationType: 'Written Down Value' }, { id: 2, depriciationType: 'Straight Line Method' }];

  modelItemsDisCol = ['sno', 'itemMasterName', 'itemMasterDesc', 'itemTypeName', 'masterUOMName', 'active', 'action'];
  documentDisCol = ['sno', 'docName', 'docType', 'createdBy', 'createdDtDisp', 'action'];
  selfAnalysisDisCol = ['sno', 'defectType', 'defectTag', 'defectQuestion', 'action'];
  additionalInfoDisCol = ['sno', 'infoName', 'infoLabel', 'infoTitle', 'infoDetails', 'action'];
  checkPointsDisCol = ['sno', 'parameterName', 'parameterGroupName', 'parameterTypeName', 'uom', 'inputType', 'defalutValue', 'minAllowedValue', 'maxAllowedValue', 'action'];
  solutionBankDisCol = ['sno', 'defectName', 'defectTag', 'defectCause', 'defectSolution', 'action'];
  childAssetDispCol = ['sno', 'assetGroup', 'assetCode', 'pmFrequency', 'paFrequency', 'qaFrequency', 'action']


  //Heading static
  displayButton: string;
  headingDisplay: string;
  alreadyPresentItems: String = '';

  disbleClear: boolean;

  manufactuer: any[] = [];
  assetGroup: any = [];
  subCategoryName: any = [];
  itemCategory: any = [];
  assetCategoryName: any = [];
  assetTypeName: any = [];
  uom: any = [];
  installationTypeCombo: any = [];
  itemModuleCombo: any = [];
  moduleTempList: any[] = [];

  itemTypePageNumber: number;
  itemTypeCombo: any = [];
  scrollItemTypesync:boolean = false;

  assetGroupDtl: AssetGroupDtlModel;
  model: Model;
  childAssetModel: ChildAssetModel;

  recordsPerPageForCombo: number;
  currentPageNumber: number
  currentPage: number;
  itemModuleNamePageNumber: number;

  showEndOfLife: boolean = false;

  itemModuleList = new MatTableDataSource<any>();

  res = [];

  fileUpload: any= [];
  @ViewChild('matAddModel') modelDocumentTable: MatTable<any>;

  //DATASOURCE
  modelItemsDataSource = new MatTableDataSource<any>();
  selfAnalysisDataSource = new MatTableDataSource<any>();
  additionalInfoDataSource = new MatTableDataSource<any>();
  solutionBankDataSource = new MatTableDataSource<any>();
  addCheckPointsDataSource = new MatTableDataSource<any>();
  specialistDataSource = new MatTableDataSource<any>();
  maintenanceScheduleList = new MatTableDataSource<any>();
  childModelList = new MatTableDataSource<any>();

  documentDataSource: any = [];
  documentImageSource: any = [];
  fileToUpload: any=[];

  modelItemTempPush: any = [];
  accessoriesTempPush: any = [];
  consumablesTempPush: any = [];
  selfAnalysisTempPush: any = [];
  additionalInfoTempPush: any = [];
  solutionBankTempPush: any = [];
  checkPointsTempPush: any = [];
  specialistListTempPush: any = [];

  public uploadFlag: boolean = false;
  public serverUrl: string;


  ErrorMsg: String;
  tempValue: String = '';

  @ViewChild('matSpareParts') modelItems: MatTable<any>;
  @ViewChild('specialist') specialist: MatTable<any>;


  manufacturerPageNumber: number;
  assetGroupPageNumber: number;
  assetCategoryPageNumber: number;
  assetSubCategorPageNumber: number;
  assetTypePageNumber: number;
  installationTypePageNumber: number;

  assetGroupChildPageNumber: number;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  formOneValid: boolean = false;  // valid if form one

  modeDisplay: boolean = false;
  modeInActive: boolean = false;
  validateBasicInfo: boolean = false;

  specilaistView: boolean = false;

  source: string = 'ASSET';

  @ViewChild('imgupload') imageUpload: ElementRef<HTMLElement>;
  @ViewChild('childAsset') table1: MatTable<any>;

  cusFieldHdr: CusFieldHdr;
  cusFieldHdrList: CusFieldHdr[];
  cusFiledHdrTempList: any[];

  customFieldLength: number = 0;
  childAssetList: any[] = [];
  childAssetGroupNameCombo: any = [];
  recordsPerPageForParameter: string;
  assetCodeCombo: any;

  modelModule: ModelModule;

  //combo
  scrollsyncParameterType: boolean = false;
  parameterTypePageNumber: number;
  parameterTypeCombo: any = [];

  scrollsyncParameterName: boolean = false;
  parameterNamePageNumber: number;
  parameterNameCombo: any = [];

  //parameter group combo
  parameterGroupCombo: any=[];
  parameterGroupPageNumber:number;
  scrollsyncParameterGroup:boolean=false;

  displayedColumnsMaintSchedule = ['sno', 'maintenanceScheduleTypeName', 'maintenanceScheduleFrequencyName'];
  maintenanceScheduleListLength: number = 0;

  tabsList = ModelScreenTabs;
  previousPath : any;

  displayedColumnsChildModel = ['sno', 'childAssetGroupName', 'childModelName', 'businessPartnerName', 'action'];
  childAssetGroupScrollsync: boolean = false;
  childAssetGroupPageNumber: number;

  scrollsyncModelChild: boolean = false;
  modelComboPageNumber: number;
  modelCombo: any = [];

  tempChildModelList: any[] = [];
  childModelListLength: number = 0;
  subLoaderChildModel: boolean = false;

  @ViewChild('matCheckList') tableCheckList: MatTable<any>;
  count: number = 0;
  getData: getData;

  editable_msg: String = '';
  enableUpdate: boolean = false;
  
  expandedElement: any | null;

  modelCheckPoint : ModelCheckPointsModel;
    //For Pagination
    checkListlength: String = '0'; 
    pageIndex: String;  //set page number starts with zeroo
    pageSize: String;   // records per page

  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationNavigation: Location,
    private dialog: MatDialog,
    private detectorRefs: ChangeDetectorRef,
    private assetoptimaConstants: AssetOptimaConstants,
    private titleService: Title,
    private userSessionService: UserSessionService,
    private changeDetectorRefs: ChangeDetectorRef,
    private translateService: TranslateService
    ) {

    this.model = new Model();
    this.assetGroupDtl = new AssetGroupDtlModel();
    this.assetGroupDtl.assetGroupTO = new AssetGroupModel(),
      this.recordsPerPageForCombo = 10;
    this.currentPageNumber = 1;
    this.currentPage = 1;
    this.manufacturerPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetTypePageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.assetGroupChildPageNumber = 1;
    this.installationTypePageNumber = 1;
    this.parameterTypePageNumber = 1;
    this.parameterNamePageNumber = 1;
    this.itemModuleNamePageNumber = 1;
    this.assetCategoryModel = new AssetCategoryModel();
    this.cusFieldHdr = new CusFieldHdr();
    this.depreciationMethodPageNumber = 1;
    this.itemTypePageNumber = 1;
    this.parameterGroupPageNumber = 1;
    this.childAssetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.modelCheckPoint = new ModelCheckPointsModel();
    this.pageSize = '100';
    this.pageIndex = '0';
  }

  ngOnInit() {
    this.modelItemsDataSource.data = [];
    this.selfAnalysisDataSource.data = [];
    this.additionalInfoDataSource.data = [];
    this.solutionBankDataSource.data = [];
    this.addCheckPointsDataSource.data = [];
    this.specialistDataSource.data = [];
    this.maintenanceScheduleList.data = [];
    this.childModelList.data = [];

    this.titleService.setTitle(this.title);
    this.modelForm = new FormGroup({
      modelName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      modelId: new FormControl(0),
      businessPartnerName: new FormControl(null, [Validators.required]),
      assetTypeName: new FormControl(''),
      assetCategoryName: new FormControl('', [Validators.required]),
      assetGroupName: new FormControl(''),
      businessPartnerId: new FormControl(0),
      assetTypeId: new FormControl(0),
      assetCategoryId: new FormControl(0),
      assetGroupId: new FormControl(0),
      subCategoryId: new FormControl(0),
      subCategoryName: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      // assetGroupTO: new FormControl(new AssetGroupModel()),
      modelItemList: new FormControl([]),
      selfAnalysisList: new FormControl([]),
      additionalInfoList: new FormControl([]),
      solutionBankList: new FormControl([]),
      checkPointsList: new FormControl([]),
      modelDocList: new FormControl([]),
      modelImageList: new FormControl([]),
      modelNo: new FormControl(''),
      installationType: new FormControl(null),
      volumeLicensePresent: new FormControl(''),
      trackIndividualLicense: new FormControl(''),
      modelImage: new FormControl(''),
      modelModuleList: new FormControl([]),
      technicalSpecialistList: new FormControl([]),
      warrantyPeriod: new FormControl(''),
      specification: new FormControl(false),
      depreciation: new FormControl(false),
      customFields: new FormControl(false),
      modelItems: new FormControl(false),
      selfAnalysis: new FormControl(false),
      document: new FormControl(false),
      checkList: new FormControl(false),
      solutionBank: new FormControl(false),
      additionalInfo: new FormControl(false),
      inventoryModule: new FormControl(false),
      technicalSpecelist: new FormControl(false),
      expectedLifeInYears: new FormControl(0.0 ,[Validators.pattern(this.assetoptimaConstants.percentageValidation)]),
      maintainanceThresholdPer: new FormControl('', [Validators.pattern(this.assetoptimaConstants.percentageValidation)]),
      depreciationMethodName: new FormControl(''),
      depreciationMethodId: new FormControl(0),
      rateOfDepreciation: new FormControl(0, [Validators.pattern(this.assetoptimaConstants.percentageValidation)]),
      scrapValuePer: new FormControl('', [Validators.pattern(this.assetoptimaConstants.percentageValidation)]),
      functionalityName: new FormControl(''),
      offWarrantyMS: new FormControl(''),
      qaStrategy: new FormControl(''),
      deviceCodeId: new FormControl(0),
      deviceCode: new FormControl(''),
      deviceConcept: new FormControl(''),
      maintenanceSchedule: new FormControl(false),
      childModel: new FormControl(false),
      childModelList: new FormControl([])
    });
    this.childAssetForm = new FormGroup({
      childAssetGroupName: new FormControl(''),
      childAssetGroupId: new FormControl(0),
      childAssetModelName: new FormControl(''),
      childAssetModelId: new FormControl(0),
      childAssetCode: new FormControl(''),
      childAssetId: new FormControl(0),
      pmFrequency: new FormControl(''),
      paFrequency: new FormControl(''),
      qaFrequency: new FormControl(''),
    });

    this.checkPointsModelForm = new FormGroup({
      parameterName: new FormControl('', [Validators.required]),
      parameterId: new FormControl(0),
      parameterTypeName: new FormControl('', [Validators.required]),
      startValue: new FormControl(''),
      endValue: new FormControl(''),
      usedFor: new FormControl(''),
      uom: new FormControl(''),
      modelCheckPtsId: new FormControl(0),
      modelId: new FormControl(0),
      orgId: new FormControl(0),
      parameterTypeId: new FormControl(0),
      active: new FormControl(true),
      parameterGroupName : new FormControl(''),
      parameterGroupId : new FormControl(0),
      uomCd : new FormControl(''),
      defaultValue : new FormControl(''),
      inputType : new FormControl(''),
      minAllowedValue : new FormControl(''),
      maxAllowedValue : new FormControl(''),
      parameterTypeNameDisp : new FormControl('')
    });
    this.checkPointsModelForm.controls.parameterName.disable();
    setTimeout(() => {
      this.focusModelName.nativeElement.focus();
    }, 500);

    this.itemModuleFormGroup = new FormGroup({
      modelItemId: new FormControl(0),
      orgId: new FormControl(0),
      modelId: new FormControl(0),
      itemModuleId: new FormControl(0),
      itemModuleName: new FormControl(null, [Validators.required]),
    });

    this.itemTypeForm = new FormGroup({
      itemTypeId: new FormControl(0),
     	itemTypeName: new FormControl(null),
    });

    //TO ADD CHILD MODELS TO PARENT MODEL
    this.childModelForm = new FormGroup({
      modelChildId: new FormControl(0),
      orgId: new FormControl(0),
      parentModelId: new FormControl(0),
      childModelId: new FormControl(0),
      childModelName: new FormControl(null, [Validators.required]),
      childAssetGroupId: new FormControl(0),
      childAssetGroupName: new FormControl(null, [Validators.required]),
      businessPartnerId: new FormControl(0),
      businessPartnerName: new FormControl(''),
      active: new FormControl(true),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),

    });

    this.assetGroupPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetTypePageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.assetGroupChildPageNumber = 1;
    this.parameterGroupPageNumber = 1;
    this.itemModuleList.data = [];

    this.cusFiledHdrTempList = [];

    this.modelForm.controls.installationType.setValue('NONE')
    localStorage.setItem('previousRoute', this.router.url);
    //Edit method
    this.formOneValid = false;
    this.validateEditMode();
    this.modelForm.get('functionalityName').disable();
      this.modelForm.get('offWarrantyMS').disable();
      this.modelForm.get('qaStrategy').disable();
      this.modelForm.get('deviceCodeId').disable();
      this.modelForm.get('deviceCode').disable();
      this.modelForm.get('deviceConcept').disable();
  }

  ngAfterViewInit() {
    this.modelForm.invalid;
  }
  modelId: number;
  mode: any;
  activetab: any;

  validateEditMode() {
    let primaryId;
    let mode;

    this.activatedRoute.params.subscribe(
      params => {
        primaryId = params.pId;
        this.activetab =  params.tab;
        primaryId = Number(primaryId);
        mode = params.mode;
        this.modelId = Number(primaryId);
        this.mode = params.mode;

        if(this.previousPath != 'Model') {
          
          if (primaryId <= 0) {
            //button and heading names for add
            this.headingDisplay = "Create";
            this.displayButton = "Submit";
            this.previousPath = 'Model';
  
            if(localStorage.getItem('previousRoute').startsWith('/home/manufacturerSupplierCreate')){
                this.modelForm.patchValue(JSON.parse(localStorage.getItem('localModelForm')));
                this.previousPath = 'Other';
                this.formValidation()
                localStorage.removeItem('localModelForm');
                localStorage.removeItem('previousRoute');
            }
          } else {
            //button and heading names for edit
            this.headingDisplay = "Edit";
            this.displayButton = "Update";
            this.disableClear = true;
            this.commonService.commonGetService(this.assetOptimaServices.fetchModelDetailedInfo, primaryId).subscribe(
              data => {                
                if(!(data.responseData.editable)){
                  this.editable_msg = '"Basic Information" Cannot Be Changed After The Asset Is Registered';
                  this.modelForm.get('assetGroupName').disable();
                  this.modelForm.get('modelName').disable();
                  this.modelForm.get('assetTypeName').disable();
                  this.modelForm.get('assetCategoryName').disable();
                  this.modelForm.get('subCategoryName').disable();
                  this.modelForm.get('modelNo').disable();
                  this.modelForm.get('businessPartnerName').disable();
                  this.modelForm.get('volumeLicensePresent').disable();
                  this.modelForm.get('installationType').disable();
                  this.validateBasicInfo = true;
  
                }
                this.previousPath = 'Model';
                if (mode == 'view' || !data.responseData.active) {           
                  this.modeDisplay = true;
                  this.modeInActive = true;
                  this.validateBasicInfo = true;
                  this.modelForm.disable();
                  this.childAssetForm.disable();
                  this.checkPointsModelForm.disable();
                  this.headingDisplay = "View";
                  this.specilaistView = true;
                  this.modelItemsDisCol = ['sno', 'itemMasterName', 'itemMasterDesc', 'itemTypeName', 'masterUOMName', 'active'];
                  if(!data.responseData.active && mode == 'edit'){
                    this.modeInActive = false;
                    this.modelForm.controls.active.enable();
                  }
                } else {
                  // button and heading names for edit
                  this.headingDisplay = "Edit";
                  this.displayButton = "Update";
                  this.disableClear = true;
                  this.specilaistView = false;
                }
                this.modelForm.patchValue(data.responseData);
                this.fetchListOfModelDocs();
                if(this.modelForm.controls.depreciationMethodName.value === 'WRITTEN DOWN'){
                  this.enableRateOfDepreciation = true;
                }else{
                  this.enableRateOfDepreciation = false;
                }
                if(data.responseData.editable){
                  this.formValidation();
                }
                //TO CHECK UNIQUE VALIDATION
                this.tempValue = data.responseData.modelName;
                if (data.responseData.assetGroupId === 0) {
                  this.commonService.showSpinner();
                  this.loadAssetCategoryInfo(data.responseData.assetCategoryId);
                }
                this.res = [];
                this.getCustomFieldList(this.modelForm.controls['modelId'].value, data.responseData.subCategoryId, 'Edit', 'MODEL');
  
                this.serverUrl = this.assetoptimaConstants.connectionUrl + "getImage.sams?resourceName=" + data.responseData.imagePath;
  
  
                this.modelItemsDataSource.data = this.modelForm.get('modelItemList').value;
                this.modelForm.controls.modelItemList.setValue(this.modelItemsDataSource.data);
  
                this.addCheckPointsDataSource.data = this.modelForm.get('checkPointsList').value;
                this.modelForm.controls.checkPointsList.setValue(this.addCheckPointsDataSource.data);
  
                this.documentDataSource = this.modelForm.get('modelDocList').value;
                this.modelForm.controls.modelDocList.setValue(this.documentDataSource);
  
                this.selfAnalysisDataSource.data = this.modelForm.get('selfAnalysisList').value;
                this.modelForm.controls.selfAnalysisList.setValue(this.selfAnalysisDataSource.data);
  
                this.additionalInfoDataSource.data = this.modelForm.get('additionalInfoList').value;
                this.modelForm.controls.additionalInfoList.setValue(this.additionalInfoDataSource.data);
  
                this.solutionBankDataSource.data = this.modelForm.get('solutionBankList').value;
                this.modelForm.controls.solutionBankList.setValue(this.solutionBankDataSource.data);
  
                this.documentImageSource = this.modelForm.get('modelImageList').value;
                this.modelForm.controls.modelDocList.setValue(this.documentImageSource);
                this.count = this.documentImageSource.length;
  
  
                this.itemModuleList.data = this.modelForm.get('modelModuleList').value;
                this.length = this.itemModuleList.data.length;
  
                this.specialistDataSource.data = this.modelForm.get('technicalSpecialistList').value;

                this.childModelList.data = this.modelForm.get('childModelList').value;
                this.childModelListLength = this.childModelList.data.length;
  
                if(this.modelForm.controls.assetGroupId.value > 0) {
                  this.getMaintenanceScheduleList(this.modelForm.controls.assetGroupId.value);
                }

                this.fetchModelcheckPoints();

  
              });
          }
        } else {
          return null;
        }
        
      }
    );
  }

  loadAssetCategoryInfo(assetCategoryId) {
    let assetCategoryModel = {
      assetCategoryId : Number(assetCategoryId)
    };
    this.commonService.showSpinner();
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllAssetCategory, assetCategoryModel).subscribe(
      data => {
        if (data.success) {
          this.assetCategoryModel = data.responseData.dataList[0];
          this.modelForm.controls['specification'].setValue(this.assetCategoryModel.specification);
          this.modelForm.controls['depreciation'].setValue(this.assetCategoryModel.depreciation);
          this.modelForm.controls['modelItems'].setValue(this.assetCategoryModel.modelItems);
          this.modelForm.controls['selfAnalysis'].setValue(this.assetCategoryModel.selfAnalysis);
          this.modelForm.controls['document'].setValue(this.assetCategoryModel.document);
          this.modelForm.controls['checkList'].setValue(this.assetCategoryModel.checkList);
          this.modelForm.controls['solutionBank'].setValue(this.assetCategoryModel.solutionBank);
          this.modelForm.controls['additionalInfo'].setValue(this.assetCategoryModel.additionalInfo);
          this.modelForm.controls['technicalSpecelist'].setValue(this.assetCategoryModel.technicalSpecelist);
          this.modelForm.controls['inventoryModule'].setValue(this.assetCategoryModel.inventoryModule);
          this.modelForm.controls['maintenanceSchedule'].setValue(this.assetCategoryModel.maintenanceSchedule);
          this.modelForm.controls['childModel'].setValue(this.assetCategoryModel.childModel);
          this.commonService.hideSpinner();
          
          if((this.modelForm.controls['maintenanceSchedule'].value) && (this.modelForm.controls.assetGroupId.value>0)) {
            this.getMaintenanceScheduleList(this.modelForm.controls.assetGroupId.value);
          }
        } else {

        }
      }

    );
    this.formValidation();
  }

  listOfManufacturer(searchValue) {
    this.manufacturerscrollSync = true;
    this.limitCount = (searchValue.term === '' || searchValue.term === null || searchValue.term === undefined) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.manufacturerPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.manufacturerscrollSync = false;
      }
    );
  }

  getManfacturerComboValue(event) {
    if (event === undefined) {
      this.modelForm.get('businessPartnerId').setValue(0);
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];
    } else {
      this.modelForm.get('businessPartnerId').setValue(event.businessPartnerId);

    }
  }

  listOfAllAssetGroup(searchKey) {
    this.assetGroupNamescrollSync = true;
    this.limitCount = (searchKey.term === '' || searchKey.term === null || searchKey.term === undefined) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, this.modelForm.controls['subCategoryId'].value, '', this.limitCount, this.assetGroupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
        this.assetGroupPageNumber = this.getData.pageNumber;
        this.assetGroup = this.getData.dataList;
        this.assetGroupNamescrollSync = false;
      });
  }

  getAssetGroupComboValue(event) {
    if (event) {
      this.modelForm.get('assetGroupId').setValue(event.assetGroupId);
      this.modelForm.get('assetGroupName').setValue(event.assetGroupName);
      if(event.assetGroupName !== this.assetoptimaConstants.notApplicable){
        this.modelForm.get('assetTypeId').setValue(event.assetTypeId);
        this.modelForm.get('assetTypeName').setValue(event.assetTypeName);
        this.modelForm.get('assetCategoryId').setValue(event.assetCategoryId);
        this.modelForm.get('assetCategoryName').setValue(event.assetCategoryName);
        this.modelForm.get('subCategoryId').setValue(event.subCategoryId);
        this.modelForm.get('subCategoryName').setValue(event.assetSubCategoryTO.subCategoryName);
        this.modelForm.get('rateOfDepreciation').setValue(event.assetSubCategoryTO.rateOfDepreciation);
        this.modelForm.get('depreciationMethodId').setValue(event.assetSubCategoryTO.depreciationMethodId);
        this.modelForm.get('depreciationMethodName').setValue(event.assetSubCategoryTO.depreciationMethodName);
        this.modelForm.get('maintainanceThresholdPer').setValue(event.assetSubCategoryTO.maintainanceThresholdPer);
        this.modelForm.get('expectedLifeInYears').setValue(event.expectedLifeInYears);
        this.modelForm.get('scrapValuePer').setValue(event.assetSubCategoryTO.scrapValuePer);
        this.modelForm.get('functionalityName').setValue(event.functionalityName);
        this.modelForm.get('offWarrantyMS').setValue(event.offWarrantyMS);
        this.modelForm.get('qaStrategy').setValue(event.qaStrategy);
        this.modelForm.get('deviceCodeId').setValue(event.deviceCodeId);
        this.modelForm.get('deviceCode').setValue(event.deviceCode);
        this.modelForm.get('deviceConcept').setValue(event.deviceConcept);
        if(this.modelForm.controls.depreciationMethodName.value === 'WRITTEN DOWN'){
          this.enableRateOfDepreciation = true;
        }else{
          this.enableRateOfDepreciation = false;
        }
        this.loadAssetCategoryInfo(event.assetCategoryId);
      }
      this.res = [];
      this.getCustomFieldList(this.modelForm.controls['modelId'].value, event.subCategoryId, 'Edit', 'MODEL');
      this.maintenanceScheduleList.data = [];
      this.maintenanceScheduleListLength = 0;
      this.fetchModelcheckPoints();
    } else {
      this.getSubCategoryComboValue(undefined);
      this.getCategoryComboValue(undefined);
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
      this.modelForm.get('functionalityName').setValue('');
      this.modelForm.get('offWarrantyMS').setValue('');
      this.modelForm.get('qaStrategy').setValue('');
      this.modelForm.get('deviceCodeId').setValue(0);
      this.modelForm.get('deviceCode').setValue('');
      this.modelForm.get('deviceConcept').setValue('');
      this.maintenanceScheduleList.data = [];
      this.maintenanceScheduleListLength = 0;
    }
    this.formValidation();
  }

  setStep(index: number) {
    this.step = index;
  }

  submit() {
    this.commonService.showSpinner();
    // this.uploadModelFlag = true;
    this.modelForm.controls.modelItemList.setValue(this.modelItemsDataSource.data);
    this.modelForm.controls.solutionBankList.setValue(this.solutionBankDataSource.data);
    this.modelForm.controls.additionalInfoList.setValue(this.additionalInfoDataSource.data);
    this.modelForm.controls.selfAnalysisList.setValue(this.selfAnalysisDataSource.data);
    this.modelForm.controls.checkPointsList.setValue(this.addCheckPointsDataSource.data);
    // this.modelForm.controls.modelDocList.setValue(this.documentDataSource);
    this.modelForm.controls.modelModuleList.setValue(this.itemModuleList.data);
    this.modelForm.controls.technicalSpecialistList.setValue(this.specialistDataSource.data)
    if(!this.modelForm.controls.volumeLicensePresent.value){
      this.modelForm.controls.trackIndividualLicense.setValue(false);
    }
    this.modelForm.controls.childModelList.setValue(this.childModelList.data);
    this.model = this.modelForm.getRawValue();
    var obj = {
      'customFields': this.cusFieldHdrList != null ? this.cusFieldHdrList : [],
      'modelObj': this.model
    }

    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateModel, obj).subscribe(
      data => {
        if (data.success) {
          this.uploadModelFlag = false;
          if(localStorage.getItem('navigateToModelCreateScreen') === 'true') {
            localStorage.setItem('modelName', this.modelForm.controls.modelName.value);
            localStorage.setItem('navigateToModelCreateScreen', 'false');
          }
          if(this.displayButton==='Submit'){
            this.modelForm.controls.orgId.setValue(this.userSessionService.getUserOrgId());
            this.modelForm.controls.modelId.setValue(data.responseData);
          }
          if(this.fileUpload.length >  0){
            this.uploadModelDocFile(data.responseData);
          }
          if(this.fileToUpload.length >  0){
            this.uploadModelImgFile(data.responseData);
          }
          else{
            this.commonService.openToastSuccessMessage(data.message);
            this.commonService.hideSpinner();
            this.exit();
          }

        } else {
          this.uploadModelFlag = false;
          this.commonService.openToastErrorMessage(data.message);
          this.commonService.hideSpinner();
        }
      }
    )
  }

  exit() {
    // localStorage.setItem('previousRoute', this.router.url);
    this.router.navigate(['home/assetmaster/assetCategory']);
    // this.locationNavigation.back();
  }
  dialogRefSpare;
  modelItemsAdd() {
   let modelItemList = [...this.modelItemsDataSource.data];
    this.dialogRefSpare = this.dialog.open(SparepartsCreateComponent, {
      height: '500px',
      width: '800px',
      data: {
        'itemTypeForm': this.itemTypeForm.value,
        'modelItemList':modelItemList
      }
    });
    this.dialogRefSpare.disableClose = true;
    this.dialogRefSpare.afterClosed().subscribe(
      data => {
        this.modelItemsDataSource.data.push(...data);        
        this.modelItemsDataSource._updateChangeSubscription();
        this.selectedItemType(undefined);
        this.isChanged();
      });
  }


  documentAddEdit() {
    let dialogRef = this.dialog.open(DocumentCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'modelId': this.modelForm.controls.modelId.value,
        'modelDocData': this.documentDataSource
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if(data.status == true){
          this.fileUpload.push(data.response)
          this.documentDataSource.push(data.response);
          this.modelDocumentTable.renderRows();
          this.commonService.openToastSuccessMessage("Record Added Successfully.");
        }
      });
  }

  selfAnalysis(element, type, rowIndex) {
    let dialogRef = this.dialog.open(SelfanalysisCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'selfAnalysis': element,
        'mode': type
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== null && data !== undefined && data !== '') {
          if (this.selfAnalysisDataSource.data.length != 0) {
            this.selfAnalysisTempPush = this.selfAnalysisDataSource.data;
          }
          if (data.modelSelfCheckId == undefined) data.modelSelfCheckId = 0;
          if (data.modelSelfCheckId > 0) {
            this.selfAnalysisTempPush.splice(rowIndex, 1);
            this.selfAnalysisTempPush.push(data);
            this.selfAnalysisDataSource.data = this.selfAnalysisTempPush;
          } else {
            this.selfAnalysisTempPush.push(data);
            this.selfAnalysisDataSource.data = this.selfAnalysisTempPush;
          }
          this.changeDetectorRefs.detectChanges();
          this.isChanged();
        }
      });
  }

  additionalInfo(element, type, rowIndex) {
    let dialogRef = this.dialog.open(AdditionalinfoCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'additionalInfo': element,
        'mode': type
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== null && data !== undefined && data !== '') {
          if (this.additionalInfoDataSource.data.length != 0) {
            this.additionalInfoTempPush = this.additionalInfoDataSource.data;
          }
          if (data.modelOtherInfoId == undefined) data.modelOtherInfoId = 0;
          if (data.modelOtherInfoId > 0) {
            this.additionalInfoTempPush.splice(rowIndex, 1);
            this.additionalInfoTempPush.push(data);
            this.additionalInfoDataSource.data = this.additionalInfoTempPush;
          } else {
            this.additionalInfoTempPush.push(data);
            this.additionalInfoDataSource.data = this.additionalInfoTempPush;
          }
          this.changeDetectorRefs.detectChanges();
          this.isChanged();
        }
      });
  }

  refreshDocumentInfoTable() {
    let tempArray = this.documentDataSource;
    this.documentDataSource = [];
    for (var i = 0; i < tempArray.length; i++) {
      this.documentDataSource.push(tempArray[i]);
      this.detectorRefs.detach();
    }
    this.isChanged();
    this.detectorRefs.detectChanges();
  }

  solutionBank(element, type, rowIndex) {
    let dialogRef = this.dialog.open(SolutionBankCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'solutionBank': element,
        'mode': type
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== null && data !== undefined && data !== '') {
          if (this.solutionBankDataSource.data.length != 0) {
            this.solutionBankTempPush = this.solutionBankDataSource.data;
          }
          if (data.modelDefectId == undefined) data.modelDefectId = 0;
          if (data.modelDefectId > 0) {
            this.solutionBankTempPush.splice(rowIndex, 1);
            this.solutionBankTempPush.push(data);
            this.solutionBankDataSource.data = this.solutionBankTempPush;
          } else {
            this.solutionBankTempPush.push(data);
            this.solutionBankDataSource.data = this.solutionBankTempPush;
          }
          this.changeDetectorRefs.detectChanges();
          this.isChanged();
        }

      });
  }

  checkPoints(element, type, rowIndex) {
    let dialogRef = this.dialog.open(CheckpointsCreateComponent, {
      height: '400px',
      width: '900px',
      data: {
        'checkPoints': element,
        'mode': type,
        'modelId': this.modelForm.controls.modelId.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== null && data !== undefined && data !== '') {
          if (this.addCheckPointsDataSource.data.length != 0) {
            this.checkPointsTempPush = this.addCheckPointsDataSource.data;
          }
          if (data.modelCheckPtsId == undefined) data.modelCheckPtsId = 0;
          if (data.modelCheckPtsId > 0) {
            this.checkPointsTempPush.splice(rowIndex, 1);
            this.checkPointsTempPush.push(data);
            this.addCheckPointsDataSource.data = this.checkPointsTempPush;
          } else {
            this.checkPointsTempPush.push(data);
            this.addCheckPointsDataSource.data = this.checkPointsTempPush;
          }
          this.isChanged();
          this.changeDetectorRefs.detectChanges();
        }
      });
  }

  uniqueValidation() {
    if(this.modelForm.controls.modelName.value !== ''){
      this.modelForm.controls.modelName.setValue(this.modelForm.controls.modelName.value.trim())
    }if(this.modelForm.controls.modelNo.value !== ''){
      this.modelForm.controls.modelNo.setValue(this.modelForm.controls.modelNo.value.trim())
    }else if(this.modelForm.controls.modelNo.value.replace (/s+/g, ' ').trim () === ''){
      this.modelForm.controls['modelNo'].setValue('');
    }

    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.modelForm.controls.modelName.value != null) ? this.modelForm.controls.modelName.value.toLowerCase() : '')) {

    } else if(this.modelForm.controls.modelName.value.replace (/s+/g, ' ').trim () === ''){
      this.modelForm.controls['modelName'].setValue('');
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.ModelTO";
      constraintData.constraints = {
        'modelName': this.modelForm.controls.modelName.value.trim(),
        'orgId': this.userSessionService.getUserOrgId(),
        'modelNo': this.modelForm.controls.modelNo.value.trim(),
        'businessPartnerId': this.modelForm.controls.businessPartnerId.value
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.modelForm.controls.modelNo.setErrors(Validators.maxLength);
            this.modelForm.controls.modelNo.setErrors({ "notUnique": true });
            this.modelForm.controls.modelName.setErrors({ "notUnique": true });
            this.uniqueModelFlag = true;
          } else {
            this.ErrorMsg = '';
            this.modelForm.controls.modelName.setErrors(null);
            this.modelForm.controls.modelNo.setErrors(null);
            this.uniqueModelFlag = false;
          }
        }
      );
    }
  }

  downloadDocument(filePath: string, contentType: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  fetchListOfModelDocs() {
    this.commonService.commonGetService(this.assetOptimaServices.loadModelDoc, this.modelForm.controls.modelId.value).subscribe(
      (data) => {
        this.documentDataSource = [];
        this.documentDataSource = this.documentDataSource.concat(data.responseData);
        this.isChanged();
      }
    )
  }

  deleteSelfAnalysis(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Self Analysis'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0) {
            this.selfAnalysisTempPush = this.selfAnalysisDataSource.data;
            this.selfAnalysisDataSource.data.splice(index, 1);
            this.selfAnalysisDataSource.data = this.selfAnalysisTempPush;
            this.isChanged();
            this.changeDetectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService(this.assetOptimaServices.deleteModelSelfCheck, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.selfAnalysisTempPush = this.selfAnalysisDataSource.data;
                  this.selfAnalysisDataSource.data.splice(index, 1);
                  this.selfAnalysisDataSource.data = this.selfAnalysisTempPush;
                  this.isChanged();
                  this.changeDetectorRefs.detectChanges();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              });
          }
        }
      });
  }

  deleteAdditionalInfo(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Additional Info'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid == undefined) deleteid = 0;
          if (deleteid <= 0) {
            this.additionalInfoTempPush = this.additionalInfoDataSource.data;
            this.additionalInfoDataSource.data.splice(index, 1);
            this.additionalInfoDataSource.data = this.additionalInfoTempPush;
            this.isChanged();
            this.changeDetectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService(this.assetOptimaServices.deleteModelOtherInfo, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.additionalInfoTempPush = this.additionalInfoDataSource.data;
                  this.additionalInfoDataSource.data.splice(index, 1);
                  this.additionalInfoDataSource.data = this.additionalInfoTempPush;
                  this.isChanged();
                  this.changeDetectorRefs.detectChanges();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              });
          }
        }
      });
  }

  deleteCheckPoints(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Check Points'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0) {
            this.checkPointsTempPush = this.addCheckPointsDataSource.data;
            this.addCheckPointsDataSource.data.splice(index, 1);
            this.addCheckPointsDataSource.data = this.checkPointsTempPush;
            this.isChanged();
            this.changeDetectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService(this.assetOptimaServices.deleteModelCheckPts, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.checkPointsTempPush = this.addCheckPointsDataSource.data;
                  this.addCheckPointsDataSource.data.splice(index, 1);
                  this.addCheckPointsDataSource.data = this.checkPointsTempPush;
                  this.isChanged();
                  this.changeDetectorRefs.detectChanges();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }
  deleteSolutionBank(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Solution Bank'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0) {
            this.solutionBankTempPush = this.solutionBankDataSource.data;
            this.solutionBankDataSource.data.splice(index, 1);
            this.solutionBankDataSource.data = this.solutionBankTempPush;
            this.isChanged();
            this.changeDetectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService(this.assetOptimaServices.deleteModelDefect, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.solutionBankTempPush = this.solutionBankDataSource.data;
                  this.solutionBankDataSource.data.splice(index, 1);
                  this.solutionBankDataSource.data = this.solutionBankTempPush;
                  this.isChanged();
                  this.changeDetectorRefs.detectChanges();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

  //fetch list of asset category

  listOfCategory(searchValue) {
    this.categoryScrollsync = true;
    this.limitCount = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetCategoryCombo, searchValue.term, '', '', this.limitCount, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber , this.assetCategoryName , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.categoryScrollsync = false;
      }
    );
  }
  getCategoryComboValue(event) {
    this.modelForm.controls.subCategoryName.setValue('');
    this.modelForm.controls.subCategoryId.setValue(0);
    this.modelForm.controls.assetGroupName.setValue('');
    this.modelForm.controls.assetGroupId.setValue(0);
    this.modelForm.controls['assetTypeId'].setValue(0);
    this.modelForm.controls['assetTypeName'].setValue('');
    if (event === undefined) {
      this.modelForm.controls['assetCategoryId'].setValue(0);
      this.modelForm.controls['assetCategoryName'].setValue('');
      this.modelForm.controls['specification'].setValue(false);
      this.modelForm.controls['depreciation'].setValue(false);
      this.modelForm.controls['modelItems'].setValue(false);
      this.modelForm.controls['selfAnalysis'].setValue(false);
      this.modelForm.controls['document'].setValue(false);
      this.modelForm.controls['checkList'].setValue(false);
      this.modelForm.controls['solutionBank'].setValue(false);
      this.modelForm.controls['additionalInfo'].setValue(false);
      this.modelForm.controls['technicalSpecelist'].setValue(false);
      this.modelForm.controls['inventoryModule'].setValue(false);
      this.modelForm.controls['maintenanceSchedule'].setValue(false);
      this.modelForm.controls['childModel'].setValue(false);
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
    } else {
      this.modelForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.modelForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
      this.modelForm.controls['specification'].setValue(event.specification);
      this.modelForm.controls['depreciation'].setValue(event.depreciation);
      this.modelForm.controls['modelItems'].setValue(event.modelItems);
      this.modelForm.controls['selfAnalysis'].setValue(event.selfAnalysis);
      this.modelForm.controls['document'].setValue(event.document);
      this.modelForm.controls['checkList'].setValue(event.checkList);
      this.modelForm.controls['solutionBank'].setValue(event.solutionBank);
      this.modelForm.controls['additionalInfo'].setValue(event.additionalInfo);
      this.modelForm.controls['technicalSpecelist'].setValue(event.technicalSpecelist);
      this.modelForm.controls['inventoryModule'].setValue(event.inventoryModule);
      this.modelForm.controls['maintenanceSchedule'].setValue(event.maintenanceSchedule);
      this.modelForm.controls['childModel'].setValue(event.childModel);
    }
    this.formValidation()
  }


  getDepreciation(depMethod) {
    if (depMethod.id == 2) {
      this.noOfYears = true;
    } else {
      this.noOfYears = false;
    }
  }
  getEOL() {
    const Status = this.modelForm.controls['endOfLife'].value;
    if (Status) {
      this.showEndOfLife = true
    } else {
      this.showEndOfLife = false;
    }
  }

  clear() {
    this.assetGroupPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetTypePageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.modelForm.get('assetGroupName').enable();
    this.modelForm.get('assetTypeName').enable();
    this.modelForm.get('assetCategoryName').enable();
    this.modelForm.get('subCategoryName').enable();
    this.modelForm.reset();
    this.modelForm.updateValueAndValidity();
    this.focusModelName.nativeElement.focus();
    this.ngOnInit();
  }
  fileName = [];
  handleFileInput(filesList: any) {
    if(filesList.length <= 4){

    let limit;

    if(this.displayButton === 'Submit')
    {
      limit  = this.files.length+filesList.length;
    }
    else if(this.displayButton==='Update')
    {
      limit  = this.files.length+filesList.length+this.documentImageSource.length;
    }

    if(limit<=4)
    {
      this.files =  [...this.files, ...filesList];
      for(let i=0;i<this.files.length;i++){
        if (((this.files[i].size / 1024) / 1024) > 2) {
          this.files.splice(i,1);
          this.commonService.openToastWarningMessage(this.translateService.instant('IMAGE_SIZE_2_MB'));
        }
      }
    }
    else
    {
      this.commonService.openToastWarningMessage("Maximum Images are 4");
    }

    this.fileToUpload = [];
     if(this.files.length <=4){
      this.fileName = [];
      for(var i=0;i<this.files.length;i++){

        this.fileToUpload[i] = this.files[i];

        if (this.fileToUpload[i].type.split('/')[0] == 'image') {

          if (((this.fileToUpload[i].size / 1024) / 1024) < 2) {

            this.files.forEach((file, j) => {
              let reader = new FileReader();

              reader.onload = (e: any) => {

                if(j==0){
                  this.filesResultList[0]=e.target.result;
                }else if(j==1){
                  this.filesResultList[1]=e.target.result;
                }else if(j==2){
                  this.filesResultList[2]=e.target.result;
                }else if(j==3){
                  this.filesResultList[3]=e.target.result;
                }
              }

              reader.readAsDataURL(file);
          });

            this.fileName.push(this.fileToUpload[i].name.split('.')[0]); 
            this.uploadFlag = true;
          } else {

            this.commonService.openToastWarningMessage(this.translateService.instant('IMAGE_SIZE_2_MB'));
            this.uploadFlag = false;
          }
        } else {
          this.commonService.openToastWarningMessage(this.translateService.instant('CHOOSE_VALID_FILE'));
          this.fileToUpload = null;
        }
      }

      if(this.displayButton === 'Submit'){
        this.count = this.fileToUpload.length;
      }else if(this.displayButton==='Update'){
        this.count = this.fileToUpload.length+this.documentImageSource.length;
      }
     }else{
      this.commonService.openToastWarningMessage("Maximum Images are 4");
     }

    this.imagePath = this.files;
  }else{
    this.commonService.openToastWarningMessage("Maximum Images are 4");
  }
  }

  triggerClickEvent() {
    this.imageUpload.nativeElement.click();
  }

  // Move to Next Tab

  nextStep() {
    if (this.selectedIndex != this.maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  DeleteModelItems(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Model Item'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0 || deleteid == undefined) {
            this.modelItemTempPush = this.modelItemsDataSource.data;
            this.modelItemTempPush.splice(index, 1);
            this.modelItemsDataSource.data = this.modelItemTempPush;
            this.isChanged();
            this.changeDetectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService(this.assetOptimaServices.deleteModelItemInfo, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.modelItemTempPush = this.modelItemsDataSource.data;
                  this.modelItemTempPush.splice(index, 1);
                  this.modelItemsDataSource.data = this.modelItemTempPush;
                  this.isChanged();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

  formValidation() {
    if (this.modelForm.get('subCategoryName').valid && this.modelForm.get('assetCategoryName').valid) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
    return this.formOneValid;
  }

  //fetch list of asset sub category

  listOfSubCategory(searchValue) {
    this.subScrollsync = true;
    this.limitCount = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetSubCategoryCombo, searchValue.term, this.modelForm.controls['assetCategoryId'].value,
      '', this.limitCount, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryName , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryName = this.getData.dataList;
          this.subScrollsync = false;
        });
  }
  getSubCategoryComboValue(event) {
    this.modelForm.controls.assetGroupName.setValue('');
    this.modelForm.controls.assetGroupId.setValue(0);
    this.modelForm.get('functionalityName').setValue('');
    this.modelForm.get('offWarrantyMS').setValue('');
    this.modelForm.get('qaStrategy').setValue('');
    this.modelForm.get('deviceCodeId').setValue(0);
    this.modelForm.get('deviceCode').setValue('');
    this.modelForm.get('deviceConcept').setValue('');
    this.maintenanceScheduleList.data = [];
    this.maintenanceScheduleListLength = 0;
    this.formValidation();
    if (event === undefined) {
      this.modelForm.controls['subCategoryId'].setValue(0);
      this.modelForm.controls['subCategoryName'].setValue('');
      this.modelForm.controls['rateOfDepreciation'].setValue(0);
      this.modelForm.controls['depreciationMethodId'].setValue(0);
      this.modelForm.controls['depreciationMethodName'].setValue('');
      this.modelForm.controls['maintainanceThresholdPer'].setValue(0);
      this.modelForm.controls['expectedLifeInYears'].setValue(0);
      this.modelForm.controls['scrapValuePer'].setValue(0);
      this.enableRateOfDepreciation = false;
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
    } else {
      this.modelForm.controls['rateOfDepreciation'].setValue(event.rateOfDepreciation);
      this.modelForm.controls['depreciationMethodId'].setValue(event.depreciationMethodId);
      this.modelForm.controls['depreciationMethodName'].setValue(event.depreciationMethodName);
      this.modelForm.controls['maintainanceThresholdPer'].setValue(event.maintainanceThresholdPer);
      this.modelForm.controls['expectedLifeInYears'].setValue(event.expectedLifeInYears);
      this.modelForm.get('subCategoryId').setValue(event.subCategoryId);
      this.modelForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.modelForm.get('assetCategoryName').setValue(event.categoryName);
      this.modelForm.controls['assetCategoryId'].setValue(event.categoryId);
      this.modelForm.controls['scrapValuePer'].setValue(event.scrapValuePer);
      if(this.modelForm.controls.depreciationMethodName.value === 'WRITTEN DOWN'){
        this.enableRateOfDepreciation = true;
      }else{
        this.enableRateOfDepreciation = false;
      }
      this.loadAssetCategoryInfo(this.modelForm.controls['assetCategoryId'].value);
      this.modelForm.get('assetGroupName').enable();
      if (event.subCategoryId > 0) {
        this.res = [];
        if(this.headingDisplay == "Edit"){
          this.getCustomFieldList(this.modelForm.controls['modelId'].value, event.subCategoryId, 'edit', 'MODEL');
        }
        else{
          this.getCustomFieldList(this.modelForm.controls['modelId'].value, event.subCategoryId, 'Add', 'MODEL');
        }
      }

    }

  }

  //fetcb list of asset type
  listOfAssetType(searchValue) {
    this.typeScrollsync = true;
    this.limitCount = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetTypeCombo, searchValue.term, this.modelForm.controls['subCategoryId'].value, '', this.limitCount,
      this.assetTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetTypePageNumber , this.assetTypeName , data.responseData.comboList)
          this.assetTypePageNumber = this.getData.pageNumber;
          this.assetTypeName = this.getData.dataList;
          this.typeScrollsync = false;
        }
      );
  }
  getAssetTypeComboValue(event) {
    if (event === undefined) {
      this.modelForm.controls['assetTypeId'].setValue(0);
      this.modelForm.controls['assetTypeName'].setValue('');
      this.assetTypePageNumber = 1;
      this.assetTypeName = [];
      this.getSubCategoryComboValue(undefined);
      this.getCategoryComboValue(undefined);
    } else {
      this.modelForm.get('assetTypeId').setValue(event.assetTypeId);
      this.modelForm.get('assetTypeName').setValue(event.assetTypeName);
      this.modelForm.get('subCategoryId').setValue(event.subCategoryId);
      this.modelForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.modelForm.get('assetCategoryName').setValue(event.assetCategoryName);
      this.modelForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      if(event.assetSubCategoryTO != null){
        this.getSubCategoryComboValue(event.assetSubCategoryTO);
      }
      this.loadAssetCategoryInfo(event.assetCategoryId);
      this.res = [];
      this.getCustomFieldList(this.modelForm.controls['modelId'].value, event.subCategoryId, 'Edit', 'MODEL');
    }
  }
  // mainList: CusFieldHdr[];

  basedOn: string[];
  getCustomFieldList(modelId: number, subCategoryId: number, mode: string, searchBy: string) {
    if (this.modelForm.controls['assetGroupName'].value != this.assetoptimaConstants.notApplicable) {
     this.basedOn = ["GROUP", "MODEL"];
    }else{
      this.basedOn = ["MODEL"];
    }
    this.cusFieldHdr.customHdrId = 0;
    if (subCategoryId > 0) {
      this.cusFieldHdr.assetSubCategoryId = subCategoryId;
    }
    this.cusFieldHdr.customHdrId = modelId;
    this.cusFieldHdr.assetGroupId = this.modelForm.controls.assetGroupId.value;
    this.cusFieldHdr.basedOnDisp = this.basedOn;
    this.cusFieldHdr.basedOn = searchBy;
    //To start loading
    this.commonService.showSpinner();
    this.commonService.commonInsertService(this.assetOptimaServices.fetchListOfAllCustomFields, this.cusFieldHdr).subscribe(
      data => {
        if (data.success) {
          this.cusFieldHdrList = data.responseData;
          this.customFieldLength = data.responseData.length;
          var len = this.cusFieldHdrList.length;
          for (var k = 0; len > k; k++) {
            this.cusFiledHdrTempList.push(this.cusFieldHdrList[k].value);
            if (this.cusFieldHdrList[k].inputType == "CHECKBOX") {
              this.cusFieldHdrList[k].value1 = this.cusFieldHdrList[k].value == 'TRUE' ? true : false;
            } else if (this.cusFieldHdrList[k].inputType == "DATE") {
              this.cusFieldHdrList[k].value1 = this.cusFieldHdrList[k].value;
            }
            if (mode === 'Add') {
              this.cusFieldHdrList[k].customFieldValId = 0;
            }
          }
          let displayValue = '';
          if (len > 0) {
            for (let i = 0; i < this.cusFieldHdrList.length; i++) {
              if ((displayValue != this.cusFieldHdrList[i].displayGroup) || i === 0) {
                this.res.push(this.cusFieldHdrList[i].displayGroup);
              }
              displayValue = this.cusFieldHdrList[i].displayGroup;
            }
          }

          //To stop loading
          this.commonService.hideSpinner();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          //To stop loading
          this.commonService.hideSpinner();
        }
      }, error => {
        //To stop loading
        this.commonService.hideSpinner();
      }
    );
  }
  dateConvert(values, i, labelName, inputType) {

    for (let i = 0; i < this.cusFieldHdrList.length; i++) {
      if ((labelName === this.cusFieldHdrList[i].labelName) && (inputType === this.cusFieldHdrList[i].inputType)) {
        this.cusFieldHdrList[i].value = this.commonService.convertToDateStringyyyy_mm_dd(values);
      }
    }
  }

  getImage(imagePath) {

    this.serverUrl = this.assetoptimaConstants.connectionUrl + "getImage.sams?resourceName=" + imagePath;
    return this.serverUrl;
  }
  deleteCreateImage(index){
    if(index != null){
      this.filesResultList.splice(index, 1);
      this.fileToUpload.splice(index,1);
      this.files.splice(index,1);
      this.count = this.fileToUpload.length;
    }
  }

  deleteImage(modelImageId, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Model Image'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (modelImageId <= 0 || modelImageId == undefined) {

          } else {
            this.commonService.commonGetService(this.assetOptimaServices.deleteModelImage, modelImageId).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.documentImageSource.splice(index, 1);
                  this.isChanged();
                  this.count = this.count - 1;
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

  getDisplayValue(index) {
    let displayGroup = this.cusFieldHdrList[index - 1].displayGroup;
    return displayGroup;
  }

  mainList: CusFieldHdr[];
  getValueFromMainList(displayValue) {    
    this.mainList = [];
    for (let i = 0; i < this.cusFieldHdrList.length; i++) {
      if (displayValue === this.cusFieldHdrList[i].displayGroup) {
        this.mainList.push(this.cusFieldHdrList[i]);
      }
    }

    return this.mainList;

  }

  navigateToModel() {
    // localStorage.setItem('previousRoute', this.router.url);
    // this.locationNavigation.back();
    this.router.navigate(['home/assetmaster/assetCategory']);
  }
  navigateToMaster() {
    // this.locationNavigation.back();
    localStorage.removeItem('previousRoute');
    this.router.navigate(['home/assetmaster/assetCategory']);
  }

  ngOnDestroy(): void {

    if (this.dialogRefSpare != null) {
      this.dialogRefSpare.close();
    }

  }

  listOfUOM(searchTerms) {
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo, '', '','', 10, 1).subscribe(
      (data) => {
        this.uom = data.responseData.comboList;
      }
    );
  }

  listOfAllAssetGroupForChildAsset(searchKey) {
    this.limitCount = (searchKey.term === '' || searchKey.term === null || searchKey.term === undefined) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, '', '', this.limitCount, this.assetGroupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupChildPageNumber , this.childAssetGroupNameCombo , data.responseData.comboList)
        this.assetGroupChildPageNumber = this.getData.pageNumber;
        this.childAssetGroupNameCombo = this.getData.dataList;
      });
  }

  getAssetGroupComboValueForChildAsset(event) {
    if (event != null) {
      this.childAssetForm.get('childAssetGroupId').setValue(event.assetGroupId);
      this.childAssetForm.get('childAssetGroupName').setValue(event.assetGroupName);
      this.childAssetForm.get('childAssetModelName').setValue(this.modelForm.controls.modelName.value);
      this.childAssetForm.get('pmFrequency').setValue(event.frequency1);
      this.childAssetForm.get('paFrequency').setValue(event.frequency2);
      this.childAssetForm.get('qaFrequency').setValue(event.frequency3);
      if (this.modelForm.controls.modelId.value <= 0 && this.childAssetList.length <= 0) {
        this.childAssetForm.controls.childAssetCode.setValue('A');
      } else {
        this.childAssetForm.controls.childAssetCode.setValue(String.fromCharCode(64 + (this.childAssetList.length + 1)));
      }

    } else {
      this.childAssetForm.get('childAssetGroupId').setValue(0);
      this.childAssetForm.get('childAssetGroupName').setValue('');
      this.childAssetGroupNameCombo = [];
      this.assetGroupChildPageNumber = 1;
    }
  }

  addChildAsset() {

    this.childAssetList.push(this.childAssetForm.getRawValue());
    this.changeDetectorRefs.detectChanges();
    this.table1.renderRows();
    this.clearAssetGroupCombo();
  }

  clearAssetGroupCombo() {
    this.childAssetForm.get('childAssetGroupId').setValue(0);
    this.childAssetForm.get('childAssetGroupName').setValue('');
  }

  deleteChildAsset(index, childAssetId) {

    if (childAssetId <= 0) {
      this.childAssetList.splice(index, 1);
      this.changeDetectorRefs.detectChanges();
      this.table1.renderRows();
      this.commonService.openToastSuccessMessage('DELETE_DATA_SUCCESS');
    } else {
      this.commonService.commonGetService(this.assetOptimaServices.deleteModelChildAsset, childAssetId).subscribe(
        data => {
          if (data.success) {
            this.childAssetList.splice(index, 1);
            this.commonService.openToastSuccessMessage(data.message);
            this.changeDetectorRefs.detectChanges();
            this.table1.renderRows();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        });
    }
  }

  listOfInstallationType(searchValue) {
    this.scrollsyncInstallationType = true;
    this.recordsPerPageForCombo = Number((searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '');
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllInstallationTypeCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.installationTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.installationTypePageNumber , this.installationTypeCombo , data.responseData.comboList)
          this.installationTypePageNumber = this.getData.pageNumber;
          this.installationTypeCombo = this.getData.dataList;
          this.scrollsyncInstallationType = false;
        });
  }

  addCheckPointParameter() {
    let index = this.commonService.getIndexOfTheItem(this.addCheckPointsDataSource.data, true, 'parameterId',  this.checkPointsModelForm.controls.parameterId.value);
    if(index == -1 ) {
      this.addCheckPointsDataSource.data.push(this.checkPointsModelForm.value);
      this.modelForm.controls.checkPointsList.setValue(this.addCheckPointsDataSource.data);
      this.isChanged();
      this.changeDetectorRefs.detectChanges();
      this.tableCheckList.renderRows();
      this.clearCheckPoint();
      this.checkPointsModelForm.controls.parameterName.disable();
      this.checkPointsModelForm.controls.active.setValue(true);
    } else{
      this.commonService.openToastWarningMessage("Parameter Type and Name already exist!")
    }

  }

  clearCheckPoint() {
    this.checkPointsModelForm.controls.parameterName.setValue('');
    this.checkPointsModelForm.controls.parameterTypeName.setValue('');
    this.checkPointsModelForm.controls.parameterTypeId.setValue(0);


  }

  listOfParameterType(searchValue) {
    this.scrollsyncParameterType = true;
    this.recordsPerPageForParameter = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllParameterType, searchValue.term, 0, '',
      this.recordsPerPageForParameter, this.parameterTypePageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.parameterTypePageNumber , this.parameterTypeCombo , data.responseData.comboList)
          this.parameterTypePageNumber = this.getData.pageNumber;
          this.parameterTypeCombo = this.getData.dataList;
          this.scrollsyncParameterType = false;
        }
      );
  }

  fetchIdOfParameterType(event) {
    if (event === undefined) {
      this.checkPointsModelForm.controls.parameterTypeNameDisp.setValue('');
      this.checkPointsModelForm.controls.parameterTypeName.setValue('');
      this.checkPointsModelForm.controls.parameterTypeId.setValue(0);
      this.checkPointsModelForm.controls.parameterName.disable();
      this.checkPointsModelForm.controls.parameterName.setValue('');
      this.parameterTypeCombo = [];
      this.parameterTypePageNumber = 1;
    } else {
      this.parameterNameCombo = [];
      this.parameterNamePageNumber = 1;
      this.parameterGroupCombo = [];
      this.parameterGroupPageNumber = 1;
      this.checkPointsModelForm.controls.parameterTypeName.setValue(event.parameterTypeName);
      this.checkPointsModelForm.controls.parameterTypeId.setValue(event.parameterTypeId);
      this.checkPointsModelForm.controls.parameterTypeNameDisp.setValue(event.parameterTypeNameDisp);
      this.checkPointsModelForm.controls.parameterName.setValue('');
      this.checkPointsModelForm.controls.parameterName.enable();
    }
  }

  listOfParameterName(searchValue) {
    this.scrollsyncParameterName = true;
    this.recordsPerPageForParameter = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllParameterName, searchValue.term, this.checkPointsModelForm.controls.parameterGroupId.value > 0 ? this.checkPointsModelForm.controls.parameterGroupId.value : 0, this.checkPointsModelForm.controls.parameterTypeId.value,
      this.recordsPerPageForParameter, this.parameterNamePageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.parameterNamePageNumber , this.parameterNameCombo , data.responseData.comboList)
          this.parameterNamePageNumber = this.getData.pageNumber;
          this.parameterNameCombo = this.getData.dataList;
          this.scrollsyncParameterName = false;
        }
      );
  }

  fetchIdOfParameterName(event) {
    if (event === undefined) {
      this.checkPointsModelForm.controls.parameterName.setValue('');
      this.checkPointsModelForm.controls.parameterId.setValue(0);
      this.checkPointsModelForm.controls.uomCd.setValue('');
      this.checkPointsModelForm.controls.defaultValue.setValue('');
      this.checkPointsModelForm.controls.inputType.setValue('');
      this.checkPointsModelForm.controls.minAllowedValue.setValue('');
      this.checkPointsModelForm.controls.maxAllowedValue.setValue('');
      this.parameterNameCombo = [];
      this.parameterNamePageNumber = 1;
    } else {
      this.checkPointsModelForm.controls.parameterName.setValue(event.parameterName);
      this.checkPointsModelForm.controls.parameterId.setValue(event.parameterId);
      this.checkPointsModelForm.controls.uomCd.setValue(event.uomCd);
      this.checkPointsModelForm.controls.defaultValue.setValue(event.defaultValue);
      this.checkPointsModelForm.controls.inputType.setValue(event.inputType);
      this.checkPointsModelForm.controls.minAllowedValue.setValue(event.minAllowedValue);
      this.checkPointsModelForm.controls.maxAllowedValue.setValue(event.maxAllowedValue);
      this.checkPointsModelForm.controls.parameterGroupName.setValue(event.parameterGroupName);
    }
  }

  listOfParameterGroup(searchValue) {
    this.scrollsyncParameterGroup = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllParameterGroup, searchValue.term, '', '', this.limitCount, this.parameterGroupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.parameterGroupPageNumber, this.parameterGroupCombo, data.responseData.comboList)
        this.parameterGroupPageNumber = this.getData.pageNumber;
        this.parameterGroupCombo = this.getData.dataList;
        this.scrollsyncParameterGroup = false;
      }
    );
  }

  fetchIdOfParameterGroup(event) {
    if (event === undefined) {
      this.parameterNameCombo = [];
      this.checkPointsModelForm.controls.parameterGroupName.setValue('');
      this.checkPointsModelForm.controls.parameterGroupId.setValue(0);
      this.checkPointsModelForm.controls.parameterName.setValue('');
      
      this.parameterGroupCombo = [];
      this.parameterGroupPageNumber = 1;
    } else {
      this.parameterNameCombo = [];
      this.checkPointsModelForm.controls.parameterGroupName.setValue(event.parameterGroupName);
      this.checkPointsModelForm.controls.parameterGroupId.setValue(event.parameterGroupId);
      this.checkPointsModelForm.controls.parameterName.setValue('');
      this.checkPointsModelForm.controls.parameterName.enable();
    }
  }


  listOfModuleItem(searchValue) {
    this.scrollModuleItemNameSync = true;
    this.recordsPerPageForParameter = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemModule, searchValue.term, '', '',
      this.recordsPerPageForParameter, this.itemModuleNamePageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.itemModuleNamePageNumber , this.itemModuleCombo , data.responseData)
          this.itemModuleNamePageNumber = this.getData.pageNumber;
          this.itemModuleCombo = this.getData.dataList;
          this.scrollModuleItemNameSync = false;
        }
      );
  }

  selectedModuleItemName(event) {
    this.alreadyPresentItems = '';
    if (event === undefined) {
      this.itemModuleNamePageNumber = 1;
      this.itemModuleFormGroup.controls.itemModuleId.setValue('');
      this.itemModuleFormGroup.controls.itemModuleName.setValue(null);
      this.itemModuleCombo = [];
    } else {
      this.itemModuleFormGroup.controls.itemModuleId.setValue(event.itemModuleId);
      this.itemModuleFormGroup.controls.itemModuleName.setValue(event.itemModuleName);      
    }
  }

  addItemModuleToList() {    
    this.commonService.commonGetService(this.assetOptimaServices.loadItemModuleInfoByItemModuleId, this.itemModuleFormGroup.controls.itemModuleId.value,'MODULE ADD')
      .subscribe(
        data => {
          this.moduleTempList = this.itemModuleList.data;
          this.modelModule = new ModelModule();
          this.modelModule.modelId = 0;
          this.modelModule.modelItemId = 0;
          this.modelModule.itemModuleId = data.responseData.itemModuleId;
          this.modelModule.itemModuleName = data.responseData.itemModuleName;
          this.modelModule.itemModuleList = data.responseData.itemModuleList;
          this.modelModule.active=data.responseData.active;

          const itemModuleIdValid = this.itemModuleList.data.findIndex(data => data.itemModuleId === this.itemModuleFormGroup.value.itemModuleId) === -1;
    
          if (itemModuleIdValid) {
            this.moduleTempList.push(this.modelModule);            
          }else{
            this.commonService.openToastWarningMessage(this.itemModuleFormGroup.controls.itemModuleName.value + ' Is Already Added.');
          }
          this.itemModuleList.data = this.moduleTempList;
          this.length = this.itemModuleList.data.length;
          this.itemModuleFormGroup.reset();
          this.isChanged();
        }, error => {
          this.commonService.openToastErrorMessage("Failed to fetch List.")
        }
      );
  }

  specialistDialogRef;

  addOeEditSpecialist(specialist, mode, rowIndex) {
    this.specialistDialogRef = this.dialog.open(TechnicalSpecialistPopupComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'specialist': specialist,
        'mode': mode
      }
    });
    this.specialistDialogRef.disableClose = true;
    this.specialistDialogRef.afterClosed().subscribe(
      data => {
        if (data === undefined) {
          this.specialistDialogRef.close();

        } else {
          if (data != null || data != undefined || data != '') {
            if (this.specialistDataSource.data.length != 0) {
              this.specialistListTempPush = this.specialistDataSource.data;
            }
            if (data.modelSpecialistId == undefined) data.modelSpecialistId = 0;
            if (data.modelSpecialistId > 0) {
              this.specialistListTempPush.splice(rowIndex, 1);
              this.specialistListTempPush.push(data);
              this.specialistDataSource.data = this.specialistListTempPush;
            } else {
              this.specialistListTempPush.push(data);
              this.specialistDataSource.data = this.specialistListTempPush;
            }
            this.isChanged();
            this.specialist.renderRows();
            this.changeDetectorRefs.detectChanges();
          }
          this.specialistDialogRef.close();
        }
      });
  }

  openManufactureCreateScreen() {
    localStorage.setItem('previousRoute', this.router.url);
    const manufacturerPath = ['home/settingsmaster/businessPartnerCreate/'+ 0 + '/' + 'add'];
    localStorage.setItem('localModelForm', JSON.stringify(this.modelForm.value));
    this.router.navigate(manufacturerPath);
  }

  loadDepreciationMethodComboData(searchValue) {
    this.scrollsyncDepreciationMethod = true;
    this.recordsPerPageForCombo1 = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllDepreciationCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo1, this.depreciationMethodPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.depreciationMethodPageNumber , this.depreciationMethodCombo , data.responseData.comboList)
          this.depreciationMethodPageNumber = this.getData.pageNumber;
          this.depreciationMethodCombo = this.getData.dataList;
          this.scrollsyncDepreciationMethod = false;
        }
      );
  }

  selectedDepreciationMethodData(event) {
    if (event === undefined) {
      this.modelForm.controls.depreciationMethodId.setValue(0);
      this.depreciationMethodPageNumber = 1;
      this.depreciationMethodCombo = [];
      this.enableRateOfDepreciation = false;
      this.modelForm.controls.rateOfDepreciation.setValue(0);
    } else {
      this.modelForm.controls.depreciationMethodId.setValue(event.assetDepreciationMethodId);
      if (event.assetDepreciationMethodName === 'STRAIGHT LINE') {
        this.enableRateOfDepreciation = false;
        this.modelForm.controls.rateOfDepreciation.setValue(0);
      } else {
        this.enableRateOfDepreciation = true;
      }
    }
  }

  isChanged(){
    if(this.headingDisplay == "Edit"){
      this.enableUpdate = true;
    }
  }

  deleteModuleForModel(deleteid, index) {    
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Module'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0) {
            this.moduleTempList = this.itemModuleList.data;
            this.itemModuleList.data.splice(index, 1);
            this.itemModuleList.data = this.moduleTempList;
            this.isChanged();
            this.changeDetectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService(this.assetOptimaServices.deleteModelModule, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.moduleTempList = this.itemModuleList.data;
                  this.itemModuleList.data.splice(index, 1);
                  this.itemModuleList.data = this.moduleTempList;
                  this.isChanged();
                  this.changeDetectorRefs.detectChanges();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

  toggleRow(element: any){    
    this.expandedElement = this.expandedElement === element ? null : element;    
  }

  listofItemType(searchTerms) {
    this.scrollItemTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber , this.itemTypeCombo , data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemTypeCombo = this.getData.dataList;
        this.scrollItemTypesync = false;
      }
    );
  }

  selectedItemType(event){
    if(event===undefined){
      this.itemTypeForm.controls.itemTypeId.setValue(0);
      this.itemTypeForm.controls.itemTypeName.setValue(null);
      this.itemTypePageNumber=1;
      this.itemTypeCombo=[];
    }else{
      this.itemTypeForm.controls.itemTypeId.setValue(event.itemTypeId);
      this.itemTypeForm.controls.itemTypeName.setValue(event.itemTypeName);
    }
  }

  updateBtnflag(){
    this.enableUpdate = true;    
  }

  uploadModelDocFile(modelId) {

    let formData: FormData = new FormData();
   for(let i=0;i<this.fileUpload.length;i++){ 
    formData.append('modelDocImage'+i, this.fileUpload[i].modelDocImage);
    formData.append('docType'+i, this.fileUpload[i].docType);
    formData.append('docName'+i, this.fileUpload[i].docName);
   } 

   formData.append('modelId', modelId);
   formData.append('userId', this.userSessionService.getUserId());
   formData.append('orgId', this.userSessionService.getUserOrgId());
   formData.append('count', this.fileUpload.length);

    //To start loading
    this.commonService.commonFileUpload(this.assetOptimaServices.saveOrUpdateModelDoc, formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
             this.navigateToModel();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
        // To end loading
      }, error => {
        this.commonService.openToastErrorMessage(this.assetoptimaConstants.serverError); 
        //To end loading
      }
    );
  }


  
  deleteDocument(deleteid,docName, index) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Document'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if(deleteid>0){
            this.commonService.commonGetService(this.assetOptimaServices.deleteModelDoc, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.documentDataSource.splice(index, 1);
                  this.documentDataSource.renderRows();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
          else{
            this.fileUpload.splice((this.fileUpload.findIndex(data=> data.docName === docName)),1);
            this.documentDataSource.splice(index,1);
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            this.documentDataSource.renderRows();
          }
        }
      });
  }

  subLoader: boolean = false;
  getMaintenanceScheduleList(assetGroupId: number) {
    this.subLoader = true;
    this.maintenanceScheduleList.data = [];
    this.maintenanceScheduleListLength = 0;
    this.commonService.commonGetService(this.assetOptimaServices.fetchAssetGroupMaintenanceScheduleByAgId, assetGroupId).subscribe(
      (data) => {
        if(data.success) {
          this.subLoader = false;
          this.maintenanceScheduleList.data = data.responseData;
          this.maintenanceScheduleListLength = this.maintenanceScheduleList.data.length;
        } else {
          this.subLoader = false;
          this.commonService.openToastWarningMessage('Error occurred while fetching Maintenance Schedule list.');
        }
      }
    );
  }

  listOfAllAssetGroupForChild(searchKey) {
    this.childAssetGroupScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term,'', '',this.limitCount, this.childAssetGroupPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.childAssetGroupPageNumber , this.childAssetGroupNameCombo , data.responseData.comboList)
      this.childAssetGroupPageNumber = this.getData.pageNumber;
      this.childAssetGroupNameCombo = this.getData.dataList;
      this.childAssetGroupScrollsync = false;
    });
  }

  getAssetGroupComboValueForChildModel(event) {
    if (event != null) {
      this.childModelForm.controls.childAssetGroupId.setValue(event.assetGroupId);
      this.childModelForm.controls.childAssetGroupName.setValue(event.assetGroupName);
      // this.childModel.get('pmFrequency').setValue(event.frequency1);
      // this.childModel.get('paFrequency').setValue(event.frequency2);
      // this.childModel.get('qaFrequency').setValue(event.frequency3);
    } else {
      this.childModelForm.controls.childAssetGroupId.setValue(0);
      this.childModelForm.controls.childAssetGroupName.setValue(null);
      this.childAssetGroupNameCombo = [];
      this.childAssetGroupPageNumber = 1;
      
    }
    this.modelCombo = [];
    this.modelComboPageNumber = 1;
    this.childModelForm.controls.childModelId.setValue(0);
    this.childModelForm.controls.childModelName.setValue(null);
  }
  

  listOfAllModelChild(searchKey) {
    this.scrollsyncModelChild=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    // const businessPartnerId = this.childAssetPreInwardAsset.controls.businessPartnerId.value
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllModelCombo, (this.commonService.fetchSearchValue(searchKey)) ,'',this.childModelForm.controls.childAssetGroupId.value>0?this.childModelForm.controls.childAssetGroupId.value:'', this.limitCount, this.modelComboPageNumber).subscribe(
    (data)=>{
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelCombo = this.getData.dataList;
      this.scrollsyncModelChild=false;
    });
  }

  getModelComboValueChild(event){
    this.modelComboPageNumber=1;
    this.modelCombo=[];
    if (event === undefined) {
      this.modelComboPageNumber=1;
      this.modelCombo=[];
      this.childModelForm.controls.childModelId.setValue(0);
      this.childModelForm.controls.childModelName.setValue(null);
      this.childModelForm.controls.businessPartnerId.setValue(0);
      this.childModelForm.controls.businessPartnerName.setValue(null);
    }else{
      // this.childAssetPreInwardAsset.controls.businessPartnerName.setValue(event.businessPartnerName);
      this.childModelForm.controls.childModelId.setValue(event.modelId);
      this.childModelForm.controls.childModelName.setValue(event.modelName);
      this.childModelForm.controls.businessPartnerId.setValue(event.businessPartnerId);
      this.childModelForm.controls.businessPartnerName.setValue(event.businessPartnerName);
      this.childModelForm.controls.childAssetGroupId.setValue(event.assetGroupId);
      this.childModelForm.controls.childAssetGroupName.setValue(event.assetGroupName);
    }
    
  }


  addChildModel() {
    this.tempChildModelList = this.childModelList.data;
    let index = this.commonService.getIndexOfTheItem(this.tempChildModelList, true, 'childModelId',  this.childModelForm.controls.childModelId.value);
    if(index === -1) {
      this.tempChildModelList.push(this.childModelForm.getRawValue());
      this.childModelList.data = this.tempChildModelList;
      this.childModelListLength = this.childModelList.data.length;
      this.assetGroupChildPageNumber = 1;
      this.childAssetGroupNameCombo = [];
      this.modelComboPageNumber = 1;
      this.modelCombo=[];
      this.childModelForm.controls.childModelId.setValue(0);
      this.childModelForm.controls.childModelName.setValue('');
      this.childModelForm.controls.childAssetGroupId.setValue(0);
      this.childModelForm.controls.childAssetGroupName.setValue('');
      this.childModelForm.controls.businessPartnerId.setValue(0);
      this.childModelForm.controls.businessPartnerName.setValue('');
    } else {
      this.commonService.openToastWarningMessage(this.childModelForm.controls.childModelName.value +' is already added');
    }
  }

  childModelDeleteDialogRef;
  deleteChildModel(index, element) {
    this.childModelDeleteDialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Child Model: ' + element.childModelName
      }
    });
    this.childModelDeleteDialogRef.disableClose = true;
    this.childModelDeleteDialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            if(element.modelChildId > 0) {
              this.commonService.commonDeleteService(this.assetOptimaServices.deleteModelChild, element.modelChildId).subscribe(
                data => {
                  if(data.success) {
                    this.tempChildModelList = this.childModelList.data;
                    this.tempChildModelList.splice(index, 1);
                    this.childModelList.data = this.tempChildModelList;
                    this.childModelListLength = this.childModelList.data.length;
                    this.commonService.openToastSuccessMessage(data.message);
                  } else {
                    this.commonService.openToastWarningMessage(data.message);
                  }
                }
              )
            } else {
              this.tempChildModelList = this.childModelList.data;
              this.tempChildModelList.splice(index, 1);
              this.childModelList.data = this.tempChildModelList;
              this.childModelListLength = this.childModelList.data.length;
              this.commonService.openToastSuccessMessage("Record Deleted Successfully");
            }
        }
    });
  }

  fetchModelcheckPoints(){
      if(this.modelForm.controls.assetGroupId.value > 0){
        this.modelCheckPoint.assetGroupId = this.modelForm.controls.assetGroupId.value;
        this.modelCheckPoint.modelId = this.modelForm.controls.modelId.value;
        this.modelCheckPoint.pageNumber = Number(this.pageIndex);
        this.modelCheckPoint.recordsPerPage = Number(this.pageSize);
        this.commonService.commonListService('fetchModelAndAssetGroupCheckPoints.sams',this.modelCheckPoint).subscribe(
          data => {
            if(data.success){
              this.addCheckPointsDataSource.data = data.responseData.dataList;
              this.checkListlength = data.responseData.dataTotalRecCount;
            } else{
            }
          }
        );
      }
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchModelcheckPoints();
  }

  // Upload Model Image
  uploadModelImgFile(modelId) {

    let formData: FormData = new FormData();
   for(let i=0;i<this.fileToUpload.length;i++){ 
    formData.append('modelImage'+i, this.fileToUpload[i]);
    formData.append('imgType'+i, "");
    formData.append('imgName'+i, this.fileName[i]);
   } 

   formData.append('modelId', modelId);
   formData.append('userId', this.userSessionService.getUserId());
   formData.append('orgId', this.userSessionService.getUserOrgId());
   formData.append('count', this.fileToUpload.length);

    //To start loading
    this.commonService.commonFileUpload("saveOrUpdateModelImage.sams", formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
             this.navigateToModel();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
        // To end loading
      }, error => {
        this.commonService.openToastErrorMessage(this.assetoptimaConstants.serverError); 
        //To end loading
      }
    );
  }

}
