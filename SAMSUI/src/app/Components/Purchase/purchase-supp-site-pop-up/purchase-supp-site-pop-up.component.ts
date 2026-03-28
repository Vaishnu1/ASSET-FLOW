import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-purchase-supp-site-pop-up',
  templateUrl: './purchase-supp-site-pop-up.component.html',
  styleUrls: ['./purchase-supp-site-pop-up.component.css']
})
export class PurchaseSuppSitePopUpComponent implements OnInit {

  scrollApprovedSuppliersync: boolean=false;
  limitCount: any;
  approvedSupplierPageNumber: number=0;
  supplierLocationList: any = [];
  supplierSiteFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
  public dialogRef: MatDialogRef<PurchaseSuppSitePopUpComponent>,
  private commonService: CommonService) { 
    this.approvedSupplierPageNumber=1;
  }

  ngOnInit() {
    this.supplierSiteFormGroup = new FormGroup({
      supplierSiteId: new FormControl(''),
      supplierSiteName: new FormControl(''),
      suppLocCurCd: new FormControl(''),
      rowIndex: new FormControl(this.data.rowIndex)
    });
    if(this.data.supplierSiteId>0){
        this.supplierSiteFormGroup.controls.supplierSiteName.setValue(this.data.supplierSiteName);
        this.supplierSiteFormGroup.controls.supplierSiteId.setValue(this.data.supplierSiteId);
        this.supplierSiteFormGroup.controls.suppLocCurCd.setValue(this.data.currencyCode);
    }
  }

  listOfSupplierApproved(searchValue){
    this.scrollApprovedSuppliersync = true;
    this.limitCount = (searchValue.term === '' || searchValue.term  === undefined || searchValue.term  === null) ? '10' : '';
    this.commonService.getComboResults('listAllPartnerSiteCombo.sams',searchValue.term,this.data.supplierId,'',this.limitCount, this.approvedSupplierPageNumber,'').subscribe(
      (data) =>{
        if (data.success) {
          if (searchValue.term === '' || searchValue.term=== undefined || searchValue.term === null) {
            if (this.approvedSupplierPageNumber === 1) {
              this.supplierLocationList = data.responseData.comboList;
            } else {
              this.supplierLocationList = this.supplierLocationList.concat(data.responseData.comboList);
            }
          } else {
            this.supplierLocationList = data.responseData.comboList;
          }
          this.supplierLocationList.length != 0 ? this.approvedSupplierPageNumber += 1 : this.approvedSupplierPageNumber = 1;
        }
      }
    );
    this.scrollApprovedSuppliersync = false;
  }

  fetchIdOfSupplierApproved(event){
    if (event === undefined) {
      this.supplierSiteFormGroup.get('supplierSiteId').setValue(0);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      this.supplierSiteFormGroup.get('supplierSiteId').setValue(event.partnerSiteId);
      this.supplierSiteFormGroup.get('suppLocCurCd').setValue(event.partnerSiteCurCd);
    }
  }

  closeSupplierSitePopUp(){
    this.dialogRef.close({ 'exit': false, 'form': '' });
  }

  submitPurchaseSite(){   
    this.dialogRef.close({ 'exit': true, 'form': this.supplierSiteFormGroup.getRawValue() });
  }
}
