import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { PrNewItemMsgComponent } from './pr-new-item-msg/pr-new-item-msg.component';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';

@Component({
  selector: 'app-pr-new-item-add',
  templateUrl: './pr-new-item-add.component.html',
  styleUrls: ['./pr-new-item-add.component.css']
})
export class PrNewItemAddComponent implements OnInit {

  newPRItemFormGroup: FormGroup;

  getData: getData;
  itemType = [];
  itemTypePageNumber: number;
  limitCount: any;
  scrollItemTypesync: boolean = false;
  uomPageNumber: number;
  uom = [];
  scrollUomsync: boolean = false;

  tempValue: String = '';
  ErrorMsg :string;
  displayButton : String;

  constructor(public dialogRef: MatDialogRef<PrNewItemAddComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private userSession: UserSessionService) { 
      this.itemTypePageNumber = 1;
      this.uomPageNumber = 1;
      this.getData = new getData();
  }

  ngOnInit(): void {

    this.newPRItemFormGroup = new FormGroup({
      itemMasterId : new FormControl('0'),
      itemMasterName: new FormControl(null, [ Validators.required, Validators.maxLength(50)]),
      itemMasterDesc: new FormControl(''),
      itemTypeId: new FormControl(0, [ Validators.required]),
      itemTypeName: new FormControl(null, [ Validators.required]),
      masterUOMId: new FormControl(0),
      masterUOMName: new FormControl('',[ Validators.required]),
      active: new FormControl(false),

      itemCategoryName: new FormControl(''),
      prId: new FormControl(0),
      prDtlId : new FormControl(0)
    });
	  let prDtlInfoTemp = this.data.poDtlInfo.getRawValue();
    this.newPRItemFormGroup.controls.itemMasterName.setValue(prDtlInfoTemp.unApprovedItemTO.unApprovedItemName);
    this.newPRItemFormGroup.controls.itemMasterDesc.setValue(prDtlInfoTemp.unApprovedItemTO.unApprovedItemDesc);
    this.newPRItemFormGroup.controls.masterUOMName.setValue(prDtlInfoTemp.unApprovedItemTO.unApprovedUomCd);
    this.newPRItemFormGroup.controls.itemTypeId.setValue(prDtlInfoTemp.itemTypeId);
    this.newPRItemFormGroup.controls.itemTypeName.setValue(prDtlInfoTemp.itemTypeName);

    this.newPRItemFormGroup.controls.prId.setValue(prDtlInfoTemp.unApprovedItemTO.prId);
    this.newPRItemFormGroup.controls.prDtlId.setValue(prDtlInfoTemp.unApprovedItemTO.prDtlId);

    this.displayButton = 'Add';
  }

  checkForItemNameExistence(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
      ((this.newPRItemFormGroup.controls.itemMasterName.value!= null) ? this.newPRItemFormGroup.controls.itemMasterName.value.toLowerCase():'')) {
    
      }else if(this.newPRItemFormGroup.controls.itemMasterName.value.replace(/s+/g, ' ').trim() === ''){
        this.newPRItemFormGroup.controls['itemMasterName'].setValue('');
      }else{
        let constraintData: UniqueValidationModel = new UniqueValidationModel();
        constraintData.className = "com.sams.to.inventory.ItemMasterTO";
        constraintData.constraints = {
        'itemMasterName': this.newPRItemFormGroup.controls.itemMasterName.value.trim(),
        'orgId':this.userSession.getUserOrgId()
        };
        this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            this.ErrorMsg = data.message;
            this.newPRItemFormGroup.controls.itemMasterName.setErrors(Validators.minLength);
            this.newPRItemFormGroup.controls.itemMasterName.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
            this.newPRItemFormGroup.controls.itemMasterName.setErrors(null);
          }
        }
      );
    }
  }
  
  listofItemType(searchTerms) {
    this.scrollItemTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber , this.itemType , data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemType = this.getData.dataList;
        this.scrollItemTypesync = false;
      }
    );
  }

  getItemTypeComboValue(event) {
    if (event === undefined) {
      this.newPRItemFormGroup.get('itemTypeId').setValue(0);
      this.itemType = [];
      this.itemTypePageNumber = 1;
    } else {
      this.newPRItemFormGroup.get('itemTypeId').setValue(event.itemTypeId);
      this.newPRItemFormGroup.get('itemTypeName').setValue(event.itemTypeName);
      this.newPRItemFormGroup.get('itemCategoryName').setValue(event.itemCategoryName);
    }
  }

  listOfUOM(searchTerms) {
    this.scrollUomsync = true;
    this.limitCount = (!(this.commonService.fetchSearchValue(searchTerms))) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo, searchTerms.term, '', '', this.limitCount, this.uomPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.uomPageNumber , this.uom , data.responseData.comboList)
        this.uomPageNumber = this.getData.pageNumber;
        this.uom = this.getData.dataList;
        this.scrollUomsync = false;
      }
    );
  }

  getUOMValue(event) {
    if (event === undefined) {
      this.newPRItemFormGroup.get('masterUOMId').setValue(0);
      this.uom = [];
      this.uomPageNumber = 1;
    } else {
      this.newPRItemFormGroup.get('masterUOMId').setValue(event.uomId);
    }
  }


  confirmAddNewPRItem(){

    if(this.newPRItemFormGroup.controls.itemCategoryName.value == "SERVICE"){
      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg: `Are you sure to change the PR-Type to SERVICE ?`,
          
        }
      });
      dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(data => {
          if (data.status === true) {
            this.addNewPRItem();
          }
        });
    }else{
      this.addNewPRItem();
    }

    
  }

  addNewPRItem() {

    this.commonService.showSpinner();
    this.commonService.commonInsertService("apporvalItemAndPushBranch.sams", this.newPRItemFormGroup.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          console.log("data.responseData.locNamList", data.responseData.locNamList);
          if (data.responseData.locNamList.length == 0) {
            if (data.responseData.userWorkflowAccess) {
              this.newPRItemFormGroup.get('itemMasterId').setValue(data.responseData.itemMasterId);
              this.dialogRef.close(this.newPRItemFormGroup.getRawValue());
              this.commonService.openToastSuccessMessage(data.message);
            } else {
              this.commonService.openToastSuccessMessage(data.message);
              this.dialogRef.close(this.newPRItemFormGroup.getRawValue());
            }
          } else {
            this.commonService.hideSpinner();
            this.openentityGroupviewDialog(data.responseData.locNamList, data.message);
          }
        } else {
          this.commonService.hideSpinner();
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
    
    // this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateItemMaster, this.newPRItemFormGroup.getRawValue())
    // .subscribe(
    //   data => {
    //     if(data.success) {
    //       this.commonService.hideSpinner();
    //       this.newPRItemFormGroup.get('itemMasterId').setValue(data.responseData.itemMasterId);
    //       this.dialogRef.close(this.newPRItemFormGroup.getRawValue());
    //       this.commonService.openToastSuccessMessage(data.message);
    //     } else {
    //       this.commonService.openToastErrorMessage(data.message);
    //     }
    //   }
    // );
  }

  clear() {
    this.newPRItemFormGroup.reset();
    this.newPRItemFormGroup.updateValueAndValidity();
  }

  exit() {
    this.dialogRef.close();
  }
  
  openentityGroupviewDialog(event, message) {
    let dialogRef = this.dialog.open(PrNewItemMsgComponent, {
      width: '35%',
      height: 'auto',
      data: {
        'locNameList': event,
        'locValidMsg': message
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
    data => {
      if (data) {
        
      }
    });
  }  
}
