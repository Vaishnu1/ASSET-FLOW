import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Title } from '@angular/platform-browser';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetPhysicalAuditDtlModel } from 'src/app/Model/asset/assetPhysicalAuditDtl';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { AssetPhysicalAuditHdrModel } from 'src/app/Model/asset/assetPhysicalAuditHdr';
import { getData } from 'src/app/Model/common/fetchListData';
import { allAssetAuditStatus, allassetStatus, allAssetStatusType, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetAssigneeTempComponent } from '../../asset-assignee-temp/asset-assignee-temp.component';
import { MatDialog } from '@angular/material/dialog';
import { PhysicalAuditNewlyFoundModel } from 'src/app/Model/asset/physicalAuditNewlyFound';
import { ViewAuditImagesComponent } from '../../Asset/view-audit-images/view-audit-images.component';

@Component({
  selector: 'app-asset-physical-audit-edit',
  templateUrl: './asset-physical-audit-edit.component.html',
  styleUrls: ['./asset-physical-audit-edit.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssetPhysicalAuditEditComponent implements OnInit {

   //Set Page Title
   title = 'Asset Optima - Asset';

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  auditDtlDisplayedColumns : string[] = ['sno','select','assetCode','serialNo','newSerialNo', 'departmentName','newDepartmentName', 'subDepartment',
  'newSubDepartment', 'assetStatus', 'newAssetStatus','assetCondition','newAssetCondition','blockName','newBlockName','floorName','newFloorName','roomName','newRoomName','auditRemarks','notFoundRemarks','assetAuditBy','assetAuditStatus','assetAssignee', 'auditImages'];

  newlyFoundDisplayColumns : string[] = ['sno', 'locationName', 'assetCode', 'serialNo','model', 'manufacturer', 'description', 'departmentName', 'subDepartment', 'assetStatus', 'assetCondition','blockName','floorName','roomName','remarks', 'createdDt'];

  auditDtlDataSource : any=[];
  expandedElement:any=this.auditDtlDataSource;

  subLoader: boolean = false;

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  public assetPhysicalAuditDtlModel : AssetPhysicalAuditDtlModel;
  public assetPhysicalAuditHdrModel : AssetPhysicalAuditHdrModel;
  public physicalAuditNewlyFoundModel: PhysicalAuditNewlyFoundModel;


  departmentCombo: any = [];
  subDepartmentCombo: any = [];
  assetStatusCombo: any = [];
  blockComboList: any = [];
  floorComboList: any = [];
  segmentComboList: any = [];
  roomComboList: any = [];
  departmentPageNumber:number;
  subDepartmentPageNumber:number;
  asssetStatusPageNumber:number;
  blockNamePageNumber:number;
  floorNamePageNumber:number;
  segmentNamePageNumber:number;
  roomNamePageNumber:number;
  auditHdrLocId: number;

  scrollsyncDepartment:boolean=false;
  scrollsyncSubDepartment:boolean=false;
  scrollsyncAssetStatus:boolean=false;
  blockScrollSync:boolean=false;
  floorSrcollSync:boolean=false;
  segmentSrcollSync:boolean=false;
  roomSrcollSync:boolean=false;

  recordsPerPageForCombo:string;

  buttonDisplay: boolean = false;
  headingDisplay: string;

  localPhyAuditName: string;
  getData: getData;
  isViewMode: boolean = false;
  enableSubmitFlag: boolean = true;

   //APPROVALS
   public phyAuditId: any;
   public transactionSource: any;
   employeeId: String = '0';
  //  physicalAuditApproveButton: boolean = false;
   public phyAuditStatus: any;
  approve: string ='APPROVED';
  approvalId: String = '0';
  public phyAuditHdrId: any;
  approvebuttonEnable: boolean = false;
  approved: number = 0;
  rejected: number = 0;

  scrollsyncAssetStatusType: boolean = false;
  assetStatusTypePageNumber: number;
  assetStatusTypeCombo: any = [];

  assetConditionCombo: any = [];
  scrollsyncAssetCondition: boolean;
  assetConditionPageNumber: number;

  assignedStatusType = allAssetStatusType.AST_STS_TYP_ASSIGNED;
  unassignedStatusType = allAssetStatusType.AST_STS_TYP_UNASSIGNED;
  discardedStatusType = allAssetStatusType.AST_STS_TYP_DISCARDED;

  pysicalAuditNewlyFoundDataSource : any=[];
  newlyFoundSubLoader: boolean = false;
    //For Pagination newly found
    newlyFoundLength: String = '0';     //set total record count here
    newlyFoundPageIndex: String;  //set page number starts with zeroo
    newlyFoundPageSize: String;   // records per page

  selectAllAsset: boolean = false;
  ErrorMsg: string[] = [];

  auditType: any;

  scrollsyncRoom = false;
  roomPageNumber: number;
  roomNameCombo: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private commonService: CommonService,
              private titleService: Title,
              private userSession: UserSessionService,
              private location : Location) {

      this.assetPhysicalAuditDtlModel = new AssetPhysicalAuditDtlModel();
      this.assetPhysicalAuditHdrModel = new AssetPhysicalAuditHdrModel();
      this.physicalAuditNewlyFoundModel = new PhysicalAuditNewlyFoundModel();
      this.departmentPageNumber = 1;
      this.subDepartmentPageNumber = 1;
      this.asssetStatusPageNumber = 1;
      this.blockNamePageNumber = 1;
      this.floorNamePageNumber = 1;
      this.segmentNamePageNumber = 1;
      this.roomNamePageNumber = 1;
      this.assetStatusTypePageNumber=1;
      this.assetConditionPageNumber=1;
      this.approved = allAssetAuditStatus.APPROVED;
      this.rejected = allAssetAuditStatus.REJECTED;
      this.pageSize = '100';
      this.pageIndex = '0';
      this.newlyFoundPageSize = '100';
      this.newlyFoundPageIndex = '0';
      this.roomPageNumber = 1;
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        this.auditHdrLocId = params.locId;
        this.phyAuditId = Number(primaryId);
        this.transactionSource = allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT];
        var mode = params.mode;
        if(mode=='view'){
          this.headingDisplay = "View";
          this.isViewMode = true;
        }else{
          this.buttonDisplay = true;
          this.headingDisplay = "Edit";
        }
        this.assetPhysicalAuditDtlModel.assetPhyAuditHdrId =Number(primaryId);
       });

      //  this.assetPhysicalAuditDtlModel.auditStatus = "AUDITED";

       this.auditType = JSON.parse(localStorage.getItem('auditType') || 'null');

       console.log("audit type : ",this.auditType);


    this.loadList();
    this.getWorkflowApprovalForPhyAudit();
    this.loadNewlyFoundList();
  }

  searchAssetWise(){
    this.loadList();
  }

  searchAssetAuditWise(){
    this.loadList();
  }

  clear(){
    this.assetPhysicalAuditDtlModel.assetCode='';
    this.assetPhysicalAuditDtlModel.auditStatus='';
    this.loadList();
  }

  loadList(){
      this.assetPhysicalAuditDtlModel.pageNumber = Number(this.pageIndex);
      this.assetPhysicalAuditDtlModel.recordsPerPage = Number(this.pageSize);
      this.auditDtlDataSource = [];
      this.subLoader = true;
      this.commonService.commonListService('fetchPhysicalAuditDtlByHdrId.sams',this.assetPhysicalAuditDtlModel).subscribe(
        data => {
          if (data.success) {
          this.auditDtlDataSource = data.responseData.dataList;
          this.length=data.responseData.dataTotalRecCount;
          this.enableSubmitFlag = true;

          this.checkAsset();
          // this.length=this.auditDtlDataSource.length;
          this.subLoader = false;
          this.phyAuditStatus = data.responseData[0].assetAuditStatusId;
          }else {
          this.commonService.openToastErrorMessage(data.message);
          this.enableSubmitFlag = false;
          this.subLoader = false;
          }
        }, error => {
          this.subLoader = false;
        }
      );
  }

  //To export report
  generateReport() {
    this.assetPhysicalAuditDtlModel.recordsPerPage = 0;
    this.pageSize = '0';
    this.commonService.commonListService('generatePhysiAuditDeatailedReport.sams', this.assetPhysicalAuditDtlModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  saveAssetDtl(){

    // for(let i=0;i<this.auditDtlDataSource.length;i++){
    //     if(this.auditDtlDataSource[0].newStatusTypeId == this.assignedStatusType && this.auditDtlDataSource[0].assetTemporaryAssigneeListCount == 0){
    //       this.commonService.openToastWarningMessage("Please select assignee for assigned status!");
    //       return;
    //     }

    //     if(this.auditDtlDataSource[0].newStatusTypeId == 0 || this.auditDtlDataSource[0].newAssetStatusId == 0){
    //       this.commonService.openToastWarningMessage("New asset status and status type is required!");
    //       return;
    //     }
    // }
    let physicalAuditList = [];
    for (let i = 0; i < this.auditDtlDataSource.length; i++) {      
      if (this.auditDtlDataSource[i].active) {
        physicalAuditList.push(this.auditDtlDataSource[i]);
      }
    } 

      var obj = {
        'phyAuditDtl': physicalAuditList != null ? physicalAuditList : [],
        'assetPhyAuditHdrId': this.phyAuditId,
      }
      this.commonService.showSpinner();
     this.commonService.commonInsertService('saveOrUpdatePhysicalAuditDtlNew.sams', obj).subscribe(
        data => {
         if (data.success) {
           this.commonService.openToastSuccessMessage(data.message);
           this.location.back();
         } else {
           this.commonService.openToastErrorMessage(data.message);
         }
         this.commonService.hideSpinner();
       }, error => {
        throw error;
       }
     );
  }

  back(){
    this.location.back();
  }

  OpenassetPage(){
    this.location.back();
  }

  auditStatus = [
    {id: 1, name: 'AUDITED'},
    {id: 2, name: 'UNAUDITED'},
    {id: 3, name: 'VARIANCE'},
    {id: 4, name: 'COULD NOT LOCATE'},
    {id: 5, name: 'APPROVED'}
  ];

  loadDepartmentComboData(searchValue) {
    this.scrollsyncDepartment=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.departmentPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentCombo , data.responseData.comboList)
        this.departmentPageNumber = this.getData.pageNumber;
        this.departmentCombo = this.getData.dataList;
        this.scrollsyncDepartment = false;
     }
    );
  }

  selectedDepartmentData(event,index) {
    if(event===undefined){
      this.auditDtlDataSource[index].newDepartmentId = 0;
      this.auditDtlDataSource[index].newDepartmentName='';
      this.auditDtlDataSource[index].newSubDepartmentId=0;
      this.auditDtlDataSource[index].newSubDepartment='';
      this.departmentPageNumber=1;
      this.departmentCombo=[];
      this.subDepartmentPageNumber=1;
      this.subDepartmentCombo=[];
    }else{
      this.auditDtlDataSource[index].newDepartmentId = event.departmentId;
      this.auditDtlDataSource[index].newDepartmentName=event.departmentName;
      this.auditDtlDataSource[index].newSubDepartmentId=0;
      this.auditDtlDataSource[index].newSubDepartment='';
      this.subDepartmentPageNumber=1;
      this.subDepartmentCombo=[];
      this.auditDtlDataSource[index].varianceFlag=true;
    }
  }

  loadSubDepartmentComboData(searchValue,index) {
    this.scrollsyncSubDepartment=true;
    let newdep =  this.auditDtlDataSource[index].newDepartmentId;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams',searchValue.term,
    newdep > 0 ? newdep : '','',
            this.recordsPerPageForCombo,this.subDepartmentPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentCombo , data.responseData.comboList)
        this.subDepartmentPageNumber = this.getData.pageNumber;
        this.subDepartmentCombo = this.getData.dataList;
        this.scrollsyncSubDepartment = false;
     }
    );
  }

  selectedSubDepartmentData(event,index) {
    if(event===undefined){
      this.auditDtlDataSource[index].newSubDepartmentId=0;
      this.auditDtlDataSource[index].newSubDepartment='';
      this.subDepartmentPageNumber=1;
      this.subDepartmentCombo=[];
    }else{
      this.auditDtlDataSource[index].newSubDepartmentId=event.subDepartmentId;
      this.auditDtlDataSource[index].newSubDepartment=event.subDepartmentName;
      this.auditDtlDataSource[index].varianceFlag=true;
    }
  }

  getBlockNameComboData(searchValue) {
    this.blockScrollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term, this.auditHdrLocId, '',
      this.recordsPerPageForCombo, this.blockNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.blockNamePageNumber , this.blockComboList , data.responseData.comboList)
          this.blockNamePageNumber = this.getData.pageNumber;
          this.blockComboList = this.getData.dataList;
          this.blockScrollSync = false;
        }
      );
  }

  selectedBlockName(event, index) {
    if(event === undefined) {
      this.auditDtlDataSource[index].newBlockId = 0;
      this.auditDtlDataSource[index].newBlockName = '';

      this.auditDtlDataSource[index].newFloorId = 0;
      this.auditDtlDataSource[index].newFloorName = '';

      this.auditDtlDataSource[index].newSegmentId = 0;
      this.auditDtlDataSource[index].newSegmentName = '';

      this.auditDtlDataSource[index].newRoomId = 0;
      this.auditDtlDataSource[index].newRoomName = '';

    } else {
      this.auditDtlDataSource[index].newBlockId = event.buildingBlockId;
      this.auditDtlDataSource[index].newBlockName = event.blockName;
      this.auditDtlDataSource[index].varianceFlag=true;
    }
  }

  getFloorNameComboData(searchValue, index) {
    this.floorSrcollSync = true;
    let newblock = this.auditDtlDataSource[index].newBlockId;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, this.auditHdrLocId, newblock > 0 ? newblock : '',
      this.recordsPerPageForCombo, this.floorNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.floorNamePageNumber , this.floorComboList , data.responseData.comboList)
          this.floorNamePageNumber = this.getData.pageNumber;
          this.floorComboList = this.getData.dataList;
          this.floorSrcollSync = false;
        }
      );
  }

  selectedFloorName(event, index){
    if (event === undefined) {
      this.auditDtlDataSource[index].newFloorId = 0;
      this.auditDtlDataSource[index].newFloorName = '';

      this.auditDtlDataSource[index].newSegmentId = 0;
      this.auditDtlDataSource[index].newSegmentName = '';

      this.auditDtlDataSource[index].newRoomId = 0;
      this.auditDtlDataSource[index].newRoomName = '';
    } else {
    this.auditDtlDataSource[index].newFloorId = event.buildingFloorId;
    this.auditDtlDataSource[index].newFloorName = event.floorName;
    this.auditDtlDataSource[index].varianceFlag=true;
    }
  }


  getSegmentNameComboData(searchValue, index) {
    this.segmentSrcollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term, this.auditHdrLocId, '',
      this.recordsPerPageForCombo, this.segmentNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.segmentNamePageNumber , this.segmentComboList , data.responseData.comboList)
          this.segmentNamePageNumber = this.getData.pageNumber;
          this.segmentComboList = this.getData.dataList;
          this.segmentSrcollSync = false;
        }
      );
  }

  selectedSegmentName(event, index){
    if (event === undefined) {
      this.auditDtlDataSource[index].newSegmentId = 0;
      this.auditDtlDataSource[index].newSegmentName = '';
    } else {
      this.auditDtlDataSource[index].newSegmentId = event.buildingSegmentId;
      this.auditDtlDataSource[index].newSegmentName = event.segmentName;
      this.auditDtlDataSource[index].varianceFlag=true;
    }
  }

  getRoomComboData(searchValue, index) {
    this.roomSrcollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term, this.auditHdrLocId, this.auditDtlDataSource[index].newBlockId, this.recordsPerPageForCombo, this.roomNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.roomNamePageNumber , this.roomComboList , data.responseData.comboList)
          this.roomNamePageNumber = this.getData.pageNumber;
          this.roomComboList = this.getData.dataList;
          this.roomSrcollSync = false;
        }
      );
  }

  selectedRoomName(event, index){

  if (event === undefined) {
      this.auditDtlDataSource[index].newRoomId = 0;
      this.auditDtlDataSource[index].newRoomName = '';

      this.auditDtlDataSource[index].newSegmentId = 0;
      this.auditDtlDataSource[index].newSegmentName = '';
  } else {
    this.auditDtlDataSource[index].newRoomId = event.buildingRoomId;
    this.auditDtlDataSource[index].newRoomName = event.roomName;
    this.auditDtlDataSource[index].varianceFlag=true;
    }
  }

  navigateToAssetPhysicalAudit(){
    this.location.back();
  }

  getWorkflowApprovalForPhyAudit() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.phyAuditId,
      this.userSession.getUserEmpId(),
      allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT], this.userSession.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSession.getUserEmpId();
            this.approvebuttonEnable = data.responseData.approvalFlag;
            this.approvalId = data.responseData.workflowApprovalId;
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  PhyAuditWorkflowApproval(status){
    let result;
    let selectedAssetList = [];
    selectedAssetList.push({...this.assetPhysicalAuditDtlModel,approvalId: this.approvalId});

    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT], selectedAssetList,"");
    }
    else{
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT],selectedAssetList,"");
    }

    result.then(data=>{
      if(data){
        this.location.back();
      }
    })
  }

  loadAssetConditionComboData(searchValue) {
    this.scrollsyncAssetCondition = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetConditionCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetConditionPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetConditionPageNumber , this.assetConditionCombo , data.responseData.comboList)
          this.assetConditionPageNumber = this.getData.pageNumber;
          this.assetConditionCombo = this.getData.dataList;
          this.scrollsyncAssetCondition = false;
        }
      );
  }

  selectedAssetCondition(event,index) {

    if (event === undefined) {
      this.auditDtlDataSource[index].newAssetCondition = '';
      this.auditDtlDataSource[index].newAssetConditionId = 0;
      this.assetConditionPageNumber = 1;
      this.assetConditionCombo = [];
    } else {
      this.auditDtlDataSource[index].newAssetCondition = event.assetCondition;
      this.auditDtlDataSource[index].newAssetConditionId = event.assetConditionId;
      this.auditDtlDataSource[index].varianceFlag=true;
    }
  }

  loadAssetStatusTypeComboData(searchValue) {
    this.scrollsyncAssetStatusType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllStatusTypeCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetStatusTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetStatusTypePageNumber , this.assetStatusTypeCombo , data.responseData.comboList)
          this.assetStatusTypePageNumber = this.getData.pageNumber;
          this.assetStatusTypeCombo = this.getData.dataList;
          this.scrollsyncAssetStatusType = false;
        }
      );
  }


  selectedAssetStatusType(event,index) {
    
    if (event === undefined) {
      this.auditDtlDataSource[index].newStatusType=('');
      this.auditDtlDataSource[index].newStatusTypeId=(0);
      this.assetStatusTypePageNumber = 1;
      this.assetStatusTypeCombo = [];
    } else {
      if(event.statusTypeId === this.assignedStatusType &&
        this.auditDtlDataSource[index].assetTemporaryAssigneeListCount === 0){
        this.commonService.openToastWarningMessage("ASSIGNEE not available for this asset. Please assign to proceed further.");
        this.addAssignee(index);
        this.assetStatusTypePageNumber = 1;
        this.assetStatusTypeCombo = [];
      }
      if(this.auditDtlDataSource[index].trackedLicence){
        this.auditDtlDataSource[index].newAssetStatusId=allassetStatus.NOT_IN_USE;
        this.auditDtlDataSource[index].newAssetStatus=allassetStatus[allassetStatus.NOT_IN_USE];
      }

      this.auditDtlDataSource[index].newStatusType=(event.statusType);
      this.auditDtlDataSource[index].newStatusTypeId=(event.statusTypeId);
      this.auditDtlDataSource[index].varianceFlag=true;

    }

    this.selectedAssetStatusList(undefined,index);

    if(event.statusTypeId == this.unassignedStatusType){
      this.auditDtlDataSource[index].newAssetStatusId= this.assignedStatusType;
      this.auditDtlDataSource[index].newAssetStatus= allassetStatus[allassetStatus.IN_STOCK];
    }
  }

  loadAssetStatusComboData(searchValue,index) {
    this.scrollsyncAssetStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    // this.commonService.getComboResults('listAllAssetStatusCombo.sams', searchValue.term, this.auditDtlDataSource[index].newStatusTypeId, '',
    this.commonService.getComboResults('listAllAssetStatusCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.asssetStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.asssetStatusPageNumber , this.assetStatusCombo , data.responseData.comboList)
          this.asssetStatusPageNumber = this.getData.pageNumber;
          this.assetStatusCombo = this.getData.dataList;
          this.scrollsyncAssetStatus = false;
        }
      );
  }

  selectedAssetStatusList(event,index) {

    if (event === undefined) {
      this.auditDtlDataSource[index].newAssetStatusId=0;
      this.auditDtlDataSource[index].newAssetStatus='';
      this.asssetStatusPageNumber=1;
      this.assetStatusCombo=[];
    } else {
      this.auditDtlDataSource[index].newAssetStatusId=event.assetStatusId;
      this.auditDtlDataSource[index].newAssetStatus=event.assetStatusName;


      this.auditDtlDataSource[index].newStatusTypeId=event.statusTypeId;
      this.auditDtlDataSource[index].newStatusType=event.statusType;
      this.auditDtlDataSource[index].varianceFlag=true;

      if(event.statusTypeId === this.assignedStatusType &&
        this.auditDtlDataSource[index].statusTypeId !== this.assignedStatusType &&
        this.auditDtlDataSource[index].assetTemporaryAssigneeListCount === 0){
        this.commonService.openToastWarningMessage("ASSIGNEE not available for this asset. Please assign to proceed further.");
        this.addAssignee(index);
      }
    }
  }

  addAssignee(index){
    console.log(this.auditDtlDataSource[index]);

    console.log(this.auditDtlDataSource[index].trackedLicence);
    
    let dialogRef = this.dialog.open(AssetAssigneeTempComponent, {
      width: '75%',
      minWidth:  '768px',
      height: '500px',
      data: {
        'volumeLicensePresent':this.auditDtlDataSource[index].volumeLicensePresent,
        'newDepartmentId' : this.auditDtlDataSource[index].newDepartmentId,
        'isViewMode': this.isViewMode,
        'trackLicence': this.auditDtlDataSource[index].trackedLicence,
        'totalVlQty': this.auditDtlDataSource[index].totalVlQty,
        'assetPhyAuditHdrId': this.auditDtlDataSource[index].assetPhyAuditHdrId,
        'assetId': this.auditDtlDataSource[index].assetHdrId,
        'locationId': this.auditHdrLocId,
        'newStatusTypeId' : this.auditDtlDataSource[index].newStatusTypeId
      }
    });
     dialogRef.disableClose = true;
     dialogRef.afterClosed().subscribe(
      data => {
          if(data){
            this.addAssignees(index, data.response);
          }
      });
  }

  addAssignees(index, data){

    this.auditDtlDataSource[index].assetTemporaryAssigneeListCount = data;

    if(this.auditDtlDataSource[index].assetTemporaryAssigneeListCount == 0 && this.auditDtlDataSource[index].newStatusTypeId === this.assignedStatusType){
        this.auditDtlDataSource[index].newStatusType=('');
        this.auditDtlDataSource[index].newStatusTypeId=(0);
        this.auditDtlDataSource[index].newAssetStatus=('');
        this.auditDtlDataSource[index].newAssetStatusId=(0);
    }
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadList();
  }

  loadNewlyFoundList(){
    this.physicalAuditNewlyFoundModel.pageNumber = Number(this.newlyFoundPageIndex);
    this.physicalAuditNewlyFoundModel.recordsPerPage = Number(this.newlyFoundPageSize);
    this.physicalAuditNewlyFoundModel.assetPhyAuditHdrId = this.assetPhysicalAuditDtlModel.assetPhyAuditHdrId;
    this.pysicalAuditNewlyFoundDataSource = [];
    this.subLoader = true;
    this.commonService.commonListService('listOfAllAssetNewlyFound.sams',this.physicalAuditNewlyFoundModel).subscribe(
      data => {
        if (data.success) {
        this.pysicalAuditNewlyFoundDataSource = data.responseData.dataList;
        this.newlyFoundLength=data.responseData.dataTotalRecCount;
        this.newlyFoundSubLoader = false;
        }else {
        this.commonService.openToastErrorMessage(data.message);
        this.newlyFoundSubLoader = false;
        }
      }, error => {
        this.newlyFoundSubLoader = false;
      }
    );
}

