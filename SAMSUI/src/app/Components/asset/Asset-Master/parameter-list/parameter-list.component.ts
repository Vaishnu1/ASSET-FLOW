import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ParameterModel } from 'src/app/Model/master/parameter';
import { ParameterCreateComponent } from '../parameter-create/parameter-create.component';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.css']
})
export class ParameterListComponent implements OnInit {
  displayedColumns = ['select', 'sNo', 'parameterName', 'parameterTypeTO.parameterTypeName', 'parameterGroupTO.parameterGroupName', 'updatedBy', 'updatedDt'];

  parameterdataSource = [];

  searchvalue: any = '';
  subLoaderParameter: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;

  public ParameterModel: ParameterModel;

  @ViewChild('searchSet') searchFocusSet: ElementRef;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;


  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSizeParameter: String;   // records per page
  selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService) {
    this.ParameterModel = new ParameterModel();
    this.pageSizeParameter = '100';
    this.pageIndex = '0';
    this.modelAccessModule = new ModuleAccessModel();
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_PARAMETER'];
    this.ParameterModel.direction = 'desc';
    this.ParameterModel.columnName = 'updatedDt';
    this.pageIndex = '0';
    this.fetchParameterList();
  }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }

  onSearchChange(searchValue: string) {
    this.ParameterModel.parameterName = searchValue;
    this.pageSizeParameter = '100';
    this.pageIndex = '0';
    this.fetchParameterList();
  }
  dialogRef;
  openParameterCreate(element, mode) {
    this.dialogRef = this.dialog.open(ParameterCreateComponent, {
      height: 'auto',
      width: '900px',
      data: {
        'ParameterModel': element,
        'mode': mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
        this.selectedItem = [];
      });
  }

  // ngOnDestroy() {
  //   if(this.dialogRef!==null){
  //       this.dialogRef.close();
  //   }
  // }

  fetchParameterList() {
    this.ParameterModel.pageNumber = Number(this.pageIndex);
    this.ParameterModel.recordsPerPage = Number(this.pageSizeParameter);
    this.parameterdataSource = [];
    this.subLoaderParameter = true;
    this.commonService.commonListService('fetchListOfAllParameter.sams', this.ParameterModel).subscribe(
      data => {
        if (data.success) {
          this.subLoaderParameter = false;
          this.length = data.responseData.dataTotalRecCount;
          this.parameterdataSource = data.responseData.dataList;
        } else {
          this.subLoaderParameter = false;
        }
      }, error => {
        this.subLoaderParameter = false;
      }

    );
  }


  getServerData(event) {
    this.pageSizeParameter = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchParameterList();
  }

  customSort(event) {
    this.ParameterModel.pageNumber = 0;
    this.ParameterModel.columnName = event.active;
    this.ParameterModel.direction = event.direction;
    this.fetchParameterList();
  }

  selectParameter(element) {
    if (this.selectedItem.parameterId == element.parameterId) {
      this.selectedItem = 0;
    }
    else {
      this.selectedItem = element;
    }
  }

  generateReportForServiceParam() {
    this.ParameterModel.recordsPerPage = 0;
    this.commonService.commonListService('generateServiceParamReport.sams', this.ParameterModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
  }

}
