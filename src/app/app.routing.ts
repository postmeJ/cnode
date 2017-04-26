import { Routes, RouterModule } from "@angular/router"
import { NgModule } from "@angular/core"
import { LoginComponent } from "./login/login.component"
import { TopicsComponent } from "./topics/topics.component"
import { AuthGuardService } from "./core/auth-guard.service"
const routes: Routes = [
    {
        path: '',
        redirectTo: 'topics',
        pathMatch: 'full'
    },
    {
        path: 'topics',
        redirectTo: 'topics' ,
        canLoad: [AuthGuardService]
    },
    {
        path: '**',
        redirectTo: 'topics'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouterModule { }