import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import State from './state';

@Component({
  selector: 'app-controls',
  imports: [NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-center gap-3 px-0 py-3 md:px-8 md:py-5">
      <button
        (click)="prevCard()"
        class="flex h-14 w-14 items-center justify-center rounded-full border border-[#f6f6f6] transition duration-300 ease-in-out hover:scale-110 hover:bg-neutral-100 hover:text-neutral-900 active:scale-90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"
          />
        </svg>
      </button>

      <!-- Progress -->
      <div class="flex flex-col items-center gap-1">
        <div class="bg-foreground relative h-1 w-24 overflow-hidden rounded">
          <div
            class="bg-background absolute top-0 left-0 h-full transition-all duration-300 ease-in-out"
            [ngStyle]="{ width: progressWidth() }"
          ></div>
        </div>
      </div>

      <button
        (click)="nextCard()"
        class="flex h-14 w-14 items-center justify-center rounded-full border border-[#f6f6f6] transition duration-300 ease-in-out hover:scale-110 hover:bg-neutral-100 hover:text-neutral-900 active:scale-90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"
          />
        </svg>
      </button>
    </div>
  `,
})
export class ControlsComponent {
  #state = inject(State);

  public progressWidth = computed(() => {
    const current = this.#state.currentIndex();
    return `${(current / this.#state.totalItems()) * 100}%`;
  });

  prevCard() {
    this.#state.prevSlide();
  }
  nextCard() {
    this.#state.nextSlide();
  }
}
