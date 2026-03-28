import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ServiceRequestCreateComponent } from '../service-request-create/service-request-create.component';
import { MatDialog} from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';
import {  MatPaginator } from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Title } from '@angular/platform-browser';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';
import { FormControl } from '@angular/forms';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-service-request-list-qa',
  templateUrl: './service-request-list-qa.component.html',
  styleUrls: ['./service-request-list-qa.component.css']
})
export class ServiceRequestListQaComponent implements OnInit,OnDestroy {
//set page title
title = 'Asset Optima - Quality Assurance Service Request';
displayedColumns = ['sno', 'locationName', 'srNo', 'createdDt', 'assetCode','assetGroupName','functionality','srStatus',
                      'assignedTo','updatedBy','updatedDt','action'];   
                        
serviceRequestModel: ServiceRequestModel;

dataSource = [];
//LOADER
subloader: boolean = false;  

@ViewChild('searchSrNo') searchSrNoFocus : ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchvalue : any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');
  moduleAccessModel:ModuleAccessModel;

  //COMBO
  locationCombo: any = [];
  assetCategoryName : any = [];
  subCategoryName: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  assetStatusCombo: any = [];

  locationPageNumber:number;
  assetGroupPageNumber:number;
  modelComboPageNumber:number;
  assetCategoryPageNumber:number;
  assetSubCategorPageNumber:number;
  asssetStatusPageNumber:number;

  scrollsyncLocation:boolean=false;
  scrollsyncAssetGroup:boolean=false;
  scrollsyncModel:boolean=false;
  scrollsyncAssetStatus:boolean=false;
  scrollsyncAssetCategory:boolean=false;
  scrollsyncAssetSubCategory:boolean=false;
  recordsPerPageForCombo:string;

    //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page


constructor(private router: Router, private dialog: MatDialog,
            private commonService:CommonService,
            private titleService: Title,
            private assetConstants: AssetOptimaConstants,
            private userSessionService: UserSessionService,
            private activatedRoute: ActivatedRoute) {
    this.serviceRequestModel = new ServiceRequestModel();
    this.moduleAccessModel=new ModuleAccessModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationPageNumber = 1; 
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.asssetStatusPageNumber = 1;
   }

ngOnInit() {
  this.titleService.setTitle(this.title);
  this.serviceRequestModel.locationName=this.assetConstants.defaultuserLocName; 
  this.serviceRequestModel.locationId=this.assetConstants.defaultuserLocId; 
  this.serviceRequestModel.direction = 'desc';
  this.serviceRequestModel.columnName = 'updatedDt';
  this.fetchList();
  //this.moduleAccessModel=this.userSessionService.getUserGroupAccess()['QUALITY ASSURANCE'];
}

ngAfterContentInit() {
  //this.searchSrNoFocus.nativeElement.focus();
}

dialogRef;

createService(srType){
  let dialogRef = this.dialog.open(ServiceRequestCreateComponent, {
    height: '600px',
    width: '900px',
    data: {
      'srType':srType
    }
  });
   dialogRef.disableClose = true;
   dialogRef.afterClosed().subscribe(
    data => {
      this.ngOnInit(); 
    }); 
  }

  ngOnDestroy(){ 
    if(this.dialogRef!=null){
      this.dialogRef.close();
    }
  }

 

onSearchChange(searchValue : string ) {  
  this.searchvalue = searchValue;
  this.serviceRequestModel.srNo = searchValue;
  this.pageSize='100';
  this.pageIndex='0';
  this.fetchList();
}

searchSR() {
  this.pageSize = '100';
  this.pageIndex = '0';
  this.fetchList();
}

fetchList(){
  this.serviceRequestModel.pageNumber = Number(this.pageIndex);
  this.serviceRequestModel.recordsPerPage = Number(this.pageSize);
  this.activatedRoute.params.subscribe(
    params => {
      var srType = params.type;
      if(srType != '' && srType != undefined){
        this.serviceRequestModel.srType=srType;
        this.serviceRequestModel.srStatus=params.status;
        this.serviceRequestModel.functionality=params.functionality;
      }
    }
  );
  //this.serviceRequestModel.defaultLocId = this.assetConstants.userLocId;
  this.serviceRequestModel.srType='QA';
  this.dataSource = [];
  this.subloader = true;
  this.commonService.commonListService('fetchListOfServiceRequest.sams',this.serviceRequestModel).subscribe(
    data => {
      if(data.success){
         this.dataSource = data.responseData.dataList;
         this.length = data.responseData.dataTotalRecCount;
         this.subloader = false;
           }else {
            this.subloader = false;
        }
    }

  );
 }

