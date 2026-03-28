import {Component, OnInit, TemplateRef, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Region } from 'src/app/Model/base/region';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { RegionCreateComponent } from '../region-create/region-create.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit,OnDestroy {
  displayedColumns = ['select', 'sno', 'regionCode', 'regionName', 'updatedBy','updatedDt'];
  regiondataSource = [];

  searchvalue : any = '';
  tempViewData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subLoader: boolean = false;
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  public region : Region;
  sanitizedUserManualUrl: SafeResourceUrl;
  
  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  selectedItem: any=0;

  constructor(private dialog: MatDialog,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService,
              private sanitizer: DomSanitizer) { 
    this.region = new Region();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule=new ModuleAccessModel();

    const userManualUrl = 'assets/help_user_manual/help/index.html#/settings/master?id=region';
    this.sanitizedUserManualUrl = this.sanitizer.bypassSecurityTrustResourceUrl(userManualUrl);
  }
  @ViewChild('setFocus') setSearchFocus: ElementRef;


  ngOnInit() {
    localStorage.setItem('helpManual','settings/master?id=region');
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_REGION'];
    this.region.direction = 'asc';
    this.region.columnName = 'regionName';
    this.pageIndex='0';
    this.fetchRegionList();
  }

  ngAfterViewInit() {
    this.setSearchFocus.nativeElement.focus();
  }

  onSearchChange(searchValue : string ) { 
    this.region.regionName =  searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchRegionList();
  }
  dialogRef;
  openRegionCreateDialog(region,mode) {
    this.dialogRef = this.dialog.open(RegionCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'region': region,
        'mode': mode
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

  // openregiondialog(templateRef: any, event, _index) {
  //   this.tempViewData = event;
  //   this.dialog.open(templateRef);
  // }


 fetchRegionList(){
  this.subLoader = true;
  this.region.pageNumber = Number(this.pageIndex);
  this.region.recordsPerPage = Number(this.pageSize);
  this.regiondataSource = [];
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllRegion,this.region).subscribe(
    data => {
      if(data.success){
        this.subLoader = false;
         this.length = data.responseData.dataTotalRecCount;
         this.regiondataSource = data.responseData.dataList;       
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
  this.fetchRegionList();
}
getIndexValue(index: number): number {
  index = Number(this.pageSize) * Number(this.pageIndex) + index;
  return index;
}


customSort(event) {
  this.region.pageNumber = 0;
  this.region.columnName = event.active;
  this.region.direction = event.direction;
  this.fetchRegionList();
}

selectRegion(element){
  if(this.selectedItem.regionId == element.regionId){
    this.selectedItem = 0;
  }
  else{
    this.selectedItem = element;
  }
}

userManual(){
  const sidenav = document.getElementById("mySidenav");
  sidenav.style.marginTop  = "50px";
  sidenav.style.width = "30%";
  sidenav.style.height  = "95%";
}

closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

}
