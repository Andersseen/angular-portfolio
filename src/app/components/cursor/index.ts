import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';

@Component({
  selector: 'and-cursor',
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

    <div class="pointer-events-none absolute h-full w-full overflow-hidden" [style.filter]="'url(#goo)'">
      <div
        *ngFor="let style of styles(); let i = index"
        class="absolute rounded-full bg-neutral-900 opacity-60 shadow-lg"
        [ngStyle]="{
          width: style.size + 'px',
          height: style.size + 'px',
          transform: 'translate3d(' + style.x + 'px,' + style.y + 'px,0) translate3d(-50%,-50%,0)',
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
    </div>
  `,
})
export default class CursorComponent implements AfterViewInit {
  private destroyRef = inject(DestroyRef);
  private el = inject(ElementRef<HTMLElement>);

  private mouse = signal({ x: 0, y: 0 });
  private trail = [signal({ x: 0, y: 0 }), signal({ x: 0, y: 0 }), signal({ x: 0, y: 0 })];

  public styles = signal([
    {
      size: 40,
      afterTop: 20,
      afterLeft: 20,
      afterSize: 20,
      x: 0,
      y: 0,
    },
    {
      size: 75,
      afterTop: 35,
      afterLeft: 35,
      afterSize: 35,
      x: 0,
      y: 0,
    },
    {
      size: 55,
      afterTop: 25,
      afterLeft: 25,
      afterSize: 25,
      x: 0,
      y: 0,
    },
  ]);

  ngAfterViewInit() {
    const updateMouse = (e: MouseEvent) => {
      const rect = this.el.nativeElement.getBoundingClientRect();
      this.mouse.set({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    window.addEventListener('mousemove', updateMouse);
    this.destroyRef.onDestroy(() => window.removeEventListener('mousemove', updateMouse));

    const animate = () => {
      const target = this.mouse();
      this.trail.forEach((point, index) => {
        const current = point();
        const config = index === 0 ? 0.3 : 0.1;
        const newX = current.x + (target.x - current.x) * config;
        const newY = current.y + (target.y - current.y) * config;
        point.set({ x: newX, y: newY });
      });

      this.styles.update((s) =>
        s.map((style, i) => ({
          ...style,
          x: this.trail[i]().x,
          y: this.trail[i]().y,
        })),
      );

      requestAnimationFrame(animate);
    };
    animate();
  }
}
