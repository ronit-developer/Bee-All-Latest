import {IUser} from "../user.interface";
import {UserActions} from "./user.actions";

export interface IUserStore {
  data: IUser,
  pending: boolean,
  error: string,
}

export const userInit: IUser = {
  memberId: null,
  companyId: null,
};

export const userStoreInit: IUserStore = {
  data: userInit,
  pending: true,
  error: null,
};

export function UserReducer(state: IUserStore = userStoreInit, action: any) {
  switch (action.type) {
    case UserActions.GET_USER: {
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: null,
      }
    }

    default:
      return state;
  }
}
