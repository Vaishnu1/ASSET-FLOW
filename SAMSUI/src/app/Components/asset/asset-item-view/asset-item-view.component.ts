import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AssetCreateComponent } from '../Asset/asset-create/asset-create.component';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetItemEditComponent } from '../asset-item-edit/asset-item-edit.component';

@Component({
  selector: 'app-asset-item-view',
  templateUrl: './asset-item-view.component.html',
  styleUrls: ['./asset-item-view.component.css']
})
export class AssetItemViewComponent implements OnInit {

  assetItemDataSource :any=[];

  assetItemDispCol = ['sno','stockAllocateNo','stockAllocateStatus','allocatedDt','allocatedQty','consumedQty','remainingQty','action'];

  assetItemFormGroup: FormGroup;
  itemFormGroup : FormGroup;

  disableUpdateButton = false;

  uploadItemFlag= false;

  itemTypeId:number;

  @ViewChild('matTable') matTable: MatTable<any>;

  constructor(
    private readonly cdr:ChangeDetectorRef,
    public dialog: MatDialogRef<AssetCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
    private readonly commonService: CommonService,
    private readonly assetOptimaService: AssetOptimaServices,
    private readonly  itemDialog: MatDialog,


  ) { }

  ngOnInit(): void {
    
    this.assetItemFormGroup= new FormGroup({
      consumedQty : new FormControl(0),
      remainingQty : new FormControl(0),
      updatedBy : new FormControl(''),
      updatedDtDisp : new FormControl(''),
      itemName: new FormControl(''),
      manufacturerName : new FormControl(''),
      itemDesc : new FormControl(''),
      uom : new FormControl(''),
      issueQty : new FormControl(0),
      allocatedDtDisp : new FormControl(''),
      totalAllocatedQty : new FormControl(0),
      totalConsumedQty : new FormControl(0),
      totalRemainingQty : new FormControl(0),
      assetHdrId : new FormControl(0),
      itemId : new FormControl(0),
      itemTypeId : new FormControl(0),
      stockTransferDtlId : new FormControl(0),
      stockTransferHdrId : new FormControl(0),
      createdDt: new FormControl(''),
      createdBy : new FormControl(''),
      updatedDt : new FormControl(''),
    });

    this.itemFormGroup  = new FormGroup({
      consumedItemQty : new FormControl(0),
      remQty :new FormControl(0)
    })
  }

  ngAfterViewInit(){
    if(this.data.element !==0){
      this.assetItemFormGroup.patchValue(this.data.element);
      this.assetItemFormGroup.controls.assetHdrId.setValue(this.data.assetHdrId);
      this.assetItemFormGroup.controls.allocatedDtDisp.setValue(this.data.element.updatedDtDisp);
      if(this.data.mode === 'edit'){
        this.assetItemFormGroup.enable();
        this.itemFormGroup.enable();
      }else{
        this.assetItemFormGroup.disable();
        this.itemFormGroup.disable();
      }
      this.fetchItemDetails(this.data.assetHdrId,this.data.element.itemId); 
    }
    this.itemTypeId = this.data.element.itemTypeId;
    if(this.data.element.issueQty ==0){
      this.disableUpdateButton =true;
      this.itemFormGroup.disable();
      this.commonService.openToastWarningMessage('Item allocation is In-complete.')
    }
    this.cdr.detectChanges();

  }

  fetchItemDetails(assetHdrId,itemId){
    this.commonService.commonGetService(this.assetOptimaService.fetchAssetItemList,assetHdrId,itemId).subscribe(
      data => {
        if(data.success){
            this.assetItemDataSource = data.responseData; 
            this.cdr.detectChanges();
            this.matTable.renderRows();
            } else {
              this.commonService.openToastErrorMessage('Error occurred in fetching item list')
            }
      },error =>{
        this.commonService.openToastErrorMessage('Error occurred in fetching item list')
      }
    );
  }

  closeDialog(){
    this.dialog.close();
  }

  validateRemainingQuantity(){
    if(this.itemFormGroup.controls.consumedItemQty.value > this.assetItemFormGroup.controls.remainingQty.value){
      this.disableUpdateButton =true;
      this.commonService.openToastWarningMessage('Quantity not available, Please check the consumed quantity.');
      this.itemFormGroup.controls.remQty.setValue(this.assetItemFormGroup.controls.remainingQty.value);

    }else{

    if(this.itemFormGroup.controls.consumedItemQty.value !== 'undefined' || this.itemFormGroup.controls.consumedItemQty.value >0 ||
     this.itemFormGroup.controls.consumedQty.value !==""){
    const qty= this.assetItemFormGroup.controls.remainingQty.value - this.itemFormGroup.controls.consumedItemQty.value;
    this.itemFormGroup.controls.remQty.setValue(qty);
    this.itemFormGroup.controls.remQty.disable();
    this.disableUpdateButton=false;
    }
  }
  }

  updateItemQty(){
    
    this.assetItemFormGroup.controls.consumedQty.setValue(this.itemFormGroup.controls.consumedItemQty.value);
    this.assetItemFormGroup.controls.remainingQty.setValue(this.itemFormGroup.controls.remQty.value);
    
    
    this.commonService.commonInsertService(this.assetOptimaService.updateAssetItemQty,this.assetItemFormGroup.getRawValue() ).subscribe(
      data => {
        if (data.success) {
          this.uploadItemFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.closeDialog();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadItemFlag = false;
        }
      }
    );

  }

  dialogRef;
  itemHistory(element){

    this.dialogRef = this.itemDialog.open(AssetItemEditComponent, {
      height: 'auto',
      width: '600px',
      data: {
        'element': element,
        'assetHdrId':this.assetItemFormGroup.controls.assetHdrId.value,
        'itemType':this.data.element.itemTypeId
      }
    });
    this.dialogRef.disableClose = true;
    this.cdr.detectChanges();
  }

  

}
