// ORIGINAL
// import { Injectable, OnInit } from '@angular/core';
// import { jsPDF } from "jspdf";
// import { CommonService } from '../common-service/common.service';

// import * as QRCode  from 'qrcode';
// import * as JsBarcode from 'jsbarcode';


// @Injectable({
//     providedIn: 'root'
//   })

//   export class DefaultPrinterService implements OnInit {

//     doc: any

//     pageWidth : any;
//     pageHeight : any;
//     y: any;
//     pageMargin : any;
//     list : any

//     cellMargin : any;
//     cellWidth : any;
//     cellHeight : any;

//     cuttingtool : any = '';
//     startX: number;
//     startY: number;
//     dinaAlign: number = 11;
//     defAlign: number=15;

//     constructor(private readonly commonService: CommonService) { }

//     ngOnInit(): void { 

//     }

//     async DefaultPrintService(assetList?: any,noOfLabels?: number, cutterTool?: any ,fileExtension? :any, pdfType? :any, printerModel? :any){      

//       this.cuttingtool = cutterTool;

//         this.doc = new jsPDF('p', 'pt', 'a4');

//         this.startX  = 10;
//         this.startY = 70;  

//         this.pageWidth = 595;
//         this.pageHeight = 842;
//         this.y=700;
//         this.pageMargin = 10;
//         this.list = [];

//         this.cellMargin = 5;
//         this.cellWidth = 300;
//         this.cellHeight = 90;


//         this.pageWidth -= this.pageMargin * 2;
//           this.pageHeight -= this.pageMargin * 2;

//       if(cutterTool !== ''){
//         this.dinaAlign = 15;
//         this.doc.addImage(cutterTool, 'png', this.startX + 15, this.startY  - 40, 25, 15);
//       }     


//         this.list=assetList;  

//         for(let i=0; i<this.list.length; i++){
//           if(!(fileExtension == 'PDF')){
//             this.createCard(i+1)
//           } else{
//                 this.createCardPDF(i+1,pdfType);
//           }
//           }

//     }

//     async createCardPDF(i,pdfType) {  

//       if(pdfType == 'QRCODE'){
//         let imgurl;

//         let asset = this.list[i - 1];

//         console.log(this.list[i - 1])

//         let assetDesc = asset.description.length > 22 
//           ? asset.description.substring(0, 22) + '...' 
//           : asset.description;

//         // QR generation
//         const mycanvas = document.createElement("canvas");
//         mycanvas.id = "mycanvas";

//         if (asset.assetCode) {
//           await QRCode.toDataURL(mycanvas, asset.assetCode, {
//             errorCorrectionLevel: 'H',
//             type: 'image/jpeg',
//             scale: 100,
//             width: 100,
//             margin: 1,
//             color: {
//               dark: "#000000",
//               light: "#ffffff"
//             }
//           })
//             .then(url => {
//               imgurl = url;
//             })
//             .catch(err => {
//               console.error(err);
//             });
//         }

//         // Create vertical label: 90mm tall, 24mm wide
//         this.doc = new jsPDF({
//           orientation: 'portrait',
//           unit: 'mm',
//           format: [90, 24] // vertical label (90mm height x 24mm width)
//         });

//         // Rotate QR and text by 90° using the `angle` parameter

//         // QR Code (rotate 90°)
//         if (imgurl) {
//         const labelWidth = 24;
//         const qrWidth = 20;
//         const qrHeight = 20;

//         const x = 22; // Horizontally center
//         const y = 65; // Keep y as is, or adjust vertically if needed

//         this.doc.addImage(imgurl, 'JPEG', x, y, qrWidth, qrHeight, undefined, 'FAST', 90);
//         }

//         // Rotated text
//         this.doc.setFontSize(7);

//         // All the texts below are rotated individually
//         this.doc.text('Asset code: ' + asset.assetCode, 6, 60, { angle: 90 });
//         this.doc.text('Description: ' + assetDesc, 9, 60, { angle: 90 });
//         this.doc.setFontSize(6);
//         this.doc.text(asset.modelName + ' | ' + asset.manufacturerName + ' | ' + asset.serialNo, 12, 60, { angle: 90 });

//         this.doc.setFontSize(7);
//         this.doc.text('Purchase: ' + asset.purchaseDtDisp, 15, 60, { angle: 90 });
//         this.doc.text('Installation: ' + asset.installationDtDisp, 18, 60, { angle: 90 });

//         if (this.dinaAlign === 11) {
//           this.doc.text('Child Asset of: ' + asset.parentAssetCode, 21, 60, { angle: 90 });
//         }

//         // Save and print
//         if (i === this.list.length) {
//           const pdfBlob = this.doc.output('blob');
//           const pdfUrl = URL.createObjectURL(pdfBlob);
//           const printWindow = window.open(pdfUrl, '_blank');
//           printWindow?.addEventListener('load', () => {
//             printWindow.focus();
//             printWindow.print();
//           });

//           this.doc.save('vertical-label.pdf');
//         }

//       }else{
//         this.createCardBarCodePdf(i);
//       }



//     }

//     async createCardBarCodePdf(i) {
//       const asset = this.list[i - 1];
//       console.log(this.list[i - 1])
//       let imgurl = '';

//       let assetDesc = asset.description.length > 10 
//           ? asset.description.substring(0, 10) + '...' 
//           : asset.description;

