import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../../../../Services/common-service/common.service';
import { UserSessionService } from '../../../../../Services/user-session-service/user-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from '../../../../../Constants/CommonHint';
import { Location } from '@angular/common';
import { ModuleAccessModel } from '../../../../../Model/base/moduleAccess';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddAssetToBatchDialogComponent } from '../add-asset-to-batch-dialog/add-asset-to-batch-dialog.component';
import { BatchDtlModel } from '../../../../../Model/base/batchDtlModel';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-components/delete-confirmation/delete-confirmation.component';
import { AssetOptimaServices } from '../../../../../Constants/AssetOptimaServices';
import { ConfirmConfirmationComponent } from '../../../../../Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-batch-asset-hdr-create',
  templateUrl: './batch-asset-hdr-create.component.html',
  styleUrls: ['./batch-asset-hdr-create.component.css']
})
export class BatchAssetHdrCreateComponent implements OnInit {

  @ViewChild('batchName') searchSetFocus: ElementRef;

  displayedColumns = ['select', 'assetCode','assetdesc','assetserialno', 'category','subCategoryName','assetGroupName', 'model','manufacturerName','supplierName', 'department', 'functionality', 'assetStatus'];

  batchHdrFormGroup: FormGroup;

  headingDisplay: string;
  buttonDisplay: string;
  recordsPerPageForCombo: string;

  batchDtlList =  new MatTableDataSource<any>();
  tempAssetList: any = [];
  locationCombo: any = [];
  manufactuer: any = [];
  supplierList: any = [];
  assetStatusCombo: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  assigneeDepartmentCombo: any = [];
  subDepartmentList: any = [];

  limitCount: any;

  batchHdrId = 0;
  lengthOfBatchDtlListItems = 0;
  lengthOfBatchDtlListItemsRetrieved = 0;
  locationPageNumber: number;
  manufacturerPageNumber: number;
  supplierPageNumber: number;
  asssetStatusPageNumber: number;
  assetGroupPageNumber: number;
  modelComboPageNumber: number;
  assigneeDepartmentPageNumber: number;
  subDepartmentPageNumber: number;

  subLoaderForBatchDtlList = false;
  disableClearButton = false;
  hideButtonInViewMode = false;
  uploadAssetFlag = false;
  disableUpdateButton = false;
  scrollsyncLocation = false;
  scrollsyncmanufacturerName = false;
  scrollSupplierNamesync = false;
  scrollsyncAssetStatus = false;
  scrollsyncAssetGroup = false;
  scrollsyncModel = false;
  scrollsyncAssigneeDepartment = false;
  subDepartmentscrollsync = false;
  modeDisplay: boolean = false;


  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  batchDtlModel: BatchDtlModel;

  searchKey: any = '';
  getData: getData;
  selectedItem: any=0;
  index: number=0;

  constructor(
    private readonly commonServices: CommonService,
    private readonly activatedRouter: ActivatedRoute,
    private readonly userSession: UserSessionService,
    private readonly location: Location,
    private readonly dialog: MatDialog,
    private readonly assetOptimaServices: AssetOptimaServices,
    private readonly userSessionServices: UserSessionService,
    private readonly router :Router
  ) { 
    this.modelAccessModule = new ModuleAccessModel();
    this.locationPageNumber = 1;
    this.manufacturerPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.supplierPageNumber = 1;
    this.asssetStatusPageNumber = 1;
    this.assigneeDepartmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
  }

  ngOnInit() {
    this.batchDtlList.data = [];
    this.batchDtlModel = new BatchDtlModel();

    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_BATCH_ASSETS'];
    this.batchHdrFormGroup = new FormGroup({
      batchHdrId: new FormControl(0),
      orgId: new FormControl(0),
      batchName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      remarks: new FormControl('', [Validators.maxLength(100)]),
      active: new FormControl(true),
      reference1: new FormControl(''),
      reference2: new FormControl(''),
      assetList: new FormControl([]),
      batchDtlList: new FormControl([]),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl('')
    });
    
    this.validateEditMode();

    this.batchDtlModel.locationId = this.userSessionServices.getUserLocationId();
  }

  ngAfterViewInit() {
    this.searchSetFocus.nativeElement.focus();
  }

