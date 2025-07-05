import { Component } from '@angular/core';
import { extend, NgtCanvas } from 'angular-three';
import { NgtsLoader } from 'angular-three-soba/loaders';
import * as THREE from 'three';
import { SceneGraph } from './experience';
import { HeroTitleComponent } from './hero-title';

extend(THREE);

@Component({
  selector: 'app-bloom',
  imports: [NgtCanvas, NgtsLoader, HeroTitleComponent],
  template: `
    <section class="h-screen w-full bg-neutral-100 dark:bg-neutral-900">
      <and-hero-title title="Web developer" />
      <ngt-canvas [sceneGraph]="sceneGraph" [camera]="{ position: [0, 0, 2] }" />
      <ngts-loader />
    </section>
  `,
})
export default class BloomComponent {
  public sceneGraph = SceneGraph;
}
