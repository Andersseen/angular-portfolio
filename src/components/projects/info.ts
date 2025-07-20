import Base from '@/shared/base';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import State, { SlideTranslation } from './state';
import WordAnimation from './word-animation';

@Component({
  selector: 'app-info',
  imports: [WordAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex h-full flex-col justify-center gap-6 p-6 text-center md:items-start md:text-left">
      <div>
        <app-word-animation [word]="title()" />

        <p class="text-muted-foreground mt-4 max-w-lg text-lg">
          {{ description() }}
        </p>
      </div>

      <ul class="text-foreground flex flex-col gap-2 text-sm">
        @for (item of features(); track $index) {
          <li class="flex items-center gap-2">
            <svg class="text-foreground/50 size-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
        class="bg-foreground hover:bg-primary hover:text-foreground text-background inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold shadow transition duration-300 ease-in-out hover:scale-105"
      >
        {{ btnText() }}
      </a>
    </div>
  `,
})
export default class Info extends Base {
  #state = inject(State);

  #currentContent = computed(
    () =>
      (this.#state.translationContent()[this.currentLanguage()] as Record<string, SlideTranslation>)[
        this.#state.currentSlide().code
      ],
  );
  public title = computed(() => this.#currentContent().title);
  public description = computed(() => this.#currentContent().description);
  public features = computed(() => this.#currentContent().features);
  public link = computed(() => this.#state.currentSlide().link);

  public btnText = computed(() => this.getTextInProjects().button);
}
