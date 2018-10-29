// Node modules
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MomentModule} from "angular2-moment";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

// Local components & modules
import {SpinnerComponent} from "./spinner/spinner.component";
import {PipeModule} from "./pipes/pipe.module";
import {PostPlaceHolderComponent} from "./post-place-holder/post-place-holder.component";
import {MembersListModalComponent} from "./members-list/members-list-modal/members-list-modal.component";
import {MembersListComponent} from "./members-list/members-list.component";
import {FocusDirective} from "./directives/focus.directive";
import {AutoSizeDirective} from "./directives/auto-size.directive";


@NgModule({
  declarations: [
    SpinnerComponent,
    PostPlaceHolderComponent,
    MembersListComponent,
    MembersListModalComponent,
    FocusDirective,
    AutoSizeDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule,
    NgbModule,
    TranslateModule,
    RouterModule,
    PipeModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule,
    NgbModule,
    TranslateModule,
    RouterModule,
    SpinnerComponent,
    PostPlaceHolderComponent,
    MembersListComponent,
    PipeModule,
    FocusDirective,
    AutoSizeDirective,
  ],
  entryComponents: [
    MembersListModalComponent,
  ],
})
export class SharedModule {
}
