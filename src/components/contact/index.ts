import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import ContactSection from './contact-section';
import { Experience } from './stars';

@Component({
  selector: 'app-contact',
  template: `
    <section class="absolute top-1/2 left-1/2 z-[1] w-full -translate-x-1/2 -translate-y-1/2 transform">
      <app-contact-section />
    </section>
    <ngt-canvas [sceneGraph]="sceneGraph" [camera]="{ position: [0, 0, 1] }" />
  `,
  host: { class: 'h-dvh w-full' },
  imports: [NgtCanvas, ContactSection],
})
export default class Contact {
  sceneGraph = Experience;
}
