import { Injectable } from '@angular/core';
import { HttpQueryService } from '../../services/http-query.service';
import { Observable } from 'rxjs/Observable';
import { IAirlines } from '../../interface/IAirlines';
import { IcreateUser } from '../../interface/icreate-user';




@Injectable()
export class UsersService {


  constructor(private httpQuery: HttpQueryService) { }

  getAirlines(): Observable<IAirlines> {
    return this.httpQuery.get('web_auth/api/accounts/airlines');
  }

  createUser(params: IcreateUser): Observable<IAirlines> {
    return this.httpQuery.post('web_auth/api/accounts/', params);
  }

}
