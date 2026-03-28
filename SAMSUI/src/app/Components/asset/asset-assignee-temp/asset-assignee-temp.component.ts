import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import * as moment from 'moment';
import { allAssetStatusType } from 'src/app/Constants/AllStatusConstants';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { processList } from 'src/app/Constants/ProcessList';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';
import { AssetHistoryComponent } from '../Asset/asset-history/asset-history.component';

@Component({
  selector: 'app-asset-assignee-temp',
  templateUrl: './asset-assignee-temp.component.html',
  styleUrls: ['./asset-assignee-temp.component.css']
})
export class AssetAssigneeTempComponent implements OnInit {

  displayedColumns = ['sno', 'toAssigneeId','vlOldQty','vlNewQty', 'assigneeTypeId', 'endDate',
  'defaultPersonIncharge','action'];
  assetAssigneeListTempPush=[];

  @ViewChild('matAssignee') tableAssignee: MatTable<any>;
  public assetAssigneeForm: FormGroup;

  assetAssigneeList: any=[];
  isViewMode: boolean= false;
  isVolumeLicensePresent: boolean = false;
  trackedLicence: boolean = false;
  recordsPerPageForCombo: string;
  getData: getData;
  subLoader = false;
  length :number = 0;
  totalVlQty :number = 0;

  assigneePageNumber: number;
  assetAssigneeTypeNameCombo: any=[];

  assignToPersonPageNumber: number;
  assignToPersonCombo: any=[];

  departmentId: number=0;
  formGroup: FormGroup;

  todayDate: any = new Date();

  unassignedStatusType = allAssetStatusType.AST_STS_TYP_UNASSIGNED;

  constructor(private commonService: CommonService,
    private dialogRef: MatDialogRef<AssetHistoryComponent>, @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    private assetOptimaConstants: AssetOptimaConstants,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder) {
      this.getData = new getData();
      this.assigneePageNumber = 1;
      this.assignToPersonPageNumber = 1;
    }

  ngOnInit(): void {
    this.isVolumeLicensePresent = this.data.volumeLicensePresent;
    this.trackedLicence = this.data.trackLicence;
    this.totalVlQty = this.data.totalVlQty;

    this.departmentId = this.data.newDepartmentId;
    this.isViewMode=this.data.isViewMode;
    if(!this.isVolumeLicensePresent){
      this.displayedColumns = ['sno', 'toAssigneeId', 'assigneeTypeId', 'endDate', 'defaultPersonIncharge', 'action'];
    }

    this.formGroup = this.formBuilder.group({
      assetAssigneeData: this.formBuilder.array([
      ])
    });


    this.getSelectValues(true);
  }

  getSelectValues(status){

    let tempAssigneeList={
      transactionId: this.data.assetPhyAuditHdrId,
      assetId: this.data.assetId,
      processId: processList.ASSET_AUDIT
    }

    this.commonService.commonListService('fetchListOfAssetTemporaryAssignees.sams', tempAssigneeList).subscribe(
      data => {

      if (data.success && data.responseData.dataTotalRecCount > 0) {
        if(status){
        this.data.assetTemporaryAssigneeList = data.responseData.dataList;

        for(let i=0;i<=this.data.assetTemporaryAssigneeList.length-1;i++){

          const control = <FormArray>this.formGroup.controls['assetAssigneeData'];
          control.push(this.getParticipant());
          this.formGroup.controls['assetAssigneeData']['controls'][i].patchValue(data.responseData.dataList[i]);

        }
       }
       else{
          this.dialogRef.close({'status':status,'response': data.responseData.dataTotalRecCount});
       }
      }

      if(!status && data.responseData.dataTotalRecCount === undefined){
        this.dialogRef.close({'status':status,'response': 0});
      }
  }
  );
}

  private getParticipant(){
    return this.formBuilder.group({
      assetTemporaryId :[0],
      toAssigneeId: [''],
      toAssigneeName: ['',[Validators.required]],
      assetId: [this.data.assetId],
      assigneeTypeId: [''],
      endDateDisp: [''],
      endDate: [''],
      assigneeTypeName: ['',[Validators.required]],
      defaultPersonIncharge: [''],
      vlNewQty: [0],
      vlOldQty: [0],
      volumeLicensePresent: [''],
      updateflag:[''],
      active:[true],
      fromAssigneeId:[0],
      fromAssigneeName:[''],
      createdDt:[''],
      createdBy:[''],
      transactionId: [this.data.assetPhyAuditHdrId],
      processId: processList.ASSET_AUDIT,
      locationId: this.data.locationId
    });
  }

  onAdd() {

    const control = <FormArray>this.formGroup.controls['assetAssigneeData'];
    control.push(this.getParticipant());

    if(this.isVolumeLicensePresent && !this.trackedLicence){
          this.formGroup.controls['assetAssigneeData']['controls'][(this.formGroup.controls['assetAssigneeData']['controls'].length-1)]['controls']['vlNewQty'].setValidators([Validators.required,Validators.pattern(this.assetOptimaConstants.numericValidation),Validators.min(1) ]);
        }
  }

