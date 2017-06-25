import { trigger, state, style, transition, animate } from '@angular/core';

class AppAnimate {
    private name: string;
    private enterTransform: string;
    private leaveTransform: string;
    constructor(name: string, enterTransform: string, leaveTransform: string) {
        this.name = name;
        this.enterTransform = enterTransform;
        this.leaveTransform = leaveTransform;
    }
    createAnimate() {
       return trigger(`${this.name}`, [
            state('*', style({ transform: 'translateY(0)', opacity: 1 })),
            transition('void => *', [
                style({ transform: `${this.enterTransform}`, opacity: 0 }),
                animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
            ]),
            transition('* => void', [
                animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
                    transform: `${this.leaveTransform}`,
                    opacity: 0
                }))
            ])
        ])
    }
}

function createPageAnimate(name: string, enter: string, leave: string) {
    const animate = new AppAnimate(name, enter, leave);
    return animate.createAnimate();
}

export const slideUp = createPageAnimate('slideUp', 'translateY(50px)', 'translateY(-50px)');
export const slideDown = createPageAnimate('slideDown', 'translateY(-50px)', 'translateY(50px)');