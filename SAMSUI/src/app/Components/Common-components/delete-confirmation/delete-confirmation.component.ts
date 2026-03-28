import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelListComponent } from '../../asset/Asset-Master/Model/model-list/model-list.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
  deleteForm: FormGroup;
  Text: string;
  titleName: string;
  confirmHeading : string;

  constructor( public dialogRef: MatDialogRef<ModelListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) { }

  ngOnInit() {   
    this.titleName = this.data.Text;
    this.confirmHeading = this.data.confirmTitle ? this.data.confirmTitle : '';
    // console.log('Test'+this.confirmHeading);
  }
  
  Cancel() {
    this.dialogRef.close({status: false});
 }
 Proceed() {
    // this.commonService.openToastSuccessMessage('Record Deleted Successfully.');
    this.dialogRef.close({status: true});
 }
}
