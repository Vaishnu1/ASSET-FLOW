import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../Services/common-service/common.service';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from '../../../../Constants/CommonHint';
import { Location } from '@angular/common';
import { UniqueValidationModel } from '../../../../Model/base/uniqueValidation';
import { allAssetAuditStatus } from '../../../../Constants/AllStatusConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { PhysicalAuditCreateConfirmationComponent } from '../../Asset/physical-audit-create-confirmation/physical-audit-create-confirmation.component';
import { PhysicalAuditCreateConfirmationV1Component } from '../physical-audit-create-confirmation-v1/physical-audit-create-confirmation-v1.component';

@Component({
  selector: 'app-asset-physical-audit-create',
  templateUrl: './asset-physical-audit-create.component.html',
  styleUrls: ['./asset-physical-audit-create.component.css']
})
export class AssetPhysicalAuditCreateComponent implements OnInit {

  //COMBO
  locationCombo: any = [];
  assetCategoryName : any = [];
  subCategoryName: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  departmentCombo: any = [];
  subDepartmentCombo: any = [];
  assetStatusCombo: any = [];
  assetCodeCombo: any = [];

  displayedColumns = [ 'sno', 'locationName', 'assetCode', 'assetCategoryName','subCategoryName','assetGroupName','modelName', 'departmentName','subDepartment','assetStatus', 'functionalStatus'];
  dataSource = [];
  subLoader: boolean = false;

  pageSize:string = '100';
  pageIndex:string = '0';

  locationPageNumber:number;
  assetCategoryPageNumber:number;
  assetSubCategorPageNumber:number;
  assetGroupPageNumber:number;
  modelComboPageNumber:number;
  departmentPageNumber:number;
  subDepartmentPageNumber:number;
  asssetStatusPageNumber:number;
  assetCodePageNumber: number;

  scrollsyncLocation = false;
  scrollsyncAssetCategory = false;
  scrollsyncAssetSubCategory = false;
  scrollsyncAssetGroup = false;
  scrollsyncModel = false;
  scrollsyncDepartment = false;
  scrollsyncSubDepartment = false;
  scrollsyncAssetStatus = false;
  submitFlag = false;
  uniqueFlag = false;
  scrollsyncAssetCode = false;


  recordsPerPageForCombo:string;

  //Set Page Title
 title = 'Asset Optima - Physical Audit';

 assetPhysicalMainForm: FormGroup;

 //COMMON HINT MESSAGE
 CommonhintMsg = new CommonHint();

 newDate : String = '';

 ErrorMsg :String;

 searchKey: any = '';
 getData: getData;
 length: number;

  scrollsyncBlock = false;
  scrollsyncFloor = false;
  scrollsyncRoom = false;

  blockNamePageNumber: number;
  floorNamePageNumber: number;
  roomNamePageNumber: number;

