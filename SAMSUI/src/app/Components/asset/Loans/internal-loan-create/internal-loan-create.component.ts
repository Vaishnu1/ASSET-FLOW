import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { ActivatedRoute , Router} from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AssetModel } from 'src/app/Model/master/asset';
import { Location } from '@angular/common';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmationGatepassComponent } from '../popup-confirmation-gatepass/popup-confirmation-gatepass.component';
import { allassetStatus, allloanStatus } from 'src/app/Constants/AllStatusConstants';
import { TranslateService } from '@ngx-translate/core';
import { getData } from 'src/app/Model/common/fetchListData';
import { validate } from 'webpack';


@Component({
  selector: 'app-internal-loan-create',
  templateUrl: './internal-loan-create.component.html',
  styleUrls: ['./internal-loan-create.component.css']
})
export class InternalLoanCreateComponent implements OnInit {

  displayedColumns = ['sno', 'locationName', 'assetCode', 'assetCategoryName', 'modelName', 'departmentName', 'assetStatus','expDateOfReturn','action'];

  uploadLoanFlag: boolean = false;
  CommonhintMsg = new CommonHint();
  headingDisplay: string;
  displayButton: string;
  modeDisplay: boolean = false;
  disbleClear: boolean = false;

  scrollsyncLocation: boolean = false;
  scrollsyncLocation1: boolean = false;
  locationPageNumber: number = 0;
  locationCombo: any = [];
  recordsPerPageForCombo: string;

  scrollsyncDepartment1: boolean = false;
  scrollsyncDepartment2: boolean = false;
  scrollsyncDepartment3: boolean = false;
  scrollsyncDepartment4: boolean = false;
  departmentPageNumber: number = 0;
  departmentComboList: any = [];

  loanCreateForm: FormGroup;
  public asset: AssetModel;

  //drop down
  scrollsyncAssetGroup: boolean = false;
  assetGroupPageNumber: number;
  assetGroupCombo: any = [];

  scrollsyncModel: boolean = false;
  modelComboPageNumber: number;
  modelCombo: any = [];

  assetCodePageNumber: number;
  scrollsyncAssetCode: boolean = false;
  scrollsyncAssetCode1: boolean = false;
  assetCodeCombo: any = [];

  serviceEngineerPageNumber: number;
  scrollServiceEngineersync: boolean = false;
  serviceEngineerCombo: any = [];

  employeePageNumber: number;
  scrollsyncEmployee1: boolean = false;
  scrollsyncEmployee2: boolean = false;
  scrollsyncEmployee3: boolean = false;
  employeeCombo: any = [];

  dataSource = [];
  subLoader: boolean = false;
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  defaultLocId: number;

  scrollsyncDept: boolean = false;
  departmentList: any = [];

  scrollsyncAssetCondition: boolean = false;
  assetConditionPageNumber: number;
  assetConditionCombo: any = [];

  enablefieldsInAddMode: boolean = false;
  enablefieldsInViewAndEditMode:boolean =false;

  enableApproveButton:boolean =false;
  enableRejectButton:boolean =false;

