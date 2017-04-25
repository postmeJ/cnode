import { SharedModule } from "../shared/shared.module"
import { NgModule } from '@angular/core';
import { MessageRoutingModule} from "./message.routing"
import { MessageComponent } from "./message.component"

@NgModule({
    imports: [
        SharedModule,
        MessageRoutingModule
    ],
    declarations: [
        MessageComponent
    ],
    providers:[
    ]
})

export class MessageModule { }