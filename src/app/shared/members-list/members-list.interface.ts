import {ISite} from "../interfaces";
import {siteInit} from "../interfaces-consts";


export interface IDisplayedMember {
  name: string,
  pictureUrl: string,
  title: string,
  companyName: string,
  companyUrl: string,
  location: ISite,
  profileUrl: string,
}

export const displayedMemberInit: IDisplayedMember = {
  name: '',
  pictureUrl: '',
  title: '',
  companyName: '',
  companyUrl: '',
  location: siteInit,
  profileUrl: ''
};
