import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-supp-inv-doc-info',
  templateUrl: './supp-inv-doc-info.component.html',
  styleUrls: ['./supp-inv-doc-info.component.css']
})
export class SuppInvDocInfoComponent implements OnInit {

  fileUploadFlag: boolean;
  supplierInvoiceDocForm: FormGroup;
  public fileToUpload: File;

  @ViewChild('docName') docNameFocus: ElementRef;

  constructor(private commonService: CommonService,
              public dialogRef: MatDialogRef<SuppInvDocInfoComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private userSessionService: UserSessionService,
              private assetOptimaConstants: AssetOptimaConstants) { 

              }

  ngOnInit() {
    this.supplierInvoiceDocForm = new FormGroup({
      suppierInvoiceDocId: new FormControl(''),
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
    this.supplierInvoiceDocForm.controls.docType.setValue(comboValue.name);
    this.docTypeName = comboValue.name;
  }

  addModelDocument() {
    this.dialogRef.close(this.supplierInvoiceDocForm.getRawValue());
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

  uploadSupplierInvoiceDocFile() {
    this.docName = this.supplierInvoiceDocForm.controls.docName.value;
    let formData: FormData = new FormData();
    formData.append('supplierInvoiceDocImage', this.fileToUpload); 
    var assetData={'docName':this.docName,'fileName':this.fileName,'docType':this.docTypeName,'supplierInvoiceHdrId':this.data.supplierInvoiceHdrId,
                   'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId()}; 
    formData.append('supplierInvoiceImageData',JSON.stringify(assetData));
    //To start loading 
    this.commonService.commonFileUpload('saveOrUpdateSupplierInvoiceDoc.sams', formData).subscribe(
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

  // uploadSupplierInvoiceDocFile() {
  //   let formData: FormData = new FormData();
  //   formData.append('supplierInvoiceDocImage', this.fileToUpload);
  //   var modelData = {'docName': this.supplierInvoiceDocForm.controls.docName.value, 'docType': this.docTypeName, 'supplierInvoiceHdrId': this.data.supplierInvoiceHdrId, 'userId': this.userSessionService.getUserId(), 'orgId': this.userSessionService.getUserOrgId() };
  //   formData.append('supplierInvoiceImageData', JSON.stringify(modelData));
  //   //To start loading
  //   this.dialogRef.close({
  //     status: true, response: {
  //       modelDocImage: this.fileToUpload,
  //       docName: this.supplierInvoiceDocForm.controls.docName.value,
  //       docType: this.docTypeName,
  //       supplierInvoiceDocId: 0
  //     }
  //   });
  // }

  uniqueValidation() {
    const docName = this.supplierInvoiceDocForm.controls.docName.value.trim();
    this.supplierInvoiceDocForm.controls.docName.setValue(docName);
    if (this.data.documentDataSource.findIndex(data => data.docName === this.supplierInvoiceDocForm.controls.docName.value) !== -1) {
      this.supplierInvoiceDocForm.controls.docName.setErrors({ "notUnique": true });
    }
    else if (docName !== '') {
      this.supplierInvoiceDocForm.controls.docName.setErrors(null);
    }
  }

  
}
