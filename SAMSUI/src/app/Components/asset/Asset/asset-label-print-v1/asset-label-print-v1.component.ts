import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants'; 
import { CommonHint } from '../../../../Constants/CommonHint';
import { BrotherPrinterService } from '../../../../Services/brother-printer-service/brother-printer.service';
import { ZebraPrinterService } from '../../../../Services/zebra-printer-service/zebra-printer.service';
import { DefaultPrinterService } from '../../../../Services/default-printer-service/default-printer-service'
import { CommonService } from '../../../../Services/common-service/common.service';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";
import { getData } from 'src/app/Model/common/fetchListData';
 
@Component({
  selector: 'app-asset-label-print-v1',
  templateUrl: './asset-label-print-v1.component.html',
  styleUrls: ['./asset-label-print-v1.component.css']
})
export class AssetLabelPrintV1Component implements OnInit {

  assetLabelPrintForm: FormGroup;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint(); 

  recordsPerPageForCombo: string; 

  printersComboDisplay: boolean = false;

  printerCombo: any = [];
  scrollPrinterSync: boolean = false;
  printerPageNumber: number;

  printerModelCombo: any = [];
  scrollPrinterModelSync: boolean = false;
  printerModelPageNumber: number;

  printerLabelSizeCombo: any = [];
  scrollPrinterLabelSizeSync: boolean = false;
  printerLabelSizePageNumber: number;

  printerTemplateCombo: any = [];
  scrollPrinterTemplateSync: boolean = false;
  printerTemplatePageNumber: number;

  assetDataSource = [];

  changePrintIconButtonToPrint: boolean = false;

  templatefilename : any = "";
  templatefile : any;


  
  printerManufacturer : any = "";
  printerList : any = []
 
  templateFileContent;

  cuttingtool : any

  //Label Cut Combo
  labelCutCombo = [
    {id: 0, name: 'HALF CUT'},
    {id: 1, name: 'FULL CUT'}
  ]; 
  getData: getData;

  constructor( private readonly dialogRef: MatDialogRef<AssetLabelPrintV1Component>,
              @Inject(MAT_DIALOG_DATA) private readonly data,
              private readonly validationService: AssetOptimaConstants,  
              private readonly userSessionService: UserSessionService,
              private readonly commonService: CommonService, 
              private readonly brotherPrinterService: BrotherPrinterService,
              private readonly  zebraPrinterService : ZebraPrinterService,
              private readonly defaultprinterservice : DefaultPrinterService) { 

          this.printerPageNumber = 1;
          this.printerModelPageNumber = 1;
          this.printerLabelSizePageNumber = 1;
          this.printerTemplatePageNumber = 1;  

  }

  ngOnInit(): void { 
    this.assetLabelPrintForm = new FormGroup({ 
 
      PrinterType: new FormControl(true),

      printerId: new FormControl(0),
      printerName: new FormControl(''),

      printerModelId: new FormControl(0),
      printerModel: new FormControl('DEFAULT',[Validators.required]),
      printerLabelId: new FormControl(0),  
      labelSize: new FormControl('DEFAULT',[Validators.required]),
      printerTemplateId: new FormControl(0),
      templateName:  new FormControl('DEFAULT',[Validators.required]),

      printerManufacturer: new FormControl(''),
      communicationType: new FormControl(''),
      fileName: new FormControl(''),
      templatePath: new FormControl(''),
      fileExtension:new FormControl('PDF'),
      pdfType : new FormControl('BARCODE'),
      noOfLabels: new FormControl('1',[Validators.required, Validators.maxLength(2), Validators.pattern(this.validationService.numericValidation)]),

      labelCutForDisp: new FormControl('HALF CUT',[Validators.required]),
      labelCut: new FormControl(0,[Validators.maxLength(2), Validators.pattern(this.validationService.numericValidation)]),

      userTemplateSavedPath: new FormControl('',[Validators.required, Validators.maxLength(200)]),

      assetList: new FormControl([]),

      orgId: new FormControl(this.userSessionService.getUserOrgId()),
      locationId: new FormControl(this.userSessionService.getUserLocationId()),
    });
    this.assetLabelPrintForm.controls.labelSize.disable();
    this.assetLabelPrintForm.controls.templateName.disable();

    const self = this;  
    this.commonService.convertImagetoBase62Service('assets/images/cutter tool.jpg').subscribe(
      (data) => { 
            const reader = new FileReader();
            reader.onloadend = () => {  
                self.cuttingtool =  reader.result
            } 
            reader.readAsDataURL(data);  
      })
    // this.checkDefaultPrinterDetails();

    this.getSystemPrinterDeatils();
  }

