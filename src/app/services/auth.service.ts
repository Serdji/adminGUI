import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CRM_API, AIRLINE_CODE } from '../../assets/constants';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
  ) { }

  setToken( params ) {
    const options = {
      headers: new HttpHeaders().set( 'AirlineCode', AIRLINE_CODE ),
      params: new HttpParams()
        .set( 'username', params.username )
        .set( 'password', params.password )
        .set( 'grant_type', 'password' ),
    };
    return this.http.post( CRM_API + 'web_auth/oauth/token', options.params, { headers: options.headers } );
  }
}
