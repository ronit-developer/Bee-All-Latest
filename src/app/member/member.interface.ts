import {ISite, ISiteServer} from "../shared/interfaces";
import {siteServer} from "../shared/interfaces-consts";

export interface ISkill {
  key: string
  name: string
}

export interface IMemberInCompany {
  id: number
  name: string
  website: string
  aboutUs: string
  pictureUrl: string
}

export interface IMember {
  id: number
  company: IMemberInCompany
  firstName: string
  lastName: string
  title: string
  pictureUrl: string
  email: string
  mobilePhone: string
  aboutMe: string
  skills: ISkill[]
  location: ISite
}

interface IMemberInCompanyServer {
  id: number
  name: string
  website: string
  about_us: string
  profile_picture_url: string
}

interface IMemberServer {
  id: number
  company: IMemberInCompanyServer
  first_name: string
  last_name: string
  title: string
  profile_picture_url: string
  email: string
  mobile_phone: string
  about_me: string
  skills: ISkill[]
  primary_location: ISiteServer
}

export const memberServer = (record: IMemberServer): IMember => ({
  id: record.id,
  company: memberInCompanyServer(record.company),
  firstName: record.first_name,
  lastName: record.last_name,
  title: record.title,
  pictureUrl: record.profile_picture_url,
  email: record.email,
  mobilePhone: record.mobile_phone,
  aboutMe: record.about_me,
  skills: record.skills,
  location: siteServer(record.primary_location),
});

const memberInCompanyServer = (record: IMemberInCompanyServer): IMemberInCompany => ({
  id: record.id,
  name: record.name,
  website: record.website,
  aboutUs: record.about_us,
  pictureUrl: record.profile_picture_url,
});
