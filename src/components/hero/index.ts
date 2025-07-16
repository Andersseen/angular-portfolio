import { Component } from '@angular/core';
import { extend, NgtCanvas } from 'angular-three';
import { NgtsLoader } from 'angular-three-soba/loaders';
import * as THREE from 'three';
import Noise from '../noise';
import { SceneGraph } from './experience';
import FuzzyText from './fuzzy-text';

extend(THREE);

@Component({
  selector: 'app-bloom',
  imports: [NgtCanvas, NgtsLoader, Noise, FuzzyText],
  template: `
    <section class="relative h-screen w-full">
      <app-noise class="absolute h-full w-full" />
      <!-- <and-hero-title title="Web developer" /> -->
      <app-fuzzy-text text="Web developer"></app-fuzzy-text>
      <ngt-canvas
        [sceneGraph]="sceneGraph"
        [camera]="{ position: [0, 0, 2] }"
        [gl]="{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }"
      />
      <ngts-loader />
    </section>
  `,
})
export default class Bloom {
  public sceneGraph = SceneGraph;
}
