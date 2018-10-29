import {IMemberStore, memberStoreInit} from "../member/redux/member.reducer";
import {companyStoreInit, ICompanyStore} from "../company/redux/company.reducer";
import {IUserStore, userStoreInit} from "../user/redux/user.reducer";

export interface IAppState {
  user: IUserStore
  member: IMemberStore
  company: ICompanyStore
}

export const storeInit: IAppState = {
  user: userStoreInit,
  member: memberStoreInit,
  company: companyStoreInit,
};
