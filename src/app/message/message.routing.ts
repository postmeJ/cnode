import { RouterModule, Routes } from "@angular/router"
import { NgModule } from "@angular/core"
import { MessageComponent } from "./message.component"
import { AuthGuardService } from "../core/auth-guard.service"

const routes: Routes = [
    {
        path: 'message',
        component: MessageComponent,
        canActivate: [AuthGuardService]
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