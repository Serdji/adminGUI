import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Iairlines } from '../../interface/iairlines';
import { takeWhile } from 'rxjs/operators';

@Component( {
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: [ './company.component.styl' ],
} )
export class CompanyComponent implements OnInit, OnDestroy {

  public airlines: any;
  public isLoader: boolean = true;

  private isActive: boolean = true;

  constructor( private companyService: CompanyService ) { }

  ngOnInit() {
    this.initAirline();
  }

  initAirline() {
    this.companyService.getAirlines()
      .pipe( takeWhile( () => this.isActive ) )
      .subscribe( ( airlines: Iairlines ) => {
        this.airlines = airlines.Data.Airlines;
        this.isLoader = false;
      } );
  }

  ngOnDestroy() {
    this.isActive = false;
  }

}
