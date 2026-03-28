import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-grn-doc-info',
  templateUrl: './grn-doc-info.component.html',
  styleUrls: ['./grn-doc-info.component.css']
})
export class GrnDocInfoComponent implements OnInit {

  fileUploadFlag: boolean;
  grnDocumentForm: FormGroup;
  public fileToUpload: File;

  @ViewChild('docName') docNameFocus: ElementRef;

  constructor(private commonService: CommonService,
              public dialogRef: MatDialogRef<GrnDocInfoComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private userSessionService: UserSessionService,
              private assetOptimaConstants: AssetOptimaConstants) { 

              }

  ngOnInit() {
    this.grnDocumentForm = new FormGroup({
      grnDocId: new FormControl(''),
      docName: new FormControl(null, [Validators.required]),
      docType: new FormControl('', [Validators.required]),
      filePath: new FormControl('', [Validators.required]),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl('')
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  docTypeList = [
    { id: 1, name: 'Purchase Order' },
    { id: 2, name: 'GRN' },
    { id: 3, name: 'DO' },
    { id: 4, name: 'Supplier Invoice' },
    { id: 5, name: 'Others' }
  ];

  setDocType(comboValue) {
    this.grnDocumentForm.controls.docType.setValue(comboValue.name);
    this.docTypeName = comboValue.name;
  }

  addModelDocument() {
    this.dialogRef.close(this.grnDocumentForm.getRawValue());
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

  uploadGrnDocumentFile() {
    this.docName = this.grnDocumentForm.controls.docName.value;
    let formData: FormData = new FormData();
    formData.append('grnDocImage', this.fileToUpload); 
    var assetData={'docName':this.docName,'fileName':this.fileName,'docType':this.docTypeName,'grnHdrId':this.data.grnHdrId,
                   'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId()}; 
    formData.append('grnImageData',JSON.stringify(assetData));
    //To start loading 
    this.commonService.commonFileUpload('saveOrUpdateGrnDoc.sams', formData).subscribe(
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
