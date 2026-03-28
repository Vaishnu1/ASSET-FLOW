import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.css']
})
export class ModuleCreateComponent implements OnInit {

  @ViewChild('focusModuleName') setFocusToModuleName: ElementRef;

  tableColumns = ['sno', 'itemMasterName', 'itemMasterDesc', 'itemTypeName', 'masterUOMName', 'active'];
  displayedColumns = this.tableColumns.concat(['action']);

  CommonhintMsg = new CommonHint();
  headingDisplay: String = '';
  buttonDisplay: String = '';
  mode: String;

  itemModuleFormGroup: FormGroup;
  moduleItemsFormGroup:FormGroup;
  moduleItemsListDataSource = new MatTableDataSource<any>();

  scrollItemNameSync: boolean = false;
  subLoaderItemModule: boolean = false;
  disableClearButton: boolean = false;
  uploadItemModuleFlag: boolean = false;

  length: number = 0;

  itemCombo: any[] =[];
  tempList: any[] = [];

  limitCount: any;

  itemPageNumber: number;

  getData: getData;
  modeDisplay: boolean = false;
  formOneValid: boolean = false;

  disableButton:boolean = true;
  tempValue: String = '';
  ErrorMsg :string;
  dialogRef;
  enableUpdate: boolean = false;
  
  constructor(
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private assetOptimaServices: AssetOptimaServices,
    private locationRef: Location,
    private userSession: UserSessionService,
    private readonly dialog: MatDialog,
    private router: Router) { 
    this.itemPageNumber = 1;
    this.getData = new getData();
  }

  ngOnInit() {   
    this.moduleItemsListDataSource.data = [];

    this.itemModuleFormGroup = new FormGroup({
      itemModuleId: new FormControl(0),
      orgId: new FormControl(0),
      itemModuleName: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
      createdBy:  new FormControl(''),
      createdDt:  new FormControl(''),
      updatedBy:  new FormControl(''),
      updatedDt:  new FormControl(''),
      itemModuleList: new FormControl([]),
      active: new FormControl(true)
    });

    this.formOneValid = false;

    this.moduleItemsFormGroup = new FormGroup({
      moduleItemsId: new FormControl(0),
      itemMasterId: new FormControl(0),
      itemMasterName: new FormControl(null, [ Validators.required]),
      itemMasterDesc: new FormControl(null),
      itemTypeId: new FormControl(0),
      itemTypeName: new FormControl(null),
      masterUOMId: new FormControl(0),
      masterUOMName: new FormControl(null),
      active: new FormControl(false)
    });

    this.validateEditMode();
  }

  backToPreviousPage() {
    localStorage.setItem('previousRoute', this.router.url);
    this.locationRef.back();
  }

  backToInventoryMaster(){
    this.locationRef.back();
  }

