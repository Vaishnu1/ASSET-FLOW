import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { LabelMessageModel } from 'src/app/Model/base/labelMessage';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent implements OnInit {

  labelForm: FormGroup;

  locationList: any = [];
  recordsPerPageForCombo: number;
  currentPageNumber: number;

  uploadFlagUser: boolean = false;
  locationPageNumber:number;
  scrollsync: boolean = false;
  getData: getData;
  modelAccessModule: ModuleAccessModel;

  constructor(private commonService: CommonService,
    private readonly userSession: UserSessionService,
    private commonConstants: AssetOptimaConstants) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationPageNumber=1;
    this.modelAccessModule = new ModuleAccessModel();
  }

  public searchOption = { 'languageCode': 'en', 'labelType': 'LABEL', 'labelMessageDisp': [], 'searchTerm': '', 'moduleName': '' ,'locationId':''};

  public labelMessage: LabelMessageModel[];
  public labelMessageDisp: LabelMessageModel[];
  public labelSearchedArray: LabelMessageModel[];
  length: String = '0';//set total record count here 
  pageIndex: String;//set page number starts with zeroo
  pageSize: String;// records per page
  startIndex: number;
  endIndex: number;
  limitCount: string;

  displayedColumns = ['sNo', 'labelKey', 'labelActualValue', 'labelUpdateValue'];


  ngOnInit() {
    this.labelForm = new FormGroup({
      moduleName: new FormControl(''),
      languageCode: new FormControl(''),
      labelType: new FormControl(''),
      labelActualValue: new FormControl(''),
      locationName: new FormControl('',[Validators.required]),
      locationId: new FormControl(''),
      labelUpdateValue: new FormControl(''),
      labelKey: new FormControl(''),
    })

    this.labelForm.controls.languageCode.setValue("en");
    this.labelForm.controls.languageCode.disable();
    this.labelForm.controls.labelType.setValue("LABEL");
    //this.loadLabelList();

    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_LABEL_CONFIGURATION'];

  }

  languageCode = [
    { id: 1, name: 'en' },
    { id: 2, name: 'ta' },
    { id: 3, name: 'hi' },
  ];

  labelTypeList = [
    { id: 1, name: 'LABEL' }

  ];

  moduleName = [
    { id: 1, name: 'COMMON', label:'COMMON' },
    { id: 2, name: 'MENU', label:'MENU' },
    { id: 3, name: 'ORGANIZATION', label:'ORGANIZATION' },
    { id: 4, name: 'ENTITY', label:'ENTITY' },
    { id: 5, name: 'TAX', label:'TAX' },
    { id: 6, name: 'REGION', label:'REGION' },
    { id: 7, name: 'DEPARTMENT', label:'DEPARTMENT' },
    { id: 8, name: 'SUBDEPARTMENT', label:'SUB DEPARTMENT' },
    { id: 9, name: 'DESIGNATION', label:'DESIGNATION' },
    { id: 10, name: 'UOM', label:'UOM' },
    { id: 11, name: 'CURRENCY', label:'CURRENCY' },
    { id: 12, name: 'LEGAL', label:'LEGAL' },
    { id: 13, name: 'REGISTRATION', label:'REGISTRATION' },
    { id: 14, name: 'ITEM', label:'ITEM' },
    { id: 15, name: 'ASSET', label:'ASSET' },
    { id: 16, name: 'MANUFACTURER', label:'MANUFACTURER' },
    { id: 17, name: 'MODEL', label:'MODEL' },
    { id: 18, name: 'ASSETGROUP', label:'ASSET GROUP' },
    { id: 19, name: 'ITEM', label:'ITEM' },
    { id: 20, name: 'SUPPLIER', label:'SUPPLIER' },
    { id: 21, name: 'SR', label:'SR' },
    { id: 22, name: 'EMPLOYEE', label:'EMPLOYEE' },
    { id: 23, name: 'STORE', label:'STORE' },
    { id: 24, name: 'LABEL', label:'LABEL' },
    { id: 25, name: 'GRN', label:'GRN' },
    { id: 26, name: 'REPORT', label:'REPORT' },
    { id: 27, name: 'PURCHASE', label:'PURCHASE' },
    { id: 28, name: 'GROUP', label:'GROUP' },
    { id: 29, name: 'GROUPACCESS', label:'GROUP ACCESS' },
    { id: 30, name: 'USER', label:'USER' }
  ];

  listOfLocation(searchTerms) {
    this.scrollsync=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchTerms != null ? searchTerms.term : '', '', '', this.limitCount, this.locationPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.locationPageNumber , this.locationList , data.responseData.comboList)
        this.locationPageNumber = this.getData.pageNumber;
        this.locationList = this.getData.dataList;
        this.scrollsync = false;
      }
    );
  }

  getLocationList(event) {
    if(event === undefined){
      this.labelForm.controls['locationName'].setValue('');
      this.labelForm.controls['locationId'].setValue(0);
      this.locationPageNumber=1;
      this.locationList = [];
    }else{
      this.labelForm.controls['locationName'].setValue(event.locationName);
      this.labelForm.controls['locationId'].setValue(event.locationId);
      this.loadLabelList();
    }
  }

  setPageNumber() {
    this.currentPageNumber = 0;

  }

  loadLabelList() {  
    this.searchOption.moduleName = this.labelForm.controls.moduleName.value;
    this.searchOption.labelType = this.labelForm.controls.labelType.value;
    this.searchOption.searchTerm = this.labelForm.controls.labelActualValue.value; 
    this.searchOption.locationId = this.labelForm.controls.locationId.value;
    this.commonService.commonGetService("fetchListLocLabels.sams", this.searchOption.labelType,this.searchOption.locationId).subscribe(
      data => {
        this.labelMessage = data.responseData;
        this.length = String(this.labelMessage.length);
        if (this.searchOption.searchTerm == '' &&this.searchOption.moduleName=='') { 
          this.displayValue();
        } else {  
          this.extractSearchTermValues(this.searchOption.moduleName );  
        }
      }
    );
  }

  displayValue() { 
    if (this.searchOption.searchTerm == '') {
      this.calculateStartEndIndexAllList();
    } else {
      this.calculateStartEndSearchedList();
    }
  } 

  calculateStartEndIndexAllList() {
    this.labelMessageDisp = [];
    let recordPerPage: number = Number(this.pageSize);
    let pageNumber: number = Number(this.pageIndex);
    var startIndex = recordPerPage * pageNumber;
    var endIndex = (startIndex + recordPerPage) <= this.labelMessage.length ? startIndex + recordPerPage : this.labelMessage.length;
    this.labelMessageDisp = [];
    for (var i = startIndex; i < endIndex; i++) {
      this.labelMessageDisp.push(this.labelMessage[i]);
    }
  }
  calculateStartEndSearchedList() {
    this.labelMessageDisp = [];
    let recordPerPage: number = Number(this.pageSize);
    let pageNumber: number = Number(this.pageIndex);
    var startIndex = recordPerPage * pageNumber;
    var endIndex = (startIndex + recordPerPage) <= this.labelSearchedArray.length ? startIndex + recordPerPage : this.labelMessage.length;
    this.labelMessageDisp = [];
    for (var i = startIndex; i < endIndex; i++) {
      this.labelMessageDisp.push(this.labelSearchedArray[i]);
    }
  } 
  extractSearchTermValues( moduleName) { 
    this.labelMessageDisp = [];
    let length = this.labelMessage.length;
    for (var i = 0; i < length; i++) {
      var item: string = this.labelMessage[i].labelActualValue;

      if (moduleName != "" && this.searchOption.searchTerm ) { 
      let string:String= this.labelMessage[i].labelKey.split("_")[0]; 
       let stringindex=item.indexOf(this.searchOption.searchTerm); 
        if (string== moduleName &&  stringindex>= 0) {             
          this.labelMessageDisp.push(this.labelMessage[i]);
        }
        continue; 
      }
      if (moduleName != "") {            
        let string:String= this.labelMessage[i].labelKey.split("_")[0];  
        if (string == moduleName) {    
          this.labelMessageDisp.push(this.labelMessage[i]);
          continue;
        }  
      }
     
    }
    this.length = String(this.labelMessageDisp.length);
  }

  saveUpdate() {
    this.uploadFlagUser=true;
    this.searchOption.labelMessageDisp = this.labelMessageDisp;
    this.commonService.commonListService("updateLocLabel.sams", this.searchOption).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.uploadFlagUser=false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlagUser=false;
        }
      }, error => {
        this.commonService.openToastErrorMessage(this.commonConstants.serverError);
        this.uploadFlagUser=false;
      }
    );
  }

  getIndexValue(index): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.displayValue();
  }

  search() {
    this.loadLabelList();
  }

  reset() {
    this.labelForm.controls.labelActualValue.setValue('');
    this.labelForm.controls.locationName.setValue('');
    this.labelForm.controls.locationId.setValue(0);
    this.labelForm.controls.moduleName.setValue('');
    this.labelForm.controls.languageCode.setValue("en");
    this.labelForm.controls.languageCode.disable();
    this.labelForm.controls.labelType.setValue("LABEL");
    this.loadLabelList();
  }


}     
