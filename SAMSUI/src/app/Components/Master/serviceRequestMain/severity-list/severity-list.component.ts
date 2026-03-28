import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeverityCreateComponent } from 'src/app/Components/Dialog-Components/serviceRequestPopUp/severity-create/severity-create.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { SeverityModel } from 'src/app/Model/master/severity';
import { SubMenus } from 'src/app/Constants/SubMenusList';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-severity-list',
  templateUrl: './severity-list.component.html',
  styleUrls: ['./severity-list.component.css']
})
export class SeverityListComponent implements OnInit {
  displayedColumns = ['select', 'severityName', 'updatedBy','updatedDt','createdBy','createdDt'];
  severitydataSource = [];

  searchvalue : any = '';
  subLoaderSeverity: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;

  public SeverityModel : SeverityModel;

  @ViewChild('searchSet') searchFocusSet : ElementRef;

    //PERMISSIONS 
    modelAccessModule: ModuleAccessModel;


   //For Pagination
   length: String = '0';     //set total record count here 
   pageIndex: String;  //set page number starts with zeroo
   pageSizeSeverity: String;   // records per page

  selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private userSession: UserSessionService) {
        this.SeverityModel = new SeverityModel();
        this.pageSizeSeverity = '100';
        this.pageIndex = '0';
        this.modelAccessModule=new ModuleAccessModel();
               }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_SEVERITY'];
    this.SeverityModel.direction = 'desc';
    this.SeverityModel.columnName = 'updatedDt';
    this.pageIndex='0';
    this.fetchSeverityList();
  }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }

  onSearchChange(searchValue : string ) {  
    this.SeverityModel.severityName = searchValue;
    this.pageSizeSeverity = '100';
    this.pageIndex = '0';
    this.fetchSeverityList();
  }
  dialogRef;
  openSeverityCreate(element) {
    this.dialogRef = this.dialog.open(SeverityCreateComponent, {
      height: 'auto',
      width: '350px',
      data: {
        'SeverityModel' : element
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

  fetchSeverityList(){
  this.SeverityModel.pageNumber = Number(this.pageIndex);
  this.SeverityModel.recordsPerPage = Number(this.pageSizeSeverity);
  this.severitydataSource=[];
  this.subLoaderSeverity = true;
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllSeverity,this.SeverityModel).subscribe(
    data => {
      if(data.success) {
        this.subLoaderSeverity = false;
         this.length = data.responseData.dataTotalRecCount;
         this.severitydataSource = data.responseData.dataList;       
         } else {
           this.subLoaderSeverity = false;
         }
    }, error => {
      this.subLoaderSeverity = false;
    }

  );
 }


getServerData(event) {
  this.pageSizeSeverity = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.fetchSeverityList();
}
getIndexValue(index: number): number {
  index = Number(this.pageSizeSeverity) * Number(this.pageIndex) + index;
  return index;
}

customSort(event) {
  this.SeverityModel.pageNumber = 0;
  this.SeverityModel.columnName = event.active;
  this.SeverityModel.direction = event.direction;
  this.fetchSeverityList();
}

selectSeverity(element){
  if(this.selectedItem.severityId == element.severityId){
    this.selectedItem = 0;
  }else{
    this.selectedItem = element;
  }
}
}
