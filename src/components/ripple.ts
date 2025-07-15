import { isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
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
  imports: [NgStyle, NgClass],
  template: `
    <div class="om-ripple" [ngStyle]="style" [ngClass]="styleClass" #OmRippleRef>
      <div class="om-ripple-background" [class.paused]="!isInView()">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .om-ripple {
        --om-ripple-border-color: rgba(0, 0, 0, 0.7);
        --om-ripple-color: rgba(0, 0, 0, 0.85);
        --om-ripple-animation-duration: 2s;

        height: 100dvh;
        width: 100dvw;
        position: relative;
        overflow: hidden;

        .om-ripple-background {
          height: 100%;
          width: 100%;
          position: absolute;
          -webkit-mask-image: linear-gradient(180deg, #fff, transparent);
          mask-image: linear-gradient(180deg, #fff, transparent);
          pointer-events: none;

          div {
            position: absolute;
            top: 50%;
            left: 50%;
            border-style: solid;
            border-width: 1px;
            transform: translate(-50%, -50%) scale(1);
            background-color: var(--om-ripple-color);
            border-radius: 100%;
            border: 2px solid var(--om-ripple-border-color);
            animation-name: om-ripple;
            animation-duration: var(--om-ripple-animation-duration);
            animation-timing-function: ease;
            animation-iteration-count: infinite;
          }

          &.paused div {
            animation-play-state: paused;
          }
        }
      }

      .om-ripple-background > div:nth-child(1) {
        width: 210px;
        height: 210px;
        opacity: 0.24;
        animation-delay: 0s;
      }

      .om-ripple-background > div:nth-child(2) {
        width: 280px;
        height: 280px;
        opacity: 0.21;
        animation-delay: 0.06s;
      }

      .om-ripple-background > div:nth-child(3) {
        width: 350px;
        height: 350px;
        opacity: 0.18;
        animation-delay: 0.12s;
      }

      .om-ripple-background > div:nth-child(4) {
        width: 420px;
        height: 420px;
        opacity: 0.15;
        animation-delay: 0.18s;
      }

      .om-ripple-background > div:nth-child(5) {
        width: 490px;
        height: 490px;
        opacity: 0.12;
        animation-delay: 0.24s;
      }

      .om-ripple-background > div:nth-child(6) {
        width: 560px;
        height: 560px;
        opacity: 0.09;
        animation-delay: 0.3s;
      }

      .om-ripple-background > div:nth-child(7) {
        width: 630px;
        height: 630px;
        opacity: 0.06;
        animation-delay: 0.36s;
      }

      .om-ripple-background > div:nth-child(8) {
        width: 700px;
        height: 700px;
        opacity: 0.03;
        animation-delay: 0.42s;
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Ripple implements AfterViewInit, OnDestroy {
  @ViewChild('OmRippleRef') rippleRef!: ElementRef<HTMLElement>;

  @Input('styleClass')
  styleClass?: string;

  @Input('rippleColor')
  set rippleColor(color: string) {
    this.style['--om-ripple-color'] = color;
  }

  @Input('rippleBorderColor')
  set rippleBorderColor(color: string) {
    this.style['--om-ripple-border-color'] = color;
  }

  @Input('animationDuration')
  set animationDuration(duration: string) {
    this.style['--om-ripple-animation-duration'] = duration;
  }

  style: any = {};

  isInView = signal(false);
  private intersectionObserver?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.isInView.set(entry.isIntersecting);
      });
      this.intersectionObserver.observe(this.rippleRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
