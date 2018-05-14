import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule( {
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
  ],
} )
export class MaterialModule {
}
