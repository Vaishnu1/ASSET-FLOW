import { Component, Inject, OnInit } from '@angular/core';
import { LocationCreateComponent } from '../location-create.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { subDepartmentModel } from 'src/app/Model/master/subDepartment';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { Location } from '@angular/common';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-department-subdepartment-create',
  templateUrl: './department-subdepartment-create.component.html',
  styleUrls: ['./department-subdepartment-create.component.css']
})
export class DepartmentSubdepartmentCreateComponent implements OnInit {

   displayedSubDepartmentColumns = ['sno', 'Select', 'departmentName', 'reportingInchargeName', 'designation', 'block', 'floor', 'room', 'segment'];
  headingDisplay :string;
  locSubDepartmentTO = [];
  subDeptForm: FormGroup;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  blockScrollsync: boolean = false;
  floorScrollsync: boolean = false;
  roomScrollsync: boolean = false;
  segmentScrollsync: boolean = false;
  personscrollsync: boolean = false;
  designationScrollsync: boolean = false;
  designationList: any[] = [];
  inchargeNameList: any[] = [];
  blockList: any[]=[];
  floorList: any[]=[];
  roomList: any[]=[];
  segmentList: any[]=[];
  inchargePageNumber: number;
  subDepartmentPageNumber: number;
  blockPageNumber: number;
  floorPageNumber: number;
  roomPageNumber: number;
  segmentPageNumber: number;
  modeDisplay: boolean = false;
  limitCount: any;
  getData: getData;
  selectAllFlag: boolean = false;
  locDepartId:number;
  buttonType: string;
  displayButton: string;
  uploadLocationFlag: boolean =false;
  locDeptIndex:number;
  locDepartmentList=[];
  subLoader: boolean = false;
  locSubDepartmentList = [];
  
