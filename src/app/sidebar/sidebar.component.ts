import {Component, DoCheck} from "@angular/core";
import {select} from "@angular-redux/store";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Rx";
import {NAV_CONST} from "../shared/constants/navigation";
import {IUser} from "../user/user.interface";
import {IUserStore} from "../user/redux/user.reducer";

@Component({
  selector: 'ba-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements DoCheck {
  @select() user$: Observable<IUserStore>;
  private user: IUser;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public profileUrl: string;
  public companyUrl: string;
  public directoryUrl: string;
  public directoryActive: boolean = false;
  public profileActive: boolean = false;
  public companyActive: boolean = false;

  constructor(private router: Router) {
    // Set sidebar urls
    this.directoryUrl = `/${NAV_CONST.directory}`;
  }

  ngOnInit() {
    this.user$.takeUntil(this.ngUnsubscribe).subscribe((user: IUserStore) => {
      if (user.data.memberId) {
        this.user = user.data;
        // Set url for myProfile & myCompany adding ids to url
        this.profileUrl = `${NAV_CONST.member}/${this.user.memberId}`;
        this.companyUrl = `${NAV_CONST.company}/${this.user.companyId}`;
      }
    });
  }

  ngOnDestroy() {
    // Complete subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngDoCheck() {
    let url = this.router.url.split('/');
    let baseUrl = url[1];

    if (baseUrl) {
      // Decide which section of the sidebar is the "active" section - and marked as blue
      switch (baseUrl) {
        case NAV_CONST.directory:
          this.setDirectoryActive();
          break;
        case NAV_CONST.member:
          (url[2] === this.user.memberId.toString())
            ? this.setProfileActive()
            : this.setDirectoryActive();
          break;
        case NAV_CONST.company:
          (url[2] === this.user.companyId.toString())
            ? this.setCompanyActive()
            : this.setDirectoryActive();
          break;
      }
    }
  }

  private setDirectoryActive() {
    this.directoryActive = true;
    this.profileActive = this.companyActive = false;
  }

  private setProfileActive() {
    this.profileActive = true;
    this.directoryActive = this.companyActive = false;
  }

  private setCompanyActive() {
    this.companyActive = true;
    this.directoryActive = this.profileActive = false;
  }
}
