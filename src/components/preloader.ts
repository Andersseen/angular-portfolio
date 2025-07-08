import BaseComponent from '@/shared/base.component';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-preloader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  template: `
    @if (visible()) {
      <section
        class="preloader inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900 text-neutral-100 transition-transform duration-1000 ease-in-out"
        [ngClass]="{ '-translate-y-full': !show() }"
      >
        <h1 class="text-5xl font-bold tracking-tight">{{ getContent().preload.title }}</h1>
        <p class="text-lg font-bold tracking-tight">{{ getContent().preload.description }}..</p>
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
export default class PreloaderComponent extends BaseComponent {
  public delay = input(1500);

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
