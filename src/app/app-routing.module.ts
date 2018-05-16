import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './page/admin/admin.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth.guard'
import { UsersSearchComponent } from './components/users-search/users-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/sadmin', pathMatch: 'full' },
  { path: 'sadmin', component: LoginComponent },
  {
    path: 'sadmin/admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'usersearch', component: UsersSearchComponent },
    ]
  },
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ],
} )
export class AppRoutingModule {}
