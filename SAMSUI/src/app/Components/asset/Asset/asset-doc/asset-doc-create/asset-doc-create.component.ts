import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-asset-doc-create',
  templateUrl: './asset-doc-create.component.html',
  styleUrls: ['./asset-doc-create.component.css']
})
export class AssetDocCreateComponent implements OnInit {

  fileUploadFlag : boolean;
  assetDocumentForm: FormGroup;
  public fileToUpload: File;

  @ViewChild('docName') docNameFocus: ElementRef;
  @ViewChild('assetDocImageUpload') assetDocImageUpload: ElementRef<HTMLElement>;
  
  constructor(private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<AssetDocCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSessionService:UserSessionService  
              ) { }

  ngOnInit() {
    this.assetDocumentForm = new FormGroup({
      assetDocId: new FormControl(''),
      docName: new FormControl(null,[Validators.required]),
      docType: new FormControl('',[Validators.required]),
      filePath: new FormControl('',[Validators.required]),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''), 
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      startDtDisp: new FormControl(''),
      expiryDtDisp: new FormControl(''),
      startDt : new FormControl(''),
      expiryDt : new FormControl(''),
    });
  }

  closeModal(){
    this.dialogRef.close();
  }

  docTypeList = [
    { id: 1, name: 'User Manual' },
    { id: 2, name: 'Certificates Document' },
    { id: 3, name: 'Training Document' },
    { id: 4, name: 'Technical Document' },
    { id: 5, name: 'Image' },
    { id: 6, name: 'Retirement Document' },
    { id: 7, name: 'Others' }
  ];

  setDocType(comboValue) {
    this.assetDocumentForm.controls.docType.setValue(comboValue.name);
    this.docTypeName = comboValue.name;

  }

  addModelDocument() {
    this.dialogRef.close(this.assetDocumentForm.getRawValue());
  }

  triggerAssetDocClickEvent() {
    this.assetDocImageUpload.nativeElement.click();
  }

  uploadAssetDocFile() {
    this.docName = this.assetDocumentForm.controls.docName.value;
    if (this.data.source == "Asset Retirement"){

      let formData: FormData = new FormData();
    formData.append('assetRetDocImage', this.fileToUpload); 
    var assetData={'docName':this.docName,'fileName':this.fileName,'docType':this.docTypeName,'assetHdrId':this.data.assetHdrId,
                   'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId()}; 
    formData.append('assetRetDocImageData',JSON.stringify(assetData));
    //To start loading 
    this.commonService.commonFileUpload('saveOrUpdateAssetRetDoc.sams', formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
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
    
  } else {

    let formData: FormData = new FormData();
    formData.append('assetDocImage', this.fileToUpload); 
    var assetDataSource={'docName':this.docName,'fileName':this.fileName,'docType':this.docTypeName,'assetHdrId':this.data.assetHdrId,
                   'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId(),'startDtDisp' : this.assetDocumentForm.controls.startDtDisp.value,
                  'expiryDtDisp' : this.assetDocumentForm.controls.expiryDtDisp.value}; 
    formData.append('assetDocImageData',JSON.stringify(assetDataSource));
    //To start loading 
    this.commonService.commonFileUpload('saveOrUpdateAssetDoc.sams', formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
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
}
 
  fileName: string;
  docTypeName: string;
  docName: string;
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

  dateChange(){
    this.assetDocumentForm.controls.startDtDisp.setValue(this.commonService.addCurrenrtTimeToDate(this.assetDocumentForm.controls.startDtDisp.value));
    this.assetDocumentForm.controls.expiryDtDisp.setValue(this.commonService.addCurrenrtTimeToDate(this.assetDocumentForm.controls.expiryDtDisp.value));
  }

}