 viewServiceRequestDtl(srId,mode){
  this.router.navigate(['home/serviceRequest/serviceView/'+srId + '/' +mode]);
}

getIndexValue(index: number): number {
  index = Number(this.pageSize) * Number(this.pageIndex) + index;
  return index;
}

getServerData(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.fetchList();
}
customSort(event) {
  this.serviceRequestModel.pageNumber = 0;
  this.serviceRequestModel.columnName = event.active;
  this.serviceRequestModel.direction = event.direction;
  this.fetchList();
}

loadLocationComboData(searchValue) {
  this.scrollsyncLocation=true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listAllUserLocForCombo.sams',searchValue.term,'','',
          this.recordsPerPageForCombo,this.locationPageNumber).subscribe(
    (data)=>{
      if (!(this.commonService.fetchSearchValue(searchValue))) {
        if(this.locationPageNumber=== 1){
          this.locationCombo = data.responseData.comboList;
        }else{
          this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
        }
      } else {
        this.locationCombo = data.responseData.comboList;
      }
      data.responseData.comboList.length != 0 ? this.locationPageNumber += 1 : this.locationPageNumber = 1;  
   }
  );
  this.scrollsyncLocation=false;
}

selectedLocationData(event) {
  if(event===undefined){
    this.serviceRequestModel.locationName='';    
    this.serviceRequestModel.locationId=0;
    this.locationPageNumber=1;
    this.locationCombo=[];
  }else{
    this.serviceRequestModel.locationName=event.locDisplayField;
    this.serviceRequestModel.locationId=event.locationId;
  }
}    

listOfCategory(searchValue) {
  this.scrollsyncAssetCategory = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listAllAssetCategoryCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCategoryPageNumber).subscribe(
    (data) => {
      if (!(this.commonService.fetchSearchValue(searchValue))) {
        if (this.assetCategoryPageNumber === 1) {
          this.assetCategoryName = data.responseData.comboList;
        } else {
          this.assetCategoryName = this.assetCategoryName.concat(data.responseData.comboList);
        }
      } else {
        this.assetCategoryName = data.responseData.comboList;
      }
      data.responseData.comboList.length != 0 ? this.assetCategoryPageNumber += 1 : this.assetCategoryPageNumber = 1;
    }
  );
  this.scrollsyncAssetCategory = false;
}
getCategoryComboValue(event) {
  if (event === undefined) {
    this.serviceRequestModel.assetCategoryId=0;
    this.serviceRequestModel.assetCategoryName=''; 
    this.assetCategoryPageNumber = 1;
    this.assetCategoryName = [];
  } else {
    this.serviceRequestModel.assetCategoryId=event.assetCategoryId;
    this.serviceRequestModel.assetCategoryName=event.assetCategoryName;
  }
}

listOfSubCategory(searchValue) {
  this.scrollsyncAssetSubCategory = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, this.serviceRequestModel.assetCategoryId,
    '', this.recordsPerPageForCombo, this.assetSubCategorPageNumber).subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.assetSubCategorPageNumber === 1) {
            this.subCategoryName = data.responseData.comboList;
          } else {
            this.subCategoryName = this.subCategoryName.concat(data.responseData.comboList);
          }
        } else {
          this.subCategoryName = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.assetSubCategorPageNumber += 1 : this.assetSubCategorPageNumber = 1;
      }
    );
  this.scrollsyncAssetSubCategory = false;
}
getSubCategoryComboValue(event) {
  if (event === undefined) {
    this.serviceRequestModel.subCategoryId=0;
    this.serviceRequestModel.subCategoryName='';
    this.assetSubCategorPageNumber = 1;
    this.subCategoryName = [];
  } else {
    this.serviceRequestModel.subCategoryId=event.subCategoryId;
    this.serviceRequestModel.subCategoryName=event.subCategoryName;
  }

}

