import {ILocation, ILocationServer, ISite, ISiteServer} from "./interfaces";

export const siteInit: ISite = {
  countryCode: '',
  cityCode: '',
  siteCode: '',
};

export const siteServer = (record: ISiteServer): ISite => ({
  countryCode: record.country_code,
  cityCode: record.city_code,
  siteCode: record.site_code,
});

export const locationServer = (record: ILocationServer): ILocation => ({
  countryCode: record.country_code,
  cityCode: record.city_code,
  siteCode: record.site_code,
  floor: record.floor,
  assetCode: record.asset_code,
  assetName: record.asset_name,
});
