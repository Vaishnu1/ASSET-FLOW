import { Injectable, ElementRef } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { saveAs } from 'file-saver';

import { NgSelectComponent } from '@ng-select/ng-select';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatSelect} from '@angular/material/select'
import { Router, NavigationEnd } from '@angular/router';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { allAssetAuditStatus, allPreInwardStatus, allWorkflowStatus, allAssetRetirmentStatus, allAssetTransferStatus } from 'src/app/Constants/AllStatusConstants';
import { RetireDisposeRejectPopupComponent } from 'src/app/Components/asset/retire-dispose-reject-popup/retire-dispose-reject-popup.component';
import { PoPdfPreviewComponent } from 'src/app/Components/Common-components/po-pdf-preview/po-pdf-preview/po-pdf-preview.component';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    'Access-Control-Allow-Origin': '*',
    'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',

  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  httpParams: HttpParams;
  paramsHeader: HttpParams;
  httpHeader: HttpHeaders = new HttpHeaders();

    countryCombo: any = [];
    stateCombo: any = [];
    cityCombo: any = [];
    locationCombo: any = [];
    itemTypeCombo: any = [];
    itemCategory: any = [];

    testing: any = '';

    private messageSource = new BehaviorSubject('');
    currentMessage = this.messageSource.asObservable();

    private messageSource1 = new BehaviorSubject('');
    currentMessage1 = this.messageSource1.asObservable(); // Observer Code

    private previousUrl: string;
    private currentUrl: string;

  constructor(private http: HttpClient,
    private samsConstants: AssetOptimaConstants,
    private toasterService: ToastrService,
    private translateService: TranslateService,
    private samsServices: AssetOptimaServices,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router) {
      this.currentUrl = this.router.url;
      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        };
      });
     }

     public getPreviousUrl() {
      return this.previousUrl;
      }

    changeMessage(object: any) {
      this.messageSource.next(object);
    }

    changeMessage1(id: any){
      this.messageSource1.next(id);
    }

  loginUserService(serviceName: string, loginModel: any): Observable<any> {
    let httpOptions = { withCredentials: true };
    return this.http.post(this.samsConstants.connectionUrl + serviceName, loginModel, httpOptions);
  }

  commonInsertService(serviceName: string, saveObject: any): Observable<any> {
    let httpOptions = { withCredentials: true };
    return this.http.post(this.samsConstants.connectionUrl + serviceName, saveObject, httpOptions);
  }

  commonUpdateService(serviceName: string, saveObject: any): Observable<any> {
    let httpOptions = { withCredentials: true };
    let id = saveObject.id || saveObject[Object.keys(saveObject).find(k => k.toLowerCase().endsWith('id'))];
    let url = this.samsConstants.connectionUrl + serviceName;
    if (url.includes('api/v1/') && id) url += '/' + id;
    return this.http.put(url, saveObject, httpOptions);
  }

  commonDeleteService(serviceName: string, keyId: number): Observable<any> {
    this.paramsHeader = this.paramsQueryStringBuilder(this.paramsHeader, keyId);
    let url = this.samsConstants.connectionUrl + serviceName;
    if (url.includes('api/v1/') && keyId) url += '/' + keyId;
    return this.http.delete(url, { params: this.paramsHeader,withCredentials:true });
  }

  commonGetService(serviceName: string, keyId?: any, conditionOne?: any, conditionTwo?: any, conditionThree?: any, conditionFour?: any): Observable<any> {
    // START DASHBOARD MOCKS
    if (serviceName.includes('fetchListOfAssetCount.sams')) { return of({ success: true, responseData: { currentCount: 1542, currentCountValue: 4502000, addedCount: '45', addedValue: '120000', desposalCount: '5', desposalValue: '15000', currentValue: '4607000', assetOwnedCount: '1300', assetRentalCount: '242', assetTrialCount: '0', criticalAssetCount: '342', nonCriticalAssetCount: '1200' } }); }
    if (serviceName.includes('fetchOpenServiceRequestInfo.sams')) { return of({ success: true, responseData: { totalBreakDownCount: 42, totalBDCountCritical: 15, totalBDCountNonCritical: 27 } }); }
    if (serviceName.includes('fatchBreakDownSRAgeing.sams')) { return of({ success: true, responseData: { oneDayCountOpen: 12, twoDayCountOpen: 8, threeDayCountOpen: 5, fourDayCountOpen: 2, fiveDayCountOpen: 1, oneDayCountAck: 4, twoDayCountAck: 2, threeDayCountAck: 0, fourDayCountAck: 0, fiveDayCountAck: 0, oneDayCountInp: 20, twoDayCountInp: 15, threeDayCountInp: 8, fourDayCountInp: 3, fiveDayCountInp: 1 } }); }
    if (serviceName.includes('fatchWarrantyContractExpiryInfo.sams')) { return of({ success: true, responseData: { warranty30Days: 14, warranty60Days: 42, warrantyAbove60Days: 312, contract30Days: 8, contract60Days: 24, contractAbove60Days: 185 } }); }
    if (serviceName.includes('fetchWarrantyContractInfo.sams')) { return of({ success: true, responseData: { onWarrantyCount: 450, offWarrantyCount: 1092, onContractCount: 217, amcContractCount: 110, cmcContractCount: 107 } }); }
    if (serviceName.includes('fetchInActiveAssetCountInfo.sams')) { return of({ success: true, responseData: { repairCount: 38, repairCountValue: 125000, disposedCount: 14, disposedValue: 28000, retiredCount: 9, retiredValue: 18000 } }); }
    // END DASHBOARD MOCKS

    this.paramsHeader = this.paramsQueryStringBuilder(this.paramsHeader, keyId, conditionOne, conditionTwo, conditionThree, conditionFour);
    let url = this.samsConstants.connectionUrl + serviceName;
    if (url.includes('api/v1/') && keyId) url += '/' + keyId;
    return this.http.get(url, { params: this.paramsHeader ,withCredentials:true});
  }

  commonGetServiceForn8n(serviceName: string, keyId?: any, conditionOne?: any, conditionTwo?: any, conditionThree?: any, conditionFour?: any): Observable<any> {  
    const params = { userId: keyId };
    const headers = new HttpHeaders().append('SpearheadHeaderAuth', 'Spearhead@1234');
    return this.http.get("http://localhost:5678/" + serviceName, {
      headers: headers,
      params: params
    });
  }

  convertImagetoBase62Service(serviceName: string): Observable<any> {
    return this.http.get(serviceName, { responseType: 'blob' })
  }

  paramsQueryStringBuilder(paramsHeader: HttpParams, keyId?: any, conditionOne?: any, conditionTwo?: any, conditionThree?: any,conditionFour?: any): any {
    paramsHeader = new HttpParams();
    paramsHeader = keyId ? paramsHeader.append('hdrId', keyId) : paramsHeader.append('hdrId','');
    paramsHeader = typeof conditionOne !== 'undefined' ? paramsHeader.append('attribute1', conditionOne) : paramsHeader;
    paramsHeader = typeof conditionTwo !== 'undefined' ? paramsHeader.append('attribute2', conditionTwo) : paramsHeader;
    paramsHeader = typeof conditionThree !== 'undefined' ? paramsHeader.append('attribute3', conditionThree) : paramsHeader;
    paramsHeader = typeof conditionFour !== 'undefined' ? paramsHeader.append('attribute4', conditionFour) : paramsHeader;
    return paramsHeader;
  }

  openToastSuccessMessage(message: string) {
    this.toasterService.success(message);
  }

  openToastErrorMessage(message: string) {
    let unique = message.split('WARNING');
    let a = unique.length <= 1 ?  this.toasterService.error(message, undefined, { timeOut: 10000 }) : this.toasterService.warning(unique[0]);
  }

  openToastWarningMessage(message: string) {
    this.toasterService.warning(message);
  }

  removeValidation(formGroup: FormGroup, fieldName: string) {
    formGroup.controls[fieldName].clearValidators();
    formGroup.controls[fieldName].updateValueAndValidity();
  }

  public getComboResults(comboUrl, searchOptions, attribute1?: any, attribute2?: any, recordsPerPage?: any, pageNumber?: any, attributeName1?: any, attributeName2?:any, attribute3?: any, attributeName3?: any, selectedIds1?: any, selectedIds2?:  any, attribute6?: any): Observable<any> {
    var httpOption = {
      withCredentials: true,
      params: new HttpParams()
        .append('searchterm', searchOptions ? searchOptions : '')
        .append('attribute1', attribute1 ? attribute1 : '')
        .append('attribute2', attribute2 ? attribute2 : '')
        .append('recordsPerPage', recordsPerPage ? recordsPerPage : '0')
        .append('pageNumber', pageNumber ? pageNumber : '0')
        .append('attributeName1', attributeName1 ? attributeName1: '')
        .append('attributeName2', attributeName2 ? attributeName2: '')
        .append('attribute3', attribute3 ? attribute3: '')
        .append('attributeName3', attributeName3 ? attributeName3: '')
        .append('selectedIds1', selectedIds1 ? selectedIds1: '')
        .append('selectedIds2', selectedIds2 ? selectedIds2: '')
        .append('attribute6', attribute6 ? attribute6: '')
    };
    return this.http.get(this.samsConstants.connectionUrl + comboUrl, httpOption);
  }

  commonListService(serviceName: string, searchOptions?: any): Observable<any> {
    let httpOption = { withCredentials: true };
    return this.http.post(this.samsConstants.connectionUrl + serviceName, searchOptions, httpOption);
  }

  setFormFocus(element: ElementRef) {
    setTimeout(() => {
      element.nativeElement.focus();
    }, 500);
  }

  setComboFocus(element: NgSelectComponent) {
    setTimeout(() => {
      element.focus();
    }, 1000);
  }

  setComboMatFocus(element: MatSelect) {
    setTimeout(() => {
      element.focus();
    }, 1000);
  }

  convertToDateStringyyyy_mm_dd(str) {
    if (!str) {
      return "";
    } else {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
  }

  convertToDateStringdd_mm_yyyy(str) {
    if (typeof str == undefined || typeof str == 'undefined') {
      return "";
    } else {
      if ((typeof str != 'undefined')) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
      }
    }
    return "";
  }

  convertDateTodd_mm_yyyywithTime(str){
    if (typeof str == undefined || typeof str == 'undefined') {
      return "";
    }else{
      if ((typeof str != 'undefined')) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
      }
    }
    return "";
  }

  userLogoutService(): Observable<any> {
    let httpOptions = { withCredentials: true };
    return this.http.post(this.samsConstants.connectionUrl + this.samsServices.logOutUser,new Date(),httpOptions);
  }

  public downloadExcelFile(hdrId): Observable<any> {
    let _httpParams = new HttpParams();
    _httpParams.set('hdrId', hdrId);
    return this.http.get(this.samsConstants.connectionUrl + this.samsServices.getExcel + '?hdrId=' + hdrId, { params: _httpParams, withCredentials: true, responseType: 'blob' });
  }


  public downloadFile(fileName,contentType): Observable<any> {

    let _httpParams = new HttpParams();
    _httpParams.append('fileName', fileName);
    _httpParams.append('contentType', contentType);
    return this.http.get(this.samsConstants.connectionUrl+'downloadFileFromServer.sams?fileName='+fileName+'&contentType='+contentType, { params: _httpParams, withCredentials: true, responseType: 'blob' });
  }

  public downloadFiles(data, fileName) {
    var file = new Blob([fileName], { type: 'application/zip' });
                saveAs(file, 'example.zip');
  }


  public showDownloadPopUp(data, fileName) {
    var file_name = fileName.replace("_"," ");
    saveAs(data, file_name,
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  }

  commonFileUpload(serviceName: string, formData: FormData): Observable<any> {
    let httpHeaders: HttpHeaders;
    httpHeaders = new HttpHeaders().append('content-type', 'multipart/form-data');
    let options: { headers: HttpHeaders };
    return this.http.post(this.samsConstants.connectionUrl + serviceName, formData, options);
  }

  formGroupValidationRemoval(formListData:any[],formGroup: FormGroup) {
    formListData.forEach(element => {
      if(!element.isFieldDisplay){
        formGroup.get(element.formFieldName).clearValidators();
        formGroup.get(element.formFieldName).disable();
        formGroup.get(element.formFieldName).updateValueAndValidity();
      }
    });
  }
  checkUniqueValidation(constraintData:UniqueValidationModel):Observable<any>{
    return this.http.post(this.samsConstants.connectionUrl+'validateUniqueConstraint.sams',constraintData);
  }

  public downloadFileFromServer(fileName, contentType) {
    var http_params = new HttpParams().append('fileName', fileName).append('contentType', contentType);
    return this.http.get(this.samsConstants.connectionUrl + 'downloadFileFromServer.sams', { params: http_params, withCredentials: true, responseType: 'blob' });
  }

  public downloadFileFromServerToView(filePath, contentType) {
    return this.samsConstants.getServerURL()+"downloadFileFromServer.sams?fileName="+filePath+"&&contentType="+contentType;
  }

   //to get list of user menus
   public getListOfMenus(serviceName: string): Observable<any> {
    let httpOption = { withCredentials: true };
    return this.http.get(this.samsConstants.connectionUrl + serviceName, httpOption);
  }


    //to get the index of the item in a array
    getIndexOfTheItem(arrayList, isarrayOfObject: boolean, keyName: string, itemValue: any): number {
      let index = -1;
      let length: number = arrayList.length;
      if (length > 0) {
        if (isarrayOfObject) {
          for (var i = 0; i < length; i++) {
            if (arrayList[i][keyName] == itemValue) {
              index = i;
              return index;
            }
          }
        }
        if (!isarrayOfObject) {
          for (var i = 0; i < length; i++) {
            if (arrayList[i] == itemValue) {
              index = i;
              return index;
            }
          }
        }
      }

      return index;
    }

    showSpinner() {
      this.spinner.show();
    }

    hideSpinner() {
      setTimeout(() => {
        //pinner ends after 5 seconds /
        this.spinner.hide();
      });
    }

  //To Convert a string to TitleCase
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  CalculateMilliSecondDateinhh_mm(date1, date2) {
    var difference = date1 - date2;

    let hours = Math.trunc(difference / (1000 * 60 * 60));
    let minutes = (Math.abs(difference) / (1000 * 60) % 60);
    let minuteRound = Math.round(minutes);
    let hhmm: string = hours + ':' + minuteRound;

    return hhmm;
  }

  getCurrentDateYYYYMMDD():string {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var ddst;
    var mmst;
    if (dd < 10) {
      ddst = '0' + dd;
    }else{
      ddst=dd;
    }

    if (mm < 10) {
      mmst = '0' + mm;
    }else{
      mmst=mm;
    }
    var dateString = yyyy +'-'+ mmst + '-' + ddst;
    return dateString;
  }

  getCurrentTime():string{
    var currentDate=new Date();
    if(currentDate.getMinutes() < 10){
      return currentDate.getHours()+':'+ '0' + currentDate.getMinutes();
    }else{
      return currentDate.getHours()+':'+ currentDate.getMinutes();
    }
  }

  addCurrenrtTimeToDate(date):Date{
    const selectedDate = new Date(date);
    const currentDate = new Date();
    selectedDate.setHours(currentDate.getHours());
    selectedDate.setMinutes(currentDate.getMinutes());
    return selectedDate;
  }

	public showDownloadPopUpPDF(data, fileName) {
	    saveAs(data, fileName,
	      { type: 'application/pdf' });

    }

  public deleteFileFromServer(filePath): Observable<any> {
    let _httpParams = new HttpParams();
    _httpParams.set('hdrId', filePath);
    return this.http.get(this.samsConstants.connectionUrl + 'deleteFileFromServer.sams' + '?hdrId=' + filePath,
    { params: _httpParams, withCredentials: true});
  }

  public calculateAge(oldDate): String {
    let today;
    let date1;
    let diffTime;
    let diffDays : any = 0;

    if(oldDate){
      today =  new Date();
      date1 = new Date(oldDate);
      diffTime = Math.abs(today - date1);
      diffDays = ((diffTime / (1000 * 60 * 60 * 24)) / 365).toFixed(2);
    }

      return diffDays;
  }

  public fetchDataList(searchValue, pageNumber , dataList , newList): Object {

    let searchData = this.fetchSearchValue(searchValue);

    if(searchValue.term == ''){
        dataList = [];
    }
    if(Object.keys(searchValue).length === 0 && this.testing != ''){
      dataList = [];
    }

    if(searchValue == 'clear'){
      dataList = [];
      pageNumber = 1;
    }

    if(searchValue == 'back' && pageNumber > 1){
      dataList = dataList;
      pageNumber = pageNumber;
    }
    else if(newList.length > 0 && !searchData){
        dataList = dataList.concat(newList);
        newList.length !== 0 ? pageNumber += 1 : pageNumber = 1;
    }
    else if(searchData){
      if(newList.length > 0){
        dataList = newList;
      }
        pageNumber = 1;
    }

      return {pageNumber , dataList};
  }

  public fetchSearchValue(data){
    if(data.term === '' || data.term === undefined || data.term === null){
      return false;
    }else{
      return true;
    }
}

  /*Additional parameter added to get the asset list, Added by - Manjunath, Date - 03/03/2022
  attribute3 - to get the list with modelId,
  attribute4 - to get the list with categoryId,
  attribute5 - to get the list with subCategoryId,
  attribute6 - to get the list with assetGroupId
   */
  public getComboResultsV1(comboUrl, searchOptions, attribute1?: any, attribute2?: any, attribute3?: any, attribute4?: any, attribute5?: any, attribute6?: any, recordsPerPage?: any, pageNumber?: any, attributeName1?: any, attributeName2?:any, primaryKeyIds?: any): Observable<any> {
    var httpOption = {
      withCredentials: true,
      params: new HttpParams()
        .append('searchterm', searchOptions ? searchOptions : '')
        .append('attribute1', attribute1 ? attribute1 : '')
        .append('attribute2', attribute2 ? attribute2 : '')
        .append('attribute3', attribute3 ? attribute3 : '')
        .append('attribute4', attribute4 ? attribute4 : '')
        .append('attribute5', attribute5 ? attribute5 : '')
        .append('attribute6', attribute6 ? attribute6 : '')
        .append('recordsPerPage', recordsPerPage ? recordsPerPage : '0')
        .append('pageNumber', pageNumber ? pageNumber : '0')
        .append('attributeName1', attributeName1 ? attributeName1: '')
        .append('attributeName2', attributeName2 ? attributeName2: '')
        .append('primaryKeyIds', primaryKeyIds ? primaryKeyIds: '')
    };
    return this.http.get(this.samsConstants.connectionUrl + comboUrl, httpOption);
  }

commonWorkflowService=(process, selectdList,moduleName)=>{
    let approvalPromise = new Promise((resolve) => {

      const dialogData = {
        confirmHeading: 'Confirmation',
        confirmMsg: `Are you sure to approve ${moduleName} ?`
    };

    if (process === allWorkflowStatus[allWorkflowStatus.PO]) {
        if(selectdList.length == 1 && selectdList[0].approvalId <= 0){
          dialogData['note'] = 'Note : Only PO under your queue will be Approved';
          dialogData['selectedElementListLength'] = 0;
        }else{
          dialogData['note'] = 'Note : Only PO under your queue will be Approved';
          dialogData['selectedElementListLength'] = selectdList.length;
        }

    }

      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: dialogData
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe( data => {
        if (data.status === true) {

          let approvalList = {selectedApprovalList: []};

          if(process === allWorkflowStatus[allWorkflowStatus.PRE_INWARD]){
            let assetList = {selectedAssetList: [],statusId: 0};
            for(let i=0; i<= selectdList.length-1 ; i++){
              assetList.selectedAssetList.push(selectdList[i].inwardInventoryHdrId);
              approvalList.selectedApprovalList.push(selectdList[i].approvalId)
              assetList.statusId = allPreInwardStatus.AWAITING_FOR_ARRIVAL;
            }
            let assetListData = {...approvalList,...assetList};

            let asd = this.createAssetFromInward(assetListData);

              asd.then(response=>{
                if(response){
                  resolve(true);
                }
              });
          }else if (process === allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL]) {
            this.approveItemMatched("APPROVED",selectdList);
            resolve(true);
          }else if (process === allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT]) {
            let asd = this.approveAssetPhysicalAudit(allAssetAuditStatus.APPROVED,selectdList);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });
          }
          else if(process === allWorkflowStatus[allWorkflowStatus.RETIREMENT]){

            let transSource = '';

            if(selectdList[0].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_RETAIR_APPROVAL){
              transSource = allWorkflowStatus[allWorkflowStatus.RETIREMENT]
            }
            else if(selectdList[0].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_SALVAGE_APPROVAL){
              transSource = allWorkflowStatus[allWorkflowStatus.SALVAGE]
            }
            else if(selectdList[0].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_DISPOSAL_APPROVAL){
              transSource = allWorkflowStatus[allWorkflowStatus.DISPOSAL]
            }
            else if(selectdList[0].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_SCRAP_APPROVAL){
              transSource = allWorkflowStatus[allWorkflowStatus.SCRAPPED]
            }

              let assetList = {selectedAssetList: [],status: 'APPROVED',transSource};

              for(let i=0; i<= selectdList.length-1 ; i++){
                approvalList.selectedApprovalList.push(selectdList[i].approvalId);
                assetList.selectedAssetList.push(selectdList[i].assetRetireId)
              }

              let assetListData = {...approvalList,...assetList};

              let generateGatePass = false;
              if(selectdList[0].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_DISPOSAL_APPROVAL && assetList.status == "APPROVED"){
                generateGatePass=true;
              }
              else{
                generateGatePass=false;
              }

              this.commonInsertService('updateStatusBasedOnApproval.sams', assetListData).subscribe(
                data => {
                  if (data.success) {
                    // if(generateGatePass){
                    //   this.createGatePassFromRetirement(assetListData);
                    // }
                    if(data.message==="RETIREMENT APPROVED"){
                      this.openToastSuccessMessage('Retirement Approved Successfully.');
                      this.router.navigate(['/home/asset/assetRetirement']);
                    } else if (data.message==="DISPOSAL APPROVED") {
                      this.openToastSuccessMessage('Disposal Approved Successfully.');
                      this.router.navigate(['/home/asset/assetRetirement']);
                    }
                  } else {
                    this.openToastWarningMessage(data.message);
                  }
                  resolve(true);
                }, error => {
                  
                }
              );


          } else if (process === allWorkflowStatus[allWorkflowStatus.PO]) {
            console.log('selected list in po',selectdList);
            this.poconfirm("APPROVED",selectdList );
            resolve(true); 
          }else if (process === allWorkflowStatus[allWorkflowStatus.PO_CONTRACT]) {
            console.log('selected list in po contract',selectdList);
            this.poconfirm("APPROVED",selectdList );
            resolve(true); 
          } else if (process === allWorkflowStatus[allWorkflowStatus.WF_SUPPLIER_INVOICE]) {
            this.supplierInvoiceConfirm("APPROVED",selectdList );
            resolve(true); 
          } else if (process === allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL]) {
            let res = true;

            // for (let i = 0; i < selectdList.length; i++) {
            //   if (selectdList[i].grnDtlList.findIndex(data => data.confirmApproval === true) !== -1 ) {
            //     res = true;
            //   } else{
            //     this.openToastWarningMessage('Kindly select atleast one GRN confirm approval');
            //     res = false;
            //     break;
            //   }
            // }

            if (res) {
              this.approveRejectGRN("APPROVED",selectdList );
            }
            resolve(true);
          }
          else if(process === allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION]){
            let assetList = {selectedAssetList: selectdList,statusId: allAssetTransferStatus.RELOCATION_APPROVED,batchData:[]};

            for(let i=0; i<= selectdList.length-1 ; i++){
              approvalList.selectedApprovalList.push(selectdList[i].approvalId);
              assetList.batchData.push(selectdList[i].batchNo)
            }

            let assetListData = {...approvalList,...assetList};


            let asd = this.approveAssetRelocation(assetListData);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });
          }else if (process === allWorkflowStatus[allWorkflowStatus.GATE_PASS]) {
            let asd = this.approveGatePass("APPROVED",selectdList);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });
          }else if (process === allWorkflowStatus[allWorkflowStatus.ASSET_CREATE]){
            let asd = this.approveRejectAsset("APPROVED",selectdList);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });
          }else if (process === allWorkflowStatus[allWorkflowStatus.RTV_APPROVAL]) {
            this.approveRejectRtv("APPROVED",selectdList );
            resolve(true); 
          } else if (process === allWorkflowStatus[allWorkflowStatus.PR]) {
            this.prConfirm("APPROVED",selectdList );
            resolve(true); 
          } else if(process === allWorkflowStatus[allWorkflowStatus.ASSET_CODE_CHANGE]) {
            this.approveRejectAssetCodeChange("APPROVED", selectdList);
            resolve(true); 
          } else if (process === allWorkflowStatus[allWorkflowStatus.PO_CONTRACT]) {
            this.poconfirm("APPROVED",selectdList );
            resolve(true); 
          }

        }
        else{
          resolve(false);
        }
      }
    );

  });
  return approvalPromise;

}

 rejectApprove(process,selectdList,moduleName) {

  let approvalPromise = new Promise((resolve) => {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg':`Are you sure to Reject this ${moduleName} ?`
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          let approvalList = {selectedApprovalList: [],status: 'REJECT PERMANENTLY',rejectReason: ''};

          if(process === allWorkflowStatus[allWorkflowStatus.PRE_INWARD]){
            let assetList = {selectedAssetList: [],statusId: 0};
            for(let i=0; i<= selectdList.length-1 ; i++){
              assetList.selectedAssetList.push(selectdList[i].inwardInventoryHdrId);
              approvalList.selectedApprovalList.push(selectdList[i].approvalId)
              assetList.statusId = allPreInwardStatus.REJECTED;
            }
            let assetListData = {...approvalList,...assetList};

            let asd = this.createAssetFromInward(assetListData);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });

          }else if (process === allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL]) {
            this.approveItemMatched("REJECTED",selectdList);
            resolve(true);
          }else if (process === allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT]) {
            let asd = this.approveAssetPhysicalAudit(allAssetAuditStatus.REJECTED,selectdList);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });

          }else if (process === allWorkflowStatus[allWorkflowStatus.PO]) {
            this.poconfirm("REJECTED",selectdList );
            resolve(true);
          } else if (process === allWorkflowStatus[allWorkflowStatus.WF_SUPPLIER_INVOICE]) {
            this.supplierInvoiceConfirm("REJECTED",selectdList );
            resolve(true); 
          } else if (process === allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL]) {
            this.approveRejectGRN("REJECTED",selectdList );
            resolve(true);
          }else if (process === allWorkflowStatus[allWorkflowStatus.RTV_APPROVAL]) {
            this.approveRejectRtv("REJECTED",selectdList );
            resolve(true);
          }
          if(process === allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION]){

            let assetList = {selectedAssetList: selectdList,statusId: allAssetTransferStatus.RELOCATION_REJECTED,batchData:[]};
            for(let i=0; i<= selectdList.length-1 ; i++){
              approvalList.selectedApprovalList.push(selectdList[i].approvalId);
              assetList.batchData.push(selectdList[i].batchNo)
            }
            let assetListData = {...approvalList,...assetList};

            let asd = this.approveAssetRelocation(assetListData);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });

          }else if (process === allWorkflowStatus[allWorkflowStatus.GATE_PASS]) {
            let asd = this.approveGatePass("REJECTED",selectdList);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });
          }else if (process === allWorkflowStatus[allWorkflowStatus.ASSET_CREATE]){
            let asd = this.approveRejectAsset("REJECTED",selectdList);

            asd.then(response=>{
              if(response){
                resolve(true);
              }
            });
          } else if (process === allWorkflowStatus[allWorkflowStatus.PR]) {
            this.prConfirm("REJECTED",selectdList );
            resolve(true); 
          } else if(process === allWorkflowStatus[allWorkflowStatus.ASSET_CODE_CHANGE]) {
            this.approveRejectAssetCodeChange("REJECTED", selectdList);
            resolve(true);
          } else if (process === allWorkflowStatus[allWorkflowStatus.PO_CONTRACT]) {
            this.poconfirm("REJECTED",selectdList );
            resolve(true);
          }
        }
        else{
          resolve(false);
        }
      });

    })

    return approvalPromise;
  }

  rejectApproveList(approvalList){
    this.commonInsertService('rejectMultipleData.sams', approvalList).subscribe(
      dataResult => {
        if (dataResult.success) {
          this.openToastSuccessMessage(dataResult.message);
        } else {
          this.openToastWarningMessage(dataResult.message);
        }
      }, error => {
      }
    );
  }

