import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { AssetModel } from 'src/app/Model/master/asset';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { allAssetAgeCriteriaStatus } from 'src/app/Constants/AllStatusConstants';
import { AssetAssignee } from 'src/app/Model/master/asset-assignee';

@Component({
  selector: 'app-asset-history',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.css']
})
export class AssetHistoryComponent implements OnInit {

  asset : AssetModel;
  assetAssignee : AssetAssignee;

  displayedColumns = ['updatedDt','assetCode','serialNo','equipmentCode','modelName','manufacturerName','description','departmentName',
  'subDepartment', 'ownershipType','functionalStatus','maintenanceStrategy','pmMaintenanceStrategy','paMaintenanceStrategy','qaMaintenanceStrategy','businessPartnerName','businessPartnerSiteName','purchaseOrderNo','purchaseDtDisp','totalPurchaseAmt','transactionSrc','statusType','assetStatus','assetCondition', 'locationName','remarks', 'updatedBy'];

  displayAssigneeColumns = ['updatedDt','insertMode', 'assignToEmpName', 'departmentName','assigneeTypeName', 'rejectReason', 'defaultPersonIncharge', 'startDt',
                            'endDt', 'assignedPersonContactNumber', 'assignedPersonEmail' , 'updatedBy'];

  assetAuditList = [];
  assetAssigneeAuditList = [];

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //LOADER
  subLoader: boolean = false;
  AssetAgeCriteriaStatus = allAssetAgeCriteriaStatus;

  assigneeAuditSubLoader:boolean = false;
  assigneeAuditLength: string = '0';

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  assigneePageIndex: String;  //set page number starts with zeroo
  assigneePageSize: String;   // records per page

  selectedIndex: number = 0;
  maxNumberOfTabs: number = 2;

  constructor(private commonService: CommonService,
    private dialogRef: MatDialogRef<AssetHistoryComponent>, @Inject(MAT_DIALOG_DATA) private data,
    private cdr: ChangeDetectorRef) {
      this.asset = new AssetModel();
      this.assetAssignee = new AssetAssignee();
      this.pageSize = '100';
      this.pageIndex = '0';
      this.assigneePageIndex ='0';
      this.assigneePageSize = '100';
    }

  ngOnInit() {

    this.asset.direction = 'desc';
    this.asset.columnName = 'updatedDt';
    this.asset.assetHdrId=this.data.assetData.assetHdrId;
    this.asset.modelName=this.data.assetData.modelName ? this.data.assetData.modelName : '-';
    this.asset.assetCode=this.data.assetData.assetCode ? this.data.assetData.assetCode : '-';
    this.asset.assetCategoryName=this.data.assetData.assetCategoryName ? this.data.assetData.assetCategoryName : '-';
    this.asset.subCategoryName=this.data.assetData.subCategoryName ? this.data.assetData.subCategoryName : '-';
    this.asset.serialNo=this.data.assetData.serialNo ? this.data.assetData.serialNo : '-';
    this.asset.assetGroupName=this.data.assetData.assetGroupName ? this.data.assetData.assetGroupName : '-';
    this.asset.createdBy=this.data.assetData.createdBy ? this.data.assetData.createdBy : '-';
    this.asset.createdDtDisp=this.data.assetData.createdDtDisp ? this.data.assetData.createdDtDisp : '-';
    this.getList();
    this.assetAssignee.direction = 'asc';
    this.assetAssignee.columnName = 'updatedDt';
    this.assetAssignee.assetId=this.data.assetData.assetHdrId;
    this.getAssigneeList();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  exit(){
    this.dialogRef.close();
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getList();
  }

  assigneeGetServerData(event) {    
    this.assigneePageSize = event.pageSize;
    this.assigneePageIndex = event.pageIndex;
    this.getAssigneeList();
  }

  // getIndexValue(index: number): number {
  //   index = Number(this.pageSize) * Number(this.pageIndex) + index;
  //   return index;
  // }

  // customSort(event) {
  //   this.asset.pageNumber = 0;
  //   this.asset.columnName = event.active;
  //   this.asset.direction = event.direction;
  //   this.getList();
  // }

  getList() {
    this.assetAuditList = [];
    this.asset.pageNumber = Number(this.pageIndex);
    this.asset.recordsPerPage = Number(this.pageSize);

    this.subLoader =true;
    this.assetAuditList=[];
    this.commonService.commonListService('fetchListOfAllAssetHistory.sams',this.asset).subscribe(
      data => {

        if(data.success){
          this.subLoader =false;
          this.length = data.responseData.dataTotalRecCount;
          this.assetAuditList = data.responseData.dataList;
        }else{
          this.subLoader =false;
        }
      },error =>{
        this.subLoader =false;
      }
    );
  }

    // Move to Next Tab
    nextStep() {
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = this.selectedIndex + 1;
      }
    }

    previousStep() {
      if (this.selectedIndex != 0) {
        this.selectedIndex = this.selectedIndex - 1;
      }
    }

  getAssigneeList() {
    this.assetAssigneeAuditList = [];
    this.assetAssignee.pageNumber = Number(this.assigneePageIndex);
    this.assetAssignee.recordsPerPage = Number(this.assigneePageSize);

    this.assigneeAuditSubLoader =true;
    this.assetAssigneeAuditList=[];
    this.commonService.commonListService('fetchListOfAllAssetAssigneeHistory.sams',this.assetAssignee).subscribe(
      data => {
        if(data.success){
          this.assigneeAuditSubLoader =false;
          this.assigneeAuditLength = data.responseData.dataTotalRecCount;
          this.assetAssigneeAuditList = data.responseData.dataList;
        }else{
          this.assigneeAuditSubLoader =false;
        }
      },error =>{
        this.assigneeAuditSubLoader =false;
      }
    );
  }

  //To export report
  generateReport() {
    this.commonService.commonListService('reports/assets/generateAssetAuditReport.sams', this.asset).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }
  

}
