import { Injectable } from '@angular/core';
import { CommonService } from '../common-service/common.service';


declare const require : any;
const bpac = require('src/assets/bpac/bpac.js');

//const TEMPLATE_PATH = "Downloads";

@Injectable({
  providedIn: 'root'
})
export class BrotherPrinterService {

  list = [];

  constructor(private commonService: CommonService) { }

  async customPrintService(assetList?: any,templatePath?: any, noOfLabels?: number, labelCut?: number, templateSavedFolder?: string) {

	await this.checkbPacExtensionInstalled();

	const connected = await this.checkPrinterConnected();

	this.commonService.showSpinner();

	if(connected == true){

		try{

			const objDoc = bpac.IDocument;

			const ret = await objDoc.Open(templateSavedFolder+templatePath);
			if(ret == true)
			{
				this.list=assetList;
				for(let i=0; i<this.list.length; i++){

					await this.setLabelValues(objDoc,this.list[i]);

					//objDoc.Width = "20";

			        objDoc.StartPrint("", labelCut);
			        objDoc.PrintOut(noOfLabels, 0);

				}

				objDoc.EndPrint();
				objDoc.Close();
				this.commonService.openToastSuccessMessage("Print Command Sent.");
				this.commonService.hideSpinner();

			}else{
				this.commonService.openToastWarningMessage("Template not found in path.");
				this.commonService.hideSpinner();
			}
		}
		catch(e)
		{
			this.commonService.openToastWarningMessage(e);
			this.commonService.hideSpinner();
		}

	}else{
		this.commonService.openToastWarningMessage("Printer Not Connected");
		this.commonService.hideSpinner();
	}

  }


  async defaultPrintService(assetList?: any, labelCut?: number, templateSavedFolder?: string) {

	await this.checkbPacExtensionInstalled();

	const connected = await this.checkPrinterConnected();

	this.commonService.showSpinner();

	if(connected == true){

		try{
			this.commonService.showSpinner();

			this.list=assetList;
			const objDoc = bpac.IDocument;

			for(let i=0; i<this.list.length; i++){

				const ret = await objDoc.Open(templateSavedFolder + this.list[i].templatePath);
				if(ret == true)
				{
					await this.setLabelValues(objDoc,this.list[i]);

					//objDoc.Width = "20";

					objDoc.StartPrint("", labelCut);

			        objDoc.PrintOut(this.list[i].noOfLabels, 0);

				}else{
					this.commonService.openToastWarningMessage("Template not found in path.");
				    this.commonService.hideSpinner();
				}

			}
			objDoc.EndPrint();
			objDoc.Close();
			this.commonService.openToastSuccessMessage("Print Command Sent.");
			this.commonService.hideSpinner();
		}
		catch(e)
		{
			this.commonService.openToastWarningMessage(e);
			this.commonService.hideSpinner();
		}

	}else{
		this.commonService.openToastWarningMessage("Printer Not Connected.");
		this.commonService.hideSpinner();
	}

  }


