import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { MessageService } from "./message.service"

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        { provide: 'user', useClass: UserService },
        { provide: 'auth', useClass: AuthService },
        { provide: 'message', useClass: MessageService },
        AuthGuardService
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}