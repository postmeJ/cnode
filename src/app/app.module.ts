import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from './app.routing';
import { MdlModule } from 'angular2-mdl';
import { CoreModule } from './core/core.module';
import { TopicsModule } from './topics/topics.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRouterModule,
    MdlModule,
    TopicsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