//       // Create canvas
//       const mycanvas = document.createElement("canvas");
//       mycanvas.id = "barcodeCanvas";

//       if (asset.assetCode) {
//         // Generate barcode
//         JsBarcode(mycanvas, asset.assetCode, {
//           format: "CODE128",
//           displayValue: false,
//           width: 2,
//           height: 5,
//           margin: 2
//         });

//         // Convert to base64 image
//         imgurl = mycanvas.toDataURL("image/png");

//         // Create vertical PDF: 90mm height × 24mm width
//         this.doc = new jsPDF({
//           orientation: 'portrait',
//           unit: 'mm',
//           format: [40, 15]
//         });

//         // Add rotated barcode (rotate by 90 degrees)
//         const barcodeX = 10; // Near right edge (because of rotation)
//         const barcodeY = 26; // Position vertically (rotate anchor)
//         const barcodeWidth = 35;
//         const barcodeHeight = 12;

//         this.doc.addImage(imgurl, 'PNG', barcodeX, barcodeY, barcodeWidth, barcodeHeight, undefined, 'FAST', 90);

//         // Add rotated assetCode below barcode
//         this.doc.setFontSize(7);
//         this.doc.text('Asset code: ' + asset.assetCode, 10, 35, { angle: 90 });
//         this.doc.text('Description: ' + assetDesc, 13, 35, { angle: 90 });
//       }

//       // Save the file (if this is the last asset in loop)
//       if (i === this.list.length) {

//         const pdfBlob = this.doc.output('blob');
//         const pdfUrl = URL.createObjectURL(pdfBlob);
//         const printWindow = window.open(pdfUrl, '_blank');
//         printWindow?.addEventListener('load', () => {
//           printWindow.focus();
//           printWindow.print();
//         });

//         this.doc.save('barcode-label.pdf');
//       }

//   }

//     textContent: string = ""; 

// async createCard(i: number) {
//     let assetDesc =
//         this.list[i - 1].description.length > 22
//             ? this.list[i - 1].description.substring(0, 22) + "..."
//             : this.list[i - 1].description;
//     this.textContent += 
//         `${this.list[i - 1].assetCode || "N/A"}|` +
//         `${this.list[i - 1].assetCategoryName}|` +
//         `${this.list[i - 1].description}|`+
//         `${this.list[i - 1].locationName}|`+
//         `${this.list[i-1].purchaseDtDisp}|`+
//         `AC:${this.list[i - 1].assetCode}\n`;
//     if (i === this.list.length) {
//         const blob = new Blob([this.textContent], { type: "text/plain" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = "labels.txt";
//         link.click();

//         this.textContent = ""; 
//         this.startX = 10;
//         this.startY = 70;
//         this.pageWidth = 595;
//         this.pageHeight = 842;
//         this.y = 700;
//         this.pageMargin = 10;
//         this.list = [];
//         this.cellMargin = 5;
//         this.cellWidth = 300;
//         this.cellHeight = 90;
//     }
// }
//   }



// ONE PER PAGE

// import { Injectable, OnInit } from '@angular/core';
// import { jsPDF } from "jspdf";
// import { CommonService } from '../common-service/common.service';

// import * as QRCode from 'qrcode';
// import * as JsBarcode from 'jsbarcode';

// @Injectable({
//   providedIn: 'root'
// })
// export class DefaultPrinterService implements OnInit {

//   doc: any;
//   pageWidth: any;
//   pageHeight: any;
//   y: any;
//   pageMargin: any;
//   list: any;

//   cellMargin: any;
//   cellWidth: any;
//   cellHeight: any;

//   cuttingtool: any = '';
//   startX: number;
//   startY: number;
//   dinaAlign: number = 11;
//   defAlign: number = 15;

//   constructor(private readonly commonService: CommonService) { }

//   ngOnInit(): void { }

//   async DefaultPrintService(assetList?: any, noOfLabels?: number, cutterTool?: any, fileExtension?: any, pdfType?: any, printerModel?: any) {
//     this.cuttingtool = cutterTool;

//     this.startX = 10;
//     this.startY = 70;

//     this.pageWidth = 595;
//     this.pageHeight = 842;
//     this.pageMargin = 10;

//     this.pageWidth -= this.pageMargin * 2;
//     this.pageHeight -= this.pageMargin * 2;

//     this.cellMargin = 5;
//     this.cellWidth = 300;
//     this.cellHeight = 90;

//     this.list = assetList || [];

//     if (fileExtension === 'PDF') {
//       // 📝 Create doc only once
//       this.doc = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: pdfType === 'QRCODE' ? [90, 24] : [40, 15]
//       });

//       if (this.cuttingtool !== '') {
//         this.dinaAlign = 15;
//         this.doc.addImage(this.cuttingtool, 'png', this.startX + 15, this.startY - 40, 25, 15);
//       }

//       for (let i = 0; i < this.list.length; i++) {
//         await this.createCardPDF(i + 1, pdfType);
//         if (i < this.list.length - 1) {
//           this.doc.addPage(pdfType === 'QRCODE' ? [90, 24] : [40, 15]);
//         }
//       }

//       // 🖨️ Print and Save once
//       const pdfBlob = this.doc.output('blob');
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       const printWindow = window.open(pdfUrl, '_blank');
//       printWindow?.addEventListener('load', () => {
//         printWindow.focus();
//         printWindow.print();
//       });

