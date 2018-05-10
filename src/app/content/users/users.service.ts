import { Injectable } from '@angular/core';
import { HttpQueryService } from '../../services/http-query.service';


@Injectable()
export class UsersService {


  constructor(private httpQure: HttpQueryService) { }

  getAirlines() {
    return this.httpQure.get('web_auth/api/accounts/airlines');
  }

}
