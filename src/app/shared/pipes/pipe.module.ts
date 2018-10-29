import {NgModule} from "@angular/core";

import {UrlPipe} from "./url.pipe";
import {NewlinePipe} from "./new-line.pipe";


@NgModule({
  declarations: [
    UrlPipe,
    NewlinePipe,
  ],
  exports: [
    UrlPipe,
    NewlinePipe,
  ]
})

export class PipeModule {

}
