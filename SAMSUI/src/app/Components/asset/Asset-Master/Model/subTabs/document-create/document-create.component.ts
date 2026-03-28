import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {

  fileUploadFlag : boolean;
  modelDocumentForm: FormGroup;
  public fileToUpload: File;

  @ViewChild('docName') docNameFocus: ElementRef;
  @ViewChild('modelDocImageUpload') modelDocImageUpload: ElementRef<HTMLElement>;

  constructor(private commonService: CommonService,
              public dialogRef: MatDialogRef<DocumentCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private userSessionService:UserSessionService,
              ) { }

  ngOnInit() {
    this.modelDocumentForm = new FormGroup({
      modelDocId: new FormControl(''),
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
      orgName: new FormControl('')
    });
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
    this.modelDocumentForm.controls.docType.setValue(comboValue.name);
    this.docTypeName = comboValue.name;
  }

  addModelDocument() {
    this.dialogRef.close(this.modelDocumentForm.getRawValue());
  }

  triggerModelDocClickEvent() {
    this.modelDocImageUpload.nativeElement.click();
  }

  // uploadModelDocFile() {
  //   let formData: FormData = new FormData();
  //   formData.append('modelDocImage', this.fileToUpload);
  //   var modelData={'docName':this.fileName,'docType':this.docTypeName,'modelId':this.data.modelId,'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId()};
  //   formData.append('modelDocImageData',JSON.stringify(modelData));
  //   //To start loading
  //   this.commonService.commonFileUpload(this.assetOptimaServices.saveOrUpdateModelDoc, formData).subscribe(
  //     data => {
  //       if (data.success) {

  //         this.translateService.get([data.message])
  //         .subscribe((val) => {
  //           const status = Object.values(val)
  //           if(status.length > 0){
  //             this.commonService.openToastSuccessMessage(String(status[0]));

  //           }
  //         });
  //         this.closeModal();
  //       } else {
  //         this.translateService.get([data.message])
  //         .subscribe((val) => {
  //           const status = Object.values(val)
  //           if(status.length > 0){
  //             this.commonService.openToastSuccessMessage(String(status[0]));

  //           }
  //         });
  //       }
  //       // To end loading
  //     }, error => {
  //       this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
  //       //To end loading
  //     }
  //   );
  // }

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

  uploadModelDocFile() {
    let formData: FormData = new FormData();
    formData.append('modelDocImage', this.fileToUpload); 
    var modelData={'docName':this.modelDocumentForm.controls.docName.value,'docType':this.docTypeName,'modelId':this.data.modelId,'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId()}; 
    formData.append('modelDocImageData',JSON.stringify(modelData));                   
    //To start loading
    this.dialogRef.close({status:true, response: {
      modelDocImage : this.fileToUpload,
      docName:this.modelDocumentForm.controls.docName.value,
      docType:this.docTypeName,
      modelDocId: 0
    }});
  }

  uniqueValidation(){
    const docName = this.modelDocumentForm.controls.docName.value.trim();
    this.modelDocumentForm.controls.docName.setValue(docName);
    if(this.data.modelDocData.findIndex(data => data.docName === this.modelDocumentForm.controls.docName.value) !== -1) {
        this.modelDocumentForm.controls.docName.setErrors({ "notUnique": true });
    }
    else if(docName !== ''){
      this.modelDocumentForm.controls.docName.setErrors(null);
    }
  }

}
