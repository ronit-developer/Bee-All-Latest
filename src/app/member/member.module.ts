import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemberComponent} from "./member.component";
import {MemberActions} from "./redux/member.actions";
import {MemberService} from "./services/member.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    MemberComponent,
  ],
  providers: [
    MemberActions,
    MemberService,
    NgbModal,
  ]
})
export class MemberModule { }
