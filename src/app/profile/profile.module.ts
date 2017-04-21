import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { ProfileService } from "./profile.service"

@NgModule({
    imports: [
        SharedModule,
        ProfileRoutingModule,
    ],
    declarations: [ProfileComponent],
    providers: [
        {
            provide: 'profile',
            useClass: ProfileService
        }
    ]
})
export class ProfileModule { }