 checkDefaultPrinterDetails(){
      this.commonService.getComboResults('fetchListOfAllPrinterCombo.sams', '', '', '',
      100, 1).subscribe(
        (data) => {    
          
              if(data.success && data.responseData.comboList.length > 0){  
                this.printerCombo = data.responseData.comboList; 
                
                data.responseData.comboList.map(async (e)=>{ 


                  if(e.defaultPrinter && (e.printerManufacturer === "Asset Optima" || e.printerManufacturer ==="Honeywell")){

                    this.assetLabelPrintForm.controls.PrinterType.setValue(true); 
                    
                    this.printersComboDisplay = false
                    this.assetLabelPrintForm.controls.printerManufacturer.setValue(e.printerManufacturer);
                    // this.assetLabelPrintForm.controls.printerModel.disable();
                    // this.assetLabelPrintForm.controls.printerModel.setValue(e.printerModel);
                    this.assetLabelPrintForm.controls.printerModelId.setValue(e.printerModelId);
                    this.assetLabelPrintForm.controls.userTemplateSavedPath.disable(); 
                    this.assetLabelPrintForm.controls.labelCutForDisp.disable(); 
                    this.assetLabelPrintForm.controls.labelCut.disable();
                    if(e.printerManufacturer ==="Honeywell"){
                      this.assetLabelPrintForm.controls.noOfLabels.disable();
                    }

                  }
                  else if(e.defaultPrinter){   
                    this.printerList = [];

                    if(e.printerManufacturer === "Zebra Technologies"){ 

                      const browserPrint =  new ZebraBrowserPrintWrapper();  
                      const devices = await browserPrint.getAvailablePrinters(); 
                      this.printerList = [];
        
                      devices.map((data)=>{ 
                        if(data.name !== ""){ 
                          this.printerList.push(data)  
                        }
                      })

                    } 

                    this.printerManufacturer = e.printerManufacturer; 

                    // this.assetLabelPrintForm.controls.printerModelId.setValue(e.printerModelId);
                    // this.assetLabelPrintForm.controls.printerModel.setValue(e.printerModel);
                    // this.assetLabelPrintForm.controls.printerModel.disable();

                    this.assetLabelPrintForm.controls.userTemplateSavedPath.enable(); 
                    this.assetLabelPrintForm.controls.labelCutForDisp.enable(); 
                    this.assetLabelPrintForm.controls.labelCut.enable(); 
              
                    this.assetLabelPrintForm.controls.labelSize.enable();
                    this.assetLabelPrintForm.controls.printerLabelId.setValue(0);
                    this.assetLabelPrintForm.controls.labelSize.setValue('');
                    this.assetLabelPrintForm.controls.templateName.disable();
                    this.assetLabelPrintForm.controls.printerTemplateId.setValue(0);
                    this.assetLabelPrintForm.controls.templateName.setValue('');
                    this.printerPageNumber = 1; 
                    this.printerModelPageNumber = 1;
                    this.printerModelCombo = [];
                    this.printerLabelSizePageNumber = 1;
                    this.printerLabelSizeCombo = [];
                    this.printerTemplatePageNumber = 1;
                    this.printerTemplateCombo = [];
                    //DisplayCombo
                    this.printersComboDisplay=true; 
                  } 
                })  
              }else{
                // this.printerManufacturer === "Asset Optima"
                this.printersComboDisplay = false 
                // this.assetLabelPrintForm.controls.printerModel.setValue('DEFAULT');
                this.assetLabelPrintForm.controls.userTemplateSavedPath.disable(); 
              }

        })
  }

