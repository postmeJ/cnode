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
        data: {
            title: '主题列表'
        }
    },
    {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
            title: '主题详情'
        }
    },
    {
        path: 'publish',
        component: PublishTopicComponent,
        canActivate: [AuthGuardService],
        canDeactivate: [AuthGuardService],
        data: {
            title: '发布主题'
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

export class TopicsRoutingModule { }
