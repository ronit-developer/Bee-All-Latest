import {Injectable} from "@angular/core";
import {dispatch} from "@angular-redux/store";
import {ICompany} from "../company.interface";
import {CompanyService} from "../services/company.service";


@Injectable()
export class CompanyActions {
  static GET_COMPANY = "GET_COMPANY";
  static SET_COMPANY_PENDING = "SET_COMPANY_PENDING";

  constructor(private companyService: CompanyService) {
  }

  @dispatch() storeGetCompany = (company: ICompany) => ({type: CompanyActions.GET_COMPANY, payload: company});
  @dispatch() storeSetPending = (flag: boolean) => ({type: CompanyActions.SET_COMPANY_PENDING, payload: flag});

  getCompany(companyId: number) {
    this.storeSetPending(true);
    this.companyService.getCompany(companyId).subscribe((company: ICompany) => {
      // Dispatch company load
      this.storeGetCompany(company);
    }, (err) => {
      // Error handling
    })
  }
}