  validateEditMode() {
    this.activatedRouter.params.subscribe(
      params => {
        let primaryId = params.pId;
        primaryId = Number(primaryId);
        this.batchHdrId = primaryId;
        const mode = params.mode;
        if(primaryId <= 0) {
          this.headingDisplay = 'Create';
          this.buttonDisplay = 'Save';
        } else {
          this.modeDisplay = true;

          this.commonServices.commonGetService('loadBatchHdrDetailByBatchHdrId.sams', this.batchHdrId).subscribe(
            data => {
              this.batchHdrFormGroup.patchValue(data.responseData);
              this.getBatchDtlList(this.batchHdrFormGroup.controls.batchHdrId.value);
            }
          );

          if(mode === 'edit') {
            this.headingDisplay = 'Edit';
            this.buttonDisplay = 'Update';
            this.disableClearButton = true;
            this.modeDisplay =false;
            this.batchHdrFormGroup.controls.batchName.disable();
          } else {
            this.headingDisplay = 'View';
            this.hideButtonInViewMode = true;
            this.batchHdrFormGroup.disable();
          }
        }

      }
    );
  }

  exit() {
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back();
  }

  clear() {
    this.ngOnInit();
    this.selectedItem=0;
    this.index=0;
  }

  save() {
    if(this.batchDtlList.data.length > 0) {
      this.uploadAssetFlag = true;
      this.batchHdrFormGroup.controls.batchDtlList.setValue(this.batchDtlList.data);
      this.batchHdrFormGroup.enable();
      this.commonServices.commonInsertService('saveUpdateBatchHdrTO.sams', this.batchHdrFormGroup.getRawValue()).subscribe(
        data => {
          if(data.success) {
            this.commonServices.openToastSuccessMessage(data.message);
            this.uploadAssetFlag = false;
            localStorage.setItem('previousRoute', this.router.url);
            this.location.back();
          } else {
            this.commonServices.openToastErrorMessage(data.message);
            this.uploadAssetFlag = false;
          }
        }
      );
    } else {
      this.commonServices.openToastWarningMessage("Kindly Select At least One Asset.");
    }
  }

  addAssetToBatch() {
    const dialogRef = this.dialog.open(AddAssetToBatchDialogComponent,
      {
        data : {
          'batchHdrId': this.batchHdrFormGroup.controls.batchHdrId.value,
          'batchName': this.batchHdrFormGroup.controls.batchName.value,
          'alreadyAddedAssetList': this.batchDtlList.data
        },
        width: "100%", height: "auto", maxWidth: "95%"
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if(data.status && data.assetAddedList.length > 0) {
              const assetList = data.assetAddedList;
              this.tempAssetList = this.batchDtlList.data;
              for(const newAssetToBeAdded of assetList) {
                this.tempAssetList.push(newAssetToBeAdded);
                this.lengthOfBatchDtlListItems++;
              }
              this.batchDtlList.data = this.tempAssetList;
              const messageToDisplayAfterAddingAssets = `Assets Added To The List. Kindly "${this.buttonDisplay}" The Record`;
              
              this.commonServices.openToastSuccessMessage(messageToDisplayAfterAddingAssets);
          }
        }
      );
  }

  getBatchDtlList(batchHdrId) {
    this.batchDtlModel.batchHdrId = batchHdrId;
    this.commonServices.commonListService('fetchListOfAllBatchDtl.sams', this.batchDtlModel).subscribe(
      data => {
        if(data.success) {
          this.subLoaderForBatchDtlList = false;
          this.batchHdrFormGroup.controls.batchDtlList.setValue(data.responseData);
          this.batchDtlList.data = data.responseData;
          this.lengthOfBatchDtlListItemsRetrieved = this.batchDtlList.data.length;
          this.lengthOfBatchDtlListItems = this.batchDtlList.data.length;
        } else {
          this.subLoaderForBatchDtlList = false;
          this.commonServices.openToastErrorMessage("Failed to Fetch Batch Asset list");
        }
      }
    );
              
  }

  deleteAssetFromDtlList(element, index) {
    const deleteConfirmationMsg = ` Asset ${element.assetCode} from batch`;
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data : {
        'Text' : deleteConfirmationMsg
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      dataFromDialog => {
        if(dataFromDialog.status) {
          if(element.batchDtlId > 0) {
            this.commonServices.commonGetService('deleteAssetFromBatchByBatchDtlId.sams', element.batchDtlId).subscribe(
              data => {
                if(data.success) {
                  this.removeAssetFromLocalList(element.batchDtlId, index);
                  this.commonServices.openToastSuccessMessage("Record Deleted Successfully.");
                  this.selectedItem=0;
                  this.index=0;
                } else {
                  this.commonServices.openToastErrorMessage(data.message);
                }
              }
            );
          } else {
            this.removeAssetFromLocalList(element.batchDtlId, index);
          }
        }
      }
    );
  }

