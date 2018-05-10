import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
} )
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private localStorage: LocalStorage,
  ) { }

  ngOnInit() {
    this.localStorage.getItem( 'token' ).subscribe( value => {
      if ( value ) this.router.navigate( [ 'sadmin/admin/users' ] );
      else this.router.navigate( [ 'sadmin' ] );
    } );
  }

}
