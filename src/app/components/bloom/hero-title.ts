import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'and-hero-title',
  imports: [],
  template: `
    <div
      class="noselect absolute top-[50%] z-10 flex h-fit w-full flex-col items-center justify-center rounded-[50%] text-violet-900"
    >
      <h1
        class="animate-fade-in -ml-16 flex flex-col items-center justify-center text-center text-6xl lg:text-9xl"
        [style.transform]="transform3D()"
      >
        <div class="flex">
          @for (char of characters(); track char; let i = $index) {
            <span
              [class.text-primary-400]="char !== ' '"
              class="animate-slide-in inline-block"
              [style.animationDelay]="i * 50 + 'ms'"
            >
              {{ char === ' ' ? ' ' : char }}
            </span>
          }
        </div>
      </h1>
    </div>
  `,
})
export class HeroTitleComponent {
  public title = input('');

  public perspective = signal(400);

  public characters = computed(() => [...this.title()]);

  public transform3D = computed(() => {
    const p = Math.max(this.perspective(), 1);
    return `perspective(${p}px) rotateX(20deg) rotateY(-15deg)`;
  });
}
