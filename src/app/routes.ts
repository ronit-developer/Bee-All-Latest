import {MemberComponent} from "./member/member.component";
import {CompanyComponent} from "./company/company.component";
import {NAV_CONST} from "./shared/constants/navigation";
import {DirectoryComponent} from "./directory/directory.component";

export const appRoutes = [
  {path: '', redirectTo: NAV_CONST.directory, pathMatch: 'full'},
  {path: 'member/:id', component: MemberComponent},
  {path: 'company/:id', component: CompanyComponent},
  {path: 'directory', component: DirectoryComponent},
  {path: '**', redirectTo: NAV_CONST.directory}
];
