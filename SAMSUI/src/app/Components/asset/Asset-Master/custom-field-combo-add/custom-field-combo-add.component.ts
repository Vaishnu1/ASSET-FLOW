import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { DeleteConfirmationComponent } from '../../../Common-components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-custom-field-combo-add',
  templateUrl: './custom-field-combo-add.component.html',
  styleUrls: ['./custom-field-combo-add.component.css']
})
export class CustomFieldComboAddComponent implements OnInit {

  @ViewChild('matAssignee') customFields: MatTable<any>;

  custFieldList : any = [];
  oldCustFieldList : any = [];
  customHdrId : any = 0;
  displayedColumns = ['sno', 'customValues','action'];

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(private matDialogRef: MatDialogRef<CustomFieldComboAddComponent>, @Inject(MAT_DIALOG_DATA) private data,
  private dialog: MatDialog,
  private assetOptimaServices: AssetOptimaServices,
  private commonService: CommonService) { 
  }

  ngOnInit() { 
    this.custFieldList=[...this.data.customComboList];
    this.customHdrId = this.data.custHdrId;
    
  }

  getCustFieldObj(){
    return {
      customValues : '',
      customFieldEdit : false
    }
  }

  exit() {
       this.matDialogRef.close(this.data.customComboList);
  }

  addcomboValue(){
    this.custFieldList.push(this.getCustFieldObj());
    this.customFields.renderRows();
  }

  saveComboValue(){
    let validateValue = false;
      for (var i = 0; i < this.custFieldList.length; i++) {
          if (this.custFieldList.findIndex(data=>data.customValues == this.custFieldList[i].customValues) !== i) {
            this.commonService.openToastWarningMessage("Custom field value must not be same!");
            validateValue = true;
            break;
          }

          if(this.custFieldList[i].customValues == ''){
            this.commonService.openToastWarningMessage("Custom field value must not be empty!");
            validateValue = true;
            break;
          }
      }

      if (!validateValue) {
        this.matDialogRef.close(this.custFieldList);
      }
  }

  
  dialogRefDelete;
  deleteCustomField(event,i){
    
      this.dialogRefDelete = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'Text': 'Custom Field'
        }
      });
      this.dialogRefDelete.disableClose = true;
      this.dialogRefDelete.afterClosed().subscribe(
        data => {
          if (data.status) {
            if(event.customDtlId !== undefined){
              this.commonService.commonGetService(this.assetOptimaServices.deleteCustomFieldValue, event.customDtlId).subscribe(
                data => {
                if(data.success == true){
                  this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
                  this.custFieldList.splice(i,1);
                  this.data.customComboList(this.data.customComboList.findIndex(data=> data.customDtlId == event.customDtlId),1)
                  

                  this.customFields.renderRows();
                }
                else{
                  this.commonService.openToastErrorMessage(data.message);
                }
              });
            }
            else{
              this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
              this.custFieldList.splice(i,1);
              this.customFields.renderRows();
            }
      }
    });
  }

}
