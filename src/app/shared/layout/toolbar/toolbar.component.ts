import { Component, OnInit } from '@angular/core';
import { ActivityUserService } from '../../../services/activity-user.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private activityUser: ActivityUserService,
    private layoutService: LayoutService,
    ) { }

  ngOnInit(): void {}

  goOut(): void {
    this.activityUser.logout();
  }

  sidenavToggle(): void {
    this.layoutService.toggle();
  }

}
