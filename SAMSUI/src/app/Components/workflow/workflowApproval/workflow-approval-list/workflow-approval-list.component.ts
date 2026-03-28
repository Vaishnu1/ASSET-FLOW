import { Component, OnInit} from '@angular/core';
import { WorkflowApprovalModel } from 'src/app/Model/workflow/workflowApproval';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { HeaderComponent } from 'src/app/Components/Common-components/header/header.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { SubMenus } from 'src/app/Constants/SubMenusList';
import { EmailNotificationModel } from 'src/app/Model/notification/emailNotificationModel';
import {  MatDialog } from '@angular/material/dialog';
import { NotificationExplanationDialogComponent } from 'src/app/Components/Dialog-Components/notification/notification-explanation-dialog/notification-explanation-dialog.component';
import { allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetRelocationListComponent } from 'src/app/Components/asset/Asset-Relocation/asset-relocation-list/asset-relocation-list.component';
import { TranslateService } from '@ngx-translate/core';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Component({
  selector: 'app-workflow-approval-list',
  templateUrl: './workflow-approval-list.component.html',
  styleUrls: ['./workflow-approval-list.component.css']
})
export class WorkflowApprovalListComponent implements OnInit {
  //Set Page Title
  title = 'Asset Optima - Workflow Notification';

  workflowApprovalModel : WorkflowApprovalModel;

  pageIndex: String;//set page number starts with zero
  pageSize: String;// records per page
  length: String;//set total record count here
  lengthOfNotifications: String = '0';

  subLoader : boolean = false;
  subLoaderForNotifications: boolean = false;
  selectedRowIndex =  -1;

  workflowNotificationDataSource = [];
  workflowNotificationDispColumns = ['sNo','select','transactionNo','workflowDescriptionTO.workflowName',
                                     'levelName','employeeName1','condition1','employeeName2',
                                     'condition2','employeeName3','createdDt','updatedDt'];


  emailListDataSource:any = [];
  displayedColumns = ['select', 'createdBy', 'msgDestinationEmailId', 'createdDt', 'emailInformationTO.emailSubject'];

  //COMBO
  processCombo: any = [];
  processListPageNumber: number;
  scrollProcessSync: boolean = false;

  workflowDescriptionCombo: any = [];
  scrollWorkflowDescriptionSync: boolean = false;

  workflowDescriptionListPageNumber: number;
  selectedIndex: number = 0;
  countOfUnreadEmailNotifications: number = 0;
  countOfUnreadWorkflowNotifications: number = 0;
  countOfTotalUnreadNotifications: number = 0;

  recordsPerPageForCombo: string;

  modelAccessModule: ModuleAccessModel;

  emailNotificationModel: EmailNotificationModel;
  getData: getData;
  selectedItem: any=0;
  selectedItem1: any=0;

  constructor(  private commonService:CommonService,
                private router: Router,
                private titleService: Title,
                private userSessionService: UserSessionService,
                private samsConstant: AssetOptimaConstants,
                private subMenuList: SubMenus,
                private dialog: MatDialog,
                private translateService: TranslateService,
                private samsService:AssetOptimaServices,
              ) {

      this.modelAccessModule = new ModuleAccessModel();
      this.workflowApprovalModel = new WorkflowApprovalModel();
      this.emailNotificationModel = new EmailNotificationModel();
      this.workflowDescriptionListPageNumber = 1;
      this.processListPageNumber = 1;
      this.getData = new getData();
    }

  ngOnInit() {
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WORKFLOW_NOTIFICATION'];
    this.titleService.setTitle(this.title);
    this.pageSize = '100';
    this.pageIndex = '0';
    this.workflowApprovalModel.direction = 'desc';
    this.workflowApprovalModel.columnName = 'updatedDt';
    this.workflowApprovalModel.loginEmployeeId = this.userSessionService.getUserEmpId();

    this.emailNotificationModel.direction = 'desc';
    this.emailNotificationModel.columnName = 'createdDt';
    this.emailNotificationModel.setLogInUserId = this.userSessionService.getUserEmpId();

    this.emailNotificationModel.msgDestinationEmailId = this.userSessionService.getUserEmpEmailId();
    this.loadWorkNotificationList();
    this.loadEmailNotificationList();
    this.readCountOfUnreadEmailNotifications();

  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadWorkNotificationList();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.workflowApprovalModel.pageNumber = 0;
    this.workflowApprovalModel.columnName = event.active;
    this.workflowApprovalModel.direction = event.direction;
    this.loadWorkNotificationList();
  }