//       this.doc.save(pdfType === 'QRCODE' ? 'qrcode-labels.pdf' : 'barcode-labels.pdf');
//     } else {
//       for (let i = 0; i < this.list.length; i++) {
//         this.createCard(i + 1);
//       }
//     }
//   }

//   async createCardPDF(i, pdfType) {
//     const asset = this.list[i - 1];

//     let assetDesc = asset.description.length > 22
//       ? asset.description.substring(0, 22) + '...'
//       : asset.description;

//     if (pdfType === 'QRCODE') {
//       let imgurl;

//       const mycanvas = document.createElement("canvas");
//       mycanvas.id = "mycanvas";

//       if (asset.assetCode) {
//         try {
//           imgurl = await QRCode.toDataURL(mycanvas, asset.assetCode, {
//             errorCorrectionLevel: 'H',
//             type: 'image/jpeg',
//             scale: 100,
//             width: 100,
//             margin: 1,
//             color: { dark: "#000000", light: "#ffffff" }
//           });
//         } catch (err) {
//           console.error(err);
//         }
//       }

//       if (imgurl) {
//         const labelWidth = 24;
//         const qrWidth = 20;
//         const qrHeight = 20;
//         const x = 22;
//         const y = 65;

//         this.doc.addImage(imgurl, 'JPEG', x, y, qrWidth, qrHeight, undefined, 'FAST', 90);
//       }

//       this.doc.setFontSize(7);
//       this.doc.text('Asset code: ' + asset.assetCode, 6, 60, { angle: 90 });
//       this.doc.text('Description: ' + assetDesc, 9, 60, { angle: 90 });
//       this.doc.setFontSize(6);
//       this.doc.text(asset.modelName + ' | ' + asset.manufacturerName + ' | ' + asset.serialNo, 12, 60, { angle: 90 });

//       this.doc.setFontSize(7);
//       this.doc.text('Purchase: ' + asset.purchaseDtDisp, 15, 60, { angle: 90 });
//       this.doc.text('Installation: ' + asset.installationDtDisp, 18, 60, { angle: 90 });

//       if (this.dinaAlign === 11) {
//         this.doc.text('Child Asset of: ' + asset.parentAssetCode, 21, 60, { angle: 90 });
//       }
//     } else {
//       await this.createCardBarCodePdf(i);
//     }
//   }

//   async createCardBarCodePdf(i) {
//     const asset = this.list[i - 1];

//     let assetDesc = asset.description.length > 10
//       ? asset.description.substring(0, 10) + '...'
//       : asset.description;

//     const mycanvas = document.createElement("canvas");
//     mycanvas.id = "barcodeCanvas";

//     if (asset.assetCode) {
//       JsBarcode(mycanvas, asset.assetCode, {
//         format: "CODE128",
//         displayValue: false,
//         width: 2,
//         height: 5,
//         margin: 2
//       });

//       const imgurl = mycanvas.toDataURL("image/png");

//       const barcodeX = 10;
//       const barcodeY = 26;
//       const barcodeWidth = 35;
//       const barcodeHeight = 12;

//       this.doc.addImage(imgurl, 'PNG', barcodeX, barcodeY, barcodeWidth, barcodeHeight, undefined, 'FAST', 90);

//       this.doc.setFontSize(7);
//       this.doc.text('Asset code: ' + asset.assetCode, 10, 35, { angle: 90 });
//       this.doc.text('Description: ' + assetDesc, 13, 35, { angle: 90 });
//     }
//   }

//   textContent: string = "";

//   async createCard(i: number) {
//     const asset = this.list[i - 1];

//     let assetDesc = asset.description.length > 22
//       ? asset.description.substring(0, 22) + "..."
//       : asset.description;

//     this.textContent +=
//       `${asset.assetCode || "N/A"}|${asset.assetCategoryName}|${asset.description}|${asset.locationName}|${asset.purchaseDtDisp}|AC:${asset.assetCode}\n`;

//     if (i === this.list.length) {
//       const blob = new Blob([this.textContent], { type: "text/plain" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = "labels.txt";
//       link.click();

//       this.textContent = "";
//     }
//   }
// }


// MULTIPLE BUT BARCODE LANDSCAPE AND QR PORTRAIT

