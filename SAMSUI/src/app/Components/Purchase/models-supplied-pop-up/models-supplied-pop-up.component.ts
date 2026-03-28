import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Model } from 'src/app/Model/master/model';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-models-supplied-pop-up',
  templateUrl: './models-supplied-pop-up.component.html',
  styleUrls: ['./models-supplied-pop-up.component.css']
})
export class ModelsSuppliedPopUpComponent implements OnInit {

  supplierId: number;
  manufacturerId: number;
  assetSupplierFormGroup: FormGroup;
  supplierForm: FormGroup;
  public model: Model;
  modelMainDataSource: any =[]; 
  //LOADER
  subloaderModel: boolean =false;
  length: String = '0';

  assetsSuppliedDispCol = ['sno','modelName','assetGroupName','manufacturerName','action'];

  scrollsyncAssetGroup: boolean = false;
  assetGroupPageNumber: number;
  assetGroup: any = [];

  recordsPerPageForCombo: string;

  scrollsyncModel: boolean = false;
  modelComboPageNumber: number;
  modelCombo: any = [];
  uploadFlagSupplier: boolean = false;
  
  constructor(private commonService: CommonService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ModelsSuppliedPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private service: AssetOptimaServices,
    private detectorRefs: ChangeDetectorRef) { 
      this.model = new Model();
      this.assetGroupPageNumber=1;
      this.modelComboPageNumber=1;
    }

  ngOnInit() {
    this.assetSupplierFormGroup = new FormGroup({
      assetSuppliedId : new FormControl(0),
      supplierId: new FormControl(this.data.supplierId),
      orgId: new FormControl(''),
      manufacturerId: new FormControl(this.data.manufacturerId),
      manufacturerName: new FormControl(this.data.manufacturerName),
      assetGroupId: new FormControl(''),
      assetGroupName: new FormControl(''),
      modelId: new FormControl(''),
      modelName: new FormControl(''),
      createdBy : new FormControl(''),
      createdDt : new FormControl(''),
      updatedBy : new FormControl(''),
      updatedDtDt : new FormControl('')
    });

    this.supplierId = this.data.supplierId;
    this.manufacturerId = this.data.manufacturerId;
    this.model.businessPartnerId=this.data.manufacturerId;
    this.assetSupplierFormGroup.controls.manufacturerName.disable();
    this.loadModelSuppliedList();
  }

  closeModel() {
    this.dialogRef.close();
  }

  loadModelSuppliedList(){
    this.commonService.commonListService('fetchListOfModelMappedForSupplier.sams',this.assetSupplierFormGroup.value).subscribe(
      data => {   
        if(data.success){
           this.subloaderModel=false;
           this.length = data.responseData.length;
           this.modelMainDataSource = data.responseData;
           this.clearModelsSuppliedFields();
        }else{
          this.subloaderModel=false;
        }
      }, error =>{
        this.subloaderModel=false;
      }
    );
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
      this.commonService.openToastWarningMessage('Selected Model is Already Added.');
    }
  }

  clearModelsSuppliedFields(){
    this.assetSupplierFormGroup.controls.assetGroupId.setValue(0);
    this.assetSupplierFormGroup.controls.modelName.setValue('');
    this.assetSupplierFormGroup.controls.modelId.setValue('');
    this.assetSupplierFormGroup.controls.assetGroupName.setValue('');
  }   

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.service.listAllAssetGroupCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchKey))) {
            if (this.assetGroupPageNumber === 1) {
              this.assetGroup = data.responseData.comboList;
            } else {
              this.assetGroup = this.assetGroup.concat(data.responseData.comboList);
            }
          } else {
            this.assetGroup = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.assetGroupPageNumber += 1 : this.assetGroupPageNumber = 1;
        });
    this.scrollsyncAssetGroup = false;
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
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, this.assetSupplierFormGroup.controls.manufacturerId.value,
      this.assetSupplierFormGroup.controls.assetGroupId.value > 0 ? this.assetSupplierFormGroup.controls.assetGroupId.value : '',
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchKey))) {
            if (this.modelComboPageNumber === 1) {
              this.modelCombo = data.responseData.comboList;
            } else {
              this.modelCombo = this.modelCombo.concat(data.responseData.comboList);
            }
          } else {
            this.modelCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.modelComboPageNumber += 1 : this.modelComboPageNumber = 1;
        });
    this.scrollsyncModel = false;
  }

  getModelComboValue(event) {
    if (event != null) {
      this.assetSupplierFormGroup.controls.modelId.setValue(event.modelId);
      this.assetSupplierFormGroup.controls.modelName.setValue(event.modelName);
      this.model.modelId=event.modelId;
    } else {
      this.assetSupplierFormGroup.controls.modelId.setValue(0);
      this.assetSupplierFormGroup.controls.modelName.setValue('');
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
      this.model.modelId=0;
    }
  }

  save(){
    var obj = {
      'modelsList': this.modelMainDataSource,
      'supplierId': this.data.supplierId
    }
    this.uploadFlagSupplier = true;
    this.commonService.commonInsertService(this.service.saveOrUpdateModelSupplied,obj).subscribe(
      data => {
        if(data.success){
          this.commonService.openToastSuccessMessage(data.message);
          this.uploadFlagSupplier = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlagSupplier = false;
        }
      }
    );
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
