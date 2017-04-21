import { SharedModule } from "../shared/shared.module"
import { NgModule } from '@angular/core';
import { TopicsRoutingModule } from "./topics.routing"
import { TopicsComponent } from "./topics.component";
import { TopicsService } from "./topics.service"

@NgModule({
    imports: [
        SharedModule,
        TopicsRoutingModule
    ],
    declarations: [
        TopicsComponent,
    ],
    providers:[
        {
            provide: 'topics',
            useClass: TopicsService
        }
    ]
})

export class TopicsModule { }