import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
import { IToken } from '../interface/IToken';
import { CRM_API } from '../../assets/constants';
import { Observable } from 'rxjs/Observable';
import { log } from 'util';

@Injectable()
export class HttpQueryService {

  private headers: HttpHeaders;
  private subjectGetQuery = new Subject();
  private subjectPostQuery = new Subject();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
    private auth: AuthService,
  ) { }

  get( url: string ): Observable<any> {
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

  post(url: string, params: any): Observable<any> {
    this.localStorage.getItem( 'token' ).subscribe( ( token: IToken ) => {
      this.headers = new HttpHeaders().set( 'Authorization', `Bearer ${token.access_token}` );
      this.http.post( CRM_API + url, params, { headers: this.headers } )
        .subscribe(
          value => this.subjectPostQuery.next( value ),
          error => {
            if ( error.status === 401 ) {
              this.localStorage.getItem( 'user' ).subscribe( user => {
                this.auth.setToken( user ).subscribe( ( newToken: IToken ) => {
                  this.localStorage.setItem( 'token', newToken ).subscribe();
                  this.headers = new HttpHeaders().set( 'Authorization', `Bearer ${newToken.access_token}` );
                  this.http.post( CRM_API + url, params, { headers: this.headers } ).subscribe( data => this.subjectPostQuery.next( data ) );
                } );
              } );
            }
          },
        );
    } );
    return this.subjectPostQuery;
  }
}