listOfAllAssetGroup(searchKey) {
  this.scrollsyncAssetGroup=true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
  this.commonService.getComboResults('listAllAssetGroupCombo.sams', searchKey.term, this.serviceRequestModel.subCategoryId, '',
                                     this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
  (data) => {
    if (!(this.commonService.fetchSearchValue(searchKey))) {
      if(this.assetGroupPageNumber=== 1){
        this.assetGroup = data.responseData.comboList;
      }else{
        this.assetGroup = this.assetGroup.concat(data.responseData.comboList);
      }
    } else {
      this.assetGroup = data.responseData.comboList;
    }
    data.responseData.comboList.length != 0 ? this.assetGroupPageNumber += 1 : this.assetGroupPageNumber = 1;     
  });
  this.scrollsyncAssetGroup=false;
}

getAssetGroupComboValue(event) {
  if (event != null) {
    this.serviceRequestModel.assetGroupName=event.assetGroupName;
    this.serviceRequestModel.assetGroupId=event.assetGroupId;
    
  }else{
    this.serviceRequestModel.assetGroupName="";
    this.serviceRequestModel.assetGroupId=0;
    this.assetGroup=[];
    this.assetGroupPageNumber=1;
  }
}

listOfAllModel(searchKey) {
  this.scrollsyncModel=true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
  this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', 
                 this.serviceRequestModel.assetGroupId > 0 ? this.serviceRequestModel.assetGroupId : '',
                                     this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
  (data) => {
    if (!(this.commonService.fetchSearchValue(searchKey))) {
      if(this.modelComboPageNumber=== 1){
        this.modelCombo = data.responseData.comboList;
      }else{
        this.modelCombo = this.modelCombo.concat(data.responseData.comboList);
      }
    } else {
      this.modelCombo = data.responseData.comboList;
    }
    data.responseData.comboList.length != 0 ? this.modelComboPageNumber += 1 : this.modelComboPageNumber = 1;     
  });
  this.scrollsyncModel=false;
}

getModelComboValue(event) {
  if (event != null) {
    this.serviceRequestModel.modelId=event.modelId;
    this.serviceRequestModel.modelName=event.modelName;
  }else{  
    this.serviceRequestModel.modelId=0;
    this.serviceRequestModel.modelName='';
    this.modelCombo=[];
    this.modelComboPageNumber=1;
  }
}

loadAssetStatusComboData(searchValue) {
  this.scrollsyncAssetStatus=true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listAllAssetStatusCombo.sams',searchValue.term,'','',
          this.recordsPerPageForCombo,this.asssetStatusPageNumber).subscribe(
    (data)=>{
      if (!(this.commonService.fetchSearchValue(searchValue))) {
        if(this.asssetStatusPageNumber=== 1){
          this.assetStatusCombo = data.responseData.comboList;
        }else{
          this.assetStatusCombo = this.assetStatusCombo.concat(data.responseData.comboList);
        }
      } else {
        this.assetStatusCombo = data.responseData.comboList;
      }
      data.responseData.comboList.length != 0 ? this.asssetStatusPageNumber += 1 : this.asssetStatusPageNumber = 1;  
   }
  );
  this.scrollsyncAssetStatus=false;
}

selectedAssetStatusList(event) {
  if(event===undefined){
    this.serviceRequestModel.assetStatusId=0;
    this.serviceRequestModel.assetStatus='';
    this.asssetStatusPageNumber=1;
    this.assetStatusCombo=[];
  }else{
    this.serviceRequestModel.assetStatusId=event.assetStatusId;
    this.serviceRequestModel.assetStatus=event.assetStatusName;
  }
}

functionalStatus = [
  {id: 1, name: 'CRITICAL'},
  {id: 2, name: 'NON CRITICAL'}
];

srStatus= [
  {id: 1, name: 'OPEN'},
  {id: 2, name: 'ACKNOWLEDGED'},
  {id: 3, name: 'IN-PROGRESS'},
  {id: 4, name: 'COMPLETED'},
  {id: 5, name: 'CLOSED'},
];

dateValidationinstall(event){
  return false;
}

clear(){
  this.serviceRequestModel = new ServiceRequestModel();
  this.ngOnInit()
}

generateSRPDF(srId ?: number) {
  this.commonService.commonGetService('generateSRPMPdf.sams',srId).subscribe(
    data => {        
      if(data.success){
         this.downloadDocument(data.responseData,'application/pdf'); 
      }else{
      }  
    }, error =>{
    }
  );
}

downloadDocument(filePath: string, contentType) { 
  this.commonService.showSpinner();
  var fileName = filePath.split('.')[0];
  this.commonService.downloadFile(filePath, contentType).subscribe(
    data => {
      this.commonService.showDownloadPopUpPDF(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
    }
  );
  this.commonService.hideSpinner();
}

}
