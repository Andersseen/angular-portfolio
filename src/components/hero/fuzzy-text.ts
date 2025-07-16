import { AfterViewInit, Component, ElementRef, input, OnDestroy, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-fuzzy-text',
  imports: [],
  template: `
    <div
      #container
      class="text-foreground noselect absolute top-1/2 z-10 flex w-full items-center justify-center text-4xl font-bold md:text-8xl"
      (mouseenter)="isHovering.set(true)"
      (mouseleave)="isHovering.set(false)"
    >
      <canvas #canvasElement></canvas>
    </div>
  `,
})
export default class FuzzyText implements AfterViewInit, OnDestroy {
  public canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvasElement');
  public containerRef = viewChild<ElementRef<HTMLElement>>('container');

  public text = input('Angular Fuzzy!');

  public isHovering = signal(false);

  private offscreen!: HTMLCanvasElement;
  private resizeObserver!: ResizeObserver;
  private animationFrameId: number | null = null;

  ngAfterViewInit() {
    this.setupCanvas();
    this.resizeObserver = new ResizeObserver(() => this.setupCanvas());
    this.resizeObserver.observe(this.containerRef()!.nativeElement);

    this.animate();
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  private setupCanvas() {
    const canvas = this.canvasRef()!.nativeElement;
    const container = this.containerRef()!.nativeElement;

    const computed = window.getComputedStyle(container);
    const fontSize = computed.fontSize;
    const fontFamily = computed.fontFamily;
    const color = computed.color;

    canvas.width = container.clientWidth;
    canvas.height = parseFloat(fontSize) * 1.2;

    this.offscreen = document.createElement('canvas');
    this.offscreen.width = canvas.width;
    this.offscreen.height = canvas.height;

    const ctx = this.offscreen.getContext('2d');
    if (!ctx) return;

    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(this.text(), canvas.width / 2, canvas.height / 2);
  }

  private animate = () => {
    const canvas = this.canvasRef()!.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx || !this.offscreen) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fuzzRange = this.isHovering() ? 30 : 5;

    for (let y = 0; y < canvas.height; y++) {
      const dx = fuzzRange > 0 ? Math.floor((Math.random() - 0.5) * fuzzRange * 0.15) : 0;
      ctx.drawImage(this.offscreen, 0, y, canvas.width, 1, dx, y, canvas.width, 1);
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