  @ViewChild('srLocFocus') srLocationFocus: NgSelectComponent;
  tableList: boolean = false;
  getData: getData;
  approveButton: boolean = false;
  rejectButton: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService,
              private location: Location,
              private assetOptimaServices: AssetOptimaServices,
              private translateService: TranslateService,
              private router: Router,
              private dialog: MatDialog) {
      this.locationPageNumber = 1;
      this.assetGroupPageNumber=1;
      this.departmentPageNumber=1;
      this.modelComboPageNumber=1;
      this.assetCodePageNumber=1;
      this.serviceEngineerPageNumber=1;
      this.employeePageNumber=1;
      this.assetConditionPageNumber=1;
      this.pageSize = '100';
      this.pageIndex = '0';
      this.asset = new AssetModel();
               }

  ngOnInit() {
    this.loanCreateForm = new FormGroup({
      loanId: new FormControl(0),
      assetCode: new FormControl(''),
      loanNo: new FormControl(''),
      locationId: new FormControl(0),
      locationName: new FormControl('',[Validators.required]),
      assetId: new FormControl(0),
      modelId: new FormControl(''),
      loanedTo: new FormControl('BRANCH'),
      loanedToName: new FormControl('',Validators.required),
      loanedToId: new FormControl(0),
      loanedToSiteName: new FormControl(''),
      loanedToSiteId: new FormControl(0),
      loanedPersonEmplyeeCode: new FormControl(0),
      loanedPersonName: new FormControl(''),
      loanedPersonContactNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      loanedPersonEmailId: new FormControl('', Validators.pattern(this.assetOptimaConstants.emailValidation)),
      loanedAssetCondition: new FormControl('', [Validators.maxLength(500)]),
      loanType: new FormControl(''),
      contractNo: new FormControl(''),
      loanStatus: new FormControl(''),
      loanStatusId: new FormControl(0),
      fromDt: new FormControl(''),
      toDt: new FormControl(''),
      fromDtDisp: new FormControl(new Date(), Validators.required),
      toDtDisp: new FormControl('', Validators.required),
      dateOfReturn: new FormControl(''),
      dateOfReturnDisp: new FormControl(''),
      returnAssetCondition: new FormControl(''),
      returnAssetConditionId:new FormControl(0),
      returnById: new FormControl(''),
      returnedByName: new FormControl(''),
      returnedByContactNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      returnedByEmailId: new FormControl('', Validators.pattern(this.assetOptimaConstants.emailValidation)),
      returnReceivedById: new FormControl(0),
      returnReceivedBy: new FormControl(''),
      returnReceivedContactNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      returnReceivedEmailId: new FormControl('',Validators.pattern(this.assetOptimaConstants.emailValidation)),
      returnRemarks: new FormControl(''),
      assetStatusPreviousId: new FormControl(''),
      remarks: new FormControl(''),
      loanRaisedBy: new FormControl(''),
      loanChildAsset: new FormControl([]),
      loanAssetAccessories: new FormControl([]),
      createdBy: new FormControl(this.userSession.getUserName()),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(new Date()),
      updatedDt: new FormControl(Date),
      createdDtDisp: new FormControl(this.commonService.convertToDateStringdd_mm_yyyy(new Date())),
      UpdatedDtDisp: new FormControl(''),
      equipmentCode: new FormControl(''),
      assetCategoryName: new FormControl(''),
      subCategoryName: new FormControl(''),
      assetGroupName: new FormControl(''),
      description: new FormControl(''),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      assetStatus: new FormControl(''),
      serialNo: new FormControl(''),
      departmentName: new FormControl(''),
      subDepartment: new FormControl(''),
      loanedRemarks: new FormControl(''),
      returnToDeptId: new FormControl(0),
      returnToDeptName: new FormControl(''),
      raiseReturn: new FormControl(false),
      generateGatePass: new FormControl(false),
      fromDeptId: new FormControl(0),
      toDeptId: new FormControl(0),
      sourceScreen: new FormControl('INTERNAL'),
      fromDepartmentName: new FormControl('', Validators.required),
      toDepartmentName: new FormControl('',[Validators.required]),
      fromDeptInchargeId: new FormControl(0),
      toDeptInchargeId: new FormControl(0),
      assetPICId: new FormControl(0),
      expReturnDateDisp: new FormControl(''),
      expReturnDate: new FormControl(''),
      loanStatusUpdateId: new FormControl(''),
      groupNo: new FormControl(0),
      loanApprovedBy: new FormControl(''),
      loanApprovedDt: new FormControl(''),
      receivedApprovedBy: new FormControl(''),
      receivedApprovedDt: new FormControl(''),
      loanApprovedDtDisp: new FormControl(''),
      receivedApprovedDtDisp: new FormControl(''),
      ownershipType: new FormControl(''),
      loanReceivedBy: new FormControl(''),
      loanReceivedDt: new FormControl(''),
      loanReceivedDtDisp: new FormControl(''),
      loanIdList: new FormControl([]),
      returnAuthorizedBy: new FormControl(''),
      returnAuthorizedDt: new FormControl(''),
      returnAuthorizedDtDisp: new FormControl(''),
      returnApprovedBy: new FormControl(''),
      returnApprovedDt: new FormControl(''),
      returnApprovedDtDisp: new FormControl(''),
      actualDateOfReturnDisp: new FormControl(''),
      actualDateOfReturnDt: new FormControl(''),
      assetStatusId: new FormControl(0)
    });

    this.loanCreateForm.controls.locationId.setValue(this.userSession.getUserLocationId());
    this.loanCreateForm.controls.locationName.setValue(this.userSession.getUserLocationName());

    this.loanCreateForm.controls.loanedPersonName.setValue(this.userSession.getUserEmpName());
    this.loanCreateForm.controls.loanedPersonContactNo.setValue(this.userSession.getContactPhoneNo());
    this.loanCreateForm.controls.loanedPersonEmailId.setValue(this.userSession.getUserEmailId());
    this.loanCreateForm.controls.loanedPersonEmplyeeCode.setValue(this.userSession.getUserEmpId());


    this.loanCreateForm.controls['loanedToName'].setValue(this.userSession.getUserLocationName());
    this.loanCreateForm.controls['loanedToId'].setValue(this.userSession.getUserLocationId());

    this.validateEditMode();
  }

  ngAfterViewInit() {
    this.commonService.setComboFocus(this.srLocationFocus);
  }

  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId = Number(primaryId);
        var mode = params.mode;
        if (primaryId <= 0) {
          this.headingDisplay = "Create";
          this.displayButton = "Submit";
          this.loanCreateForm.controls.loanStatusId.setValue(allloanStatus.REQUESTED_FOR_LOAN);
          var endDate = new Date();
          endDate.setDate(endDate.getDate() + 30); 
          this.loanCreateForm.controls.toDtDisp.setValue(endDate);
          this.enablefieldsInAddMode = true;
        } else {
          this.commonService.commonGetService('fetchLoanDtlByLoanId.sams', primaryId).subscribe(
            data => {

              this.translateService.get([data.responseData.assetStatus , data.responseData.loanStatus])
              .subscribe((val) => {
                const status = Object.values(val)
                this.loanCreateForm.patchValue(data.responseData);
                if(status.length === 1){
                  this.loanCreateForm.controls.assetStatus.setValue(status[0]);
                  this.loanCreateForm.controls.loanStatus.setValue(status[1]);
                }
                else{
                this.loanCreateForm.controls.assetStatus.setValue(status[0]);
                this.loanCreateForm.controls.loanStatus.setValue(status[1]);
                }
                this.translateService.get([data.responseData.returnAssetCondition])
                .subscribe((val) => {
                  const status = Object.values(val)
                  this.loanCreateForm.controls.returnAssetCondition.setValue(status[0])
                });
              });


              // this.loanCreateForm.patchValue(data.responseData);
              this.displayApproveButtonBasedOnInchargeName();
              this.disableAssetInfoField();
              if (this.loanCreateForm.controls.loanStatusId.value == allloanStatus.LOAN_REJECTED) {
                this.modeDisplay = true;
                this.loanCreateForm.disable();
              }
              if((this.loanCreateForm.controls.loanStatusId.value== allloanStatus.REQUESTED_FOR_LOAN || this.loanCreateForm.controls.loanStatusId.value== allloanStatus.REQUEST_FOR_RETURN
                || this.loanCreateForm.controls.loanStatusId.value==allloanStatus.AWAITING_FOR_RECEIVED_BY_APPROVAL  || this.loanCreateForm.controls.loanStatusId.value== allloanStatus.AWAITING_FOR_RETURN_APPROVAL) && this.enableApproveButton && this.headingDisplay !== 'View'){
                  this.approveButton = true;
              }

              if((this.loanCreateForm.controls.loanStatusId.value== allloanStatus.REQUESTED_FOR_LOAN) && this.enableRejectButton && this.headingDisplay !== 'View'){
                this.rejectButton = true;
              }
            }
          );
          if (mode == 'view') {
            this.modeDisplay = true;
            this.headingDisplay = "View";
            this.enableApproveButton=false;
            this.enableRejectButton=false;

            this.loanCreateForm.controls.expReturnDateDisp.disable();
            this.loanCreateForm.controls.dateOfReturnDisp.disable();
            this.loanCreateForm.controls.returnAssetCondition.disable();
            this.loanCreateForm.controls.returnedByName.disable();
            this.loanCreateForm.controls.returnedByContactNo.disable();
            this.loanCreateForm.controls.returnedByEmailId.disable();

            this.loanCreateForm.controls.actualDateOfReturnDisp.disable();
            this.loanCreateForm.controls.returnAuthorizedBy.disable();
            this.loanCreateForm.controls.returnAuthorizedDtDisp.disable();
            this.loanCreateForm.controls.returnRemarks.disable();
          } else if(mode == 'edit'){
            this.headingDisplay = "Edit";
            this.displayButton = "Update";
            this.disbleClear = true;
          }
        }
      }
    );
  }
  Goto(){
    this.router.navigate(['/home/internalLoanList']);
  }

  displayApproveButtonBasedOnInchargeName(){
    if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.REQUESTED_FOR_LOAN){
      if(this.loanCreateForm.controls.assetPICId.value==this.userSession.getUserEmpId()||(this.loanCreateForm.controls.toDeptInchargeId.value==this.userSession.getUserEmpId()))  {
        this.enableApproveButton=true;
        this.enableRejectButton=true;
      }else{
        this.enableApproveButton=false;
        this.enableRejectButton=false;
      }
    }else if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.AWAITING_FOR_RECEIVED_BY_APPROVAL || this.loanCreateForm.controls.loanStatusId.value==allloanStatus.AWAITING_FOR_RETURN_APPROVAL){

      if(this.loanCreateForm.controls.fromDeptInchargeId.value==this.userSession.getUserEmpId()){
        this.enableApproveButton=true;
        this.enableRejectButton=false;
      }else{
        this.enableApproveButton=false;
        this.enableRejectButton=false;
      }
    }else if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.REQUEST_FOR_RETURN){
      if(this.loanCreateForm.controls.assetPICId.value==this.userSession.getUserEmpId()||(this.loanCreateForm.controls.toDeptInchargeId.value==this.userSession.getUserEmpId()))  {
        this.enableApproveButton=true;
        this.enableRejectButton=false;
      }else{
        this.enableApproveButton=false;
        this.enableRejectButton=false;
      }
    }
  }

  disableAssetInfoField(){
    this.loanCreateForm.controls.assetCategoryName.disable();
    this.loanCreateForm.controls.subCategoryName.disable();
    this.loanCreateForm.controls.assetGroupName.disable();
    this.loanCreateForm.controls.description.disable();
    this.loanCreateForm.controls.modelName.disable();
    this.loanCreateForm.controls.manufacturerName.disable();
    this.loanCreateForm.controls.assetStatus.disable();
    this.loanCreateForm.controls.equipmentCode.disable();
    this.loanCreateForm.controls.serialNo.disable();
    this.loanCreateForm.controls.departmentName.disable();
    this.loanCreateForm.controls.subDepartment.disable();
    this.loanCreateForm.controls.loanStatus.disable();
    this.loanCreateForm.controls.loanNo.disable();
    this.loanCreateForm.controls.fromDepartmentName.disable();
    this.loanCreateForm.controls.toDepartmentName.disable();
    this.loanCreateForm.controls.fromDtDisp.disable();
    this.loanCreateForm.controls.toDtDisp.disable();
    this.loanCreateForm.controls.assetCode.disable();
    this.loanCreateForm.controls.loanedToName.disable();
    this.loanCreateForm.controls.loanedPersonContactNo.disable();
    this.loanCreateForm.controls.loanedPersonEmailId.disable();
    this.loanCreateForm.controls.loanedPersonName.disable();
    this.loanCreateForm.controls.locationName.disable();
    this.loanCreateForm.controls.returnReceivedEmailId.disable();
    this.loanCreateForm.controls.returnReceivedBy.disable();
    this.loanCreateForm.controls.returnReceivedContactNo.disable();

    if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.RETURN_REQUEST_APPROVAL){
      this.loanCreateForm.controls.returnReceivedEmailId.enable();
      this.loanCreateForm.controls.returnReceivedBy.enable();
      this.loanCreateForm.controls.returnReceivedContactNo.enable();
      this.loanCreateForm.controls.returnAuthorizedBy.setValue(this.userSession.getUserName());
      this.loanCreateForm.controls.returnAuthorizedDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(new Date()));
   }
  }


  loadLocationComboData(searchValue,event) {
    if (event) {
      this.scrollsyncLocation = true;
    }else if (!event) {
      this.scrollsyncLocation1 = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
          this.scrollsyncLocation1 = false;
        }
      );
  }

  selectedFromLocationData(event){
    if (event === undefined) {
      this.loanCreateForm.controls['locationId'].setValue(0);
      this.loanCreateForm.controls['locationName'].setValue('');
      this.loanCreateForm.controls['fromDeptId'].setValue(0);
      this.loanCreateForm.controls['fromDepartmentName'].setValue('');
      this.loanCreateForm.controls['loanedPersonName'].setValue('');
      this.loanCreateForm.controls['loanedPersonContactNo'].setValue('');
      this.loanCreateForm.controls['loanedPersonEmailId'].setValue('');
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {

      this.loanCreateForm.controls['loanedToName'].setValue(event.locationName);
      this.loanCreateForm.controls['loanedToId'].setValue(event.locationId);

      this.loanCreateForm.controls['locationName'].setValue(event.locationName);
      this.loanCreateForm.controls['locationId'].setValue(event.locationId);
      this.loanCreateForm.controls['fromDeptId'].setValue(0);
      this.loanCreateForm.controls['fromDepartmentName'].setValue('');
      this.loanCreateForm.controls['loanedPersonName'].setValue('');
      this.loanCreateForm.controls['loanedPersonContactNo'].setValue('');
      this.loanCreateForm.controls['loanedPersonEmailId'].setValue('');
      this.checkLocAndDeptSame();
    }
  }

  selectedToLocationData(event){
    if (event === undefined) {
      this.loanCreateForm.controls['loanedToId'].setValue(0);
      this.loanCreateForm.controls['loanedToName'].setValue('');
      this.loanCreateForm.controls['toDeptId'].setValue(0);
      this.loanCreateForm.controls['toDepartmentName'].setValue('');
      this.departmentComboList=[];
      this.departmentPageNumber=1;
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.loanCreateForm.controls['loanedToName'].setValue(event.locationName);
      this.loanCreateForm.controls['loanedToId'].setValue(event.locationId);
      this.loanCreateForm.controls['toDeptId'].setValue(0);
      this.loanCreateForm.controls['toDepartmentName'].setValue('');
      this.departmentComboList=[];
      this.departmentPageNumber=1;
      this.checkLocAndDeptSame();
    }
  }

  loadDepartmentComboData(searchValue,locationId,event) {
    if (event == 1) {
      this.scrollsyncDepartment1 = true;
    }else if (event == 2) {
      this.scrollsyncDepartment2 = true;
    }else if (event == 3) {
      this.scrollsyncDepartment3 = true;
    }else if (event == 4) {
      this.scrollsyncDepartment4 = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfDepartmentInBranchCombo.sams', searchValue.term, locationId, '',
      this.recordsPerPageForCombo, this.departmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentComboList , data.responseData.comboList)
          this.departmentPageNumber = this.getData.pageNumber;
          this.departmentComboList = this.getData.dataList;
          this.scrollsyncDepartment1 = false;
          this.scrollsyncDepartment2 = false;
          this.scrollsyncDepartment3 = false;
          this.scrollsyncDepartment4 = false;
        }
      );
  }

  selectedFromDepartmentData(event){
    if (event === undefined) {
      this.loanCreateForm.controls['fromDeptId'].setValue(0);
      this.loanCreateForm.controls['fromDepartmentName'].setValue('');
      this.loanCreateForm.controls['loanedPersonName'].setValue('');
      this.loanCreateForm.controls['fromDeptInchargeId'].setValue(0);
      this.loanCreateForm.controls['loanedPersonContactNo'].setValue('');
      this.loanCreateForm.controls['loanedPersonEmailId'].setValue('');
      this.departmentPageNumber = 1;
      this.departmentComboList = [];
    } else {
      this.loanCreateForm.controls['fromDeptId'].setValue(event.departmentId);
      this.loanCreateForm.controls['fromDepartmentName'].setValue(event.departmentName);
        this.loanCreateForm.controls['fromDeptInchargeId'].setValue(event.inchargeId);
      this.loanCreateForm.controls['loanedPersonName'].setValue(event.inchargeName);
      this.loanCreateForm.controls['loanedPersonContactNo'].setValue(event.inchargeContactNo);
      this.loanCreateForm.controls['loanedPersonEmailId'].setValue(event.inchargeEmailId);
      this.departmentPageNumber = 1;
      this.departmentComboList = [];
      this.checkLocAndDeptSame();
    }
  }

  selectedToDepartmentData(event){
    if (event === undefined) {
      this.loanCreateForm.controls['toDeptId'].setValue(0);
      this.loanCreateForm.controls['toDepartmentName'].setValue('');
      this.loanCreateForm.controls['toDeptInchargeId'].setValue(0);
      this.departmentPageNumber = 1;
      this.departmentComboList = [];
    } else {
      this.loanCreateForm.controls['toDeptId'].setValue(event.departmentId);
      this.loanCreateForm.controls['toDepartmentName'].setValue(event.departmentName);
      this.loanCreateForm.controls['toDeptInchargeId'].setValue(event.inchargeId);
      this.departmentPageNumber = 1;
      this.departmentComboList = [];
      this.checkLocAndDeptSame();
    }
  }

  checkLocAndDeptSame(){
    if(this.loanCreateForm.controls.locationId.value == this.loanCreateForm.controls.loanedToId.value){
      if(this.loanCreateForm.controls.fromDeptId.value==this.loanCreateForm.controls.toDeptId.value){
        this.commonService.openToastWarningMessage(`"Requested From" And "Requested To" Info Should Be Different.`);
        this.loanCreateForm.controls['toDeptId'].setValue(0);
        this.loanCreateForm.controls['toDepartmentName'].setValue('');
      }
    }
  }

  searchAsset:boolean = false;
  fetchListOfAssets(){
    if((this.loanCreateForm.controls.assetGroupName.value!=null && this.loanCreateForm.controls.assetGroupName.value!='')||
    (this.loanCreateForm.controls.modelName.value!=null && this.loanCreateForm.controls.modelName.value!='')||
    (this.loanCreateForm.controls.toDepartmentName.value!=null && this.loanCreateForm.controls.toDepartmentName.value!='')||
    (this.loanCreateForm.controls.assetCode.value!=null && this.loanCreateForm.controls.assetCode.value!='')){
      this.searchAsset=true;
    }else{
      this.searchAsset=false;
      this.commonService.openToastWarningMessage(`Kindly Select "Model/Asset Group/ Department/ Asset Code".`)
    }
    this.asset.locationId=this.loanCreateForm.controls.loanedToId.value;
    this.asset.departmentId=this.loanCreateForm.controls.toDeptId.value;
    this.asset.source="Internal Loan";
    this.asset.processId=0;
    this.asset.direction = 'desc';
    this.asset.columnName = 'updatedDt';
    if(this.searchAsset){
      this.commonService.commonListService('fetchListOfAllAsset.sams', this.asset).subscribe(
        data => {
          if (data.success) {
            this.length = data.responseData.dataTotalRecCount;
            this.dataSource = data.responseData.dataList;
            //this.dataSource = (this.dataSource).filter(data => {return data.avilableToProcess === true;});
          } else {
          }
        }, error => {
        }
      );
    }else{
      this.subLoader=false;
    }

  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  dateValidationinstall(event) {
    return false;
  }

  clear() {
    this.loanCreateForm.reset();
    this.loanCreateForm.updateValueAndValidity();
    this.asset = new AssetModel();
    this.commonService.setComboFocus(this.srLocationFocus);
    this.ngOnInit();
    this.dataSource=[];
  }

  exit(){
    this.location.back();
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroupCombo , data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroupCombo = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.asset.assetGroupName = event.assetGroupName;
      this.asset.assetGroupId = event.assetGroupId;
    } else {
      this.asset.assetGroupName = "";
      this.asset.assetGroupId = 0;
      this.assetGroupCombo = [];
      this.assetGroupPageNumber = 1;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', '',
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        });
  }

  getModelComboValue(event) {
    if (event != null) {
      this.asset.modelId = event.modelId;
      this.asset.modelName = event.modelName;
      this.asset.manufacturerId=event.manufacturerId;
      this.asset.manufacturerName=event.manufacturerName;
    } else {
      this.asset.modelId = 0;
      this.asset.modelName = '';
      this.asset.manufacturerId=0;
      this.asset.manufacturerName='';
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  loadAssetCodeComboData(searchValue,event) {
    if (event) {
      this.scrollsyncAssetCode = true;
    }else if (!event) {
      this.scrollsyncAssetCode1 = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, '', this.loanCreateForm.controls.toDeptId.value
    , this.recordsPerPageForCombo, this.assetCodePageNumber, '0', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          this.assetCodeCombo = (this.assetCodeCombo).filter(data => {return data.avilableToProcess === true;});
          this.scrollsyncAssetCode = false;
          this.scrollsyncAssetCode1 = false;
        }
      );
  }

  selectedAssetCodeData(event) {
    if (event === undefined) {
      this.asset.assetHdrId = 0;
      this.asset.assetCode = '';
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
    } else {
      this.asset.assetHdrId = event.assetHdrId;
      this.asset.assetCode = event.assetCode;;
    }
  }

 assetList=[];

 save(displayButton){

   this.assetList=[];
  if(this.dataSource.length>0){
    for(let index of this.dataSource){
      if(index.loaned && (index.expReturnDateDisp!=''||index.expReturnDateDisp!=null)){
        this.assetList.push(index);
      }
    }
  }
  //SELECT ATLEAST ONE ASSET
  if(displayButton == 'Submit'){
    if(this.assetList.length<=0){
      this.commonService.openToastWarningMessage("Kindly select atleast one Asset for Loan");
      this.tableList=false;
    }else{
      this.tableList=true;
    }
  }

  // if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.LOAN_APPROVED){
  //   if(this.loanCreateForm.controls.loanReceivedBy.value != null &&
  //     this.loanCreateForm.controls.loanReceivedBy.value != "" && this.loanCreateForm.controls.loanReceivedDtDisp.value != ""
  //     && this.loanCreateForm.controls.loanReceivedDtDisp.value != null){
  //       this.loanCreateForm.controls.loanStatusId.setValue(allloanStatus.AWAITING_FOR_RECEIVED_BY_APPROVAL);
  //       this.tableList=true;
  //   }else{
  //     this.commonService.openToastWarningMessage(`Kindly Enter The Received By/Received Date Info In The Loan Received Tab.`);
  //     this.tableList=false;
  //   }
  // }

  // if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.LOANED){
  //   if (this.loanCreateForm.controls.dateOfReturnDisp.value != null && this.loanCreateForm.controls.returnedByName.value) {
  //     this.tableList=true;
  //     this.loanCreateForm.controls.loanStatusId.setValue(allloanStatus.AWAITING_FOR_RETURN_APPROVAL);
  //   }else{
  //     this.tableList=false;
  //     this.commonService.openToastWarningMessage("Kindly enter Returned By and Date of Return in Loan Received Info tab");
  //   }
  // }

  // if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.RETURN_REQUEST_APPROVAL){
  //   if(this.loanCreateForm.controls.actualDateOfReturnDisp.value!=null && this.loanCreateForm.controls.returnReceivedById.value>0){
  //     this.loanCreateForm.controls.loanStatusId.setValue(allloanStatus.REQUEST_FOR_RETURN);
  //     this.tableList=true;
  //   }else{
  //     this.commonService.openToastWarningMessage("Kindly enter Actual Date of Return and Return received by info Return Info tab");
  //     this.tableList=false;
  //   }

  // }

  if(this.tableList){
    var obj = {
      'loanReturnsTO' : this.loanCreateForm.getRawValue(),
      'assetList': this.assetList.length >0 ? this.assetList : []
    }

    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateInternalLoanAndReturns, obj).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.location.back();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
  }

  if(displayButton == 'Update') {
    var obj1 = {
      'loanReturnsTO' : this.loanCreateForm.getRawValue(),
    }
    this.commonService.showSpinner();
    this.loanCreateForm.controls.dateOfReturnDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.loanCreateForm.controls.dateOfReturnDisp.value));
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateInternalLoanAndReturnsV1, obj1).subscribe(
      data => {
        if (data.success) {
          this.commonService.showSpinner();
          this.commonService.openToastSuccessMessage(data.message);
          this.location.back();
        } else {
          this.commonService.showSpinner();
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.commonService.showSpinner();
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
  }

 }
 loanListTemp: any=[];
 approveOrRejectLoan(mode){
  if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.REQUESTED_FOR_LOAN){
    if(mode=='APPROVED'){
      if(this.loanCreateForm.controls.locationId.value!=this.loanCreateForm.controls.loanedToId.value){
        this.loanCreateForm.controls.generateGatePass.setValue(true);
      }else{
        this.loanCreateForm.controls.generateGatePass.setValue(false);
      }
      this.loanCreateForm.controls.loanStatusUpdateId.setValue(allloanStatus.LOAN_APPROVED);
      this.loanCreateForm.controls.assetStatusPreviousId.setValue(allassetStatus.IN_USE);
    }else if(mode=='REJECTED'){
      this.loanCreateForm.controls.loanStatusUpdateId.setValue(allloanStatus.LOAN_REJECTED);
      this.loanCreateForm.controls.generateGatePass.setValue(false);
    }
    this.loanListTemp.push({'loanId':this.loanCreateForm.controls.loanId.value,
                            'generateGatePass':this.loanCreateForm.controls.generateGatePass.value,
                            'assetId':this.loanCreateForm.controls.assetId.value});

    this.loanCreateForm.controls.loanIdList.setValue(this.loanListTemp);

  } else if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.AWAITING_FOR_RECEIVED_BY_APPROVAL){
    this.loanCreateForm.controls.generateGatePass.setValue(false);
    this.loanCreateForm.controls.assetStatusPreviousId.setValue(allassetStatus.IN_USE);
    this.loanCreateForm.controls.ownershipType.setValue('LOAN');
    this.loanCreateForm.controls.loanStatusUpdateId.setValue(allloanStatus.LOANED);
  } else if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.AWAITING_FOR_RETURN_APPROVAL){
    if(this.loanCreateForm.controls.locationId.value!=this.loanCreateForm.controls.loanedToId.value){
      this.loanCreateForm.controls.generateGatePass.setValue(true);
      this.loanCreateForm.controls.loanStatusUpdateId.setValue(allloanStatus.RETURN_REQUEST_APPROVAL);
    }else{
      this.loanCreateForm.controls.generateGatePass.setValue(false);
      this.loanCreateForm.controls.loanStatusUpdateId.setValue(allloanStatus.RETURN_REQUEST_APPROVAL);
    }
    this.loanListTemp.push({'loanId':this.loanCreateForm.controls.loanId.value,
                            'generateGatePass':this.loanCreateForm.controls.generateGatePass.value,
                            'assetId':this.loanCreateForm.controls.assetId.value});
    this.loanCreateForm.controls.loanIdList.setValue(this.loanListTemp);
  }else if(this.loanCreateForm.controls.loanStatusId.value==allloanStatus.REQUEST_FOR_RETURN){
    this.loanCreateForm.controls.generateGatePass.setValue(false);
    this.loanCreateForm.controls.assetStatusPreviousId.setValue(allassetStatus.IN_USE);
    this.loanCreateForm.controls.ownershipType.setValue('OWN');
    this.loanCreateForm.controls.loanStatusUpdateId.setValue(allloanStatus.LOAN_RETURNED);
  }

  this.commonService.commonInsertService('updateApprovalStatusForInternalLoans.sams', this.loanCreateForm.getRawValue()).subscribe(
    data => {
      if (data.success) {
        this.ngOnInit();
        this.exit();
      }else{
        this.commonService.openToastWarningMessage(data.message);
      }
    }, error => {
    }
  );
 }

 listOfEmployeeName(searchKey,event) {
  if (event == 1) {
    this.scrollsyncEmployee1 = true;
  }else if (event == 2) {
    this.scrollsyncEmployee2 = true;
  }else if (event == 3) {
    this.scrollsyncEmployee3 = true;
  }
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
  this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchKey.term, '', '',
    this.recordsPerPageForCombo, this.employeePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchKey, this.employeePageNumber , this.employeeCombo , data.responseData.comboList)
        this.employeePageNumber = this.getData.pageNumber;
        this.employeeCombo = this.getData.dataList;
        this.scrollsyncEmployee1 = false;
        this.scrollsyncEmployee2 = false;
        this.scrollsyncEmployee3 = false;
      });
}

