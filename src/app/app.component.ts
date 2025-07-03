import { Component } from '@angular/core';
import HeroComponent from '../components/hero/hero';

@Component({
  selector: 'app-root',
  template: `
    <app-hero />
    <!-- <ngt-canvas [sceneGraph]="sceneGraph" /> -->
  `,
  host: { class: 'block h-dvh w-full' },
  imports: [HeroComponent],
})
export class AppComponent {
  // sceneGraph = Experience;
}
