import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../shared/constants/backend";


interface IDirectoryMember {
  count
  next
  previous
  results: [
    {
      id
      first_name
      last_name
      title
      profile_picture_url
      company: {
        id
        name
      },
      skills: [
        {
          key
          name
        }
      ]
      location: {
        country_code
        city_code
        site_code
        floor
        asset_code
        asset_number
      }
    }
  ]
}

interface IDirectoryCompany {
  count
  next
  previous
  results: [
    {
      id
      name
      slogan
      website
      profile_picture_url
      locations: [{
        country_code
        city_code
        site_code
      }]
      industries: [
        {
          key
          name
        }
      ]
    }
  ]
}


@Injectable()
export class DirectoryService {

  constructor(private http: HttpClient) {
  }

  getMembers(page: number, pageSize: number) {
    return this.http.get(`${BASE_URL}/api/v1/members/directory?page=` + page + `&page_size=` + pageSize);
  }

  getCompanies(page: number, pageSize: number) {
    return this.http.get(`${BASE_URL}/api/v1/companies/directory?page=` + page + `&page_size=` + pageSize);
  }
}


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
  providers: [DirectoryService],
})
export class DirectoryComponent implements OnInit {
  members: IDirectoryMember["results"];
  companies: IDirectoryCompany["results"];
  type: string = 'members';
  total: number;
  currentPage = 1;
  pageSize = 10;
  constructor(private directoryService: DirectoryService) { }

  ngOnInit() {
    this.getMembers();
  }

  setPage(n: number) {
    this.currentPage = n;
    if (this.type === 'members') {
      this.getMembers();
    }
    else {
      this.getCompanies();
    }
  }

  getDirectory(type) {
    this.type = type;
    this.currentPage = 1;
    if (this.type === 'members') {
      this.getMembers();
    }
    else {
      this.getCompanies();
    }
  }

  private getMembers() {
    this.directoryService.getMembers(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.members = data.results;
        this.total = data.count;
      },
      err => console.error(err)
    );
  }

  private getCompanies() {
    this.directoryService.getCompanies(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.companies = data.results;
        this.total = data.count;
      },
      err => console.error(err)
    );
  }
}