import { Injectable, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';
import * as JsBarcode from 'jsbarcode';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultPrinterService implements OnInit {

  doc: any;
  pageWidth: number;
  pageHeight: number;
  y: number;
  pageMargin: number;
  list: any[];

  cellMargin: number;
  cellWidth: number;
  cellHeight: number;

  cuttingtool: any = '';
  startX: number;
  startY: number;
  dinaAlign: number = 11;
  defAlign: number = 15;

  textContent: string = "";

  constructor(private readonly commonService: CommonService) { }

  ngOnInit(): void { }

  async DefaultPrintService(assetList?: any, noOfLabels?: number, cutterTool?: any, fileExtension?: any, pdfType?: any, printerModel?: any) {
    this.cuttingtool = cutterTool;
    this.startX = 10;
    this.startY = 70;
    this.pageWidth = 595;
    this.pageHeight = 842;
    this.pageMargin = 10;
    this.list = assetList || [];

    this.pageWidth -= this.pageMargin * 2;
    this.pageHeight -= this.pageMargin * 2;
    this.cellMargin = 5;
    this.cellWidth = 300;
    this.cellHeight = 90;

    if (fileExtension === 'PDF') {
      if (pdfType === 'QRCODE') {
        // this.doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [90, 24] });
        // for (let i = 0; i < this.list.length; i++) {
        //   await this.createCardPDF(i + 1, pdfType);
        //   if (i < this.list.length - 1) this.doc.addPage([90, 24]);
        // }
        // const blob = this.doc.output("blob");
        // const url = URL.createObjectURL(blob);
        // const printWindow = window.open(url, '_blank');
        // printWindow?.addEventListener('load', () => {
        //   printWindow.focus();
        //   printWindow.print();
        // });
        // this.doc.save('qrcode-labels.pdf');
        await this.generateQRCodeSheet(this.list);
      } else {
        await this.generateBarcodeSheet(this.list);
      }
    } else {
      for (let i = 0; i < this.list.length; i++) this.createCard(i + 1);
    }
  }

  async createCardPDF(i: number, pdfType: string) {
    const asset = this.list[i - 1];
    const assetDesc = (asset.description || '').substring(0, 22);

    let imgurl = '';
    const canvas = document.createElement("canvas");

    if (asset.assetCode) {
      try {
        imgurl = await QRCode.toDataURL(canvas, asset.assetCode, {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          scale: 100,
          width: 100,
          margin: 1,
          color: { dark: "#000000", light: "#ffffff" }
        });
      } catch (err) { console.error(err); }
    }

    if (imgurl) {
      this.doc.addImage(imgurl, 'JPEG', 22, 65, 20, 20, undefined, 'FAST', 90);
    }

    this.doc.setFontSize(7);
    this.doc.text('Asset code: ' + asset.assetCode, 6, 60, { angle: 90 });
    this.doc.text('Description: ' + assetDesc, 9, 60, { angle: 90 });
    this.doc.setFontSize(6);
    this.doc.text(`${asset.modelName} | ${asset.manufacturerName} | ${asset.serialNo}`, 12, 60, { angle: 90 });
    this.doc.setFontSize(7);
    this.doc.text('Purchase: ' + asset.purchaseDtDisp, 15, 60, { angle: 90 });
    this.doc.text('Installation: ' + asset.installationDtDisp, 18, 60, { angle: 90 });
    if (this.dinaAlign === 11) {
      this.doc.text('Child Asset of: ' + asset.parentAssetCode, 21, 60, { angle: 90 });
    }
  }

  //////
  async generateBarcodeSheet(assetList: any[]) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = 210;
    const pageHeight = 297;
    const marginX = 10;
    const marginY = 10;
    const labelWidth = 90;
    const labelHeight = 40;
    const columns = 2;
    const rows = Math.floor((pageHeight - 2 * marginY) / labelHeight);
    const labelsPerPage = columns * rows;

    let currentX = marginX;
    let currentY = marginY;
    let labelCount = 0;

    for (let i = 0; i < assetList.length; i++) {
      const asset = assetList[i];
      const assetCode = asset.assetCode || 'NA';
      const description = (asset.description || '').substring(0, 20);

      const canvas = document.createElement("canvas");
      JsBarcode(canvas, assetCode, {
        format: "CODE128",
        displayValue: false,
        width: 1.5,
        height: 25,
        margin: 0
      });
      const imgData = canvas.toDataURL("image/png");

      doc.addImage(imgData, 'PNG', currentX + 5, currentY + 5, 60, 20);
      doc.setFontSize(8);
      doc.text(`Asset code: ${assetCode}`, currentX + 5, currentY + 30);
      doc.text(`Description: ${description}`, currentX + 5, currentY + 35);

      labelCount++;
      if (labelCount % columns === 0) {
        currentX = marginX;
        currentY += labelHeight;
      } else {
        currentX += labelWidth;
      }

      if (labelCount % labelsPerPage === 0 && i < assetList.length - 1) {
        doc.addPage();
        currentX = marginX;
        currentY = marginY;
      }
    }

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    printWindow?.addEventListener('load', () => {
      printWindow.focus();
      printWindow.print();
    });
    doc.save('barcode-labels-multi.pdf');
  }
  //////
  
  // WORKING BUT BARCODE ISSUE
  // async generateBarcodeSheet(assetList: any[]) {
  //   const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  //   const pageWidth = 210;
  //   const pageHeight = 297;
  //   const marginX = 10;
  //   const marginY = 10;
  //   const labelWidth = 90;
  //   const labelHeight = 40;
  //   const columns = 2;
  //   const rows = Math.floor((pageHeight - 2 * marginY) / labelHeight);
  //   const labelsPerPage = columns * rows;
  
  //   let currentX = marginX;
  //   let currentY = marginY;
  //   let labelCount = 0;
  
  //   for (let i = 0; i < assetList.length; i++) {
  //     const asset = assetList[i];
  //     const assetCode = asset.assetCode || 'NA';
  //     const description = (asset.description || '').substring(0, 20);
  
  //     // Create original barcode
  //     const canvas = document.createElement("canvas");
  //     JsBarcode(canvas, assetCode, {
  //       format: "CODE128",
  //       displayValue: false,
  //       width: 1.5,
  //       height: 25,
  //       margin: 0
  //     });
  
  //     // Rotate barcode 90 degrees using a temporary canvas
  //     const rotatedCanvas = document.createElement("canvas");
  //     rotatedCanvas.width = 20;  // New width after rotation
  //     rotatedCanvas.height = 60; // New height after rotation
  //     const ctx = rotatedCanvas.getContext("2d");
  
  //     ctx.translate(rotatedCanvas.width, 0); // Move origin to top-right
  //     ctx.rotate(Math.PI / 2);               // Rotate 90 degrees clockwise
  //     ctx.drawImage(canvas, 0, 0);           // Draw original barcode
  
  //     const rotatedImgData = rotatedCanvas.toDataURL("image/png");
  
  //     // Add rotated barcode to PDF
  //     doc.addImage(rotatedImgData, 'PNG', currentX + 5, currentY + 5, 20, 60);
  
  //     // Add text (not rotated)
  //     doc.setFontSize(8);
  //     doc.text(`Asset code: ${assetCode}`, currentX + 30, currentY + 15);
  //     doc.text(`Description: ${description}`, currentX + 30, currentY + 20);
  
  //     // Layout logic
  //     labelCount++;
  //     if (labelCount % columns === 0) {
  //       currentX = marginX;
  //       currentY += labelHeight;
  //     } else {
  //       currentX += labelWidth;
  //     }
  
  //     if (labelCount % labelsPerPage === 0 && i < assetList.length - 1) {
  //       doc.addPage();
  //       currentX = marginX;
  //       currentY = marginY;
  //     }
  //   }
  
  //   // Output the PDF
  //   const blob = doc.output("blob");
  //   const url = URL.createObjectURL(blob);
  //   const printWindow = window.open(url, '_blank');
  //   printWindow?.addEventListener('load', () => {
  //     printWindow.focus();
  //     printWindow.print();
  //   });
  
  //   doc.save('barcode-labels-multi.pdf');
  // }

  async generateQRCodeSheet(assetList: any[]) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  
    const pageWidth = 210;
    const pageHeight = 297;
    const marginX = 10;
    const marginY = 10;
    const labelWidth = 24;  // narrow width
    const labelHeight = 90; // tall height
  
    const columns = 2;
    const rows = Math.floor((pageHeight - 2 * marginY) / labelHeight);
    const labelsPerPage = columns * rows;
  
    let currentX = marginX;
    let currentY = marginY;
    let labelCount = 0;
  
    for (let i = 0; i < assetList.length; i++) {
      const asset = assetList[i];
      const assetDesc = (asset.description || '').substring(0, 22);
  
      let imgurl = '';
      const canvas = document.createElement("canvas");
  
      try {
        imgurl = await QRCode.toDataURL(canvas, asset.assetCode, {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          scale: 100,
          width: 100,
          margin: 1,
          color: { dark: "#000000", light: "#ffffff" }
        });
      } catch (err) {
        console.error(err);
      }
  
      // === Add padding inside label ===
      const paddingTop = 2;
      const paddingBottom = 2;
      const borderY = currentY + paddingTop;
      const borderHeight = labelHeight - (paddingTop + paddingBottom);
  
      // Draw label border with top/bottom gap
      doc.setDrawColor(200);
      doc.rect(currentX, borderY, labelWidth, borderHeight);
  
      // Adjusted baseY for QR & text
      const baseY = borderY;
  
      // Add rotated QR Code
      if (imgurl) {
        doc.addImage(imgurl, 'JPEG', currentX + 21, baseY + 60, 20, 20, undefined, 'FAST', 90);
      }
  
      // Add rotated text (90°)
      doc.setFontSize(7);
      doc.text('Asset code: ' + asset.assetCode, currentX + 6, baseY + 60, { angle: 90 });
      doc.text('Description: ' + assetDesc, currentX + 9, baseY + 60, { angle: 90 });
      doc.setFontSize(6);
      doc.text(`${asset.modelName} | ${asset.manufacturerName} | ${asset.serialNo}`, currentX + 12, baseY + 60, { angle: 90 });
      doc.setFontSize(7);
      doc.text('Purchase: ' + asset.purchaseDtDisp, currentX + 15, baseY + 60, { angle: 90 });
      doc.text('Installation: ' + asset.installationDtDisp, currentX + 18, baseY + 60, { angle: 90 });
      // doc.text('Child Asset of: ' + asset.parentAssetCode, currentX + 21, baseY + 60, { angle: 90 });
  
      // === Layout management ===
      labelCount++;
      if (labelCount % columns === 0) {
        currentX = marginX;
        currentY += labelHeight;
      } else {
        currentX += labelWidth + 5;
      }
  
      if (labelCount % labelsPerPage === 0 && i < assetList.length - 1) {
        doc.addPage();
        currentX = marginX;
        currentY = marginY;
      }
    }
  
    // Export and print
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    printWindow?.addEventListener('load', () => {
      printWindow.focus();
      printWindow.print();
    });
  
    doc.save('qrcode-labels-multi.pdf');
  }

  async createCard(i: number) {
    const asset = this.list[i - 1];
    const assetDesc = asset.description.length > 22 ? asset.description.substring(0, 22) + "..." : asset.description;
    this.textContent += `${asset.assetCode || "N/A"}|${asset.assetCategoryName}|${asset.description}|${asset.locationName}|${asset.purchaseDtDisp}|AC:${asset.assetCode}\n`;

    if (i === this.list.length) {
      const blob = new Blob([this.textContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "labels.txt";
      link.click();
      this.textContent = "";
    }
  }


//   


async DefaultPrintServiceRoom(
  roomNames: string[],
  copies: number,
  cuttingTool: boolean,
  fileExtension: string,
  type: 'QRCODE' | 'BARCODE',
  printerModel: string
) {
  if (type === 'QRCODE') {
    await this.generateRoomQRSheet(roomNames);
  } else {
    await this.generateRoomBarcodeSheet(roomNames);
  }
}

async generateRoomQRSheet(roomNames: string[]) {
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const marginX = 10;
  const marginY = 10;

  const labelWidth = 24;   // same as asset QR
  const labelHeight = 90;  // tall portrait label

  const pageWidth = 210;
  const pageHeight = 297;

  const columns = 2;
  const rows = Math.floor((pageHeight - 2 * marginY) / labelHeight);
  const labelsPerPage = columns * rows;

  let currentX = marginX;
  let currentY = marginY;
  let labelCount = 0;

  for (let room of roomNames) {
    const canvas = document.createElement("canvas");
    const qrImg = await QRCode.toDataURL(canvas, room, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      width: 100,
      scale: 100,
      margin: 1
    });

    // border inside gap
    const padTop = 2;
    const padBottom = 2;
    const borderY = currentY + padTop;
    const borderHeight = labelHeight - (padTop + padBottom);

    doc.setDrawColor(180);
    doc.rect(currentX, borderY, labelWidth, borderHeight);

    // QR rotated inside label
    doc.addImage(qrImg, 'JPEG', currentX + 21, borderY + 60, 20, 20, undefined, 'FAST', 90);

    doc.setFontSize(8);
    doc.text('Room: ' + room, currentX + 6, borderY + 60, { angle: 90 });

    // move layout
    labelCount++;
    if (labelCount % columns === 0) {
      currentX = marginX;
      currentY += labelHeight;
    } else {
      currentX += labelWidth + 5;
    }

    if (labelCount % labelsPerPage === 0 && roomNames.length > labelCount) {
      doc.addPage();
      currentX = marginX;
      currentY = marginY;
    }
  }

  doc.save('ROOM_QR_LABELS.pdf');
}

async generateRoomBarcodeSheet(roomNames: string[]) {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const marginX = 10;
  const marginY = 10;

  const labelWidth = 90;
  const labelHeight = 40;

  const pageWidth = 297;
  const pageHeight = 210;

  const columns = 3;
  const rows = Math.floor((pageHeight - 2 * marginY) / labelHeight);
  const labelsPerPage = columns * rows;

  let x = marginX;
  let y = marginY;
  let count = 0;

  const canvas = document.createElement('canvas');

  for (let room of roomNames) {

    JsBarcode(canvas, room, {
      format: "CODE128",
      displayValue: false,
      height: 30,
      width: 2,
      margin: 0
    });

    const barcodeImg = canvas.toDataURL("image/png");

    doc.addImage(barcodeImg, 'PNG', x + 5, y + 5, 60, 20);

    doc.setFontSize(10);
    doc.text(room, x + 35, y + 32, { align: 'center' });

    count++;

    if (count % columns === 0) {
      x = marginX;
      y += labelHeight;
    } else {
      x += labelWidth;
    }

    if (count % labelsPerPage === 0 && roomNames.length > count) {
      doc.addPage();
      x = marginX;
      y = marginY;
    }
  }

  doc.save('ROOM_BARCODE_LABELS.pdf');
}
}

