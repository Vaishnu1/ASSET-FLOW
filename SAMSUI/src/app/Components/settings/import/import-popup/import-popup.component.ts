import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-import-popup',
  templateUrl: './import-popup.component.html',
  styleUrls: ['./import-popup.component.css']
})
export class ImportPopupComponent implements OnInit {

  fileName: string;
  filePath: string
  fileUploadFlag : boolean = false;
  public fileToUpload: File;

  constructor(public dialogRef: MatDialogRef<ImportPopupComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commonService:CommonService,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSessionService:UserSessionService) { 
  }

  ngOnInit() {

  }

  close(){
    this.dialogRef.close(); 
  }

  import(){
    
  }

  handleFileInput(files: FileList) {
    
    this.fileToUpload = files[0]; 
    if (this.fileToUpload.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
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

  downloadSampleFile() { 
    this.commonService.commonGetService('getSampleExcelForImport.sams',this.data.filepath).subscribe(
      data => {         
        if(data.success){
           this.downloadDocument(data.responseData); 
        }else{
        }
      }, error =>{
      }
    );
  }

  downloadDocument(filePath: string) {
    this.commonService.showSpinner();
    var fileName = filePath.split('.')[0]; 
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.'); 
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
    this.commonService.hideSpinner();
  }

  uploadImportFile() {
    let formData: FormData = new FormData();
    formData.append('uploadedFile', this.fileToUpload);
    formData.append('locId', this.userSessionService.getUserLocationId());
    formData.append('orgId', this.userSessionService.getUserOrgId());
    formData.append('locName', this.userSessionService.getUserLocationName());
    formData.append('moduleName', this.data.moduleName);             
    formData.append('userId', this.userSessionService.getUserId());
    formData.append('userName', this.userSessionService.getUserName());

    this.commonService.commonFileUpload('importExcelData.sams', formData).subscribe(
      data => {
        console.log(data);
        
        if (data.success) {
          this.commonService.openToastSuccessMessage("File Uploaded. </br> Refer VIEW REQUEST for details. </br> Request Number :" + data.responseData);
          this.dialogRef.close();  
        } else {
          console.log(data);
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }



}
