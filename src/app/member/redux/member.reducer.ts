import {IMember, IMemberInCompany} from "../member.interface";
import {siteInit} from "../../shared/interfaces-consts";
import {MemberActions} from "./member.actions";

export interface IMemberStore {
  data: IMember
  pending: boolean
  error: string
}

const memberInCompanyInit: IMemberInCompany = {
  id: null,
  name: '',
  aboutUs: '',
  pictureUrl: '',
  website: '',
};

const memberInit: IMember = {
  id: null,
  company: memberInCompanyInit,
  firstName: '',
  lastName: '',
  title: '',
  pictureUrl: '',
  email: '',
  mobilePhone: '',
  aboutMe: '',
  skills: [],
  location: siteInit,
};

export const memberStoreInit: IMemberStore = {
  data: memberInit,
  pending: true,
  error: null,
};


export function MemberReducer(state: IMemberStore = memberStoreInit, action: any) {
  switch (action.type) {

    case MemberActions.GET_MEMBER:
    case MemberActions.SAVE_MEMBER: {
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
      }
    }

    case MemberActions.SET_MEMBER_PENDING: {
      return {
        ...state,
        pending: action.payload,
      }
    }

    default:
      return state;
  }
}
