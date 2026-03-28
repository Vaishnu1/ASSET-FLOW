import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-view-audit-images',
  templateUrl: './view-audit-images.component.html',
  styleUrls: ['./view-audit-images.component.css']
})
export class ViewAuditImagesComponent implements OnInit {

  assetImageFilePath : String;
  imageFilePath = [];
  assetPhyVerifyDtlId : number;
  auditStatus : String;


  constructor(public dialogRef: MatDialogRef<ViewAuditImagesComponent>,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) private data,
      private commonService: CommonService,
      private assetOptimaServices: AssetOptimaServices,
      private userSession: UserSessionService,
      private readonly assetOptimaConstants: AssetOptimaConstants) { }

  ngOnInit(): void {

    this.assetImageFilePath = this.data.assetImageFilePath;
    this.assetPhyVerifyDtlId = this.data.assetPhyVerifyDtlId;
    this.auditStatus = this.data.auditStatus;

    console.log('assetPhyVerifyDtlId:'+ this.assetPhyVerifyDtlId)

    this.downloadImageFromServer();
    
  }

  downloadImageFromServer(){
    if(this.assetImageFilePath != null || this.assetImageFilePath != '') {
      this.imageFilePath = [];
      let auditImagesList = (this.assetImageFilePath).split("*");
      auditImagesList.forEach(element => {
        if(element != '') {                    
          this.imageFilePath.push(this.assetOptimaConstants.getServerURL()+"downloadFileFromServer.sams?fileName="+element.trim()+"&contentType=image/png");
        }
      });                
    }
  }

  close(){
    this.dialogRef.close({ status: true, assetImageFilePath: this.assetImageFilePath });
  }

concatenatedPaths: string = '';
deleteImage(index) {
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'Text': 'Image'
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
          
            this.imageFilePath.splice(index, 1);

            let imagePathsArray = this.assetImageFilePath.split('*');
            let deleteImage = imagePathsArray.splice(index, 1);
            this.assetImageFilePath = imagePathsArray.join('*');

            // To delete file from server
            this.deleteDownloadedFile(deleteImage[0]);

            // To update the imagePath
            this.commonService.commonGetService('updatePhysicalAuditImagePath.sams', this.assetPhyVerifyDtlId, this.assetImageFilePath).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);

                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
            
          }
        });
    }

    deleteDownloadedFile(filePath ?: string){
      this.commonService.deleteFileFromServer(filePath).subscribe(
        data => {
        
        }
      );
    } 

}
