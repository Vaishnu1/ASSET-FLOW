import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Component({
  selector: 'app-preinw-document',
  templateUrl: './preinw-document.component.html',
  styleUrls: ['./preinw-document.component.css']
})
export class PreinwDocumentComponent implements OnInit {

  fileUploadFlag : boolean;
  uploadDocForCertificate: FormGroup;
  public fileToUpload: File;
  modeDisplay: string = "";
  mode: string = "";

  @ViewChild('certificateName') docNameFocus: ElementRef;
  @ViewChild('assetDocImageUpload') assetDocImageUpload: ElementRef<HTMLElement>;

  constructor(private commonService: CommonService,
              public dialogRef: MatDialogRef<PreinwDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaServices:AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSessionService:UserSessionService) { }

  ngOnInit() {
    this.uploadDocForCertificate = new FormGroup({
      assetCertificateId: new FormControl(0),
      filePath: new FormControl('', [Validators.required]),
      orgId: new FormControl(0),
      preInwHdrId: new FormControl(0),
      preInwDtlId: new FormControl(this.data.dtlId),
      certificateId: new FormControl(0),
      startDt: new FormControl(''),
      startDtDisp: new FormControl('', [Validators.required]),
      issueDt: new FormControl(''),
      issueDtDisp: new FormControl('', [Validators.required]),
      expiryDt: new FormControl(''),
      expiryDtDisp: new FormControl('', [Validators.required]),
      fileCertificateNo: new FormControl('', [Validators.required]),
      documentNo: new FormControl('', [Validators.required]),
      certificateName: new FormControl('', [Validators.required]),
      certificationAuthorityName: new FormControl(''),
      issuingAuthority: new FormControl(''),
      contentType: new FormControl(''),
      downloadPath: new FormControl(''),
      inwardInventoryDtlId: new FormControl(0),
      inwardInventoryHdrId: new FormControl(0)
    });
  }

  ngAfterViewInit(){
    this.uploadDocForCertificate.patchValue(this.data.certificateModel);
    this.modeDisplay = this.data.mode;
    this.mode = this.data.view;
    if(this.modeDisplay=='edit'){
      this.uploadDocForCertificate.disable();
    }if(this.mode == 'View'){
      this.uploadDocForCertificate.disable();
    }
  }

  closeModel(){
    this.dialogRef.close();
  }

  addModelDocument() {
    this.dialogRef.close(this.uploadDocForCertificate.getRawValue());
  }

  triggerAssetDocClickEvent() {
    this.assetDocImageUpload.nativeElement.click();
  }

  uploadAssetDocFile() {
    let formData: FormData = new FormData();
    formData.append('assetCertificateImage', this.fileToUpload);
    var certificateData={
                    'assetCertificateId': this.uploadDocForCertificate.controls.assetCertificateId.value,
                    'certificateId': this.uploadDocForCertificate.controls.certificateId.value,
                    'startDt': this.uploadDocForCertificate.controls.startDt.value,
                    'startDtDisp': this.uploadDocForCertificate.controls.startDtDisp.value,
                    'issueDt': this.uploadDocForCertificate.controls.issueDt.value,
                    'issueDtDisp': this.uploadDocForCertificate.controls.issueDtDisp.value,
                    'expiryDt': this.uploadDocForCertificate.controls.expiryDt.value,
                    'expiryDtDisp': this.uploadDocForCertificate.controls.expiryDtDisp.value,
                    'fileCertificateNo': this.uploadDocForCertificate.controls.fileCertificateNo.value,
                    'documentNo': this.uploadDocForCertificate.controls.documentNo.value,
                    'certificateName': this.uploadDocForCertificate.controls.certificateName.value,
                    'certificationAuthorityName': this.uploadDocForCertificate.controls.certificationAuthorityName.value,
                    'inwardInventoryHdrId': this.uploadDocForCertificate.controls.inwardInventoryHdrId.value,
                    'inwardInventoryDtlId': this.data.dtlId,
                    'orgId':this.userSessionService.getUserOrgId(),
                    'userId':this.userSessionService.getUserId(),
                    'docName': this.fileName
                  };
    formData.append('certificateImageData',JSON.stringify(certificateData));
    //To start loading
    this.commonService.commonFileUpload(this.assetOptimaServices.saveOrUpdatePreInwardCertificate, formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.closeModel();
        } else {
          this.commonService.openToastErrorMessage("Error occurred During Save.");
        }
        // To end loading
      }, error => {
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
        //To end loading
      }
    );
  }

  fileName: string;
  docTypeName: string;
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

  downloadCertificate(filePath: string, contentType: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  // deleteAssetCertificateFile(deleteid) {
  //   let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
  //     height: 'auto',
  //     width: '400px',
  //     data: {
  //       'Text': 'Document'
  //     }
  //   });
  //   dialogRef.disableClose = true;
  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       if (data.status) {
  //         this.commonService.commonGetService('deleteAssetCertificate.sams', deleteid).subscribe(
  //           data => {
  //             if (data.success) {
  //               this.commonService.openToastSuccessMessage(data.message);
  //               this.closeModel();
  //             } else {
  //               this.commonService.openToastErrorMessage(data.message);
  //             }
  //           }
  //         );
  //       }
  //     });
  // }

  clear(){
    this.uploadDocForCertificate.controls.startDt.setValue('');
    this.uploadDocForCertificate.controls.startDtDisp.setValue('');
    this.uploadDocForCertificate.controls.issueDtDisp.setValue('');
    this.uploadDocForCertificate.controls.expiryDt.setValue('');
    this.uploadDocForCertificate.controls.expiryDtDisp.setValue('');
    this.uploadDocForCertificate.controls.fileCertificateNo.setValue('');
    this.uploadDocForCertificate.controls.documentNo.setValue('');
    this.uploadDocForCertificate.controls.issueDt.setValue('');
    this.modeDisplay ='add';
    this.uploadDocForCertificate.enable();
  }

}
