import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Location } from '@angular/common';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';

@Component({
  selector: 'app-sr-document',
  templateUrl: './sr-document.component.html',
  styleUrls: ['./sr-document.component.css']
})
export class SrDocumentComponent implements OnInit {

  fileUploadFlag : boolean;
  srDocumentForm: FormGroup;
  public fileToUpload: File;

  fileName: string;
  docTypeName: string;

  updateByBatch = false;

  @ViewChild('docName') docNameFocus: ElementRef;
  @ViewChild('srDocImageUpload') srDocImageUpload: ElementRef<HTMLElement>;

  constructor(private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<SrDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaConstants: AssetOptimaConstants,
              private readonly userSessionService:UserSessionService,
              private readonly location: Location) { }

  ngOnInit() {
    this.srDocumentForm = new FormGroup({
      srDocId: new FormControl(''),
      srId : new FormControl(this.data.srId),
      docName: new FormControl(null),
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
      updateByBatch: new FormControl(this.data.updateByBatch),
      selectedSrIdList: new FormControl(this.data.selectedSrIdList)
    });
    this.updateByBatch = this.data.updateByBatch;
  }

  closeModal(){
    this.dialogRef.close();
  }

  docTypeList = [
    { id: 1, name: 'User Manual' },
    { id: 2, name: 'Training Document' },
    { id: 3, name: 'Technical Document' },
    { id: 4, name: 'Installation Report' },
    { id: 5, name: 'Others' }
  ];

  setDocType(comboValue) {
    this.srDocumentForm.controls.docType.setValue(comboValue.name);
    this.docTypeName = comboValue.name;
  }

  addSRDocument() {
    this.dialogRef.close(this.srDocumentForm.getRawValue());
  }

  triggerModelDocClickEvent() {
    this.srDocImageUpload.nativeElement.click();
  }

  uploadSRDocFileByCheckingConfirmation() {
    if(this.updateByBatch) {
      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'confirmHeading': 'Confirmation',
          'confirmMsg':'Are you sure, You want to Update the selected Installation WO from Batch ?'
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
            this.uploadSRDocFile();
          }
        });
    } else {
      this.uploadSRDocFile();
    }
  }

  uploadSRDocFile() {
    let formData: FormData = new FormData();
    formData.append('srDocImage', this.fileToUpload); 
    const modelData={
      'docName':this.fileName,
      'docType':this.docTypeName,
      'srId':this.data.srId,
      'userId':this.userSessionService.getUserId(),
      'orgId':this.userSessionService.getUserOrgId(),
      'updateByBatch': this.data.updateByBatch,
      'selectedSrIdList': this.data.selectedSrIdList
    }; 
    formData.append('srDocImageData',JSON.stringify(modelData));                   
    //To start loading 
    this.commonService.commonFileUpload('saveOrUpdateSRDoc.sams', formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          if(this.updateByBatch) {
            this.navigateBackOnBatchUpdate();
          } else {
            this.closeModal();
          }
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

  handleFileInput(files: FileList) { 
    this.fileToUpload = files[0]; 
    if(this.srDocumentForm.controls.docType.value == 'Installation Report') {
      if (this.fileToUpload.type == 'application/pdf' || this.fileToUpload.type == 'application/jpeg' || this.fileToUpload.type == 'application/bmp') {
        if (((this.fileToUpload.size / 1024) / 1024) < 5) {
          this.fileName = this.fileToUpload.name.split('.')[0];   
          this.fileUploadFlag = true;
        } else { 
          this.commonService.openToastWarningMessage('File Size Can Be Up To 5MB.');
          this.fileUploadFlag = false;
        }
      } else {
        this.commonService.openToastWarningMessage('PDF/JPEG/BMP file types are only allowed.');
        this.srDocumentForm.controls.docType.setValue('');
        this.fileToUpload = null;
      }
    } else {
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
  }

  navigateBackOnBatchUpdate() {
    if(this.updateByBatch) {
      localStorage.setItem('updateInstallationWOByBatch', 'true');
      this.location.back();
    } else {
      localStorage.setItem('updateInstallationWOByBatch', 'false');
    }
  }

}
