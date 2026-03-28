import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetModel } from 'src/app/Model/master/asset';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ScheduleDtlModel } from 'src/app/Model/asset/scheduleDtl';
import { allBusinessPartnerRoles, allassetStatus } from 'src/app/Constants/AllStatusConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-maintenance-add-asset-schedule',
  templateUrl: './maintenance-add-asset-schedule.component.html',
  styleUrls: ['./maintenance-add-asset-schedule.component.css']
})
export class MaintenanceAddAssetScheduleComponent implements OnInit {
  displayedColumns = ['select', 'siNo', 'codeSrNo', 'deptSubDept', 'modelManufacture', 'groupCommonName', 'assigneeInfo', 'add'];

  //for pagination
  length: String;//set total record count here 
  pageIndex: String;//set page number starts with zeroo
  pageSize: String;// records per page
  i: number = 0;

  asset: AssetModel;
  scheduledAsserts: AssetModel[];
  assetModelList: ScheduleDtlModel[];
  assetAddedList: ScheduleDtlModel[];
  swapAssetList: ScheduleDtlModel[];
  t : ScheduleDtlModel[];
 
  //COMBO
  assetCategoryName : any = [];
  subCategoryName: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  assetStatusCombo: any = [];

  assetGroupPageNumber:number;
  modelComboPageNumber:number;
  assetCategoryPageNumber:number;
  assetSubCategorPageNumber:number;
  asssetStatusPageNumber:number;

  scrollsyncAssetGroup:boolean=false;
  scrollsyncModel:boolean=false;
  scrollsyncAssetStatus:boolean=false;
  scrollsyncAssetCategory:boolean=false;
  scrollsyncAssetSubCategory:boolean=false;
  recordsPerPageForCombo:string;

  subLoader : boolean = false;

  limitCount: any;
  scrollsyncmanufactuer : boolean = false;
  manufacturerPageNumber: number;
  manufactuer: any[] = [];
  getData: getData;

  scrollsyncAssigneeDepartment: boolean = false;
  assigneeDepartmentPageNumber: number;
  assigneeDepartmentCombo: any = [];

  subDepartmentPageNumber: number;
  scrollsyncSubDepartment = false;
  subDepartmentCombo: any = [];
  
  scrollsyncAssignToPerson: boolean = false;
  assignToPersonCombo: any = [];
  assignToPersonPageNumber: number = 0;

  scrollsyncSRFunctionlityPriority: boolean = false;
  functionlityCombo =[];
  funtionlityPageNumber: number;

  selectAllFlag: boolean = false;
  expandSearchFlag: boolean = true;


  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  pmMonthDisp: any;
  paMonthDisp: any;
  qaMonthDisp: any;
  amMonthDisp: any;

   scheduleFrequencyList = [
    { frequency: 'DAILY' },
    { frequency: 'WEEKLY' },
    { frequency: 'FORTNIGHT' },
    { frequency: 'MONTHLY' },
    { frequency: 'ANNUALLY' },
    { frequency: 'QUARTERLY' },
    { frequency: 'HALF-ANNUALLY' }
  ];
  
  listofMonth = [
    { id: 1, name: 'JANUARY' },
    { id: 2, name: 'FEBRUARY' },
    { id: 3, name: 'MARCH' },
    { id: 4, name: 'APRIL' },
    { id: 5, name: 'MAY' },
    { id: 6, name: 'JUNE' },
    { id: 7, name: 'JULY' },
    { id: 8, name: 'AUGUST' },
    { id: 9, name: 'SEPTEMBER' },
    { id: 10, name: 'OCTOBER' },
    { id: 11, name: 'NOVEMBER' },
    { id: 12, name: 'DECEMBER' }
  ];

  pmMonth = [
    { id: 1, name: 'JANUARY' },
    { id: 2, name: 'FEBRUARY' },
    { id: 3, name: 'MARCH' },
    { id: 4, name: 'APRIL' },
    { id: 5, name: 'MAY' },
    { id: 6, name: 'JUNE' },
    { id: 7, name: 'JULY' },
    { id: 8, name: 'AUGUST' },
    { id: 9, name: 'SEPTEMBER' },
    { id: 10, name: 'OCTOBER' },
    { id: 11, name: 'NOVEMBER' },
    { id: 12, name: 'DECEMBER' }
  ];

