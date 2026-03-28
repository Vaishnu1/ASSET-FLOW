import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';


@Component({
  selector: 'app-printer-template-create',
  templateUrl: './printer-template-create.component.html',
  styleUrls: ['./printer-template-create.component.css']
})
export class PrinterTemplateCreateComponent implements OnInit {

  fileUploadFlag : boolean;
  printerTemplateForm: FormGroup;
  public fileToUpload: File;

  isAddMode: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;

  locationCombo: any = [];
  scrollLocationNameSync: boolean = false;
  locationNamePageNumber: number;

  displayButton: string;

  @ViewChild('docName') docNameFocus: ElementRef;
  @ViewChild('printerTemplateUpload') printerTemplateUpload: ElementRef<HTMLElement>;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint(); 

  recordsPerPageForCombo: string; 

  printerModelCombo: any = [];
  scrollPrinterModelSync: boolean = false;
  printerModelPageNumber: number;

  printerLabelSizeCombo: any = [];
  scrollPrinterLabelSizeSync: boolean = false;
  printerLabelSizePageNumber: number;

  templatePath: string = "";
  defaultlocatoininfo: {};
  getData: getData;
  
  ErrorMsg: String = '';
  tempValue: String = '';

  constructor(private readonly commonService: CommonService, 
              public dialogRef: MatDialogRef<PrinterTemplateCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private readonly assetOptimaConstants: AssetOptimaConstants,
              private readonly userSessionService:UserSessionService) { 
    
    this.locationNamePageNumber = 1;
    this.printerModelPageNumber = 1;
    this.printerLabelSizePageNumber = 1;
              
  }
 
