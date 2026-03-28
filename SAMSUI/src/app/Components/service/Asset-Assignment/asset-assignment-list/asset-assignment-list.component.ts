import { Component, OnInit } from '@angular/core';
import { AssetAssignee } from '../../../../../app/Model/master/asset-assignee';
import { CommonService } from '../../../../../app/Services/common-service/common.service';
import { ConfirmConfirmationComponent } from '../../../../../app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { RejectConfirmationComponent } from '../../../../../app/Components/Common-components/reject-confirmation/reject-confirmation.component';
import { UserSessionService } from '../../../../../app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from '../../../../../app/Model/base/moduleAccess';
import { getData } from '../../../../../app/Model/common/fetchListData';

@Component({
  selector: 'app-asset-assignment-list',
  templateUrl: './asset-assignment-list.component.html',
  styleUrls: ['./asset-assignment-list.component.css']
})
export class AssetAssignmentListComponent implements OnInit {

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page


  modeDisplay = true;

  assigneeDisplayedColumns=['select','assetCode','assetDescription','assetEquipmentCode','departmentName','subDepartmentName', 'assignToEmpName','assigneeType','startDt','endtDt','assignedBy','emailId','phoneNo']

  public assetAssignee: AssetAssignee;

  public  assetAssigneeDataSource :AssetAssignee[] = [];

  scrollsyncAssetCode: boolean = false;
  recordsPerPageForCombo: string;
  assetCodePageNumber: number;
  assetCodeCombo: any = [];

  scrollUsersync: boolean = false;
  userPageNumber: number;
  userCombo: any = [];

  scrollsyncAssignToPerson: boolean = false;
  assignToPersonCombo: any = [];
  assignToPersonPageNumber: number;

  modelAccessModule: ModuleAccessModel;
  getData: getData;

  selectedItem: any = 0;
  selectedAssetCode: any = 0;
  selectedAssetId: any = 0;
  selectedAssignedVolumeLicenseQty: any = 0;
  selectAllAssignee : boolean = false;
  status : string ="";
  rejectReason : string ="";

  constructor(private readonly commonService: CommonService,
                private readonly userSessionService: UserSessionService,
    private readonly dialog: MatDialog) {
    this.assetAssignee = new AssetAssignee();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.assetCodePageNumber=1;
    this.userPageNumber=1;
    this.assignToPersonPageNumber=1;
    this.modelAccessModule = new ModuleAccessModel();
   }

  ngOnInit(): void {
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_ASSIGNMENT'];
    this.fetchList();
    this.selectedAssigneeList=[];
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }

  SwithTab(status: any){
    this.modeDisplay = status
  }

  clear(){
    this.assetAssignee = new AssetAssignee();
    this.ngOnInit();
    this.selectedItem = 0;
  }

  fetchList(){
    this.assetAssignee.pageNumber = Number(this.pageIndex);
    this.assetAssignee.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService('fetchListOfAllAssigneeList.sams', this.assetAssignee).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.assetAssigneeDataSource = data.responseData.dataList;
          this.selectedItem = 0;
        } else {
          this.selectedItem = 0;
        }
      }, error => {
      }
    );
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCodePageNumber
      , '0', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          this.scrollsyncAssetCode = false;
        }
      );
  }

  selectedAssetCodeData(event) {
    if (event === undefined) {
      this.assetAssignee.assetId = 0;
      this.assetAssignee.assetCode = '';
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
    } else {
      this.assetAssignee.assetId = event.assetHdrId;
      this.assetAssignee.assetCode = event.assetCode;;
    }
  }

  selectedAssignedToData(event) {
    if (event === undefined) {
      this.assetAssignee.createdById = 0;
      this.userPageNumber = 1;
      this.userCombo = [];
    } else {
      this.assetAssignee.createdById = event.userId;
    }
  }

  loadServiceEngineerData(searchValue) {
    this.scrollUsersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllUserNameCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.userPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.userPageNumber , this.userCombo , data.responseData.comboList)
        this.userPageNumber = this.getData.pageNumber;
        this.userCombo = this.getData.dataList;
        this.scrollUsersync = false;
      }
    );
  }

  selectedAssigneeList=[];
  selectAssetAssignee(element){
    const indentId = this.selectedAssigneeList.findIndex(data => data.assetAssigneeId === element.assetAssigneeId);
    if(indentId === -1){
      this.selectedAssigneeList.push(element);
    }else{
      this.selectedAssigneeList.splice(indentId,1);
    }
  }

  compareValue(element: any): boolean{
    if(this.selectedAssigneeList.length > 0){
      return this.selectedAssigneeList.findIndex(data => data.assetAssigneeId === element.assetAssigneeId) !== -1;
    }
    else{
      return false;
    }
  }

  selectAllAssetAssignee(event){
    this.selectAllAssignee = event.checked;
    if(event.checked){
      this.selectedAssigneeList = this.assetAssigneeDataSource;
    }
    else{
      this.selectedAssigneeList = [];
    }
  }

  confirmAssigneeApprove() {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': 'Are You Sure To Approve This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.status = "APPROVED";
          this.rejectReason ="";
          this.updateAssigneeStatus(this.status,this.rejectReason);
        }
      });
  }

  rejectAssigneeApprove() {
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': 'Are You Sure To Reject This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.status = "REJECTED";
          this.rejectReason = data.reason
          this.updateAssigneeStatus(this.status,this.rejectReason);
        }
      });
  }


  updateAssigneeStatus(status,rejectReason) {
    let assigneeList = {selectedAssigneeList: this.selectedAssigneeList,status: status,rejectReason:rejectReason};

    this.commonService.commonInsertService('approvalOrRejectAssignee.sams', assigneeList).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.ngOnInit();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      });
  }

  loadAssignToComboData(searchValue) {
    this.scrollsyncAssignToPerson = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assignToPersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assignToPersonPageNumber , this.assignToPersonCombo , data.responseData.comboList)
        this.assignToPersonPageNumber = this.getData.pageNumber;
        this.assignToPersonCombo = this.getData.dataList;
        this.scrollsyncAssignToPerson = false;
      }
    );
  }

  selectedAssignToPerson(event) {
    if (event === undefined) {
      this.assetAssignee.assignedToEmpId = 0;
      this.assignToPersonPageNumber = 1;
      this.assignToPersonCombo = []; 
    } else {
      this.assetAssignee.assignedToEmpId = event.employeeId;
    }  
  }

}
