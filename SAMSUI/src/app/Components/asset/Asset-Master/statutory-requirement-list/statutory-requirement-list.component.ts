import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { CertificationAuthorityModel } from 'src/app/Model/master/certification-authority';
import { CertificateModel } from 'src/app/Model/master/certificates';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { StatutoryRequirementCreateComponent } from '../statutory-requirement-create/statutory-requirement-create.component';
import { CertificatesCreateComponent } from '../certificates-create/certificates-create.component';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Component({
  selector: 'app-statutory-requirement-list',
  templateUrl: './statutory-requirement-list.component.html',
  styleUrls: ['./statutory-requirement-list.component.css']
})
export class StatutoryRequirementListComponent implements OnInit {
  displayedColumns = ['select', 'sno', 'certificationAuthorityName', 'issuingAuthority', 'updatedBy', 'updatedDt'];
  listOfStatutoryReq = new MatTableDataSource<StatutoryRequirementListComponent>();

  displayedColumnsForCertificates = ['select', 'sno', 'certificateName', 'certificationAuthorityName', 'renewalRequired', 'active', 'updatedBy', 'updatedDt'];
  listOfCertificates = new MatTableDataSource<StatutoryRequirementListComponent>();

  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;

  subLoaderAssetType: boolean = false;
  subLoaderCertificate: boolean = false;

  pageIndex: String;
  length: String = '0';
  lengthOfCertificate: String = '0';
  pageSize: String;

  modelAccessModule: ModuleAccessModel;
  certificationAuthorityModel: CertificationAuthorityModel;
  certificateModel: CertificateModel;
  selectedItem: any=0;
  selectedItem1: any=0;

  constructor(private dialog: MatDialog,
    private readonly userSession: UserSessionService,
    private commonService: CommonService,
    private assetOptimaServices:AssetOptimaServices) {
    this.modelAccessModule = new ModuleAccessModel();
    this.certificationAuthorityModel = new CertificationAuthorityModel();
    this.certificateModel = new CertificateModel();
    this.pageSize = '100';
    this.pageIndex = '0';
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_STATUTORY_REQUIREMENT'];
    this.pageIndex = '0';
    this.pageSize = '100';
    this.certificationAuthorityModel.columnName = 'certificationAuthorityName';
    this.certificationAuthorityModel.direction = 'asc';
    this.certificateModel.columnName = 'certificateName';
    this.certificateModel.direction = 'asc';
    this.fetchList();
    this.fetchListOfCertificates();
  }

  statutoryReqDialog;
  createOrEditStatutoryRequirement(element, mode) {
    this.statutoryReqDialog = this.dialog.open(StatutoryRequirementCreateComponent, {
      height: 'auto',
      width: '600px',
      data: {
        'certificationAuthorityModel': element,
        'mode': mode
      }
    });
    this.statutoryReqDialog.disableClose = true;
    this.statutoryReqDialog.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  fetchList(){
    this.subLoaderAssetType = true;
    this.listOfStatutoryReq = null;
    this.certificationAuthorityModel.pageNumber = Number(this.pageIndex);
    this.certificationAuthorityModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfCertificationAuthority,this.certificationAuthorityModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.listOfStatutoryReq = data.responseData.dataList;
           this.subLoaderAssetType = false;
        }else{
          this.subLoaderAssetType = false;
        }
      }
    );

   }

   getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
    }

    getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
    }

    customSort(event) {
    this.certificationAuthorityModel.pageNumber = 0;
    this.certificationAuthorityModel.columnName = event.active;
    this.certificationAuthorityModel.direction = event.direction;
    this.fetchList();
    }

    customSortForCertificates(event) {
      this.certificateModel.pageNumber = 0;
      this.certificateModel.columnName = event.active;
      this.certificateModel.direction = event.direction;
      this.fetchListOfCertificates();
      }

    onSearchChange(searchValue : string ) {
      this.certificationAuthorityModel.certificationAuthorityName = searchValue;
      this.pageSize= '100';
      this.pageIndex='0';
      this.fetchList();
    }

    onSearchChangeForCertificates(searchValue : string ) {
      this.certificateModel.certificateName = searchValue;
      this.pageSize= '100';
      this.pageIndex='0';
      this.fetchListOfCertificates();
    }

    certificateDialog;
    createOrEditCertificate(element, mode) {
      this.certificateDialog = this.dialog.open(CertificatesCreateComponent, {
        height: 'auto',
        width: '600px',
        data: {
          'certificateModel': element,
          'mode': mode
        }
      });
      this.certificateDialog.disableClose = true;
      this.certificateDialog.afterClosed().subscribe(
        data => {
          this.ngOnInit();
        });
    }

    getServerDataForCertificates(event) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.fetchListOfCertificates();
    }

    fetchListOfCertificates(){
      this.subLoaderCertificate = true;
      this.listOfCertificates = null;
      this.certificateModel.pageNumber = Number(this.pageIndex);
      this.certificateModel.recordsPerPage = Number(this.pageSize);
      this.commonService.commonListService(this.assetOptimaServices.fetchListOfCertificate,this.certificateModel).subscribe(
        data => {
          if(data.success){
             this.lengthOfCertificate = data.responseData.dataTotalRecCount;
             this.listOfCertificates = data.responseData.dataList;
             this.subLoaderCertificate = false;
          }else{
            this.subLoaderCertificate = false;
          }
        }
      );

     }

     selectStatutoryRequirement(element){
      if(this.selectedItem.certificationAuthorityId == element.certificationAuthorityId){
        this.selectedItem = 0;
      }
      else{
        this.selectedItem = element;
      }
    }

    selectCertificate(element){
      if(this.selectedItem1.certificateId == element.certificateId){
        this.selectedItem1 = 0;
      }
      else{
        this.selectedItem1 = element;
      }
    }
}
