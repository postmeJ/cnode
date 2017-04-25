import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from "./app.routing"
import { MdlModule } from 'angular2-mdl';
import { CoreModule } from "./core/core.module"
import { TopicsModule } from "./topics/topics.module"
import { ProfileModule } from "./profile/profile.module"

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRouterModule,
    MdlModule,
    LoginModule,
    TopicsModule,
    ProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
