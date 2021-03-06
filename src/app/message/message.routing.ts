import { RouterModule, Routes } from "@angular/router"
import { NgModule } from "@angular/core"
import { MessageComponent } from "./message.component"
import { AuthGuardService } from "../core/auth-guard.service"

const routes: Routes = [
    {
        path: '',
        component: MessageComponent,
        canActivate: [AuthGuardService],
        data: {
            title: '消息中心'
        }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})


export class MessageRoutingModule { }