import { Component, CUSTOM_ELEMENTS_SCHEMA, type ElementRef, input, viewChild } from '@angular/core';
import { extend, injectBeforeRender, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { Material, MathUtils, type Mesh } from 'three';

extend(THREE);

@Component({
  selector: 'app-main-sphere',
  template: `
    <ngt-mesh #mesh [material]="material()">
      <ngt-icosahedron-geometry *args="[1, 4]" />
    </ngt-mesh>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgtArgs],
})
export class MainSphere {
  material = input.required<Material>();

  meshRef = viewChild.required<ElementRef<Mesh>>('mesh');

  constructor() {
    injectBeforeRender(({ clock, pointer }) => {
      const mesh = this.meshRef().nativeElement;
      mesh.rotation.z = clock.getElapsedTime();
      mesh.rotation.y = MathUtils.lerp(mesh.rotation.y, pointer.x * Math.PI, 0.1);
      mesh.rotation.x = MathUtils.lerp(mesh.rotation.x, pointer.y * Math.PI, 0.1);
    });
  }
}
