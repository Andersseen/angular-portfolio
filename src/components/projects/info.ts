import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import State from './state';

@Component({
  selector: 'app-info',
  imports: [NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex h-full flex-col justify-center gap-6 p-6 text-center md:items-start md:text-left">
      <div>
        <h1
          class="leading-tight font-bold tracking-tight break-words"
          [ngStyle]="{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            maxWidth: '18ch',
          }"
        >
          {{ title() }}
        </h1>

        <p class="text-muted-foreground mt-4 max-w-lg text-lg">
          {{ description() }}
        </p>
      </div>

      <ul class="text-foreground flex flex-col gap-2 text-sm">
        @for (item of features(); track $index) {
          <li class="flex items-center gap-2">
            <svg class="text-primary size-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414Z"
              />
            </svg>
            {{ item }}
          </li>
        }
      </ul>

      <a
        [href]="link()"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-foreground hover:bg-primary/80 text-background inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold shadow transition duration-300 ease-in-out hover:scale-105"
      >
        View Live Project
      </a>
    </div>
  `,
})
export default class Info {
  #state = inject(State);
  public title = computed(() => this.#state.currentSlide().title);
  public description = computed(() => this.#state.currentSlide().description);
  public features = computed(() => this.#state.currentSlide().features);
  public link = computed(() => this.#state.currentSlide().link);
}
