import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService extends ToastrService {

  private toastCounter = 0;

  showSuccessToast(message: string, title: string): ActiveToast<any> {
    const toastClass = `custom-toast-${this.toastCounter++}`;
    return this.success(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-center',
      closeButton: true,
      enableHtml: true,
      toastClass: `custom-toast-class ${toastClass}`
    });
  }

  showErrorToast(message: string, title: string): ActiveToast<any> {
    const toastClass = `custom-toast-${this.toastCounter++}`;
    return this.error(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-center',
      closeButton: true,
      enableHtml: true,
      toastClass: `custom-toast-class ${toastClass}`
    });
  }

  showWarningToast(message: string, title: string): ActiveToast<any> {
    const toastClass = `custom-toast-${this.toastCounter++}`;
    return this.warning(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-center',
      closeButton: true,
      enableHtml: true,
      toastClass: `custom-toast-class ${toastClass}`
    });
  }
}