  paMonth = [
    { id: 1, name: 'JANUARY' },
    { id: 2, name: 'FEBRUARY' },
    { id: 3, name: 'MARCH' },
    { id: 4, name: 'APRIL' },
    { id: 5, name: 'MAY' },
    { id: 6, name: 'JUNE' },
    { id: 7, name: 'JULY' },
    { id: 8, name: 'AUGUST' },
    { id: 9, name: 'SEPTEMBER' },
    { id: 10, name: 'OCTOBER' },
    { id: 11, name: 'NOVEMBER' },
    { id: 12, name: 'DECEMBER' }
  ];

  qaMonth = [
    { id: 1, name: 'JANUARY' },
    { id: 2, name: 'FEBRUARY' },
    { id: 3, name: 'MARCH' },
    { id: 4, name: 'APRIL' },
    { id: 5, name: 'MAY' },
    { id: 6, name: 'JUNE' },
    { id: 7, name: 'JULY' },
    { id: 8, name: 'AUGUST' },
    { id: 9, name: 'SEPTEMBER' },
    { id: 10, name: 'OCTOBER' },
    { id: 11, name: 'NOVEMBER' },
    { id: 12, name: 'DECEMBER' }
  ];

  amMonth = [
    { id: 1, name: 'JANUARY' },
    { id: 2, name: 'FEBRUARY' },
    { id: 3, name: 'MARCH' },
    { id: 4, name: 'APRIL' },
    { id: 5, name: 'MAY' },
    { id: 6, name: 'JUNE' },
    { id: 7, name: 'JULY' },
    { id: 8, name: 'AUGUST' },
    { id: 9, name: 'SEPTEMBER' },
    { id: 10, name: 'OCTOBER' },
    { id: 11, name: 'NOVEMBER' },
    { id: 12, name: 'DECEMBER' }
  ];
 

  constructor(private matDialogRef: MatDialogRef<MaintenanceAddAssetScheduleComponent>,
              private assetOptimaServices: AssetOptimaServices,
              private translateService: TranslateService,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService:CommonService) {
                this.asset = new AssetModel();
                this.assetAddedList = [];
                this.assetModelList = [];
                this.swapAssetList= [];
                this.assetGroupPageNumber = 1;
                this.modelComboPageNumber = 1;
                this.assetCategoryPageNumber = 1;
                this.assetSubCategorPageNumber = 1;
                this.asssetStatusPageNumber = 1;
                this.manufacturerPageNumber = 1;
                this.assigneeDepartmentPageNumber = 1;
                this.subDepartmentPageNumber = 1;
                this.assignToPersonPageNumber = 1;
                this.funtionlityPageNumber = 1;
               }
   
  ngOnInit() {
    this.scheduledAsserts = this.data.scheduleDtlList;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.asset.direction = 'desc'; 
    this.asset.columnName = 'updatedDt';
    this.asset.locationId = Number(this.data.locationId);
    this.asset.assetHdrId = Number(localStorage.getItem('assetIdForScheduling')) > 0? Number(localStorage.getItem('assetIdForScheduling') ): 0 ;
    // this.loadList();
    this.expandSearchFlag = true;
    this.asset.scheduleType=this.data.scheduleType;

    console.log(this.asset.scheduleType)
  }

  searchAsset() {
    this.pageSize = '1000';
    this.pageIndex = '0';
    this.loadList();
  }

  clear(){
    this.asset=new AssetModel;
    this.assetModelList = [];
    this.assetAddedList = [];
    this.swapAssetList = [];
    this.ngOnInit()
  }

