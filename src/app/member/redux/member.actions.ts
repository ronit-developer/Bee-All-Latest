import {Injectable} from "@angular/core";
import {dispatch, NgRedux} from "@angular-redux/store";
import {IMember} from "../member.interface";
import {MemberService} from "../services/member.service";


@Injectable()
export class MemberActions {
  static GET_MEMBER = "GET_MEMBER";
  static SAVE_MEMBER = "SAVE_MEMBER";
  static SET_MEMBER_PENDING = "SET_MEMBER_PENDING";

  constructor(private memberService: MemberService) {
  }

  @dispatch() storeGetMember = (member: IMember) => ({type: MemberActions.GET_MEMBER, payload: member});
  @dispatch() storeSaveMember = (member: IMember) => ({type: MemberActions.SAVE_MEMBER, payload: member});
  @dispatch() storeSetPending = (flag: boolean) => ({type: MemberActions.SET_MEMBER_PENDING, payload: flag});

  getProfile(params) {
    this.storeSetPending(true);
    this.memberService.getMember(params).subscribe((member: IMember) => {
      this.storeGetMember(member);
    }, (err) => {
      // Error handling
    })
  }

  saveProfile(userId, profile) {
    this.memberService.saveMember(userId, profile).subscribe((member: IMember) => {
      this.storeSaveMember(member);
    }, (err) => {
      // Error handling
    })
  }
}
