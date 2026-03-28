import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UOMModel } from 'src/app/Model/base/uom';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UomCreateComponent } from '../uom-create/uom-create.component';

@Component({
  selector: 'app-uom-list',
  templateUrl: './uom-list.component.html',
  styleUrls: ['./uom-list.component.css']
})
export class UomListComponent implements OnInit {

  displayedColumns = ['select', 'sno', 'uomCode', 'updatedBy','updatedDt'];
  uomdataSource = [];
  subLoader: boolean = false;
  searchvalue : any = '';
  tempViewData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialogRef;
  public uom: UOMModel;

    //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  uomcreate;

  @ViewChild('setFocus') setSearchFocus: ElementRef;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  selectedItem: any=0;

  constructor(private dialog: MatDialog,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService) { 
                this.uom = new UOMModel();
                this.pageSize = '100';
                this.pageIndex = '0';
                this.modelAccessModule=new ModuleAccessModel();
              }


  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_UOM'];
    this.uom.direction = 'asc';
    this.uom.columnName = 'uomCode';
    this.pageIndex='0';
    this.fetchUOMList();
  }

  ngAfterViewInit() {
    this.setSearchFocus.nativeElement.focus();
  }

  ngOnDestroy() {
    if(this.uomcreate!=null){
      this.uomcreate.close();  
   }    
  }

  onSearchChange(searchValue : string ) {  
   this.uom.uomCode = searchValue;
   this.pageSize = '100';
   this.pageIndex = '0';
   this.fetchUOMList();
  }
  
  openuomviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  openUOMDialog(uom,mode) {
    this.uomcreate = this.dialog.open(UomCreateComponent, {
      height:'auto',
      width:'500px',
      data:{
        'uom' : uom,
        'mode':mode
      }
    });
    this.uomcreate.disableClose = true;
    this.uomcreate.afterClosed().subscribe(
     data => {
        this.ngOnInit();
     });
  }

  fetchUOMList(){
    this.subLoader = true;
    this.uom.pageNumber = Number(this.pageIndex);
    this.uom.recordsPerPage = Number(this.pageSize);
    this.uomdataSource = [];
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllUOM,this.uom).subscribe(
      data => {
        if(data.success){
          this.subLoader = false;
           this.length = data.responseData.dataTotalRecCount;
           this.uomdataSource = data.responseData.dataList;       
           } else {
             this.subLoader = false;
           }
      }, error => {
        this.subLoader = false;
      }
  
    );
   }
  

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchUOMList();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.uom.pageNumber = 0;
    this.uom.columnName = event.active;
    this.uom.direction = event.direction;
    this.fetchUOMList();
  }

  selectUOM(element){
    if(this.selectedItem.uomId == element.uomId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }

}

