import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlModule } from 'angular2-mdl';
import { HeaderComponent } from "./components/header/header.component"
import { FromNowPipe } from "./pice/from-now.pipe";
import { PreviewDirective } from './directives/preview.directive';
import { MdlSelectModule } from '@angular-mdl/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdlModule,
    ReactiveFormsModule,
    MdlSelectModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MdlModule,
    HeaderComponent,
    FromNowPipe,
    ReactiveFormsModule,
    PreviewDirective,
    MdlSelectModule
  ],
  declarations: [HeaderComponent, FromNowPipe, PreviewDirective],
})
export class SharedModule { }