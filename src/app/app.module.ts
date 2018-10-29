import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MemberModule} from "./member/member.module";
import {CompanyModule} from "./company/company.module";
import {appRoutes} from "./routes";
import {RouterModule} from "@angular/router";
import {NgReduxRouterModule} from "@angular-redux/router";
import {NgReduxModule} from "@angular-redux/store";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {StoreModule} from "./store/store.module";
import {UserActions} from "./user/redux/user.actions";
import {SidebarComponent} from "./sidebar/sidebar.component";
import { DirectoryComponent } from './directory/directory.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { DirectoryModule } from './directory/directory.module';
import { PaginationComponent } from './shared/pagination/pagination.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DirectoryComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule,
    MemberModule,
    CompanyModule,    
  ],
  providers: [UserActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
