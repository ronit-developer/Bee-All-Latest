import {Component, OnInit} from '@angular/core';
import {UserActions} from "./user/redux/user.actions";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService,
              private userActions: UserActions) {
    // Set the language to use
    translate.use('en');
  }

  title = 'BE ALL Exercise';

  ngOnInit() {
    // Set user details
    this.userActions.getUserInfo();
  }

  onDeactivate() {
    //scroll to top on route change
    window.scrollTo(0, 0);
  }
}
