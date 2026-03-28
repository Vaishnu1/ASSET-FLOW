import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {  MatDialog } from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NumberControlCreateComponent } from '../number-control-create/number-control-create.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { numberControlModel } from 'src/app/Model/base/numberControl';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup } from '@angular/forms';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';

@Component({
  selector: 'app-number-control-list',
  templateUrl: './number-control-list.component.html',
  styleUrls: ['./number-control-list.component.css']
})
export class NumberControlListComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = ['select', 'locationName', 'numberCtrlName', 'numberCtrlDesc', 'numberCtrlModuleDisp', 'prefixCd', 'suffixCd', 'lastNumber', 'maxNumber'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public numberControlModel: numberControlModel
  pageIndex: string;
  pageSize: string;
  subLoader: boolean = false;
  length: string = '0';
  tempViewData: any;
  searchValue: any = '';
  numberControlForm : FormGroup;
  modelAccessModule: ModuleAccessModel;

  selectedItem: any = 0;

  constructor(
    private location: Location,
    private readonly userSession: UserSessionService,
    private dialog: MatDialog,
    private commonService: CommonService,
    private samsService: AssetOptimaServices
  ) {
    this.numberControlModel = new numberControlModel();
    this.pageIndex = '0';
    this.pageSize = '100';
    this.modelAccessModule = new ModuleAccessModel();
  }

  ngOnInit() {
    
   this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_NUMBER_CONTROL'];
 
    this.numberControlModel.direction = 'desc';
    this.numberControlModel.columnName = 'updatedDt';
    this.fetchNumberControlData();
  }

  dialogRef;
  openNumberControlDialog(numberControl,mode) {    
    this.dialogRef = this.dialog.open(NumberControlCreateComponent, {
      height: '350px',
      width: '767px',
      data: {
        'numberControlModel': numberControl,
          'mode': mode
      }
    }
    );
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  ngOnDestroy() {
    if (this.dialogRef != null) {
      this.dialogRef.close();
    }
  }

  fetchNumberControlData() {
    this.numberControlModel.pageNumber = Number(this.pageIndex);
    this.numberControlModel.recordsPerPage = Number(this.pageSize)
    this.dataSource = [];
    this.subLoader = true;
    this.commonService.commonListService('fetchListOfAllNumberControl.sams', this.numberControlModel).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.dataSource = data.responseData.dataList;
          this.subLoader = false;
        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }
    );
  }

  viewNumberControlDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchNumberControlData();
  }

  onSearchChange(searchValue: string) {
    this.numberControlModel.numberCtrlName=searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchNumberControlData();
  }

  customSort(event) {
    this.numberControlModel.pageNumber = 0;
    this.numberControlModel.columnName=event.active;
    this.numberControlModel.direction=event.direction;
    this.fetchNumberControlData();
  }

  selectNumberControl(element){
    if(this.selectedItem.numberCtrlId == element.numberCtrlId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }
}