  public subdepartment: subDepartmentModel;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    public locatDialog: MatDialogRef<LocationCreateComponent>,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private userSession: UserSessionService,
    private readonly samsService: AssetOptimaServices,
    private readonly location: Location,
    private readonly assetOptimaConstants: AssetOptimaConstants,
    private readonly router: Router) { 
      this.subdepartment = new subDepartmentModel();
      this.pageSize = '1000';
      this.pageIndex = '0';
      this.inchargePageNumber = 1;
      this.subDepartmentPageNumber = 1;
      this.blockPageNumber = 1;
      this.floorPageNumber = 1;
      this.roomPageNumber = 1;
      this.segmentPageNumber = 1;
    }

  ngOnInit(): void {
    this.locDepartmentList = this.data.locDeptList;
    this.locDeptIndex = this.data.locDeptIndex;
     this.locDepartId = this.data.locDeptId;
     this.buttonType = this.data.headType;
    this.subDeptForm = new FormGroup({
      locDepartmentId: new FormControl(this.locDepartId),
      designationName: new FormControl(''),
      locSubDepartName: new FormControl(''),
      locationId: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      locSubDepartmentTO: new FormControl([])
    });

    this.uploadLocationFlag = false;
    if(this.buttonType == 'Add'){
      this.headingDisplay = 'Add';
      this.displayButton = 'Submit';
      this.subdepartment.departmentId = this.locDepartId;
      this.fetchSubDeptList();
    } else if(this.buttonType == 'Edit'){
      this.headingDisplay = 'Update';
      this.displayButton = 'Update';
      this.fetchLocSubDeptList(this.locDepartId);
    } else{
      this.headingDisplay = 'View';
      this.fetchLocSubDeptList(this.locDepartId);
    }
  }
  closeSubDeptCreateModal(isClosed){
    if(isClosed){
      this.locatDialog.close({'exit':true , 'locDeptIndex':-1, 'locSubDeptList':[]});
    } else{
      this.subDeptForm.controls.locSubDepartmentTO.setValue(this.locSubDepartmentTO);
      for (let i = 0; this.locSubDepartmentTO.length > i; i++) {
        if(this.locSubDepartmentTO[i].active){
          this.locSubDepartmentList[i] =  this.locSubDepartmentTO[i];
        }
      }
      this.commonService.openToastSuccessMessage("Sub-Department Added successfully !");
      this.locatDialog.close({'exit':false , 'locDeptIndex':this.locDeptIndex, 'locSubDeptList':this.locSubDepartmentList});
      
    }
  }

  fetchSubDeptList(){
    this.subLoader = true;
    this.subdepartment.pageNumber = Number(this.pageIndex);
    this.subdepartment.recordsPerPage = Number(this.pageSize);
    this.locSubDepartmentTO = [];
    this.commonService.commonListService('fetchListOfAllSubDepartment.sams',this.subdepartment).subscribe(
      data => {
        if(data.success){
          this.subLoader =false;
           this.length = data.responseData.dataTotalRecCount;
           this.locSubDepartmentTO = data.responseData.dataList;
           for (let i = 0; this.locSubDepartmentTO.length > i; i++) {
            this.locSubDepartmentTO[i].active = false;
          }
        } else{
          this.subLoader =false;    
        } 
      }, error => {
        this.subLoader = false;
      }
    );
    localStorage.setItem('previousRoute', this.router.url);
    
   }

  //  listOfPersonInCharge(searchValue) {
  //   this.personscrollsync = true;
  //   this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  //   this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '', this.limitCount, this.inchargePageNumber).subscribe(
  //     (data) => {
  //       this.getData = new getData();
  //       this.getData = this.commonService.fetchDataList(searchValue, this.inchargePageNumber , this.inchargeNameList , data.responseData.comboList)
  //       this.inchargePageNumber = this.getData.pageNumber;
  //       this.inchargeNameList = this.getData.dataList;
  //       this.personscrollsync = false;
  //     }
  //   );
  // }

  listOfPersonInCharge(searchValue) {
    if (this.data.locationId > 0) {
      this.personscrollsync = true;
      const locId = this.data.locationId;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listOfAllEmployeeComboByLocId.sams', 0, searchValue.term, locId, this.limitCount, this.inchargePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.inchargePageNumber, this.inchargeNameList, data.responseData.comboList)
          this.inchargePageNumber = this.getData.pageNumber;
          this.inchargeNameList = this.getData.dataList;
          this.personscrollsync = false;
        }
      );
    } else {
      this.personscrollsync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '', this.limitCount, this.inchargePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.inchargePageNumber, this.inchargeNameList, data.responseData.comboList)
          this.inchargePageNumber = this.getData.pageNumber;
          this.inchargeNameList = this.getData.dataList;
          this.personscrollsync = false;
        }
      );
    }

  }

  //List of designation
  listOfDesignation(searchValue) {
    this.designationScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfAllDesignationCombo, searchValue.term, '', '', this.limitCount, this.subDepartmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumber , this.designationList , data.responseData.comboList)
        this.subDepartmentPageNumber = this.getData.pageNumber;
        this.designationList = this.getData.dataList;
        this.designationScrollsync = false;
      }
    );
  }

  listOfBlock(searchValue) {
    this.blockScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term, '', '', this.limitCount, this.blockPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.blockPageNumber , this.blockList, data.responseData.comboList)
        this.blockPageNumber = this.getData.pageNumber;
        this.blockList = this.getData.dataList;
        this.blockScrollsync = false;
      }
    );
  }

  listOfFloor(searchValue) {
    this.floorScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, '', '', this.limitCount, this.floorPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.floorPageNumber , this.floorList , data.responseData.comboList)
        this.floorPageNumber = this.getData.pageNumber;
        this.floorList = this.getData.dataList;
        this.floorScrollsync = false;
      }
    );
  }

  listOfRoom(searchValue) {
    this.roomScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term, '', '', this.limitCount, this.roomPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.roomPageNumber , this.roomList , data.responseData.comboList)
        this.roomPageNumber = this.getData.pageNumber;
        this.roomList = this.getData.dataList;
        this.roomScrollsync = false;
      }
    );
  }

  listOfSegment(searchValue) {
    this.segmentScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term, '', '', this.limitCount, this.segmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.segmentPageNumber , this.segmentList , data.responseData.comboList)
        this.segmentPageNumber = this.getData.pageNumber;
        this.segmentList = this.getData.dataList;
        this.segmentScrollsync = false;
      }
    );
  }

  selectOne(event,index){
    if (!event) {
      // this.locDepartmentList[index].inchargeName ='';
      // this.locDepartmentList[index].designation ='';
      // this.locationCreateFormGroup.controls.locDepartmentList.setValue(this.locDepartmentList);
    }
  }

  selectAll(value: boolean) {
    for (let i = 0; this.locSubDepartmentTO.length > i; i++) this.locSubDepartmentTO[i].active = value;
  }

  submitSubDept(){

    this.uploadLocationFlag = true;    
    // this.locDepartmentList[0] = this.locSubDepartmentTO;
    this.subDeptForm.controls.locSubDepartmentTO.setValue(this.locSubDepartmentTO);
    this.commonService.commonInsertService('saveOrUpdateLocSubDept.sams', this.subDeptForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.closeSubDeptCreateModal(false);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
    this.uploadLocationFlag = false;
  }

  fetchLocSubDeptList(locDeptId){
    this.commonService.commonGetService('loadSubDepartmentInfo.sams', locDeptId).subscribe(
      data => {
        if(data.success){
          this.locSubDepartmentTO = data.responseData.dataList;
          this.length = data.responseData.dataTotalRecCount;
        } 
      },error => {
      }
    );
  }

  getEmployeeValue(event, index) {
    // this.subDeptForm.controls.designationName.setValue(event.designationName);
    if (event === undefined) {
      this.locSubDepartmentTO[index].inchargeId=0;
      this.locSubDepartmentTO[index].designationId=0;
      this.locSubDepartmentTO[index].designation='';
      this.inchargePageNumber = 1;
      this.inchargeNameList = [];
    } else {
      this.locSubDepartmentTO[index].inchargeId=event.employeeId;
      this.locSubDepartmentTO[index].designationId=event.designationId;
      this.locSubDepartmentTO[index].designation=event.designationName;

    }
  }

  getBlockValue(event,index) {
    if (event === undefined) {
      this.locSubDepartmentTO[index].buildingBlockId=0;
      this.blockPageNumber = 1;
      this.blockList = [];
    } else {
      this.locSubDepartmentTO[index].buildingBlockId=event.buildingBlockId;
    }
  }

  getFloorValue(event,index) {
    if (event === undefined) {
      this.locSubDepartmentTO[index].buildingFloorId=0;
      this.floorPageNumber = 1;
      this.floorList = [];
    } else {
      this.locSubDepartmentTO[index].buildingFloorId=event.buildingFloorId;
    }
  }

  getRoomValue(event,index) {
    if (event === undefined) {
      this.locSubDepartmentTO[index].buildingRoomId=0;
      this.roomPageNumber = 1;
      this.roomList = [];
    } else {
      this.locSubDepartmentTO[index].buildingRoomId=event.buildingRoomId;
    }
  }

  getSegmentValue(event,index) {
    if (event === undefined) {
      this.locSubDepartmentTO[index].buildingSegmentId=0;
      this.segmentPageNumber = 1;
      this.segmentList = [];
    } else {
      this.locSubDepartmentTO[index].buildingSegmentId=event.buildingSegmentId;
    }
  }

  

}