workFlowApproval(approvalList,process){

  this.commonInsertService('approveMultipleData.sams', approvalList).subscribe(
    data => {
      if (data.success) {
        this.openToastSuccessMessage(data.message);
      } else {
        this.openToastErrorMessage(data.message);
      }
    }
  );
}

createAssetFromInward(assetList){

  let approvalPromise = new Promise((resolve) => {
      this.commonInsertService('createAssetFromPreInwardInventory.sams', assetList).subscribe(
        data => {
          if (data.success) {
            if(assetList.statusId === allPreInwardStatus.AWAITING_FOR_ARRIVAL){
              this.openToastSuccessMessage(data.message);
            }
            else if(assetList.statusId === allPreInwardStatus.REJECTED){
              this.openToastSuccessMessage(data.message);
            }
          } else {
            this.openToastErrorMessage(data.message);
          }
          resolve(true)
        }
      );
  });

  return approvalPromise;
}

createGatePassFromRetirement(element){
  this.commonInsertService('createGatePassFromRetirement.sams',element).subscribe(
    data => {
      if(data.success){
        this.openToastSuccessMessage(data.message);
      } else {
        this.openToastErrorMessage(data.message);
      }
    }
  );
}

rejectRetirement(assetList){

  let approvalPromise = new Promise((resolve) => {
  let dialogRef = this.dialog.open(RetireDisposeRejectPopupComponent, {
    height: 'auto',
    width: '600px',
    data: {

    }
  });
  dialogRef.disableClose = true;
  dialogRef.afterClosed().subscribe(
    data => {
      if(data.status){
        let approvalList = {selectedApprovalList: []};
        let assetLists = {selectedAssetList: [], status: data.form.rejectDecision,transSource : '',rejectReason: data.form.rejectReason};
        for(let i=0; i<= assetList.length-1 ; i++){
            approvalList.selectedApprovalList.push(assetList[i].approvalId);
            assetLists.selectedAssetList.push(assetList[i].assetRetireId)
          }
        let assetListData = {...approvalList,...assetLists};
        this.commonInsertService('updateStatusBasedOnApproval.sams', assetListData).subscribe(
          data => {
            if (data.success) {
              if(data.message===" REVERT BACK FOR CORRECTIVE ACTION"){
                this.openToastSuccessMessage('Corrective Action Response Submitted Successfully.');
              }else if(data.message===" REJECT PERMANENTLY"){
                this.openToastSuccessMessage('Record Rejected Successfully.');
              }
            }
            else {
              this.openToastWarningMessage(data.message);
            }
            resolve(true);
          }, error => {
          }
        );
      }
    });

  })

  return approvalPromise;

}

