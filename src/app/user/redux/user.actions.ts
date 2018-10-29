import {Injectable} from "@angular/core";
import {dispatch} from "@angular-redux/store";
import {IUser} from "../user.interface";
import {environment} from "../../../environments/environment";


@Injectable()
export class UserActions {
  static GET_USER = "GET_USER";

  constructor() {
  }

  @dispatch() storeGetUser = (user: IUser) => ({type: UserActions.GET_USER, payload: user});

  public getUserInfo() {
    let user: IUser = {
      memberId: environment.myMemberId,
      companyId: environment.myCompanyId,
    };

    this.storeGetUser(user);
  }
}
