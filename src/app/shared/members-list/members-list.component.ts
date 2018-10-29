import {Component, OnInit, Input} from '@angular/core';
import {IDisplayedMember, displayedMemberInit} from "./members-list.interface";
import {MembersListModalComponent} from "./members-list-modal/members-list-modal.component";
import {NgbModal, NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";
import {NAV_CONST} from "../constants/navigation";
import {IMemberLink} from "../interfaces";

@Component({
  selector: 'ba-members-list',
  templateUrl: 'members-list.component.html',
  styleUrls: ['members-list.component.scss'],
})
export class MembersListComponent implements OnInit {
  // Local vars
  isMoreMembersThanMax: boolean = false;
  displayedMembers: IDisplayedMember[] = [];
  memberTT: IDisplayedMember = displayedMemberInit; // Tooltip (TT) selected member
  numOfMembers: number;
  displayTitle: boolean = false;
  members: IMemberLink[];

  // Input params from consuming components
  @Input() text: string;
  @Input() maxDisplayedMembers: number;

  @Input() set setMembers(members) {
    if (members) {
      // Decide whether to display the title
      if (this.text)
        this.displayTitle = true;

      // Set members list
      this.members = members;

      // We need parameter numOfMembers because the template returns "Cannot read property 'length' of undefined"
      this.numOfMembers = this.members.length;

      // Indicate whether we have more members than we should show on screen, and set the array of displayed members
      if (this.members.length > this.maxDisplayedMembers) {
        this.isMoreMembersThanMax = true;
        // Set array of (maxDisplayedMembers-1) members to display + 1 avatar with number of remaining members
        this.displayedMembers = this.setDisplayedMembersArray(this.members, this.maxDisplayedMembers - 1);
      }
      else {
        // Set displayed members array of all members
        this.displayedMembers = this.setDisplayedMembersArray(this.members, this.members.length);
      }
    }
  }

  constructor(private modalService: NgbModal,
              private TTConfig: NgbTooltipConfig) {

    TTConfig.placement = 'bottom';
    TTConfig.triggers = 'hover';
  }

  ngOnInit() {
  }

  private setDisplayedMembersArray(members, numOfMembers) {
    let displayedMembers: IDisplayedMember[] = [];

    for (let i = 0; i < numOfMembers; i++) {
      displayedMembers.push({
        name: members[i].name,
        pictureUrl: members[i].pictureUrl,
        title: members[i].title,
        companyName: members[i].company.name,
        companyUrl: '/' + NAV_CONST.company + '/' + members[i].company.id,
        location: Object.assign({}, members[i].location),
        profileUrl: '/' + NAV_CONST.member + '/' + members[i].id
      });
    }
    return displayedMembers;
  }

  showAllMembers() {
    let membersList: IMembersListModal[] = [];
    const membersModal = this.modalService.open(MembersListModalComponent);

    // Set list of members at modal format
    for (let i = 0; i < this.members.length; i++) {
      membersList.push({
        id: this.members[i].id,
        name: this.members[i].name,
        profilePictureUrl: this.members[i].profile_picture_url,
        companyName: this.members[i].company.name
      })
    }
    membersModal.componentInstance.setMembers = membersList;

    // Set modal title
    membersModal.componentInstance.title =
      this.members.length + ' ' + (this.text ? this.text : 'members');
  }

  showToolTip(member: IDisplayedMember) {
    this.memberTT = member;
  }

  rightClickImage(event) {
    event.stopPropagation();
  }
}