approveItemMatched(status,selectdList) {
  let itemIdList = {selectedItemList: [],status: status,selectedApprovalList : []};
  for(let i=0; i<= selectdList.length-1 ; i++){
    itemIdList.selectedItemList.push(selectdList[i].itemLocId);
    itemIdList.selectedApprovalList.push(selectdList[i].approvalId);
  }

  this.commonInsertService('approveItemMatchedStatus.sams',itemIdList).subscribe(
    data=>{
      if(data.success){
        this.openToastSuccessMessage(data.message);
      }else{
        this.openToastErrorMessage(data.message);
      }
    });
}

approveAssetPhysicalAudit(status,selectdList){

  let approvalPromise = new Promise((resolve) => {

      let assetPhyAuditIdList = {selectedAssetList: [],status: status,selectedApprovalList : []};
        for(let i=0; i<= selectdList.length-1 ; i++){
          assetPhyAuditIdList.selectedAssetList.push(selectdList[i].assetPhyAuditHdrId);
          assetPhyAuditIdList.selectedApprovalList.push(selectdList[i].approvalId);
        }
        this.commonInsertService('approveAssetPhysicalAudit.sams',assetPhyAuditIdList).subscribe(
          data => {
            if(data.success){
              this.openToastSuccessMessage(data.message);
            } else {
              this.openToastErrorMessage(data.message);
            }
            resolve(true);
          }
        );
    })

    return approvalPromise;
}

