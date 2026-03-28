import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { FormGroup, FormControl } from '@angular/forms';
import { AssetGroupDtlModel } from 'src/app/Model/master/asset-group-dtl';
import { AssetGroupModel } from 'src/app/Model/master/asset-group';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-model-detailed-report',
  templateUrl: './model-detailed-report.component.html',
  styleUrls: ['./model-detailed-report.component.css']
})
export class ModelDetailedReportComponent implements OnInit {

  locationPageNumber : number;
  departmentPageNumber : number;
  modelPageNumber : number;
  groupPageNumber : number;
  userPageNumber : number;
  assetCodePageNumber : number;
  modelNumberPageNumber : number;
  limitCount:any;

  scrollsyncModel :boolean = false;
  modelNumberScrollsync :boolean = false;
  subloaderModel: boolean =false;
  subScrollsync: boolean = false;
  manufacturerScrollsync : boolean = false;
  isSubmitButtonDisabled = false;
  scrollsyncAssetGroup:boolean=false;
  mandatoryString  :string = '*';

  manufactuer: any[] =[];
  modelCombo : any[] =[];
  assetCategoryName : any[] = [];
  subCategoryName : any[] = [];
  modelNumber : any[] = [];
  modelReportsList = ['Model Detailed Report'];


  categoryScrollsync :boolean = false;
  manufacturerPageNumber : number;
  modelComboPageNumber : number;
  assetCategoryPageNumber : number;
  assetSubCategorPageNumber : number;
  recordsPerPageForCombo:string;

  AssetGroupScrollsync :boolean = false;
  assetGroupPageNumber : number;
  assetGroup : any = [];
  assetGroupScrollsync : boolean = false;
  modelFormGroup: FormGroup;
  assetGroupDtl: AssetGroupDtlModel;
  getData: getData;


  constructor(public dialogRef: MatDialogRef<ModelDetailedReportComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private commonService: CommonService, 
    private samsService: AssetOptimaServices,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef,
    private assetOptimaConstants: AssetOptimaConstants
    ) { 
      this.manufacturerPageNumber = 1;
      this.modelComboPageNumber = 1;
      this.assetCategoryPageNumber = 1;
      this.assetSubCategorPageNumber = 1;
      this.assetGroupPageNumber = 1;
      this.modelNumberPageNumber = 1;
      this.assetGroupDtl = new AssetGroupDtlModel();
      this.assetGroupDtl.assetGroupTO = new AssetGroupModel();
      this.getData = new getData();
    }

  ngOnInit() {
    this.initializeFormGroup();
    this.setValueToFormGroup();
    this.modelFormGroup.controls.modelReportsType.setValue('Model Detailed Report');
  }

  initializeFormGroup() {
    this.modelFormGroup = new FormGroup({
      modelNo: new FormControl(''),
      assetCategoryName: new FormControl(''),
      modelName: new FormControl(''),
      subCategoryName: new FormControl(''),
      manufacturerName: new FormControl(''),
      assetCategoryId: new FormControl(0),
      subCategoryId: new FormControl(0),
      manufacturerId: new FormControl(0),
      assetGroupId: new FormControl(0),
      assetGroupName: new FormControl(''),
      modelId: new FormControl(0),
      modelReportsType: new FormControl(''),
      searchValue: new FormControl(''),
      searchValue1: new FormControl(''),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      direction: new FormControl(''),
      recordsPerPage: new FormControl(0),
      columnName: new FormControl(''),
      modelNoDisp: new FormControl(''),

    });
    this.modelFormGroup.controls.subCategoryName.disable();
  }

  setValueToFormGroup() {
    
    this.modelFormGroup.controls.searchValue.setValue(this.data.screenName);
    this.modelFormGroup.controls.searchValue1.setValue(this.data.title);
    this.modelFormGroup.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.modelFormGroup.controls.locationId.setValue(this.userSession.getUserLocationId());
    this.modelFormGroup.controls.recordsPerPage.setValue(100);
    this.modelFormGroup.controls.columnName.setValue('updatedDt');
    this.modelFormGroup.controls.direction.setValue('desc');

  }

  submit() { 
    this.dialogRef.close(this.modelFormGroup.getRawValue());     
  }

  clear() {
    this.modelFormGroup.enable();
    this.initializeFormGroup();
    this.setValueToFormGroup();
  }

