import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { takeWhile } from 'rxjs/operators';
import { IAirlines } from '../../interface/IAirlines'

@Component( {
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.styl' ],
} )
export class UsersComponent implements OnInit, OnDestroy {

  private formUser: FormGroup;
  private isActive: boolean = true;
  public airlines: any;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.initAirline();
  }

  initAirline() {
    this.usersService.getAirlines()
      .pipe( takeWhile( () => this.isActive) )
      .subscribe( (airlines: IAirlines) => {
        this.airlines = airlines.Data.Airlines;
        console.log(this.airlines);
      } );
  }

  initForm() {
    this.formUser = this.fb.group( {
      UserName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      Password: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
      // confirmation: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
      Email: [ '', [ Validators.required ] ],
      FirstName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      LastName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      AirlineCode: [ '', [ Validators.required ] ],
    }, {
      updateOn: 'submit',
    } );
  }

  sendForm(): void {
    console.log( this.formUser.getRawValue() );
    this.usersService.createUser(this.formUser.getRawValue());
  }

  clearForm(): void {
    this.formUser.reset();
  }

  ngOnDestroy() {
    this.isActive = false;
  }

}