  blockNameCombo: any = [];
  floorNameCombo: any = [];
  roomNameCombo: any = [];

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly commonService: CommonService,
              private readonly assetOptimaConstants: AssetOptimaConstants,
              private readonly userSessionService: UserSessionService,
              private readonly router: Router,
              private readonly titleService: Title,
              private readonly locationRef : Location,
              private translateService: TranslateService,
              private readonly dialog: MatDialog
              ) {

        this.locationPageNumber = 1;
        this.assetCategoryPageNumber = 1;
        this.assetSubCategorPageNumber = 1;
        this.assetGroupPageNumber = 1;
        this.modelComboPageNumber = 1;
        this.departmentPageNumber = 1;
        this.subDepartmentPageNumber = 1;
        this.asssetStatusPageNumber = 1;
        this.assetCodePageNumber =1;
        this.blockNamePageNumber = 1;
        this.floorNamePageNumber = 1;
        this.roomNamePageNumber = 1;
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.assetPhysicalMainForm = new FormGroup({
      locationId : new FormControl(''),
      locationName : new FormControl('',[Validators.required]),
      assetCategoryId : new FormControl(0),
      assetCategoryName : new FormControl(null),
      subCategoryId : new FormControl(0),
      subCategoryName : new FormControl(null),
      assetGroupId : new FormControl(0),
      assetGroupName : new FormControl(null),
      modelId : new FormControl(0),
      modelName : new FormControl(null),
      departmentId : new FormControl(0),
      departmentName : new FormControl(null),
      subDepartmentId : new FormControl(0),
      subDepartment : new FormControl(null),
      assetStatus : new FormControl(null),
      assetStatusId : new FormControl(0),
      assetCode : new FormControl(null),
      functionalStatus : new FormControl(null),
      phyAuditName : new FormControl('',[Validators.required,Validators.maxLength(100), Validators.minLength(1)]),
      phyAuditDate : new FormControl(''),
      phyAuditDateDisp : new FormControl(this.commonService.getCurrentDateYYYYMMDD(),[Validators.required]),
      active : new FormControl('ACTIVE'),
      assetAuditStatusId : new FormControl(0),
      phyAuditStatus : new FormControl('SNAPSHOT CREATED'),
      buildingRoomIds: new FormControl([]),
      buildingFloorId: new FormControl(0),
      buildingBlockId: new FormControl(0),
      floorName: new FormControl(''),
      blockName: new FormControl(''),
      roomNames: new FormControl([]),
      auditType: new FormControl('ASSET')
      })

    this.assetPhysicalMainForm.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.assetPhysicalMainForm.controls['locationId'].setValue(this.userSessionService.getUserLocationId());
    this.newDate=this.commonService.getCurrentDateYYYYMMDD();
    this.length=0;
    // this.check();
  }

  // save(){
   

  //   this.check();

  //   const totalAssetCount = this.dataSource.length;
  //   let unAvailableAssetAuditNames = [];
  //   let availableToProcess = 0;
  //   for(let i = 0; i < this.dataSource.length; i++){
  //     if(this.dataSource[i].avilableToProcess == true){
  //       availableToProcess++;
  //     }
  //     unAvailableAssetAuditNames.push(...this.dataSource[i].unAvailableAssetAuditNames);
  //   }

  //   // Remove duplicates
  //   unAvailableAssetAuditNames = unAvailableAssetAuditNames.filter(
  //     (item, index, self) => self.indexOf(item) === index
  //   );

  //   if(availableToProcess == totalAssetCount){
  //     this.assetPhysicalMainForm.controls.assetAuditStatusId.setValue(allAssetAuditStatus.SCHEDULED);
  //          this.commonService.showSpinner();
  //          this.commonService.commonInsertService('createAssetSnapshot.sams',this.assetPhysicalMainForm.getRawValue()).subscribe(
  //            data => {
  //              if(data.success){
  //                this.commonService.openToastSuccessMessage("Audit Created Successfully.");
  //                this.locationRef.back();
  //                this.commonService.hideSpinner();
  //              } else {
  //                this.commonService.openToastErrorMessage(data.message);
  //                this.commonService.hideSpinner();
  //              }
  //            }
  //         );
  //   }else if(availableToProcess >= 0){

  //   const dialogRef = this.dialog.open(PhysicalAuditCreateConfirmationComponent, {
  //     height: 'auto',
  //     width: '400px',
  //     data: {
  //       'totalAssetCount' : totalAssetCount,
  //       'auditedAssetCount' : totalAssetCount - availableToProcess,
  //       'availableToProcessAssetCount' : availableToProcess,
  //       'unAvailableAssetAuditNames' : unAvailableAssetAuditNames
  //     }
  //   });
  //   dialogRef.disableClose = true;
  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //           if (data.status === true) {
              
  //              this.assetPhysicalMainForm.controls.assetAuditStatusId.setValue(allAssetAuditStatus.SCHEDULED);
  //              this.commonService.showSpinner();
  //              this.commonService.commonInsertService('createAssetSnapshot.sams',this.assetPhysicalMainForm.getRawValue()).subscribe(
  //                data => {
  //                  if(data.success){
  //                    this.commonService.openToastSuccessMessage("Audit Created Successfully.");
  //                    this.locationRef.back();
  //                    this.commonService.hideSpinner();
  //                  } else {
  //                    this.commonService.openToastErrorMessage(data.message);
  //                    this.commonService.hideSpinner();
  //                  }
  //                }
  //             );

  //           }
  //         });

  //       }
      
    

  // }

    save() {

    // this.check();

    const totalAssetCount = this.dataSource.length;
    let unAvailableAssetAuditNames = [];
    let cnlAssetData = [];
    let availableToProcess = 0;
    for (let i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].avilableToProcess == true) {
        availableToProcess++;
      }
      unAvailableAssetAuditNames.push(...this.dataSource[i].unAvailableAssetAuditNames);
    }


    // Remove duplicates
    unAvailableAssetAuditNames = unAvailableAssetAuditNames.filter(
      (item, index, self) => self.indexOf(item) === index
    );

    const assetIds = this.dataSource.map(asset => asset.assetHdrId);
    const referenceAuditId = this.dataSource.length > 0 ? this.dataSource[0].assetPhyAuditHdrId : 0;

    cnlAssetData = this.dataSource
    .map(cnl => cnl.cnlAssetData)
    .filter(list => Array.isArray(list) && list.length > 0);
  
    const oneAuditId = cnlAssetData[0]?.[0]?.assetPhyAuditHdrId;
    // console.log('NUM 1 ',cnlAssetData[0][0].assetPhyAuditHdrId)

    if (assetIds.length > 0) {
      this.commonService.showSpinner();
      let decision = '';  
      this.commonService.commonInsertService('checkChangeCeid.sams', { assetIds }).subscribe(
        data => {
          if (data.success) {
            this.commonService.hideSpinner();
            if (data.message === 'Some assets cannot be processed right now due to pending Change CEID updates.') {
              // this.commonService.openToastWarningMessage(data.message);
              const dialogRef = this.dialog.open(PhysicalAuditCreateConfirmationV1Component, {
                width: '700px',
                maxHeight: '90vh',
                data: {
                  pendingCeidAssets: data.responseData,
                }
              });

              dialogRef.afterClosed().subscribe((decision1) => {

                decision = decision1;

                if (decision === 'include') {
                  this.proceedWithAuditCreation(totalAssetCount, availableToProcess, unAvailableAssetAuditNames, decision, cnlAssetData, oneAuditId);
                } else if (decision === 'exclude') {
                  // Exclude CEID assets before proceeding
                  const ceidAssetIds = data.responseData.map((item) => item.assetId);
                  this.dataSource = this.dataSource.filter(asset => !ceidAssetIds.includes(Number(asset.assetHdrId)));

                  // Recalculate
                  const totalAfterExclusion = this.dataSource.length;
                  let unAvailableAfterExclusion = [];
                  let availableAfterExclusion = 0;

                  for (let i = 0; i < this.dataSource.length; i++) {
                    if (this.dataSource[i].avilableToProcess === true) {
                      availableAfterExclusion++;
                    }
                    unAvailableAfterExclusion.push(...this.dataSource[i].unAvailableAssetAuditNames);
                  }

                  // Remove duplicates
                  unAvailableAfterExclusion = unAvailableAfterExclusion.filter(
                    (item, index, self) => self.indexOf(item) === index
                  );

                  this.proceedWithAuditCreation(
                    totalAfterExclusion,
                    availableAfterExclusion,
                    unAvailableAfterExclusion,
                    decision,
                    cnlAssetData,
                    oneAuditId
                  );
                }
              });

            } else {
              this.proceedWithAuditCreation(totalAssetCount, availableToProcess, unAvailableAssetAuditNames, 'INCLUDE',cnlAssetData, oneAuditId);
            }
          } else {
            this.commonService.hideSpinner();
            this.commonService.openToastErrorMessage(data.message);
          }

        }
      );
    }else{

      // For Empty Audit Create 
      this.assetPhysicalMainForm.controls.assetAuditStatusId.setValue(allAssetAuditStatus.SCHEDULED);
      const requestPayload = this.assetPhysicalMainForm.getRawValue();

      this.commonService.commonInsertService('createAssetSnapshot.sams', requestPayload).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage("Audit Created Successfully.");
            this.locationRef.back();
            this.commonService.hideSpinner();
          } else {
            if(data.message === 'No eligible assets found to insert. Audit will not be created.'){
              this.commonService.openToastWarningMessage(data.message);
            } else {
              this.commonService.openToastErrorMessage(data.message);
            }
            this.commonService.hideSpinner();
          }
        }
      );

    }


  }

  proceedWithAuditCreation(totalAssetCount: number, availableToProcess: number, unAvailableAssetAuditNames: string[], decision: string, cnlAssetData: string[], referenceAuditId: number) {
    if (availableToProcess == totalAssetCount) {
      this.assetPhysicalMainForm.controls.assetAuditStatusId.setValue(allAssetAuditStatus.SCHEDULED);
      this.commonService.showSpinner();

      const requestPayload = this.assetPhysicalMainForm.getRawValue();
      requestPayload.userDecision = decision;
      requestPayload.referenceAuditId = referenceAuditId ? referenceAuditId : 0;
      requestPayload.cnlDecision = 'WITHOUTCNL';

      this.commonService.commonInsertService('createAssetSnapshot.sams', requestPayload).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage("Audit Created Successfully.");
            this.locationRef.back();
            this.commonService.hideSpinner();
          } else {
            if(data.message === 'No eligible assets found to insert. Audit will not be created.'){
              this.commonService.openToastWarningMessage(data.message);
            } else {
              this.commonService.openToastErrorMessage(data.message);
            }
            this.commonService.hideSpinner();
          }
        }
      );
    } else if (availableToProcess >= 0) {
      console.log('TOTAL ',totalAssetCount)
      console.log('AVAILABLE ',availableToProcess)

      const dialogRef = this.dialog.open(PhysicalAuditCreateConfirmationComponent, {
        width: '650px',
        maxHeight: '75vh',
        data: {
          'totalAssetCount': totalAssetCount,
          'auditedAssetCount': totalAssetCount - availableToProcess,
          'availableToProcessAssetCount': availableToProcess,
          'unAvailableAssetAuditNames': unAvailableAssetAuditNames,
          'cnlAssetData': cnlAssetData
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status === true) {
            // console.log('NUM 2 ',cnlAssetData[0])
            // console.log("CNL DATAAA", data)
            this.assetPhysicalMainForm.controls.assetAuditStatusId.setValue(allAssetAuditStatus.SCHEDULED);
            const requestPayload = this.assetPhysicalMainForm.getRawValue();
            requestPayload.userDecision = decision;
            requestPayload.cnlDecision = data.cnlDecision;
            requestPayload.referenceAuditId = referenceAuditId ? referenceAuditId : 0;

            this.commonService.showSpinner();
            this.commonService.commonInsertService('createAssetSnapshot.sams', requestPayload).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage("Audit Created Successfully.");
                  this.locationRef.back();
                  this.commonService.hideSpinner();
                } else {
                  if(data.message === 'No eligible assets found to insert. Audit will not be created.'){
                    this.commonService.openToastWarningMessage(data.message);
                  } else {
                    this.commonService.openToastErrorMessage(data.message);
                  }
                  this.commonService.hideSpinner();
                }
              }
            );

          }
        });

    }
  }

  clear(){
    this.assetPhysicalMainForm.reset();
    this.assetPhysicalMainForm.updateValueAndValidity();
    this.assetPhysicalMainForm.controls['assetGroupName'].enable();
    this.assetPhysicalMainForm.controls['assetCategoryName'].enable();
    this.assetPhysicalMainForm.controls['subCategoryName'].enable();
    this.assetPhysicalMainForm.controls['subDepartment'].enable();
    this.assetPhysicalMainForm.controls['departmentName'].enable();
    this.assetPhysicalMainForm.controls['modelName'].enable();
    this.assetPhysicalMainForm.controls['assetStatus'].enable();
    this.assetPhysicalMainForm.controls['functionalStatus'].enable();
    this.dataSource = [];
    this.ngOnInit();
  }

  exit(){
    this.locationRef.back();
  }

  dateValidation(event){
    return false;
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }


  functionalStatus = [
    {id: 1, name: 'CRITICAL'},
    {id: 2, name: 'NON CRITICAL'}
  ];

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.locationPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
        this.locationPageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollsyncLocation = false;
     }
    );
  }

  selectedLocationData(event) {
    if(event===undefined){
      this.assetPhysicalMainForm.controls['locationId'].setValue(0);
      this.assetPhysicalMainForm.controls['locationName'].setValue(null);

      this.assetPhysicalMainForm.controls['assetCode'].setValue(null);
      this.locationPageNumber=1;
      this.locationCombo=[];

      this.assetCodePageNumber=1;
      this.assetCodeCombo=[];

      this.assetPhysicalMainForm.controls['departmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['departmentName'].setValue(null);
      this.assetPhysicalMainForm.controls['subDepartmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['subDepartment'].setValue(null);
      this.departmentPageNumber=1;
      this.departmentCombo=[];
      this.subDepartmentPageNumber=1;
      this.subDepartmentCombo=[];
    }else{
      this.assetPhysicalMainForm.controls['locationName'].setValue(event.locationName);
      this.assetPhysicalMainForm.controls['locationId'].setValue(event.locationId);

      this.assetPhysicalMainForm.controls['assetCode'].setValue(null);
      this.assetCodePageNumber=1;
      this.assetCodeCombo=[];

      this.assetPhysicalMainForm.controls['departmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['departmentName'].setValue(null);
      this.assetPhysicalMainForm.controls['subDepartmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['subDepartment'].setValue(null);
      this.departmentPageNumber=1;
      this.departmentCombo=[];
      this.subDepartmentPageNumber=1;
      this.subDepartmentCombo=[];
    }
    this.uniqueValidation();
    // this.check();
  }

  listOfCategory(searchValue) {
    this.scrollsyncAssetCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCategoryCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber , this.assetCategoryName , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.scrollsyncAssetCategory = false;
      }
    );
  }

  getCategoryComboValue(event) {
    if (event === undefined) {
      this.submitFlag = false;
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupId'].setValue(0);
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
    } else {
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupId'].setValue(0);
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
    }
    // this.check();
  }

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    const assetCategoryId = this.assetPhysicalMainForm.controls['assetCategoryId'].value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, assetCategoryId,
      '', this.recordsPerPageForCombo, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryName , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryName = this.getData.dataList;
          this.scrollsyncAssetSubCategory = false;
        }
      );
  }

  getSubCategoryComboValue(event) {
    if (event === undefined) {
      this.submitFlag = false;
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetCategoryName'].enable();
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetCategoryName'].enable();
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
    } else {
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue(event.subCategoryId);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(event.categoryName);
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue(event.categoryId);
      this.assetPhysicalMainForm.controls['assetCategoryName'].disable();
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
      this.modelCombo=[];
      this.modelComboPageNumber=1;
    }
    // this.check();
  }

  OpenassetPage(){
    this.router.navigate(['home/asset/assetPhysicalAudit']);
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup=true;
    const subCategoryId = this.assetPhysicalMainForm.controls['subCategoryId'].value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetGroupCombo.sams', searchKey.term,subCategoryId, '',this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
      this.assetGroupPageNumber = this.getData.pageNumber;
      this.assetGroup = this.getData.dataList;
      this.scrollsyncAssetGroup = false;
    });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(event.assetGroupName);
      this.assetPhysicalMainForm.controls['assetGroupId'].setValue(event.assetGroupId);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue(event.subCategoryId);
      this.assetPhysicalMainForm.controls['assetCategoryName'].disable();
      this.assetPhysicalMainForm.controls['subCategoryName'].disable();
      this.modelCombo=[];
      this.modelComboPageNumber=1;
      this.assetGroupPageNumber=1;
    }else{
      this.submitFlag = false;
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetCategoryName'].enable();
      this.assetPhysicalMainForm.controls['subCategoryName'].enable();
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
      this.modelCombo=[];
      this.modelComboPageNumber=1;
    }
    // this.check();
  }

  listOfAllModel(searchValue) {
    this.scrollsyncModel=true;
    const att1 = this.assetPhysicalMainForm.controls.assetGroupId.value
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams',searchValue.term,'',
    att1>0?att1:'',this.recordsPerPageForCombo,this.modelComboPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelCombo = this.getData.dataList;
      this.scrollsyncModel=false;
    });
  }

  getModelComboValue(event) {

    if (event != null) {
      this.assetPhysicalMainForm.controls['modelId'].setValue(event.modelId);
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(event.assetGroupName);
      this.assetPhysicalMainForm.controls['assetGroupId'].setValue(event.assetGroupId);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue((event.assetCategoryName !== null && event.assetCategoryName !=='') ?
                                                                 event.assetCategoryName:event.assetCategoryName);
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue((event.assetCategoryId !== null && event.assetCategoryId !=='') ?
                                                               event.assetCategoryId:event.assetCategoryId);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue((event.subCategoryName !== null && event.subCategoryName !=='') ?
                                                               event.subCategoryName:event.subCategoryName);
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue((event.subCategoryId !== null && event.subCategoryId !=='') ?
                                                             event.subCategoryId:event.subCategoryId);
      this.assetPhysicalMainForm.controls['assetGroupName'].disable();
      this.assetPhysicalMainForm.controls['assetCategoryName'].disable();
      this.assetPhysicalMainForm.controls['subCategoryName'].disable();
    }else{
      this.assetPhysicalMainForm.controls['modelId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetGroupName'].enable();
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetGroupName'].enable();
      this.assetPhysicalMainForm.controls['assetCategoryName'].enable();
      this.assetPhysicalMainForm.controls['subCategoryName'].enable();
      this.modelCombo=[];
      this.modelComboPageNumber=1;
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
      this.submitFlag = false;
    }
    // this.check();
  }

  loadDepartmentComboData(searchValue) {
    this.scrollsyncDepartment=true;
    const locationId = this.assetPhysicalMainForm.controls.locationId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfDepartmentInBranchCombo.sams',searchValue.term,locationId,'',
            this.recordsPerPageForCombo,this.departmentPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentCombo , data.responseData.comboList)
        this.departmentPageNumber = this.getData.pageNumber;
        this.departmentCombo = this.getData.dataList;
        this.scrollsyncDepartment = false;
     }
    );
  }

  selectedDepartmentData(event) {
    if(event===undefined){
      this.submitFlag = false;
      this.assetPhysicalMainForm.controls['departmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['departmentName'].setValue(null);
      this.assetPhysicalMainForm.controls['subDepartmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['subDepartment'].setValue(null);
      this.departmentPageNumber=1;
      this.departmentCombo=[];
      this.subDepartmentPageNumber=1;
      this.subDepartmentCombo=[];
    }else{
      this.assetPhysicalMainForm.controls['departmentId'].setValue(event.departmentId);
      this.assetPhysicalMainForm.controls['departmentName'].setValue(event.departmentName);
      this.assetPhysicalMainForm.controls['subDepartmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['subDepartment'].setValue(null);
      this.subDepartmentPageNumber=1;
      this.subDepartmentCombo=[];
    }
    // this.check();
  }

  loadSubDepartmentComboData(searchValue) {
    this.scrollsyncSubDepartment=true;
    const departmentId = this.assetPhysicalMainForm.controls.departmentId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams',searchValue.term,departmentId > 0 ? departmentId : '','',
            this.recordsPerPageForCombo,this.subDepartmentPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentCombo , data.responseData.comboList)
        this.subDepartmentPageNumber = this.getData.pageNumber;
        this.subDepartmentCombo = this.getData.dataList;
        this.scrollsyncSubDepartment=false;
     }
    );
  }

  selectedSubDepartmentData(event) {
    if(event===undefined){
      this.submitFlag = false;
      this.assetPhysicalMainForm.controls['subDepartmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['subDepartment'].setValue(null);
      this.assetPhysicalMainForm.controls['departmentName'].setValue(null);
      this.assetPhysicalMainForm.controls['departmentId'].setValue(0);
      this.assetPhysicalMainForm.controls['departmentName'].enable();
      this.subDepartmentPageNumber=1;
      this.subDepartmentCombo=[];
    }else{
      this.assetPhysicalMainForm.controls['subDepartmentId'].setValue(event.subDepartmentId);
      this.assetPhysicalMainForm.controls['subDepartment'].setValue(event.subDepartmentName);
      this.assetPhysicalMainForm.controls['departmentName'].setValue(event.departmentName);
      this.assetPhysicalMainForm.controls['departmentId'].setValue(event.departmentId);
      this.assetPhysicalMainForm.controls['departmentName'].disable();
    }
    // this.check();
  }

  loadAssetStatusComboData(searchValue) {
    this.scrollsyncAssetStatus=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetStatusCombo.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.asssetStatusPageNumber,'','assetPhyAudit').subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.asssetStatusPageNumber , this.assetStatusCombo , data.responseData.comboList)
        this.asssetStatusPageNumber = this.getData.pageNumber;
        this.assetStatusCombo = this.getData.dataList;
        this.scrollsyncAssetStatus = false;
     }
    );
  }

  selectedAssetStatusList(event) {
    if(event===undefined){
      this.submitFlag = false;
      this.assetPhysicalMainForm.controls['assetStatusId'].setValue(0);
      this.assetPhysicalMainForm.controls['assetStatus'].setValue(null);
      this.asssetStatusPageNumber=1;
      this.assetStatusCombo=[];
    }else{
      this.translateService.get([event.assetStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.assetPhysicalMainForm.controls['assetStatus'].setValue(status[0]);

        }
      });
      this.assetPhysicalMainForm.controls['assetStatusId'].setValue(event.assetStatusId);
    }
    // this.check();
  }

  uniqueValidation(){
    if(this.assetPhysicalMainForm.controls.phyAuditName.value){
      this.assetPhysicalMainForm.controls.phyAuditName.setValue(this.assetPhysicalMainForm.controls.phyAuditName.value);

      const constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.asset.AssetPhysicalAuditHdrTO";
      constraintData.constraints = {
        'phyAuditName': this.assetPhysicalMainForm.controls.phyAuditName.value,
        'locationId': this.assetPhysicalMainForm.controls.locationId.value === 0 ? this.userSessionService.getUserLocationId()
        : this.assetPhysicalMainForm.controls.locationId.value
      };

      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            this.ErrorMsg = 'Record With Same Audit Name Already Exist.';
            this.assetPhysicalMainForm.controls.phyAuditName.setErrors(Validators.minLength);
            this.assetPhysicalMainForm.controls.phyAuditName.setErrors({"notUnique": true});
            this.uniqueFlag = false;
          }else{
            this.ErrorMsg = '';
            this.uniqueFlag = true;
          }
        }
      );
    }
  }

  check() {
    this.subLoader = true;
    const locId = this.assetPhysicalMainForm.controls.locationId.value === 0 ? this.userSessionService.getUserLocationId(): this.assetPhysicalMainForm.controls.locationId.value;
    this.assetPhysicalMainForm.controls.locationId.setValue(locId);
    var assetPhysicalMainForm = this.assetPhysicalMainForm.getRawValue()
    this.commonService.commonInsertService('fetchListOfAssetAudit.sams',assetPhysicalMainForm).subscribe(
      data => {
        if(data.success){
          this.submitFlag = data.success;
          this.dataSource = data.responseData.dataList;
          this.length=this.dataSource.length;
          this.subLoader = false;

          this.save();
        } else {
          this.submitFlag = data.success;
          this.subLoader = false;
          this.commonService.openToastWarningMessage(data.message);
        }
        if(this.length==0 && !this.subLoader){
          // this.commonService.openToastWarningMessage("No Records found !");
          
          // this.proceedWithAuditCreation(undefined, undefined, undefined, 'INCLUDE',[], 0);
        }
      }
    );
    this.subLoader = false;
  }


  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    const locId = this.assetPhysicalMainForm.controls.locationId.value;
    const departmentId = this.assetPhysicalMainForm.controls.departmentId.value;
    const modelId = this.assetPhysicalMainForm.controls.modelId.value;
    const assetCategoryId = this.assetPhysicalMainForm.controls.assetCategoryId.value;
    const subCategoryId = this.assetPhysicalMainForm.controls.subCategoryId.value;
    const assetGroupId = this.assetPhysicalMainForm.controls.assetGroupId.value;
    const assetStatusId = this.assetPhysicalMainForm.controls.assetStatusId.value;
    const functionalStatus = this.assetPhysicalMainForm.controls.functionalStatus.value;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResultsV1('listAllAssetCodeCombo.sams', searchValue.term,locId > 0 ? locId : 0,
    departmentId > 0 ? departmentId : 0,modelId > 0 ? modelId : 0,assetCategoryId > 0 ? assetCategoryId : 0,subCategoryId > 0 ? subCategoryId : 0,assetGroupId > 0 ? assetGroupId : 0, this.recordsPerPageForCombo, this.assetCodePageNumber,assetStatusId > 0 ? assetStatusId :'', functionalStatus != null ? functionalStatus :'',[1,2]).subscribe(
        (data) => {
          if (data.success) {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
            this.assetCodePageNumber = this.getData.pageNumber;
            this.assetCodeCombo = this.getData.dataList;
            // console.log(" Asset Code combo length : "+this.assetCodeCombo.length)
            // this.assetCodeCombo = (this.assetCodeCombo).filter(data => {return data.avilableToProcess === true;});
          }
          this.scrollsyncAssetCode = false;
        }
      );
  }

  selectedAssetCodeData(event) {
    if(event===undefined){
      this.submitFlag = false;
      this.assetPhysicalMainForm.controls['assetCode'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(null);
      this.assetPhysicalMainForm.controls['subDepartment'].setValue(null);
      this.assetPhysicalMainForm.controls['departmentName'].setValue(null);
      this.assetPhysicalMainForm.controls['modelName'].setValue(null);
      this.assetPhysicalMainForm.controls['assetStatus'].setValue(null);
      this.assetPhysicalMainForm.controls['functionalStatus'].setValue(null);
      this.assetPhysicalMainForm.controls['assetGroupName'].enable();
      this.assetPhysicalMainForm.controls['assetCategoryName'].enable();
      this.assetPhysicalMainForm.controls['subCategoryName'].enable();
      this.assetPhysicalMainForm.controls['subDepartment'].enable();
      this.assetPhysicalMainForm.controls['departmentName'].enable();
      this.assetPhysicalMainForm.controls['modelName'].enable();
      this.assetPhysicalMainForm.controls['assetStatus'].enable();
      this.assetPhysicalMainForm.controls['functionalStatus'].enable();
      this.assetCodePageNumber=1;
      this.assetCodeCombo=[];
    }else{
      this.assetPhysicalMainForm.controls['assetCode'].setValue(event.assetCode);
      this.assetPhysicalMainForm.controls['assetGroupName'].setValue(event.assetGroupName);
      this.assetPhysicalMainForm.controls['assetGroupId'].setValue(event.assetGroupId);
      this.assetPhysicalMainForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
      this.assetPhysicalMainForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.assetPhysicalMainForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.assetPhysicalMainForm.controls['subCategoryId'].setValue(event.subCategoryId);
      this.assetPhysicalMainForm.controls['subDepartment'].setValue(event.subDepartment);
      this.assetPhysicalMainForm.controls['subDepartmentId'].setValue(event.subDepartmentId);
      this.assetPhysicalMainForm.controls['departmentName'].setValue(event.departmentName);
      this.assetPhysicalMainForm.controls['departmentId'].setValue(event.departmentId);
      this.assetPhysicalMainForm.controls['modelName'].setValue(event.modelName);
      this.assetPhysicalMainForm.controls['modelId'].setValue(event.modelId);
      this.assetPhysicalMainForm.controls['assetStatus'].setValue(event.assetStatus);
      this.assetPhysicalMainForm.controls['assetStatusId'].setValue(event.assetStatusId);
      this.assetPhysicalMainForm.controls['functionalStatus'].setValue(event.functionalStatus);
      this.assetPhysicalMainForm.controls['assetGroupName'].disable();
      this.assetPhysicalMainForm.controls['assetCategoryName'].disable();
      this.assetPhysicalMainForm.controls['subCategoryName'].disable();
      this.assetPhysicalMainForm.controls['subDepartment'].disable();
      this.assetPhysicalMainForm.controls['departmentName'].disable();
      this.assetPhysicalMainForm.controls['modelName'].disable();
      this.assetPhysicalMainForm.controls['assetStatus'].disable();
      this.assetPhysicalMainForm.controls['functionalStatus'].disable();
    }
    // this.check();
  }

  getFunctionalStatusValue(event){
    if(event===undefined){
      this.assetPhysicalMainForm.controls['functionalStatus'].enable();
    }else{
      this.assetPhysicalMainForm.controls['functionalStatus'].setValue(event.name);
    }
    // this.check();
  }

  loadBlockNameComboData(searchValue) {
    this.scrollsyncBlock = true;
    const locId = this.assetPhysicalMainForm.controls.locationId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term,locId, '',
      this.recordsPerPageForCombo, this.blockNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.blockNamePageNumber , this.blockNameCombo , data.responseData.comboList)
          this.blockNamePageNumber = this.getData.pageNumber;
          this.blockNameCombo = this.getData.dataList;
          this.scrollsyncBlock = false;
        }
      );
  }

  selectedBlockData(event) {
    if (event === undefined) {
      this.assetPhysicalMainForm.controls.buildingBlockId.setValue(0);
      this.blockNamePageNumber = 1;
      this.blockNameCombo = [];

      this.assetPhysicalMainForm.controls.buildingRoomIds.setValue([]);
      this.assetPhysicalMainForm.controls.roomNames.setValue([]);

      this.assetPhysicalMainForm.controls.buildingFloorId.setValue(0);
      this.assetPhysicalMainForm.controls.floorName.setValue('');

    } else {
      this.assetPhysicalMainForm.controls.buildingBlockId.setValue(event.buildingBlockId);
      this.assetPhysicalMainForm.controls.blockName.setValue(event.blockName);

      this.assetPhysicalMainForm.controls.buildingRoomIds.setValue([]);
      this.assetPhysicalMainForm.controls.roomNames.setValue([]);

      this.assetPhysicalMainForm.controls.buildingFloorId.setValue(0);
      this.assetPhysicalMainForm.controls.floorName.setValue('');
    }
    this.roomNamePageNumber = 1;
    this.roomNameCombo = [];
  }

  loadFloorComboData(searchValue) {
    this.scrollsyncFloor = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.floorNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.floorNamePageNumber , this.floorNameCombo , data.responseData.comboList)
          this.floorNamePageNumber = this.getData.pageNumber;
          this.floorNameCombo = this.getData.dataList;
          this.scrollsyncFloor = false;
        }
      );
  }

  selectedFloorData(event) {
    if (event === undefined) {
      this.assetPhysicalMainForm.controls.buildingFloorId.setValue(0);
      this.floorNamePageNumber = 1;
      this.floorNameCombo = [];
    } else {
      this.assetPhysicalMainForm.controls.buildingFloorId.setValue(event.buildingFloorId);
      this.assetPhysicalMainForm.controls.floorName.setValue(event.floorName);

      this.assetPhysicalMainForm.controls.buildingBlockId.setValue(event.blockId);
      this.assetPhysicalMainForm.controls.blockName.setValue(event.blockName);
    }
  }

  loadRoomNameComboData(searchValue) {
    this.scrollsyncRoom = true;
    const locId = this.assetPhysicalMainForm.controls.locationId.value;
    const buildingBlockId = this.assetPhysicalMainForm.controls.buildingBlockId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term,locId,buildingBlockId,
      this.recordsPerPageForCombo, this.roomNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.roomNamePageNumber , this.roomNameCombo , data.responseData.comboList)
          this.roomNamePageNumber = this.getData.pageNumber;
          this.roomNameCombo = this.getData.dataList;
          this.scrollsyncRoom = false;
        }
      );
  }

  selectedRoomData(event) {
    if (event === undefined) {
      this.assetPhysicalMainForm.controls.buildingRoomId.setValue(0);
      this.assetPhysicalMainForm.controls.roomName.setValue('');
      this.roomNamePageNumber = 1;
      this.roomNameCombo = [];

      this.assetPhysicalMainForm.controls.buildingFloorId.setValue(0);
      this.assetPhysicalMainForm.controls.floorName.setValue('');

      this.assetPhysicalMainForm.controls.buildingSegmentId.setValue(0);
      this.assetPhysicalMainForm.controls.segmentName.setValue('');
    } else {
       const roomIds = event.map(r => r.buildingRoomId);
       const roomNames = event.map(r => r.roomName);
      // this.assetPhysicalMainForm.controls.buildingRoomId.setValue(event.buildingRoomId);
      // this.assetPhysicalMainForm.controls.roomName.setValue(event.roomName);
      // this.assetPhysicalMainForm.controls.floorName.setValue(event.floorName);
      // this.assetPhysicalMainForm.controls.segmentName.setValue(event.segmentName);
      // this.assetPhysicalMainForm.controls.floorName.disable();
      // this.assetPhysicalMainForm.controls.segmentName.disable();

      // this.assetPhysicalMainForm.controls.buildingBlockId.setValue(event.blockId);
      // this.assetPhysicalMainForm.controls.blockName.setValue(event.blockName);

      this.assetPhysicalMainForm.patchValue({
      buildingRoomIds: roomIds,
      roomNames: roomNames,
      });
    }
  }

}
