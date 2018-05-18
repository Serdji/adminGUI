import { Injectable } from '@angular/core';
import { HttpQueryService } from '../../services/http-query.service'
import { Iairlines } from '../../interface/iairlines';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {

  constructor(private httpQuery: HttpQueryService) { }

  getAirlines(): Observable<Iairlines> {
    return this.httpQuery.get( 'web_auth/api/accounts/airlines' );
  }

}