loadDepartmentComboDataReturn(searchValue) {
  this.scrollsyncDept = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '5' : '';
  this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.departmentPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.assetGroupPageNumber , this.departmentList , data.responseData.comboList)
      this.assetGroupPageNumber = this.getData.pageNumber;
      this.departmentList = this.getData.dataList;
      this.scrollsyncDept = false;
    }
  );
}

selectedDepartmentDataReturn(event) {
  if (event == undefined) {
    this.loanCreateForm.controls.returnToDeptId.setValue(0);
    this.loanCreateForm.controls.returnToDeptName.setValue('');
    this.departmentList = [];
    this.departmentPageNumber = 1;
  } else {
    this.loanCreateForm.controls.returnToDeptId.setValue(event.departmentId);
    this.loanCreateForm.controls.returnToDeptName.setValue(event.departmentName);
  }
}

receivedByDtls(event) {
  if (event === undefined) {
    this.loanCreateForm.controls.returnById.setValue(0);
    this.loanCreateForm.controls.returnedByName.setValue('');
    this.loanCreateForm.controls.returnedByEmailId.setValue('');
    this.loanCreateForm.controls.returnedByContactNo.setValue('');
  } else {
    this.loanCreateForm.controls.returnById.setValue(event.employeeId);
    this.loanCreateForm.controls.returnedByName.setValue(event.displayName);
    this.loanCreateForm.controls.returnedByContactNo.setValue(event.officeContactNo);
    this.loanCreateForm.controls.returnedByEmailId.setValue(event.officeEmailId);

  }
}

