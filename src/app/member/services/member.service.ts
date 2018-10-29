import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL, BASE_URL} from "../../shared/constants/backend";
import {memberServer} from "../member.interface";


@Injectable()
export class MemberService {
  constructor(private authHttp: HttpClient) {
  }

  getMember(params) {
    const url = `${BASE_URL}${BACKEND_URL.member}${params}/`;
    return this.authHttp.get(url)
      .map(memberServer);
  }

  saveMember(memberId, memberInfo) {
    const url = `${BASE_URL}${BACKEND_URL.member}${memberId}/`;
    return this.authHttp.patch(url, memberInfo)
      .map(memberServer);
  }
}
