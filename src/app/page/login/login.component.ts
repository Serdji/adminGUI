import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AIRLINE_CODE } from '../../../assets/constants';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.styl' ],
} )
export class LoginComponent implements OnInit, OnDestroy {

  public  airlineCode: string = AIRLINE_CODE;
  private formLogin: FormGroup;
  private isActive: boolean = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private localStorage: LocalStorage,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.formLogin = this.fb.group( {
      username: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required ] ],
    }, {
      updateOn: 'submit',
    } );
  }

  sendForm(): void {
    this.auth.setToken( this.formLogin.getRawValue() )
      .pipe(takeWhile( () => this.isActive ))
      .subscribe( ( value ) => {
        this.localStorage.setItem( 'user', this.formLogin.getRawValue() ).subscribe();
        this.localStorage.setItem( 'token', value ).subscribe( () => this.router.navigate( [ 'sadmin/admin/users' ] ) );
      } );
  }

  ngOnDestroy() {
    this.isActive = false;
  }
}