// WORKING BUT NOT
// import { Injectable, OnInit } from '@angular/core';
// import { jsPDF } from "jspdf";
// import { CommonService } from '../common-service/common.service';

// import * as QRCode  from 'qrcode';
// import * as JsBarcode from 'jsbarcode';

// @Injectable({
//     providedIn: 'root'
//   })

//   export class DefaultPrinterService implements OnInit {

//     doc: any

//     pageWidth : any;
//     pageHeight : any;
//     y: any;
//     pageMargin : any;
//     list : any

//     cellMargin : any;
//     cellWidth : any;
//     cellHeight : any;

//     cuttingtool : any = '';
//     startX: number;
//     startY: number;
//     dinaAlign: number = 11;
//     defAlign: number=15;

//     constructor(private readonly commonService: CommonService) { }

//     ngOnInit(): void { 

//     }

//     async DefaultPrintService(assetList?: any,noOfLabels?: number, cutterTool?: any ,fileExtension? :any, pdfType? :any, printerModel? :any){      

//       this.cuttingtool = cutterTool;

//         this.doc = new jsPDF('p', 'pt', 'a4');

//         this.startX  = 10;
//         this.startY = 70;  

//         this.pageWidth = 595;
//         this.pageHeight = 842;
//         this.y=700;
//         this.pageMargin = 10;
//         this.list = [];

