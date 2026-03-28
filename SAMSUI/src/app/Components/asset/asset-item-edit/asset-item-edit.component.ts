import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AssetCreateComponent } from 'src/app/Components/asset/Asset/asset-create/asset-create.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Component({
  selector: 'app-asset-item-edit',
  templateUrl: './asset-item-edit.component.html',
  styleUrls: ['./asset-item-edit.component.css']
})
export class AssetItemEditComponent implements OnInit {

  headingDisplay :string;
  assetItemFromGroup : FormGroup;
  assetItemDatasource : any= [];
  uploadItemFlag = false;
  disableUpdateButton = false;
  itemDetailsDataSource:any=[];
  @ViewChild('itemTable') tableItem: MatTable<any>;

  assetItemDispCol =['sno','consumedQty','remainingQty','consumedDt','consumedBy']
  constructor(
    public itemDialog: MatDialogRef<AssetCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private readonly cdr: ChangeDetectorRef,
    private readonly commonService : CommonService,
    private readonly userSessionService: UserSessionService,
    public assetOptimaService: AssetOptimaServices,
    private readonly  dialog: MatDialog

  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    if(this.data.element !== null){

      this.fetchItemViewDetails(this.data.assetHdrId,this.data.element.itemId,this.data.itemType,this.data.element.stockTransferDtlId)
      this.cdr.detectChanges();
    }
  }
  closeDialog(){
    this.itemDialog.close();
  }

 

  

  fetchItemViewDetails(assetHdrId,itemId,itemType,stockTransferDtlId){
    this.commonService.commonGetService(this.assetOptimaService.assetItemDetailsByItemId,assetHdrId,itemType,itemId,stockTransferDtlId).subscribe(
      data => {
        if(data.success){
            this.itemDetailsDataSource = data.responseData; 
            this.cdr.detectChanges();
            } else {
              this.commonService.openToastErrorMessage('Error occurred in fetching item list')
            }
      },error =>{
        this.commonService.openToastErrorMessage('Error occurred in fetching item list')
      }
    );
  }

}
