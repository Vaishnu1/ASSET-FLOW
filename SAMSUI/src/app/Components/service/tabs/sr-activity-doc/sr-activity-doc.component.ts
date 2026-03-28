import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-sr-activity-doc',
  templateUrl: './sr-activity-doc.component.html',
  styleUrls: ['./sr-activity-doc.component.css']
})
export class SrActivityDocComponent implements OnInit {

  fileUploadFlag : boolean;
  srActivityDocForm: FormGroup;
  public fileToUpload: File;

  fileName: string;
  docTypeName: string;

  @ViewChild('docName') docNameFocus: ElementRef;
  @ViewChild('srAcctivityDocImageUpload') srAcctivityDocImageUpload: ElementRef<HTMLElement>;

  srActicityFileList = [];
  dispSrActivityFIleColumns = ['sNo', 'docName', 'docType', 'createdBy', 'createdDtDisp', 'action'];

  constructor(private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<SrActivityDocComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSessionService:UserSessionService) { }

  ngOnInit() {
    this.srActivityDocForm = new FormGroup({
      srActivityDocId: new FormControl('0'),
      srId : new FormControl(this.data.srId),
      srActivityId : new FormControl(this.data.srActivityId),
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
      orgName: new FormControl('')
    });
    this.fetchListOfSRActivityDocs();
  }

  closeModal(){
    this.dialogRef.close();
  }

  docTypeList = [
    { id: 1, name: 'User Manual' },
    { id: 2, name: 'Training Document' },
    { id: 3, name: 'Technical Document' },
    { id: 4, name: 'Others' }
  ];

  setDocType(comboValue) {
    this.srActivityDocForm.controls.docType.setValue(comboValue.name);
    this.docTypeName = comboValue.name;
  }

  addSRDocument() {
    this.dialogRef.close(this.srActivityDocForm.getRawValue());
  }

  uploadSRActivityDocFile() {
    let formData: FormData = new FormData();
    formData.append('srActivityDocImage', this.fileToUpload); 
    var modelData={'docName':this.fileName,'docType':this.docTypeName,'srId':this.data.srId,'srActivityId':this.data.srActivityId,'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId()}; 
    formData.append('srActivityDocImageData',JSON.stringify(modelData));                   
    //To start loading 
    this.commonService.commonFileUpload('saveOrUpdateSRActivityDoc.sams', formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.fileName = '';
          this.ngOnInit();
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

  deleteSRActivityDoc(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Document'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0) {
            this.srActicityFileList.splice(index, 1);
            
          } else {
            this.commonService.commonGetService('deleteSRActivityDoc.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.srActicityFileList.splice(index, 1);
                  this.fetchListOfSRActivityDocs();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

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

  fetchListOfSRActivityDocs() {
    this.commonService.commonGetService('fetchListOfSRActivityDocs.sams', this.srActivityDocForm.controls.srId.value, this.srActivityDocForm.controls.srActivityId.value).subscribe(
      (data) => {
        this.srActicityFileList = [];
        this.srActicityFileList = this.srActicityFileList.concat(data.responseData);
      }
    )
  }

}
