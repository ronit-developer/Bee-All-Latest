export interface ISite {
  countryCode: string
  cityCode: string
  siteCode: string
}

export interface ILocation extends ISite {
  floor: string
  assetCode: string
  assetName: string
}

export interface ISiteServer {
  country_code: string
  city_code: string
  site_code: string
}

export interface ILocationServer extends ISiteServer {
  floor: string
  asset_code: string
  asset_name: string
}


export interface ICompanyLink {
  id: number
  name: string
}

export interface IMemberLink {
  id: number
  name: string
  profile_picture_url: string
  title: string
  company: ICompanyLink
  location: ISite
}
