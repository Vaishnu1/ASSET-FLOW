import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sr-check-points',
  templateUrl: './sr-check-points.component.html',
  styleUrls: ['./sr-check-points.component.css']
})
export class SrCheckPointsComponent implements OnInit {

  @Input() srId;
  @Input() srType;
  @Input() srStatusId;
  @Output() checkUpdated = new EventEmitter<void>(); 

  srCheckPointsForm: FormGroup;

  primaryId: number = 0;

  uploadButtonFlag: boolean = false;

  checkPointsMain = [];

  // displayedColumns = ['sNo', 'parameterName', 'parameterTypeName', 'startValue' ,'actualValue', 'result', ''];
  displayedColumns = ['sNo', 'parameterName', 'parameterGroupName', 'parameterTypeName', 'uom', 'inputType', 'defalutValue', 'minAllowedValue', 'maxAllowedValue', 'actualValue', 'result'];

  modeDisplay: boolean = false;
  isButtonEnabled = false;
  //for pagination
  length: number;
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;
  countOfNotDone : number = 0;
  countOfPass : number = 0;
  countOfFail : number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private dialog: MatDialog) {
    this.pageSize = '100';
    this.pageIndex = '0';
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.primaryId = params.pId;
        this.primaryId = Number(this.primaryId);
        this.srId = this.primaryId;
      });
    this.srCheckPointsForm = new FormGroup({
      checkPointsId: new FormControl(''),
      parameterName: new FormControl(''),
      parameterTypeName: new FormControl(''),
      startValue: new FormControl(''),
      endValue: new FormControl(''),
      actualValue: new FormControl(''),
      result: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      createdDtDisp: new FormControl(''),
    });
    this.loadList();

    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId = Number(primaryId);
        var mode = params.mode;
        if (mode == 'edit') {
          this.modeDisplay = true;
        }
      }
    );

    this.countOfNotDone = 0;
    this.countOfPass = 0;
    this.countOfFail = 0;
    console.log("tttttt",this.srStatusId)

  }

  loadList() {
    this.commonService.commonGetService('fetchListOfAllSrCheckPointsV1.sams', this.srId, this.srType, this.pageSize, this.pageIndex).subscribe(
      data => {
        if (data.success) {
          this.checkPointsMain = data.responseData.dataList;
          this.length = data.responseData.dataTotalRecCount;
          // default to set not done
          this.calculateResult();
        } else {
          this.commonService.openToastSuccessMessage(data.message);
        }
      }, error => {
      }
    );
  }

  saveSrCheckPoints() {

    var obj = {
      'serviceCheckPointsList': this.checkPointsMain != null ? this.checkPointsMain : [],
    }
    this.uploadButtonFlag = true;
    this.commonService.commonInsertService('saveOrUpdateSrCheckPoints.sams', obj).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.uploadButtonFlag = false;
          this.checkUpdated.emit();
          this.ngOnInit();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadButtonFlag = false;
        }
      }, error => {
        this.uploadButtonFlag = false;
        throw error;
      }
    );
  }

  delete(checkPointsId: any) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: { 'Text': 'Check List' }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonGetService('deleteSRCheckPoints.sams', checkPointsId.toString()).subscribe(
            data => {
              if (data.success) {
                this.ngOnInit();
                this.commonService.openToastSuccessMessage(data.message);
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }, error => {
              this.commonService.openToastErrorMessage(data.message);
            }
          );
        }
      });
  }


  // generateReport() {
  //   this.commonService.commonGetService('generateSrCheckPointsReport.sams',this.srId).subscribe(
  //        data => {
  //            this.commonService.openToastSuccessMessage("Request No to download report : "+data.responseData);
  //        }, error => {
  //            alert('error');
  //        }
  //    )
  //  }


  radioPassFail(value, index) {
    if(this.srStatusId == 3 || this.srStatusId == 4){
      this.isButtonEnabled = true;
    }else{
      this.isButtonEnabled = false;
    }
    this.checkPointsMain[index].actualValue = value;
    this.checkPointsMain[index].result = value;
    this.calculateResult();
  }
radioYesNo(value, index) {
  if (this.srStatusId == 3 || this.srStatusId == 4) {
    this.isButtonEnabled = true;
  } else {
    this.isButtonEnabled = false;
  }
  this.checkPointsMain[index].actualValue = value;
  this.checkPointsMain[index].result = value;
  this.calculateResult();  
}
  radioSelectMethod(value, index) {
    if(this.srStatusId == 3 || this.srStatusId == 4){
      this.isButtonEnabled = true;
    }else{
      this.isButtonEnabled = false;
    }
    this.checkPointsMain[index].actualValue = value;
    this.checkPointsMain[index].result = value;
    this.calculateResult();
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadList();
  }

  onInputChange(index) {
    if(this.srStatusId == 3 || this.srStatusId == 4){
      this.isButtonEnabled = true;
    }else{
      this.isButtonEnabled = false;
    }
    if (this.checkPointsMain[index].inputType == 'Text') {
      if(this.checkPointsMain[index].actualValue.length == 0){
        this.checkPointsMain[index].result = "Not Done";
      } else{
        this.checkPointsMain[index].result = "";
      }
    }
    if (this.checkPointsMain[index].inputType == 'Number') {
      if (!(this.checkPointsMain[index].actualValue) && this.checkPointsMain[index].actualValue != 0) {
        this.checkPointsMain[index].result = "Not Done";
      } else if ((this.checkPointsMain[index].minAllowedValue <= this.checkPointsMain[index].actualValue) && (this.checkPointsMain[index].maxAllowedValue >= this.checkPointsMain[index].actualValue)) {
        this.checkPointsMain[index].result = "Pass";
      } else {
        this.checkPointsMain[index].result = "Fail";
      }
    }
    this.calculateResult();
  }

  calculateResult(){
    this.countOfNotDone = 0;
    this.countOfPass = 0;
    this.countOfFail = 0;
    for(let i=0; i<this.checkPointsMain.length; i++){
      if(this.checkPointsMain[i].result == "" || this.checkPointsMain[i].result == null){
        if(this.checkPointsMain[i].inputType == "Text" && this.checkPointsMain[i].actualValue.length > 0){
          this.checkPointsMain[i].result = "";
        } else{
          this.checkPointsMain[i].result = "Not Done";
        }
      }
     
    }
  }

}