poconfirm(status,selectdList){
  let poIdList = {selectedPoList: [],status: status,selectedApprovalList : [],selectedPoType : ""};
    for(let i=0; i<= selectdList.length-1 ; i++){
      poIdList.selectedPoList.push(selectdList[i].poId);
      poIdList.selectedPoType = selectdList[i].poType;
      poIdList.selectedApprovalList.push(selectdList[i].approvalId);
    }
  this.commonInsertService('approveRejectPO.sams', poIdList).subscribe(
    data => {
      if (data.success) {
        this.openToastSuccessMessage(data.message);
      } else {
        this.openToastWarningMessage(data.message);
      }
    }, error => {
    }
  );
}

prConfirm(status,selectdList) {
  let prIdList : any;
  let approvalPromise = new Promise((resolve) => {
    let prIdList = {selectedPRList: [],status: status,selectedApprovalList : [],locationId : 0 , prType : 'ALL'};
      for(let i=0; i<= selectdList.length-1 ; i++){
        prIdList.selectedPRList.push(selectdList[i].poReqId);
        prIdList.selectedApprovalList.push(selectdList[i].approvalId);
      }
    this.showSpinner();
    this.commonInsertService('approveRejectPR.sams', prIdList).subscribe(
      data => {
        if (data.success) {
          prIdList = data.responseData.prIdList;
          this.openToastSuccessMessage(data.message);
        } else {
          this.openToastWarningMessage(data.message);
        }
      }, error => {
        
      }
    );
  })
  return prIdList;
}