getServerDataForNF(event) {
  this.newlyFoundPageSize = event.pageSize;
  this.newlyFoundPageIndex = event.pageIndex;
  this.loadNewlyFoundList();
}

checkAsset(){
  let checkAuditList = false;
  for (let i = 0; i < this.auditDtlDataSource.length; i++) {   
    if (this.auditDtlDataSource[i].active) {
      checkAuditList = true;
    } 
    if(checkAuditList) {
      this.enableSubmitFlag = false;
    } else{
      this.enableSubmitFlag = true;
    }
  } 

  this.selectAllAsset = this.auditDtlDataSource.every(asset => asset.active || asset.auditedFlag);
  
}

setNewSerialNo(event: any, index: number) {
  const enteredValue = event.target.value.trim(); 

  if (enteredValue === "") {
    this.auditDtlDataSource[index].newSerialNo = ""; 
  } else {
    this.auditDtlDataSource[index].newSerialNo = enteredValue; 
  }
}

setNewRfid(event: any, index: number) {
  const enteredValue = event.target.value.trim(); 

  if (enteredValue === "") {
    this.auditDtlDataSource[index].newRfid = ""; 
  } else {
    this.auditDtlDataSource[index].newRfid = enteredValue; 
  }
}

setAuditRemarks(event: any, index: number) {
  const enteredValue = event.target.value.trim(); 

  if (enteredValue === "") {
    this.auditDtlDataSource[index].auditRemarks = ""; 
  } else {
    this.auditDtlDataSource[index].auditRemarks = enteredValue; 
  }
}


