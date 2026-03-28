import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-po-pdf-preview',
  templateUrl: './po-pdf-preview.component.html',
  styleUrls: ['./po-pdf-preview.component.css']
})
export class PoPdfPreviewComponent implements OnInit {

  fileName: any;

  loadNow = false;
  constructor(private dialogRef: MatDialogRef<PoPdfPreviewComponent>, 
    @Inject(MAT_DIALOG_DATA) private data,
    private sanitizer:DomSanitizer) {
      this.fileName = this.data.filePath;
      this.loadNow = false;
     }

  ngOnInit(): void {
    this.fileName = this.data.filePath;
    this.fileName = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileName);

    setTimeout(() => {
      this.loadNow = true;
    }, 10)
  }

  exit(){
    this.dialogRef.close();
  }

}
