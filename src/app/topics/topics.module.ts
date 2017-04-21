import { SharedModule } from "../shared/shared.module"
import { NgModule } from '@angular/core';
import { TopicsRoutingModule } from "./topics.routing"
import { TopicsComponent } from "./topics.component";
import { TopicsService } from "./topics.service";
import { DetailComponent } from './detail/detail.component';
import { SafeHtmlPipe } from './detail/safe-html.pipe';

@NgModule({
    imports: [
        SharedModule,
        TopicsRoutingModule
    ],
    declarations: [
        TopicsComponent,
        DetailComponent,
        SafeHtmlPipe
    ],
    providers:[
        {
            provide: 'topics',
            useClass: TopicsService
        }
    ]
})

export class TopicsModule { }