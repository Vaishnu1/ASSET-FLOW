import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-checkpoints-create',
  templateUrl: './checkpoints-create.component.html',
  styleUrls: ['./checkpoints-create.component.css']
})
export class CheckpointsCreateComponent implements OnInit {

  @ViewChild('checkPointNameFocus') checkPointNameFocus: ElementRef;

  modelCheckPointsForm: FormGroup;

  buttonShowOnEdit:boolean=true;
  buttonDisplay:string;

  //COMBO
  parameterCombo: any = [];
  parameterTypeCombo: any = [];
  parameterPageNumber:number;
  parameterTypePageNumber:number;
  scrollsyncParameter:boolean=false;
  scrollsyncParameterType:boolean=false;
  recordsPerPageForCombo:string;

  parameterGroupCombo: any = [];
  scrollsyncParameterGroup:boolean=false;
  parameterGroupPageNumber:number;

  uom: any = [];

  constructor(private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              public dialogRef: MatDialogRef<CheckpointsCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private change: ChangeDetectorRef,
              private getData: getData,
              private assetOptimaConstants: AssetOptimaConstants) {

              this.parameterPageNumber = 1;
              this.parameterTypePageNumber = 1;
            }

  ngOnInit() {
    this.modelCheckPointsForm = new FormGroup({
      modelCheckPtsId: new FormControl(''),
      parameterName: new FormControl(null,[Validators.required]),
      parameterTypeName: new FormControl(null,[Validators.required]),
      parameterGroupName: new FormControl(null,[Validators.required]),
      //usedFor: new FormControl(null,[Validators.required]),
      startValue: new FormControl('',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      endValue: new FormControl('',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      active: new FormControl(true),
      uom: new FormControl(''),
    });
    //this.checkPointNameFocus.nativeElement.focus();
  }

  ngAfterViewInit() {
    //this.checkPointNameFocus.nativeElement.focus();
    if(this.data.checkPoints!=0){
      this.modelCheckPointsForm.patchValue(this.data.checkPoints);
      if(this.data.mode=='view'){
        this.buttonShowOnEdit=false;
        this.modelCheckPointsForm.disable();
      }else{
        this.buttonDisplay='Update';
      }
    }else{

    }
    this.change.detectChanges();
  }

  closeModal(){
    this.dialogRef.close();
  }

  addCheckPointsModel() {
    this.dialogRef.close(this.modelCheckPointsForm.getRawValue());
  }

  usedForList = [
    { id: 1, name: 'PM' },
    { id: 2, name: 'QA' },
    { id: 3, name: 'PA' }
  ];

  loadParameterComboData(searchValue) {
    this.scrollsyncParameter=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllParameterForCombo,searchValue.term,'','',
            this.recordsPerPageForCombo,this.parameterPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.parameterPageNumber , this.parameterCombo , data.responseData.comboList)
        this.parameterPageNumber = this.getData.pageNumber;
        this.parameterCombo = this.getData.dataList;
        this.scrollsyncParameter = false;
      }
    );
  }

  selectedParameterData(event) {
    if(event===undefined){
      this.modelCheckPointsForm.controls['parameterName'].setValue('');
      this.parameterPageNumber=1;
      this.parameterCombo=[];
    }else{
      this.modelCheckPointsForm.controls['parameterName'].setValue(event.parameterName);
    }
  }

  loadParameterTypeComboData(searchValue) {
    this.scrollsyncParameterType=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllParameterTypeForCombo,searchValue.term,'','',
            this.recordsPerPageForCombo,this.parameterTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.parameterTypePageNumber , this.parameterTypeCombo , data.responseData.comboList)
        this.parameterTypePageNumber = this.getData.pageNumber;
        this.parameterTypeCombo = this.getData.dataList;
        this.scrollsyncParameterType = false;
      }
    );
  }

  selectedParameterTypeData(event) {
    if(event===undefined){
      this.modelCheckPointsForm.controls['parameterTypeName'].setValue('');
      this.parameterTypePageNumber=1;
      this.parameterTypeCombo=[];
    }else{
      this.modelCheckPointsForm.controls['parameterTypeName'].setValue(event.parameterTypeName);
    }
  }

//adding list of all param group combo
loadParameterGroupComboData(searchValue) {
  this.scrollsyncParameterGroup=true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listAllParameterGroupForCombo,searchValue.term,'','',
          this.recordsPerPageForCombo,this.parameterGroupPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.parameterGroupPageNumber , this.parameterGroupCombo , data.responseData.comboList)
      this.parameterGroupPageNumber = this.getData.pageNumber;
      this.parameterGroupCombo = this.getData.dataList;
      this.scrollsyncParameterGroup = false;
    }
  );
}

selectedParameterGroupData(event) {
  if(event===undefined){
    this.modelCheckPointsForm.controls['parameterGroupName'].setValue('');
    this.parameterGroupPageNumber=1;
    this.parameterGroupCombo=[];
  }else{
    this.modelCheckPointsForm.controls['parameterGroupName'].setValue(event.parameterGroupName);
  }
}


  listOfUOM(searchTerms){
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo,'').subscribe(
      (data) =>{
        this.uom = data.responseData.comboList;
      }
    );
  }

}
