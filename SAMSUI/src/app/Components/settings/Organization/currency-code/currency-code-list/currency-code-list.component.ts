import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource,} from '@angular/material/table';
import { MatSort, } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyModel } from 'src/app/Model/base/currency';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CurrencyCodeCreateComponent } from '../currency-code-create/currency-code-create.component';

@Component({
  selector: 'app-currency-code-list',
  templateUrl: './currency-code-list.component.html',
  styleUrls: ['./currency-code-list.component.css']
})
export class CurrencyCodeListComponent implements OnInit {

  displayedColumns = ['select', 'sno', 'curCd', 'curName','countryName', 'updatedBy','updatedDt'];
  currencyCodedataSource = [];
  subloader: boolean = false;
  dialogRef;

  searchvalue : any = '';
  tempViewData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public currencyModel : CurrencyModel;

   //For Pagination
   length: String = '0';     //set total record count here 
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page

   @ViewChild('setFocus') setSerachFocus: ElementRef;
 
  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  selectedItem: any=0;

  constructor(private dialog: MatDialog,
              private router: Router,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService) {
      this.currencyModel = new CurrencyModel();
      this.pageSize = '100';
      this.pageIndex = '0';
      this.modelAccessModule=new ModuleAccessModel();
               }


  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_CURRENCY_CODE'];

    this.currencyModel.direction = 'asc';
    this.currencyModel.columnName = 'curName';
    this.pageIndex='0';
    this.fetchListofItemType();
  }

  ngAfterViewInit() {
    this.setSerachFocus.nativeElement.focus();
  }

  ngOnDestroy() {
    if(this.dialogRef!=null){
      this.dialogRef.close();  
   }  
  }
  
  onSearchChange(searchValue : string ) {  
    this.currencyModel.curCd=searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofItemType();
  }
  openCurrencyCreateDialog(currencyCode,mode) {
     this.dialogRef = this.dialog.open(CurrencyCodeCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'currencyCode' : currencyCode,
        'mode':mode
      }
    });
     this.dialogRef.disableClose = true;
     this.dialogRef.afterClosed().subscribe(
      data => {
          this.ngOnInit();
      });
  }
  opendCurrencyViewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  fetchListofItemType(){
    this.subloader = true;
    this.currencyModel.pageNumber = Number(this.pageIndex);
    this.currencyModel.recordsPerPage = Number(this.pageSize);
    this.currencyCodedataSource = [];
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllCurrency,this.currencyModel).subscribe(
      data => {
        if(data.success){
          this.subloader = false;
           this.length = data.responseData.dataTotalRecCount;
           this.currencyCodedataSource = data.responseData.dataList;       
           } else { 
             this.subloader = false;
           }
      }, error => {
        this.subloader = false;
      }
      );
   
  }

  nextPage(pageNuber: number) {

  }
  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofItemType();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.currencyModel.pageNumber = 0;
    this.currencyModel.columnName = event.active;
    this.currencyModel.direction = event.direction;
    this.fetchListofItemType();
  }

  selectCurrencyCode(element){
    if(this.selectedItem.curId == element.curId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }
}
