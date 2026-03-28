import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetModel } from 'src/app/Model/master/asset';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { allassetStatus } from 'src/app/Constants/AllStatusConstants';
import { TranslateService } from '@ngx-translate/core';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-add-asset-to-batch-dialog',
  templateUrl: './add-asset-to-batch-dialog.component.html',
  styleUrls: ['./add-asset-to-batch-dialog.component.css']
})
export class AddAssetToBatchDialogComponent implements OnInit {

  displayedColumns = ['sno', 'assetCode', 'category', 'model', 'department', 'assetStatus', 'action'];

  headingText: string;
  recordsPerPageForCombo: string;

  limitCount: any;

  assetModel: AssetModel;

  subLoader = false;
  scrollsyncLocation = false;
  scrollSupplierNamesync = false;
  scrollsyncAssetStatus = false;
  scrollsyncAssetGroup = false;
  scrollsyncModel = false;
  scrollsyncAssigneeDepartment = false;
  scrollsync = false;

  dataSource: any = [];
  assetAddedList: any = [];
  addedAssetList: any = [];
  locationCombo: any = [];
  manufactuer: any = [];
  supplierList: any = [];
  assetStatusCombo: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  assigneeDepartmentCombo: any = [];
  subDepartmentList: any = [];

  length = 0;
  locationPageNumber: number;
  manufacturerPageNumber: number;
  supplierPageNumber: number;
  asssetStatusPageNumber: number;
  assetGroupPageNumber: number;
  modelComboPageNumber: number;
  assigneeDepartmentPageNumber: number;
  subDepartmentPageNumber: number;
  getData: getData;
  scrollsyncManufacturer: boolean;

  constructor(
    public readonly dialogRef: MatDialogRef<AddAssetToBatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private translateService: TranslateService,
    private readonly commonServices: CommonService,
    private readonly assetOptimaServices: AssetOptimaServices,
    private readonly userSessionServices: UserSessionService
  ) { 
    this.locationPageNumber = 1;
    this.manufacturerPageNumber = 1;
    this.supplierPageNumber = 1;
    this.asssetStatusPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.assigneeDepartmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
  }

  ngOnInit(){
    this.assetModel = new AssetModel();
    this.headingText = this.data.batchName;
    this.addedAssetList = this.data.alreadyAddedAssetList;
    this.assetModel.locationName = 'KIMS-101 - KIMS MAIN HOSPITAL';
    this.assetModel.locationId = this.userSessionServices.getUserLocationId();
    this.assetModel.columnName = 'updatedDt';
    this.assetModel.direction = 'desc';
    this.assetModel.assetStatusId = allassetStatus.IN_USE; 
    this.translateService.get(allassetStatus[allassetStatus.IN_USE])
    .subscribe(val => {  
      this.assetModel.assetStatus = val; 
    });  
    this.fetchAssetList();
  }

  closeModal() {
    this.dialogRef.close({status: false});
  }

  fetchAssetList() {
    this.subLoader = true;
    this.commonServices.commonListService('fetchListOfAllAsset.sams', this.assetModel).subscribe(
      data => {
        if (data.success) {
         this.subLoader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.dataSource = data.responseData.dataList;
        } else {
         this.subLoader = false;
        }
      }, error => {
       this.subLoader = false;
      }
    );
  }

  validateAssetCd(element: AssetModel): boolean {
    let visible = false;
    let index = -1;
    index = this.commonServices.getIndexOfTheItem(this.addedAssetList, true, "assetId", element.assetHdrId);
    if (index === -1) {
      visible = true;
      element.displayAddIconFlag = true;
    } else {
      element.displayAddIconFlag = false;
    }
    return visible;
  }

  addAssetToList(asset) {
    if (this.commonServices.getIndexOfTheItem(this.assetAddedList, true, 'assetId', asset.assetHdrId) === -1) {
     
      const assetToBeAddedToList = {
        batchDtlId: 0,
        assetId: asset.assetHdrId,
        assetCode: asset.assetCode,
        description: asset.description,
        serialNo: asset.serialNo,
        assetCategoryName: asset.assetCategoryName,
        subCategoryName: asset.subCategoryName,
        assetGroupName: asset.assetGroupName,
        modelName: asset.modelName,
        manufacturerName: asset.manufacturerName,
        supplierName: asset.supplierName,
        departmentName: asset.departmentName,
        functionalStatus: asset.functionalStatus,
        assetStatus: asset.assetStatus,
        assetStatusId: asset.assetStatusId,
        modelId: asset.modelId,
        supplierId: asset.supplierId
      };
      this.assetAddedList.push(assetToBeAddedToList);
    } else {
      this.commonServices.openToastWarningMessage(`"${asset.assetCode}" Added Already`);
    }
  }

  removeAssetFromList(asset: AssetModel) {
    const index = this.commonServices.getIndexOfTheItem(this.assetAddedList, true, 'assetHdrId', asset.assetHdrId);
    if (index >= 0) {
      this.assetAddedList.splice(index, 1);
    }
  }

