import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../Services/common-service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { ModuleAccessModel } from '../../../../Model/base/moduleAccess';
import { AssetPhysicalAuditHdrModel } from '../../../../Model/asset/assetPhysicalAuditHdr';
import { ConfirmConfirmationComponent } from '../../../../Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { allAssetAuditStatus, allWorkflowStatus } from '../../../../Constants/AllStatusConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { processList } from 'src/app/Constants/ProcessList';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-asset-physical-audit-list',
  templateUrl: './asset-physical-audit-list.component.html',
  styleUrls: ['./asset-physical-audit-list.component.css']
})
export class AssetPhysicalAuditListComponent implements OnInit {

  public assetPhysicalAuditHdrModel : AssetPhysicalAuditHdrModel;
  modelAccessModule:ModuleAccessModel; 

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  //Set Page Title
  title = 'Asset Optima - Asset';

  subLoader: boolean = false;

  auditDisplayedColumns = ['select','locationName', 'phyAuditName','phyAuditDate', 'assetAuditStatusName','physicalAuditApprovalStatus', 'noOfAssets','noOfAssetAudited','notFoundAssetCount','totalRoomsApproved','totalRoomsAudited','approvedBy','createdBy','updatedDt'];
  
  auditDataSource = [];

  //COMBO
  locationCombo: any = [];
  locationPageNumber:number;
  scrollsyncLocation:boolean=false;
  recordsPerPageForCombo:string;

  //AssetAuditStatus
  approved : number = 0;
  rejected : number = 0; 
  waitingForApproval : number = 0;
  getData: getData;
  selectedItem: any=0;

  enableActionBtn: boolean=true;
  selectAllAsset: boolean = false;

  scrollsyncPhyStatus:boolean=false;
  phyAuditStatusPageNumber: number;
  phyAuditStatusCombo: any = [];


  constructor(private commonService:CommonService,
              private router: Router,
              public route : ActivatedRoute,
              private assetOptimaServices:AssetOptimaServices,
              private assetConstants: AssetOptimaConstants,
              private titleService: Title,
              private translateService: TranslateService,
              private dialog: MatDialog,
              private userSessionService: UserSessionService,
              private activatedRoute: ActivatedRoute,
              private assetOptimaConstants: AssetOptimaConstants) { 

                this.modelAccessModule=new ModuleAccessModel();
                this.assetPhysicalAuditHdrModel = new AssetPhysicalAuditHdrModel();
                this.pageSize = '100';
                this.pageIndex = '0';
                this.locationPageNumber = 1;
                this.phyAuditStatusPageNumber=1;
                this.approved = allAssetAuditStatus.APPROVED;
                this.rejected = allAssetAuditStatus.REJECTED;
                this.waitingForApproval = allAssetAuditStatus.WAITING_FOR_APPROVAL;


  }

  ngOnInit() {
    this.auditDataSource=[];
   this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_PHYSICAL_AUDIT'];
    this.titleService.setTitle(this.title);
    if(localStorage.getItem('locationId') !== null && localStorage.getItem('locationName') !== null){

      this.assetPhysicalAuditHdrModel.locationId = parseInt(localStorage.getItem('locationId'));
      this.assetPhysicalAuditHdrModel.locationName = localStorage.getItem('locationName');
    } else{
      this.assetPhysicalAuditHdrModel.locationName=this.userSessionService.getUserLocationName();
      this.assetPhysicalAuditHdrModel.locationId=this.userSessionService.getUserLocationId();  
    }
    localStorage.removeItem('locationId');
    localStorage.removeItem('locationName');
    this.assetPhysicalAuditHdrModel.direction = 'desc';
    this.assetPhysicalAuditHdrModel.columnName = 'createdDt';
    this.fetchList();
    this.selectedAssetList = [];
    this.enableActionBtn = true;
  }

  createAssetPhysicalAudit(){
    this.router.navigate(['home/asset/assetPhysicalAuditCreate']);
  }

  editAssetPhysicalAudit(mode){  
      localStorage.setItem('searchParameters', JSON.stringify(this.assetPhysicalAuditHdrModel));
      localStorage.setItem('auditType', JSON.stringify(this.selectedAssetList[0].auditType));  
      this.router.navigate(['home/asset/assetPhysicalAuditEdit/'+ this.selectedAssetList[0].assetPhyAuditHdrId +'/'+ this.selectedAssetList[0].locationId+'/'+mode]);
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.assetPhysicalAuditHdrModel.pageNumber = 0;
    this.assetPhysicalAuditHdrModel.columnName = event.active;
    this.assetPhysicalAuditHdrModel.direction = event.direction;
    this.fetchList();
  }
  
  searchPhysicalAudit() {
    if (this.assetPhysicalAuditHdrModel.scheduleFromDate != null) {
      this.assetPhysicalAuditHdrModel.scheduleFromDate = this.commonService.convertToDateStringyyyy_mm_dd(this.assetPhysicalAuditHdrModel.scheduleFromDate);
    }
    if (this.assetPhysicalAuditHdrModel.scheduleToDate != null) {
      this.assetPhysicalAuditHdrModel.scheduleToDate = this.commonService.convertToDateStringyyyy_mm_dd(this.assetPhysicalAuditHdrModel.scheduleToDate);
    }
    this.pageSize = '100';
    this.pageIndex = '0';
    localStorage.removeItem('searchParameters');
    this.fetchList();
    this.selectedItem=0;
  }

