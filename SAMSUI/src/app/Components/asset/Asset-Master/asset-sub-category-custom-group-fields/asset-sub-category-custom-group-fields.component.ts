import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-asset-sub-category-custom-group-fields',
  templateUrl: './asset-sub-category-custom-group-fields.component.html',
  styleUrls: ['./asset-sub-category-custom-group-fields.component.css']
})
export class AssetSubCategoryCustomGroupFieldsComponent implements OnInit {
  public color: string = '#2889e9';
  public color1: string = '';

  subloader : boolean = false;

  displayedColumns = ['sNo', 'displayGroup', 'color', 'createdBy', 'createdDt'];


    //for pagination
    length: number;

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();
    custFieldsDisplayGroupForm: FormGroup;
    custDisplayGroupList = [];


  constructor(  private commonService: CommonService, 
                private dialogRef: MatDialogRef<AssetSubCategoryCustomGroupFieldsComponent>, 
                @Inject(MAT_DIALOG_DATA) private data,
                private dialog: MatDialog,
                private cdr: ChangeDetectorRef) {

                 }

  ngOnInit() {
    this.custFieldsDisplayGroupForm = new FormGroup({
      displayGroupName : new FormControl('', [Validators.required, Validators.maxLength(100)]),
      color : new FormControl(''),
      orgId : new FormControl(''),
      createdBy : new FormControl(''),
      createdDt : new FormControl(''),
      updatedBy : new FormControl(''),
      updatedDt : new FormControl(''),
      updatedDtDisp : new FormControl(''),
      createdDtDisp : new FormControl('')     
    });
    this.getList1();
    this.custFieldsDisplayGroupForm.controls.color.setValue(this.color);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  public onEventLog(event: string, data: any): void {
    console.log('1'+event, data);
    if(event === 'colorPickerClose' || event === 'colorPickerOpen'){
      this.color = data;
      this.custFieldsDisplayGroupForm.controls.color.setValue(data);
    }else{
      this.color = data.color;
      this.custFieldsDisplayGroupForm.controls.color.setValue(data.color);
    }
  }

  getList1() {
    this.custDisplayGroupList = [];
    this.subloader = true;
    this.commonService.commonListService('fetchListOfAllDisplayGroupName.sams', this.custFieldsDisplayGroupForm.value).subscribe(
      data => {
        if (data.success) {
          this.custDisplayGroupList = data.responseData;
          this.length=this.custDisplayGroupList.length; 
          this.subloader = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subloader = false;
        }
      }, error => {
        this.subloader = false;
      }
    );
  }

  exit(){
    this.dialogRef.close();
  }

  clear() {
    this.custFieldsDisplayGroupForm.reset();    
  }

  saveUpdate() {
    this.commonService.commonInsertService('saveOrUpdateCustDisplayGroupField.sams', this.custFieldsDisplayGroupForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.ngOnInit();       
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        throw error;
      }
    );
  }
}