approveRejectGRN(status,selectdList){
  let grnIdList = {selectedGrnList: [],status: status,selectedApprovalList : []};
    for(let i=0; i<= selectdList.length-1 ; i++){
      grnIdList.selectedGrnList.push(selectdList[i].grnId);
      grnIdList.selectedApprovalList.push(selectdList[i].approvalId);
    }

  this.showSpinner();
  this.commonInsertService('approveRejectGRN.sams', grnIdList).subscribe(
    data => {
      if (data.success) {
        this.openToastSuccessMessage(data.message);
        this.hideSpinner();
      } else {
        this.openToastWarningMessage(data.message);
        this.hideSpinner();
      }
    }, error => {
    }
  );
}

 approveAssetRelocation(element){
  let approvalPromise = new Promise((resolve) => {
  this.commonInsertService('updateRelocateStatus.sams', element).subscribe(
      dataValue => {
          if (dataValue.success) {
            if(element.statusId==allAssetTransferStatus.RELOCATION_APPROVED){
              this.openToastSuccessMessage("Tranfer Request Approved Successfully.");
            }else if(element.statusId==allAssetTransferStatus.RELOCATION_REJECTED){
              this.openToastSuccessMessage("Tranfer Request Rejected Successfully.");
            }
          }
          resolve(true)
      }
    );
  })

  return approvalPromise;
}

  approveGatePass(status,selectedList) {
    let approvalPromise = new Promise((resolve) => {
    let gatepassHdrIdList = {selectedGatepassList: [],status: status,selectedApprovalList : [],selectedAssetIdList:[],gatePassSource:selectedList[0].gatePassSource};
      for(let i=0; i<= selectedList.length-1 ; i++){
        gatepassHdrIdList.selectedGatepassList.push(selectedList[i].gatePassHdrId);
        gatepassHdrIdList.selectedApprovalList.push(selectedList[i].approvalId);
        if((selectedList[i].gatePassDtl).length > 0){
          for(let j=0; j<= (selectedList[i].gatePassDtl).length-1;j++){
            gatepassHdrIdList.selectedAssetIdList.push(selectedList[i].gatePassDtl[j].assetId);
          }
        }
      }
    this.commonInsertService('updateGatePassStatus.sams', gatepassHdrIdList).subscribe(
      data => {
        if (data.success) {
          this.openToastSuccessMessage(data.message);
        } else {
          this.openToastWarningMessage(data.message);
        }
        resolve(true);
      }, error => {

      }
    );
    })

    return approvalPromise;
  }

  approveRejectAsset(status,selectdList){

  let approvalPromise = new Promise((resolve) => {
    let assetIdList = {selectedAssetList: [],status: status,selectedApprovalList : []};
      for(let i=0; i<= selectdList.length-1 ; i++){
        assetIdList.selectedAssetList.push(selectdList[i].assetHdrId);
        assetIdList.selectedApprovalList.push(selectdList[i].approvalId);
      }

      this.commonInsertService('approveRejectAsset.sams',assetIdList).subscribe(
        data => {
          if(data.success){
            this.openToastSuccessMessage(data.message);
          } else {
            this.openToastErrorMessage(data.message);
          }
          resolve(true)
        }
      );

  })

  return approvalPromise;
  }


  downloadDocument(filePath: string) {
    var fileName = filePath.split('.')[0];
    this.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  convertSstringdd_mm_yyyy_To_yyyy_mm_dd(str){
    if (!str) {
      return "";
    } else {
    const dateComponents = str.split('-');
    const outputDate = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`;
    return outputDate;
    }
  }

  supplierInvoiceConfirm(status,selectdList){
    let supplierInvoiceList = { selectedSupplierInvoiceList: [], status: status, selectedApprovalList: [] };
    for (let i = 0; i <= selectdList.length - 1; i++) {
      supplierInvoiceList.selectedSupplierInvoiceList.push(selectdList[i].supplierInvoiceHdrId);
      supplierInvoiceList.selectedApprovalList.push(selectdList[i].approvalId);
    }
    this.showSpinner();
    this.commonInsertService('approveRejectSupplierInvoice.sams', supplierInvoiceList).subscribe(
      data => {
        if (data.success) {
          this.openToastSuccessMessage(data.message);
        } else {
          this.openToastWarningMessage(data.message);
        }
      }, error => {
      }
    );
  }

  approveRejectRtv(status,selectdList){
    let rtvIdList = {selectedRtvList: [],status: status,selectedApprovalList : []};
      for(let i=0; i<= selectdList.length-1 ; i++){
        rtvIdList.selectedRtvList.push(selectdList[i].rtvHdrId);
        rtvIdList.selectedApprovalList.push(selectdList[i].approvalId);
      }
    this.commonInsertService('approveRejectRTV.sams', rtvIdList).subscribe(
      data => {
        if (data.success) {
          this.openToastSuccessMessage(data.message);
        } else {
          this.openToastWarningMessage(data.message);
        }
      }, error => {
      }
    );
  }

  poPdfRef;
  public pdfViwer(filePath, contentType) {
    this.poPdfRef = this.dialog.open(PoPdfPreviewComponent, {
      data: {
        "filePath": filePath,
        "contentType": contentType
      }
    });

    this.poPdfRef.disableClose = true;
    this.poPdfRef.afterClosed().subscribe(
      data => {

      });
  }

  public getFileType(fileName) {
    let fileNameSplit = fileName.split('.');
    return fileNameSplit[fileNameSplit.length-1];
  }

  approveRejectAssetCodeChange(status,selectdList){
    let approvalPromise = new Promise((resolve) => {
      let assetCodeChangeReqIdList = {selectedAssetCodeChangeReqIdList: [],status: status,selectedApprovalList : []};
        for(let i=0; i<= selectdList.length-1 ; i++){
          assetCodeChangeReqIdList.selectedAssetCodeChangeReqIdList.push(selectdList[i].assetCodeChangeReqId);
          assetCodeChangeReqIdList.selectedApprovalList.push(selectdList[i].approvalId);
        }
  
        this.commonInsertService('approveRejectAssetCodeChangeReq.sams', assetCodeChangeReqIdList).subscribe(
          data => {
            if(data.success){
              this.openToastSuccessMessage(data.message);
            } else {
              this.openToastErrorMessage(data.message);
            }
            resolve(true)
          }
        );
  
    })
    return approvalPromise;
    }

}
