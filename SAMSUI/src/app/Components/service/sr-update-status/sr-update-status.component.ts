import { Component, OnInit, HostBinding, ViewChild, OnDestroy, ElementRef, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';

@Component({
  selector: 'app-sr-update-status',
  templateUrl: './sr-update-status.component.html',
  styleUrls: ['./sr-update-status.component.css']
})
export class SrUpdateStatusComponent implements OnInit {

  srStatusUpdateForm: FormGroup;

  priorityCombo: any = [];
  scrollsyncPriority:boolean=false;
  priorityPageNumber:number;

  severityCombo: any = [];
  scrollsyncSeverity:boolean=false;
  severityPageNumber:number;

  buttonDisplay: String = 'Update';

  recordsPerPageForCombo: string;

  srStatusInProgressCombo: any = [];
  scrollSyncSrStatus:boolean=false;
  srStatusPageNumber:number;

  assetList: any = [];
  assetCodeCombo: any = [];
  assetCodePageNumber: number;
  scrollsyncAssetCode: boolean = false;

  getData: getData;

  physicalDamageList = [
    { name: 'YES' },
    { name: 'NO' }
  ];

  patientIncidentList = [
    { name: 'YES' },
    { name: 'NO' }
  ];

  efsCombo: any = [];
  efsPageNumber: number;
  scrollSyncEFS: boolean = false;

  assetCodeUpdated : boolean = false;
  srActivityCount : number = 0;


  // srStatusInProgress = [
  //   { id: 1, name: 'HOLD' },
  //   { id: 2, name: 'IN-PROGRESS SPARE REQUESTED' },
  //   { id: 3, name: 'IN-PROGRESS STANDBY PROVIDED' },
  //   { id: 4, name: 'IN-PROGRESS WAITING FOR QUOTATION' },
  //   { id: 5, name: 'IN-PROGRESS INDENT PROCESSING' },
  //   { id: 6, name: 'IN-PROGRESS AWAITING FOR PO' },
  //   { id: 7, name: 'IN-PROGRESS PO RELEASED' },
  //   { id: 8, name: 'IN-PROGRESS WAITING FOR SPARE' }
  // ];

  checkSRActivityClose : boolean = false;

  constructor(public dialogRef: MatDialogRef<SrUpdateStatusComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private assetOptimaConstants: AssetOptimaConstants,
              private router: Router,
              private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private userSessionService: UserSessionService,
              private assetOptimaServices: AssetOptimaServices) { 

      this.priorityPageNumber = 1;
      this.severityPageNumber = 1;
      this.assetCodePageNumber = 1;
      this.efsPageNumber = 1;
  }

  ngOnInit() {
      
    this.srStatusUpdateForm = new FormGroup({
      srId : new FormControl(this.data.srId),
      srPriority: new FormControl(this.data.srPriority),
      srSeverity: new FormControl(this.data.srSeverity),
      srStatusName : new FormControl(this.data.srStatusName),
      srStatusId : new FormControl(this.data.srStatusId),
      isPartiallyWork : new FormControl(this.data.isPartiallyWork),
      partiallyWorkingReason : new FormControl(this.data.partiallyWorkingReason),
      physicalDamageDisp : new FormControl(this.data.physicalDamageDisp, [Validators.required]),
      physicalDamageDescription  : new FormControl(this.data.physicalDamageDescription),
      patientIncidentDisp : new FormControl(this.data.patientIncidentDisp, [Validators.required]),
      incidentDescription  : new FormControl(this.data.incidentDescription),
      locationId : new FormControl(this.data.locationId),
      departmentId : new FormControl(this.data.departmentId),
      assetCode : new FormControl(this.data.assetCode),
      assetId : new FormControl(this.data.assetId),
      srEFSValue  : new FormControl(this.data.srEFSValue, [Validators.required]),
      srEFSValueId  : new FormControl(this.data.srEFSValueId)
    });
    this.srActivityCount = this.data.srActivityCount;

    this.checkSRActivityClose = this.data.checkSRActivityClose;

    console.log("checkSRActivityClose : ",this.checkSRActivityClose);
    if(this.data.assetId <= 0) {
      this.assetCodeUpdated = true;
    }
    this.toggleSrEFSValue(this.data.srStatusId);

  // Listen for changes
  this.srStatusUpdateForm.get('srStatusId')?.valueChanges.subscribe(value => {
    this.toggleSrEFSValue(value);
  });
  }
  
private toggleSrEFSValue(statusId: number) {
  const efsControl = this.srStatusUpdateForm.get('srEFSValue');

  if (!efsControl) return;

  if (statusId === 6 || statusId === 7) {
    efsControl.disable();  // disable input
    efsControl.clearValidators(); // remove validation
  } else {
    efsControl.enable(); // enable input
    efsControl.setValidators([Validators.required]); // re-add validation
  }

  efsControl.updateValueAndValidity(); // refresh validators
}
  loadPriorityComboData(searchValue) {
    this.scrollsyncPriority=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPriorityForCombo.sams',searchValue.term,'','',this.recordsPerPageForCombo,this.priorityPageNumber).subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.priorityPageNumber=== 1){
            this.priorityCombo = data.responseData.comboList;
          }else{
            this.priorityCombo = this.priorityCombo.concat(data.responseData.comboList);
          }
        } else {
          this.priorityCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.priorityPageNumber += 1 : this.priorityPageNumber = 1;  
     }
    );
    this.scrollsyncPriority=false;
  }

  selectedPriorityData(event) {
    if(event===undefined){
      this.srStatusUpdateForm.controls.srPriority.setValue('');
      this.priorityPageNumber=1;
      this.priorityCombo=[];
    }else{
      this.srStatusUpdateForm.controls.srPriority.setValue(event.priorityName);
    }
  }

  loadSeverityComboData(searchValue) {
    this.scrollsyncSeverity=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllSeverityForCombo.sams',searchValue.term,'','',this.recordsPerPageForCombo,this.severityPageNumber).subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.severityPageNumber=== 1){
            this.severityCombo = data.responseData.comboList;
          }else{
            this.severityCombo = this.severityCombo.concat(data.responseData.comboList);
          }
        } else {
          this.severityCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.severityPageNumber += 1 : this.severityPageNumber = 1;  
     }
    );
    this.scrollsyncSeverity=false;
  }

  loadSrStatusInProgressComboData(searchValue) {
    this.srStatusInProgressCombo = [];
    this.scrollSyncSrStatus=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchSRStatusInProgressList.sams',searchValue.term,'','',this.recordsPerPageForCombo,this.srStatusPageNumber).subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.srStatusPageNumber === 1){
            this.srStatusInProgressCombo = data.responseData.comboList;
          }else{
            this.srStatusInProgressCombo = this.srStatusInProgressCombo.concat(data.responseData.comboList);
          }
        } else {
          this.srStatusInProgressCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.srStatusPageNumber += 1 : this.srStatusPageNumber = 1;  
     }
    );
    this.scrollSyncSrStatus=false;
  }

  selectedSeverityData(event) {
    if(event===undefined){
      this.srStatusUpdateForm.controls.srSeverity.setValue('');
      this.severityPageNumber=1;
      this.severityCombo=[];
    }else{
      this.srStatusUpdateForm.controls.srSeverity.setValue(event.severityName);
    }
  }

  changeSRStatusAfterInProgress(event) {
    if(event === undefined){
      this.srStatusUpdateForm.controls.srStatusId.setValue(0);
      this.srStatusUpdateForm.controls.srStatusName.setValue('');
    }else{
      this.srStatusUpdateForm.controls.srStatusId.setValue(event.srStatusId);
      this.srStatusUpdateForm.controls.srStatusName.setValue(event.srStatusName);
    }
  }

  // updatePrioritySeverityStatus() {

  //   let efsValue = this.srStatusUpdateForm.controls.srEFSValue.value;
  //   let srId = this.srStatusUpdateForm.controls.srId.value;
  //   console.log(efsValue)
    
  //   if(efsValue == 'UP') {
  //     this.commonService.commonGetService('fetchCountSRSubStatus.sams', srId).subscribe(
  //       data => {
  //         if (data.success) {
  //           var srSubStatusCount = data.responseData;
  //           if(Number(srSubStatusCount) > 0) {
  //             const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
  //               height: 'auto',
  //               width: '400px',
  //               data: {
  //                 'confirmHeading': 'Confirmation',
  //                 'confirmMsg':'Are you sure, to update EFS status to UP - PR/PO/STOCK INDENT is open?'
  //               }
  //             });
  //             dialogRef.disableClose = true;
  //             dialogRef.afterClosed().subscribe(
  //               data => {

  //                 if(data.status){ 

  //                   this.updateStatus();
  //                 } else{
                  
                  
  //                 }

  //               });
  //           } else{
  //             this.updateStatus();
  //           }
  //         }
  //       }
  //     );
  //   }else{
  //     this.updateStatus();

  //   }
                
  // }

   updatePSStatus(){

    const srStatusId = this.srStatusUpdateForm.controls.srStatusId.value;
    const efsValue = this.srStatusUpdateForm.controls.srEFSValue.value;

    if(srStatusId == 4 && efsValue == 'UP'){
      this.updatePrioritySeverityStatus(true);
    }else{
      this.updatePrioritySeverityStatus(false);
    }

  }

  updatePrioritySeverityStatus(srCompleteFlag) {

    let efsValue = this.srStatusUpdateForm.controls.srEFSValue.value;
    let srId = this.srStatusUpdateForm.controls.srId.value;
    console.log(efsValue)
    
    if(efsValue == 'UP') {
      this.commonService.commonGetService('fetchCountSRSubStatus.sams', srId).subscribe(
        data => {
          if (data.success) {
            var srSubStatusCount = data.responseData;
            if(Number(srSubStatusCount) > 0) {
              const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
                height: 'auto',
                width: '400px',
                data: {
                  'confirmHeading': 'Confirmation',
                  'confirmMsg':'Are you sure, to update EFS status to UP - PR/PO/STOCK INDENT is open?'
                }
              });
              dialogRef.disableClose = true;
              dialogRef.afterClosed().subscribe(
                data => {

                  if(data.status){ 
                    
                    if(srCompleteFlag){

                      const dialogData = {
                        confirmHeading: 'Confirmation',
                        confirmMsg: 'Are you sure to complete the Service Request?'
                    };
                
                    if (this.checkSRActivityClose) {
                        dialogData['note'] = 'Note: Open activities found. Kindly complete them to change the EFS status to \'UP\'.';
                        dialogData['selectedElementListLength'] = 0;
                    }

                    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
                      height: 'auto',
                      width: '400px',
                      data: dialogData
                    });

                    dialogRef.disableClose = true;
                    dialogRef.afterClosed().subscribe(
                      data => {
              
                        if(data.status){ 
              
                          this.updateStatus(srCompleteFlag);
                        } else{
                        
                        
                        }
              
                      });

                  }else{
                    this.updateStatus(srCompleteFlag);
                  }

                  } else{
                  
                  
                  }

                });
            } else{

              if(srCompleteFlag){

                const dialogData = {
                  confirmHeading: 'Confirmation',
                  confirmMsg: 'Are you sure to complete the Service Request?'
              };
          
              if (this.checkSRActivityClose) {
                dialogData['note'] = 'Note: Open activities found. Kindly complete them to change the EFS status to \'UP\'.';
                  dialogData['selectedElementListLength'] = 0;
              }

              const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
                height: 'auto',
                width: '400px',
                data: dialogData
              });

              dialogRef.disableClose = true;
              dialogRef.afterClosed().subscribe(
                data => {
        
                  if(data.status){ 
        
                    this.updateStatus(srCompleteFlag);
                  } else{
                  
                  
                  }
        
                });

            }else{
              this.dialogRef.close();
            }
              
            }
          }
        }
      );
    }else{
      this.updateStatus(srCompleteFlag);

    }
                
  }

  updateStatus(srCompleteFlag){
    console.log(this.srStatusUpdateForm.controls.isPartiallyWork.value);
    this.dialogRef.close({'exit': true,
                  'srPriority' : this.srStatusUpdateForm.controls.srPriority.value,
                  'srSeverity' : this.srStatusUpdateForm.controls.srSeverity.value,
                  'srStatusId' : this.srStatusUpdateForm.controls.srStatusId.value,
                  'srStatusName' : this.srStatusUpdateForm.controls.srStatusName.value,
                  'isPartiallyWork' : this.srStatusUpdateForm.controls.isPartiallyWork.value,
                  'partiallyWorkingReason' : this.srStatusUpdateForm.controls.partiallyWorkingReason.value,
                  'assetCodeUpdated' : this.assetCodeUpdated,
                  'assetCode' : this.srStatusUpdateForm.controls.assetCode.value,
                  'assetId' : this.srStatusUpdateForm.controls.assetId.value,
                  'physicalDamageDisp' : this.srStatusUpdateForm.controls.physicalDamageDisp.value,
                  'physicalDamageDescription' : this.srStatusUpdateForm.controls.physicalDamageDescription.value,
                  'patientIncidentDisp' : this.srStatusUpdateForm.controls.patientIncidentDisp.value,
                  'incidentDescription' : this.srStatusUpdateForm.controls.incidentDescription.value,
                  'srEFSValue' : this.srStatusUpdateForm.controls.srEFSValue.value,
                  'srEFSValueId' : this.srStatusUpdateForm.controls.srEFSValueId.value,
                  'srCompleteFlag' : srCompleteFlag
                 });
  }
  
  close() {
    this.dialogRef.close({'exit': false,
                          'srPriority' : '',
                          'srSeverity' : '',
                          'isPartiallyWork' : '',
                          'partiallyWorkingReason' : ''
                        });
  }

  changeActionPhysicalDamage (event) {
    console.log("event.name" , event.name);
    if (event === undefined) {

    } else {
      if(event.name == 'YES') {
        this.srStatusUpdateForm.controls.physicalDamageDescription.enable();
        this.srStatusUpdateForm.controls.physicalDamageDescription.setValidators([Validators.required]);
      } else {
        this.srStatusUpdateForm.controls.physicalDamageDescription.disable();
      }
    }
  }

  

  changeActionPatientIncident (event) {
    console.log("event.name" , event.name);
    if (event === undefined) {
      
    } else {
      if(event.name == 'YES') {
        this.srStatusUpdateForm.controls.incidentDescription.enable();
        this.srStatusUpdateForm.controls.incidentDescription.setValidators([Validators.required]);
      } else {
        this.srStatusUpdateForm.controls.incidentDescription.disable();
      }
    }
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    const locId = this.srStatusUpdateForm.controls.locationId.value;
    const departmentId = this.srStatusUpdateForm.controls.departmentId.value;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeComboSR.sams', searchValue.term,locId > 0 ? locId : 0,
    departmentId > 0 ? departmentId : 0, this.recordsPerPageForCombo, this.assetCodePageNumber, '', '').subscribe(
        (data) => {
          if (data.success) {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
            this.assetCodePageNumber = this.getData.pageNumber;
            this.assetCodeCombo = this.getData.dataList;
          }
          this.scrollsyncAssetCode = false;
        }
      );
  }

  selectedAssetCodeData(event) {
    if(event === undefined) {
      this.srStatusUpdateForm.controls.assetCode.setValue('');
      this.srStatusUpdateForm.controls.assetId.setValue(0);
    } else {
      this.srStatusUpdateForm.controls.assetCode.setValue(event.assetCode);
      this.srStatusUpdateForm.controls.assetId.setValue(event.assetHdrId);
    }
  }

  listOfEFSCombo(searchValue) {
    this.scrollSyncEFS = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfEFSCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.efsPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.efsPageNumber, this.efsCombo, data.responseData.comboList)
        this.efsPageNumber = this.getData.pageNumber;
        this.efsCombo = this.getData.dataList;
        this.scrollSyncEFS = false;
      }
    );
  }

  setEFSDataCombo(event) {
    if (event === undefined) {
      this.srStatusUpdateForm.controls.srEFSValue.setValue('');
      this.srStatusUpdateForm.controls.srEFSValueId.setValue('0');
      this.efsPageNumber = 1;
      this.efsCombo = [];
    } else {
      if(event.srActivityEFSId == 3) {
          console.log("this.srActivityEFSId 1" , event.srActivityEFSId);
          if(this.srActivityCount != null && this.srActivityCount <= 0) {
            this.srStatusUpdateForm.controls.srEFSValueId.setValue(this.data.srEFSValueId);
            this.srStatusUpdateForm.controls.srEFSValue.setValue(this.data.srEFSValue);
            this.commonService.openToastWarningMessage('Kindly add a activity to update EFS status to UP');
          } else {
            this.srStatusUpdateForm.controls.srEFSValueId.setValue(event.srActivityEFSId);
            this.srStatusUpdateForm.controls.srEFSValue.setValue(event.srActivityEFSName);
          }
      } else {
        this.srStatusUpdateForm.controls.srEFSValueId.setValue(event.srActivityEFSId);
        this.srStatusUpdateForm.controls.srEFSValue.setValue(event.srActivityEFSName);
      }
    }
  }



}
