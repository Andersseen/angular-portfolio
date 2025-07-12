import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, viewChild } from '@angular/core';
import { injectBeforeRender } from 'angular-three';
import { NgtpBloom, NgtpEffectComposer, NgtpVignette } from 'angular-three-postprocessing';
import { NgtsPointMaterial } from 'angular-three-soba/materials';
import { NgtsPointsBuffer } from 'angular-three-soba/performances';

@Component({
  selector: 'app-stars-experience',
  template: `
    <ngt-group [rotation]="[0, 0, Math.PI / 4]">
      <ngts-points-buffer [positions]="sphere" [stride]="3" [options]="{ frustumCulled: false }">
        <ngts-point-material
          [options]="{
            transparent: true,
            color: themeService.theme() === 'dark' ? '#f5f5f5' : 'black',
            size: 0.005,
            sizeAttenuation: true,
            depthWrite: false,
          }"
        />
      </ngts-points-buffer>
    </ngt-group>

    <ngtp-effect-composer [options]="{ multisampling: 0 }">
      <ngtp-bloom [options]="{ kernelSize: 1, luminanceThreshold: 0.3, luminanceSmoothing: 1, intensity: 1 }" />
      <ngtp-vignette [options]="{ eskil: false, offset: 0.2, darkness: 1.1 }" />
    </ngtp-effect-composer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgtsPointsBuffer, NgtsPointMaterial, NgtpEffectComposer, NgtpBloom, NgtpVignette],
})
export class Experience {
  public themeService = inject(ThemeService);
  protected readonly Math = Math;
  protected readonly sphere = generatePointsInSphere(1000);

  private pointsBufferRef = viewChild.required(NgtsPointsBuffer);

  withEffect = input(true);

  constructor() {
    injectBeforeRender(({ delta }) => {
      const points = this.pointsBufferRef().pointsRef().nativeElement;
      points.rotation.x -= delta / 20;
      points.rotation.y -= delta / 25;
    });
  }
}
function generatePointsInSphere(count: number, radius = 1.5): Float32Array {
  const points = new Float32Array(count);

  for (let i = 0; i < count; i += 3) {
    let x: number, y: number, z: number, lengthSq: number;

    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      lengthSq = x * x + y * y + z * z;
    } while (lengthSq > 1 || lengthSq === 0); // Ensure inside unit sphere

    // Scale to desired radius
    const scale = Math.cbrt(Math.random()) * radius; // cubic root = uniform density
    points[i] = x * scale;
    points[i + 1] = y * scale;
    points[i + 2] = z * scale;
  }

  return points;
}

import { ThemeService } from '@/services/theme.service';
import { NgtCanvas } from 'angular-three';
import ContactSection from './form/contact-section';

@Component({
  selector: 'app-stars',
  template: `
    <section class="absolute top-1/2 left-1/2 z-[1] w-full -translate-x-1/2 -translate-y-1/2 transform">
      <app-contact-section />
    </section>
    <ngt-canvas [sceneGraph]="sceneGraph" [camera]="{ position: [0, 0, 1] }" />
  `,
  host: { class: 'h-dvh w-full' },
  imports: [NgtCanvas, ContactSection],
})
export default class Stars {
  sceneGraph = Experience;
}