selectAllAssetPhyAudits(event){
  let checkAuditList = false;
  
  this.selectAllAsset = event.checked; 

  this.auditDtlDataSource.forEach(element => {
    if (!element.auditedFlag && !this.isViewMode && element.verificationStatus != 'APPROVED' && element.verificationStatus != 'COULD NOT LOCATE') { 
      element.active = this.selectAllAsset; 
    }
  });

  for (let i = 0; i < this.auditDtlDataSource.length; i++) {   
    if (this.auditDtlDataSource[i].active) {
      checkAuditList = true;
    } 
    if(checkAuditList) {
      this.enableSubmitFlag = false;
    } else{
      this.enableSubmitFlag = true;
    }
  } 

  
}

  viewAuditImages(element){
  
     let dialogRef = this.dialog.open(ViewAuditImagesComponent, {
          width: '60%',
          height: 'auto',
          data: {
            'assetImageFilePath' : element.assetImageFilePath,
            'assetPhyVerifyDtlId': element.assetPhyVerifyDtlId,
            'auditStatus'        : element.verificationStatus
          } 
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(
        data => {

          if(data){
            element.assetImageFilePath = data.assetImageFilePath;
          }
         
        });
  }

  loadRoomNameComboData(searchValue) {
    this.scrollsyncRoom = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term,this.auditHdrLocId,0,
      this.recordsPerPageForCombo, this.roomPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.roomNamePageNumber , this.roomNameCombo , data.responseData.comboList)
          this.roomPageNumber = this.getData.pageNumber;
          this.roomNameCombo = this.getData.dataList;
          this.scrollsyncRoom = false;
        }
      );
  }

  selectedRoomData(event) {
    if (event === undefined) {

      this.assetPhysicalAuditDtlModel.roomId = 0;

      this.roomPageNumber = 1;
      this.roomNameCombo = [];

    } else {

      this.assetPhysicalAuditDtlModel.roomId = event.buildingRoomId;
       
  }
  }


}
