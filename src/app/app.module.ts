import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './page/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { AdminComponent } from './page/admin/admin.component';
import { UsersComponent } from './content/users/users.component';
import { UsersService } from './content/users/users.service';
import { AuthGuard } from './auth.guard';
import { ActivityUserService } from './services/activity-user.service';
import { HttpQueryService } from './services/http-query.service';

@NgModule( {
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    LocalStorageModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UsersService,
    ActivityUserService,
    HttpQueryService
  ],
  bootstrap: [ AppComponent ],
} )
export class AppModule {
}
