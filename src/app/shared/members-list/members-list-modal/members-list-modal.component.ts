import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NAV_CONST} from "../../constants/navigation";

@Component({
  selector: 'ba-members-list-modal',
  templateUrl: 'members-list-modal.component.html',
  styleUrls: ['members-list-modal.component.scss']
})
export class MembersListModalComponent implements OnInit {
  members: IMembersListModal[];

  @Input() title;
  @Input() set setMembers(members){
    if (members) {
      // Set local param of members
      this.members = members;
      // Set profile link for all members
      for (let i = 0; i < this.members.length; i++) {
        this.members[i].memberUrl = '/' + NAV_CONST.member + '/' + this.members[i].id
      }
    }
  }

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

}
