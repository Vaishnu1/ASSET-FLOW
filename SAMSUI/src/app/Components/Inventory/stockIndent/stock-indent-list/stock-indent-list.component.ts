import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StockIndentModel } from 'src/app/Model/inventory/stockIndent';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { allPreInwardStatus, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { CancelConfirmationComponent } from 'src/app/Components/Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-stock-indent-list',
  templateUrl: './stock-indent-list.component.html',
  styleUrls: ['./stock-indent-list.component.css']
})
export class StockIndentListComponent implements OnInit {

  defaultColumns = ['select', 'sno', 'locationName', 'indentNo', 'indentDt', 'requestedBy', 'requestedDt', 'indentStatus', 'indentApprovalStatus', 'totalIndentValue', 'srNo'];
  displayedColumns = [...this.defaultColumns];

  stockIndentMainDataSource = [];

  subLoaderStockIndentMain: boolean = false;
  scrollsyncPersonIncharge: boolean = false;
  enableActionBtn: boolean = true;
  selectAllIndent: boolean = false;

  scrollSRNosync: boolean = false;

  personInchargeCombo = [];
  srNoCombo = [];
  indentStatus = ['BOOKED', 'APPROVED', 'PARTIALLY APPROVED'];


  limitCount: any;

  personInchargePageNumber: number;

  srNoPageNumber: number;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public stockIndentModel: StockIndentModel;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  scrollContractTypeSync: Boolean = false;
  contractTypePageNumber: number = 0;
  contractTypeList: any = [];
  getData: getData;

  scrollLocationNamesync: boolean = false;
  locationCombo: any = [];
  locationNamePageNumber: number;

