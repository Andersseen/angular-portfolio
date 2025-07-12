import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import createGlobe from 'cobe';

@Component({
  selector: 'app-globe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="relative flex h-full w-full items-center justify-center overflow-hidden">
      <canvas
        #canvasRef
        class="absolute aspect-square h-fit w-fit opacity-0 transition-opacity duration-500"
        (pointerdown)="onPointerDown($event)"
        (pointerup)="onPointerUp()"
        (pointerout)="onPointerUp()"
        (mousemove)="onMouseMove($event)"
        (touchmove)="onTouchMove($event)"
      ></canvas>
    </div>
  `,
})
export default class Globe implements AfterViewInit, OnDestroy {
  public canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef');
  private globe: any;
  private phi = 0;
  private width = 0;
  private pointerInteracting: number | null = null;
  private pointerInteractionMovement = 0;
  private r = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef()!.nativeElement;
    this.width = canvas.offsetWidth;

    this.globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0.2,
      theta: 0.3,
      dark: 1,
      diffuse: 0.4,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        if (!this.pointerInteracting) this.phi += 0.005;
        state['phi'] = this.phi + this.r;
        state['width'] = this.width * 2;

        state['height'] = this.width * 2;
      },
    });

    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    window.addEventListener('resize', this.handleResize);
    this.canvasRef()!.nativeElement.width = this.width * 2;
    this.canvasRef()!.nativeElement.height = this.width * 2;
  }

  ngOnDestroy(): void {
    this.globe?.destroy?.();
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const canvas = this.canvasRef()!.nativeElement;
    this.width = canvas.offsetWidth;
  };

  onPointerDown(event: PointerEvent) {
    this.pointerInteracting = event.clientX - this.pointerInteractionMovement;
    this.canvasRef()!.nativeElement.style.cursor = 'grabbing';
  }

  onPointerUp() {
    this.pointerInteracting = null;
    this.canvasRef()!.nativeElement.style.cursor = 'grab';
  }

  onMouseMove(event: MouseEvent) {
    if (this.pointerInteracting !== null) {
      const delta = event.clientX - this.pointerInteracting;
      this.pointerInteractionMovement = delta;
      this.r = delta / 200;
    }
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches.length) {
      const touch = event.touches[0];
      this.onMouseMove(touch as unknown as MouseEvent);
    }
  }
}