//         this.cellMargin = 5;
//         this.cellWidth = 300;
//         this.cellHeight = 90;


//         this.pageWidth -= this.pageMargin * 2;
//         this.pageHeight -= this.pageMargin * 2;

//       if(cutterTool !== ''){
//         this.dinaAlign = 15;
//         this.doc.addImage(cutterTool, 'png', this.startX + 15, this.startY  - 40, 25, 15);
//       }     


//         this.list = assetList;  

//         // for(let i = 0; i < this.list.length; i++){
//         //   if(!(fileExtension == 'PDF')){
//         //     await this.createCard(i+1);
//         //   } else{
//         //     await this.createCardPDF(i+1, pdfType);
//         //   }
//         // }

//         if (fileExtension !== 'PDF') {
//           for (let i = 0; i < this.list.length; i++) {
//             this.createCard(i + 1);
//           }
//         } else {
//           await this.createCardPDF(pdfType); // Now handles all assets in one go
//         }
        
                
//         this.doc.save('labels.pdf');

//     }

//     // async createCardPDF(i,pdfType) {  

//     //   if(pdfType == 'QRCODE'){
//     //     let imgurl;

//     //     let asset = this.list[i - 1];

//     //     console.log(this.list[i - 1])

//     //     let assetDesc = asset.description.length > 22 
//     //       ? asset.description.substring(0, 22) + '...' 
//     //       : asset.description;

