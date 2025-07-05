import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'and-sticky-cursor',
  imports: [CommonModule],
  template: `
    <svg style="position: absolute; width: 0; height: 0">
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
        <feColorMatrix
          in="blur"
          values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 30 -7"
        />
      </filter>
    </svg>

    <div
      #container
      class="pointer-events-none absolute inset-0 z-50 h-full w-full overflow-hidden"
      [style.filter]="'url(#goo)'"
    >
      @for (style of styles(); track $index; let i = $index) {
        <div
          class="absolute rounded-full bg-neutral-900 opacity-60 shadow-lg transition-transform duration-100"
          [ngStyle]="{
            width: style.size + 'px',
            height: style.size + 'px',
            transform:
              'translate3d(' +
              style.x +
              'px,' +
              style.y +
              'px,0) translate3d(-50%,-50%,0) rotate(' +
              style.rotation +
              'rad) scaleX(' +
              style.scaleX +
              ') scaleY(' +
              style.scaleY +
              ')',
          }"
        >
          <div
            class="absolute rounded-full bg-white"
            [ngStyle]="{
              top: style.afterTop + 'px',
              left: style.afterLeft + 'px',
              width: style.afterSize + 'px',
              height: style.afterSize + 'px',
              opacity: 0.8,
            }"
          ></div>
        </div>
      }
    </div>
  `,
})
export default class StickyCursorComponent implements AfterViewInit {
  public stickyElement = input<ElementRef<HTMLElement>>();
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLElement>;

  private destroy = inject(DestroyRef);

  private mouse = signal({ x: 0, y: 0 });
  private trail = [signal({ x: 0, y: 0 }), signal({ x: 0, y: 0 }), signal({ x: 0, y: 0 })];

  private isHovered = signal(false);

  public styles = signal([
    {
      size: 40,
      afterTop: 20,
      afterLeft: 20,
      afterSize: 20,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
    },
    {
      size: 75,
      afterTop: 35,
      afterLeft: 35,
      afterSize: 35,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
    },
    {
      size: 55,
      afterTop: 25,
      afterLeft: 25,
      afterSize: 25,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
    },
  ]);

  ngAfterViewInit() {
    const sticky = this.stickyElement()?.nativeElement;
    const container = this.containerRef.nativeElement;
    if (sticky) {
      sticky.addEventListener('mouseenter', () => this.isHovered.set(true));
      sticky.addEventListener('mouseleave', () => this.isHovered.set(false));
    }
    fromEvent<MouseEvent>(window, 'mousemove')
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((e) => {
        const { clientX, clientY } = e;
        const rect = container.getBoundingClientRect();
        this.mouse.set({ x: clientX - rect.left, y: clientY - rect.top });
      });

    this.animate();
  }

  private animate() {
    const step = () => {
      const rawMouse = this.mouse();
      const stickyRect = this.stickyElement()!.nativeElement.getBoundingClientRect();
      const containerRect = this.containerRef.nativeElement.getBoundingClientRect();
      const center = {
        x: stickyRect.left + stickyRect.width / 2 - containerRect.left,
        y: stickyRect.top + stickyRect.height / 2 - containerRect.top,
      };

      const attractionDistance = 80;
      const dx = rawMouse.x - center.x;
      const dy = rawMouse.y - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const isNear = distance < attractionDistance;

      const localMouse =
        isNear && !this.isHovered()
          ? {
              x: rawMouse.x - dx * 0.1, // gentle pull
              y: rawMouse.y - dy * 0.1,
            }
          : rawMouse;

      this.trail.forEach((point, index) => {
        const current = point();
        const speed = index === 0 ? 0.3 : 0.1;
        const newX = current.x + (localMouse.x - current.x) * speed;
        const newY = current.y + (localMouse.y - current.y) * speed;
        point.set({ x: newX, y: newY });
      });

      this.styles.update((styles) =>
        styles.map((style, i) => {
          const trailPos = this.trail[i]();

          let scaleX = 1;
          let scaleY = 1;
          let rotation = 0;

          if (this.isHovered()) {
            const dx = rawMouse.x - center.x;
            const dy = rawMouse.y - center.y;
            const absDist = Math.max(Math.abs(dx), Math.abs(dy));

            rotation = Math.atan2(dy, dx);
            scaleX = this.mapRange(absDist, 0, stickyRect.height / 2, 1, 1.3);
            scaleY = this.mapRange(absDist, 0, stickyRect.width / 2, 1, 0.8);
          }

          return {
            ...style,
            x: trailPos.x,
            y: trailPos.y,
            scaleX,
            scaleY,
            rotation,
          };
        }),
      );

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  private mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    const clamped = Math.max(inMin, Math.min(value, inMax));
    return ((clamped - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}
