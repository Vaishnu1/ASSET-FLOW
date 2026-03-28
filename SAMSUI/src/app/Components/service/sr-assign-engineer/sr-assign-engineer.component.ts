import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; 
import { CommonService } from '../../../Services/common-service/common.service'; 
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';

@Component({
  selector: 'app-sr-assign-engineer',
  templateUrl: './sr-assign-engineer.component.html',
  styleUrls: ['./sr-assign-engineer.component.css']
})
export class SrAssignEngineerComponent implements OnInit {

  srAssignEnggForm: FormGroup;
  assign: any;

  headingDisplay: string = 'Assign Service Engineer';
  buttonDisplay: string = 'Assign';
  modeDisplay: boolean = true;
  uploadFlag: boolean = false;
  currentDate: string;

  serviceEngineerFrom = [
    { id: 1, name: 'INTERNAL' },
    { id: 2, name: 'EXTERNAL' }
  ];

  displayedServiceEnggColumns = [ 'assign','sno', 'displayName', 'openCalls', 'assignDt'];
  serviceEnggDataSource = [];
  serviceEnggLength: String = '0';
  serviceEnggLoader: boolean = false;

  displayedSRColumns = ['sno', 'srNo', 'srStatus', 'assetCode'];
  serviceRequestDataSource = [];
  srHistoryLength: String = '0';
  srHistoryLoader: boolean = false;

  internalEnggInfo: boolean = true;

  assignEmpId: number = 0;
  assignEmpName: String = '';
  officeContactNo: String = '0';
  assignedDtDisp: String = '';

  assignedEmpId: number = 0; 
  assignedEmpObj: any = {};
  assignedDate: String;

  constructor(public dialogRef: MatDialogRef<SrAssignEngineerComponent>,@Inject(MAT_DIALOG_DATA) private readonly data, 
    private readonly commonService: CommonService,
    private dialog: MatDialog ) { }

  ngOnInit() {
    this.currentDate = this.commonService.convertToDateStringyyyy_mm_dd(new Date());    

    this.srAssignEnggForm = new FormGroup({
      serviceEngineerMode: new FormControl('INTERNAL'),
      listServiceEnggType: new FormControl('3'),
      locationId: new FormControl(this.data.locationId),
      modelId: new FormControl(this.data.modelId)
    });       
    this.assignedEmpId = this.data.assignedToId;  
    this.fetchServiceEnggList();   
  }

  onChangeEvent(event,i) { 
    const myDate = moment(event.value, 'DD-MM-YYYY HH:mm').toDate();
    this.serviceEnggDataSource[i].assignDtDisp = myDate;
    this.serviceEnggDataSource[i].assign = true;
    return false;
  } 

  exit() {
    this.dialogRef.close({'exit': false,
                          'assignEmpId' : 0,
                          'assignEmpName' : '',
                          'officeContactNo' : '',
                          'assignedDtDisp' : ''
                        });
  }

  fetchServiceEnggList() {
    this.commonService.commonListService('fetchAssignToforSR.sams', this.srAssignEnggForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          const myDate = moment(this.data.assignedDate, 'DD-MM-YYYY').toDate();
            const empobj = {
              'employeeId' : this.assignedEmpId,
              'assignDtDisp' : myDate
            } 

          this.selectedEnggRow(empobj)
          this.serviceEnggDataSource = data.responseData.dataList;          

          if(this.serviceEnggDataSource.length > 0){
            this.serviceEnggDataSource.forEach((e, i)=>{
              const onj = {'assignDtDisp': myDate};
              const onj2 = {'assignDtDisp': new Date()};

              if(this.assignedEmpId === e.employeeId){
                this.serviceEnggDataSource[i]= {...this.serviceEnggDataSource[i], ...onj }
              }
              else{
                this.serviceEnggDataSource[i]= {...this.serviceEnggDataSource[i], ...onj2 }
              }

              return null;
            })
          }


          this.serviceEnggLength = data.responseData.dataTotalRecCount;
          this.serviceEnggLoader = false;
        } else {
          this.serviceEnggLoader = false;
        }
      }
    )
  };

  selectedEnggRow(row) {  
    this.assignEmpId = row.employeeId;
    this.officeContactNo = row.officeContactNo;
    this.dateWithTime(row.assignDtDisp);
    const employeeId = row.employeeId;
    this.commonService.commonGetService('fetchSRListForServiceEngg.sams', employeeId, this.srAssignEnggForm.controls.locationId.value).subscribe(
      data => {
        if (data.success) { 
          this.serviceRequestDataSource = data.responseData.dataList; 
          this.srHistoryLength = data.responseData.dataTotalRecCount;
          this.srHistoryLoader = false;

          if((data.responseData.dataList).length > 0){
            this.assignEmpName = data.responseData.dataList[0].assignedTo;  
          }        
          else{
            this.assignEmpName = row.displayName; 
          }
        } else {
          this.srHistoryLoader = false;
        }
      }, error => {
        this.srHistoryLoader = false;
      }
    );
  }

  changeEngineerFrom(event) {
    if (event.name === 'INTERNAL') {
      this.internalEnggInfo = true;

      this.serviceRequestDataSource = [];
      this.serviceEnggDataSource = [];

    } else if (event.name === 'EXTERNAL') {
      this.internalEnggInfo = false;

      this.serviceRequestDataSource = [];
      this.serviceEnggDataSource = [];

    }

    this.fetchServiceEnggList();
  }

  selectLoadType(event) {

    this.serviceRequestDataSource = [];
    this.serviceEnggDataSource = [];

    this.fetchServiceEnggList();
  } 

  assignServiceEngineer() {  
    if(!this.assignedDtDisp){
    this.commonService.openToastWarningMessage('Kindly Enter Assigned Date!'); 
    }else if(this.assignEmpId === 0){
    this.commonService.openToastWarningMessage('Kindly select one service engineer!');
    }else{
      let cnfDialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg: 'Are you sure to Reassign to: '+ this.assignEmpName +'?',
        }
      });
      cnfDialogRef.disableClose = true;
      cnfDialogRef.afterClosed().subscribe(
        data => {
          if(data.status) {
            this.dialogRef.close({'exit': true,
            'assignEmpId' : this.assignEmpId,
            'assignEmpName' : this.assignEmpName,
            'officeContactNo' : this.officeContactNo,
            'assignedDtDisp' :  this.assignedDtDisp
            });
          } else {
            cnfDialogRef.close();
          }
        }
      )
    
  }
    
  } 
  dateConvert(data){ 
    this.assignedDtDisp = data; 
  }

  dateWithTime(data){
    const now1 = new Date();
    
      const now = new Date(data);
      now.setHours(now1.getHours());
      now.setMinutes(now1.getMinutes());
      // this.assignedDtDisp = moment(now).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      this.assignedDtDisp = moment(now).format("YYYY-MM-DD HH:mm:ss.SSS");  
      // console.log(data);
  }
}