  checkDefaultPIC(index) {    
    for(let i=0;i<this.formGroup.controls['assetAssigneeData']['controls'].length;i++){
        if(i == index){
          this.formGroup.controls['assetAssigneeData']['controls'][i]['controls']['defaultPersonIncharge'].setValue(true);
        }
        else{
          this.formGroup.controls['assetAssigneeData']['controls'][i]['controls']['defaultPersonIncharge'].setValue(false);
        }
    }
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


  selectedAssigneeType(event, index) {

    if (event === undefined) {
      this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['assigneeTypeName'].setValue('');
      this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['assigneeTypeId'].setValue(0);

      this.assigneePageNumber = 1;
      this.assetAssigneeTypeNameCombo = [];

    } else {
      this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['assigneeTypeName'].setValue(event.assigneeTypeName);
      this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['assigneeTypeId'].setValue(event.assigneeTypeId);
    }
  }


  loadAssignToComboData(searchValue) {
    const departmentId = this.departmentId;
    this.recordsPerPageForCombo = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults('listOfAllEmployeeComboByLocId.sams', searchValue.term, 0, this.data.locationId, this.recordsPerPageForCombo, this.assignToPersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assignToPersonPageNumber , this.assignToPersonCombo , data.responseData.comboList)
        this.assignToPersonPageNumber = this.getData.pageNumber;
        this.assignToPersonCombo = this.getData.dataList;
      }
    );
  }

  selectedAssignToPerson(event, index) {
    if (event === undefined) {
      this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['toAssigneeId'].setValue(0);
      this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['toAssigneeName'].setValue('');

      this.assignToPersonPageNumber = 1;
      this.assignToPersonCombo = [];
    }
    else{
      if(this.formGroup.controls['assetAssigneeData']['controls'].findIndex(data=> data['controls']['toAssigneeId'].value == event.employeeId && data['controls']['active'].value == true) == -1){
        this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['toAssigneeId'].setValue(event.employeeId);
        this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['toAssigneeName'].setValue(event.employeeFirstName);
      }
      else{
        this.commonService.openToastWarningMessage("Asset Is Already Assigned To This Employee.");
        this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['toAssigneeId'].setValue(0);
        this.formGroup.controls['assetAssigneeData']['controls'][index]['controls']['toAssigneeName'].setValue('')
      }
    }

  }

  installationDateValidation(event,i){

    if(event.value){
      this.formGroup.controls['assetAssigneeData']['controls'][i]['controls']['endDate'].setValue(moment(event.value).format(this.assetOptimaConstants.ISODate));
      this.formGroup.controls['assetAssigneeData']['controls'][i]['controls']['endDateDisp'].setValue(moment(event.value).format(this.assetOptimaConstants.ISODate));
    }
    else{
      this.formGroup.controls['assetAssigneeData']['controls'][i]['controls']['endDate'].setValue('');
      this.formGroup.controls['assetAssigneeData']['controls'][i]['controls']['endDateDisp'].setValue('');
    }

    return false;
  }

  exit(model, valid, event){

    if(event){
      let assignees = [];
      let vlQTY:number = 0;
      for(let i=0;i<model.assetAssigneeData.length;i++){
        if(model.assetAssigneeData[i].active){
          vlQTY = vlQTY +Number(model.assetAssigneeData[i].vlNewQty);
          if(this.isVolumeLicensePresent && vlQTY > this.totalVlQty){
            this.commonService.openToastWarningMessage("New assigned volume licence QTY should be less then total volume licence QTY");
            return false;
          }
          else{
            assignees.push(model.assetAssigneeData[i].toAssigneeId)
          }
        }
      }

      if(assignees.length > 0){
        if(model.assetAssigneeData.findIndex(data=> data.defaultPersonIncharge == true && data.active == true) == -1){
          this.commonService.openToastWarningMessage("Please select one default person incharge.");
          return false;
        }

        if(this.trackedLicence){
          this.commonService.openToastWarningMessage(`Kindly Update The Volume License Count In The "Assign To" tab.`);
        }
      }


      this.submit(model.assetAssigneeData);
    }
    else{
        this.getSelectValues(false)
    }

  }

  dialogRefDelete;
  deleteRegistration(value,index) {
    if(this.formGroup.value.assetAssigneeData[index].defaultPersonIncharge == true
       && this.data.newStatusTypeId!=this.unassignedStatusType){
      this.commonService.openToastWarningMessage(`"Person In charge" Is Required. Kindly Assign To Other Employee Before Deleting This Record.`)
    }
    else{
    this.dialogRefDelete = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Asset Assignee'
      }
    });
    this.dialogRefDelete.disableClose = true;
    this.dialogRefDelete.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (value > 0) {
            this.commonService.commonGetService('deleteAssetTemporaryAssignee.sams', value).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }

          const control = <FormArray>this.formGroup.controls['assetAssigneeData'];
          control.removeAt(index);
        }
      });
    }
  }

  submit(AssigneeData){

    const allAssigneeData = {
      assetTemporaryAssigneeTOList : AssigneeData
    }

    this.commonService.commonInsertService('saveOrUpdateAssetTemporaryAssignee.sams', allAssigneeData).subscribe(
      data => {
        if (data.success) {
          this.getSelectValues(false);
          this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  setvlNewQtyValue(event,i){
    this.formGroup.controls['assetAssigneeData']['controls'][i]['controls']['vlNewQty'].setValue(event.target.value)
  }

}
