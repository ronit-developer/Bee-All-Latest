import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';

import {MemberReducer} from "../member/redux/member.reducer";
import {CompanyReducer} from "../company/redux/company.reducer";
import {UserReducer} from "../user/redux/user.reducer";

export const rootReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
      user: UserReducer,
      member: MemberReducer,
      company: CompanyReducer,
    }));