  ngOnInit(): void {
     
    this.printerTemplateForm = new FormGroup({
      printerTemplateId: new FormControl(0),
      printerModelId: new FormControl(''),
      printerModel: new FormControl('',[Validators.required]),
      printerLabelId: new FormControl(''),
      labelSize: new FormControl('',[Validators.required]),
      templateName:  new FormControl('',[Validators.required,Validators.maxLength(100)]),
      //fileName: new FormControl(''),
      fileType: new FormControl(''),
      templatePath: new FormControl(''),//not in use
      defaultTemplate: new FormControl(false),

      active: new FormControl(true),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(Date),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''), 
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      locationId: new FormControl(''),
      locationName: new FormControl('')
    });
    this.printerTemplateForm.controls.labelSize.disable();

  }

  ngAfterViewInit() {
    if(this.data.printerTemplateInfo !== 0){
      if(this.data.mode === 'view'){
        this.isViewMode = true;
        this.printerTemplateForm.disable();
      }else{
        this.displayButton="Update";
        this.isEditMode = true;
      }
      
      this.fileName=this.data.printerTemplateInfo.fileName;
      this.templatePath=this.data.printerTemplateInfo.templatePath;
      this.printerTemplateForm.controls.printerTemplateId.setValue(this.data.printerTemplateInfo.printerTemplateId);
      this.printerTemplateForm.controls.printerModelId.setValue(this.data.printerTemplateInfo.printerModelId);
      this.printerTemplateForm.controls.printerModel.setValue(this.data.printerTemplateInfo.printerModel);
      this.printerTemplateForm.controls.printerLabelId.setValue(this.data.printerTemplateInfo.printerLabelId);
      this.printerTemplateForm.controls.labelSize.setValue(this.data.printerTemplateInfo.labelSize);
      this.printerTemplateForm.controls.templateName.setValue(this.data.printerTemplateInfo.templateName);
      this.tempValue = this.data.printerTemplateInfo.templateName;
      this.printerTemplateForm.controls.fileType.setValue(this.data.printerTemplateInfo.fileType);
      this.printerTemplateForm.controls.defaultTemplate.setValue(this.data.printerTemplateInfo.defaultTemplate);
      this.printerTemplateForm.controls.active.setValue(this.data.printerTemplateInfo.active);
      this.printerTemplateForm.controls.createdBy.setValue(this.data.printerTemplateInfo.createdBy);
      this.printerTemplateForm.controls.createdDt.setValue(this.data.printerTemplateInfo.createdDt);
      this.printerTemplateForm.controls.createdDtDisp.setValue(this.data.printerTemplateInfo.createdDtDisp);
      this.fileUploadFlag=true
    }else{
      if(this.data.mode === 'add'){
        this.displayButton="Submit";
        this.isAddMode = true;
      }
    }

    this.defaultlocatoininfo = {
      locationId : this.userSessionService.getUserLocationId(),
      locationName : this.userSessionService.getUserLocationName()
    }

    this.setLocationNameComboValue(this.defaultlocatoininfo)


  }

  closeModal(){
    this.dialogRef.close();
  }

  uploadPrinterTemplateFile() {
    
    const formData: FormData = new FormData();
    formData.append('printerTemplateImage', this.fileToUpload); 
    const printerTemplateData={'fileName':this.fileName,
                      'printerTemplateId':this.printerTemplateForm.controls.printerTemplateId.value,
                      'printerModelId':this.printerTemplateForm.controls.printerModelId.value,
                      'printerModel':this.printerTemplateForm.controls.printerModel.value,
                      'printerLabelId':this.printerTemplateForm.controls.printerLabelId.value,
                      'labelSize':this.printerTemplateForm.controls.labelSize.value,
                      'templateName':this.printerTemplateForm.controls.templateName.value, 
                      'templatePath':this.templatePath,  
                      'defaultTemplate':this.printerTemplateForm.controls.defaultTemplate.value,
                      'fileType':this.printerTemplateForm.controls.fileType.value,
                      'active':this.printerTemplateForm.controls.active.value,
                      'createdBy':this.printerTemplateForm.controls.createdBy.value,
                      'createdDt':this.printerTemplateForm.controls.createdDt.value,
                      'createdDtDisp':this.printerTemplateForm.controls.createdDtDisp.value,
                      'userId':this.userSessionService.getUserId(),
                      'locationId': this.printerTemplateForm.controls.locationId.value,
                      'orgId':this.userSessionService.getUserOrgId()}; 
    formData.append('printerTemplateImageData',JSON.stringify(printerTemplateData));
    
    // To start loading  
    this.commonService.commonFileUpload('saveOrUpdatePrinterLabelTemplate.sams', formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          if(this.printerTemplateForm.controls.defaultTemplate.value){
            setTimeout(() => {
              this.commonService.openToastSuccessMessage("Default templete updated to "+this.printerTemplateForm.controls.templateName.value+"."); 
            }, 1000);
          }
          this.closeModal();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
        // To end loading
      }, error => {
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError); 
        //To end loading
      }
    );
  }
 
  fileName: string;
  handleFileInput(files: FileList) { 
    this.fileToUpload = files[0]; 
    
    if (true) {
      if (((this.fileToUpload.size / 1024) / 1024) < 5) {
        this.fileName = this.fileToUpload.name.split('.')[0];   
        this.fileUploadFlag = true;
      } else { 
        this.commonService.openToastWarningMessage('File Size Can Be Up To 5MB.');
        this.fileUploadFlag = false;
      }
    }
  }

  setLocationNameComboValue(event) {
    // this.printerTemplateForm.controls.printerModel.setValue('');
    // this.printerTemplateForm.controls.labelSize.setValue('');
    if (event === undefined) {
      this.printerTemplateForm.controls.locationId.setValue(0);
      this.printerTemplateForm.controls.locationName.setValue('');
      this.locationNamePageNumber = 1;
      this.locationCombo = [];
    } else {
      this.printerTemplateForm.controls.locationId.setValue(event.locationId);
      this.printerTemplateForm.controls.locationName.setValue(event.locationName);
    }
  }

  listOfLocationName(searchValue) {
    this.scrollLocationNameSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber , this.locationCombo , data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNameSync = false;
      }
    );
  }

  listOfPrinterModel(searchValue) { 
    
    this.scrollPrinterModelSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterModelCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.printerModelPageNumber,'','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.printerModelPageNumber , this.printerModelCombo , data.responseData.comboList)
          this.printerModelPageNumber = this.getData.pageNumber;
          this.printerModelCombo = this.getData.dataList;
          this.scrollPrinterModelSync = false;
        }
      );
  }
 
  setPrinterModel(event) {
    if (event === undefined) {
      this.printerTemplateForm.controls.printerModelId.setValue(0);
      this.printerTemplateForm.controls.printerModel.setValue('');
      this.printerModelPageNumber = 1;
      //Clear label size combo
      this.printerTemplateForm.controls.printerLabelId.setValue(0);
      this.printerTemplateForm.controls.labelSize.setValue('');
      this.printerLabelSizePageNumber = 1;
      this.printerLabelSizeCombo = [];
      this.printerTemplateForm.controls.labelSize.disable();
      this.printerModelCombo = [];

    } else {
      this.printerTemplateForm.controls.printerModelId.setValue(event.printerModelId);
      this.printerTemplateForm.controls.printerModel.setValue(event.printerModel);
      this.printerTemplateForm.controls.labelSize.enable();
      this.uniqueValidation();
    }
  } 

  listOfPrinterLabelSize(searchValue) {
    this.scrollPrinterLabelSizeSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterLabelSizeCombo.sams', searchValue.term, this.printerTemplateForm.controls.printerModelId.value, '',
      this.recordsPerPageForCombo, this.printerLabelSizePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.printerLabelSizePageNumber , this.printerLabelSizeCombo , data.responseData.comboList)
          this.printerLabelSizePageNumber = this.getData.pageNumber;
          this.printerLabelSizeCombo = this.getData.dataList;
          this.scrollPrinterLabelSizeSync = false;
        }
      );
  }
 
  setPrinterLabelSize(event) {
    if (event === undefined) {
      this.printerTemplateForm.controls.printerLabelId.setValue(0);
      this.printerTemplateForm.controls.labelSize.setValue('');
      this.printerLabelSizePageNumber = 1;
      this.printerLabelSizeCombo= [];
    } else {
      this.printerTemplateForm.controls.printerLabelId.setValue(event.printerLabelId);
      this.printerTemplateForm.controls.labelSize.setValue(event.labelSize);
    }
  }

  uniqueValidation() {
    if(this.printerTemplateForm.controls.templateName.value !== ''){
      this.printerTemplateForm.controls.templateName.setValue(this.printerTemplateForm.controls.templateName.value.trim())
    }

    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.printerTemplateForm.controls.templateName.value != null) ? this.printerTemplateForm.controls.templateName.value.toLowerCase() : '')) {

    } else if(this.printerTemplateForm.controls.templateName.value === ''){
     // this.printerTemplateForm.controls.templateName.setErrors(Validators.required);
    }else{

      if(this.printerTemplateForm.controls.templateName.value !== '' && this.printerTemplateForm.controls.printerModelId.value >0){
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.PrinterTemplateTO";
      constraintData.constraints = {
        'printerModelId': this.printerTemplateForm.controls.printerModelId.value,
        'templateName': this.printerTemplateForm.controls.templateName.value
      };

      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.printerTemplateForm.controls.templateName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            this.printerTemplateForm.controls.templateName.setErrors(null);
          }
        }
      );
     }
    }
  }

}
