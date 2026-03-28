import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-contract-doc-create',
  templateUrl: './contract-doc-create.component.html',
  styleUrls: ['./contract-doc-create.component.css']
})
export class ContractDocCreateComponent implements OnInit {

  fileUploadFlag : boolean;
  contractDocumentForm: FormGroup;
  public fileToUpload: File;

  @ViewChild('docName') docNameFocus: ElementRef;
  @ViewChild('contractDocImageUpload') contractDocImageUpload: ElementRef<HTMLElement>;
  
  constructor(private commonService: CommonService,
              public dialogRef: MatDialogRef<ContractDocCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private userSessionService:UserSessionService
              ) { }

  ngOnInit() {
    this.contractDocumentForm = new FormGroup({
      contractDocId: new FormControl(''),
      contractHdrId: new FormControl(''),
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
    this.dialogRef.close({status:false});
  }

  docTypeList = [
    { id: 1, name: 'Contract Document' },
    { id: 2, name: 'Warranty Document' },
    { id: 3, name: 'Insurance Document' },
    { id: 4, name: 'Others' }
  ];

  setDocType(comboValue) {
    this.contractDocumentForm.controls.docType.setValue(comboValue.name);
    this.docTypeName = comboValue.name;
  }

  addContractDocument() {
    this.dialogRef.close(this.contractDocumentForm.getRawValue());
  }

  triggerContractDocClickEvent() {
    this.contractDocImageUpload.nativeElement.click();
  }

  uploadContractDocFile() {
    let formData: FormData = new FormData();
    formData.append('contractDocImage', this.fileToUpload); 
    var contractData={'docName':this.contractDocumentForm.controls.docName.value,'docType':this.docTypeName,'contractHdrId':this.data.contractHdrId,'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId()}; 
    formData.append('contractDocImageData',JSON.stringify(contractData));                   
    //To start loading
    this.dialogRef.close({status:true, response: {
      contractDocImage : this.fileToUpload,
      docName:this.contractDocumentForm.controls.docName.value,
      docType:this.docTypeName,
      contractDocId: 0
    }});
  }
 
  fileName: string;
  docTypeName: string;
  handleFileInput(files: FileList) { 
    this.fileToUpload = files[0]; 
    
    if (true) {
      if (((this.fileToUpload.size / 1024) / 1024) < 5) {
        this.fileName = this.fileToUpload.name.split('.')[0];   
        this.fileUploadFlag = true;
        this.commonService.openToastSuccessMessage('Document Added Successfully.');

      } else { 
        this.commonService.openToastWarningMessage('File Size Can Be Up To 5MB.');
        this.fileUploadFlag = false;
      }
    }
  }

  uniqueValidation(){
    const docName = this.contractDocumentForm.controls.docName.value.trim();
    this.contractDocumentForm.controls.docName.setValue(docName);
    if(this.data.contractDocData.findIndex(data => data.docName === this.contractDocumentForm.controls.docName.value) !== -1) {
        this.contractDocumentForm.controls.docName.setErrors({ "notUnique": true });
    }
    else if(docName !== ''){
      this.contractDocumentForm.controls.docName.setErrors(null);
    }
  }

}