//     //     // QR generation
//     //     const mycanvas = document.createElement("canvas");
//     //     mycanvas.id = "mycanvas";

//     //     if (asset.assetCode) {
//     //       await QRCode.toDataURL(mycanvas, asset.assetCode, {
//     //         errorCorrectionLevel: 'H',
//     //         type: 'image/jpeg',
//     //         scale: 100,
//     //         width: 100,
//     //         margin: 1,
//     //         color: {
//     //           dark: "#000000",
//     //           light: "#ffffff"
//     //         }
//     //       })
//     //         .then(url => {
//     //           imgurl = url;
//     //         })
//     //         .catch(err => {
//     //           console.error(err);
//     //         });
//     //     }

//     //     // Create vertical label: 90mm tall, 24mm wide
//     //     this.doc = new jsPDF({
//     //       orientation: 'portrait',
//     //       unit: 'mm',
//     //       format: [90, 24] // vertical label (90mm height x 24mm width)
//     //     });

//     //     // Rotate QR and text by 90° using the `angle` parameter

//     //     // QR Code (rotate 90°)
//     //     if (imgurl) {
//     //       const labelWidth = 24;
//     //       const qrWidth = 20;
//     //       const qrHeight = 20;

//     //       const x = 22; // Horizontally center
//     //       const y = 65; // Keep y as is, or adjust vertically if needed

//     //       this.doc.addImage(imgurl, 'JPEG', x, y, qrWidth, qrHeight, undefined, 'FAST', 90);
//     //     }

//     //     // Rotated text
//     //     this.doc.setFontSize(7);

//     //     // All the texts below are rotated individually
//     //     this.doc.text('Asset code: ' + asset.assetCode, 6, 60, { angle: 90 });
//     //     this.doc.text('Description: ' + assetDesc, 9, 60, { angle: 90 });
//     //     this.doc.setFontSize(6);
//     //     this.doc.text(asset.modelName + ' | ' + asset.manufacturerName + ' | ' + asset.serialNo, 12, 60, { angle: 90 });

//     //     this.doc.setFontSize(7);
//     //     this.doc.text('Purchase: ' + asset.purchaseDtDisp, 15, 60, { angle: 90 });
//     //     this.doc.text('Installation: ' + asset.installationDtDisp, 18, 60, { angle: 90 });

//     //     if (this.dinaAlign === 11) {
//     //       this.doc.text('Child Asset of: ' + asset.parentAssetCode, 21, 60, { angle: 90 });
//     //     }

//     //   }else{
//     //     await this.createCardBarCodePdf();
//     //   }

//     // }

//     // async createCardBarCodePdf(i) {
//     //   const asset = this.list[i - 1];
//     //   let imgurl = '';

//     //   let assetDesc = asset.description.length > 10 
//     //       ? asset.description.substring(0, 10) + '...' 
//     //       : asset.description;

//     //   // Create canvas
//     //   const mycanvas = document.createElement("canvas");
//     //   mycanvas.id = "barcodeCanvas";

//     //   if (asset.assetCode) {
//     //     // Generate barcode
//     //     JsBarcode(mycanvas, asset.assetCode, {
//     //       format: "CODE128",
//     //       displayValue: false,
//     //       width: 2,
//     //       height: 5,
//     //       margin: 2
//     //     });

//     //     // Convert to base64 image
//     //     imgurl = mycanvas.toDataURL("image/png");

//     //     const barcodeX = 10;
//     //     const barcodeY = 26;
//     //     const barcodeWidth = 35;
//     //     const barcodeHeight = 12;

//     //     this.doc.addImage(imgurl, 'PNG', barcodeX, barcodeY, barcodeWidth, barcodeHeight, undefined, 'FAST', 90);

//     //     this.doc.setFontSize(7);
//     //     this.doc.text('Asset code: ' + asset.assetCode, 10, 35, { angle: 90 });
//     //     this.doc.text('Description: ' + assetDesc, 13, 35, { angle: 90 });
//     //   }
//     // }


//     //////
//     async createCardPDF(pdfType: string) {
//       const doc = new jsPDF('p', 'mm', 'a4'); // Keep A4 portrait
    
//       const marginX = 10;
//       const marginY = 10;
//       const labelWidth = 90;
//       const labelHeight = 40;
//       const spaceX = 5;
//       const spaceY = 5;
    
//       let x = marginX;
//       let y = marginY;
    
//       const maxWidth = 210 - marginX;
//       const maxHeight = 297 - marginY;
    
//       for (let i = 0; i < this.list.length; i++) {
//         const asset = this.list[i];
//         const assetDesc = asset.description.length > 15 
//           ? asset.description.substring(0, 15) + '...'
//           : asset.description;
    
