import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActioncodeCreateComponent } from 'src/app/Components/Dialog-Components/serviceRequestPopUp/actioncode-create/actioncode-create.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Attribute4Model } from 'src/app/Model/master/attribute4';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';



@Component({
  selector: 'app-actioncode-list',
  templateUrl: './actioncode-list.component.html',
  styleUrls: ['./actioncode-list.component.css']
})
export class ActioncodeListComponent implements OnInit {
  displayedColumns = ['select', 'attribute4Name', 'updatedBy','updatedDt','createdBy','createdDt'];
  actionCodedataSource = new MatTableDataSource<ActioncodeListComponent>();
  subLoaderActionCode: boolean = false;
  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;

  public attribute4Model : Attribute4Model;

  @ViewChild('searchSet') searchFocusSet : ElementRef;

    //PERMISSIONS 
    modelAccessModule: ModuleAccessModel;

   //For Pagination
   length: String = '0';     //set total record count here 
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page

   selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private userSession: UserSessionService) {
              this.attribute4Model = new Attribute4Model();
              this.pageSize = '100';
              this.pageIndex = '0';
              this.modelAccessModule=new ModuleAccessModel();
               }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ACTION_CODE'];
    this.attribute4Model.direction = 'desc';
    this.attribute4Model.columnName = 'updatedDt';
    this.pageIndex='0';
    this.fetchActioncodeList();
   }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }

  onSearchChange(searchValue : string ) {  
    this.attribute4Model.attribute4Name = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchActioncodeList();
  }

  dialogRef;
  openActioncodeCreate(element) {
    this.dialogRef = this.dialog.open(ActioncodeCreateComponent, {
      height: 'auto',
      width: '350px',
      data: {
        'attribute4Model' : element
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

 fetchActioncodeList(){
   this.actionCodedataSource=null;
  this.subLoaderActionCode = true;
  this.attribute4Model.pageNumber = Number(this.pageIndex);
  this.attribute4Model.recordsPerPage = Number(this.pageSize);
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllAttribute4,this.attribute4Model).subscribe(
    data => {
      if(data.success){
        this.subLoaderActionCode = false;
         this.length = data.responseData.dataTotalRecCount;
         this.actionCodedataSource = data.responseData.dataList;        
         } else {
           this.subLoaderActionCode = false;
         }
    }, error => {
      this.subLoaderActionCode = false;
    }

  );
 }

nextPage(pageNuber: number) {

}
getServerData(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.fetchActioncodeList();
}
getIndexValue(index: number): number {
  index = Number(this.pageSize) * Number(this.pageIndex) + index;
  return index;
}
customSort(event) {
  this.attribute4Model.pageNumber = 0;
  this.attribute4Model.columnName = event.active;
  this.attribute4Model.direction = event.direction;
  this.fetchActioncodeList();
}

selectActionCode(element){
  if(this.selectedItem.srAttributeId4 == element.srAttributeId4){
    this.selectedItem = 0;
  }else{
    this.selectedItem = element;
  }
}
}
