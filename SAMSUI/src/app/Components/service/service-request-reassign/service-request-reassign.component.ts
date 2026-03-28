import { Component, OnInit, Input, Inject } from '@angular/core';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-service-request-reassign',
  templateUrl: './service-request-reassign.component.html',
  styleUrls: ['./service-request-reassign.component.css']
})
export class ServiceRequestReassignComponent implements OnInit {

  srBreakDownForm: FormGroup;
  @Input() srId; 


  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlag: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //COMBO
  personInchargeCombo: any = [];
  personInchargePageNumber:number;
  scrollsyncPersonIncharge:boolean=false;
  recordsPerPageForCombo:string;

  constructor(private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private router: Router,public dialogRef: MatDialogRef<ServiceRequestReassignComponent>,
              @Inject(MAT_DIALOG_DATA) private data) {

                this.personInchargePageNumber = 1;

               }

  ngOnInit() {
    this.srBreakDownForm = new FormGroup({
      orgId : new FormControl(0),
      locationId : new FormControl(0),
      srId  :new FormControl(0),
      assignedTo : new FormControl(''),
      assignedToId: new FormControl(0),
      assignedDt : new FormControl(''),
      assignedDtDisp : new FormControl(''),
      reAssignedToId: new FormControl(0),
      reAssignedTo : new FormControl('',[Validators.required]),
      reAssignedDt: new FormControl(''),
      reAssignedDtDisp: new FormControl(''),
      reAssignedBy : new FormControl(''),
      reAssignedStatus : new FormControl(''),
      remarks: new FormControl(''),
    });

    this.validateEditMode(this.data.srId);
  }

  ngAfterViewInit(): void {
    
  }

  validateEditMode(srId){
    this.commonService.commonGetService('getServiceRequestById.sams',srId).subscribe(
      data => {
        this.srBreakDownForm.patchValue(data.responseData);
        this.srBreakDownForm.controls['reAssignedToId'].setValue(0);
        this.srBreakDownForm.controls['reAssignedTo'].setValue('');
      }
    ); 
  }

  reassignServiceRequest(){                     
    this.commonService.commonInsertService('reassignServiceRequest.sams', this.srBreakDownForm.value).subscribe(
      data => { 
      if(data.success){  
       this.commonService.openToastSuccessMessage('Reassigned Successfully.');   
       this.uploadFlag=false;
       this.close();         
      }else{
        this.commonService.openToastErrorMessage(data.message);
      }
      }, error => {
      }
    );
  }

  close(){
    this.dialogRef.close();
  }

  loadPersonInchargeComboData(searchValue) {
    this.scrollsyncPersonIncharge=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeComboFromUser.sams',searchValue.term, '','',
            this.recordsPerPageForCombo,this.personInchargePageNumber).subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.personInchargePageNumber=== 1){
            this.personInchargeCombo = data.responseData.comboList;
          }else{
            this.personInchargeCombo = this.personInchargeCombo.concat(data.responseData.comboList);
          }
        } else {
          this.personInchargeCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.personInchargePageNumber += 1 : this.personInchargePageNumber = 1;  
     }
    );
    this.scrollsyncPersonIncharge=false;
  }

  selectedPersonInchargeData(event) {
    if(event===undefined){
      this.srBreakDownForm.controls['reAssignedToId'].setValue(0);
      this.srBreakDownForm.controls['reAssignedTo'].setValue('');
      this.personInchargePageNumber=1;
      this.personInchargeCombo=[];  
    }else{
      this.srBreakDownForm.controls['reAssignedToId'].setValue(event.employeeId);
      this.srBreakDownForm.controls['reAssignedTo'].setValue(event.employeeFirstName);
    }
  }

}
