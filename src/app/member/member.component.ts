import {Component, OnDestroy, OnInit} from '@angular/core';
import {select} from "@angular-redux/store";
import {Observable} from "rxjs/Observable";
import {IUser} from "../user/user.interface";
import {Subject} from "rxjs/Subject";
import {memberStoreInit} from "./redux/member.reducer";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MemberActions} from "./redux/member.actions";
import {IMember} from "./member.interface";
import {NAV_CONST} from "../shared/constants/navigation";
import {IUserStore} from "../user/redux/user.reducer";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit, OnDestroy {
  @select() user$: Observable<IUserStore>;
  @select(['member', 'data']) readonly member$: Observable<IMember>;
  @select(['member', 'pending']) readonly pending$: Observable<boolean>;
  @select(['member', 'error']) readonly error$: Observable<string>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public member: IMember;
  private tempMember: IMember;
  private profileId: number;
  public isSelf: boolean = false;
  public isEditTitle: boolean = false;
  public isEditingAboutMe: boolean = false;
  public companyUrl: string = '';
  public user: IUser;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private memberActions: MemberActions) {
  }

  ngOnInit() {
    this.member = memberStoreInit.data;
    // Getting data from url
    this.route.params.takeUntil(this.ngUnsubscribe).subscribe((params: any) => {
      this.profileId = parseInt(params.id);

      // Get user from store and check isSelf
      this.user$.takeUntil(this.ngUnsubscribe).subscribe((user: IUserStore) => {
        this.user = Object.assign({}, user.data);
        this.isSelf = this.profileId === this.user.memberId;
      });

      // Load profile to store
      this.memberActions.getProfile(this.profileId);
    });

    this.member$.takeUntil(this.ngUnsubscribe).subscribe((member: IMember) => {
      if (member.id) {
        this.member = Object.assign({}, member);
        this.tempMember = Object.assign({}, member);
        this.companyUrl = `/${NAV_CONST.company}/${this.member.company.id}`;
      }
    })
  }

  ngOnDestroy() {
    // Complete subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  saveTitle() {
    if (this.member.title !== this.tempMember.title) {
      let member = Object.assign({}, {title: this.member.title});
      this.tempMember = Object.assign({}, this.member);
      this.memberActions.saveProfile(this.profileId, member);
    }
    this.isEditTitle = false;
  }

  cancelEditTitle() {
    this.member = Object.assign({}, this.tempMember);
    this.isEditTitle = false;
  }

  setTitleState() {
    this.isEditTitle = !this.isEditTitle;
  }

  saveAboutMe() {
    if (this.member.aboutMe !== this.tempMember.aboutMe) {
      this.memberActions.saveProfile(this.profileId, {about_me: this.member.aboutMe});
      this.tempMember = Object.assign({}, this.member);
    }
    this.isEditingAboutMe = false;
  }

  cancelEditAboutMe() {
    this.isEditingAboutMe = false;
    this.member = Object.assign({}, this.tempMember)
  }

  setAboutMeState() {
    this.isEditingAboutMe = !this.isEditingAboutMe;
  }
}
