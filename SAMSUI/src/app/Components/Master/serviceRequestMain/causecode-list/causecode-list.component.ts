import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Attribute3Model } from 'src/app/Model/master/attribute3';
import { CausecodeCreateComponent } from 'src/app/Components/Dialog-Components/serviceRequestPopUp/causecode-create/causecode-create.component';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';


@Component({
  selector: 'app-causecode-list',
  templateUrl: './causecode-list.component.html',
  styleUrls: ['./causecode-list.component.css']
})
export class CausecodeListComponent implements OnInit {
  displayedColumns = ['select', 'attribute3Name', 'updatedBy', 'updatedDt', 'createdBy', 'createdDt'];
  causeCodedataSource = [];
  searchvalue: any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  subLoaderCauseCode: boolean = false;

  public attribute3Model: Attribute3Model;

  @ViewChild('searchSet') searchFocusSet: ElementRef;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zero
  pageSize: String;   // records per page

  selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService) {
    this.attribute3Model = new Attribute3Model();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule = new ModuleAccessModel();
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_CAUSE_CODE'];
    this.attribute3Model.direction = 'desc';
    this.attribute3Model.columnName = 'updatedDt';
    this.pageIndex = '0';
    this.fetchCauseCodeList();
  }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }

  onSearchChange(searchValue: string) {
    this.attribute3Model.attribute3Name = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchCauseCodeList();
  }

  dialogRef;

  openCausecodeCreate(element) {
    this.dialogRef = this.dialog.open(CausecodeCreateComponent, {
      height: 'auto',
      width: '350px',
      data: {
        'attribute3Model': element
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  ngOnDestroy() {
    if(this.dialogRef!=null){
        this.dialogRef.close();
    }
  }

  fetchCauseCodeList() {
    this.attribute3Model.pageNumber = Number(this.pageIndex);
    this.attribute3Model.recordsPerPage = Number(this.pageSize);
    this.causeCodedataSource = [];
    this.subLoaderCauseCode = true;
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllAttribute3, this.attribute3Model).subscribe(
      data => {
        if (data.success) {
          this.subLoaderCauseCode = false;
          this.length = data.responseData.dataTotalRecCount;
          this.causeCodedataSource = data.responseData.dataList;
        } else {
          this.subLoaderCauseCode = false;
        }
      }, error => {
        this.subLoaderCauseCode = false;
      }

    );
  }

  nextPage(pageNuber: number) {

  }
  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchCauseCodeList();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }
  customSort(event) {
    this.attribute3Model.pageNumber = 0;
    this.attribute3Model.columnName = event.active;
    this.attribute3Model.direction = event.direction;
    this.fetchCauseCodeList();
  }

  selectCauseCode(element){
    if(this.selectedItem.srAttributeId3 == element.srAttributeId3){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }
}
