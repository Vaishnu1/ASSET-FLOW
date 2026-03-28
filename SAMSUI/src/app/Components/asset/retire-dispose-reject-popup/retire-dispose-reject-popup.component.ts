import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-retire-dispose-reject-popup',
  templateUrl: './retire-dispose-reject-popup.component.html',
  styleUrls: ['./retire-dispose-reject-popup.component.css']
})
export class RetireDisposeRejectPopupComponent implements OnInit {

  rejectPopUpForm: FormGroup;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<RetireDisposeRejectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.rejectPopUpForm = new FormGroup({
      rejectReason : new FormControl('',[Validators.required]),
      rejectDecision: new FormControl('',[Validators.required])
    });
  }

  Cancel(){
    this.dialogRef.close({'status':false,'form':''});
  }

  Proceed(){
    this.dialogRef.close({'status':true,'form':this.rejectPopUpForm.value});
  }
  

}
