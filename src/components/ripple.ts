import { CommonModule } from '@angular/common';
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
  selector: 'app-ripple',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #rippleRef class="relative h-full w-full overflow-hidden" [ngStyle]="style" [ngClass]="styleClass">
      <div
        class="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,white,transparent)]"
        [class.paused]="!isInView()"
      >
        @for (let i of rippleLayers; track $index) {
          <div
            class="animate-ripple absolute top-1/2 left-1/2 rounded-full border border-[var(--om-ripple-border-color)] bg-[var(--om-ripple-color)]"
            [ngStyle]="layerStyles[i]"
          ></div>
        }
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        --om-ripple-border-color: rgba(0, 0, 0, 0.7);
        --om-ripple-color: rgba(0, 0, 0, 0.85);
        --om-ripple-animation-duration: 2s;
      }

      .animate-ripple {
        animation-name: om-ripple;
        animation-duration: var(--om-ripple-animation-duration);
        animation-timing-function: ease;
        animation-iteration-count: infinite;
      }

      .paused .animate-ripple {
        animation-play-state: paused;
      }

      @keyframes om-ripple {
        0%,
        100% {
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          transform: translate(-50%, -50%) scale(0.9);
        }
      }
    `,
  ],
})
export default class Ripple implements AfterViewInit, OnDestroy {
  @ViewChild('rippleRef') rippleRef!: ElementRef<HTMLElement>;
  @Input() styleClass?: string;

  style: Record<string, any> = {};

  isInView = signal(false);

  rippleLayers = Array.from({ length: 8 }, (_, i) => i);

  layerStyles = this.rippleLayers.map((i) => {
    const baseSize = 210 + i * 70;
    const opacity = (0.24 - i * 0.03).toFixed(2);
    const delay = `${i * 0.06}s`;
    return {
      width: `${baseSize}px`,
      height: `${baseSize}px`,
      opacity,
      animationDelay: delay,
    };
  });

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  @Input() set rippleColor(color: string) {
    this.style['--om-ripple-color'] = color;
  }

  @Input() set rippleBorderColor(color: string) {
    this.style['--om-ripple-border-color'] = color;
  }

  @Input() set animationDuration(duration: string) {
    this.style['--om-ripple-animation-duration'] = duration;
  }

  private intersectionObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.isInView.set(entry.isIntersecting);
      });
      this.intersectionObserver.observe(this.rippleRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }
}
