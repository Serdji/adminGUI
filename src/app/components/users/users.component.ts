import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { takeWhile } from 'rxjs/operators';
import { Iairlines } from '../../interface/iairlines';
import { emailValidator } from '../../validators/emailValidator';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { timer } from 'rxjs/observable/timer';

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
    private dialog: MatDialog,
  ) {}

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
    this.formUser = this.fb.group( {
      UserName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      Password: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
      Email: [ '', [ Validators.required, emailValidator ] ],
      FirstName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      LastName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      AirlineCode: [ '', [ Validators.required ] ],
    }, {
      updateOn: 'submit',
    } );
  }

  resetForm() {
    this.formUser.reset();
    for ( const formControlName in this.formUser.value ) {
      this.formUser.get( `${ formControlName }` ).setErrors( null );
    }
  }

  sendForm(): void {

    if ( !this.formUser.invalid ) {
      this.usersService.createUser( this.formUser.getRawValue() )
        .subscribe(
          ( value: any ) => {
            if ( value.error ) {
              this.dialog.open( DialogComponent, {
                data: {
                  message: value.error.Data.ErrorMsg,
                  status: 'error',
                },
              } );
            } else {
              this.dialog.open( DialogComponent, {
                data: {
                  message: 'Пользователь успешно добавлен',
                  status: 'ok',
                },
              } );
              this.resetForm();
            }
            timer( 1500 ).subscribe( () => this.dialog.closeAll() );
          },
        );
    }
  }

  clearForm(): void {
    this.resetForm();
  }

  ngOnDestroy() {
    this.isActive = false;
  }

}
