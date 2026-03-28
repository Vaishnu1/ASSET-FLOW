import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatDialog  } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTabGroup } from '@angular/material/tabs';
import { BuildingBlockModel } from 'src/app/Model/building/building-block-model';
import { BuildingFloorModel } from 'src/app/Model/building/building-floor-model';
import { BuildingSegmentModel } from 'src/app/Model/building/building-segment';
import { BuildingRoomModel } from 'src/app/Model/building/building-room-model';
import { BuildingBlockCreateComponent } from 'src/app/Components/settings/Organization/building/building-module/building-block-create/building-block-create.component';
import { BuildingFloorCreateComponent } from 'src/app/Components/settings/Organization/building/building-module/building-floor-create/building-floor-create.component';
import { BuildingRoomCreateComponent } from 'src/app/Components/settings/Organization/building/building-module/building-room-create/building-room-create.component';
import { BuildingSegmentCreateComponent } from 'src/app/Components/settings/Organization/building/building-module/building-segment-create/building-segment-create.component';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { RoomLabelPrintComponent } from '../room-label-print/room-label-print.component';


@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {


  length: string = '0';
  pageIndex: string;
  pageSize: string;
  displayedLength :string='0';

  blockSubLoader: boolean = false;
  floorSubLoader: boolean = false;
  segmentSubLoader: boolean = false;
  roomSubLoader: boolean = false;

  tabs = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;


  displayedBlockColumns = ['select', 'sno', 'locationName', 'blockName', 'updatedBy', 'updatedDt']
  displayedFloorColumns = ['select', 'sno', 'locationName', 'blockId','floorName', 'updatedBy', 'updatedDt']
  displayedSegmentColumns = ['select', 'sno', 'locationName', 'segmentName', 'updatedBy', 'updatedDt'];
  displayedRoomColums = ['select', 'sno', 'locationName','buildingBlockTO.blockName','buildingFloorTO.floorName','buildingSegmentTO.segmentName' ,'roomName', 'updatedBy', 'updatedDt']

  scrollsyncLocation: Boolean = false;
  recordsPerPageForCombo: string;
  locationPageNumber: number;
  locationCombo: any = [];
  selectedIndex: number = 0;

  blockComboList: any = [];
  blockScrollSync: boolean = false;
  blockNamePageNumber: number;

  floorSrcollSync: boolean = false;
  floorNamePageNumber: number;
  floorComboList: any = [];

  segmentSrcollSync: boolean = false;
  segmentComboList: any = [];
  segmentNamePageNumber: number;

  blockModel: BuildingBlockModel;
  floorModel: BuildingFloorModel;
  segmentModel: BuildingSegmentModel;
  roomModel: BuildingRoomModel;

  buildingBlockDataSource: any = [];
  buildingFloorDataSource: any = [];
  buildingSegmentDataSource: any = [];
  buildingRoomDataSource: any = [];

  roomSrcollSync: boolean = false;
  roomComboList: any = [];
  roomNamePageNumber: number;

  modelAccessModule: ModuleAccessModel;

  floorDataLength: string = '0';
  blockDataLength: string = '0';
  segmentDataLength: string = '0';
  roomDataLength: string = '0';
  reportSubLoader :boolean=false;
  disableExportButton:boolean=false;

  status=[
    { id: 1, name: 'ACTIVE' },
    { id: 2, name: 'INACTIVE' }
  ]

  blockCreateForm: FormGroup
  getData: getData;

  selectedBuildingBlock: any = 0;
  selectedBuildingFloor: any = 0;
  selectedBuildingSegment: any = 0;
  selectedBuildingRoom: any = 0;

  activeDisplay: string = '';

  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private dialog: MatDialog,
    private userSession: UserSessionService,
    private assetOptimaConstants: AssetOptimaConstants) {
    this.locationPageNumber = 1;
    this.blockModel = new BuildingBlockModel();
    this.floorModel = new BuildingFloorModel();
    this.segmentModel = new BuildingSegmentModel();
    this.roomModel = new BuildingRoomModel();
    this.blockNamePageNumber = 1;
    this.floorNamePageNumber = 1;
    this.segmentNamePageNumber = 1;
    this.roomNamePageNumber=1;
    this.pageIndex = '0'; //set page number starts with zeroo
    this.pageSize = '100';
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_BUILDING'];

    this.blockModel.locationName = this.userSession.getUserLocationName();
    this.blockModel.locationId = this.userSession.getUserLocationId();

    this.floorModel.locationName = this.userSession.getUserLocationName();
    this.floorModel.locationId = this.userSession.getUserLocationId();

    this.segmentModel.locationName = this.userSession.getUserLocationName();
    this.segmentModel.locationId = this.userSession.getUserLocationId();
    
    this.roomModel.locationName = this.userSession.getUserLocationName();
    this.roomModel.locationId = this.userSession.getUserLocationId();

    this.searchDataOnTab();
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.searchDataOnTab();
  }


  selectedBranch(event){
    if (event === undefined) {
      this.blockModel.locationName = null;
      this.blockModel.locationId = 0;

      this.floorModel.locationName = null;
      this.floorModel.locationId = 0;

      this.segmentModel.locationName = null;
      this.segmentModel.locationId = 0;

      this.roomModel.locationName = null;
      this.roomModel.locationId = 0;

      this.locationPageNumber = 1;
      
      this.locationCombo = [];
    } else {
      this.blockModel.locationName = event.locationName;
      this.blockModel.locationId = event.locationId;

      this.floorModel.locationName = event.locationName;
      this.floorModel.locationId = event.locationId;

      this.segmentModel.locationName = event.locationName;
      this.segmentModel.locationId = event.locationId;

      this.roomModel.locationName = event.locationName;
      this.roomModel.locationId = event.locationId;

     // this.locationCombo=[];
    }
    
    this.blockModel.buildingBlockId=0;
    this.blockModel.blockName = null;
    this.blockComboList=[];
    this.blockNamePageNumber=1;
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
        }
      );
  }


  dialogRef;
  createBuildingBlock(block, mode) {
    this.dialogRef = this.dialog.open(BuildingBlockCreateComponent, {
      height: '350px',
      width: '500px',
      data: {
        'block': block,
        'mode': mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }


  getBlockNameComboData(searchValue) {
    this.blockScrollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term, this.blockModel.locationId>0 ? this.blockModel.locationId:0, '',
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

  selectedBlockName(event){
    if (event === undefined) {
      this.blockModel.buildingBlockId=0;
      this.blockModel.blockName='';
      this.blockNamePageNumber = 1;
    } else {
      this.blockModel.blockName=event.blockName;
      this.blockModel.buildingBlockId=event.buildingBlockId;
    }
  }

  searchBlock(event) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchBlockList();
    this.resetElement();
  }

  clearBlockData() {
    let locationId = this.blockModel.locationId;
    let locationName = this.blockModel.locationName;

    this.blockModel = new BuildingBlockModel();
    
    this.blockModel.locationId = locationId;
    this.blockModel.locationName = locationName;
    this.fetchBlockList();
    this.resetElement();
  }

  getFloorNameComboData(searchValue) {
    this.floorSrcollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, this.floorModel.locationId>0 ? this.floorModel.locationId: 0,this.floorModel.blockId>0? this.floorModel.blockId :0,
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

  selectedFloorName(event){
    if (event === undefined) {
    this.floorModel.floorName = '';
    this.floorModel.buildingFloorId = 0;
    this.floorNamePageNumber = 1;
    this.floorComboList = [];
  } else {
    this.floorModel.floorName = event.floorName;
    this.floorModel.buildingFloorId = event.buildingFloorId;
  }
  }

  clearFloorData() {
    this.floorModel = new BuildingFloorModel();
    
    this.floorModel.locationId = this.blockModel.locationId;
    this.floorModel.locationName = this.blockModel.locationName;

    this.fetchFloorList();
    this.resetElement();
  }

  searchFloor(event) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchFloorList();
    this.resetElement();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  createBuildingFloor(floor, mode) {
    this.dialogRef = this.dialog.open(BuildingFloorCreateComponent, {
      height: '350px',
      width: '500px',
      data: {
        'floor': floor,
        'mode': mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.clearFloorData();
      });
  }

  getSegmentNameComboData(searchValue) {
    this.segmentSrcollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term,
     this.segmentModel.locationId>0 ? this.segmentModel.locationId :0, '',
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


  selectedSegmentName(event){
    if (event === undefined) {
    this.segmentModel.segmentName = '';
    this.segmentModel.buildingSegmentId = 0;
    this.segmentNamePageNumber = 1;
    this.segmentComboList = [];
  } else {
    this.segmentModel.segmentName = event.segmentName;
    this.segmentModel.buildingSegmentId = event.buildingSegmentId;
  }
  }


  searchSegment(event) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchSegmentData();
    this.resetElement();
  }

  clearSegmentData() {
    this.segmentModel = new BuildingSegmentModel();

    this.segmentModel.locationId = this.blockModel.locationId;
    this.segmentModel.locationName = this.blockModel.locationName;
    this.fetchSegmentData();
    this.resetElement();
  }

  createBuildingSegment(segment, mode) {
    this.dialogRef = this.dialog.open(BuildingSegmentCreateComponent, {
      height: '350px',
      width: '500px',
      data: {
        'segment': segment,
        'mode': mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.clearSegmentData();
      })
  }

  getRoomComboData(searchValue) {
    this.roomSrcollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term, this.roomModel.locationId>0? this.roomModel.locationId: 0,
    this.roomModel.floorId>0 ? this.roomModel.floorId :0,
      this.recordsPerPageForCombo, this.roomNamePageNumber,this.roomModel.blockId>0 ? this.roomModel.blockId :0).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.roomNamePageNumber , this.roomComboList , data.responseData.comboList)
          this.roomNamePageNumber = this.getData.pageNumber;
          this.roomComboList = this.getData.dataList;
          this.roomSrcollSync = false;
        }
      );
  }

  selectedRoomName(event){if (event === undefined) {
    this.roomModel.roomName = '';
    this.roomModel.buildingRoomId = 0;
    this.roomNamePageNumber = 1;
    this.roomComboList = [];
  } else {
    this.roomModel.roomName = event.roomName;
    this.roomModel.buildingRoomId = event.buildingRoomId;
  }
  }



  searchRoom(event) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchRoomData();
    this.resetElement();
  }

  clearRoomDate() {
    this.roomModel = new BuildingRoomModel();
    
    this.roomModel.locationId = this.blockModel.locationId;
    this.roomModel.locationName = this.blockModel.locationName;
    this.fetchRoomData();
    this.resetElement();
  }

  createBuildingRoom(room, mode) {
    this.dialogRef = this.dialog.open(BuildingRoomCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'room': room,
        'mode': mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.clearRoomDate();
      });
  }

  fetchBlockList() {
    this.blockSubLoader = true;
    this.blockModel.pageNumber = Number(this.pageIndex);
    this.blockModel.recordsPerPage = Number(this.pageSize);
    this.buildingBlockDataSource = [];
    this.commonService.commonListService(this.assetOptimaServices.fectchListOfAllBlock, this.blockModel).subscribe(
      data => {
        if (data.success) {
          this.blockDataLength = data.responseData.dataTotalRecCount;
          this.buildingBlockDataSource = data.responseData.dataList;
          this.displayedLength= this.blockDataLength;
          if(this.blockDataLength =='0'){
            this.disableExportButton=true;
          }else{
            this.disableExportButton=false;
          }
          this.blockSubLoader = false;
        } else {
          this.blockSubLoader = false;
        }
      }, error => {
        this.blockSubLoader = false;
      }

    );
  }

  fetchFloorList() {
    this.floorSubLoader = true;
    this.floorModel.pageNumber = Number(this.pageIndex);
    this.floorModel.recordsPerPage = Number(this.pageSize);
    this.buildingFloorDataSource = [];
    this.commonService.commonListService(this.assetOptimaServices.fectchListOfAllFloor, this.floorModel).subscribe(
      data => {
        if (data.success) {
          this.floorSubLoader = false;
          this.floorDataLength = data.responseData.dataTotalRecCount;
          this.buildingFloorDataSource = data.responseData.dataList;
          this.displayedLength= this.floorDataLength;
        } else {
          this.floorSubLoader = false;
        }
      }, error => {
        this.floorSubLoader = false;
      }

    );
  }

  fetchSegmentData() {
    this.segmentSubLoader = true;
    this.segmentModel.pageNumber = Number(this.pageIndex);
    this.segmentModel.recordsPerPage = Number(this.pageSize);
    this.buildingSegmentDataSource = [];
    this.commonService.commonListService(this.assetOptimaServices.fectchListOfAllSegment, this.segmentModel).subscribe(
      data => {
        if (data.success) {
          this.segmentSubLoader = false;
          this.segmentDataLength = data.responseData.dataTotalRecCount;
          this.buildingSegmentDataSource = data.responseData.dataList;
          this.displayedLength=this.segmentDataLength;
        } else {
          this.segmentSubLoader = false;
        }
      }, error => {
        this.segmentSubLoader = false;
      }

    );
  }

  fetchRoomData() {
    this.roomSubLoader = true;
    this.roomModel.pageNumber = Number(this.pageIndex);
    this.roomModel.recordsPerPage = Number(this.pageSize);
    this.buildingRoomDataSource = [];
    this.commonService.commonListService(this.assetOptimaServices.fectchListOfAllRoom, this.roomModel).subscribe(
      data => {
        if (data.success) {
          this.roomSubLoader = false;
          this.roomDataLength = data.responseData.dataTotalRecCount;
          this.buildingRoomDataSource = data.responseData.dataList;
          this.displayedLength=this.roomDataLength;
        } else {
          this.roomSubLoader = false;
        }
      }, error => {
        this.roomSubLoader = false;
      }

    );
  }

  activeTab(event) {
    this.selectedIndex = event.index;
    if(event.index==0){
      this.blockModel.direction = 'asc';
      this.blockModel.columnName = 'blockName';
      this.blockModel.activeDisplay='ACTIVE';
      this.blockModel.activeDisp=true;
      this.fetchBlockList();
    }else if(event.index==1){

      this.floorModel.direction = 'asc';
     this.floorModel.columnName = 'floorName';
     this.floorModel.activeDisp=true;
     this.floorModel.activeDisplay='ACTIVE';
     this.floorModel.locationName= this.blockModel.locationName;
       this.floorModel.locationId = this.blockModel.locationId;
     this.fetchFloorList();
     this.displayedLength= this.floorDataLength
    }else if(event.index==2){
      this.segmentModel.direction = 'asc';
      this.segmentModel.columnName = 'segmentName';
      this.segmentModel.activeDisplay='ACTIVE';
      this.segmentModel.activeDisp=true;
      this.segmentModel.locationName= this.blockModel.locationName;
      this.segmentModel.locationId = this.blockModel.locationId;
      this.fetchSegmentData();
      this.displayedLength=this.segmentDataLength;
    }else if(event.index==3){
      this.roomModel.direction = 'asc';
      this.roomModel.columnName = 'roomName';
      this.roomModel.activeDisplay='ACTIVE';
      this.roomModel.activeDisp=true;
      this.roomModel.locationName= this.blockModel.locationName;
      this.roomModel.locationId = this.blockModel.locationId;
      this.fetchRoomData();
      this.displayedLength=this.roomDataLength;
    }
    

  }

  customBlockSort(event){
    this.blockModel.pageNumber = 0;
    this.blockModel.columnName = event.active;
    this.blockModel.direction = event.direction;
    this.fetchBlockList();
  }

  customRoomSort(event){
    this.roomModel.pageNumber = 0;
    this.roomModel.columnName = event.active;
    this.roomModel.direction = event.direction;
    this.fetchRoomData();
  }

  customSegmentSort(event){
    this.segmentModel.pageNumber = 0;
    this.segmentModel.columnName = event.active;
    this.segmentModel.direction = event.direction;
    this.fetchSegmentData();
  }

  customFloorSort(event){
    this.floorModel.pageNumber = 0;
    this.floorModel.columnName = event.active;
    this.floorModel.direction = event.direction;
    this.fetchFloorList();
  }

   generateBuildingreport(){
    this.blockModel.recordsPerPage = 0;
    this.reportSubLoader=true;
    this.blockModel.activeDisplay='';
    this.commonService.commonListService('generateBuildingReport.sams', this.blockModel).subscribe(
      (data) => {
        this.reportSubLoader=false;
        this.commonService.openToastSuccessMessage('Download Successful.')
        this.downloadDocument(data.responseData);
      }, error => {
        this.reportSubLoader=false;

      });
   }

   downloadDocument(filePath: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  clearSearch(){
    this.blockModel.locationName = this.userSession.getUserLocationName();
    this.blockModel.locationId = this.userSession.getUserLocationId();
    
    this.clearBlockData();
    this.clearFloorData();
    this.clearSegmentData();
    this.clearRoomDate();
    this.tabGroup.selectedIndex=0;
    this.selectedIndex=0;
    this.ngOnInit();
    this.resetElement();
  }

  onSearchChange(event){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.searchDataOnTab();
    this.resetElement();
  }

  selectedBlockForSearch(event){
    if(event===undefined){
      this.floorModel.blockId=0;
      this.roomModel.blockId=0;
      this.blockNamePageNumber = 1;
      this.blockComboList = [];
    }else{
      this.floorModel.blockId=event.buildingBlockId;
      this.roomModel.blockId=event.buildingBlockId;
    }
  }

  changeSegmentStatus(event){
    if(event.id==1){
      this.segmentModel.activeDisp=true;
    }else{
      this.segmentModel.activeDisp=false;
    }
  }

  changeFloorStatus(event){
    if(event.id==1){
      this.floorModel.activeDisp=true;
    }else{
      this.floorModel.activeDisp=false;
    }
  }

  changeActiveFlag(event){
    if(event.id==1){
      this.activeDisplay = event.activeDisplay;
      this.floorModel.activeDisp=true;
      this.segmentModel.activeDisp=true;
      this.roomModel.activeDisp=true;
      this.blockModel.activeDisp=true;
    }else{
      this.activeDisplay = "";
      this.floorModel.activeDisp=false;
      this.segmentModel.activeDisp=false;
      this.roomModel.activeDisp=false;
      this.blockModel.activeDisp=false;
    }
  }

  changeRoomStatus(event){
    if(event.id==1){
      this.roomModel.activeDisp=true;
    }else{
      this.roomModel.activeDisp=false;
    }
  }
  changeBlockStatus(event){
    if(event.id==1){
      this.blockModel.activeDisp=true;
    }else{
      this.blockModel.activeDisp=false;
    }
  }

  selectBuildingBlock(element){
    if(this.selectedBuildingBlock.buildingBlockId == element.buildingBlockId){
      this.selectedBuildingBlock = 0;
    }
    else{
      this.selectedBuildingBlock = element;
    }
  }

  selectBuildingFloor(element){
    if(this.selectedBuildingFloor.buildingFloorId == element.buildingFloorId){
      this.selectedBuildingFloor = 0;
    }
    else{
      this.selectedBuildingFloor = element;
    }
  }

  selectBuildingSegment(element){
    if(this.selectedBuildingSegment.buildingSegmentId == element.buildingSegmentId){
      this.selectedBuildingSegment = 0;
    }
    else{
      this.selectedBuildingSegment = element;
    }
  }

  selectBuildingRoom(element){
    if(this.selectedBuildingRoom.buildingRoomId == element.buildingRoomId){
      this.selectedBuildingRoom = 0;
    }
    else{
      this.selectedBuildingRoom = element;
    }
  }

  resetElement(){
    this.selectedBuildingBlock = 0;
    this.selectedBuildingFloor= 0;
    this.selectedBuildingSegment = 0;
    this.selectedBuildingRoom= 0;
  }

  searchDataOnTab(){
    if(this.selectedIndex == 0){
      this.fetchBlockList();
    }
    else if(this.selectedIndex == 1){
      this.fetchFloorList();
    }
    else if(this.selectedIndex == 2){
      this.fetchSegmentData();
    }
    else if(this.selectedIndex == 3){
      this.fetchRoomData();
    }
  }

  bulkRoomPrint() {
    console.log('Selected Rooms for Print: ', this.selectedBuildingRoom);
  if (this.selectedBuildingRoom) {
    this.generateAssetLabelPrint(this.selectedBuildingRoom.roomName ? [this.selectedBuildingRoom.roomName] : []);
  } else {
    this.commonService.openToastWarningMessage("Kindly select at least one room.");
  }
}

generateAssetLabelPrint(selectedRooms: any[]) {
  const dialogRef = this.dialog.open(RoomLabelPrintComponent, {
    width: "400px",
    height: "auto",
    disableClose: true,
    data: {
      assetList: selectedRooms
    }
  });

  dialogRef.afterClosed().subscribe(res => {
    // future actions if needed
  });
}


}