  loadList() {
    this.asset.pageNumber = Number(this.pageIndex);
    this.asset.recordsPerPage = Number(this.pageSize);
    this.asset.locationId = Number(this.data.locationId);
    this.asset.assetStatusId = allassetStatus.IN_USE;
    this.asset.scheduleType=this.data.scheduleType;
    this.asset.scheduleStartDt=this.data.startDt;
    this.asset.scheduleEndDt=this.data.endDt;
    this.commonService.commonListService('fetchListOfAllAssetForScheduleAdd.sams', this.asset).subscribe(
      data => {
          if(data.success){
            this.length = data.responseData.dataTotalRecCount;
            if(data.responseData.dataTotalRecCount > 0){
              this.expandSearchFlag = false;
            }
            
             // Create a set to store unique assetHdrId values
              const assetHdrIdSet = new Set(this.assetModelList.map(item => item.assetHdrId));
              for (let i = 0; i < data.responseData.dataList.length; i++) {
                // Check if the assetHdrId is not in the set, then add it to the list
                if(data.responseData.dataList[i].scheduleAlreadyExistForPeriod == false){
                  if (!assetHdrIdSet.has(data.responseData.dataList[i].assetHdrId)) {
                    let index = this.commonService.getIndexOfTheItem(this.scheduledAsserts, true, "assetHdrId", data.responseData.dataList[i].assetHdrId)
                    if (index == -1) {
                      this.assetModelList.push(data.responseData.dataList[i]);
                      assetHdrIdSet.add(data.responseData.dataList[i].assetHdrId);                  
                    }
                  }
                }
              }
            
                
            this.subLoader =false;
          }else{
            this.subLoader =false;
          }
        },error =>{
          this.subLoader =false;
        }        
    );
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  addAssetToList(assetModelTo: ScheduleDtlModel) {
    if(assetModelTo.scheduleAlreadyExistForPeriod == false){
      if (this.commonService.getIndexOfTheItem(this.assetAddedList, true, 'assetHdrId', assetModelTo.assetHdrId) == -1) {
        this.assetAddedList.push(assetModelTo);
      } else {
        this.commonService.openToastWarningMessage(assetModelTo.assetCode + ' is Already added !!!');
      }
    }else{
      // this.commonService.openToastWarningMessage('Seleted Asset '+assetModelTo.assetCode+' is already registered under schedule '+ assetModelTo.scheduleAlreadyExistForPeriodScheduleName); 
    }
  }
  removeAssetFromList(assetModelTo: ScheduleDtlModel) {
    let index = this.commonService.getIndexOfTheItem(this.assetAddedList, true, 'assetHdrId', assetModelTo.assetHdrId);
    if (index >= 0) {
      this.assetAddedList.splice(index, 1);
    }
  }

  updateAddedAssert() {
    this.matDialogRef.close(this.swapAssetList);
  }

  exit() {
    this.matDialogRef.close();
  }

  validateAssetCd(element: AssetModel): boolean {
    let visible = false;
    let index = -1;
    index = this.commonService.getIndexOfTheItem(this.scheduledAsserts, true, "assetHdrId", element.assetHdrId)
    if (index == -1) {
      visible = true;
      element.displayAddIconFlag = true;
    } else {
      element.displayAddIconFlag = false;
    }
    return visible;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadList();
  }

  functionalStatus = [
    {id: 1, name: 'CRITICAL'},
    {id: 2, name: 'NON CRITICAL'}
  ];
  
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
      this.asset.assetCategoryId=0;
      this.asset.assetCategoryName=''; 
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
      this.asset.subCategoryId = 0;
      this.asset.subCategoryName = '';
      this.subCategoryName = [];
      this.assetSubCategorPageNumber = 1;
    } else {
      this.asset.assetCategoryId=event.assetCategoryId;
      this.asset.assetCategoryName=event.assetCategoryName;
      this.asset.subCategoryId = 0;
      this.asset.subCategoryName = '';
      this.subCategoryName = [];
      this.assetSubCategorPageNumber = 1;
    }
  }
  
  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, this.asset.assetCategoryId,
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
      this.asset.subCategoryId=0;
      this.asset.subCategoryName='';
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
    } else {
      this.asset.subCategoryId=event.subCategoryId;
      this.asset.subCategoryName=event.subCategoryName;
    }
  
  }
  
  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetGroupCombo.sams', searchKey.term, this.asset.subCategoryId, '',
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
      this.asset.assetGroupName=event.assetGroupName;
      this.asset.assetGroupId=event.assetGroupId;
      
    }else{
      this.asset.assetGroupName="";
      this.asset.assetGroupId=0;
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
    }
  }
  
  listOfAllModel(searchKey) {
    this.scrollsyncModel=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', 
                   this.asset.assetGroupId > 0 ? this.asset.assetGroupId : '',
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
      this.asset.modelId=event.modelId;
      this.asset.modelName=event.modelName;
    }else{  
      this.asset.modelId=0;
      this.asset.modelName='';
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
      this.asset.assetStatusId=0;
      this.asset.assetStatus='';
      this.asssetStatusPageNumber=1;
      this.assetStatusCombo=[];
    }else{
      this.asset.assetStatusId=event.assetStatusId;
      this.asset.assetStatus=event.assetStatusName;
    }
  }

  listOfManufacturer(searchValue) {
    this.scrollsyncmanufactuer = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.manufacturerPageNumber,'',partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.scrollsyncmanufactuer = false;
      }
    );
  }

  getManfacturerComboValue(event) {
    if (event === undefined) {
      this.asset.manufacturerId=0;
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];
    } else {
      this.asset.manufacturerId=event.businessPartnerId;
    }
  }

  loadAssigneeDepartmentComboData(searchValue) {

    this.scrollsyncAssigneeDepartment = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assigneeDepartmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assigneeDepartmentPageNumber , this.assigneeDepartmentCombo , data.responseData.comboList)
          this.assigneeDepartmentPageNumber = this.getData.pageNumber;
          this.assigneeDepartmentCombo = this.getData.dataList;
          this.scrollsyncAssigneeDepartment = false;
        }
      );
  }

  selectedDepartmentData(event) {
    if (event === undefined) {
      this.asset.departmentId=0;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
    } else {
      this.asset.departmentId=event.departmentId;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
    }
  }

  loadSubDepartmentComboData(searchValue) {
    this.scrollsyncSubDepartment=true;
    const departmentId =  this.asset.departmentId;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams',searchValue.term,departmentId > 0 ? departmentId : '','',
            this.recordsPerPageForCombo,this.subDepartmentPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentCombo , data.responseData.comboList)
        this.subDepartmentPageNumber = this.getData.pageNumber;
        this.subDepartmentCombo = this.getData.dataList;
        this.scrollsyncSubDepartment=false;
     }
    );
  }

  selectedSubDepartmentData(event) {
    if (event === undefined) {
      this.asset.subDepartmentId=0;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
    } else {
      this.asset.subDepartmentId=event.subDepartmentId;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
    }
  }

  loadAssignToComboData(searchValue) {
    this.scrollsyncAssignToPerson = true;
    const departmentId = this.asset.departmentId;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, departmentId > 0 ? departmentId : '', '', this.recordsPerPageForCombo, this.assignToPersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assignToPersonPageNumber , this.assignToPersonCombo , data.responseData.comboList)
        this.assignToPersonPageNumber = this.getData.pageNumber;
        this.assignToPersonCombo = this.getData.dataList;
        this.scrollsyncAssignToPerson = false;
      }
    );
  }

  selectedAssignToPerson(event) {
    if (event === undefined) {
      this.asset.assignToPersonId = 0;
    } else {
      this.asset.assignToPersonId = event.employeeId;
    }
    this.assignToPersonPageNumber = 1;
    this.assignToPersonCombo = [];   
  }

  compareValue(element) {
    return this.assetAddedList.findIndex(data => data.assetHdrId === element.assetHdrId) !== -1;
  }

  selectAsset(element,checked){
    if(checked){
      this.addAssetToList(element);
    } else{
      this.removeAssetFromList(element);
    }
  }

  multipleSelectAsset(value: boolean) {
    if(value){
      for (let i = 0; this.assetModelList.length > i; i++){
        //this.asset.assetHdrId = this.assetModelList[i].assetHdrId;
        if(this.validateAssetCd(this.asset)){
          this.addAssetToList(this.assetModelList[i]);
        }
        
      }
    } else{
      for (let i = 0; this.assetModelList.length > i; i++){
        this.removeAssetFromList(this.assetModelList[i]);
      }
    }
   
  }
  
  srFunctionalityStatusComboData(searchValue) {
    this.functionlityCombo = [];
    this.scrollsyncSRFunctionlityPriority = true;
    this.funtionlityPageNumber = 1;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllSRFuntionalityCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.funtionlityPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.funtionlityPageNumber , this.functionlityCombo , data.responseData.comboList)
          this.funtionlityPageNumber = this.getData.pageNumber;
          this.functionlityCombo = this.getData.dataList;
          this.scrollsyncSRFunctionlityPriority = false;
        }
      );
  }

  selectedSRFunctionalityStatusComboData(event) {
    if (event === undefined) {
      this.asset.functionalStatus = '';
      this.funtionlityPageNumber = 1;
      this.functionlityCombo = [];
    } else {
      this.translateService.get([event.functionalityName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.asset.functionalStatus = status[0].toString();
      });
      
    }
  }

  swapAsset(){
    const assetIdSet = new Set(this.swapAssetList.map(asset => asset.assetHdrId));

    this.assetAddedList.forEach(asset => {
      if (!assetIdSet.has(asset.assetHdrId)) {
        this.swapAssetList.push(asset);
        assetIdSet.add(asset.assetHdrId);
      }
    });

  }

  removeSelectedAssetFromList(assetModelTo: ScheduleDtlModel) {
    let index = this.commonService.getIndexOfTheItem(this.swapAssetList, true, 'assetHdrId', assetModelTo.assetHdrId);
    if (index >= 0) {
      this.swapAssetList.splice(index, 1);
    }
  }

   selectedPmFrequencyData(event) {
    if(this.asset.pmMonth != null && this.asset.pmMonth != ''){
      this.asset.pmMonth = '';
    }
}

  setPmMonth(event) {
    if (event != null) {
      this.asset.pmMonth = event.name;
      this.updatePmFrequency(this.asset.pmFrequency, this.asset.pmMonth,"");
    }else{
      this.asset.pmMonth = '';
    }
   
  }

  async updatePmFrequency(freqency, monthName, event) {
  let pmMonthFlag = true;

    if(pmMonthFlag){
      if (event != undefined) {   
        let monthValue;
        if (monthName != null || monthName != undefined)
          this.pmMonth.forEach((array) => {
            if (array.name === monthName) {
              monthValue = array.id;
            }
          });
        if (freqency === 'HALF-ANNUALLY') {
          var nextFrequency = parseInt(monthValue) + parseInt('1') + parseInt('5') > 12 ? parseInt(monthValue) + parseInt('1')
            + parseInt('5') - 12 : parseInt(monthValue) + parseInt('1') + parseInt('5');
          this.pmMonthDisp = this.months[parseInt(monthValue) - parseInt('1')] + '-' + this.months[nextFrequency - parseInt('1')];
          this.pmMonth.push({ id: this.pmMonthDisp, name: this.pmMonthDisp });
          this.asset.pmMonth =  this.pmMonthDisp;
        }
        if (freqency === 'ANNUALLY') {
          var nextFrequency = parseInt(monthValue) + parseInt('11') > 11 ? parseInt(monthValue) + parseInt('11') - 11 : parseInt(monthValue) + parseInt('11');
          this.pmMonthDisp = this.months[parseInt(monthValue) - parseInt('1')] + '-' + this.months[nextFrequency - parseInt('1')];
          this.pmMonth.push({ id: this.pmMonthDisp, name: this.pmMonthDisp });
          this.asset.pmMonth =  this.pmMonthDisp;
        }
        if (freqency === 'QUARTERLY') {
          const monthIndex = parseInt(monthValue) - 1; 

          const quarterlyMonths = [];
          for (let i = 0; i < 4; i++) {
            let month = (monthIndex + i * 3) % 12; 
            quarterlyMonths.push(this.months[month]);
          }
        
          this.pmMonthDisp = quarterlyMonths.join('-');
          this.pmMonth.push({ id: this.pmMonthDisp, name: this.pmMonthDisp });
          this.asset.pmMonth =  this.pmMonthDisp;
        }

       
      }
    }
 
}

