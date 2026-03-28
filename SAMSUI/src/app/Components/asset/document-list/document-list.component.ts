import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssetDocCreateComponent } from '../Asset/asset-doc/asset-doc-create/asset-doc-create.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  modeDisplay: boolean = false;
  assetDocumentDataSource: any = [];
  assetDocumentDisCol = ['sno', 'docName','fileName', 'docType', 'createdBy', 'createdDt', 'action'];

  constructor(private dialog: MatDialog,private commonService: CommonService,private changeDetectorRefs: ChangeDetectorRef,
    public dialogRef: MatDialogRef<DocumentListComponent>,
    @Inject(MAT_DIALOG_DATA) private data, ) { }

  ngOnInit() {
    this.fetchListOfAssetRetDocs()
  }

  documentAddEdit() {
    let dialogRef = this.dialog.open(AssetDocCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'assetHdrId': this.data.assetHdrId,
        'source':this.data.source
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.fetchListOfAssetRetDocs();
      });
  }

  fetchListOfAssetRetDocs() {
    if(this.data.source == "Asset Retirement"){
    this.commonService.commonGetService('loadAssetRetDoc.sams', this.data.assetHdrId).subscribe(
      (data) => {
        this.assetDocumentDataSource = [];
        this.assetDocumentDataSource = this.assetDocumentDataSource.concat(data.responseData);
      }
    );
  }
  }

  deleteDocument(deleteid, index,fileName) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': fileName
        
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          // if (deleteid <= 0) {
          //   this.documentDataSource.splice(index, 1);
          //   this.refreshDocumentInfoTable();
          // } else {
          this.commonService.commonGetService('deleteAssetRetDoc.sams', deleteid).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.assetDocumentDataSource.splice(index, 1);
                this.refreshDocumentInfoTable();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
          // }
        }
      });
  }

  refreshDocumentInfoTable() {
    let tempArray = this.assetDocumentDataSource;
    this.assetDocumentDataSource = [];
    for (var i = 0; i < tempArray.length; i++) {
      this.assetDocumentDataSource.push(tempArray[i]);
   //   this.changeDetectorRefs.detach();
    }
    this.changeDetectorRefs.detectChanges();
  }

  downloadDocument(filePath: string, contentType: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  closeModal(){
    this.dialogRef.close();
  }

}
