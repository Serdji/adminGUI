import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { timer } from 'rxjs/observable/timer';

@Component( {
  selector: 'app-tablet-example',
  templateUrl: './tablet-example.component.html',
  styleUrls: [ './tablet-example.component.styl' ],
} )
export class TabletExampleComponent implements OnInit {

  public displayedColumns: string[] = [];
  public dataSource: MatTableDataSource<any>;

  @Input() public tableHeader: string[];
  @Input() private tableDataSource: any;

  @ViewChild( MatSort ) sort: MatSort;
  @ViewChild( MatPaginator ) paginator: MatPaginator;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.initDisplayedColumns();
    this.initDataSource();
  }

  initDisplayedColumns() {
    for ( const header of this.tableHeader ) {
      this.displayedColumns.push( header[ 0 ] );
    }
  }

  initDataSource () {
    this.dataSource = new MatTableDataSource( this.tableDataSource );
    timer( 1 ).subscribe( () => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } );
  }

  openText(event): void {
    const text = event.target.innerText;
    this.dialog.open( DialogComponent, {
      data: {
        message: text,
        status: 'text',
      },
    } );

  }

}
