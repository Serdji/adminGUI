import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityUserService } from '../../../services/activity-user.service';
import { timer } from 'rxjs/observable/timer';
import { IMenuLink } from '../../../interface/imenu-link';
import { MatSidenav } from '@angular/material/sidenav';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.styl']
})
export class SidenavComponent implements OnInit {

  @ViewChild( 'sidenav' ) sidenav: MatSidenav;

  public links: IMenuLink[] = [
    { url: '/admin/users', title: 'Добавить пользователя' },
    { url: '/admin/usersearch', title: 'Поиск пользователей' },
    { url: '/admin/company', title: 'Настройки' },
  ];

  constructor(
    private activityUser: ActivityUserService,
    private layoutService: LayoutService
    ) { }

  ngOnInit(): void {
    this.timeoutCloseNav();
    this.activityUser.idleLogout();
    this.layoutService.subjectToggle.subscribe( _ => this.sidenav.toggle() );
  }

  private timeoutCloseNav() {
    timer( this.getSeconds( 3 ) ).subscribe( _ => this.sidenav.close() );
  }

  private getSeconds( sec: number ): number {
    return sec * 1000;
  }




}
