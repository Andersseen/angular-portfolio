import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, type ElementRef, viewChildren } from '@angular/core';
import { extend, injectBeforeRender, injectLoader, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpNoise } from 'angular-three-postprocessing';
import { injectTexture } from 'angular-three-soba/loaders';
import { NgtsMeshDistortMaterial } from 'angular-three-soba/materials';
import * as THREE from 'three';
import { CubeTextureLoader, type Mesh } from 'three';
import { MainSphere } from './main-sphere';

extend(THREE);

@Component({
  selector: 'app-sphere-instances',
  template: `
    <!-- we render the material with attach="none" so we can share it between instances -->
    <ngts-mesh-distort-material #distortMaterial attach="none" [options]="materialOptions()" />

    <app-main-sphere [material]="distortMaterial.material" />
    @for (position of initialPositions; track $index) {
      <ngt-mesh #mesh [material]="distortMaterial.material" [position]="position">
        <ngt-icosahedron-geometry *args="[1, 4]" />
      </ngt-mesh>
    }
    <ngtp-effect-composer>
      <ngtp-noise [options]="{ premultiply: true }" />
    </ngtp-effect-composer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MainSphere, NgtArgs, NgtsMeshDistortMaterial, NgtpEffectComposer, NgtpNoise],
})
export class SphereInstances {
  private envMap = injectLoader(
    // @ts-expect-error - CubeTextureLoader is ok
    () => CubeTextureLoader,
    () => [['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']],
    { extensions: (loader) => loader.setPath('/cube/') },
  );
  private bumpMap = injectTexture(() => '/bump.jpg');

  public materialOptions = computed(() => ({
    envMap: this.envMap()?.[0],
    bumpMap: this.bumpMap(),
    emissive: '#171717',
    emissiveIntensity: 2,
    roughness: 0.3,
    metalness: 1,
    bumpScale: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 1,
    radius: 1,
    distort: 0.4,
    color: '#171717',
  }));

  initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20],
  ];

  private meshesRef = viewChildren<ElementRef<Mesh>>('mesh');

  constructor() {
    injectBeforeRender(() => {
      const meshes = this.meshesRef();
      meshes.forEach(({ nativeElement: mesh }) => {
        mesh.position.y += 0.02;
        if (mesh.position.y > 19) mesh.position.y = -18;
        mesh.rotation.x += 0.06;
        mesh.rotation.y += 0.06;
        mesh.rotation.z += 0.02;
      });
    });
  }
}
