import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { takeWhile } from 'rxjs/operators';
import { Iairlines } from '../../interface/iairlines';
import { IuserSearch } from '../../interface/iuser-search';
import { UsersSearchService } from './users-search.service';


@Component( {
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: [ './users-search.component.styl' ],
} )
export class UsersSearchComponent implements OnInit, OnDestroy {

  public users;
  public airlines: any;

  private formUserSearch: FormGroup;
  private isActive: boolean = true;



  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private usersSearchService: UsersSearchService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.initAirline();
  }

  initAirline() {
    this.usersService.getAirlines()
      .pipe( takeWhile( () => this.isActive ) )
      .subscribe( ( airlines: Iairlines ) => {
        this.airlines = airlines.Data.Airlines;
      } );
  }

  initForm() {
    this.formUserSearch = this.fb.group( {
      UserName: [ '', [ Validators.minLength( 3 ) ] ],
      FirstName: [ '', [ Validators.minLength( 3 ) ] ],
      LastName: [ '', [ Validators.minLength( 3 ) ] ],
      Email: [ '', [] ],
      AirlineCode: [ '', [ Validators.required ] ],
    }, {
      updateOn: 'submit',
    } );
  }

  resetForm() {
    this.formUserSearch.reset();
    for ( const formControlName in this.formUserSearch.value ) {
      this.formUserSearch.get( `${ formControlName }` ).setErrors( null );
    }
  }

  sendForm(): void {
    if ( !this.formUserSearch.invalid ) {
      let params = '?';
      for ( const key in this.formUserSearch.value ) {
        if ( this.formUserSearch.get( `${key}` ).value !== '' ) {
          params += `${key}=${this.formUserSearch.get( key ).value}&`;
        }
      }

      this.usersSearchService.getUserSearch( params )
        .pipe( takeWhile( () => this.isActive ) )
        .subscribe( ( value: IuserSearch ) => {
          this.users = value.Data.Users;
        } );
    }
  }

  clearForm(): void {
    this.resetForm();
  }

  ngOnDestroy() {
    this.isActive = false;
  }

}
