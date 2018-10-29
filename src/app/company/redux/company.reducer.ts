import {CompanyActions} from "./company.actions";
import {ICompany} from "../company.interface";

export interface ICompanyStore {
  data: ICompany,
  pending: boolean,
  error: string,
}

export const companyInit: ICompany = {
  id: null,
  name: '',
  slogan: '',
  aboutUs: '',
  pictureUrl: '',
  website: '',
  email: '',
  phone: '',
  industries: [],
  sites: [],
  members: [],
};

export const companyStoreInit: ICompanyStore = {
  data: companyInit,
  pending: true,
  error: null,
};

export function CompanyReducer(state: ICompanyStore = companyStoreInit, action: any) {
  switch (action.type) {
    case CompanyActions.GET_COMPANY: {
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: null,
      }
    }
    case CompanyActions.SET_COMPANY_PENDING: {
      return {
        ...state,
        pending: action.payload,
      }
    }

    default:
      return state;
  }
}