  listOfModelNumber(searchValue) {
    this.modelNumberScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelNumberCombo.sams', searchValue.term, '', '', this.limitCount, this.modelNumberPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.modelNumberPageNumber , this.modelNumber , data.responseData.comboList)
        this.modelNumberPageNumber = this.getData.pageNumber;
        this.modelNumber = this.getData.dataList;
        this.modelNumberScrollsync = false; 
      }
    );
  }

  getModelNumberComboValue(event) {
    if (event === undefined) {
      this.modelNumberPageNumber = 1;

      this.modelFormGroup.controls.modelId.setValue(0);
      this.modelFormGroup.controls.modelName.setValue('');
      this.modelFormGroup.controls.modelName.enable();

      this.modelFormGroup.controls.manufacturerId.setValue(0);
      this.modelFormGroup.controls.manufacturerName.setValue('');
      this.modelFormGroup.controls.manufacturerName.enable();

      this.modelFormGroup.controls.assetCategoryId.setValue(0);
      this.modelFormGroup.controls.assetCategoryName.setValue('');
      this.modelFormGroup.controls.assetCategoryName.enable();

      this.modelFormGroup.controls.subCategoryId.setValue(0);
      this.modelFormGroup.controls.subCategoryName.setValue('');
      this.modelFormGroup.controls.subCategoryName.enable();

      this.modelFormGroup.controls.assetGroupId.setValue(0);
      this.modelFormGroup.controls.assetGroupName.setValue('');
      this.modelFormGroup.controls.assetGroupName.enable();
    } else {
      this.modelFormGroup.controls.modelId.setValue(event.modelId);
      this.modelFormGroup.controls.modelName.setValue(event.modelName);
      this.modelFormGroup.controls.modelName.disable();

      this.modelFormGroup.controls.manufacturerId.setValue(event.manufacturerId);
      this.modelFormGroup.controls.manufacturerName.setValue(event.manufacturerName);
      this.modelFormGroup.controls.manufacturerName.disable();

      this.modelFormGroup.controls.assetCategoryId.setValue(event.assetCategoryId);
      this.modelFormGroup.controls.assetCategoryName.setValue(event.assetCategoryName);
      this.modelFormGroup.controls.assetCategoryName.disable();

      this.modelFormGroup.controls.subCategoryId.setValue(event.subCategoryId);
      this.modelFormGroup.controls.subCategoryName.setValue(event.subCategoryName);
      this.modelFormGroup.controls.subCategoryName.disable();

      this.modelFormGroup.controls.assetGroupId.setValue(event.assetGroupId);
      this.modelFormGroup.controls.assetGroupName.setValue(event.assetGroupName);
      this.modelFormGroup.controls.assetGroupName.disable();
    }
  }

  listOfCategory(searchValue) {
    this.categoryScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCategoryCombo.sams', searchValue.term, '', '', this.limitCount, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber , this.assetCategoryName , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.categoryScrollsync = false; 
      }
    );
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel=true;
    const manufacturerId = this.modelFormGroup.controls.manufacturerId.value > 0? this.modelFormGroup.controls.manufacturerId.value : 0;
    const assetGroupId = this.modelFormGroup.controls.assetGroupId.value > 0? this.modelFormGroup.controls.assetGroupId.value : 0;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, manufacturerId, assetGroupId, this.limitCount, this.modelComboPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelCombo = this.getData.dataList;
      this.scrollsyncModel = false;     
    });
  }

  listOfSubCategory(searchValue) {
    this.subScrollsync = true;
    const assetCategoryId = this.modelFormGroup.controls.assetCategoryId.value >0? this.modelFormGroup.controls.assetCategoryId.value : 0;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, assetCategoryId, '', this.limitCount, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryName , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryName = this.getData.dataList;
          this.subScrollsync = false; 
        }
      );
  }
  getSubCategoryComboValue(event) {
    if (event === undefined) {
      this.assetSubCategorPageNumber = 1;
    } else {    
      this.modelFormGroup.controls.subCategoryId.setValue(event.subCategoryId);
    }
  
  }

  listOfManufacturer(searchValue) {
    this.manufacturerScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfManufacturerCombo,
       searchValue.term, '', '',this.limitCount, this.manufacturerPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.manufacturerScrollsync = false; 
     }
    );
  }    

  close(){
    this.dialogRef.close(); 
  }

  getCategoryComboValue(event) {
    if (event === undefined) {
      this.modelFormGroup.controls.assetCategoryId.setValue(0);
      this.assetCategoryPageNumber = 1;

      this.modelFormGroup.controls.subCategoryId.setValue(0);
      this.modelFormGroup.controls.subCategoryName.setValue('');
      this.modelFormGroup.controls.subCategoryName.disable();
    } else {
      this.modelFormGroup.controls.assetCategoryId.setValue(event.assetCategoryId);

      this.modelFormGroup.controls.subCategoryId.setValue(0);
      this.modelFormGroup.controls.subCategoryName.setValue('');
      this.modelFormGroup.controls.subCategoryName.enable();
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
    }
  }

  getModelComboValue(event) {
    if (event != null) {
      this.modelComboPageNumber=1;
      this.modelFormGroup.controls.modelNo.setValue(event.modelNo);
      this.modelFormGroup.controls.modelNo.disable();

      this.modelFormGroup.controls.manufacturerId.setValue(event.manufacturerId);
      this.modelFormGroup.controls.manufacturerName.setValue(event.manufacturerName);
      this.modelFormGroup.controls.manufacturerName.disable();

      this.modelFormGroup.controls.assetCategoryId.setValue(event.assetCategoryId);
      this.modelFormGroup.controls.assetCategoryName.setValue(event.assetCategoryName);
      this.modelFormGroup.controls.assetCategoryName.disable();

      this.modelFormGroup.controls.subCategoryId.setValue(event.subCategoryId);
      this.modelFormGroup.controls.subCategoryName.setValue(event.subCategoryName);
      this.modelFormGroup.controls.subCategoryName.disable();

      this.modelFormGroup.controls.assetGroupId.setValue(event.assetGroupId);
      this.modelFormGroup.controls.assetGroupName.setValue(event.assetGroupName);
      this.modelFormGroup.controls.assetGroupName.disable();
    }else{  
      this.modelComboPageNumber=1;
      this.modelFormGroup.controls.modelNo.setValue('');
      this.modelFormGroup.controls.modelNo.enable();

      this.modelFormGroup.controls.manufacturerId.setValue(0);
      this.modelFormGroup.controls.manufacturerName.setValue('');
      this.modelFormGroup.controls.manufacturerName.enable();

      this.modelFormGroup.controls.assetCategoryId.setValue(0);
      this.modelFormGroup.controls.assetCategoryName.setValue('');
      this.modelFormGroup.controls.assetCategoryName.enable();

      this.modelFormGroup.controls.subCategoryId.setValue(0);
      this.modelFormGroup.controls.subCategoryName.setValue('');

      this.modelFormGroup.controls.assetGroupId.setValue(0);
      this.modelFormGroup.controls.assetGroupName.setValue('');
      this.modelFormGroup.controls.assetGroupName.enable();
    }
  }

  getManfacturerComboValue(event) {
    if(event === undefined){
      this.manufacturerPageNumber=1;
    }else{
      this.modelFormGroup.controls.manufacturerId.setValue(event.manufacturerId);
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  getAssetGroupComboValue(event) {
    if (event === undefined) {
      this.modelFormGroup.controls.assetGroupId.setValue(0);
      this.modelFormGroup.controls.assetGroupName.setValue('');
      this.assetGroupPageNumber = 1;
    } else {
      this.modelFormGroup.controls.assetGroupId.setValue(event.assetGroupId);
      this.modelFormGroup.controls.assetGroupName.setValue(event.assetGroupName);

      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.AssetGroupScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listAllAssetGroupCombo, searchKey.term, this.modelFormGroup.controls['subCategoryId'].value, '',this.limitCount, this.assetGroupPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
      this.assetGroupPageNumber = this.getData.pageNumber;
      this.assetGroup = this.getData.dataList;
      this.AssetGroupScrollsync = false;      
    });
  }

 getSubmitButtonStatus() {
   if((this.modelFormGroup.controls.modelReportsType.value != null && this.modelFormGroup.controls.modelReportsType.value != ""))
      this.isSubmitButtonDisabled = false;
    else 
      this.isSubmitButtonDisabled = true;

   return this.isSubmitButtonDisabled;
 }

}
