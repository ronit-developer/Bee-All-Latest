import {
  ICompanyLink, ILocation, ILocationServer, ISite, ISiteServer} from "../shared/interfaces";
import {locationServer, siteServer} from "../shared/interfaces-consts";

interface IIndustry {
  key: string,
  name: string,
}

export interface ICompanyMember {
  id: number,
  name: string,
  pictureUrl: string
  title: string,
  location: ILocation,
  company: ICompanyLink
}

export interface ICompany {
  id: number,
  name: string,
  slogan: string,
  aboutUs: string,
  pictureUrl: string
  website: string,
  email: string,
  phone: string,
  industries: IIndustry[]
  sites: ISite[]
  members: ICompanyMember[]
}

// API interfaces
interface ICompanyMemberServer {
  id: number,
  name: string,
  profile_picture_url: string
  title: string,
  location: ILocationServer,
  company: ICompanyLink
}

interface ICompanyServer {
  id: number,
  name: string,
  slogan: string,
  about_us: string,
  profile_picture_url: string
  website: string,
  email: string,
  phone: string,
  industries: IIndustry[]
  sites: ISiteServer[]
  members: ICompanyMemberServer[]
}

// Convert API fields to our required format
export const companyServer = (record: ICompanyServer): ICompany => ({
  id: record.id,
  name: record.name,
  slogan: record.slogan,
  aboutUs: record.about_us,
  pictureUrl: record.profile_picture_url,
  website: record.website,
  email: record.email,
  phone: record.phone,
  industries: (!record.industries) ? [] : record.industries,
  sites: Array.from(record.sites, site => siteServer(site)),
  members: Array.from(record.members, m => companyMemberServer(m, record.id, record.name)),
});

const companyMemberServer = (record: ICompanyMemberServer, companyId: number, companyName: string): ICompanyMember => (
  {
  id: record.id,
  name: record.name,
  pictureUrl: record.profile_picture_url,
  title: record.title,
  location: locationServer(record.location),
  company: {
    id: companyId,
    name: companyName,
  },
});