  listOfItemMaster(searchTerms) {
    this.scrollItemNameSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemMasterCombo, searchTerms.term, '', '', this.limitCount, this.itemPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber , this.itemCombo , data.responseData.comboList)
        this.itemPageNumber = this.getData.pageNumber;
        this.itemCombo = this.getData.dataList;
        this.scrollItemNameSync = false;        
      }
    );
  }

  selectedItemName(event) {    
    if (event === undefined) {
      this.moduleItemsFormGroup.controls.itemMasterId.setValue(0);
      this.moduleItemsFormGroup.controls.itemMasterDesc.setValue(null);
      this.moduleItemsFormGroup.controls.itemTypeId.setValue(0);
      this.moduleItemsFormGroup.controls.itemTypeName.setValue(null);
      this.moduleItemsFormGroup.controls.masterUOMId.setValue(0);
      this.moduleItemsFormGroup.controls.masterUOMName.setValue(null);
      this.itemPageNumber = 1;
      this.itemCombo = [];
    } else {
      this.moduleItemsFormGroup.patchValue(event);
      this.disableButton = false;  
    }
  }

  clear() {
    this.itemModuleFormGroup.reset();
    this.ngOnInit();
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        this.mode = mode;
        if(primaryId === '0') {
          primaryId = Number(primaryId);
          this.buttonDisplay = 'Submit';
          this.headingDisplay = 'Create';
        } else {
          this.subLoaderItemModule=true;          
          this.commonService.commonGetService(this.assetOptimaServices.loadItemModuleInfoByItemModuleId, primaryId,'MODULE CREATE').subscribe(
            data => {
              if (data.success) {
                this.subLoaderItemModule=false;
                this.itemModuleFormGroup.patchValue(data.responseData);
                this.itemModuleFormGroup.controls.itemModuleName.setValue(data.responseData.itemModuleName);
                this.moduleItemsListDataSource.data = this.itemModuleFormGroup.controls.itemModuleList.value;
                this.length = this.moduleItemsListDataSource.data.length;
                this.tempValue = this.itemModuleFormGroup.controls.itemModuleName.value;
                this.formValidation();
              }else{
                this.subLoaderItemModule=false;
              }
            }
          );
          if(mode === 'edit') {
            this.buttonDisplay = 'Update';
            this.headingDisplay = 'Edit';
            this.disableClearButton = true;
          } else {
            this.displayedColumns = this.tableColumns;
            this.buttonDisplay = 'Update';
            this.headingDisplay = 'View';
            this.modeDisplay = true;
            this.itemModuleFormGroup.disable();
            this.moduleItemsFormGroup.controls.itemMasterName.disable();
          }
        }
      }
    );
  }

  saveOrUpdateItemModule() {
    this.uploadItemModuleFlag = true;
    this.itemModuleFormGroup.enable();
    this.itemModuleFormGroup.controls.itemModuleList.setValue(this.moduleItemsListDataSource.data);    
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateItemModule, this.itemModuleFormGroup.getRawValue())
    .subscribe(
      data => {
        if(data.success) {
          this.uploadItemModuleFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.backToPreviousPage();
        } else {
          this.uploadItemModuleFlag = false;
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  addItemsToList() {
    this.isChanged();
    const itemModuleIdValid = this.moduleItemsListDataSource.data.findIndex(data => data.itemMasterId === this.moduleItemsFormGroup.value.itemMasterId) === -1;

    if (itemModuleIdValid) {
      this.moduleItemsListDataSource.data.push(this.moduleItemsFormGroup.value);  
    }else{
      this.commonService.openToastWarningMessage(this.moduleItemsFormGroup.controls.itemMasterName.value + ' Is Already Added.');
    }
    this.moduleItemsListDataSource._updateChangeSubscription();
    this.moduleItemsFormGroup.reset();
    this.moduleItemsFormGroup.controls.moduleItemsId.setValue(0);
    this.length = this.moduleItemsListDataSource.data.length;  
    this.formValidation();
    this.disableButton = true; 
  }

  formValidation() {
    if (this.length > 0) {      
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
    return this.formOneValid;
  }

  checkModuleNameIsEmpty(){
    if (this.itemModuleFormGroup.controls.itemModuleName.value === "") {
      this.enableUpdate = false;
    }
  }

  checkForModuleNameExistence(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
      ((this.itemModuleFormGroup.controls.itemModuleName.value!= null) ? this.itemModuleFormGroup.controls.itemModuleName.value.toLowerCase():'')) {
    
      }else if(this.itemModuleFormGroup.controls.itemModuleName.value.replace(/s+/g, ' ').trim() === ''){
        this.itemModuleFormGroup.controls['itemModuleName'].setValue('');
      }else{
        let constraintData: UniqueValidationModel = new UniqueValidationModel();
        constraintData.className = "com.sams.to.master.ItemModuleTO";
        constraintData.constraints = {
        'itemModuleName': this.itemModuleFormGroup.controls.itemModuleName.value.toLowerCase().trim(),
        'orgId':this.userSession.getUserOrgId()
        };
        this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            this.ErrorMsg = data.message;
            this.itemModuleFormGroup.controls.itemModuleName.setErrors(Validators.minLength);
            this.itemModuleFormGroup.controls.itemModuleName.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
            this.itemModuleFormGroup.controls.itemModuleName.setErrors(null);
          }
        }
      );
    }
  }

  deleteItem(i){    
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Item'
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.tempList = this.moduleItemsListDataSource.data;
          this.tempList.splice(i, 1);
          this.moduleItemsListDataSource.data = this.tempList;
          this.length = this.moduleItemsListDataSource.data.length;
          this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
          this.enableUpdate = false;          
        }
      });
  }
  
  isChanged(){
    this.enableUpdate = true;
  }

}
