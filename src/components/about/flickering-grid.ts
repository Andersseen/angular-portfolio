import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  input,
  Input,
  OnDestroy,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-flickering-grid',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative h-full w-full" [ngClass]="styleClass">
      <div #gridBackground class="pointer-events-none absolute inset-0 overflow-hidden">
        <canvas #gridCanvas class="pointer-events-none absolute inset-0 h-full w-full"></canvas>
      </div>
      <div class="relative z-10 h-full w-full">
        <ng-content />
      </div>
    </div>
  `,
})
export default class FlickeringGrid implements AfterViewInit, OnDestroy {
  public background = viewChild<ElementRef<HTMLElement>>('gridBackground');
  public canvas = viewChild<ElementRef<HTMLCanvasElement>>('gridCanvas');

  @Input() styleClass?: string;
  @Input() squareSize = 4;
  @Input() gridGap = 6;
  @Input() flickerChance = 0.3;
  public color = input('#a3a3a3');
  @Input() maxOpacity = 0.3;

  private ctx!: CanvasRenderingContext2D;
  private cols = 0;
  private rows = 0;
  private squares?: Float32Array;
  private lastAnimationTime = 0;
  private animationFrameId?: number;
  private memoizedColor = 'rgba(0, 0, 0,';
  private isInView = false;
  private animating = false;
  private intersectionObserver?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.setCanvasSize();
    this.setMemoizedColor();

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.toggleAnimation(entry.isIntersecting);
    });

    this.intersectionObserver.observe(this.canvas()!.nativeElement);
    window.addEventListener('resize', this.setCanvasSize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.setCanvasSize);
    this.intersectionObserver?.disconnect();
    cancelAnimationFrame(this.animationFrameId ?? 0);
  }

  private toggleAnimation(intersecting: boolean): void {
    this.isInView = intersecting;
    if (intersecting && !this.animating) {
      this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
    }
  }

  private setCanvasSize = (): void => {
    const canvasEl = this.canvas()!.nativeElement;
    const bgBounds = this.background()!.nativeElement.getBoundingClientRect();

    canvasEl.width = bgBounds.width;
    canvasEl.height = bgBounds.height;

    this.ctx = canvasEl.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;

    this.setupGrid();
  };

  private setupGrid(): void {
    const canvasEl = this.canvas()!.nativeElement;

    this.cols = Math.ceil(canvasEl.width / (this.squareSize + this.gridGap));
    this.rows = Math.ceil(canvasEl.height / (this.squareSize + this.gridGap));
    this.squares = new Float32Array(this.cols * this.rows).map(() => Math.random() * this.maxOpacity);
  }

  private setMemoizedColor(): void {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = this.color();
    ctx.fillRect(0, 0, 1, 1);

    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    console.log(r, g, b);
    this.memoizedColor = `rgba(${r}, ${g}, ${b},`;
  }

  private animate = (time: number): void => {
    if (!this.isInView) {
      this.animating = false;
      return;
    }

    this.animating = true;
    const delta = (time - this.lastAnimationTime) / 1000;
    this.lastAnimationTime = time;

    this.updateSquares(delta);
    this.draw();

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private updateSquares(delta: number): void {
    if (!this.squares) return;
    for (let i = 0; i < this.squares.length; i++) {
      if (Math.random() < this.flickerChance * delta) {
        this.squares[i] = Math.random() * this.maxOpacity;
      }
    }
  }

  private draw(): void {
    if (!this.ctx || !this.squares) return;

    const canvas = this.canvas()!.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const opacity = this.squares[i * this.rows + j];
        this.ctx.fillStyle = `${this.memoizedColor}${opacity})`;
        this.ctx.fillRect(
          i * (this.squareSize + this.gridGap),
          j * (this.squareSize + this.gridGap),
          this.squareSize,
          this.squareSize,
        );
      }
    }
  }
}