selectedPaFrequencyData(event) {
    if(this.asset.paMonth != null && this.asset.paMonth != ''){
      this.asset.paMonth = '';
    }
}

  setPaMonth(event) {
    if (event != null) {
      this.asset.paMonth = event.name;
      this.updatePaFrequency(this.asset.paFrequency, this.asset.paMonth,"");
    }else{
      this.asset.paMonth = '';
    }
   
  }

  async updatePaFrequency(freqency, monthName, event) {
  let paMonthFlag = true;

    if(paMonthFlag){
      if (event != undefined) {   
        let monthValue;
        if (monthName != null || monthName != undefined)
          this.paMonth.forEach((array) => {
            if (array.name === monthName) {
              monthValue = array.id;
            }
          });
        if (freqency === 'HALF-ANNUALLY') {
          var nextFrequency = parseInt(monthValue) + parseInt('1') + parseInt('5') > 12 ? parseInt(monthValue) + parseInt('1')
            + parseInt('5') - 12 : parseInt(monthValue) + parseInt('1') + parseInt('5');
          this.paMonthDisp = this.months[parseInt(monthValue) - parseInt('1')] + '-' + this.months[nextFrequency - parseInt('1')];
          this.paMonth.push({ id: this.paMonthDisp, name: this.paMonthDisp });
          this.asset.paMonth =  this.paMonthDisp;
        }
        if (freqency === 'ANNUALLY') {
          var nextFrequency = parseInt(monthValue) + parseInt('11') > 11 ? parseInt(monthValue) + parseInt('11') - 11 : parseInt(monthValue) + parseInt('11');
          this.paMonthDisp = this.months[parseInt(monthValue) - parseInt('1')] + '-' + this.months[nextFrequency - parseInt('1')];
          this.paMonth.push({ id: this.paMonthDisp, name: this.paMonthDisp });
          this.asset.paMonth =  this.paMonthDisp;
        }
        if (freqency === 'QUARTERLY') {
           const monthIndex = parseInt(monthValue) - 1; // Convert to 0-based index

           const quarterlyMonths = [];
           for (let i = 0; i < 4; i++) {
             const month = (monthIndex + i * 3) % 12; // Advance by 3 months each time
             quarterlyMonths.push(this.months[month]);
           }
         
           this.paMonthDisp = quarterlyMonths.join('-');
           this.paMonth.push({ id: this.paMonthDisp, name: this.paMonthDisp });
           this.asset.paMonth =  this.paMonthDisp;
          }

       
      }
    }
 
}

