import { trigger, state, style, transition, animate } from '@angular/core';

export const slideUp = trigger('slideUp', [
    state('*', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
    ]),
    transition('* => void', [
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
            transform: 'translateY(-50px)',
            opacity: 0
        }))
    ])
]);

export const slideDown = trigger('slideDown', [
    state('*', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
    ]),
    transition('* => void', [
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
            transform: 'translateY(50px)',
            opacity: 0
        }))
    ])
]);
