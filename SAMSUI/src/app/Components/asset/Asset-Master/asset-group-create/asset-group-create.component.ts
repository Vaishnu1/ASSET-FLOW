import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Location } from '@angular/common';
import { AssetGroupModel } from 'src/app/Model/master/asset-group';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CusFieldHdr } from 'src/app/Model/master/cusFieldHdr';
import {  MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-asset-group-create',
  templateUrl: './asset-group-create.component.html',
  styleUrls: ['./asset-group-create.component.css']
})
export class AssetGroupCreateComponent implements OnInit {

  assetGroupForm: FormGroup;
  statutoryRequirementFormGroup: FormGroup;
  maintenanceScheduleFormGroup: FormGroup;
  assetGroupChkPtsFormGroup: FormGroup;

  @ViewChild('assetGroupFocus') assetGroupFocusSet: ElementRef;
  @ViewChild('matCheckList') tableCheckList: MatTable<any>;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay: string;
  displayButton: string;

  assetCategoryName: any = [];
  subCategoryName: any = [];
  assetTypeName: any = [];
  assetCustomFieldValue: any = [];
  certificateNameList: any = [];
  statutoryRequirementsList = new MatTableDataSource<any>();
  maintenanceScheduleList = new MatTableDataSource<any>();
  checkPointList = new MatTableDataSource<any>();

  disableClear: boolean = false;
  uploadFlagAssetGroup: boolean = false;
  scrollsyncCertificateCombo: boolean = false;
  allValidRequiredStagesAreNotEmpty: boolean = true;

  //MODEL
  public assetGroupModel: AssetGroupModel;
  ErrorMsg: String='';
  ErrorMsgCode:string='';
  tempValue: String = '';
  tempValue1:string='';
  customFieldsLength: number=0;
  certificatePageNumber: number;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  assetCategoryPageNumber: number;
  assetSubCategorPageNumber: number;
  assetTypePageNumber: number;
  scrollsync: boolean = false;
  limitCount: string = '';

  modeDisplay:boolean = false;
  categoryScrollsync:boolean = false;
  subScrollsync:boolean = false;
  typeScrollsync:boolean = false;
  requirementStageIsNoEmpty: boolean = false;
  subLoader: boolean = false;

  selectedIndex: number;

  cusFieldHdr: CusFieldHdr;
  cusFieldHdrList: CusFieldHdr[];
  tempList: any[] = [];

  length: number=0;
  statutoryReqListLength: number = 0;

  required_stage = "Select on mandatory";

  displayedColumns = ['sno', 'certificateName', 'required', 'mandatoryRequiredStage', 'active','action'];
  getData: getData;
  enableUpdate: boolean = false;

  //DEVICE CODE LIST
  scrollDeviceCodesync: boolean = false;
  deviceCodePageNumber: number;
  deviceCodeList: any = [];

  //FUNCTIONALITY LIST
  scrollFunctionalitysync: boolean = false;
  functionalityPageNumber: number;
  functionalityList: any = [];

  //MAINTENANCE STRATEGY
  scrollMSsync: boolean = false;
  maintenanceStrategyPageNumber: number;
  offWarrantyMSList: any = [];
  
  
  //QA STRATEGY
  scrollQaStrategysync: boolean = false;
  offWarrantyMSPageNumber: number;
  maintenanceStrategyList: any = [];

  //MAINTENANCE SCHEDULE TYPES
  scrollScheduleTypesync: boolean = false;
  scheduleTypePageNumber: number;
  scheduleTypeList: any = [];

  //MAINTENANCE SCHEDULE FREQUENCY
  scrollScheduleFrequencysync: boolean = false;
  scheduleFrequencyPageNumber: number;
  scheduleFrequencyList: any = [];

  //ASSET GROUP SCHEDULE MAINTENANCE
  displayedColumnsMaintSchedule = ['sno', 'maintenanceScheduleTypeName', 'maintenanceScheduleFrequencyName', 'updatedBy', 'updatedDt', 'action'];
  tempListAgMs: any[] = [];
  maintenanceScheduleListLength: number = 0;

  //PARAMETER TYPE
  checkPointsDisCol = ['sno', 'parameterName', 'parameterGroupName', 'parameterTypeName', 'uom', 'inputType', 'defaultValue', 'minAllowedValue', 'maxAllowedValue', 'action'];
  parameterTypeCombo: any = [];
  scrollsyncParameterType: boolean = false;
  parameterTypePageNumber: number;

  //PARAMETER GEROUP
  scrollsyncParameterGroup: boolean = false;
  parameterGroupPageNumber: number;
  parameterGroupCombo: any = [];

  //PARAMETER
  scrollsyncParameterName: boolean = false;
  parameterNamePageNumber: number;
  parameterNameCombo: any = [];

  tempParameterList: any[] = [];
  checkPointListLength: number = 0;

  constructor(
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    public samsConstants: AssetOptimaConstants, private activatedRoute: ActivatedRoute,
    private locationNavigate: Location,
    private userSession: UserSessionService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.assetCategoryPageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.assetTypePageNumber = 1;
    this.certificatePageNumber = 1;
    this.cusFieldHdr=new CusFieldHdr();
    this.deviceCodePageNumber = 1;
    this.functionalityPageNumber = 1;
    this.maintenanceStrategyPageNumber = 1;
    this.offWarrantyMSPageNumber = 1;
    this.scheduleTypePageNumber = 1;
    this.scheduleFrequencyPageNumber = 1;
    this.parameterTypePageNumber = 1;
    this.parameterGroupPageNumber = 1;
    this.parameterNamePageNumber = 1;
  }



