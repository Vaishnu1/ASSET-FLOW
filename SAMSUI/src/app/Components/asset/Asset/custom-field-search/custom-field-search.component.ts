import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../../Services/common-service/common.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CusFieldHdr } from 'src/app/Model/master/cusFieldHdr';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import * as moment from 'moment';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-custom-field-search',
  templateUrl: './custom-field-search.component.html',
  styleUrls: ['./custom-field-search.component.css']
})
export class CustomFieldSearchComponent implements OnInit {

  @ViewChild('matAssignee') tableAssignee: MatTable<any>;
  @ViewChild('matAssignee1') tableAssignee1: MatTable<any>;

  displayedColumns = ['searchField', 'fieldValue','action'];

  getData: getData;

  customFieldComboData: any = []
  subloader: boolean = false;
  subCategoryName : any = "";
  subCategoryId : any = 0;
  selectedSubCategoryIds : any = [];
  
  public cusFieldHdr: CusFieldHdr;

  cusFieldHdrList: CusFieldHdr[];

  customFields1 : any = {}; 

  result = [];
  noteMsg : string;
  count : number = 0;
  disableSubmit: boolean = true;
  disableAddBtn: boolean = false;

  constructor(private readonly dialogRef: MatDialogRef<CustomFieldSearchComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
    private readonly commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants,
    private formBuilder: FormBuilder,
    public assetOptimaServices: AssetOptimaServices
  ) {
    this.cusFieldHdr = new CusFieldHdr();
   }

  private getParticipant1(){
    return {
      labelName: '',
      customHdrId: 0,
      inputType: '',
      basedOn: '',
      comboValues: [''],
      customFieldData:['']
    }
  }

  addValue(i,element){      
    this.result[i].comboValues.push('');
    if(element.inputType === 'CHECKBOX'){
      this.count++;      
    }
  }

  ngOnInit () {
    this.subCategoryName = this.data.subCategoryName;
    this.subCategoryId = this.data.subCategoryId;
    this.selectedSubCategoryIds = this.data.selectedSubCategoryIds;

   
    this.noteMsg = `Note: <ul>
                            <li>'Field Value' under same 'Search Field' will follow 'OR' Condition to search. </li>                   
                            <li> Different 'Search Fields' will follow 'AND' Condition to search. </li>
                          </ul> `

    this.getSelectValues();
  }

  getSelectValues(){
    if(this.data.customFields.length > 0){
      for(let i=0;i<=this.data.customFields.length-1;i++){  
        this.result.push(this.getParticipant1());        
        this.result[i].customHdrId = this.data.customFields[i].customHdrId;
        this.result[i].inputType = this.data.customFields[i].inputType;
        this.result[i].basedOn = this.data.customFields[i].basedOn;
        this.result[i].labelName = this.data.customFields[i].labelName;
        this.result[i].comboValues = this.data.customFields[i].comboValues;
        this.customFieldComboData[i] = this.data.customFields[i].customFieldData;
      }
    }
  }

  
  selectedAttributeData(event,i) {
    if(event){
      let checkSeachField = this.result.findIndex(data => data.customHdrId === event.customHdrId) !== -1;
      if (checkSeachField) {
        this.commonService.openToastWarningMessage("Search Field Already Selected");    
        setTimeout(() => {
          this.result[i].customHdrId = 0;
          this.result[i].inputType = '';
          this.result[i].basedOn = '';
          this.result[i].labelName = '';
          this.result[i].comboValues = [''];
          this.result[i].customFieldData = [''];
          this.customFieldComboData[i] = [];   
        }, 100);
      }else{
        this.result[i].customHdrId = event.customHdrId;
        this.result[i].inputType = event.inputType;
        this.result[i].basedOn = event.basedOn;
        this.result[i].labelName = event.labelName;
        this.result[i].comboValues = [''];
        this.result[i].customFieldData = event.customComboList;
        this.customFieldComboData[i] = event.customComboList;  

        this.disableSubmitButton(this.result);
        this.disableAddBtn = false;
      }
    } else{
      this.result[i].customHdrId = 0;
      this.result[i].inputType = '';
      this.result[i].basedOn = '';
      this.result[i].labelName = '';
      this.result[i].comboValues = [''];
      this.result[i].customFieldData = [''];
      this.customFieldComboData[i] = [];
    }
    this.tableAssignee.renderRows();
  }

  onAdd(){
    this.result.push(this.getParticipant1());
    this.disableSubmit = true;
    this.disableAddBtn = true;
    this.tableAssignee.renderRows();        
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  removeUnit(i: number, element) {
    this.result.splice(i,1);
    this.tableAssignee.renderRows();
    if(element.inputType === 'CHECKBOX'){
      this.count = 0;      
    }
    this.disableSubmitButton(this.result);  
  }

  disableSubmitButton(element){    
    if (element.length > 0) {
      for (let j = 0; j < element.length; j++) {
        if (element[j].customHdrId != 0) {
          this.disableSubmit = false; 
          this.disableAddBtn = false;     
        }else{          
          this.disableSubmit = true;
          this.disableAddBtn = true;
        }
      }
    }
  }

  save(isValid: boolean) {
    const searchData = [];    
    if (isValid) {
      for(let j=0;j<this.result.length;j++){
        for(let i=0;i<this.result[j].comboValues.length;i++){
          if(searchData.indexOf(JSON.stringify((this.result[j].comboValues[i]))) == -1){
            searchData.push(JSON.stringify(this.result[j].comboValues[i]))
          }
          else if(this.result[j].comboValues[i] != ''){            
            this.commonService.openToastWarningMessage(this.result[j].labelName + " Search Field Value Already Exists");
            return;
          }
        }
      }
    }
    if(this.result.length == 0){
      this.dialogRef.close({'status':true,'response': []});
    }
    else{
      this.dialogRef.close({'status':isValid,'response': this.result});
    }
  }

  getList(searchValue) {
    this.subloader = true;
    this.commonService.getComboResults(this.assetOptimaServices.fetchListOfAllCategoryCustomFieldsCombo, searchValue.term, '','', 0, 0,'','','','',this.selectedSubCategoryIds).subscribe(
      data => {
        if (data.success) {
          this.cusFieldHdrList = data.responseData.comboList;                    
          this.subloader = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subloader = false;
        }
      }, error => {
        this.subloader = false;
      }
    );
  }

  custFieldDtValidation(event,i,j){    
    if(event.value){
      this.result[i].comboValues[j] = moment(event.value).format(this.assetOptimaConstants.YYYY_MM_DD);
    }
    else{
      this.result[i].comboValues = [''];
    } 
    return false;
  }

  custCheckboxValue(event,i,j){
    if(event){
      this.result[i].comboValues[j] = event;      
    }
    else{
      this.result[i].comboValues = [''];
    }
  }

  custDropdownValue(event,i,list){
    if(event == 'clear'){
      this.customFieldComboData[i] = list;
    }
  }

  removevalue(i,j,element){        
    this.result[i].comboValues.splice(j,1);
    if(element.inputType === 'CHECKBOX'){
      this.count--;      
    }
  }
}