  ngAfterViewInit() {
    this.assetDataSource=this.data.assetList;
    
  }
 
  closeModal(){
    this.dialogRef.close();
  }

 async handleTemplateFileInput(event){   
   this.templateFileContent = ""

    this.assetLabelPrintForm.controls.userTemplateSavedPath.setValue(event.target.files[0].name)
    
    this.templatefile = event.target.files[0]

    this.templatefilename = event.target.files[0].name 
  } 

  setCustomPrinter(event){
    
    if(event === 1){ 
      this.assetLabelPrintForm.controls.PrinterType.setValue(false);
 
      this.assetLabelPrintForm.controls.userTemplateSavedPath.enable(); 
      this.assetLabelPrintForm.controls.labelCutForDisp.enable(); 
      this.assetLabelPrintForm.controls.labelCut.enable(); 
      this.assetLabelPrintForm.controls.printerModel.enable(); 

      this.assetLabelPrintForm.controls.printerModelId.setValue(0);
      this.assetLabelPrintForm.controls.printerModel.setValue('');
      this.assetLabelPrintForm.controls.labelSize.disable();
      this.assetLabelPrintForm.controls.printerLabelId.setValue(0);
      this.assetLabelPrintForm.controls.labelSize.setValue('');
      this.assetLabelPrintForm.controls.templateName.disable();
      this.assetLabelPrintForm.controls.printerTemplateId.setValue(0);
      this.assetLabelPrintForm.controls.templateName.setValue('');
      this.printerPageNumber = 1; 
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];
      this.printerLabelSizePageNumber = 1;
      this.printerLabelSizeCombo = [];
      this.printerTemplatePageNumber = 1;
      this.printerTemplateCombo = [];
      //DisplayCombo
      this.printersComboDisplay=true;
    }
    else {
      this.assetLabelPrintForm.controls.PrinterType.setValue(true);  
      this.checkDefaultPrinterDetails() 
    }
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
      this.assetLabelPrintForm.controls.printerModelId.setValue(0);
      this.assetLabelPrintForm.controls.printerModel.setValue('');
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];

      //Clear Label Size Combo Also
      this.assetLabelPrintForm.controls.labelSize.disable();
      this.assetLabelPrintForm.controls.printerLabelId.setValue(0);
      this.assetLabelPrintForm.controls.labelSize.setValue('');
      this.printerLabelSizePageNumber = 1;
      this.printerLabelSizeCombo = [];
      //Clear Template Combo
      this.assetLabelPrintForm.controls.templateName.disable();
      this.assetLabelPrintForm.controls.printerTemplateId.setValue(0);
      this.assetLabelPrintForm.controls.templateName.setValue('');
      this.printerTemplatePageNumber = 1;
      this.printerTemplateCombo = [];

    } else { 

      if(event.printerModel === 'DEFAULT'){ 
        this.printersComboDisplay = false;    
      }
      else{
        this.printersComboDisplay = true; 
        this.assetLabelPrintForm.controls.templateName.enable();
        this.assetLabelPrintForm.controls.labelSize.enable();
        this.assetLabelPrintForm.controls.userTemplateSavedPath.enable(); 
        this.assetLabelPrintForm.controls.labelCutForDisp.enable(); 
        this.assetLabelPrintForm.controls.labelCut.enable(); 
      }
 
       
      if(this.printerCombo.length > 0){
        this.printerCombo.map(async (e)=>{ 
          
            if(e.printerModel === event.printerModel && e.printerManufacturer === "Zebra Technologies"){ 
              const browserPrint =  new ZebraBrowserPrintWrapper();  
              const devices = await browserPrint.getAvailablePrinters(); 

              this.printerList = [];

              devices.map((data, i)=>{ 
                
                if(data.name !== ""){ 
                  this.printerList.push(data)  
                }
              })  
            }
            else{ 
                this.printerList = []; 
            }
        })
      }
 
      this.assetLabelPrintForm.controls.printerModelId.setValue(event.printerModelId);
      this.assetLabelPrintForm.controls.printerModel.setValue(event.printerModel); 
      
      this.assetLabelPrintForm.controls.labelSize.enable();
    }
  } 

  listOfPrinterLabelSize(searchValue) {
    this.scrollPrinterLabelSizeSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterLabelSizeCombo.sams', searchValue.term, this.assetLabelPrintForm.controls.printerModelId.value, '',
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
      this.assetLabelPrintForm.controls.printerLabelId.setValue(0);
      this.assetLabelPrintForm.controls.labelSize.setValue('');
      this.printerLabelSizePageNumber = 1;
      this.printerLabelSizeCombo = [];
      //Clear Template Combo
      this.assetLabelPrintForm.controls.templateName.disable();
      this.assetLabelPrintForm.controls.printerTemplateId.setValue(0);
      this.assetLabelPrintForm.controls.templateName.setValue('');
      this.printerTemplatePageNumber = 1;
      this.printerTemplateCombo = [];
    } else {
      this.assetLabelPrintForm.controls.printerLabelId.setValue(event.printerLabelId);
      this.assetLabelPrintForm.controls.labelSize.setValue(event.labelSize);
      this.assetLabelPrintForm.controls.templateName.enable();
    }
  }

  listOfPrinterTemplate(searchValue) {
    this.scrollPrinterTemplateSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterTemplateCombo.sams', searchValue.term, 
                                       this.assetLabelPrintForm.controls.printerModelId.value, this.assetLabelPrintForm.controls.printerLabelId.value,
      this.recordsPerPageForCombo, this.printerTemplatePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.printerTemplatePageNumber , this.printerTemplateCombo , data.responseData.comboList)
          this.printerTemplatePageNumber = this.getData.pageNumber;
          this.printerTemplateCombo = this.getData.dataList;
          this.scrollPrinterTemplateSync = false;
        }
      );
  }
 
  setPrinterTemplate(event) {
    if (event === undefined) {
      this.assetLabelPrintForm.controls.printerTemplateId.setValue(0);
      this.assetLabelPrintForm.controls.templateName.setValue('');
      this.printerTemplatePageNumber = 1;
      this.printerTemplateCombo = [];
    } else {
      this.assetLabelPrintForm.controls.printerTemplateId.setValue(event.printerTemplateId);
      this.assetLabelPrintForm.controls.templateName.setValue(event.templateName);
    }
  }

  zeroValidation(){
    if(this.assetLabelPrintForm.controls.noOfLabels.value === 0){
      this.assetLabelPrintForm.controls.noOfLabels.setValue(1);
      this.commonService.openToastWarningMessage("Kindly input greater than 0");
    }
  } 

  printLabel(){    
    // if(this.assetLabelPrintForm.controls.printerModel.value === "DEFAULT" && this.assetLabelPrintForm.controls.printerManufacturer.value === "Asset Optima"){
    //   this.defaultprinterservice.DefaultPrintService((this.assetDataSource.filter(obj=> (obj?.assetCode))), this.assetLabelPrintForm.controls.noOfLabels.value, this.cuttingtool,this.assetLabelPrintForm.controls.fileExtension.value,this.assetLabelPrintForm.controls.pdfType.value)
    // }else if(this.assetLabelPrintForm.controls.printerModel.value === "SEP-DEFAULT" && this.assetLabelPrintForm.controls.printerManufacturer.value === "Honeywell"){
    //   this.generateTxtFile();
    // }else{
    //   this.commonService.commonInsertService('getCustomPrinterDetails.sams',this.assetLabelPrintForm.getRawValue()).subscribe(
    //     data => {
    //       if(data.success){    

    //         this.assetLabelPrintForm.patchValue(data.responseData);
    //         this.customPrint(data.responseData)
    //         this.changePrintIconButtonToPrint = false;
             
    //         // if(data.responseData.templatePath === this.templatefilename){
    //         //   this.assetLabelPrintForm.patchValue(data.responseData);
    //         //   this.changePrintIconButtonToPrint = false;
    //         //   this.customPrint(data.responseData);
    //         // }
    //         // else{
    //         //   this.commonService.openToastWarningMessage("Please select the proper template file"); 
    //         // }
  
    //       } else {
    //         this.commonService.openToastErrorMessage(data.message);
    //         this.changePrintIconButtonToPrint = false;
    //       } 
    //     });
    // }  


    this.defaultprinterservice.DefaultPrintService(this.assetDataSource, this.assetLabelPrintForm.controls.noOfLabels.value, this.cuttingtool,this.assetLabelPrintForm.controls.fileExtension.value,this.assetLabelPrintForm.controls.pdfType.value,this.assetLabelPrintForm.controls.printerModel.value)

  }

  customPrint(data){   
    
    const templatePath = this.assetLabelPrintForm.controls.templatePath.value;
    const noOfLabels = this.assetLabelPrintForm.controls.noOfLabels.value;
    const labelCut = this.assetLabelPrintForm.controls.labelCut.value;
    let templateSavedFolder = this.assetLabelPrintForm.controls.userTemplateSavedPath.value; 

    //If User Give backslash(\) replace to this (/)
    templateSavedFolder=templateSavedFolder.split('\\').join('/');

    if(templateSavedFolder.charAt(templateSavedFolder.length - 1) !== "/"){
      templateSavedFolder = templateSavedFolder+"/";
    }  
 
    if(data.printerManufacturer === "Zebra Technologies"){   
      const self = this;    
      const fileReader = new FileReader();
      fileReader.onload = e => { 
        self.templateFileContent = fileReader.result; 
        this.zebraPrinterService.customPrintService(this.assetDataSource, fileReader.result, noOfLabels, this.assetLabelPrintForm.controls.printerName.value);  
        return fileReader.result
      };
      fileReader.readAsBinaryString(this.templatefile);   
    } else if(data.printerManufacturer === "Brother International"){
      this.brotherPrinterService.customPrintService(this.assetDataSource, templatePath, noOfLabels, labelCut, templateSavedFolder);
    } 
  } 

  downloadTemplates(){
    this.commonService.commonInsertService('downloadAllTemplates.sams',this.assetLabelPrintForm.getRawValue()).subscribe(
      data => {
        if(data.success){
          let filePath=data.responseData;
          let fileName = filePath.split('.')[0];
          this.commonService.downloadExcelFile(filePath).subscribe(
            data => { 
              this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
              this.deleteDownloadedFile(filePath);
            }
          );
        } else {
          this.commonService.openToastWarningMessage(data.message);
          this.changePrintIconButtonToPrint = false;
        } 
      });
  }

  deleteDownloadedFile(filePath ?: string){
    this.commonService.deleteFileFromServer(filePath).subscribe(
      data => {
      
      }
    );
  } 

  generateTxtFile() {
    let txtContent = '';

    this.assetDataSource.forEach((asset) => {
      let assetCode= "AC:"+asset.assetCode;
      let remainingEmptySpace = new Array(104-(assetCode.length)).join(' ');
      let qrData = assetCode + remainingEmptySpace;
      let purDt = this.commonService.convertSstringdd_mm_yyyy_To_yyyy_mm_dd(asset.purchaseDtDisp)

      const values = [asset.assetCode, asset.assetCategoryName, asset.departmentName, purDt, 
                      asset.locationCode, qrData].join('|');
      txtContent += values + '\n';
    });

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AO Label Print.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  pdfFormatChange(value){
    this.assetLabelPrintForm.controls.fileExtension.setValue(value); 
  }

  getSystemPrinterDeatils(){
    this.commonService.commonInsertService('getPrinterDetails.sams',this.assetLabelPrintForm.getRawValue()).subscribe(
      data => {
        if(data.success){    
          
          this.printerModelCombo = data.responseData;

        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.changePrintIconButtonToPrint = false;
        } 
      });
  }

}

