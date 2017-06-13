import { Routes, RouterModule } from '@angular/router';
import { TopicsComponent } from './topics.component';
import { DetailComponent } from './detail/detail.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../core/auth-guard.service';
import { PublishTopicComponent } from './publish-topic/publish-topic.component';

const routes: Routes = [
    {
        path: 'topics',
        component: TopicsComponent,
    },
    {
        path: 'detail/:id',
        component: DetailComponent,
    },
    {
        path: 'publish',
        component: PublishTopicComponent,
        canActivate: [AuthGuardService],
        canDeactivate: [AuthGuardService],
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
