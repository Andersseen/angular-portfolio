import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CardStack } from './card-stack';
import State from './state';

@Component({
  selector: 'app-projects',
  imports: [CardStack],
  providers: [State],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="grid h-screen w-full grid-cols-1 md:grid-cols-2">
      <!-- Left: Project Title -->
      <div class="flex items-center justify-center">
        <h1 class="text-4xl font-bold md:text-6xl">{{ title() }}</h1>
      </div>

      <!-- Right: Card Stack -->
      <div class="bg-foreground/20 flex flex-col items-center justify-center">
        <app-card-stack />
      </div>
    </section>
  `,
})
export default class Projects {
  #state = inject(State);
  public title = computed(() => this.#state.currentSlide().title);
}
