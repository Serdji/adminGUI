import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { timer } from 'rxjs/observable/timer';
import { ActivityUserService } from '../../services/activity-user.service';

@Component( {
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.styl' ],
} )
export class AdminComponent implements OnInit {

  @ViewChild( 'sidenav' ) sidenav: MatSidenav;


  constructor(
    private router: Router,
    private activityUser: ActivityUserService
  ) { }

  ngOnInit() {
    this.timeoutCloseNav();
    this.activityUser.idleLogout();
  }

  sidenavToggle(): void {
    this.sidenav.toggle();
  }

  goOut(): void {
    this.activityUser.logout();
  }



  private timeoutCloseNav() {
    timer( this.getSeconds( 3 ) ).subscribe( _ => this.sidenav.close() );
  }

  private getSeconds( sec: number ): number {
    return sec * 1000;
  }


}