  clear(){
    this.assetPhysicalAuditHdrModel = new AssetPhysicalAuditHdrModel();
    this.ngOnInit();
    this.selectedItem=0;
  }

  fetchList(){
    this.assetPhysicalAuditHdrModel.pageNumber = Number(this.pageIndex);
    this.assetPhysicalAuditHdrModel.recordsPerPage = Number(this.pageSize);
    this.subLoader =true;
    this.auditDataSource=[];
    if (this.commonService.getPreviousUrl().includes('home/asset/assetPhysicalAuditEdit/')) {
      if(localStorage.getItem('searchParameters') != '' && localStorage.getItem('searchParameters') != null){
        this.assetPhysicalAuditHdrModel = JSON.parse(localStorage.getItem('searchParameters'));
        this.pageIndex = String(this.assetPhysicalAuditHdrModel.pageNumber);
        this.pageSize = String(this.assetPhysicalAuditHdrModel.recordsPerPage);
      }    
    }else{
      localStorage.removeItem('searchParameters');
    } 
    this.commonService.commonListService('fetchListOfAllAssetAudit.sams',this.assetPhysicalAuditHdrModel).subscribe(
      data => {
        if(data.success){
          this.subLoader =false;
          this.length = data.responseData.dataTotalRecCount;
          this.auditDataSource = data.responseData.dataList;  

        }else{
          this.subLoader =false;
        }
      },error =>{
        this.subLoader =false;
      }
    );
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.locationPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
        this.locationPageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollsyncLocation = false;
     }
    );
  }

  selectedLocationData(event) {
    if(event===undefined){
      this.assetPhysicalAuditHdrModel.locationName=null;
      this.assetPhysicalAuditHdrModel.locationId=0;
      this.locationPageNumber=1;
      this.locationCombo=[];
    }else{
      this.assetPhysicalAuditHdrModel.locationName=event.locDisplayField;
      this.assetPhysicalAuditHdrModel.locationId=event.locationId;
    }
  }

  selectedAssetList=[];
  selectAssetPhyAudit(element){
    const indentId = this.selectedAssetList.findIndex(data => data.assetPhyAuditHdrId === element.assetPhyAuditHdrId);
      
    this.enableActionBtn = false;
    if(indentId === -1){
      this.selectedAssetList.push(element);  
    }else{ 
      this.selectedAssetList.splice(indentId,1);   
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  selectAllAssetPhyAudits(event){
    this.selectAllAsset = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedAssetList = this.auditDataSource;
    }
    else{
      this.selectedAssetList = [];
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  checkApprovalValid(){
    
    if(this.selectedAssetList.length>0){      
      return !(this.selectedAssetList.findIndex(data => data.assetAuditStatusName !== "WAITING_FOR_APPROVAL" || data.approvalId == 0) === -1);
    }
    else
      return true;
  }

  checkEditValid(){
    
    if(this.selectedAssetList.length>0){      
       if (this.selectedAssetList.findIndex(data => data.assetAuditStatusName == "APPROVED") === -1){
        if(this.selectedAssetList.findIndex(data => data.assetAuditStatusName !== "REJECTED") === -1){
          return true;
        } else{
          return false;
        }
       } else{
        return true;
       }
    }
  }

  compareValue(element: any): boolean{
    if(this.selectedAssetList.length > 0){
      return this.selectedAssetList.findIndex(data => data.assetPhyAuditHdrId === element.assetPhyAuditHdrId) !== -1;
    }
    else{
      return false;
    }
  }

  PhyAuditWorkflowApproval(status){
    let result;
    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT], this.selectedAssetList,"");
    }
    else{
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT],this.selectedAssetList,"");
    }

    result.then(data=>{
      if(data){                
         this.ngOnInit();
      }
    })
  }

  loadStatusComboData(searchValue){
    this.scrollsyncPhyStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllMasterStatusCombo.sams', searchValue.term, processList.ASSET_AUDIT, '',
      this.recordsPerPageForCombo, this.phyAuditStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.phyAuditStatusPageNumber , this.phyAuditStatusCombo , data.responseData.comboList)
          this.phyAuditStatusPageNumber = this.getData.pageNumber;
          this.phyAuditStatusCombo = this.getData.dataList;
          this.scrollsyncPhyStatus = false;
        }
      );
  }

  selectedPhyAuditStatusData(event){
    console.log(event);
    

    if(event === undefined){
      this.assetPhysicalAuditHdrModel.assetAuditStatusId=0;
      this.assetPhysicalAuditHdrModel.phyAuditStatus = '';
    }else{
      this.assetPhysicalAuditHdrModel.assetAuditStatusId=event.processStatusId;
      this.assetPhysicalAuditHdrModel.phyAuditStatus = event.processStatusName;

      this.translateService.get([event.processStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.assetPhysicalAuditHdrModel.phyAuditStatus = status[0].toString();
      });
    }
  }

  dateValidation(event){
    return false;
  }

  generateReport() {
    this.commonService.commonListService('generatePhysiAuditSummaryReport.sams', this.assetPhysicalAuditHdrModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

}