  async setLabelValues(objDoc,value){

	const qrData = await objDoc.GetObject("qrData");
	if(qrData != undefined && qrData != null){
    let acAndSn= "AC:"+value.assetCode+" S/N:"+value.serialNo;
    let remainingLength = 200-(acAndSn.length);
    let remainingEmptySpace = new Array(remainingLength+1).join(' ');
    qrData.Text = acAndSn + remainingEmptySpace;
    // qrData.Text = value.assetCode;
		// qrData.Text = "#@V@1.0$@AC@"+value.assetCode+"$@SN@"+value.serialNo+"$@DN@"+value.description+"$@MF@"+value.manufacturerName+"$@MN@"+value.modelName+"$@MR@"+value.modelNo+"$@PR@"+value.purchaseDtDisp+"$@IN@"+value.installationDtDisp+"$#";
	}

	const assetCode = await objDoc.GetObject("assetCode");
	if(assetCode != undefined && assetCode != null){
		assetCode.Text = value.assetCode;
	}

	const serialNo = await objDoc.GetObject("serialNo");
	if(serialNo != undefined && serialNo != null){
		serialNo.Text = value.serialNo;
	}

	const description = await objDoc.GetObject("description");
	if(description != undefined && description != null){
		description.Text = value.description;
	}

	const modelName = await objDoc.GetObject("modelName");
	if(modelName != undefined && modelName != null){
		modelName.Text = value.modelName;
	}

	const modelNo = await objDoc.GetObject("modelNo");
	if(modelNo != undefined && modelNo != null){
		modelNo.Text = value.modelNo;
	}

	const manufacturerName = await objDoc.GetObject("manufacturerName");
	if(manufacturerName != undefined && manufacturerName != null){
		manufacturerName.Text = value.manufacturerName;
	}

	const departmentName = await objDoc.GetObject("departmentName");
	if(departmentName != undefined && departmentName != null){
		departmentName.Text = value.departmentName;
	}

	const blockName = await objDoc.GetObject("blockName");
	if(blockName != undefined && blockName != null){
		blockName.Text = value.blockName;
	}

	const floorName = await objDoc.GetObject("floorName");
	if(floorName != undefined && floorName != null){
		floorName.Text = value.floorName;
	}

	const segmentName = await objDoc.GetObject("segmentName");
	if(segmentName != undefined && segmentName != null){
		segmentName.Text = value.segmentName;
	}

	const roomName = await objDoc.GetObject("roomName");
	if(roomName != undefined && roomName != null){
		roomName.Text = value.roomName;
	}

	const assetCategoryCode = await objDoc.GetObject("assetCategoryCode");
	if(assetCategoryCode != undefined && assetCategoryCode != null){
		assetCategoryCode.Text = value.modelTO.assetCategoryCode;
	}

	const purchaseDtDisp = await objDoc.GetObject("purchaseDtDisp");
	if(purchaseDtDisp != undefined && purchaseDtDisp != null){
		purchaseDtDisp.Text = value.purchaseDtDisp;
	}

	const installationDtDisp = await objDoc.GetObject("installationDtDisp");
	if(installationDtDisp != undefined && installationDtDisp != null){
		installationDtDisp.Text = value.installationDtDisp;
	}

	//Additional Info
	const orgName = await objDoc.GetObject("orgName");
	if(orgName != undefined && orgName != null){
		orgName.Text = value.orgName;
	}

	const locationName = await objDoc.GetObject("branchName / locationName");
	if(locationName != undefined && locationName != null){
		locationName.Text = value.locationName;
	}

	const buildingDetails = await objDoc.GetObject("buildingDetails");
	if(buildingDetails != undefined && buildingDetails != null){
		buildingDetails.Text = value.blockName+"-"+value.floorName+"-"+value.segmentName+"-"+value.roomName;
	}

	const category = await objDoc.GetObject("category");
	if(category != undefined && category != null){
		category.Text = value.assetCategoryName;
	}

	const subcategory = await objDoc.GetObject("subcategory");
	if(subcategory != undefined && subcategory != null){
		subcategory.Text = value.subCategoryName;
	}

	const assetGroup = await objDoc.GetObject("assetGroup");
	if(assetGroup != undefined && assetGroup != null){
		assetGroup.Text = value.assetGroupName;
	}

	const department = await objDoc.GetObject("department");
	if(department != undefined && department != null){
		department.Text = value.departmentName;
	}

	const subDepartment = await objDoc.GetObject("subDepartment");
	if(subDepartment != undefined && subDepartment != null){
		subDepartment.Text = value.subDepartment;
	}

	const personIncharge = await objDoc.GetObject("personInCharge");
	if(personIncharge != undefined && personIncharge != null){
		personIncharge.Text = value.personInCharge;
	}

	const retiralDt = await objDoc.GetObject("retiralDt");
	if(retiralDt != undefined && retiralDt != null){
		retiralDt.Text = value.retiredDtDisp;
	}

	return objDoc;
  }

  checkbPacExtensionInstalled(){
	if(bpac.IsExtensionInstalled() == false){
		const agent = window.navigator.userAgent.toLowerCase();
		const ischrome = (agent.indexOf('chrome') !== -1) && (agent.indexOf('edge') === -1)  && (agent.indexOf('opr') === -1)
		if(ischrome)
			window.open('https://chrome.google.com/webstore/detail/ilpghlfadkjifilabejhhijpfphfcfhb', '_blank');
		return;
	}
  }

  checkPrinterConnected(){
	return true
  }

}