//         const canvas = document.createElement('canvas');
    
//         let imgurl = '';
    
//         if (pdfType === 'QRCODE') {
//           // Generate QR code
//           imgurl = await QRCode.toDataURL(asset.assetCode, {
//             errorCorrectionLevel: 'H',
//             type: 'image/jpeg',
//             width: 80,
//             margin: 1,
//             scale: 5
//           });
//         } else {
//           // Generate Barcode
//           JsBarcode(canvas, asset.assetCode, {
//             format: "CODE128",
//             displayValue: false,
//             width: 1.5,
//             height: 20,
//             margin: 0
//           });
//           imgurl = canvas.toDataURL("image/png");
//         }
    
//         // Draw border
//         doc.setDrawColor(200);
//         doc.rect(x, y, labelWidth, labelHeight);
    
//         // Add image
//         doc.addImage(imgurl, 'PNG', x + 5, y + 5, labelWidth - 10, 20);
    
//         // Add text
//         doc.setFontSize(7);
//         doc.text('Asset code: ' + asset.assetCode, x + 5, y + 30);
//         doc.text('Description: ' + assetDesc, x + 5, y + 35);
    
//         // Layout logic
//         x += labelWidth + spaceX;
//         if (x + labelWidth > maxWidth) {
//           x = marginX;
//           y += labelHeight + spaceY;
//         }
//         if (y + labelHeight > maxHeight) {
//           doc.addPage();
//           x = marginX;
//           y = marginY;
//         }
//       }
    
//       const pdfBlob = doc.output('blob');
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       const printWindow = window.open(pdfUrl, '_blank');
//       printWindow?.addEventListener('load', () => {
//         printWindow.focus();
//         printWindow.print();
//       });
    
//       doc.save('labels.pdf');
//     }
  
    

//     async createCardBarCodePdf() {
//       const doc = new jsPDF('p', 'mm', 'a4'); // A4 portrait
//       const marginX = 10;
//       const marginY = 10;
//       const labelWidth = 90;  // Width of each label
//       const labelHeight = 40; // Height of each label
//       const spaceX = 5;
//       const spaceY = 5;
    
//       let x = marginX;
//       let y = marginY;
    
//       const maxWidth = 210 - marginX;  // A4 width in mm
//       const maxHeight = 297 - marginY; // A4 height in mm
    
//       for (let i = 0; i < this.list.length; i++) {
//         const asset = this.list[i];
//         let assetDesc = asset.description.length > 15 
//           ? asset.description.substring(0, 15) + '...'
//           : asset.description;
    
//         const canvas = document.createElement('canvas');
//         JsBarcode(canvas, asset.assetCode, {
//           format: "CODE128",
//           displayValue: false,
//           width: 1.5,
//           height: 20,
//           margin: 0
//         });
//         const imgurl = canvas.toDataURL("image/png");
    
//         // Draw label box (optional)
//         doc.setDrawColor(200);
//         doc.rect(x, y, labelWidth, labelHeight);
    
//         // Add barcode
//         doc.addImage(imgurl, 'PNG', x + 5, y + 5, labelWidth - 10, 20);
    
//         // Add text
//         doc.setFontSize(7);
//         doc.text('Asset code: ' + asset.assetCode, x + 5, y + 30);
//         doc.text('Description: ' + assetDesc, x + 5, y + 35);
    
//         // Update X/Y for next label
//         x += labelWidth + spaceX;
    
//         // Move to next row after 2 columns
//         if (x + labelWidth > maxWidth) {
//           x = marginX;
//           y += labelHeight + spaceY;
//         }
    
//         // New page if height exceeded
//         if (y + labelHeight > maxHeight) {
//           doc.addPage();
//           x = marginX;
//           y = marginY;
//         }
//       }
    
//       const pdfBlob = doc.output('blob');
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       const printWindow = window.open(pdfUrl, '_blank');
//       printWindow?.addEventListener('load', () => {
//         printWindow.focus();
//         printWindow.print();
//       });
    
//       doc.save('barcode-labels.pdf');
//     }
    
    

//     textContent: string = ""; 

//     async createCard(i: number) {
//       let assetDesc =
//           this.list[i - 1].description.length > 22
//               ? this.list[i - 1].description.substring(0, 22) + "..."
//               : this.list[i - 1].description;
//       this.textContent += 
//           `${this.list[i - 1].assetCode || "N/A"}|` +
//           `${this.list[i - 1].assetCategoryName}|` +
//           `${this.list[i - 1].description}|`+
//           `${this.list[i - 1].locationName}|`+
//           `${this.list[i-1].purchaseDtDisp}|`+
//           `AC:${this.list[i - 1].assetCode}\n`;
//       if (i === this.list.length) {
//           const blob = new Blob([this.textContent], { type: "text/plain" });
//           const link = document.createElement("a");
//           link.href = URL.createObjectURL(blob);
//           link.download = "labels.txt";
//           link.click();

//           this.textContent = ""; 
//           this.startX = 10;
//           this.startY = 70;
//           this.pageWidth = 595;
//           this.pageHeight = 842;
//           this.y = 700;
//           this.pageMargin = 10;
//           this.list = [];
//           this.cellMargin = 5;
//           this.cellWidth = 300;
//           this.cellHeight = 90;
//       }
//     }

//   }
