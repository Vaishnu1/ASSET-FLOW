import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetModel } from 'src/app/Model/master/asset';
import { ChildAssetModel } from 'src/app/Model/asset/childAsset';
import { ViewChildassetInPreinwardComponent } from '../../view-childasset-in-preinward/view-childasset-in-preinward.component';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';


@Component({
  selector: 'app-child-asset-add',
  templateUrl: './child-asset-add.component.html',
  styleUrls: ['./child-asset-add.component.css']
})
export class ChildAssetAddComponent implements OnInit {

  childAssetAddList = new MatTableDataSource<any>();
  childAssetFormGroup: FormGroup;

  assetTO: AssetModel;

  childAssetTempList = [];
  assetCodeCombo: any = [];
  assetCodeComboValidatedList = [];
  assetChildCompareList: any = [];
  //LOADER
  subloader: boolean = false;


  //COMBO
  assetGroup: any = [];
  modelCombo: any = [];
  assetGroupPageNumber: number;
  modelComboPageNumber: number;
  assetCodePageNumber: number = 0;
  assetCategoryPageNumber: number;
  assetSubCategorPageNumber: number;

  scrollsyncModel: boolean = false;
  scrollsyncAssetGroup: boolean = false;
  scrollsyncAssetCode: boolean = false;
  scrollsyncAssetCategory: boolean = false;
  scrollsyncAssetSubCategory: boolean = false;

  recordsPerPageForCombo: string;

  childAssetList: any[] = [];
  assetCategoryName: any[] = [];
  subCategoryName: any[] = [];
  enableSubmit: boolean;

  assetFormGroup: FormGroup;
  childAssetModel: ChildAssetModel;
  selectedAssetOrVolumeKey: any;
  parentAssetDetails: AssetModel;
  modelForParentAsset: AssetModel;
  childAssetNo: number = 0 ;
  childAssetTempNo:number =1;
  parentAssetIdNo: number;
  childDataNo: number;
  childDataList = [];
  selectedChildAssetNoInString: string;
  selectedChildAssetNoInNumber: number;
  assetChildNo: number;
  assetChidNoForCombo: number;
  parentAssetId: number;
  @ViewChild('matChildAsset') matChildAssetTable: MatTable<any>;

  childAssetPlaceholder = "Search Asset By AssetCode/Model/Description/equipmentCode/Serial No";

  childListAddColumns = ['sno', 'select', 'assetCode','childAssetNo', 'serialNo', 'assetGroup', 'modelName' ];
  getData: getData;

  constructor(public dialogRef: MatDialogRef<ChildAssetAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    private commonService: CommonService,
    private serviceName: AssetOptimaServices) {
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.assetCodePageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetSubCategorPageNumber = 1;
  }

  ngOnInit() {

    this.childAssetAddList.data = [];

    this.childAssetFormGroup = new FormGroup({
      childAssetId: new FormControl(''),
      assetHdrId: new FormControl(''),
      assetCode: new FormControl(''),
      childAssetHdrId: new FormControl(''),
      childAssetCode: new FormControl(''),
      childAssetModelId: new FormControl(''),
      childAssetModelName: new FormControl('', [Validators.required]),
      childAssetGroupId: new FormControl(''),
      childAssetGroupName: new FormControl(''),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      supplierName: new FormControl(''),
      assetCategoryName: new FormControl(''),
      subCategoryName: new FormControl(''),
      equipmentCode: new FormControl(''),
      description: new FormControl(''),
      serialNo: new FormControl(''),
      active: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      volumeLicenseId: new FormControl(0),
      status: new FormControl(''),
      childAssetNo: new FormControl(''),
      parentId: new FormControl(''),
      oldChildAsset: new FormControl(''),
      childAssetVolumeLicenseQty: new FormControl(0),
      usedVolumeLicenseQty: new FormControl(0),
      volumeLicensePresent: new FormControl(''),
      trackIndividualLicense: new FormControl(''),
    });

    this.assetFormGroup = new FormGroup({
      assetCode: new FormControl('', [Validators.required]),
      assetHrdId: new FormControl(0),
      assetCategoryName: new FormControl(''),
      assetCategoryId:  new FormControl(0),
      assetSubCategoryName: new FormControl(''),
      assetSubCategoryId: new FormControl(0),
      assetGroupName: new FormControl(''),
      assetGroupId: new FormControl(0),
      assetModelName: new FormControl(''),
      assetModelId: new FormControl(0),
      assetDepartmentId: new FormControl(0),
      assetSubDepartmentId: new FormControl(0),
      assetDisplayField: new FormControl(null),
      volumeLicenseQty: new FormControl(0),
      usedVolumeLicenseQty: new FormControl(0),
      volumeLicensePresent: new FormControl(''),
      trackIndividualLicense: new FormControl(''),
    });

    this.childAssetModel = new ChildAssetModel();

    this.parentAssetDetails = new AssetModel();
    this.modelForParentAsset = new AssetModel();

    this.getAssetCode(this.data.assetId);
    this.childAssetFormGroup.controls.childAssetModelName.setValue(this.data.modelName);
    this.childAssetFormGroup.controls.childAssetModelId.setValue(this.data.modelId);

    this.loadParentAssetDetail();

    this.commonService.commonGetService('fetchListOfAllChildAsset.sams', this.data.assetId).subscribe(
      data => {
       
        if (data.success) {

          this.assetChildCompareList = data.responseData
        }
      });

  }

