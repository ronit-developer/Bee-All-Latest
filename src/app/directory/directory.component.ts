import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../shared/constants/backend";


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


@Injectable()
export class DirectoryService {

  constructor(private http: HttpClient) {
  }

  getMembers() {
    return this.http.get(`${BASE_URL}/api/v1/members/directory?page=1&page_size=`);
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

  constructor(private directoryService: DirectoryService) { }

  ngOnInit() {
    this.getMembers();
  }

  private getMembers() {
    this.directoryService.getMembers().subscribe(
      (data: any) => {
        this.members = data.results;
      },
      err => console.error(err)
      );
    }
}
