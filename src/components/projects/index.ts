import { ChangeDetectionStrategy, Component } from '@angular/core';
import CardStack from './card-stack';
import { LeftPart } from './left-part';
import State from './state';

@Component({
  selector: 'app-projects',
  imports: [CardStack, LeftPart],
  providers: [State],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="grid h-screen w-full grid-cols-1 md:grid-cols-2">
      <!-- Left: Project Title + Description + Button -->
      <app-left-part />
      <!-- Right: Card Stack -->
      <div class="bg-foreground/20 flex flex-col items-center justify-center">
        <app-card-stack />
      </div>
    </section>
  `,
})
export default class Projects {}
