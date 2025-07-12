import { Component } from '@angular/core';
import { CardStackComponent } from '../card-stack';

@Component({
  selector: 'app-projects',
  imports: [CardStackComponent],
  template: `
    <section class="grid h-screen w-full grid-cols-1 md:grid-cols-2">
      <!-- Left: Project Title -->
      <div class="flex items-center justify-center">
        <h1 class="text-4xl font-bold md:text-6xl">Featured Projects</h1>
      </div>

      <!-- Right: Card Stack -->
      <div class="bg-foreground/20 flex items-center justify-center">
        <app-card-stack />
      </div>
    </section>
  `,
})
export default class Projects {}
