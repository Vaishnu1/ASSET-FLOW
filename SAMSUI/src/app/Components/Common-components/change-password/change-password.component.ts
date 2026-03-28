import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../../Services/common-service/common.service';
import { AssetOptimaServices } from '../../../Constants/AssetOptimaServices';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserSessionService } from '../../../Services/user-session-service/user-session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from '../../../../app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  // Set Page Title
  title = 'Asset Optima - Change Password';

  @ViewChild('oldPassword') focusOldPassword: ElementRef;

  changePasswordFormGroup: FormGroup; 

  uploadFlagPassword = false;

  upperCaseFlag = false;
  lowerCaseFlag = false;
  numberFlag = false;
  specialCharFlag = false;
  spaceFlag = false;
  lengthFlag = false;

  pwdChangeCount: number;

  constructor(private readonly commonService: CommonService,
              private readonly service: AssetOptimaServices,
              private readonly activatedRoute: ActivatedRoute,
              private readonly titleService: Title,
              private readonly userSessionService: UserSessionService,
              private readonly router: Router,
              private readonly samsConstants: AssetOptimaConstants) {
                this.pwdChangeCount = 0;
               }

  ngOnInit() {
    this.pwdChangeCount = this.userSessionService.getpwdChangeCount();
    this.titleService.setTitle(this.title);
    this.changePasswordFormGroup = new FormGroup({
      oldPassword : new FormControl(''),
      newPassword : new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(8), Validators.pattern(this.samsConstants.passwordValidation)]),
      confirmPassword : new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(8), Validators.pattern(this.samsConstants.passwordValidation)])
    });
    setTimeout(() => {
      this.focusOldPassword.nativeElement.focus();
    }, 500);
  }

  changePassword(){
    if(this.changePasswordFormGroup.controls.oldPassword.value 
      != this.changePasswordFormGroup.controls.newPassword.value){
    if(this.changePasswordFormGroup.controls.newPassword.value 
      === this.changePasswordFormGroup.controls.confirmPassword.value){
    this.uploadFlagPassword=true;
    let obj = { 
      'oldPassword': this.changePasswordFormGroup.controls.oldPassword.value,
      'newPassword': this.changePasswordFormGroup.controls.newPassword.value 
    };
    this.commonService.commonInsertService('changeUserPassword.sams',obj).subscribe(
      data => {
        if(data.success){ 
          this.commonService.openToastSuccessMessage(data.message);
          this.uploadFlagPassword=false;
          this.changePasswordFormGroup.reset();
          this.router.navigate(['/login']);
          } else {
          this.commonService.openToastWarningMessage(data.message);
          this.uploadFlagPassword=false;
          }
      }            
    );
   }else{
    this.commonService.openToastWarningMessage("The New Password and Confirm Password does not match");
   }
  }else{
    this.commonService.openToastWarningMessage("The Old Password and New Password are same");
   }      
  }

  clear(){
    this.changePasswordFormGroup.reset();          
    this.changePasswordFormGroup.updateValueAndValidity();  
    this.focusOldPassword.nativeElement.focus();    
  }


  validationCheck() {

    const newPassword = this.changePasswordFormGroup.controls.newPassword.value;

    if (newPassword?.length >= 8 ) {
      this.lengthFlag = true;
    } else {
      this.lengthFlag = false;
    }

    if(/[A-Z]+/.test(newPassword)){
      this.upperCaseFlag = true;
    } else {
      this.upperCaseFlag = false;
    }

    if(/[a-z]+/.test(newPassword)){
      this.lowerCaseFlag = true;
    } else {
      this.lowerCaseFlag = false;
    }
    
    if(/[0-9]+/.test(newPassword)){
      this.numberFlag = true;
    } else {
      this.numberFlag = false;
    }

    if(/[!#-/:-@[-`{-~]+/.test(newPassword)){
      this.specialCharFlag = true;
    } else {
      this.specialCharFlag = false;
    }

    if(/[ ]+/.test(newPassword)){
      this.spaceFlag = true;
    } else {
      this.spaceFlag = false;
    }
    
    if (newPassword.includes(this.userSessionService.getUserLoginId())) {
      this.commonService.openToastWarningMessage('Password should not contain user id.');
    }
    
    if (newPassword.includes(this.userSessionService.getUserName())) {
      this.commonService.openToastWarningMessage('Should not contain user name.')
    }
    
    if ((this.userSessionService.getUserEmailId()) && newPassword.includes(this.userSessionService.getUserEmailId())) {
      this.commonService.openToastWarningMessage('Should not contain email id.');
    }
    
  }

}
