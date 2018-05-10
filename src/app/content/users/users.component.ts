import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { takeWhile } from 'rxjs/operators';
import { Iairlines } from '../../interface/iairlines';
import { emailValidator } from  '../../validators/emailValidator';
import { IcreateUser } from '../../interface/icreate-user';

@Component( {
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.styl' ],
} )
export class UsersComponent implements OnInit, OnDestroy {

  private formUser: FormGroup;
  private isActive: boolean = true;
  private user: IcreateUser;
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
      .subscribe( (airlines: Iairlines) => {
        this.airlines = airlines.Data.Airlines;
        console.log(this.airlines);
      } );
  }

  initForm() {
    this.formUser = this.fb.group( {
      UserName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      Password: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
      confirmation: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
      Email: [ '', [ Validators.required, emailValidator ] ],
      FirstName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      LastName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      AirlineCode: [ '', [ Validators.required ] ],
    }, {
      updateOn: 'submit',
    } );
  }

  sendForm(): void {

    if (!this.formUser.invalid) {
      this.user = {
        AirlineCode: this.formUser.get('AirlineCode').value,
        Email: this.formUser.get('Email').value,
        FirstName: this.formUser.get('FirstName').value,
        LastName: this.formUser.get('LastName').value,
        Password: this.formUser.get('Password').value,
        UserName: this.formUser.get('UserName').value,
      };
      this.usersService.createUser(this.user);
    }
  }

  clearForm(): void {
    this.formUser.reset();
  }

  ngOnDestroy() {
    this.isActive = false;
  }

}
