import { SharedModule } from "../shared/shared.module"
import { NgModule } from '@angular/core';
import { TopicsRoutingModule } from "./topics.routing"
import { TopicsComponent } from "./topics.component";
import { TopicsService } from "./topics.service";
import { DetailComponent } from './detail/detail.component';
import { ReplyComponent } from './reply/reply.component';
import { ReplyItemComponent } from './reply/reply-item/reply-item.component';
import { ReplyService } from "./reply/reply.service";
import { PublishTopicComponent } from './publish-topic/publish-topic.component'

@NgModule({
    imports: [
        SharedModule,
        TopicsRoutingModule
    ],
    declarations: [
        TopicsComponent,
        DetailComponent,
        ReplyComponent,
        ReplyItemComponent,
        PublishTopicComponent,
    ],
    providers:[
        {
            provide: 'topics',
            useClass: TopicsService
        },
        {
            provide: 'reply',
            useClass: ReplyService
        }
    ]
})

export class TopicsModule { }