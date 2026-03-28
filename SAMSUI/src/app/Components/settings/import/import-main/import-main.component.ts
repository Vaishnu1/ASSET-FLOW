import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ViewRequest } from 'src/app/Model/base/view-request';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-import-main',
  templateUrl: './import-main.component.html',
  styleUrls: ['./import-main.component.css']
})
export class ImportMainComponent implements OnInit {

  //Set page title
  title = 'Asset Optima - Import';

  @ViewChild('fileUploader') fileUploader:ElementRef;

  importModules = [
    // {id: 1, name: 'Legal Entity', filePath: 'LEGAL_ENTITY', moduleName: 'LEGAL_ENTITY' },
    {id: 2, name: 'Branch', filePath: 'BRANCH_NEW', moduleName: 'BRANCH' },
    {id: 3, name: 'Department', filePath: 'DEPARTMENT', moduleName: 'DEPARTMENT' },
    {id: 4, name: 'Sub Department', filePath: 'SUB_DEPARTMENT', moduleName: 'SUB_DEPARTMENT' },
    {id: 5, name: 'Designation', filePath: 'DESIGNATION', moduleName: 'DESIGNATION' },
    {id: 6, name: 'Asset Category', filePath: 'ASSET_CATEGORY', moduleName: 'ASSET_CATEGORY' },
    {id: 7, name: 'Sub Category', filePath: 'SUB_CATEGORY', moduleName: 'SUB_CATEGORY'},
    {id: 8, name: 'Asset Type', filePath: 'ASSET_TYPE', moduleName: 'ASSET_TYPE'},
    {id: 9, name: 'Device Code', filePath: 'DEVICE_CODE', moduleName: 'DEVICE_CODE'},
    {id: 10, name: 'Asset Group', filePath: 'ASSET_GROUP', moduleName: 'ASSET_GROUP'},
    {id: 11, name: 'Asset Group Parameter', filePath: 'ASSET_GROUP_PARAMETER', moduleName: 'ASSET_GROUP_PARAMETER'},
    {id: 12, name: 'Business Partner', filePath: 'BUSINESS_PARTNER', moduleName: 'BUSINESS_PARTNER'},
    {id: 13, name: 'Model', filePath: 'MODEL', moduleName: 'MODEL'},
    {id: 14, name: 'Employee', filePath: 'EMPLOYEE', moduleName: 'EMPLOYEE'},
    {id: 15, name: 'Asset Register', filePath: 'ASSET_REGISTER', moduleName: 'ASSET_REGISTER' },
    {id: 16, name: 'Asset-Warranty/Contract', filePath: 'ASSET_CONTRACT', moduleName: 'ASSET_CONTRACT' },
    {id: 17, name: 'Item Type', filePath: 'ITEM_TYPE', moduleName: 'ITEM_TYPE'},
    {id: 18, name: 'Item Master', filePath: 'ITEM_MASTER', moduleName: 'ITEM_MASTER'},
    {id: 19, name: 'Module', filePath: 'MODULE', moduleName: 'MODULE'},
    {id: 20, name: 'Item', filePath: 'ITEM', moduleName: 'ITEM'},
    // {id: 21, name: 'Business Partner Site', filePath: 'BUSINESS_PARTNER_SITE', moduleName: 'BUSINESS_PARTNER_SITE'},
    {id: 22, name: 'Parameter', filePath: 'PARAMETER', moduleName: 'PARAMETER'},
    {id: 23, name: 'Parameter Group', filePath: 'PARAMETER_GROUP', moduleName: 'PARAMETER_GROUP'},
  ];

  selectedModule: any = '';

  displayedColumns=['select','no','name','startDate','completedDate','requestedBy','status'];
  public viewRequest:  ViewRequest;

  //for pagination
  length: String='0';//set total record count here 
  pageIndex: String;//set page number starts with zeroo
  pageSize: String;// records per page

  subLoaderViewRequest : boolean = false;

  viewRequestMain;

  Active_Tab :string ='';

  dialogRef;

  //for file
  fileName: string;
  filePath: string
  moduleSelectFlag: boolean = false;
  fileUploadFlag: boolean = false;
  moduleName: string;
  public fileToUpload: File;

  selectedItem:any = 0;

  subCategoryId:any = 0;
  subCategoryName:any = '';
  custFields : any = false;
  enableCustFields : any = false;
  subScrollsync: boolean;
  getData: getData;
  assetSubCategorPageNumber: number;
  subCategoryData : any = [];

