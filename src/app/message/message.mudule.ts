import { SharedModule } from "../shared/shared.module"
import { NgModule } from '@angular/core';
import { MessageRoutingModule} from "./message.routing"
import { MessageComponent } from "./message.component"
import { MsgItemComponent } from "./msg-item/msg-item.component"

@NgModule({
    imports: [
        SharedModule,
        MessageRoutingModule
    ],
    declarations: [
        MessageComponent,
        MsgItemComponent
    ]
})

export class MessageModule { }