import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefaultPrinterService } from '../../../../Services/default-printer-service/default-printer-service';

@Component({
  selector: 'app-room-label-print',
  templateUrl: './room-label-print.component.html',
  styleUrls: ['./room-label-print.component.css']
})
export class RoomLabelPrintComponent {

  // Default set to BARCODE to match the image
  printType: 'QR' | 'BARCODE' = 'BARCODE';
  roomList: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RoomLabelPrintComponent>,
    private readonly defaultprinterservice : DefaultPrinterService
  ) {
    this.roomList = data.assetList; 
  }

  print() {
    // Logic remains the same
    const printMode = this.printType === 'QR' ? 'QRCODE' : 'BARCODE';
    // const printMode = 'QRCODE';

    this.defaultprinterservice.DefaultPrintServiceRoom(
      this.roomList,           
      1,                       
      false,                   
      'PDF',                   
      printMode,               
      'PDF'                    
    );

    this.dialogRef.close();
  }
}