  constructor(private readonly matDaialog: MatDialog,
    private readonly titleService: Title,
    private readonly commonService:CommonService,
    private readonly userSessionService:UserSessionService) {
      this.viewRequest = new ViewRequest();
      this.viewRequestMain = [];
      this.assetSubCategorPageNumber = 1;
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.pageIndex = '0';
    this.pageSize = '100';
    this.viewRequest.direction = 'desc';
    this.viewRequest.columnName = 'updatedDt';
    this.viewRequest.jobType = 'IMPORT';
    this.fileName = '';
    this.filePath = '';
    this.fileUploadFlag = false;
    this.getCount().subscribe(
      data => {        
        if (data.success) {
          this.length = data.responseData.count;
          this.loadList();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.commonService.openToastErrorMessage('');
      }
    )
  }

  getCount(): Observable<any> {
    return this.commonService.commonListService('listOfViewRequetCount.sams', this.viewRequest);
  }


  selectedImportModule(event) {
    this.filePath = '';
    this.moduleName = '';
    this.fileName = '';
    this.fileUploader.nativeElement.value = null;
    this.fileUploadFlag = false;
    if (event !== undefined) {
      this.filePath = event.filePath;
      this.moduleName = event.moduleName;
      this.moduleSelectFlag = true;
    } else {
      this.filePath = '';
      this.moduleName = '';
      this.fileName = '';
      this.fileToUpload = null;
      this.moduleSelectFlag = false;
    }  
    this.enableCustFields = (this.filePath == 'ASSET_REGISTER' || this.filePath == 'MODEL' || this.filePath == 'ASSET_GROUP')
      if(!this.enableCustFields){
        this.subCategoryId = 0;
        this.subCategoryName = '';
        this.custFields = false;
      }
      this.getSubCategoryComboValue(undefined);
  }

  downloadSampleFile() {    
    
    this.commonService.commonGetService('getSampleExcelForImport.sams', this.filePath, this.subCategoryId).subscribe(
      data => {         
        if(data.success){
          this.commonService.openToastSuccessMessage('Download Successful.');
           this.downloadDocument(data.responseData); 
        }
      }
    );
  }

  handleFileInput(files: FileList) {        
    this.fileToUpload = files[0]; 
    if (this.fileToUpload.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      if (((this.fileToUpload.size / 1024) / 1024) < 5) {
        this.fileName = this.fileToUpload.name.split('.')[0];   
        this.fileUploadFlag = true;
      } else { 
        this.commonService.openToastWarningMessage('File Size Can Be Up To 5MB.');
        this.fileUploadFlag = false;
      }
    }else {
      this.commonService.openToastWarningMessage('Excel file types are only allowed.');
      this.fileUploadFlag = false;
    }   
  }

  uploadImportFile() {
    const formData: FormData = new FormData();
    formData.append('uploadedFile', this.fileToUpload);
    formData.append('locId', this.userSessionService.getUserLocationId());
    formData.append('orgId', this.userSessionService.getUserOrgId());
    formData.append('locName', this.userSessionService.getUserLocationName());
    formData.append('moduleName', this.moduleName);             
    formData.append('userId', this.userSessionService.getUserId());
    formData.append('userName', this.userSessionService.getUserName());
    formData.append('loginId', this.userSessionService.getUserLoginId());   
    formData.append('locCurrCd',this.userSessionService.getlocCurrCd());

    this.commonService.commonFileUpload('importExcelData.sams', formData).subscribe(
      data => {        
        if (data.success) {
          this.commonService.openToastSuccessMessage("File Upload Successful.");
          this.fileUploadFlag = false;
          this.getCount();
          this.loadList();
          this.dialogRef.close();  
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  //Pagination S.NO sequence generation pased on the number of page
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  //function to get and set the below values to the pagination tag
  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadList();
  }

  onSearchChange(searchValue : string){
    this.viewRequest.programName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadList();
  }

  loadList() {
    this.subLoaderViewRequest = true;
    this.viewRequestMain = [];
    this.viewRequest.pageNumber = Number(this.pageIndex);
    this.viewRequest.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService('listOfViewRequet.sams', this.viewRequest).subscribe(
      data => {        
        if (data.success) {
          this.viewRequestMain = data.responseData;
          this.subLoaderViewRequest = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subLoaderViewRequest = false;
        }
      }, error => {
        this.commonService.openToastErrorMessage('');
      }
    );
  }

  downloadDocument(filePath: string) {
    const fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  selectReport(element){    
    if(this.selectedItem.requestId == element.requestId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }
  
  listOfSubCategory(searchValue) {
    this.subScrollsync = true;
    let limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, this.subCategoryId,'', limitCount, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryData , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryData = this.getData.dataList;
          this.subCategoryData.forEach(obj => {
            obj.displayName = obj.subCategoryName + '/' + obj.categoryName;
        });
          console.log(this.subCategoryData);
          this.subScrollsync = false;
        });
  }

  getSubCategoryComboValue(event) {
    if (event === undefined) {
      this.assetSubCategorPageNumber = 1;
      this.subCategoryId = 0;
      this.subCategoryName = '';
    } else {
      this.subCategoryId = event.subCategoryId;
      this.subCategoryName = event.displayName;
    }
    

  }

}