returnReceivedByDtl(event) {
  if (event === undefined) {
    this.loanCreateForm.controls.returnReceivedById.setValue(0);
    this.loanCreateForm.controls.returnReceivedBy.setValue('');
    this.loanCreateForm.controls.returnReceivedEmailId.setValue('');
    this.loanCreateForm.controls.returnReceivedContactNo.setValue('');
  } else {
    this.loanCreateForm.controls.returnReceivedById.setValue(event.employeeId);
    this.loanCreateForm.controls.returnReceivedBy.setValue(event.displayName);
    this.loanCreateForm.controls.returnReceivedContactNo.setValue(event.officeContactNo);
    this.loanCreateForm.controls.returnReceivedEmailId.setValue(event.officeEmailId);
  }
}


loadAssetConditionComboData(searchValue) {
  this.scrollsyncAssetCondition = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listAllAssetConditionCombo.sams', searchValue.term, this.loanCreateForm.controls.assetStatusId?.value, '',
    this.recordsPerPageForCombo, this.assetConditionPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetConditionPageNumber , this.assetConditionCombo , data.responseData.comboList)
        this.assetConditionPageNumber = this.getData.pageNumber;
        this.assetConditionCombo = this.getData.dataList;
        this.scrollsyncAssetCondition = false;
      }
    );
}


selectedAssetCondition(event) {
  if (event === undefined) {
    this.assetConditionPageNumber = 1;
    this.assetConditionCombo = [];
    this.loanCreateForm.controls.returnAssetCondition.setValue('');
  } else {
    this.loanCreateForm.controls.returnAssetConditionId.setValue(event.assetConditionId);
    this.translateService.get([event.assetCondition])
    .subscribe((val) => {
      const status = Object.values(val)
      this.loanCreateForm.controls.returnAssetCondition.setValue(status[0])
    });
  }
}

  navigateToSourceScreen(id?: number, sourceModule?: string, mode?: string) {
    if (sourceModule == 'GATE PASS') {
      this.router.navigate(['home/asset/gatePassCreate/' + id + '/' + mode]);
    }
    if (sourceModule == 'INTERNAL LOAN') {
      this.router.navigate(['home/asset/internalLoanCreate/' + id + '/' + mode]);
    }
    if (sourceModule == 'EXTERNAL LOAN') {
      this.router.navigate(['home/asset/loanReturnRequesCreate/' + id + '/' + mode]);
    }
    if (sourceModule == 'ASSET RELOCATE') {
      this.router.navigate(['home/asset/assetRelocationList']);
    }
  }

}
