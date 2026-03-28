import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-volume-license-export-from-excel',
  templateUrl: './volume-license-export-from-excel.component.html',
  styleUrls: ['./volume-license-export-from-excel.component.css']
})
export class VolumeLicenseExportFromExcelComponent implements OnInit {

  @ViewChild('assetDocImageUpload') assetDocImageUpload: ElementRef<HTMLElement>;

  exportExcelFileFormGroup: FormGroup;

  fileUploadFlag : boolean;

  selectedFilePath: any;

  public fileToUpload: File;

  constructor(
    public dialogRef: MatDialogRef<VolumeLicenseExportFromExcelComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.exportExcelFileFormGroup = new FormGroup({
      filePath: new FormControl('', [Validators.required]),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  clearBrowseFile() {
    this.exportExcelFileFormGroup.reset();
    
  }

  fileName: string;
  docTypeName: string;
  handleFileInput(files: FileList) { 
    this.fileToUpload = files[0]; 
    console.log(files[0]); 
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

  downloadSampleTemplate() {

  }

  triggerAssetDocClickEvent() {
    this.assetDocImageUpload.nativeElement.click();
  }

}
