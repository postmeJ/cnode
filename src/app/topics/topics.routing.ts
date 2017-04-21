import { Routes, RouterModule } from "@angular/router"
import { TopicsComponent } from "./topics.component"
import { NgModule } from "@angular/core"
import { AuthGuardService } from "../core/auth-guard.service"

const routes: Routes = [
    {
        path: 'topics/:filter',
        component: TopicsComponent,
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

export class TopicsRoutingModule { }
