import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import { NgtpBloom, NgtpDepthOfField, NgtpEffectComposer, NgtpNoise, NgtpVignette } from 'angular-three-postprocessing';
import * as THREE from 'three';
import { SphereInstances } from './instances';

extend(THREE);

@Component({
  template: `
    <ngt-color attach="red" *args="['#171717']" />
    <ngt-fog attach="fog" *args="['#171717', 8, 30]" />

    <app-sphere-instances />

    <ngtp-effect-composer [options]="{ multisampling: 0 }">
      <ngtp-depth-of-field [options]="{ focusDistance: 0, focalLength: 0.02, bokehScale: 2, height: 480 }" />
      <ngtp-bloom [options]="{ kernelSize: 3, luminanceThreshold: 0, luminanceSmoothing: 0.9, intensity: 1.5 }" />
      <ngtp-vignette [options]="{ eskil: false, offset: 0.2, darkness: 1.1 }" />
      <ngtp-noise [options]="{ premultiply: true }" />
    </ngtp-effect-composer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SphereInstances, NgtArgs, NgtpEffectComposer, NgtpDepthOfField, NgtpBloom, NgtpNoise, NgtpVignette],
})
export class SceneGraph {}