  getAssetCode(data) {
    if (data <= 0) {
    } else {
      this.commonService.commonGetService('fetchAssetDtlByAssetId.sams', data).subscribe(
        data => {
          if (data.success) {
            this.childAssetFormGroup.controls.assetCode.setValue(data.responseData.assetCode);
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
        }
      );
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.serviceName.listAllAssetGroupCombo, searchKey.term, this.assetFormGroup.controls.assetSubCategoryId, '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
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
      this.assetFormGroup.get('assetGroupId').setValue(event.assetGroupId);
      this.assetFormGroup.get('assetGroupName').setValue(event.assetGroupName);
      this.assetFormGroup.get('assetModelId').setValue(event.modelId);
      this.assetFormGroup.get('assetModelName').setValue(event.modelName);
      this.assetFormGroup.get('assetSubCategoryId').setValue(event.subCategoryId);
      this.assetFormGroup.get('assetCategoryId').setValue(event.assetCategoryId);
      this.assetFormGroup.get('assetCategoryName').setValue(event.assetCategoryName);
      this.assetFormGroup.get('assetSubCategoryName').setValue(event.subCategoryName);
    } else {
      this.assetFormGroup.get('assetModelId').setValue(0);
      this.assetFormGroup.get('assetModelName').setValue('');
      this.assetFormGroup.get('assetGroupId').setValue(0);
      this.assetFormGroup.get('assetGroupName').setValue('');
      this.assetFormGroup.get('assetSubCategoryId').setValue(0);
      this.assetFormGroup.get('assetCategoryId').setValue(0);
      this.assetFormGroup.get('assetCategoryName').setValue('');
      this.assetFormGroup.get('assetSubCategoryName').setValue('');
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '',
      this.assetFormGroup.controls.assetGroupId.value > 0 ? this.assetFormGroup.controls.assetGroupId.value : '',
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
      this.childAssetFormGroup.get('childAssetModelId').setValue(event.modelId);
      this.assetFormGroup.get('assetModelId').setValue(event.modelId);
      this.childAssetFormGroup.get('childAssetModelName').setValue(event.modelName);
      this.assetFormGroup.get('assetModelName').setValue(event.modelName);

    } else {
      this.childAssetFormGroup.get('childAssetModelId').setValue(0);
      this.assetFormGroup.get('assetModelId').setValue(0);
      this.childAssetFormGroup.get('childAssetModelName').setValue('');
      this.assetFormGroup.get('assetModelName').setValue('');
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  clear() {
    this.assetFormGroup.reset();
    this.childAssetAddList.data = [];
    this.childAssetTempNo = 1;
    
  }

  submit() {

    let obj = {
      childAssetAddList: this.childAssetAddList.data,
      assetHdrId: this.data.assetId,
      assetCode: this.childAssetFormGroup.controls.assetCode.value,
      userId: this.data.userId,
      locationId: this.data.locationId,
      volumeLicenseId:this.childAssetFormGroup.controls.volumeLicenseId.value,
    };
    
    this.commonService.commonInsertService('deactivateOrDeleteChildAsset.sams', obj).subscribe(
      data => {
        if (data.success) {
          this.commonService.commonInsertService('saveOrUpdateChildAsset.sams', obj).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.cancel();
              }
            }, error => {
            }
          );
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }, error => {
      }
    );

  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, this.parentAssetDetails.locationId, this.assetFormGroup.controls.assetDepartmentId.value,
      this.recordsPerPageForCombo, this.assetCodePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeComboValidatedList , data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeComboValidatedList = this.getData.dataList;
          this.scrollsyncAssetCode = false;
        }
      );   
  }

  validationOfAssetCodeCombo(){
   
    for(this.assetChildNo=0;this.assetChildNo<this.assetChildCompareList.length;this.assetChildNo++){
      var childAssetCode = this.assetChildCompareList[this.assetChildNo].childAssetCode;
      for(this.assetChidNoForCombo=0;this.assetChidNoForCombo<this.assetCodeComboValidatedList.length;this.assetChidNoForCombo++){
        var assetCode = this.assetCodeComboValidatedList[this.assetChidNoForCombo].assetCode;
        if(childAssetCode == assetCode && this.assetChildCompareList[this.assetChildNo].active ==true){
          this.assetCodeComboValidatedList.splice(this.assetChidNoForCombo,1);
        }
      }
    }
   
  }

  selectedAssetCodeData(event) {
    if(event === undefined){
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
    }
    else{
      this.childDataList =[];
      this.commonService.commonGetService('fetchListOfAllChildAsset.sams', this.data.assetId).subscribe(
        data => {       
          if (data.success) {
            for(this.childDataNo=0;this.childDataNo<data.responseData.length;this.childDataNo++){
              if(data.responseData[this.childDataNo].active ==false && data.responseData[this.childDataNo].childAssetHdrId == event.assetHdrId){
                this.childDataList.push(data.responseData[this.childDataNo]); 
              }
            }
            if(data.responseData.length > 0){
            this.selectedChildAssetNoInString = data.responseData[data.responseData.length-1].childAssetNo;
      
            var value = this.selectedChildAssetNoInString.split("##",2);
            this.selectedChildAssetNoInNumber= parseInt(value[1]);
        
          }else{
            this.selectedChildAssetNoInNumber =0;
          }
      
            
        }
      });
      
      this.childAssetPlaceholder='';
      this.assetFormGroup.controls.assetCode.setValue(event.assetCode);
      this.assetFormGroup.controls.assetCategoryId.setValue(event.assetCategoryId);
      this.assetFormGroup.controls.assetCategoryName.setValue(event.assetCategoryName);
      this.assetFormGroup.controls.assetSubCategoryId.setValue(event.subCategoryId);
      this.assetFormGroup.controls.assetSubCategoryName.setValue(event.subCategoryName);
      this.assetFormGroup.controls.assetGroupId.setValue(event.assetGroupId);
      this.assetFormGroup.controls.assetGroupName.setValue(event.assetGroupName);
      this.assetFormGroup.controls.assetModelId.setValue(event.modelId);
      this.assetFormGroup.controls.assetModelName.setValue(event.modelName);
      this.assetFormGroup.controls.volumeLicenseQty.setValue(event.volumeLicenseQty);
      this.assetFormGroup.controls.usedVolumeLicenseQty.setValue(event.usedVolumeLicenseQty);  
      this.selectedAssetOrVolumeKey = event;
    }

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

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, this.assetFormGroup.controls['assetCategoryId'].value,
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

  addChildAsset() {    
    this.childAssetNo = this.selectedChildAssetNoInNumber + this.childAssetTempNo;
    this.childAssetTempNo=this.childAssetTempNo + 1;
 
    var tempList: any[] = [];
      
      this.childAssetFormGroup.controls.childAssetId.setValue(0);
      this.childAssetFormGroup.controls.assetHdrId.setValue(this.data.assetId);
      if (this.childDataList.length>0){
        this.childAssetFormGroup.controls.childAssetNo.setValue(this.childDataList[0].childAssetNo); 
        this.childAssetFormGroup.controls.oldChildAsset.setValue(this.selectedAssetOrVolumeKey.assetHdrId);
        this.childAssetFormGroup.controls.parentId.setValue(this.parentAssetId); 
        this.childAssetTempNo=this.childAssetTempNo - 1;
      }else{
      this.childAssetFormGroup.controls.oldChildAsset.setValue(0);
      this.childAssetFormGroup.controls.childAssetNo.setValue(this.parentAssetDetails.assetCode+" ## "+ this.childAssetNo.toString());//\u220E
      this.childAssetFormGroup.controls.parentId.setValue(0);  
    }
      this.childAssetFormGroup.controls.assetCode.setValue(this.childAssetFormGroup.controls.assetCode.value);
      this.childAssetFormGroup.controls.childAssetHdrId.setValue(this.selectedAssetOrVolumeKey.assetHdrId);
      this.childAssetFormGroup.controls.childAssetCode.setValue(this.selectedAssetOrVolumeKey.assetCode);
      this.childAssetFormGroup.controls.childAssetModelId.setValue(this.selectedAssetOrVolumeKey.modelId);
      this.childAssetFormGroup.controls.childAssetModelName.setValue(this.selectedAssetOrVolumeKey.modelName);
      this.childAssetFormGroup.controls.childAssetGroupId.setValue(this.selectedAssetOrVolumeKey.assetGroupId);
      this.childAssetFormGroup.controls.childAssetGroupName.setValue(this.selectedAssetOrVolumeKey.assetGroupName);
      this.childAssetFormGroup.controls.modelName.setValue(this.selectedAssetOrVolumeKey.modelName);
      this.childAssetFormGroup.controls.serialNo.setValue(this.selectedAssetOrVolumeKey.serialNo);
      this.childAssetFormGroup.controls.description.setValue(this.selectedAssetOrVolumeKey.description);
      this.childAssetFormGroup.controls.manufacturerName.setValue(this.selectedAssetOrVolumeKey.manufacturerName);
      this.childAssetFormGroup.controls.supplierName.setValue(this.selectedAssetOrVolumeKey.supplierName);
      this.childAssetFormGroup.controls.equipmentCode.setValue(this.selectedAssetOrVolumeKey.equipmentCode);
      this.childAssetFormGroup.controls.assetCategoryName.setValue(this.selectedAssetOrVolumeKey.assetCategoryName);
      this.childAssetFormGroup.controls.subCategoryName.setValue(this.selectedAssetOrVolumeKey.assetCategoryName);
      this.childAssetFormGroup.controls.usedVolumeLicenseQty.setValue(this.selectedAssetOrVolumeKey.usedVolumeLicenseQty);
      this.childAssetFormGroup.controls.volumeLicensePresent.setValue(this.selectedAssetOrVolumeKey.volumeLicensePresent);
      this.childAssetFormGroup.controls.trackIndividualLicense.setValue(this.selectedAssetOrVolumeKey.trackIndividualLicense);
      this.childAssetFormGroup.controls.volumeLicenseId.setValue(this.selectedAssetOrVolumeKey.volumeLicenseId);
      
      this.childAssetFormGroup.controls.active.setValue(true);
      this.childAssetFormGroup.controls.status.setValue('');
   
      if(this.selectedAssetOrVolumeKey.assetHdrId != this.data.assetId ) {

        
    let totalqty =  this.selectedAssetOrVolumeKey.volumeLicenseQty - this.selectedAssetOrVolumeKey.usedVolumeLicenseQty;


        if(this.selectedAssetOrVolumeKey.usedAsChildAsset && this.selectedAssetOrVolumeKey.volumeLicensePresent && totalqty > 0){

              tempList = this.childAssetAddList.data;
              let index = this.commonService.getIndexOfTheItem(tempList, true, 'childAssetCode',  this.childAssetFormGroup.controls.childAssetCode.value)
                if(index == -1 ) {
                  tempList.push(this.childAssetFormGroup.getRawValue());
                } else {
                  this.commonService.openToastWarningMessage(this.childAssetFormGroup.controls.childAssetCode.value +' is already added');
                this.childAssetAddList.data = tempList;
                this.childAssetTempNo=this.childAssetTempNo - 1;
                
              }
        } 
        else if(this.selectedAssetOrVolumeKey.usedAsChildAsset) {
          this.commonService.commonGetService('loadParentAssetDetails.sams', this.selectedAssetOrVolumeKey.assetHdrId).subscribe(
            data => {
              this.modelForParentAsset = data.responseData;
              this.childAssetFormGroup.controls.parentId.setValue(this.modelForParentAsset.assetHdrId);
              this.confirmForAddingSelectedChildAsset();              
            }
            
          );
          
        } else {
          tempList = this.childAssetAddList.data;
          let index = this.commonService.getIndexOfTheItem(tempList, true, 'childAssetCode',  this.childAssetFormGroup.controls.childAssetCode.value)
            if(index == -1 ) {
              tempList.push(this.childAssetFormGroup.getRawValue());
              this.childAssetAddList.data = tempList;
            } else {
              this.commonService.openToastWarningMessage(this.childAssetFormGroup.controls.childAssetCode.value +' is already added');
            this.childAssetAddList.data = tempList;
            this.childAssetTempNo=this.childAssetTempNo - 1;
            
          }
      }
      this.childAssetAddList.data = this.childAssetAddList.data;
        
      } else {
        this.commonService.openToastWarningMessage('Asset can not be added as child asset to itself.');
        this.childAssetTempNo=this.childAssetTempNo - 1;
      }
      
  }

  confirmForAddingSelectedChildAsset() {
    let dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': `"${this.childAssetFormGroup.controls.childAssetCode.value}" Is A Child Asset Of  "${this.modelForParentAsset.assetCode}" Already.`,
        'confirmMsg':`Do You Like To Assign It To "${this.parentAssetDetails.assetCode}" By Deleting It From The Previous Asset ?`
      } 

    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          var tempList: any[] = [];
          this.childAssetFormGroup.controls.volumeLicenseId.setValue(0);
            tempList = this.childAssetAddList.data;
            let index = this.commonService.getIndexOfTheItem(tempList, true, 'childAssetCode',  this.childAssetFormGroup.controls.childAssetCode.value)
              if(index == -1 ) {
                tempList.push(this.childAssetFormGroup.getRawValue());
              } else {
                this.commonService.openToastWarningMessage(this.childAssetFormGroup.controls.childAssetCode.value +' is already added');
              this.childAssetAddList.data = tempList;
              this.childAssetTempNo = this.childAssetTempNo - 1;
            }
            this.childAssetAddList.data = this.childAssetAddList.data;
          
        }else{
          this.childAssetTempNo = this.childAssetTempNo - 1;
        }
      });
  }



  getCategoryComboValue(event) {
    if (event != null) {
      this.assetFormGroup.get('assetSubCategoryId').setValue(event.subCategoryId);
    } else {
      this.assetFormGroup.get('assetSubCategoryId').setValue(0);
      this.assetCategoryName = [];
      this.assetCategoryPageNumber = 1;
    }
  }

  getSubCategoryComboValue(event) {
    if (event != null) {
      this.assetFormGroup.get('assetSubCategoryId').setValue(event.subCategoryId);
      this.assetFormGroup.get('assetCategoryId').setValue(event.assetCategoryId);
    } else {
      this.assetFormGroup.get('assetSubCategoryId').setValue(0);
      this.assetFormGroup.get('assetCategoryId').setValue(0);
      this.assetCategoryName = [];
      this.assetCategoryPageNumber = 1;
    }
  }

  loadParentAssetDetail() {
    this.commonService.commonGetService('fetchAssetDtlByAssetId.sams', this.data.assetId).subscribe(
      data => {
        if(data.success) {
          this.parentAssetDetails = data.responseData;
          this.parentAssetId = data.responseData.assetHdrId;
        }
      },error => {
        this.commonService.openToastErrorMessage('Error Occurred During loadAssetDetails');
      });
  }

  dialogRefChild;

  viewChildAssetsMapped(){
    this.dialogRefChild = this.dialog.open(ViewChildassetInPreinwardComponent, {
      data: {
        'preInwHdrId':this.data.preInwHdrId,
        'preInwDtlId':this.data.preInwDtlId
      },
      width: "50%", height: "50%"
    });
}

}


