import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';

const bounceSlideInDown = animation([
  style({ transform: 'translateY(100%)', opacity: 0 }),
  animate('800ms cubic-bezier(0.22, 1, 0.36, 1)', style({ transform: 'translateY(0)', opacity: 1 })),
]);

const bounceSlideInUp = animation([
  style({ transform: 'translateY(-100%)', opacity: 0 }),
  animate('800ms cubic-bezier(0.22, 1, 0.36, 1)', style({ transform: 'translateY(0)', opacity: 1 })),
]);

const fadeOut = animation([animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(50px)' }))]);

export const slideBounceAnimation = trigger('slideBounce', [
  transition('void => down', useAnimation(bounceSlideInDown)),
  transition('void => up', useAnimation(bounceSlideInUp)),
  transition('* => void', useAnimation(fadeOut)),
]);
