import { NgModule } from '@angular/core';

import { MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule} from '@angular/material/select';
import { MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule} from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner'; 
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {MatGridListModule} from '@angular/material/grid-list';
import { MomentModule } from 'ngx-moment'; 
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatSortModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatExpansionModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    NgSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    TranslateModule.forChild(),
    ToastrModule.forRoot({ 
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true,
      enableHtml: true
      }),
      MatDividerModule,
      NgxSpinnerModule,
      NgxEchartsModule.forRoot({
        echarts,
      }),
      MatGridListModule,
      ColorPickerModule,
      MatAutocompleteModule,
      FlexLayoutModule,
      MatListModule,
      MatPasswordStrengthModule.forRoot() ,
      MomentModule,
      NgIdleKeepaliveModule.forRoot() 
  ],
  exports: [
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatSortModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatExpansionModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    NgSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    TranslateModule,
    ToastrModule,
    MatDividerModule,
    NgxSpinnerModule,
    NgxEchartsModule,
    MatGridListModule,
    ColorPickerModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatListModule,
    MatPasswordStrengthModule ,
    MomentModule,
    NgIdleKeepaliveModule,
  ]
})
export class MaterialModule {}