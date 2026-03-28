import { Injectable } from '@angular/core';
import { CommonService } from '../common-service/common.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";

@Injectable({
  providedIn: 'root'
})
export class ZebraPrinterService {
 
  list = [];  
  
  template = "" 

  constructor(private commonService: CommonService) { }
  
  async customPrintService(assetList?: any,templateFileContent?: any, noOfLabels?: number, printerName?: any) {

    if(printerName === ""){
      this.commonService.openToastWarningMessage("Printer not Connected.");
        return false;
    }
 
    this.list=assetList; 
    
    if(noOfLabels > 1){ 
      for(let i=0;i<noOfLabels-1;i++){ 
        this.list = this.list.concat(assetList)
      }
    } 

    for(let i=0; i<this.list.length; i++){ 
      let template = templateFileContent  
      template = template.replace('%ASSET_CODE%',this.list[i].assetCode)
      template = template.replace('%ASSET_CODE%',this.list[i].assetCode)
      template = template.replace('%MODEL%',this.list[i].modelName)
      template = template.replace('%MANUFACTURER%',this.list[i].manufacturerName)
      template = template.replace('%SERIAL_NO%',this.list[i].serialNo)
      template = template.replace('%PURCHASE_DATE%',this.list[i].purchaseDtDisp)
      template = template.replace('%INSTALLATION_DATE%',this.list[i].installationDtDisp) 

      this.Print(template, printerName)  
    }  
  }

  async Print(data, printerName){  

    this.template = ""
    
    const browserPrint =  new ZebraBrowserPrintWrapper();  

    const defaultPrinter =  await browserPrint.getDefaultPrinter();

    browserPrint.checkPrinterStatus().then(data=>{
      console.log(data);
      
    }) 
     
    browserPrint.setPrinter(defaultPrinter);
 
      const devices = await browserPrint.getAvailablePrinters();  
       
      if(devices.length < 1){
        this.commonService.openToastWarningMessage("Printer Not Connected."); 
      }
      else{ 
        devices.map((e)=>{
            if(e.name === printerName){
              browserPrint.setPrinter(e);
            }
        }) 
   
        browserPrint.print(data) 
      }
    
  } 

} 

