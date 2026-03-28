import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { allAssetStatusType } from 'src/app/Constants/AllStatusConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-asset-status-edit',
  templateUrl: './asset-status-edit.component.html',
  styleUrls: ['./asset-status-edit.component.css']
})
export class AssetStatusEditComponent implements OnInit {
  getData: getData;
  headingDisplay: string;
  displayButton: string;
  // assetMainForm: AssetModel;
  updateSrollBar: boolean = false;
  recordsPerPageForCombo: string;

  scrollsyncAssetStatusType: boolean = false;
  assetStatusTypePageNumber: number;
  assetStatusTypeCombo: any=[];

  scrollsyncAssetCondition: boolean =false;
  assetConditionPageNumber: any;
  assetConditionCombo: any=[];

  scrollsyncAssetStatus: boolean =false;
  asssetStatusPageNumber: number;
  assetStatusCombo: any=[];
  assetMainForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AssetStatusEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private translateService: TranslateService,
    public commonService: CommonService,
    private dialog: MatDialog,
    public assetOptimaServices: AssetOptimaServices){
      this.getData = new getData();
      this.assetStatusTypePageNumber =1;
      this.assetConditionPageNumber =1;
      this.asssetStatusPageNumber =1;
     }

  ngOnInit(): void {
    this.assetMainForm = new FormGroup({
      statusType: new FormControl(null, [Validators.required]),
      assetCondition: new FormControl(null, [Validators.required]),
      statusTypeId: new FormControl(0, [Validators.required]),
      assetConditionId: new FormControl(0, [Validators.required]),
      assetStatus: new FormControl(null, [Validators.required]),
      assetStatusId: new FormControl(0, [Validators.required]),
      remarks:new FormControl('', [Validators.required , Validators.maxLength(500)]),
      assetHdrId: new FormControl(0,[Validators.required]),
      transactionSrc: new FormControl('ASSET STATUS CHANGE')
    });
  }

  ngAfterViewInit() {
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.translateService.get([this.data.assetType,this.data.assetStatus,this.data.assetCondition])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.assetMainForm.controls.statusType.setValue(status[0]);
          this.assetMainForm.controls.assetStatus.setValue(status[1]);
          this.assetMainForm.controls.assetCondition.setValue(status[2]);
        }
      });
      this.assetMainForm.controls.assetStatusId.setValue(this.data.assetStatusId);
      this.assetMainForm.controls.statusTypeId.setValue(this.data.assetTypeId);
      this.assetMainForm.controls.assetConditionId.setValue(this.data.assetConditionId);
      this.assetMainForm.controls.assetHdrId.setValue(this.data.assetHdrId);
      this.assetMainForm.controls.remarks.setValue(this.data.remarks);
  }

  closeModal() {
    this.dialogRef.close();
  }

  loadAssetStatusTypeComboData(searchValue) {
    this.scrollsyncAssetStatusType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllStatusTypeCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetStatusTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetStatusTypePageNumber , this.assetStatusTypeCombo , data.responseData.comboList)
          this.assetStatusTypePageNumber = this.getData.pageNumber;
          this.assetStatusTypeCombo = this.getData.dataList;
          this.scrollsyncAssetStatusType = false;
        }
      );
  }


  selectedAssetStatusType(event) {
    if (event === undefined) {
      this.assetMainForm.controls.statusType.setValue('');
      this.assetMainForm.controls.statusTypeId.setValue(0);
      this.assetStatusTypePageNumber = 1;
      this.assetStatusTypeCombo = [];
      this.resetRemarks();
    } else {
      this.translateService.get([event.statusType])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.assetMainForm.controls.statusType.setValue(status[0]);
        }
      });
      this.assetMainForm.controls.statusTypeId.setValue(event.statusTypeId);
    }
    this.selectedAssetStatusList(undefined)
  }

  loadAssetConditionComboData(searchValue) {
    this.scrollsyncAssetCondition = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetConditionCombo.sams', searchValue.term, '', '',
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
      this.assetMainForm.controls.assetCondition.setValue('');
      this.assetMainForm.controls.assetConditionId.setValue(0);
      this.assetConditionPageNumber = 1;
      this.assetConditionCombo = [];
      this.resetRemarks();
    } else {
      this.translateService.get([event.assetCondition])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.assetMainForm.controls.assetCondition.setValue(status[0]);
        }
      });
      this.assetMainForm.controls.assetConditionId.setValue(event.assetConditionId);
    }
  }

  loadAssetStatusComboData(searchValue) {
    this.scrollsyncAssetStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetStatusCombo.sams', searchValue.term, this.assetMainForm.controls.statusTypeId.value, '',
      this.recordsPerPageForCombo, this.asssetStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.asssetStatusPageNumber , this.assetStatusCombo , data.responseData.comboList)
          this.asssetStatusPageNumber = this.getData.pageNumber;
          this.assetStatusCombo = this.getData.dataList;
          this.scrollsyncAssetStatus = false;
        }
      );
  }

  selectedAssetStatusList(event) {
    if (event === undefined) {
      this.assetMainForm.controls.assetStatus.setValue('');
      this.assetMainForm.controls.assetStatusId.setValue(0);
      this.asssetStatusPageNumber = 1;
      this.assetStatusCombo = [];
      this.resetRemarks();
    } else {
      this.translateService.get([event.statusType,event.assetStatusName])
              .subscribe((val) => {
                const status = Object.values(val)
                if(status.length > 0){
                  this.assetMainForm.controls.statusType.setValue(status[0]);
                  this.assetMainForm.controls.assetStatus.setValue(status[1]);
                }
              });
      this.assetMainForm.controls.assetStatusId.setValue(event.assetStatusId);
      this.assetMainForm.controls.statusTypeId.setValue(event.statusTypeId);
    }
  }

