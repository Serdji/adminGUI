import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
import { IToken } from '../interface/IToken';
import { CRM_API } from '../../assets/constants';

@Injectable()
export class HttpQueryService {

  private headers: HttpHeaders;
  private subjectGetQuery = new Subject();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
    private auth: AuthService,
  ) { }

  get( url ) {
    this.localStorage.getItem( 'token' ).subscribe( ( token: IToken ) => {
      this.headers = new HttpHeaders().set( 'Authorization', `Bearer ${token.access_token}` );
      this.http.get( CRM_API + url, { headers: this.headers } )
        .subscribe(
          value => this.subjectGetQuery.next( value ),
          error => {
            if ( error.status === 401 ) {
              this.localStorage.getItem( 'user' ).subscribe( user => {
                this.auth.setToken( user ).subscribe( ( newToken: IToken ) => {
                  this.localStorage.setItem( 'token', newToken ).subscribe();
                  this.headers = new HttpHeaders().set( 'Authorization', `Bearer ${newToken.access_token}` );
                  this.http.get( CRM_API + url, { headers: this.headers } ).subscribe( data => this.subjectGetQuery.next( data ) );
                } );
              } );
            }
          },
        );
    } );
    return this.subjectGetQuery;
  }

}
