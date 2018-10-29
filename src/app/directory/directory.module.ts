import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import { DirectoryComponent } from './directory.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    DirectoryComponent,
  ],  
})
export class DirectoryModule { }
