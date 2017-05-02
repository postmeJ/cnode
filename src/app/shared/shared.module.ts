import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdlModule } from 'angular2-mdl';
import { HeaderComponent } from "./components/header/header.component"
import { FromNowPipe } from "./pice/from-now.pipe";
import { SelectComponent } from './components/select/select.component';
import { PreviewDirective } from './directives/preview.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdlModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MdlModule,
    HeaderComponent,
    FromNowPipe,
    SelectComponent,
    PreviewDirective
  ],
  declarations: [HeaderComponent, FromNowPipe, SelectComponent, PreviewDirective],
})
export class SharedModule { }