save(){
  this.submit();
  // if((this.data.assetTypeId === allAssetStatusType.AST_STS_TYP_UNASSIGNED || this.data.assetTypeId === allAssetStatusType.AST_STS_TYP_DISCARDED)
  //  && this.assetMainForm.controls.statusTypeId.value === allAssetStatusType.AST_STS_TYP_ASSIGNED){
  //   if(this.data.assigneePresent){
  //     this.commonService.openToastWarningMessage(`Assignee "Approval Status" Is Pending.`);
  //     this.closeModal();
  //   }else{
  //     this.commonService.openToastWarningMessage(`"Assignee" Is Not Available For This Asset. Kindly Assign To Proceed.`);
  //     this.closeModal();
  //   }
  // }else{
  //   this.submit();
  // }
}

CaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

  content: string = '';
  submit(){
    // if(this.assetMainForm.controls.statusTypeId.value !== allAssetStatusType.AST_STS_TYP_ASSIGNED && this.data.assetTypeId !== this.assetMainForm.controls.statusTypeId.value){
    //   this.content=`For Status Type "${this.CaseWord(this.assetMainForm.controls.statusType.value)}" Assignee Info Will Be Removed. Do You Want To continue?`
    // }else{
    //   this.content = `Are you sure to Update The "Asset Status"?`;
    // }
    this.content = `Are you sure to Update the "Asset Status"?`;
    let dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg' : this.content
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.updateSrollBar = true;
          this.commonService.commonInsertService('editAssetStatus.sams', this.assetMainForm.getRawValue()).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.updateSrollBar = false;
                this.dialogRef.close({ status: true });
              } else {
                this.commonService.openToastWarningMessage(data.message);
                this.updateSrollBar = false;
              }
            }, error => {
            }
          );
        }else{
          // console.log(data);
        }
      }
    );
  }

  resetRemarks(){
    if(this.data.remarks === this.assetMainForm.controls.remarks.value){
      this.assetMainForm.controls.remarks.setValue('');
    }
  }
}