  ngOnInit() {
  //  document.getElementById('commonFooter').style.display = 'none';
    this.selectedIndex = 0;
    this.assetGroupForm = new FormGroup({
      assetGroupId: new FormControl(0),
      assetGroupName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      assetGroupCode: new FormControl('', [Validators.maxLength(5)]),
      assetCategoryName: new FormControl(null, Validators.required),
      subCategoryName: new FormControl(null, Validators.required),
      assetTypeName: new FormControl(null),
      assetGroupDesc: new FormControl('', [Validators.maxLength(1000)]),
      assetCategoryId: new FormControl(''),
      subCategoryId: new FormControl(''),
      assetTypeId: new FormControl(''),
      assetCustomFieldValue: new FormControl(''),
      //COMMON OBJECTS
      createdDt: new FormControl(''),
      createdBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      orgId: new FormControl(''),
      active: new FormControl(true),
      assetGroupStatutoryReqList: new FormControl([]),
      deviceCodeId: new FormControl(0),
      deviceCode: new FormControl(null),
      deviceConcept: new FormControl(''),
      expectedLifeInYears: new FormControl(0.0 ,[Validators.pattern(this.samsConstants.percentageValidation)]),
      functionalityId: new FormControl(0),
      functionalityName: new FormControl(null),
      offWarrantyMS: new FormControl(null),
      qaStrategy: new FormControl(null),
      assetGroupMaintScheduleList: new FormControl([]),
      assetGroupChkPtsList: new FormControl([])
    })

    this.statutoryRequirementFormGroup = new FormGroup({
      assetGroupStatutoryId: new FormControl(0),
      orgId: new FormControl(0),
      certificateId: new FormControl(0),
      assetGroupId: new FormControl(0),
      certificateName : new FormControl(null, Validators.required),
      mandatoryRequiredStage: new FormControl(''),
      mandatory: new FormControl('OPTIONAL'),
      required: new FormControl(false),
      active: new FormControl(false),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl('')
    });
    
    this.maintenanceScheduleFormGroup = new FormGroup({
      assetGroupMaintenanceScheduleId: new FormControl(0),
      orgId: new FormControl(0),
      assetGroupId: new FormControl(0),
      maintenanceScheduleTypeId: new FormControl(0),
      maintenanceScheduleTypeName: new FormControl(null, Validators.required),
      maintenanceScheduleFrequencyId: new FormControl(0),
      maintenanceScheduleFrequencyName: new FormControl(null, Validators.required),
      active: new FormControl(true),
      createdBy: new FormControl(this.userSession.getUserEmpName()),
      createdDt: new FormControl(new Date()),
      updatedBy: new FormControl(this.userSession.getUserEmpName()),
      updatedDt: new FormControl(new Date()),
      updatedDtDisp:new FormControl(this.commonService.convertToDateStringdd_mm_yyyy(new Date()))
    });

    this.assetGroupChkPtsFormGroup = new FormGroup({
      assetGroupChkPtsId: new FormControl(0),
      orgId: new FormControl(0),
      assetGroupId: new FormControl(0),
      parameterId: new FormControl(0),
      parameterName: new FormControl(null),
      parameterTypeId: new FormControl(0),
      parameterTypeName: new FormControl(null),
      parameterGroupId: new FormControl(0),
      parameterGroupName: new FormControl(null),
      active: new FormControl(true),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      uomCd: new FormControl(''),
      defaultValue: new FormControl(''),
      inputType: new FormControl(''),
      minAllowedValue: new FormControl(''),
      maxAllowedValue: new FormControl(''),
      parameterTypeNameDisp: new FormControl('')

    });
    this.assetGroupChkPtsFormGroup.controls.parameterName.disable();
    this.assetGroupForm.controls.deviceConcept.disable();

    this.statutoryRequirementsList.data = [];
    this.maintenanceScheduleList.data = [];
    this.checkPointList.data = [];
    this.commonService.setFormFocus(this.assetGroupFocusSet);
    this.validateEditMode();
  }


  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.headingDisplay = "Create";
          this.displayButton = "Submit";
        } else {
          if(mode=='view'){
            this.modeDisplay=true;
            this.assetGroupForm.disable();
            this.statutoryRequirementFormGroup.disable();
            this.maintenanceScheduleFormGroup.disable();
            this.assetGroupChkPtsFormGroup.disable();
            this.headingDisplay = "View";
          }else{
            this.headingDisplay = "Edit";
            this.displayButton = "Update";
            this.disableClear = true;
          }
          this.commonService.commonGetService(this.assetOptimeMthnd.loadAssetGroupInfo, primaryId).subscribe(
            data => {
              this.assetGroupForm.patchValue(data.responseData);
              this.tempValue = data.responseData.assetGroupName != null ? data.responseData.assetGroupName : '';
              this.tempValue1 = data.responseData.assetGroupCode != null ? data.responseData.assetGroupCode : '';
              this.getCustomFieldList(data.responseData.subCategoryId);
              this.getStatutoryReqList(primaryId);
              this.getMaintenanceScheduleList(primaryId);
              this.getCheckPointList(primaryId);
            }
          );
        }
      }
    );
  }

  submit() {
    this.assetGroupForm.controls.assetGroupStatutoryReqList.setValue(this.statutoryRequirementsList.data);
    this.assetGroupForm.controls.assetGroupMaintScheduleList.setValue(this.maintenanceScheduleList.data);
    this.assetGroupForm.controls.assetGroupChkPtsList.setValue(this.checkPointList.data);
    if (this.allValidRequiredStagesAreNotEmpty) {
      this.uploadFlagAssetGroup = true;
      if(this.assetGroupForm.controls.assetGroupCode.value.trim() ==""){
        this.assetGroupForm.controls.assetGroupCode.setValue(null);
      }
      this.assetGroupModel = this.assetGroupForm.value;
      var assetGroupModel = this.assetGroupModel.assetGroupName.trim();

      if (assetGroupModel == "") {
        this.commonService.openToastWarningMessage("Kindly Enter the Valid asset group");
      } else {
        this.assetGroupModel.assetGroupName = assetGroupModel;
        //this.assetCustomFieldValue=this.assetGroupModel.assetCategoryName;
        this.assetGroupModel.assetCustomFieldValue = [];
        var obj = {
          'customFields': this.cusFieldHdrList != null ? this.cusFieldHdrList : [],
          'assetGroup': this.assetGroupModel
        }
        this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateAssetGroup, obj).subscribe(
          data => {
            if (data.success) {

              this.assetCustomFieldValue.push(data);
              this.commonService.openToastSuccessMessage(data.message);
              this.locationNavigate.back();
              this.uploadFlagAssetGroup = false;

            } else {
              this.commonService.openToastErrorMessage(data.message);
              this.uploadFlagAssetGroup = false;
            }
          }
        );
      }
      localStorage.setItem('previousRoute', this.router.url);
    }else {
      this.commonService.openToastWarningMessage('One or more "Required Stage" is empty in Statutory Requirement.');
    }

  }

  //fetch list of asset category

  listOfCategory(searchValue) {
    this.categoryScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listAllAssetCategoryCombo, searchValue.term, '', '', this.limitCount, this.assetCategoryPageNumber).subscribe(
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
    if (event === undefined) {
      this.assetGroupForm.controls['assetCategoryId'].setValue(0);
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
    } else {
      this.assetGroupForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
    }
  }

  getUserOrgId(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.orgId;
  }
  //fetch list of asset sub category

  listOfSubCategory(searchValue) {
    this.subScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listAllAssetSubCategoryCombo, searchValue.term, this.assetGroupForm.controls['assetCategoryId'].value,
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
    if (event === undefined) {
      this.assetGroupForm.controls['subCategoryId'].setValue(0);
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
      this.assetGroupForm.controls.expectedLifeInYears.setValue(0);
    } else {
      this.assetGroupForm.get('subCategoryId').setValue(event.subCategoryId);
      this.getCustomFieldList(event.subCategoryId);
      this.assetGroupForm.controls.expectedLifeInYears.setValue(event.expectedLifeInYears);
    }

  }

  //fetcb list of asset type
  listOfAssetType(searchValue) {
    this.typeScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listAllAssetTypeCombo, searchValue.term, this.assetGroupForm.controls['subCategoryId'].value, '', this.limitCount,
      this.assetTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetTypePageNumber , this.assetTypeName , data.responseData.comboList)
          this.assetTypePageNumber = this.getData.pageNumber;
          this.assetTypeName = this.getData.dataList;
          this.typeScrollsync = false;
        });
  }
  getAssetTypeComboValue(event) {
    if (event === undefined) {
      this.assetGroupForm.controls['assetTypeId'].setValue(0);
      this.assetTypePageNumber = 1;
      this.assetTypeName = [];
    } else {
      this.assetGroupForm.get('assetTypeId').setValue(event.assetTypeId);
    }
  }

  frequency1 = [
    { frequency1Id: 1, frequency1Name: 'ANNUALLY' },
    { frequency1Id: 2, frequency1Name: 'HALF ANNUALLY' },
    { frequency1Id: 3, frequency1Name: 'QUARTERLY' },
    { frequency1Id: 4, frequency1Name: 'MONTHLY' },
    { frequency1Id: 5, frequency1Name: 'PAAR' },
    { frequency1Id: 6, frequency1Name: 'NA' },
  ];

  frequency2 = [
    { frequency2Id: 1, frequency2Name: 'ANNUALLY' },
    { frequency2Id: 2, frequency2Name: 'HALF ANNUALLY' },
    { frequency2Id: 3, frequency2Name: 'QUARTERLY' },
    { frequency2Id: 4, frequency2Name: 'MONTHLY' },
    { frequency2Id: 5, frequency2Name: 'PAAR' },
    { frequency2Id: 6, frequency2Name: 'NA' },
  ];
  frequency3 = [
    { frequency3Id: 1, frequency3Name: 'ANNUALLY' },
    { frequency3Id: 2, frequency3Name: 'HALF ANNUALLY' },
    { frequency3Id: 3, frequency3Name: 'QUARTERLY' },
    { frequency3Id: 4, frequency3Name: 'MONTHLY' },
    { frequency3Id: 5, frequency3Name: 'PAAR' },
    { frequency3Id: 6, frequency3Name: 'NA' },
  ];

  criticalNature = [
    { criticalNatureId: 1, criticalNatureName: 'CRITICAL' },
    { criticalNatureId: 2, criticalNatureName: 'NON CRITICAL' }
  ];

  requiredStageCombo = [
    {requiredStageId: 1, requiredStageName: 'BEFORE INWARD ENTRY'},
    {requiredStageId: 2, requiredStageName: 'BEFORE INSTALLATION'},
    {requiredStageId: 3, requiredStageName: 'AFTER INSTALLATION'}
  ];

  mandatoryCombo = [
    {mandatoryId: 1, mandatoryValue: 'OPTIONAL'},
    {mandatoryId: 2, mandatoryValue: 'MANDATORY'}
  ]

  closeModal() {
    localStorage.setItem('previousRoute', this.router.url);
    this.locationNavigate.back();
  }
  clear() {
    this.assetGroupForm.reset();
    this.assetGroupForm.updateValueAndValidity();
    this.assetGroupFocusSet.nativeElement.focus();
    this.statutoryRequirementsList.data = [];
    this.statutoryRequirementFormGroup.reset();
    this.maintenanceScheduleList.data = [];
    this.maintenanceScheduleFormGroup.reset();
    this.ngOnInit();
  }

  //Check Asset Group Name existence
  checkForAssetGroupNameExistence() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') ===
      ((this.assetGroupForm.controls.assetGroupName.value != null) ? this.assetGroupForm.controls.assetGroupName.value.toLowerCase() : '')) {

    } else if(this.assetGroupForm.controls.assetGroupName.value.replace (/s+/g, ' ').trim () === ''){
      this.assetGroupForm.controls['assetGroupName'].setValue('');
    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.AssetGroupTO";
      constraintData.constraints = {
        'assetGroupName': this.assetGroupForm.controls.assetGroupName.value.toLowerCase().trim(),
        'orgId': this.userSession.getUserOrgId()

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.assetGroupForm.controls.assetGroupName.setErrors(Validators.minLength);
            this.assetGroupForm.controls.assetGroupName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            this.assetGroupForm.controls.assetGroupName.setErrors(null);
          }
        }
      );
    }

  }

  checkForAssetGroupCodeExistence() {
    if(this.assetGroupForm.controls.assetGroupCode.value != '' && this.assetGroupForm.controls.assetGroupCode.value != null){
      this.assetGroupForm.controls.assetGroupCode.setValue(this.assetGroupForm.controls.assetGroupCode.value.trim())
    }
    if (((this.tempValue1 != null || this.tempValue1 != '') ? this.tempValue1.toLowerCase() : '') ===
      ((this.assetGroupForm.controls.assetGroupCode.value != null) ? this.assetGroupForm.controls.assetGroupCode.value.toLowerCase() : '')) {
    }else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.AssetGroupTO";
      constraintData.constraints = {
        'assetGroupCode': this.assetGroupForm.controls.assetGroupCode.value.toLowerCase().trim(),
        'orgId': this.userSession.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsgCode = data.message;
            this.assetGroupForm.controls.assetGroupCode.setErrors(Validators.minLength);
            this.assetGroupForm.controls.assetGroupCode.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsgCode = '';
            this.assetGroupForm.controls.assetGroupCode.setErrors(null);
          }
        }
      );
    }
  }

  fieldvalidationAssetGroupCode(){
    if(this.assetGroupForm.controls.assetGroupCode.value.replace (/s+/g, ' ').trim () === ''){
      this.assetGroupForm.controls['assetGroupCode'].setValue('');
    }
  }
  fieldvalidationDescription(){
    if(this.assetGroupForm.controls.assetGroupDesc.value.replace (/s+/g, ' ').trim () === ''){
      this.assetGroupForm.controls['assetGroupDesc'].setValue('');
    }
  }
  getCustomFieldList(assetSubCategoryId: number) {
    this.cusFieldHdr.customHdrId = 0;
    this.cusFieldHdr.assetSubCategoryId = assetSubCategoryId;
    this.cusFieldHdr.customHdrId = this.assetGroupForm.controls.assetGroupId.value;
    this.cusFieldHdr.basedOnDisp = ["GROUP"];
    this.cusFieldHdr.basedOn = "GROUP";
    this.commonService.commonInsertService(this.assetOptimeMthnd.fetchListOfAllCustomFields, this.cusFieldHdr).subscribe(
      data => {
        if (data.success) {
          this.cusFieldHdrList = data.responseData;
          this.customFieldsLength=data.responseData.length;
          var len = this.cusFieldHdrList.length;
          for (var k = 0; len > k; k++) {
            if (this.cusFieldHdrList[k].inputType == "CHECKBOX") {
              this.cusFieldHdrList[k].value1 = this.cusFieldHdrList[k].value == 'TRUE' ? true : false;
            } else if (this.cusFieldHdrList[k].inputType == "DATE") {
              this.cusFieldHdrList[k].value1 = this.cusFieldHdrList[k].value;
            }
          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  //CHECK MAXIMUM LENGTH IF IS GREATER THAN 100. SHOULD NOT ALLOW TO TYPE
  lengthMaximumCharacter() {
    if (this.assetGroupForm.controls.assetGroupName.value.length <= 100) {
      return true;
    } else {
      return false;
    }
  }

  dateValidationinstall(event){
    return false;
  }

  dateConvert(values, i) {
    this.cusFieldHdrList[i].value = this.commonService.convertToDateStringyyyy_mm_dd(values);
  }

  navigateToAssetDescription(){
    this.locationNavigate.back();
  }

  loadCertificateComboData(searchValue) {
    this.scrollsyncCertificateCombo = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfAllCertificateCombo, searchValue.term, '', '',
      this.limitCount, this.certificatePageNumber,'','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.certificatePageNumber , this.certificateNameList , data.responseData.comboList)
          this.certificatePageNumber = this.getData.pageNumber;
          this.certificateNameList = this.getData.dataList;
          this.scrollsyncCertificateCombo = false;
        });
  }

  selectedCertificateAuthorityData(event) {
    if(event != undefined) {
      this.statutoryRequirementFormGroup.controls.certificateId.setValue(event.certificateId);
      this.statutoryRequirementFormGroup.controls.certificateName.setValue(event.certificateName);
      this.statutoryRequirementFormGroup.controls.active.setValue(event.active);
    } else {
      this.statutoryRequirementFormGroup.controls.certificateId.setValue(null);
      this.statutoryRequirementFormGroup.controls.certificateName.setValue(null);
      this.statutoryRequirementFormGroup.controls.active.setValue(false);
      this.certificatePageNumber = 1;
      this.certificateNameList = [];
    }
  }

  selectedMandatoryValue(event, index) {
    if(event.mandatoryValue === 'MANDATORY') {
      this.statutoryRequirementsList.data[index].required = true;
      this.statutoryRequirementsList.data[index].mandatoryRequiredStage = null;
     } else if(event.mandatoryValue === 'OPTIONAL') {
      this.statutoryRequirementsList.data[index].required = false;
      this.statutoryRequirementsList.data[index].mandatoryRequiredStage = '';
     }
     this.isStatutoryRequirementStageIsNotEmpty();
  }


  selectedMandatoryRequiredStage(event, index) {
    if(event != undefined) {
      // this.statutoryRequirementsList.data[index].required = false;
      this.required_stage='';
    }else {
      this.required_stage='Select required stage';
      this.statutoryRequirementsList.data[index].mandatoryRequiredStage = '';
    }
    this.isStatutoryRequirementStageIsNotEmpty();
  }

  addStatutoryRequirement() {
    this.tempList = this.statutoryRequirementsList.data;
    let index = this.commonService.getIndexOfTheItem(this.tempList, true, 'certificateName',  this.statutoryRequirementFormGroup.controls.certificateName.value)
      if(index == -1 ) {
        this.tempList.push(this.statutoryRequirementFormGroup.getRawValue());
        this.statutoryRequirementsList.data = this.tempList;
        this.statutoryReqListLength = this.statutoryRequirementsList.data.length;
      }else{
    this.commonService.openToastWarningMessage(this.statutoryRequirementFormGroup.controls.certificateName.value +' is already added');
    this.statutoryRequirementFormGroup.controls.certificateName.reset();
  }
  }
  dialogRef;
  deleteDocument(index) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Statutory Certificate'
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            this.tempList = this.statutoryRequirementsList.data;
            this.tempList.splice(index, 1);
            this.statutoryRequirementsList.data = this.tempList;
        }
    });
    this.statutoryReqListLength = this.statutoryRequirementsList.data.length;
  }

  isStatutoryRequirementStageIsNotEmpty() {
    for( var certificateList of this.statutoryRequirementsList.data ) {
      if(certificateList.required) {
        if(!(certificateList.mandatoryRequiredStage != '' && certificateList.mandatoryRequiredStage != null)) {
          this.allValidRequiredStagesAreNotEmpty = false;
          break;
        } else  {
          this.allValidRequiredStagesAreNotEmpty = true;
        }
      }

    }

    return this.allValidRequiredStagesAreNotEmpty;
  }

  getStatutoryReqList(assetGroupId: number) {
    this.subLoader = true;
    this.commonService.commonGetService(this.assetOptimeMthnd.fetchAssetGroupStatutoryReqByAssetId, assetGroupId).subscribe(
      (data) => {
        if(data.success) {
          this.subLoader = false;
          this.statutoryRequirementsList.data = data.responseData;
          this.statutoryReqListLength = this.statutoryRequirementsList.data.length;
          for(var statutoryReq of this.statutoryRequirementsList.data){
            if(statutoryReq.required) {
              statutoryReq.mandatory = 'MANDATORY';
            } else {
              statutoryReq.mandatory = 'OPTIONAL';
            }
          }
        } else {
          this.subLoader = false;
          this.commonService.openToastWarningMessage('Error occurred while fetching statutory requirement list.');
        }
      }
    );
  }

  isChanged(){
    this.enableUpdate = true;
  }

  loadDeviceCodeComboData(searchValue) {
    this.scrollDeviceCodesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfDeviceCodeCombo, searchValue.term, '', '',
      this.limitCount, this.deviceCodePageNumber,'','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.deviceCodePageNumber , this.deviceCodeList , data.responseData.comboList)
          this.deviceCodePageNumber = this.getData.pageNumber;
          this.deviceCodeList = this.getData.dataList;
          this.scrollDeviceCodesync = false;
        });
  }

  selectedDeviceCodeData(event) {    
    if(event === undefined) {
      this.assetGroupForm.controls.deviceCode.setValue(null);
      this.assetGroupForm.controls.deviceConcept.setValue(null);
      this.assetGroupForm.controls.deviceCodeId.setValue(0);
      this.deviceCodePageNumber = 1;
      this.deviceCodeList = [];
    } else {
      this.assetGroupForm.controls.deviceCode.setValue(event.deviceCode);
      this.assetGroupForm.controls.deviceConcept.setValue(event.deviceConcept);
      this.assetGroupForm.controls.deviceCodeId.setValue(event.deviceCodeId);
    }
  }

  loadFunctionalityComboData(searchValue) {
    this.scrollFunctionalitysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfFunctionalityCombo, searchValue.term, '', '',
      this.limitCount, this.functionalityPageNumber,'','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.functionalityPageNumber , this.functionalityList , data.responseData.comboList)
          this.functionalityPageNumber = this.getData.pageNumber;
          this.functionalityList = this.getData.dataList;
          this.scrollFunctionalitysync = false;
        });
  }

  selectedFuncationalityData(event) {
    if(event === undefined) {
      this.assetGroupForm.controls.functionalityId.setValue(0);
      this.assetGroupForm.controls.functionalityName.setValue(null);
      this.functionalityPageNumber = 1;
      this.deviceCodeList = [];
    } else {
      this.assetGroupForm.controls.functionalityId.setValue(event.functionalityId);
      this.assetGroupForm.controls.functionalityName.setValue(event.functionalityName);
    }
  }

  loadOffWarrantyMsComboData(searchValue, strategyType) {
    this.scrollMSsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfMaintenanceStrategyCombo, searchValue.term, '', '',
      this.limitCount, this.offWarrantyMSPageNumber,strategyType,'').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.offWarrantyMSPageNumber , this.offWarrantyMSList , data.responseData.comboList)
          this.offWarrantyMSPageNumber = this.getData.pageNumber;
          this.offWarrantyMSList = this.getData.dataList;
          this.scrollMSsync = false;
        });
  }

  selectedMaintenanceStrategyData(event) {
    if(event === undefined) {
      this.assetGroupForm.controls.offWarrantyMS.setValue(null);
      this.offWarrantyMSPageNumber = 1;
      this.offWarrantyMSList = [];
    } else {
      this.assetGroupForm.controls.offWarrantyMS.setValue(event.maintenanceStrategyName);
    }
  }

  loadMaintenanceStrategyComboData(searchValue, strategyType) {
    this.scrollQaStrategysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfMaintenanceStrategyCombo, searchValue.term, '', '',
      this.limitCount, this.maintenanceStrategyPageNumber,strategyType,'').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.maintenanceStrategyPageNumber , this.maintenanceStrategyList , data.responseData.comboList)
          this.maintenanceStrategyPageNumber = this.getData.pageNumber;
          this.maintenanceStrategyList = this.getData.dataList;
          this.scrollQaStrategysync = false;
        });
  }

  selectedQaStrategyData(event) {
    if(event === undefined) {
      this.assetGroupForm.controls.qaStrategy.setValue(null);
      this.maintenanceStrategyPageNumber = 1;
      this.maintenanceStrategyList = [];
    } else {
      this.assetGroupForm.controls.qaStrategy.setValue(event.maintenanceStrategyName);
    }
  }

  loadScheduleTypeComboData(searchValue) {
    this.scrollScheduleTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfMaintenanceScheduleTypeCombo, searchValue.term, '', '',
      this.limitCount, this.scheduleTypePageNumber,'','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.scheduleTypePageNumber , this.scheduleTypeList , data.responseData.comboList)
          this.scheduleTypePageNumber = this.getData.pageNumber;
          this.scheduleTypeList = this.getData.dataList;
          this.scrollScheduleTypesync = false;
        });
  }

  selectedScheduleTypeData(event) {
    if(event === undefined) {
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleTypeId.setValue(0);
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleTypeName.setValue(null);
      this.scheduleTypePageNumber = 1;
      this.scheduleTypeList = [];
    } else {
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleTypeId.setValue(event.maintenanceScheduleTypeId);
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleTypeName.setValue(event.maintenanceScheduleTypeName);
    }
  }

  loadScheduleFrequencyComboData(searchValue) {
    this.scrollScheduleFrequencysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfMaintenanceScheduleFrequencyCombo, searchValue.term, '', '',
      this.limitCount, this.scheduleFrequencyPageNumber,'','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.scheduleFrequencyPageNumber , this.scheduleFrequencyList , data.responseData.comboList)
          this.scheduleFrequencyPageNumber = this.getData.pageNumber;
          this.scheduleFrequencyList = this.getData.dataList;
          this.scrollScheduleFrequencysync = false;
        });
  }

  selectedScheduleFrequencyData(event) {
    if(event === undefined) {
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleFrequencyId.setValue(0);
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleFrequencyName.setValue(null);
      this.scheduleTypePageNumber = 1;
      this.scheduleTypeList = [];
    } else {
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleFrequencyId.setValue(event.maintenanceScheduleFrequencyId);
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleFrequencyName.setValue(event.maintenanceScheduleFrequencyName);
    }
  }

  addAssetGroupMaintSchedule() {
    this.tempListAgMs = this.maintenanceScheduleList.data;
    let index = this.commonService.getIndexOfTheItem(this.tempListAgMs, true, 'maintenanceScheduleTypeId',  this.maintenanceScheduleFormGroup.controls.maintenanceScheduleTypeId.value);
    console.log(this.maintenanceScheduleList.data);
    if(index == -1 ) {
      // this.maintenanceScheduleFormGroup.controls.det
      this.tempListAgMs.push(this.maintenanceScheduleFormGroup.getRawValue());
      this.maintenanceScheduleList.data = this.tempListAgMs;
      this.maintenanceScheduleListLength = this.maintenanceScheduleList.data.length;
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleTypeName.reset();
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleTypeId.reset();
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleFrequencyId.reset();
      this.maintenanceScheduleFormGroup.controls.maintenanceScheduleFrequencyName.reset();
      }else{
        this.commonService.openToastWarningMessage(this.maintenanceScheduleFormGroup.controls.maintenanceScheduleTypeName.value +' is already added');
      }
      if(this.assetGroupForm.valid) {
        this.isChanged();
      }
    }

  maintenanceScheduledialogRef;
  deleteMaintenanceSchedule(index, element) {
    this.maintenanceScheduledialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': element.maintenanceScheduleTypeName
      }
    });
    this.maintenanceScheduledialogRef.disableClose = true;
    this.maintenanceScheduledialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            this.tempListAgMs = this.maintenanceScheduleList.data;
            this.tempListAgMs.splice(index, 1);
            this.maintenanceScheduleList.data = this.tempListAgMs;
            if(element.assetGroupMaintenanceScheduleId > 0) {
              this.commonService.commonDeleteService(this.assetOptimeMthnd.deleteAssetGroupMaintenanceSchedule, element.assetGroupMaintenanceScheduleId).subscribe(
                data => {
                  if(data.success) {
                    this.commonService.openToastSuccessMessage(data.message);
                  } else {
                    this.commonService.openToastWarningMessage(data.message);
                  }
                  this.maintenanceScheduleListLength = this.maintenanceScheduleList.data.length;
                }
              )
            } else {
              this.maintenanceScheduleListLength = this.maintenanceScheduleList.data.length;
              this.commonService.openToastSuccessMessage("Record Deleted Successfully");
            }
        }
    });
  }

  getMaintenanceScheduleList(assetGroupId: number) {
    this.subLoader = true;
    this.commonService.commonGetService(this.assetOptimeMthnd.fetchAssetGroupMaintenanceScheduleByAgId, assetGroupId).subscribe(
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


  listOfParameterType(searchValue) {
    this.scrollsyncParameterType = true;
    this.limitCount = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfAllParameterType, searchValue.term, 0, '',
      this.limitCount, this.parameterTypePageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.parameterTypePageNumber , this.parameterTypeCombo , data.responseData.comboList)
          this.parameterTypePageNumber = this.getData.pageNumber;
          this.parameterTypeCombo = this.getData.dataList;
          this.scrollsyncParameterType = false;
        }
      );
  }

  selectedIdOfParameterType(event) {
    if (event === undefined) {
      this.assetGroupChkPtsFormGroup.controls.parameterTypeName.setValue(null);
      this.assetGroupChkPtsFormGroup.controls.parameterTypeId.setValue(0);
      this.assetGroupChkPtsFormGroup.controls.parameterTypeNameDisp.setValue('');
      this.assetGroupChkPtsFormGroup.controls.parameterName.disable();
      this.assetGroupChkPtsFormGroup.controls.parameterName.setValue(null);
      this.parameterTypeCombo = [];
      this.parameterTypePageNumber = 1;
    } else {
      this.assetGroupChkPtsFormGroup.controls.parameterTypeName.setValue(event.parameterTypeName);
      this.assetGroupChkPtsFormGroup.controls.parameterTypeId.setValue(event.parameterTypeId);
      this.assetGroupChkPtsFormGroup.controls.parameterTypeNameDisp.setValue(event.parameterTypeNameDisp);
      this.assetGroupChkPtsFormGroup.controls.parameterName.setValue(null);
      this.assetGroupChkPtsFormGroup.controls.parameterName.enable();
    }
    this.parameterNameCombo = [];
    this.parameterNamePageNumber = 1;
  }

  

  listOfParameterGroup(searchValue) {
    this.scrollsyncParameterGroup = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfAllParameterGroup, searchValue.term, '', '', this.limitCount, this.parameterGroupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.parameterGroupPageNumber, this.parameterGroupCombo, data.responseData.comboList)
        this.parameterGroupPageNumber = this.getData.pageNumber;
        this.parameterGroupCombo = this.getData.dataList;
        this.scrollsyncParameterGroup = false;
      }
    );
  }

  selectedIdOfParameterGroup(event) {
    if (event === undefined) {
      this.assetGroupChkPtsFormGroup.controls.parameterGroupName.setValue('');
      this.assetGroupChkPtsFormGroup.controls.parameterGroupId.setValue(0);
      this.assetGroupChkPtsFormGroup.controls.parameterName.setValue('');
      this.parameterGroupCombo = [];
      this.parameterGroupPageNumber = 1;
    } else {
      this.assetGroupChkPtsFormGroup.controls.parameterGroupName.setValue(event.parameterGroupName);
      this.assetGroupChkPtsFormGroup.controls.parameterGroupId.setValue(event.parameterGroupId);
      this.assetGroupChkPtsFormGroup.controls.parameterName.setValue('');
    }
    this.parameterNameCombo = [];
    this.parameterNamePageNumber = 1;
  }

  listOfParameterName(searchValue) {
    this.scrollsyncParameterName = true;
    this.limitCount = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfAllParameterName, searchValue.term, this.assetGroupChkPtsFormGroup.controls.parameterGroupId.value, this.assetGroupChkPtsFormGroup.controls.parameterTypeId.value,
      this.limitCount, this.parameterNamePageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.parameterNamePageNumber , this.parameterNameCombo , data.responseData.comboList)
          this.parameterNamePageNumber = this.getData.pageNumber;
          this.parameterNameCombo = this.getData.dataList;
          this.scrollsyncParameterName = false;
        }
      );
  }

  selectedIdOfParameterName(event) {
    if (event === undefined) {
      this.assetGroupChkPtsFormGroup.controls.parameterName.setValue(null);
      this.assetGroupChkPtsFormGroup.controls.parameterGroupId.setValue(0);
      this.assetGroupChkPtsFormGroup.controls.parameterGroupName.setValue(null);
      this.assetGroupChkPtsFormGroup.controls.uomCd.setValue('');
      this.assetGroupChkPtsFormGroup.controls.defaultValue.setValue('');
      this.assetGroupChkPtsFormGroup.controls.inputType.setValue('');
      this.assetGroupChkPtsFormGroup.controls.minAllowedValue.setValue('');
      this.assetGroupChkPtsFormGroup.controls.maxAllowedValue.setValue('');
      this.parameterNameCombo = [];
      this.parameterNamePageNumber = 1;
    } else {
      this.assetGroupChkPtsFormGroup.controls.parameterId.setValue(event.parameterId);
      this.assetGroupChkPtsFormGroup.controls.parameterName.setValue(event.parameterName);
      this.assetGroupChkPtsFormGroup.controls.parameterGroupId.setValue(event.parameterGroupId);
      this.assetGroupChkPtsFormGroup.controls.parameterGroupName.setValue(event.parameterGroupName);
      this.assetGroupChkPtsFormGroup.controls.uomCd.setValue(event.uomCd);
      this.assetGroupChkPtsFormGroup.controls.defaultValue.setValue(event.defaultValue);
      this.assetGroupChkPtsFormGroup.controls.inputType.setValue(event.inputType);
      this.assetGroupChkPtsFormGroup.controls.minAllowedValue.setValue(event.minAllowedValue);
      this.assetGroupChkPtsFormGroup.controls.maxAllowedValue.setValue(event.maxAllowedValue);
    }
  }

  addCheckPointParameter() {
    this.tempParameterList = this.checkPointList.data;
    let index = this.commonService.getIndexOfTheItem(this.tempParameterList, true, 'parameterId',  this.assetGroupChkPtsFormGroup.controls.parameterId.value);
    if(index == -1 ) {
      this.tempParameterList.push(this.assetGroupChkPtsFormGroup.getRawValue());
      this.checkPointList.data = this.tempParameterList;
      this.checkPointListLength = this.checkPointList.data.length;
      this.assetGroupChkPtsFormGroup.controls.parameterName.reset();
      this.assetGroupChkPtsFormGroup.controls.parameterId.setValue(0);
      this.assetGroupChkPtsFormGroup.controls.parameterName.disable();
      this.assetGroupChkPtsFormGroup.controls.parameterTypeId.setValue(0);
      this.assetGroupChkPtsFormGroup.controls.parameterTypeName.reset();
      this.assetGroupChkPtsFormGroup.controls.parameterGroupId.setValue(0);
      this.assetGroupChkPtsFormGroup.controls.parameterGroupName.reset();
      this.tableCheckList.renderRows();
      this.parameterTypeCombo = [];
      this.parameterTypePageNumber = 1;
      this.parameterGroupCombo = [];
      this.parameterGroupPageNumber = 1;
      this.parameterNameCombo = [];
      this.parameterNamePageNumber = 1;
      }else{
        this.commonService.openToastWarningMessage(this.assetGroupChkPtsFormGroup.controls.parameterName.value +' is already added');
      }
      if(this.assetGroupForm.valid) {
        this.isChanged();
      }
  }

  getCheckPointList(assetGroupId: number) {
    this.subLoader = true;
    this.commonService.commonGetService(this.assetOptimeMthnd.fetchListOfAllAssetGrpChkPts, assetGroupId).subscribe(
      (data) => {
        if(data.success) {
          this.subLoader = false;
          this.checkPointList.data = data.responseData;
          this.checkPointListLength = this.checkPointList.data.length;
        } else {
          this.subLoader = false;
          this.commonService.openToastWarningMessage('Error occurred while fetching Check Points list.');
        }
      }
    );
  }

  checkPointsDialogRef;
  deleteCheckPoints(index, element) {
    this.checkPointsDialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': element.parameterName
      }
    });
    this.checkPointsDialogRef.disableClose = true;
    this.checkPointsDialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            if(element.assetGroupChkPtsId > 0) {
              this.commonService.commonDeleteService(this.assetOptimeMthnd.deleteAssetGroupCheckPoint, element.assetGroupChkPtsId).subscribe(
                data => {
                  if(data.success) {
                    this.commonService.openToastSuccessMessage(data.message);
                    this.tempParameterList = this.checkPointList.data;
                    this.tempParameterList.splice(index, 1);
                    this.checkPointList.data = this.tempParameterList;
                    this.checkPointListLength = this.checkPointList.data.length;
                  } else {
                    this.commonService.openToastWarningMessage(data.message);
                  }
                }
              )
            } else {
              this.tempParameterList = this.checkPointList.data;
              this.tempParameterList.splice(index, 1);
              this.checkPointList.data = this.tempParameterList;
              this.checkPointListLength = this.checkPointList.data.length;
              this.commonService.openToastSuccessMessage("Record Deleted Successfully");
            }
        }
    });
  }

}