selectedQaFrequencyData(event) {
    if(this.asset.qaMonth != null && this.asset.qaMonth != ''){
      this.asset.qaMonth = '';
    }
}

  setQaMonth(event) {
    if (event != null) {
      this.asset.qaMonth = event.name;
      this.updatePaFrequency(this.asset.qaFrequency, this.asset.qaMonth,"");
    }else{
      this.asset.qaMonth = '';
    }
   
  }

  async updateQaFrequency(freqency, monthName, event) {
  let qaMonthFlag = true;

    if(qaMonthFlag){
      if (event != undefined) {   
        let monthValue;
        if (monthName != null || monthName != undefined)
          this.qaMonth.forEach((array) => {
            if (array.name === monthName) {
              monthValue = array.id;
            }
          });
        if (freqency === 'HALF-ANNUALLY') {
          var nextFrequency = parseInt(monthValue) + parseInt('1') + parseInt('5') > 12 ? parseInt(monthValue) + parseInt('1')
            + parseInt('5') - 12 : parseInt(monthValue) + parseInt('1') + parseInt('5');
          this.qaMonthDisp = this.months[parseInt(monthValue) - parseInt('1')] + '-' + this.months[nextFrequency - parseInt('1')];
          this.qaMonth.push({ id: this.qaMonthDisp, name: this.qaMonthDisp });
          this.asset.qaMonth =  this.qaMonthDisp;
        }
        if (freqency === 'ANNUALLY') {
          var nextFrequency = parseInt(monthValue) + parseInt('11') > 11 ? parseInt(monthValue) + parseInt('11') - 11 : parseInt(monthValue) + parseInt('11');
          this.qaMonthDisp = this.months[parseInt(monthValue) - parseInt('1')] + '-' + this.months[nextFrequency - parseInt('1')];
          this.qaMonth.push({ id: this.qaMonthDisp, name: this.qaMonthDisp });
          this.asset.qaMonth =  this.qaMonthDisp;
        }
        if (freqency === 'QUARTERLY') {
          const monthIndex = parseInt(monthValue) - 1; // Convert to 0-based index

          const quarterlyMonths = [];
          for (let i = 0; i < 4; i++) {
            const calculatedMonthIndex = (monthIndex + i * 3) % 12; // Add 3 months each time, wrap around with % 12
            quarterlyMonths.push(this.months[calculatedMonthIndex]);
          }
        
          this.qaMonthDisp = quarterlyMonths.join('-');
          this.qaMonth.push({ id: this.qaMonthDisp, name: this.qaMonthDisp });
          this.asset.qaMonth =  this.qaMonthDisp;
          }

       
      }
    }
 
}

