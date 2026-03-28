import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceRequestListComponent } from '../service-request-list/service-request-list.component';
import { SrAddLabourComponent } from '../tabs/sr-add-labour/sr-add-labour.component';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-service-request-view',
  templateUrl: './service-request-view.component.html',
  styleUrls: ['./service-request-view.component.css']
})
export class ServiceRequestViewComponent implements OnInit {

  srBreakDownForm: FormGroup;
  @Input() srId;

  //COMBO LIST
  srAttribute3List: any = [];
  srAttribute4List: any = [];

  //COMBO
  sr3AttributeCombo: any = [];
  sr4AttributeCombo: any = [];
  sr3AttributePageNumber: number;
  sr4AttributePageNumber: number;
  scrollsyncSr3Attribute: boolean = false;
  scrollsyncSr4Attribute: boolean = false;
  recordsPerPageForCombo: string;

  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlag: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  dataSource = new MatTableDataSource<ServiceRequestListComponent>();

  headingDisplay: string;
  buttonDisplay: string;

  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private locationRef: Location,
    private router: Router,
    public dialogRef: MatDialogRef<ServiceRequestViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {

    this.sr3AttributePageNumber = 1;
    this.sr4AttributePageNumber = 1;

  }

  ngOnInit() {
    this.srBreakDownForm = new FormGroup({
      orgId: new FormControl(0),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      departmentName: new FormControl(''),
      departmentId: new FormControl(0),
      assignedTo: new FormControl(''),
      assignedToId: new FormControl(0),
      assetCode: new FormControl(''),
      subDepartment: new FormControl(''),
      callerName: new FormControl(''),
      callerContactNo: new FormControl(''),
      problemReported: new FormControl(''),
      srPriority: new FormControl(''),
      srSeverity: new FormControl(''),
      assetHdrId: new FormControl(0),
      assetSerialNo: new FormControl(''),
      modelId: new FormControl(0),
      modelName: new FormControl(''),
      assetGroupId: new FormControl(0),
      assetGroupName: new FormControl(''),
      maintenanceType: new FormControl(''),
      subDepartmentId: new FormControl(0),
      srType: new FormControl(''),
      assetCategoryId: new FormControl(0),
      assetCategoryName: new FormControl(''),
      assetTypeName: new FormControl(''),
      assetTypeId: new FormControl(0),
      functionality: new FormControl(''),
      ecs: new FormControl(''),
      manufacturerId: new FormControl(''),
      manufacturerName: new FormControl(''),

      

      srAttribute3Name: new FormControl('', [Validators.required]),
      srAttribute4Name: new FormControl('', [Validators.required]),
      
      assetStatusId: new FormControl(0),
      assetStatus: new FormControl(''),
      srId: new FormControl(0),
      srNo: new FormControl(''),
      srStatus: new FormControl(''),
      srStatusTemp: new FormControl(''),
      problemObserved: new FormControl('', [Validators.maxLength(100)]),
      actionTaken: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      inProgressStartDateDisp: new FormControl(''),
      inProgressEndDateDisp: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      approvedBy: new FormControl('')
    });
    this.validateEditMode(this.data.srId);
  }

  ngAfterViewInit(): void {

  }

  validateEditMode(srId) {

    this.commonService.commonGetService('getServiceRequestById.sams', srId).subscribe(
      data => {
        this.srBreakDownForm.patchValue(data.responseData);

      }
    );
  }

  loadSr3AttributeComboData(searchValue) {
    this.scrollsyncSr3Attribute = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfsrAttribute3Combo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.sr3AttributePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.sr3AttributePageNumber === 1) {
              this.sr3AttributeCombo = data.responseData.comboList;
            } else {
              this.sr3AttributeCombo = this.sr3AttributeCombo.concat(data.responseData.comboList);
            }
          } else {
            this.sr3AttributeCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.sr3AttributePageNumber += 1 : this.sr3AttributePageNumber = 1;
        }
      );
    this.scrollsyncSr3Attribute = false;
  }

  selectedSr3AttributeData(event) {
    if (event === undefined) {
      this.srBreakDownForm.controls['srAttribute3Name'].setValue('');
      this.sr3AttributePageNumber = 1;
      this.sr3AttributeCombo = [];
    } else {
      this.srBreakDownForm.controls['srAttribute3Name'].setValue(event.attribute3Name);
    }
  }

  loadSr4AttributeComboData(searchValue) {
    this.scrollsyncSr4Attribute = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfsrAttribute4Combo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.sr4AttributePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.sr4AttributePageNumber === 1) {
              this.sr4AttributeCombo = data.responseData.comboList;
            } else {
              this.sr4AttributeCombo = this.sr4AttributeCombo.concat(data.responseData.comboList);
            }
          } else {
            this.sr4AttributeCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.sr4AttributePageNumber += 1 : this.sr4AttributePageNumber = 1;
        }
      );
    this.scrollsyncSr4Attribute = false;
  }

  selectedSr4AttributeData(event) {
    if (event === undefined) {
      this.srBreakDownForm.controls['srAttribute4Name'].setValue('');
      this.sr4AttributePageNumber = 1;
      this.sr4AttributeCombo = [];
    } else {
      this.srBreakDownForm.controls['srAttribute4Name'].setValue(event.attribute4Name);
    }
  }

  updateSrActivty() {
    //this.approvalSR('IN-PROGRESS');
    this.updateSRBreakDownAnalysis();
  }

  updateSRBreakDownAnalysis() {
    let srActivity = this.srBreakDownForm.value;

    this.commonService.commonInsertService('updateSRBreakDownAnalysis.sams', srActivity).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {

      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
