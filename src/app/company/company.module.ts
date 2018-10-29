import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyActions} from "./redux/company.actions";
import {CompanyService} from "./services/company.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    CompanyComponent
  ],
  providers: [
    CompanyActions,
    CompanyService,
    NgbModal,
  ]
})
export class CompanyModule { }