  removeAssetFromLocalList(batchDtlId, index) {
    this.tempAssetList = this.batchDtlList.data;
    this.tempAssetList.splice(index, 1);
    this.lengthOfBatchDtlListItems--;
    this.batchDtlList.data = this.tempAssetList;
  }

  loadLocationComboData(searchValue) {
    console.log(searchValue);
    
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonServices.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonServices.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonServices.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.batchDtlModel.locationName = '';
      this.batchDtlModel.locationId = 0;
      this.batchDtlModel.locationType='';
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.batchDtlModel.locationName = event.locDisplayField;
      this.batchDtlModel.locationId = event.locationId;
      this.batchDtlModel.locationType=event.locationType;
    }
  }

  listOfManufacturer(searchValue) {
    this.scrollsyncmanufacturerName = true;
    this.limitCount = !(this.commonServices.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonServices.getComboResults(this.assetOptimaServices.listOfManufacturerCombo, searchValue.term, '', '', this.limitCount, 
    this.manufacturerPageNumber, 'ASSET').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonServices.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.scrollsyncmanufacturerName = false;
      }
    );
  }

  getManfacturerComboValue(event) {
    if (event === undefined) {
      this.batchDtlModel.manufacturerId=0;
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];
    } else {
      this.batchDtlModel.manufacturerId=event.manufacturerId;
    }
  }

  listOfSupplier(searchTerms) {
    this.scrollSupplierNamesync = true;
    this.limitCount = !(this.commonServices.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonServices.getComboResults(this.assetOptimaServices.listOfAllSupplierNameCombo, searchTerms.term, '', '', this.limitCount, 
    this.supplierPageNumber,'','ASSET').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonServices.fetchDataList(searchTerms, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSupplierNamesync = false;
      }
    );
  }

  fetchIdOfSupplier(event) {
    if (event === undefined) {
      this.batchDtlModel.supplierId=0;
      this.batchDtlModel.supplierName='';
      this.supplierList = [];
      this.supplierPageNumber = 1;
    } else {
      this.batchDtlModel.supplierId=event.supplierId;
      this.batchDtlModel.supplierName=event.supplierName;
     
    }
  }

  loadAssetStatusComboData(searchValue) {
    this.scrollsyncAssetStatus = true;
    this.recordsPerPageForCombo = !(this.commonServices.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonServices.getComboResults('listAllAssetStatusCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.asssetStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonServices.fetchDataList(searchValue, this.asssetStatusPageNumber , this.assetStatusCombo , data.responseData.comboList)
          this.asssetStatusPageNumber = this.getData.pageNumber;
          this.assetStatusCombo = this.getData.dataList;
          this.scrollsyncAssetStatus = false;
        }
      );
  }

  selectedAssetStatusList(event) {
    if (event === undefined) {
      this.batchDtlModel.assetStatusId = 0;
      this.batchDtlModel.assetStatus = '';
      this.asssetStatusPageNumber = 1;
      this.assetStatusCombo = [];
    } else {
      this.batchDtlModel.assetStatusId = event.assetStatusId;
      this.batchDtlModel.assetStatus = event.assetStatusName;
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonServices.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonServices.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, this.batchDtlModel.subCategoryId, '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonServices.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroup = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
      });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.batchDtlModel.assetGroupName = event.assetGroupName;
      this.batchDtlModel.assetGroupId = event.assetGroupId;

    } else {
      this.batchDtlModel.assetGroupName = "";
      this.batchDtlModel.assetGroupId = 0;
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonServices.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonServices.getComboResults('listOfAllModelCombo.sams', searchKey.term, this.batchDtlModel.manufacturerId > 0 ? this.batchDtlModel.manufacturerId : 0,
      this.batchDtlModel.assetGroupId > 0 ? this.batchDtlModel.assetGroupId : '',
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonServices.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        });
      }

  getModelComboValue(event) {
    if (event != null) {
      this.batchDtlModel.modelId = event.modelId;
      this.batchDtlModel.modelName = event.modelName;
      this.batchDtlModel.manufacturerId=event.manufacturerId;
      this.batchDtlModel.manufacturerName=event.manufacturerName;
    } else {
      this.batchDtlModel.modelId = 0;
      this.batchDtlModel.modelName = '';
      this.batchDtlModel.manufacturerId=0;
      this.batchDtlModel.manufacturerName='';
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  loadAssigneeDepartmentComboData(searchValue) {
    this.scrollsyncAssigneeDepartment = true;
    this.recordsPerPageForCombo = !(this.commonServices.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonServices.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assigneeDepartmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonServices.fetchDataList(searchValue, this.assigneeDepartmentPageNumber , this.assigneeDepartmentCombo , data.responseData.comboList)
          this.assigneeDepartmentPageNumber = this.getData.pageNumber;
          this.assigneeDepartmentCombo = this.getData.dataList;
          this.scrollsyncAssigneeDepartment = false;
        }
      );
  }

  selectedDepartmentData(event) {
    if (event === undefined) {
      this.batchDtlModel.departmentId=0;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
      this.subDepartmentPageNumber = 1;
      this.subDepartmentList = [];
    } else {
      this.batchDtlModel.departmentId=event.departmentId;
      this.subDepartmentPageNumber = 1;
      this.subDepartmentList = [];
    }
  }

  listOfSubDepartment(searchValue){
    this.subDepartmentscrollsync = true;
    this.limitCount = !(this.commonServices.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonServices.getComboResults("listOfAllSubDeparment.sams",searchValue.term,this.batchDtlModel.departmentId !== 0 ? this.batchDtlModel.departmentId : 0, 
    '', this.limitCount, this.subDepartmentPageNumber,
    this.batchDtlModel.departmentName !== '' ? this.batchDtlModel.departmentName : '',).subscribe(
      (data) =>{
        this.getData = new getData();
        this.getData = this.commonServices.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentList , data.responseData.comboList)
        this.subDepartmentPageNumber = this.getData.pageNumber;
        this.subDepartmentList = this.getData.dataList;
          this.subDepartmentscrollsync = false;
      }
    );
  }
  
  getSubDepartmentNameComboValue(event){
    if (event != null) {
      this.batchDtlModel.subDepartment = event.subDepartmentName != null ? event.subDepartmentName : '';
      this.batchDtlModel.subDepartmentId = event.subDepartmentId !== 0 ? event.subDepartmentId : 0;
      this.batchDtlModel.departmentName = event.departmentName != null ? event.departmentName : '';
      this.batchDtlModel.departmentId = event.departmentId !== 0 ? event.departmentId : 0;
    }else{
      this.subDepartmentPageNumber = 1;
      this.subDepartmentList = [];
      this.batchDtlModel.subDepartment = '';
      this.batchDtlModel.subDepartmentId = 0;
    }
  }

  clearSearchCriteria() {
    if(this.lengthOfBatchDtlListItems !== 0 && (this.lengthOfBatchDtlListItemsRetrieved !== this.lengthOfBatchDtlListItems)) {
      this.openConfirmationMessage('clearSearchCriteria');
    } else {
      this.ngOnInit();
    }
    this.selectedItem=0;
    this.index=0;
  }

  search() {
    if(this.lengthOfBatchDtlListItems !== 0 && (this.lengthOfBatchDtlListItemsRetrieved !== this.lengthOfBatchDtlListItems)) {
      this.openConfirmationMessage('search');
    } else {
      this.getBatchDtlList(this.batchHdrFormGroup.controls.batchHdrId.value);
    }
    this.selectedItem=0;
    this.index=0;
  }

  openConfirmationMessage(calledMethodName) {
      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data : {
          'confirmHeading': "Confirmation",
          'confirmMsg': `Kindly "Save" Before Proceeding To Other Operations. Would You Like To Proceed?`
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        dataFromConfirmationDialog => {
          if(dataFromConfirmationDialog.status) {
            if(calledMethodName === 'clearSearchCriteria') {
              this.ngOnInit();
            } else if(calledMethodName === 'search') {
              this.getBatchDtlList(this.batchHdrFormGroup.controls.batchHdrId.value);
            }
          }
        }
      );
  }

  
  backToPreviousPage() {
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back()
  }

  selectAsset(element,i){
    if(this.selectedItem.assetId == element.assetId){
      this.selectedItem = 0;
      this.index=0;
    }else{
      this.selectedItem = element;
      this.index = i;
    }
  }

}
