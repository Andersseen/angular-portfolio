import Base from '@/shared/base.component';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import Ripple from './ripple';

@Component({
  selector: 'app-preloader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, Ripple],
  template: `
    @if (visible()) {
      <section
        class="preloader bg-background text-foreground inset-0 z-50 flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out"
        [ngClass]="{ '-translate-y-full': !show() }"
      >
        <app-ripple
          rippleBorderColor="rgba(255, 255, 255, 0.7)"
          [rippleColor]="isDarkTheme() ? 'oklch(0.97 0 0)' : 'oklch(0.205 0 0)'"
        >
          <div class="flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <h1
              class="from-foreground to-foreground/10 bg-gradient-to-b bg-clip-text text-[4rem] font-bold text-transparent"
            >
              {{ getContent().preload.title }}
            </h1>
            <p
              class="from-foreground to-foreground/10 bg-gradient-to-b bg-clip-text text-lg font-bold text-transparent"
            >
              {{ getContent().preload.description }}..
            </p>
          </div>
        </app-ripple>
      </section>
    }
  `,
  styles: [
    `
      .preloader {
        position: fixed;
        view-transition-name: preloader;
      }
    `,
  ],
})
export default class Preloader extends Base {
  public delay = input(1000);

  public visible = signal(true);
  public show = signal(true);

  constructor() {
    super();
    effect(() => {
      setTimeout(() => this.show.set(false), this.delay());
      setTimeout(() => this.visible.set(false), this.delay() + 1000);
    });
  }
}
