import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-fuzzy-text',
  imports: [NgClass],
  template: `
    <div
      class="noselect absolute z-10 flex h-full w-full flex-col items-center justify-center text-neutral-100"
      [ngClass]="styleClass"
      #fuzzyText
    >
      <canvas #canvasElement></canvas>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FuzzyText implements AfterViewInit, OnDestroy {
  @ViewChild('fuzzyText') fuzzyTextRef!: ElementRef<HTMLElement>;
  @ViewChild('canvasElement') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input('styleClass') styleClass?: string;

  @Input()
  set text(text: string) {
    this.textValue = text;

    if (this.initialized) {
      void this.init();
    }
  }

  @Input()
  set enableHover(enableHover: boolean) {
    this.enableHoverValue = enableHover;

    if (this.initialized) {
      void this.init();
    }
  }

  @Input() baseIntensity = 0.15;
  @Input() hoverIntensity = 0.3;
  @Input() fuzzRange = 30;

  private textValue = '';
  private enableHoverValue = true;

  private offscreenWidth = 0;
  private tightHeight = 0;
  private isHovering = false;
  private offscreen?: HTMLCanvasElement;
  private initialized = false;
  private runAnimation = false;

  isInView = signal(false);
  private intersectionObserver?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private resizeTimeout: any = null;
  private animationFrameId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    void this.init();

    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        const wasInView = this.isInView();
        this.isInView.set(entry.isIntersecting);

        if (!wasInView && this.isInView() && this.initialized) {
          this.runAnimation = true;
          this.animate();
        }

        if (wasInView && !this.isInView()) {
          this.runAnimation = false;

          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
          }
        }
      });

      this.intersectionObserver.observe(this.fuzzyTextRef.nativeElement);

      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          void this.init();
          this.resizeTimeout = null;
        }, 150);
      });
      this.resizeObserver.observe(this.fuzzyTextRef.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    const canvas = this.canvasRef?.nativeElement;
    if (canvas && (canvas as any).cleanupFuzzyText) {
      (canvas as any).cleanupFuzzyText();
    }

    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
  }

  private async init() {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    await document.fonts.ready;

    const computed = window.getComputedStyle(canvas.parentElement ?? canvas);
    const fontSizeStr = '5rem';

    const fontWeight = computed.fontWeight;
    const fontFamily = computed.fontFamily;
    const color = computed.color || '#000';

    const numericFontSize = parseFloat(fontSizeStr);

    const text = this.textValue;

    this.offscreen = this.offscreen ? this.offscreen : document.createElement('canvas');
    const offCtx = this.offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.font = `${fontWeight} ${fontSizeStr} ${fontFamily}`;
    offCtx.textBaseline = 'alphabetic';
    const metrics = offCtx.measureText(text);

    const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
    const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
    const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
    const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

    const textBoundingWidth = Math.ceil(actualLeft + actualRight);
    this.tightHeight = Math.ceil(actualAscent + actualDescent);

    const extraWidthBuffer = 10;
    this.offscreenWidth = textBoundingWidth + extraWidthBuffer;

    this.offscreen.width = this.offscreenWidth;
    this.offscreen.height = this.tightHeight;

    const xOffset = extraWidthBuffer / 2;
    offCtx.font = `${fontWeight} ${fontSizeStr} ${fontFamily}`;

    offCtx.textBaseline = 'alphabetic';
    offCtx.fillStyle = color;
    offCtx.fillText(text, xOffset - actualLeft, actualAscent);

    const horizontalMargin = 50;
    const verticalMargin = 0;
    canvas.width = this.offscreenWidth + horizontalMargin * 2;
    canvas.height = this.tightHeight + verticalMargin * 2;
    ctx.setTransform(1, 0, 0, 1, horizontalMargin, verticalMargin);

    const interactiveLeft = horizontalMargin + xOffset;
    const interactiveTop = verticalMargin;
    const interactiveRight = interactiveLeft + textBoundingWidth;
    const interactiveBottom = interactiveTop + this.tightHeight;

    const isInsideTextArea = (x: number, y: number) =>
      x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.enableHoverValue) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.isHovering = isInsideTextArea(x, y);
    };

    const handleMouseLeave = () => {
      this.isHovering = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!this.enableHoverValue) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      this.isHovering = isInsideTextArea(x, y);
    };

    const handleTouchEnd = () => {
      this.isHovering = false;
    };

    if (this.enableHoverValue) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd);
    }

    (canvas as any).cleanupFuzzyText = () => {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this.enableHoverValue) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
    };

    this.initialized = true;
  }

  private animate = () => {
    if (!this.runAnimation) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    if (!this.offscreen) {
      return;
    }

    ctx.clearRect(
      -this.fuzzRange,
      -this.fuzzRange,
      this.offscreenWidth + 2 * this.fuzzRange,
      this.tightHeight + 2 * this.fuzzRange,
    );

    const intensity = this.isHovering ? this.hoverIntensity : this.baseIntensity;

    for (let j = 0; j < this.tightHeight; j++) {
      const dx = Math.floor(intensity * (Math.random() - 0.5) * this.fuzzRange);
      ctx.drawImage(this.offscreen, 0, j, this.offscreenWidth, 1, dx, j, this.offscreenWidth, 1);
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