// selectedAmFrequencyData(event) {
//     if(this.asset.amMonth != null && this.asset.amMonth != ''){
//       this.asset.amMonth = '';
//     }
// }

//   setAmMonth(event) {
//     if (event != null) {
//       this.asset.amMonth = event.name;
//       this.updateAmFrequency(this.asset.amFrequency, this.asset.amMonth,"");
//     }else{
//       this.asset.amMonth = '';
//     }
   
//   }

//   async updateAmFrequency(freqency, monthName, event) {
//   let amMonthFlag = true;

//     if(amMonthFlag){
//       if (event != undefined) {   
//         let monthValue;
//         if (monthName != null || monthName != undefined)
//           this.amMonth.forEach((array) => {
//             if (array.name === monthName) {
//               monthValue = array.id;
//             }
//           });
//         if (freqency === 'HALF-ANNUALLY') {
//           var nextFrequency = parseInt(monthValue) + parseInt('1') + parseInt('5') > 12 ? parseInt(monthValue) + parseInt('1')
//             + parseInt('5') - 12 : parseInt(monthValue) + parseInt('1') + parseInt('5');
//           this.amMonthDisp = this.months[parseInt(monthValue) - parseInt('1')] + '-' + this.months[nextFrequency - parseInt('1')];
//           this.amMonth.push({ id: this.amMonthDisp, name: this.amMonthDisp });
//           this.asset.amMonth =  this.amMonthDisp;
//         }
//         if (freqency === 'ANNUALLY') {
//           var nextFrequency = parseInt(monthValue) + parseInt('11') > 11 ? parseInt(monthValue) + parseInt('11') - 11 : parseInt(monthValue) + parseInt('11');
//           this.amMonthDisp = this.months[parseInt(monthValue) - parseInt('1')] + '-' + this.months[nextFrequency - parseInt('1')];
//           this.amMonth.push({ id: this.amMonthDisp, name: this.amMonthDisp });
//           this.asset.amMonth =  this.amMonthDisp;
//         }
//         if (freqency === 'QUARTERLY') {
//           const monthIndex = parseInt(monthValue) - 1; // Convert to 0-based index

//           const quarterlyMonths = [];
//           for (let i = 0; i < 4; i++) {
//             const calculatedMonthIndex = (monthIndex + i * 3) % 12; // Add 3 months each time, wrap around with % 12
//             quarterlyMonths.push(this.months[calculatedMonthIndex]);
//           }
        
//           this.amMonthDisp = quarterlyMonths.join('-');
//           this.amMonth.push({ id: this.amMonthDisp, name: this.amMonthDisp });
//           this.asset.amMonth =  this.amMonthDisp;
//           }

       
//       }
//     }
 
// }


}
