import { Injectable } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class ActivityUserService {

  private isActive: boolean = true;

  constructor(
    private router: Router,
    private localStorage: LocalStorage,
  ) { }

  logout() {
    this.localStorage.clear().subscribe();
    this.router.navigate( [ 'sadmin' ] );
  }

  idleLogout() {
    let t;
    const resetTimer = () => {
      clearTimeout( t );
      t = setTimeout( () => { this.logout(); }, this.getMinutes( 15 ) );  // time is in milliseconds
    };

    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses
    window.onclick = resetTimer;     // catches touchpad clicks
    window.onscroll = resetTimer;    // catches scrolling with arrow keys
    window.onkeypress = resetTimer;
  }


  private getMinutes( min: number ): number {
    return min * ( 60 * 1000 );
  }

}
