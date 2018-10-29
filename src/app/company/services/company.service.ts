import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL, BASE_URL} from "../../shared/constants/backend";
import {companyServer} from "../company.interface";


@Injectable()
export class CompanyService {
  constructor(private authHttp: HttpClient) {
  }

  getCompany(companyId: number) {
    const url = `${BASE_URL}${BACKEND_URL.company}${companyId}/`;
    return this.authHttp.get(url)
      .map(companyServer)
  }
}
