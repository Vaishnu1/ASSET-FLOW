import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';
import { ModelBatchHdr } from 'src/app/Model/base/batchHdrModel';

@Component({
  selector: 'app-update-installation-wo-by-batch-dialog',
  templateUrl: './update-installation-wo-by-batch-dialog.component.html',
  styleUrls: ['./update-installation-wo-by-batch-dialog.component.css']
})
export class UpdateInstallationWoByBatchDialogComponent implements OnInit {

  displayedColumns = ['selectedForBatchUpdate', 'assetCode', 'serialNo', 'srNo', 'srStatus'];

  installationWoModel: ServiceRequestModel;
  batchHdrModel: ModelBatchHdr;

  installationSrList: any = [];
  selectedSrList: any = [];
  selectedSrIdList: any = [];

  confirmationTitle: string;
  poNo: string;
  modelName: string;

  length = 0;
  srId: number;
  assetId: number;

  subLoader = false;
  selectedAllForBatchUpdate = false;
  enableYesButton = false;

  constructor(
    private readonly commonService: CommonService,
    public dialogRef: MatDialogRef<UpdateInstallationWoByBatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data 
  ) { }

  ngOnInit(): void {
    this.installationWoModel = new ServiceRequestModel();
    this.batchHdrModel = new ModelBatchHdr();

    if(this.data.installationSrDetailModel !== 0) {
      this.installationWoModel = this.data.installationSrDetailModel;
      this.confirmationTitle = this.data.confirmationText;
      this.poNo = this.installationWoModel.poNo;
      this.modelName = this.installationWoModel.modelName;
      this.srId = this.installationWoModel.srId;
      this.assetId = this.installationWoModel.assetId;
    }
    this.fetchInstallationWoListForBatchUpdate();
  }

  closeDialog() {
    this.dialogRef.close({status: false});
  }

  fetchInstallationWoListForBatchUpdate() {
    this.subLoader = true;
    this.commonService.commonGetService('fetchInstallationWoListForBatchUpdate.sams',this.installationWoModel.assetId, this.poNo, this.modelName).subscribe(
      (data) => {
        if(data.success) {
          this.subLoader = false;
          this.installationSrList = data.responseData.installationWoList;
          this.length = this.installationSrList.length;
          this.batchHdrModel.batchHdrId = data.responseData.batchHdrId;
          this.batchHdrModel.reference1 = data.responseData.reference1;
          this.batchHdrModel.reference2 = data.responseData.reference2;
          this.batchHdrModel.srIdToBeReferencedForBatchUpdate = this.srId;
          this.batchHdrModel.assetIdToBeReferencedForBatchUpdate = this.assetId;
          this.batchHdrModel.assetIdListPresentInBatch = data.responseData.assetIdListPresentInBatch;
          this.batchHdrModel.installationWoList = data.responseData.installationWoList;
          if(this.installationWoModel.updateByBatch) {
            this.selectPreviouslySelectedSr();
          } else {
            this.selectCurrentSrForBatchUpdate();
          }
        } else {
          this.subLoader = false;
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    );
  }

  confirm() {
    this.selectedWOArePresentOrNot();
    if(this.enableYesButton) {
      this.getSelectedSrList();
      this.dialogRef.close({
        status: true, 
        batchHdrModel: this.batchHdrModel, 
        selectedSrList: this.selectedSrList,
        selectedSrIdList: this.selectedSrIdList
      });
    } else {
      this.commonService.openToastWarningMessage("No Record Selected, So Please Select atLeast One");
    }
  }

  selectAllForBatchUpdate(event) {
    if(event.checked) {
      for(const installationWO of this.installationSrList) {
          installationWO.selectedForBatchUpdate = true;
      }
    } else {
      for(const installationWO of this.installationSrList) {
        installationWO.selectedForBatchUpdate = false;
      }
    }
  }

  changeSelectionStatusOfCheckBox(event, index) {
    if(!event.checked) {
      this.selectedAllForBatchUpdate = false;
      this.installationSrList[index].selectedForBatchUpdate = false;
    } else {
      this.selectedAllForBatchUpdate = true;
      this.installationSrList[index].selectedForBatchUpdate = true;
      for(const installationWO of this.installationSrList) {
        if(!installationWO.selectedForBatchUpdate) {
          this.selectedAllForBatchUpdate = false;
          break;
        }
      }
    }
  }

  selectedWOArePresentOrNot() {
    this.enableYesButton = false;
    for(const installationWo of this.installationSrList) {
      if(installationWo.selectedForBatchUpdate) {
        this.enableYesButton = true;
        break;
      }
    }
    return this.enableYesButton;
  }

  getSelectedSrList() {
    for(const installationWo of this.installationSrList) {
    if(installationWo.selectedForBatchUpdate) {
      const tempObject = {
        assetCode: installationWo.assetCode, 
        serialNo: installationWo.assetSerialNo,
        srNo: installationWo.srNo
      };
      const srId = installationWo.srId;
      this.selectedSrList.push(tempObject);
      this.selectedSrIdList.push(srId);
    }
    }
  }

  selectCurrentSrForBatchUpdate() {
    for(const installationWo of this.installationSrList) {
      if(installationWo.srId === this.srId) {
        installationWo.selectedForBatchUpdate = true;
      }
    }
  }

  selectPreviouslySelectedSr() {
    this.selectedSrIdList = this.installationWoModel.selectedSrIdList;
    for(const installationWo of this.installationSrList) {
      for(const srIdOfPreviouslySelectedSr of this.selectedSrIdList) {
        if(installationWo.srId === srIdOfPreviouslySelectedSr) {
          installationWo.selectedForBatchUpdate = true;
        }
      }
    }
  }

}
