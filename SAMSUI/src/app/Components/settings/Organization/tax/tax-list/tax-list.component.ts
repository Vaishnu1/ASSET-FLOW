import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { taxModel } from 'src/app/Model/base/tax';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { TaxCreateComponent } from '../tax-create/tax-create.component';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.css']
})
export class TaxListComponent implements OnInit {
  displayedColumns = ['select', 'sno', 'taxCode', 'taxComputation','taxRate','updatedBy','updatedDt'];
  taxdataSource =[];
  subloader: boolean = false;
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  searchvalue : any = '';
  tempViewData: any;
  public taxModel: taxModel;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('setFocus') setSearchFocus: ElementRef;

  
  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  selectedItem: any=0;

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService
  ) {
    this.pageSize = '100';  // initial page size
    this.pageIndex = '0'; // initial page index
    this.taxModel = new taxModel();
    this.modelAccessModule=new ModuleAccessModel();
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_TAX'];
    this.taxModel.direction = 'asc';
    this.taxModel.columnName = 'taxCode';
    this.pageIndex='0';
    this.fetchTaxList();
  }

  ngAfterViewInit() {
    this.setSearchFocus.nativeElement.focus();
  }
  onSearchChange(searchValue : string ) {  
    this.taxModel.taxCode = searchValue;
    this.pageSize = '100';
     this.pageIndex = '0';
    this.fetchTaxList();
  }
  dialogRef;

  openDialog(value,mode) {
   this.dialogRef = this.dialog.open(TaxCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        '_data' : value,
        'mode':mode
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
  openViewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }
 

  fetchTaxList(){
    this.subloader = true;
    this.taxModel.pageNumber = Number(this.pageIndex);
    this.taxModel.recordsPerPage = Number(this.pageSize);
    this.taxdataSource =[];
    this.commonService.commonListService(this.assetOptimaServices.listOfTax,this.taxModel).subscribe(
      data => {
        if(data.success){
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.taxdataSource = data.responseData.dataList;
        } else {
          this.subloader = false;
        }
      }, error => {
        this.subloader = false;
      }
    );
  
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchTaxList();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event){
    this.taxModel.pageNumber = 0;
    this.taxModel.columnName = event.active;
    this.taxModel.direction = event.direction;
    this.fetchTaxList();
  }

  selectTax(element){
    if(this.selectedItem.taxId == element.taxId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }
}
