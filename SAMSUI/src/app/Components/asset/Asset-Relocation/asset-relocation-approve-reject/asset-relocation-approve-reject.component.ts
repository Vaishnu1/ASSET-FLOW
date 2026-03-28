import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { allWorkflowStatus } from '../../../../Constants/AllStatusConstants'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { getData } from 'src/app/Model/common/fetchListData';
import * as moment from 'moment';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { AssetTempAssigneeModel } from 'src/app/Model/asset/asset-temp-assignee-model';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';


@Component({
  selector: 'app-asset-relocation-approve-reject',
  templateUrl: './asset-relocation-approve-reject.component.html',
  styleUrls: ['./asset-relocation-approve-reject.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssetRelocationApproveRejectComponent implements OnInit {

  displayedColumns = ['sno','assetCode','assetGroupName','assetCategoryName', 'serialNo','assetStatus','relocateStatusName', 'avilableQty','delete'];
  innerDisplayedColumns = ['sno', 'fromAssignee', 'toAssignee', 'assigneeTypeName','endDt','primaryTechnician','secondaryTechnician','delete'];

  dataSource = [];

  @ViewChild('matAssignee') tableAssignee: MatTable<any>;
  public assetTempAssigneeForm: FormGroup;
  public assetTempAssigneeModel : AssetTempAssigneeModel;
  approvalFlag:boolean=false;
  disableApproveButton:boolean=false;

   //For Pagination
   length: String = '0';     //set total record count here

   subLoader: boolean = false;
   innerTblLength: string = '0';
   subloaderInnerTbl: boolean = false;

   //approvals
   public relocationId : any;
   public transactionSource: any;
   approvebuttonEnable: boolean = false;
   approve:string;
   employeeId: string = '0';
   approvalId: string = '0';
   mode:String;
   modeDisplay: boolean = false;
   asset_relocate = allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION]
   isViewMode: boolean = false;

   expandedElement: any | null;
   assigneeDataSource: any = [];
   assigneeDataSourceTemp: any = [];

   recordsPerPageForCombo: string;
   assignToPersonPageNumber: number = 0;
   getData: getData;
   assignToPersonCombo: any = [];

   assetTransferAssigneeList: any = [];
   approvalStatus: string;
   disableUpdateButton = false;
  assetAssigneeTypeNameCombo: any=[];
  assigneePageNumber: number;
  todayDate: any = new Date();

  errs : any = [];
  dataUpdate: boolean = true;

  constructor(public dialogRef: MatDialogRef<AssetRelocationApproveRejectComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRefs: ChangeDetectorRef,
              private userSessionService: UserSessionService,
              private dialog: MatDialog,
              private assetOptimaConstants: AssetOptimaConstants) {
          this.approve = 'APPROVED';
          this.assignToPersonPageNumber = 1;
          this.assigneePageNumber = 1;
              }

  ngOnInit() {


    this.getlistOfAsset();
    this.validateEditMode();

  }

  closeRelocationModal(){
    this.dialogRef.close();
  }

  getlistOfAsset(){
    this.subLoader = true;
    this.dataSource=[];
    this.commonService.commonGetService('listOfAllAssetDetails.sams', this.data.batchNo.toString()).subscribe(
      dataValue => {
          if (dataValue.success) {
            this.subLoader = false;
            this.dataSource = dataValue.responseData;
            for(let i=0;i<this.dataSource.length;i++){
              let ele = this.dataSource[i].assetTemporaryAssigneeList;
              this.errs.push('');
            }

            this.length = dataValue.responseData.length;
            this.approvalStatus = this.data.approvalStatus.toString();
            console.log(this.approvalStatus);
            
          }else{
            this.subLoader = false;
          }

          this.validateRecord();
      },error =>{
        this.subLoader =false;
      }
  );
  }

  removeAssets(assetRelocationId){

    this.dialogRefDelete = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': `"Registration Info"`
      }
    });
    this.dialogRefDelete.disableClose = true;
    this.dialogRefDelete.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonGetService('rejectRelocatedAsset.sams', assetRelocationId.toString()).subscribe(
            dataValue => {
                if (dataValue.success) {
                  this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
                  this.getlistOfAsset();
                }
            }
        );
      }
    })
  }

  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params =>{
        var primaryId = this.data.batchNo;
        var mode = this.data.mode;

        primaryId = Number(primaryId);
        this.relocationId = Number(primaryId);
        this.transactionSource = allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION];
      if(mode == 'view' || this.data.approvalStatus == 'APPROVED' || (this.data.approvalStatus.search('REJECTED') != -1)){
        this.isViewMode= true;
      }
      this.getWorkflowApprovalForAssetRelocate();
    });
  }

  getWorkflowApprovalForAssetRelocate() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.data.batchNo.toString(),this.userSessionService.getUserEmpId(),this.asset_relocate, this.userSessionService.getUserOrgId()).subscribe(
        data => {

          if (data.success) {
            this.employeeId = this.userSessionService.getUserEmpId();
            this.approvalId = data.responseData.workflowApprovalId;
            this.approvalFlag = data.responseData.approvalFlag;

          } else {
            this.commonService.openToastWarningMessage(data.message);

          }

          this.validateRecord();
        }, error => {
          console.log('line 3');

        }
      );
  }

  toggleRow(element: any) {

    if(element.assetHdrTO.volumeLicensePresent){
      this.innerDisplayedColumns = ['sno', 'fromAssignee', 'toAssignee','vlOldQty','vlNewQty', 'assigneeTypeName','endDt','primaryTechnician','secondaryTechnician','delete'];
    }else{
      this.innerDisplayedColumns = ['sno', 'fromAssignee', 'toAssignee', 'assigneeTypeName','endDt','primaryTechnician','secondaryTechnician','delete'];
    }

    this.expandedElement = this.expandedElement === element ? null : element;

    this.validateRecord();
  }

  loadAssignToComboData(searchValue) {
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, this.data.relocateDeptId > 0 ? this.data.relocateDeptId : '', '', this.recordsPerPageForCombo, this.assignToPersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assignToPersonPageNumber , this.assignToPersonCombo , data.responseData.comboList)
        this.assignToPersonPageNumber = this.getData.pageNumber;
        this.assignToPersonCombo = this.getData.dataList;
      }
    );
  }

  selectedAssignToPerson(event,element,i,j){
    if(event == undefined){
      this.dataSource[i].assetTemporaryAssigneeList[j].toAssigneeId = 0;
      this.dataSource[i].assetTemporaryAssigneeList[j].toAssigneeName = '';
      this.dataSource[i].assetTemporaryAssigneeList[j].assigneeTypeId = 0;
      this.dataSource[i].assetTemporaryAssigneeList[j].assigneeTypeName = '';
      this.dataSource[i].assetTemporaryAssigneeList[j].endDateDisp = '';
    }
    else{

      if (!(element.assetTemporaryAssigneeList.findIndex(data=> data.toAssigneeId == event.employeeId) == -1)) {
       this.commonService.openToastWarningMessage("Asset Is Already Assigned To This Employee.");


       setTimeout(() => {
        this.dataSource[i].assetTemporaryAssigneeList[j].toAssigneeId = 0;
        this.dataSource[i].assetTemporaryAssigneeList[j].toAssigneeName = '';
       }, 100);
       this.tableAssignee.renderRows();
       }else{
         this.dataSource[i].assetTemporaryAssigneeList[j].toAssigneeId=event.employeeId;
         this.dataSource[i].assetTemporaryAssigneeList[j].toAssigneeName=event.employeeFirstName;
         this.tableAssignee.renderRows();
       }
    }

    this.validateRecord();

  }


  save(){
    const obj = {
      'assetRelocateList': this.dataSource
    }

    this.commonService.commonInsertService('saveOrUpdateAssetTransferAssignee.sams', obj).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.getlistOfAsset();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  checkDefaultPI(element,index,j){

    for(let i=0;i<element.assetTemporaryAssigneeList.length;i++){
        if(i == j){
          setTimeout(() => {
            this.dataSource[index].assetTemporaryAssigneeList[j].defaultPersonIncharge = true;
            this.validateRecord();
           }, 100);
        }
        else{
          this.dataSource[index].assetTemporaryAssigneeList[i].defaultPersonIncharge = false;
        }
    }

  }


  vlQtyValidation(){

      this.validateRecord();
  }

  transferWorkflowApproval(status){

    let relocationList = [
      {
        approvalId: this.approvalId,
        batchNo: this.data.batchNo,
        locId: this.data.locId,
        relocateDeptId: this.data.relocateDeptId
      }
    ];

    let asd;
    if(status){
      asd = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION], relocationList," Asset Relocate Request ");
    }
    else{
      asd = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION],relocationList," Asset Relocate Request ");
    }

    asd.then(data=>{
      if(data){
         this.ngOnInit();
         this.closeRelocationModal();
      }
    })
  }

  loadAssigneeTypeComboData(searchValue) {
    this.recordsPerPageForCombo = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults('listOfAllAssigneeTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assigneePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assigneePageNumber , this.assetAssigneeTypeNameCombo , data.responseData.comboList)
        this.assigneePageNumber = this.getData.pageNumber;
        this.assetAssigneeTypeNameCombo = this.getData.dataList;
      }
    );
  }


  selectedAssigneeType(event,element){
    if(event === undefined){
      element.assigneeTypeId = 0;
      element.assigneeTypeName = '';
      this.assetAssigneeTypeNameCombo = [];
      this.assigneePageNumber = 1;
    }else{
        element.assigneeTypeId=event.assigneeTypeId;
        element.assigneeTypeName=event.assigneeTypeName;
    }

    this.validateRecord();
  }

  installationDateValidation(event,i,j){

    if(event.value){
      this.dataSource[i].assetTemporaryAssigneeList[j].endDateDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{

      this.dataSource[i].assetTemporaryAssigneeList[j].endDateDisp = ''
    }

    this.validateRecord();
    return false;
  }

  addTempAssetAssignee() {
    return {
      assetTemporaryId: 0,
      assigneeTypeId: 0,
      assigneeTypeName: '',
      active: '',
      assetId: 0,
      createdDtDisp: '',
      createdBy: '',
      createdDt: '',
      locationName: '',
      locationId: 0,
      fromAssigneeName: '',
      fromAssigneeId: 0,
      endDateDisp: '',
      endDate: '',
      toAssigneeId: 0,
      toAssigneeName: '',
      transactionId: 0,
      updatedBy: '',
      updatedDt: '',
      updatedDtDisp: '',
      updateflag: '',
      vlNewQty: 0,
      vlOldQty: 0
    }
  }

  addTempAssignee(i) {

    this.dataUpdate = false;
    this.dataSource[i].assetTemporaryAssigneeList.push(this.addTempAssetAssignee());

    if(this.dataSource[i].assetTemporaryAssigneeList.length == 1){
      let length = this.dataSource[i].assetTemporaryAssigneeList.length;
      this.dataSource[i].assetTemporaryAssigneeList[length-1].defaultPersonIncharge = true;
    }

    // this.tableAssignee.renderRows();

    this.changeDetectorRefs.detectChanges();

    this.validateRecord();

    this.dataUpdate = true;
  }

  dialogRefDelete;
  deleteRegistration(value, index,j) {

    this.dialogRefDelete = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': `"Registration Info"`
      }
    });
    this.dialogRefDelete.disableClose = true;
    this.dialogRefDelete.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.dataUpdate = false;
          if (value <= 0) {
            this.dataSource[index].assetTemporaryAssigneeList.splice(j,1);
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            this.changeDetectorRefs.detectChanges();
            this.validateRecord();
            this.dataUpdate = true;
          } else {
            this.commonService.commonGetService('deleteAssetTemporaryAssignee.sams', value).subscribe(
              data => {
                if (data.success) {
                  this.dataSource[index].assetTemporaryAssigneeList.splice(j,1);
                  this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
                  this.changeDetectorRefs.detectChanges();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
                this.validateRecord();
                this.dataUpdate = true;
              }
            );
          }
        }

      });


  }

  validateRecord(){

    let test1 = false;
    for (let i = 0; i < this.dataSource.length; i++) {
      var test = true;
      let disableUpdateButton = false;
      let disableUpdateButton2 = false;
      let disableUpdateButton3 = false;
      let disableUpdateButton4 = false;
      let disableUpdateButton5 = false;
      this.errs[i] = '';

      let vlqty = 0;

      for (let j = 0; j < this.dataSource[i].assetTemporaryAssigneeList.length; j++) {

        if(test && !disableUpdateButton){
           disableUpdateButton = this.dataSource[i].assetTemporaryAssigneeList.findIndex(data => (data.toAssigneeId > 0 && data.assigneeTypeId == 0)) != -1;

          if(disableUpdateButton){
            this.errs[i] = this.errs[i]+" Assignee type is required. "
          }
        }

        if(test && !disableUpdateButton5){
          disableUpdateButton5 = this.dataSource[i].assetTemporaryAssigneeList.findIndex(data => (data.fromAssigneeId == 0 && data.toAssigneeId == 0)) != -1;

         if(disableUpdateButton5){
           this.errs[i] = this.errs[i]+" Assignee to employee is required. "
         }
       }

        if(test && !disableUpdateButton2){
          disableUpdateButton2 = this.dataSource[i].assetTemporaryAssigneeList.findIndex(data => (data.toAssigneeId > 0 && data.endDateDisp == '')) != -1;

         if(disableUpdateButton2){
           this.errs[i] = this.errs[i]+' "Assigned End Date" is Required. ';
         }
       }

       vlqty = vlqty + this.dataSource[i].assetTemporaryAssigneeList[j].vlNewQty;

       if(!disableUpdateButton3){
            if(this.dataSource[i].assetHdrTO.volumeLicenseQty < vlqty){
              this.errs[i] = this.errs[i]+' "Volume License New Quantity" should not Exceed "Total Quantity". ';
              disableUpdateButton3 = true;
            }
        }

        if(test && !disableUpdateButton4 && this.dataSource[i].assetTemporaryAssigneeList[j].toAssigneeId > 0){
            disableUpdateButton4 = this.dataSource[i].assetTemporaryAssigneeList.findIndex(data => (data.toAssigneeId != 0)) == -1;

            if(disableUpdateButton4){
              this.errs[i] = this.errs[i]+' Select Atleast One "Person Incharge". ';
            }
          }

          if(disableUpdateButton || disableUpdateButton2 || disableUpdateButton3 || disableUpdateButton4 || disableUpdateButton5){
            test = false;
            test1 = true;
          }
          else{
            this.errs[i] = '';
          }

      }
    }

    this.disableUpdateButton = test1;
    if(this.approvalFlag && !this.isViewMode){
      this.approvebuttonEnable = !test1;
    }
  }

}