  loadLocationComboData(searchValue) {
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
      this.assetModel.locationName = '';
      this.assetModel.locationId = 0;
      this.assetModel.locationType='';
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.assetModel.locationName = event.locDisplayField;
      this.assetModel.locationId = event.locationId;
      this.assetModel.locationType=event.locationType;
    }
  }

  listOfManufacturer(searchValue) {
    this.scrollsyncManufacturer= true;
    this.limitCount = !(this.commonServices.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonServices.getComboResults(this.assetOptimaServices.listOfManufacturerCombo, searchValue.term, '', '', this.limitCount,
     this.manufacturerPageNumber, 'ASSET').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonServices.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.scrollsyncManufacturer= false;
      }
    );
  }

  getManfacturerComboValue(event) {
    if (event === undefined) {
      this.assetModel.manufacturerId=0;
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];
    } else {
      this.assetModel.manufacturerId=event.manufacturerId;
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
      this.assetModel.businessPartnerId=0;
      this.assetModel.businessPartnerName='';
      this.supplierList = [];
      this.supplierPageNumber = 1;
    } else {
      this.assetModel.businessPartnerId=event.businessPartnerId;
      this.assetModel.businessPartnerName=event.businessPartnerName;
     
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
      this.assetModel.assetStatusId = 0;
      this.assetModel.assetStatus = '';
      this.asssetStatusPageNumber = 1;
      this.assetStatusCombo = [];
    } else {
      this.assetModel.assetStatusId = event.assetStatusId;
      this.assetModel.assetStatus = event.assetStatusName;
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonServices.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonServices.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, this.assetModel.subCategoryId, '',
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
      this.assetModel.assetGroupName = event.assetGroupName;
      this.assetModel.assetGroupId = event.assetGroupId;

    } else {
      this.assetModel.assetGroupName = "";
      this.assetModel.assetGroupId = 0;
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonServices.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonServices.getComboResults('listOfAllModelCombo.sams', searchKey.term, this.assetModel.manufacturerId > 0 ? this.assetModel.manufacturerId : 0,
      this.assetModel.assetGroupId > 0 ? this.assetModel.assetGroupId : '',
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
      this.assetModel.modelId = event.modelId;
      this.assetModel.modelName = event.modelName;
      this.assetModel.manufacturerId=event.manufacturerId;
      this.assetModel.manufacturerName=event.manufacturerName;
    } else {
      this.assetModel.modelId = 0;
      this.assetModel.modelName = '';
      this.assetModel.manufacturerId=0;
      this.assetModel.manufacturerName='';
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
      this.assetModel.departmentId=0;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
      this.subDepartmentPageNumber = 1;
      this.subDepartmentList = [];
      this.assetModel.subDepartment = '';
      this.assetModel.subDepartmentId = 0;
    } else {
      this.assetModel.departmentId=event.departmentId;
      this.subDepartmentPageNumber = 1;
      this.subDepartmentList = [];
      this.assetModel.subDepartment = '';
      this.assetModel.subDepartmentId = 0;
    }
  }

  listOfSubDepartment(searchValue){
    this.scrollsync = true;
    this.limitCount = !(this.commonServices.fetchSearchValue(searchValue)) ? '5' : '';
    this.commonServices.getComboResults("listOfAllSubDeparment.sams",searchValue.term,this.assetModel.departmentId !== 0 ? this.assetModel.departmentId : 0,
     '', this.limitCount, this.subDepartmentPageNumber,
    this.assetModel.departmentName !== '' ? this.assetModel.departmentName : '',).subscribe(
      (data) =>{        
        this.getData = new getData();
        this.getData = this.commonServices.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentList , data.responseData.comboList)
        this.subDepartmentPageNumber = this.getData.pageNumber;
        this.subDepartmentList = this.getData.dataList;
        this.scrollsync = false;
      }
    );
  }
  
  getSubDepartmentNameComboValue(event){
    if (event != null) {
      this.assetModel.subDepartment = event.subDepartmentName != null ? event.subDepartmentName : '';
      this.assetModel.subDepartmentId = event.subDepartmentId !== 0 ? event.subDepartmentId : 0;
      this.assetModel.departmentName = event.departmentName != null ? event.departmentName : '';
      this.assetModel.departmentId = event.departmentId !== 0 ? event.departmentId : 0;
    }else{
      this.subDepartmentPageNumber = 1;
      this.subDepartmentList = [];
      this.assetModel.subDepartment = '';
      this.assetModel.subDepartmentId = 0;
    }
  }

  clearSearchCriteria() {
    this.ngOnInit();
  }

  search() {
    this.fetchAssetList();
  }

  addedAssetsToList() {
    this.dialogRef.close({status: true, assetAddedList: this.assetAddedList});
  }

}
