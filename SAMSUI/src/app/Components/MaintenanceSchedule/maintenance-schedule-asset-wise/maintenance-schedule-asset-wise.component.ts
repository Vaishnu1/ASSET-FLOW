import { Component, OnInit, Inject } from '@angular/core';
import { MaintenanceScheduleDtlModel } from 'src/app/Model/maintenance/maintenanceScheduleDtl';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';
import * as moment from 'moment';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CancelConfirmationWithoutReasonComponent } from '../../Common-components/cancel-confirmation-without-reason/cancel-confirmation-without-reason.component';

@Component({
  selector: 'app-maintenance-schedule-asset-wise',
  templateUrl: './maintenance-schedule-asset-wise.component.html',
  styleUrls: ['./maintenance-schedule-asset-wise.component.css']
})
export class MaintenanceScheduleAssetWiseComponent implements OnInit {
  displayedColumns = ['select', 'occurance', 'scheduledDate', 'status' , 'srNo', 'assignedTo', 'srStatus', 'actions'];
  scheduleDtlModelList: MaintenanceScheduleDtlModel[];
  scheduleDtlModel: MaintenanceScheduleDtlModel;

  length: String;//set total record count here 
  pageIndex: String;//set page number starts with zeroo
  pageSize: String;// records per page

  selectAllFlag: boolean = false;
  scheduleCancelList: any =[];
  enableCancelButton: boolean = false;
  cancelScheduleFlag: boolean = false;
  plannedScheduleFlag: boolean = false;
  assetCodeAndDescription: string = '';
  constructor(private matDialogRef: MatDialogRef<MaintenanceScheduleAssetWiseComponent>,
    private assetOptimaConstants: AssetOptimaConstants,
               @Inject(MAT_DIALOG_DATA) private data,
               private matDialog:MatDialog,
               private commonService :CommonService) { 
                this.scheduleDtlModelList = [];
                this.scheduleDtlModel = new MaintenanceScheduleDtlModel();
                this.pageSize = '100';
                this.pageIndex = '0';
               }

  ngOnInit() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.scheduleDtlModel.scheduleHdrId = this.data.scheduleHdrId;
    this.scheduleDtlModel.assetHdrId = this.data.assetId;
    this.assetCodeAndDescription = this.data.assetCode || 'N/A';  
    this.loadList();
  }

  scheduleStatus = [
    { id: 1, name: 'BOOKED' },
    { id: 2, name: 'WO-CREATED' },
    { id: 3, name: 'CANCELLED' }
  ];
  
  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.scheduleDtlModel.scheduleHdrId = this.data.scheduleHdrId;
    this.scheduleDtlModel.assetHdrId = this.data.assetId;
    this.loadList();
  }

  loadList() {
    if(this.scheduleDtlModel.scheduleDateDisp != null){
      this.scheduleDtlModel.scheduleDateDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.scheduleDtlModel.scheduleDateDisp);
    }

    this.scheduleDtlModel.pageNumber = Number(this.pageIndex);
    this.scheduleDtlModel.recordsPerPage = Number(this.pageSize);  
    this.commonService.commonListService('schedulesForSingleAsset.sams', this.scheduleDtlModel).subscribe(
      data => {
        if (data.success) {
          this.scheduleDtlModelList = data.responseData.dataList;
          this.length = data.responseData.dataTotalRecCount;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        //this.commonService.openToastErrorMessage(data.message);
      } 
    );
  }

  deleteIndividualSchedule() {
    let text;
    if(this.selectedScheduleList.length > 1){
      text = 'Schedules';
    } else{
      text = 'Occurrence No : ' + this.selectedScheduleList[0].occurrenceNo + ' Schedule';
    }
    let dialogRef = this.matDialog.open(CancelConfirmationWithoutReasonComponent, {
      width: '357px',
      data: { 'Text': text, 'titleName': 'Schedules'},
      panelClass: 'custom-dialog-container'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            this.scheduleCancelList = []; 
            for (let i = 0; i < this.selectedScheduleList.length; i++) {      
              if (this.selectedScheduleList[i].status === 'BOOKED') {
                this.scheduleCancelList.push(this.selectedScheduleList[i].scheduleDtlId);
              } 
            } 
  
            let scheduleIdList = {scheduleCancelList: []};
            scheduleIdList.scheduleCancelList = this.scheduleCancelList;
          this.commonService.commonInsertService('cancelMultipleSchedulesForAsset.sams', scheduleIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.selectedScheduleList = [];
                this.selectAllFlag = false;
                this.plannedScheduleFlag = false;
                this.ngOnInit();  
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }, error => {
              this.commonService.openToastErrorMessage(data.message);
            }
          );
        }
      });

  }
  exit() {
    this.matDialogRef.close();
  }

  scheduleDateValidation(event){
    if(event.value){
      this.scheduleDtlModel.scheduleDateDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.scheduleDtlModel.scheduleDateDisp = "";
    } 
    return false;
  }

  searchSchedule(){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadList();
  }

  selectedScheduleList = [];
  selectSchedule(element,checked){
    if(checked){
      if (this.commonService.getIndexOfTheItem(this.selectedScheduleList, true, 'scheduleDtlId)', element.scheduleDtlId) == -1) {
        this.selectedScheduleList.push(element);
      }
    } else{
      let index = this.commonService.getIndexOfTheItem(this.selectedScheduleList, true, 'scheduleDtlId', element.scheduleDtlId);
      if (index >= 0) {
        this.selectedScheduleList.splice(index, 1);
      }
    }
    // const indentId = this.selectedScheduleList.findIndex(data => data.scheduleDtlId === element.scheduleDtlId);
    // if (indentId === -1) {
    //   this.selectedScheduleList.push(element);
    // } else {
    //   this.selectedScheduleList.splice(indentId, 1);
    // }
    if(this.selectedScheduleList.length > 0){
      this.enableCancelButton = true;
      this.plannedScheduleFlag = true;
    } else{
      this.enableCancelButton = false;
      this.plannedScheduleFlag = false;
    }

  }

  multipleSelectSchedule(value: boolean) {
    if(value){
      this.enableCancelButton = true;
      this.plannedScheduleFlag = false;
      // this.selectedScheduleList = this.scheduleDtlModelList;
      for(let i=0; i< this.scheduleDtlModelList.length; i++){
        if(this.scheduleDtlModelList[i].status === 'BOOKED'){
          this.selectedScheduleList.push(this.scheduleDtlModelList[i]);
          this.plannedScheduleFlag = true;
        }
      }
    } else{
      this.enableCancelButton = false;
      this.selectedScheduleList = [];
      this.plannedScheduleFlag = false;
    }

  }
  compareValue(element) {
    return this.selectedScheduleList.findIndex(data => data.scheduleDtlId === element.scheduleDtlId) !== -1;
  }

  cancelSchedule(){
    this.cancelScheduleFlag = true;
    for (let i = 0; i < this.selectedScheduleList.length; i++) {  
      if (this.selectedScheduleList[i].status === 'BOOKED') {
     } else{
      this.cancelScheduleFlag = false;
        this.commonService.openToastWarningMessage("Kindly select the WO in 'Booked' status only to Cancel");
     }
    }
    if(this.cancelScheduleFlag){
      this.deleteIndividualSchedule();
     }
  }

}
