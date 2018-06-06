import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IcreateUser } from '../../interface/icreate-user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {

  constructor( private httpQuery: HttpClient ) { }

  getAirlines(): Observable<any> {
    return this.httpQuery.get( environment.crmApi + '/web_auth/api/accounts/airlines' );
  }

  createUser( params: IcreateUser ): Observable<any> {
    return this.httpQuery.post( environment.crmApi + '/web_auth/api/accounts/', params );
  }

}