  searchWorkflowNotification() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadWorkNotificationList();
  }

  clear(){
    this.workflowApprovalModel = new WorkflowApprovalModel();
    this.ngOnInit();
  }

  workflowNotificationEdit(element,mode){

    console.log("element.transactionSource" , element.transactionSource);

    if(element.transactionSource == 'WORKORDER'){
      this.router.navigate(['home/serviceRequest/serviceView/'+element.transactionId+'/'+mode]);
    } else if(element.transactionSource == allWorkflowStatus[allWorkflowStatus.PRE_INWARD]){
      this.router.navigate(['home/asset/preInwardInventoryCreate/'+ element.transactionId + '/' + mode]);
    } else if(element.transactionSource == allWorkflowStatus[allWorkflowStatus.CONTRACT]){
      this.router.navigate(['home/asset/contractCreate/'+ element.transactionId + '/' + mode + '/' +'contract']);
    }else if(element.transactionSource == allWorkflowStatus[allWorkflowStatus.RETIREMENT] || 
      element.transactionSource == allWorkflowStatus[allWorkflowStatus.DISPOSAL] || 
      element.transactionSource == allWorkflowStatus[allWorkflowStatus.SALVAGE]
    ){
      this.router.navigate(['home/asset/assetRetirementCreate/'+ element.transactionId + '/' + mode ]);
    }else if(element.transactionSource == allWorkflowStatus[allWorkflowStatus.LOAN] ||element.transactionSource == allWorkflowStatus[allWorkflowStatus.LOAN_RETURNS] ){
      this.router.navigate(['home/asset/loanReturnRequesCreate/'+ element.transactionId + '/' + mode ]);
    }else if(element.transactionSource == allWorkflowStatus[allWorkflowStatus.ASSET_CREATE]){
      this.router.navigate(['home/asset/assetCreateV1/', element.transactionId,mode, 'asset_info' ]);
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.GATE_PASS]){
      this.router.navigate(['home/asset/gatePassCreate/' + element.transactionId + '/' + mode])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.STOCK_ALLOCATE]){
      this.router.navigate(['/home/asset/assetStockCreate/' + element.transactionId + '/' + mode])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.PO]){
      this.router.navigate(['/home/purchase/purchaseOrderCreate/' + element.transactionId + '/' + mode])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.PR]){
      this.router.navigate(['/home/purchase/purchaseRequestCreate/'+ element.transactionId + '/' + mode])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.STOCK_TRANSFER]){
      this.router.navigate(['/home/inventory/stockTransferCreate/'+ element.transactionId + '/' + mode])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.STOCK_INDENT]){
      this.router.navigate(['/home/inventory/stockIndentCreate/'+ element.transactionId + '/' + mode])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.CONTRACT]){
      this.router.navigate(['/home/asset/contractCreate/'+ element.transactionId + '/' + mode + '/contract'])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL]){
      this.router.navigate(['/home/inventory/itemCreate/'+ element.transactionId + '/' + mode ])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.WO_BD] ||
      element.transactionSource === allWorkflowStatus[allWorkflowStatus.WO_HANDOVER] ||
      element.transactionSource === allWorkflowStatus[allWorkflowStatus.WO_INSTALLATION] ||
      element.transactionSource === allWorkflowStatus[allWorkflowStatus.WO_PA] ||
      element.transactionSource === allWorkflowStatus[allWorkflowStatus.WO_PM] ||
      element.transactionSource === allWorkflowStatus[allWorkflowStatus.WO_QA]){
      this.router.navigate(['/home/serviceRequest/serviceView/'+ element.transactionId + '/' + mode +'/menu_workflow_approval'])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL]){
      this.router.navigate(['/home/asset/grnCreate/'+ element.transactionId + '/' + mode ])
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION]){
      let assetRelocationList = new AssetRelocationListComponent(this.commonService,this.userSessionService,this.titleService,this.translateService,this.dialog,this.router,this.samsService);
      assetRelocationList.viewOrEditTabOpen(element.transactionId ,mode);
    }else if(element.transactionSource === allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT]){
      this.router.navigate(['/home/asset/assetPhysicalAuditEdit/'+ element.transactionId +'/'+ element.locationId +'/' + mode ])
    }
  }

  loadWorkNotificationList() {
     this.workflowApprovalModel.pageNumber = Number(this.pageIndex);
     this.workflowApprovalModel.recordsPerPage = Number(this.pageSize);

     this.subLoader = true;
     this.workflowNotificationDataSource = [];

      this.commonService.commonListService("fetchListOfWorkflowNotificationForUser.sams", this.workflowApprovalModel).subscribe(
      data => {
          if(data.success){
            this.workflowNotificationDataSource = data.responseData.dataList;
            this.length = data.responseData.dataTotalRecCount;
            this.subLoader =false;
            console.log(this.workflowNotificationDataSource);

          }else{
            this.subLoader =false;
          }
        },error =>{
          this.subLoader =false;
        }
    );
  }

  listOfWorkflowProcess(searchValue) {
    this.scrollProcessSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowProcessCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.processListPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.processListPageNumber , this.processCombo , data.responseData.comboList)
          this.processListPageNumber = this.getData.pageNumber;
          this.processCombo = this.getData.dataList;
          this.scrollProcessSync = false;
        }
      );
  }

  setWorkflowProcess(event) {
    if (event === undefined) {
      this.workflowApprovalModel.workflowProcessName = '';
      this.workflowApprovalModel.workflowProcessId = 0;
      this.processListPageNumber = 1;
      this.processCombo = [];
    } else {
      this.workflowApprovalModel.workflowProcessName = event.workflowProcessName;
      this.workflowApprovalModel.workflowProcessId = event.workflowProcessId;
    }
  }

  listOfWorkflowDescription(searchValue) {
   this.scrollWorkflowDescriptionSync = true;
   this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
   this.commonService.getComboResults('listOfAllWorkflowDescriptionCombo.sams', searchValue.term,
     this.workflowApprovalModel.workflowProcessId > 0 ? this.workflowApprovalModel.workflowProcessId : '', '',
     this.recordsPerPageForCombo, this.workflowDescriptionListPageNumber).subscribe(
       (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.workflowDescriptionListPageNumber , this.workflowDescriptionCombo , data.responseData.comboList)
        this.workflowDescriptionListPageNumber = this.getData.pageNumber;
        this.workflowDescriptionCombo = this.getData.dataList;
        this.scrollWorkflowDescriptionSync = false;
       }
     );
 }

 setWorkflowDescription(event) {
   if (event === undefined) {
     this.workflowApprovalModel.workflowDescriptionId=0;
     this.workflowApprovalModel.workflowName='';
     this.workflowDescriptionListPageNumber = 1;
     this.workflowDescriptionCombo = [];
     this.workflowApprovalModel.workflowProcessId = 0;
     this.workflowApprovalModel.workflowProcessName = '';
     this.workflowDescriptionListPageNumber = 1;
     this.workflowDescriptionCombo = [];
   } else {
     this.workflowApprovalModel.workflowDescriptionId=event.workflowDescriptionId;
     this.workflowApprovalModel.workflowName=event.workflowName;
     this.workflowApprovalModel.workflowProcessName = event.workflowProcessName;
     this.workflowApprovalModel.workflowProcessId = event.workflowProcessId;
   }
 }


 getColorBasedOnRead(row){
  var changeStatusToRead: boolean=false;
   if(row.employeeId1 == this.userSessionService.getUserEmpId()) {
    if(row.emplReadFlag){
      changeStatusToRead=true;
    }
   } else if (row.employeeId2 == this.userSessionService.getUserEmpId()) {
    if(row.emp2ReadFlag){
      changeStatusToRead=true;
    }
   } else if (row.employeeId3 == this.userSessionService.getUserEmpId()) {
    if(row.emp3ReadFlag){
      changeStatusToRead=true;
    }
   }
  if(changeStatusToRead){
    return "white";
  }else{
    return "#D8D8D8";
  }
 }

 selectedRow(row) {
   var workflowApprovalId = row.workflowApprovalId;
   var employeeNoReadFlag = "";
   var updateReadFlag = false;
   if(row.employeeId1 == this.userSessionService.getUserEmpId()) {
      employeeNoReadFlag = "EMP1";
      if(row.emplReadFlag == false) {
        updateReadFlag = true;
      }
   } else if (row.employeeId2 == this.userSessionService.getUserEmpId()) {
      employeeNoReadFlag = "EMP2";
      if(row.emp2ReadFlag == false) {
        updateReadFlag = true;
      }
   } else if (row.employeeId3 == this.userSessionService.getUserEmpId()) {
      employeeNoReadFlag = "EMP3";
      if(row.emp3ReadFlag == false) {
        updateReadFlag = true;
      }
   }

   if(updateReadFlag) {
    this.commonService.commonGetService('updateReadFFlag.sams',workflowApprovalId,this.userSessionService.getUserEmpId(),employeeNoReadFlag).subscribe(
      data => {
        if (data.success) {

          let headerComponent = new HeaderComponent(this.router, this.userSessionService, this.commonService, this.samsConstant, this.subMenuList);
          headerComponent.loadNofityCount();

          this.ngOnInit();
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }, error => {

      }
    );
   }



 }

 customSortForNotifications(event) {
  this.emailNotificationModel.pageNumber = 0;
  this.emailNotificationModel.columnName = event.active;
  this.emailNotificationModel.direction = event.direction;

  this.loadEmailNotificationList();
 }

 getServerDataForNotifications(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.loadEmailNotificationList();
 }

 loadEmailNotificationList() {
  this.emailNotificationModel.pageNumber = Number(this.pageIndex);
  this.emailNotificationModel.recordsPerPage = Number(this.pageSize);

  this.subLoaderForNotifications = true;
  this.workflowNotificationDataSource = [];

   this.commonService.commonListService("fetchListOfEmailNotificationForUser.sams", this.emailNotificationModel).subscribe(
   data => {
       if(data.success){
         this.emailListDataSource = data.responseData.dataList;
         this.lengthOfNotifications = data.responseData.dataTotalRecCount;
         for(let emailBody of this.emailListDataSource){
           emailBody.emailBody = emailBody.emailBody.replace(/<[^>]+>/g, ' ');
         }
         this.subLoaderForNotifications =false;
       }else{
         this.subLoaderForNotifications =false;
       }
     },error =>{
       this.subLoaderForNotifications =false;
     }
 );
 }

 getColorBasedOnReadStateOfEmailNotification(row, active: boolean){
  var changeStatusToReadForEmail: boolean=false;
   if(row.msgDestinationEmailId == this.userSessionService.getUserEmpEmailId()) {
    if(row.readState){
      changeStatusToReadForEmail=true;
    }

    if(changeStatusToReadForEmail){
      return "white";
    }else{
      return "#D8D8D8";
    }

 }

}

selectedRowForEmailNotification(row) {
  var emailMsgId = row.emailMsgId;
   var updateReadFlag = false;
   if(row.msgDestinationEmailId == this.userSessionService.getUserEmpEmailId()) {
      if(row.readState == false) {
        updateReadFlag = true;
      }
   }
   if(updateReadFlag) {
    this.commonService.commonGetService('updateReadStateForEmailNotification.sams',emailMsgId, this.userSessionService.getUserEmpId()).subscribe(
      data => {
        if (data.success) {

          let headerComponent = new HeaderComponent(this.router, this.userSessionService, this.commonService, this.samsConstant, this.subMenuList);
          headerComponent.loadNofityCount();

          this.ngOnInit();
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }, error => {

      }
    );
   }
}

readCountOfUnreadEmailNotifications() {
  this.commonService.commonGetService('countOfUnreadEmailNotifications.sams', this.userSessionService.getUserEmpId()).subscribe(
    data => {
      if(data.success){
        this.countOfUnreadEmailNotifications = data.responseData;

          this.commonService.commonGetService('userNotifyCount.sams').subscribe(
            (data) => {
              this.countOfTotalUnreadNotifications = data.responseData;
              this.countOfUnreadWorkflowNotifications = this.countOfTotalUnreadNotifications - this.countOfUnreadEmailNotifications;
            }
          )

      }
    }, error => {
      this.commonService.openToastErrorMessage("Failed to fetch count of unread email notifications")
    }
  );
}


  openNotificationExplanationDialog(element) {
    let dialogRef = this.dialog.open(NotificationExplanationDialogComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'emailNotificationModel': element
      }
    })
    dialogRef.afterClosed().subscribe(
      data => {
        this.selectedRowForEmailNotification(element);
      });
  }

  selectWorkflowApproval(element){
    if(this.selectedItem.workflowApprovalId == element.workflowApprovalId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }

  selectApproval(element){
    if(this.selectedItem1.emailInfoId == element.emailInfoId){
      this.selectedItem1 = 0;
    }else{
      this.selectedItem1 = element;
    }
  }
}

