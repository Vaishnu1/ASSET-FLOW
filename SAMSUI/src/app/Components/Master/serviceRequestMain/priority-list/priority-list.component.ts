import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriorityCreateComponent } from 'src/app/Components/Dialog-Components/serviceRequestPopUp/priority-create/priority-create.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { PriorityModel } from 'src/app/Model/master/priority';
import { Title } from '@angular/platform-browser';
import { SubMenus } from 'src/app/Constants/SubMenusList';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.component.html',
  styleUrls: ['./priority-list.component.css']
})
export class PriorityListComponent implements OnInit {
  //Set Page Title
  title = 'Asset Optima - Service Master';
  Active_Tab = 'work_order_view';
  subLoaderPriority: boolean = false;
  displayedColumns = ['select', 'priorityName',  'updatedBy', 'updatedDt', 'createdBy', 'createdDt'];
  prioritydataSource = [];

  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator; // Set Pagination
  @ViewChild(MatSort) sort: MatSort;   // Sorting based on columns
  tempViewData: any;
  @ViewChild('searchSet') searchFocusSet : ElementRef;


  public PriorityModel : PriorityModel;

   //For Pagination
   length: String = '0';     //set total record count here 
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page

     //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private titleService: Title,
              private userSession: UserSessionService) {
        this.PriorityModel = new PriorityModel();
        this.pageSize = '100';
        this.pageIndex = '0';
        this.modelAccessModule=new ModuleAccessModel();
               }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_PRIORITY'];
    this.titleService.setTitle(this.title);
    this.PriorityModel.direction = 'desc';
    this.PriorityModel.columnName = 'updatedDt';
    this.pageIndex='0';
    this.fetchPriorityList();
  }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }

  onSearchChange(searchValue : string ) {  
    this.PriorityModel.priorityName = searchValue;
    this.pageSize='100';
    this.pageIndex='0';
    this.fetchPriorityList();
  }
  dialogRef;
  openPriorityCreate(element) {
    this.dialogRef = this.dialog.open(PriorityCreateComponent, {
      height: 'auto',
      width: '350px',
      data: {
        'PriorityModel' : element
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

 fetchPriorityList(){
  this.PriorityModel.pageNumber = Number(this.pageIndex);
  this.PriorityModel.recordsPerPage = Number(this.pageSize); 
  this.prioritydataSource=[];
  this.subLoaderPriority = true;
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllPriority,this.PriorityModel).subscribe(
    data => {
      if(data.success){
        this.subLoaderPriority = false;
         this.length = data.responseData.dataTotalRecCount;
         this.prioritydataSource = data.responseData.dataList;      
         } else {
           this.subLoaderPriority = false;
         }
    }, error => {
      this.subLoaderPriority = false;
    }
  );
 }

nextPage(pageNuber: number) {

}
getServerData(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.fetchPriorityList();
}
getIndexValue(index: number): number {
  index = Number(this.pageSize) * Number(this.pageIndex) + index;
  return index;
}

customSort(event) {
  this.PriorityModel.pageNumber = 0;
  this.PriorityModel.columnName = event.active;
  this.PriorityModel.direction = event.direction;
  this.fetchPriorityList();
}
Active_Tab_Change(name) {
  this.Active_Tab = name;
}

selectPriority(element){
  if(this.selectedItem.priorityId == element.priorityId){
    this.selectedItem = 0;
  }else{
    this.selectedItem = element;
  }
}


}
