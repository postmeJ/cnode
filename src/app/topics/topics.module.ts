import { SharedModule } from "../shared/shared.module"
import { NgModule } from '@angular/core';
import { TopicsRoutingModule } from "./topics.routing"
import { TopicsComponent } from "./topics.component";

@NgModule({
    imports: [
        SharedModule,
        TopicsRoutingModule
    ],
    declarations:[
        TopicsComponent,
    ],
})

export class TopicsModule { }