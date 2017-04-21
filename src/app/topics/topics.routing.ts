import { Routes, RouterModule } from "@angular/router"
import { TopicsComponent } from "./topics.component"
import { DetailComponent } from "./detail/detail.component"
import { NgModule } from "@angular/core"
import { AuthGuardService } from "../core/auth-guard.service"

const routes: Routes = [
    {
        path: 'topics/:filter',
        component: TopicsComponent,
    },
    {
        path: 'detail/:id',
        component: DetailComponent
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