  selectedItem: any = 0;
  approve: any;
  employeeId: any;
  status: string;
  enableActionBtnForCancel:boolean = true;
  indentNumberCancel:string;
  indenthdrIdCancel: number;

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  constructor(private commonService: CommonService,
    public router: Router,
    private readonly dialog: MatDialog,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService,
    private samsService: AssetOptimaServices,) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.stockIndentModel = new StockIndentModel();
    this.personInchargePageNumber = 1;
    this.contractTypePageNumber = 1;
    this.srNoPageNumber = 1;
    this.locationNamePageNumber = 1;
    this.modelAccessModule = new ModuleAccessModel();
    this.getData = new getData();

    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();

  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofStockIndent();
  }


  customSort(event) {
    this.stockIndentModel.pageNumber = 0;
    this.stockIndentModel.columnName = event.active;
    this.stockIndentModel.direction = event.direction;
    this.fetchListofStockIndent();
  }

  ngOnInit() {
    this.employeeId = this.userSession.getUserEmpId();
    this.selectedIndentList = [];
    this.enableActionBtn = true;
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_STOCK_INDENT'];
    this.personInchargePageNumber = 1;
    this.stockIndentModel.direction = 'desc';
    this.stockIndentModel.columnName = 'indentNo'
    this.stockIndentModel.locationId = this.userSession.getUserLocationId();
    this.stockIndentModel.locationName = this.userSession.getUserLocationName();
    this.locationNamePageNumber = 1;
    // this.fetchListofStockIndent();

    this.stockIndentModel.direction = 'desc';
    this.stockIndentModel.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_ASSET_RETIREMENT';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListofStockIndent();

    })
  }

  fetchListofStockIndent() {
    this.subLoaderStockIndentMain = true;
    this.stockIndentModel.pageNumber = Number(this.pageIndex);
    this.stockIndentModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService('fetchListOfAllStockIndentDetails.sams', this.stockIndentModel).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.stockIndentMainDataSource = data.responseData.dataList;
        }
      }
    );
    this.subLoaderStockIndentMain = false;
  }

  createStockIndent(mode?: string) {
    if (mode !== 'add') {
      this.router.navigate(['home/inventory/stockIndentCreate/' + this.selectedIndentList[0].indentHdrId + '/' + mode]);
    } else {
      this.router.navigate(['home/inventory/stockIndentCreate/' + 0 + '/' + mode]);
    }
  }

  loadPersonInchargeComboData(searchValue) {
    this.scrollsyncPersonIncharge = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '', this.limitCount, this.personInchargePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.personInchargePageNumber, this.personInchargeCombo, data.responseData.comboList)
        this.personInchargePageNumber = this.getData.pageNumber;
        this.personInchargeCombo = this.getData.dataList;
        this.scrollsyncPersonIncharge = false;
      }
    );
  }

  selectedPersonInchargeData(event) {
    if (event === undefined) {
      this.stockIndentModel.requestedById = 0;
      this.stockIndentModel.requestedBy = '';
      this.personInchargePageNumber = 1;
    } else {
      this.stockIndentModel.requestedById = event.employeeId;
      this.stockIndentModel.requestedBy = event.employeeFirstName;
    }
  }

  setIndentStatus(indentStatus) {
    this.stockIndentModel.indentStatus = indentStatus;
  }

  searchStockIndent() {
    if (this.stockIndentModel.requestedDtDisp != null) {
      this.stockIndentModel.requestedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.stockIndentModel.requestedDtDisp);
    }
    if (this.stockIndentModel.indentDtDisp != null) {
      this.stockIndentModel.indentDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.stockIndentModel.indentDtDisp);
    }
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofStockIndent();
    this.selectedItem = 0;
  }
  clear() {
    this.stockIndentModel = new StockIndentModel;
    this.ngOnInit();
    this.stockIndentModel.locationId = this.userSession.getUserLocationId();
    this.stockIndentModel.locationName = this.userSession.getUserLocationName();
    this.selectedItem = 0;
  }
  //To export report
  generateReport() {
    this.stockIndentModel.recordsPerPage = 0;
    this.commonService.commonListService('reports/assets/generateStockIndentReport.sams', this.stockIndentModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  loadServiceRequestNumbers(searchValue) {
    this.scrollSRNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllSRNoForCombo, searchValue.term, '', '', this.limitCount, this.srNoPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.srNoPageNumber, this.srNoCombo, data.responseData.comboList)
        this.srNoPageNumber = this.getData.pageNumber;
        this.srNoCombo = this.getData.dataList;
        this.scrollSRNosync = false;
      }
    );
  }

  selectedSRNo(event) {
    if (event === undefined) {
      this.stockIndentModel.srNo = '';
      this.srNoPageNumber = 1;
    } else {
      this.stockIndentModel.srNo = event.srNo;
    }
  }

  approveStockIndent(event) {
    this.commonService.showSpinner();
    this.commonService.commonGetService('approveStockIndent.sams', event.indentHdrId).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
    this.commonService.hideSpinner();
    this.fetchListofStockIndent();
  }

  generateStockIndentPDF() {
    this.commonService.showSpinner();
    this.commonService.commonGetService('generateStockIndentPdf.sams', this.selectedIndentList[0].indentHdrId).subscribe(
      data => {
        if (data.success) {
          console.log('Response Data', data.responseData);
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
        }
      }, error => {
      }
    );
    this.commonService.hideSpinner();
  }

  downloadDocument(filePath: string, contentType) {
    this.commonService.showSpinner();
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        this.commonService.showDownloadPopUpPDF(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
    this.commonService.hideSpinner();
  }

  listOfContractType(searchValue) {
    this.scrollContractTypeSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllContractTypeCombo.sams', searchValue.term, '', '', this.limitCount, this.contractTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.contractTypePageNumber, this.contractTypeList, data.responseData.comboList)
        this.contractTypePageNumber = this.getData.pageNumber;
        this.contractTypeList = this.getData.dataList;
        this.scrollContractTypeSync = false;
      }
    );
  }

  setContractType(event) {
    if (event === undefined) {
      this.stockIndentModel.contractType = '';
      this.contractTypePageNumber = 1;
    } else {
      this.stockIndentModel.contractType = event.contractTypeName;
    }
  }

  selectedIndentList = [];
  selectStockIndent(element) {
    this.indenthdrIdCancel = element.indentHdrId;
    this.indentNumberCancel = element.indentNo;
    const indentId = this.selectedIndentList.findIndex(data => data.indentHdrId === element.indentHdrId);

    this.enableActionBtn = false;
    this.enableActionBtnForCancel = true;
    if (indentId === -1) {
      this.selectedIndentList = [element];
    } else {
      this.selectedIndentList.splice(indentId, 1);
    }
    if(element.indentStatus == 'BOOKED'){
      this.enableActionBtnForCancel = false;
    }

    if (this.selectedIndentList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
      this.enableActionBtnForCancel = true;
    }
  }

  selectAllIndents(event) {
    this.selectAllIndent = event.checked;
    this.enableActionBtn = false;

    if (event.checked) {
      this.selectedIndentList = this.stockIndentMainDataSource;
    }
    else {
      this.selectedIndentList = [];
    }

    if (this.selectedIndentList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
    }
  }

  checkApprovalValid() {
    if (this.selectedIndentList.length > 0) {
      return !(this.selectedIndentList.findIndex(data => data.indentStatus !== "BOOKED") === -1);
    }
    else
      return true;
  }

  compareValue(element: any): boolean {
    return this.selectedIndentList.findIndex(data => data.indentHdrId === element.indentHdrId) !== -1;
  }

  confirmStockIndentApprove() {
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
        if (data.status) {
          this.status = 'PARTIALLY APPROVED';
          this.indentValidateAndStatusUpdate(this.status);
        }
      });
  }

  indentValidateAndStatusUpdate(status) {
    let indentHdrIdList = { selectedIndentList: [], status: status, selectedApprovalList: [] };
    for (let i = 0; i <= this.selectedIndentList.length - 1; i++) {
      indentHdrIdList.selectedIndentList.push(this.selectedIndentList[i].indentHdrId);
      indentHdrIdList.selectedApprovalList.push(this.selectedIndentList[i].approvalId);
    }
    this.commonService.commonInsertService(this.assetOptimaServices.indentValidateAndStatusUpdate, indentHdrIdList).subscribe(
      data => {
        if (data.success) {
          this.ngOnInit();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      });
  }

  rejectStockIndentApprove() {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
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
          this.status = 'REJECTED';
          this.indentValidateAndStatusUpdate(this.status);
        }
      });
  }
  

  listofLocationName(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber, this.locationCombo, data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNamesync = false;
      }
    );
  }

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.stockIndentModel.locationId = 0;
      this.stockIndentModel.locationName = '';
      this.locationNamePageNumber = 1;
    } else {
      this.stockIndentModel.locationId = event.locationId;
      this.stockIndentModel.locationName = event.locationName;
    }
  }

  stockIndentCancel() {
    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Indent No : '+this.indentNumberCancel
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonGetService('updateStockIndentStatus.sams', this.indenthdrIdCancel, 'CANCELLED').subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListofStockIndent();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
          // }
        }
      });
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index >= 0) {
      this.displayedColumns.splice(index, 1); // Column is selected, remove it
    } else {
      this.displayedColumns.push(column); // Column is not selected, add it
    }
  }
  
  editManageColumns() {
    this.showManageColumns = !this.showManageColumns;
  }
  
  applyPreferredColumns() {
    //SAVE TO USER PREFERENCE TABLE
    this.showManageColumns = !this.showManageColumns
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
          this.getUserPreferenceInfo();
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
    
  }
  
  resetPreferredColumns() {
    this.displayedColumns = [...this.defaultColumns];
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
  }
  
  getUserPreferenceInfo() {
    let userPreferenceInfo = new Promise((resolve) => {
      this.commonService.commonInsertService(this.samsService.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.stockIndentModel = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.stockIndentModel);
    this.commonService.commonInsertService(this.samsService.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
          this.getUserPreferenceInfo()
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
  }

}
