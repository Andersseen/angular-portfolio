import { Component, signal } from '@angular/core';
import { Card, CardStack } from './card-stack';

@Component({
  selector: 'app-projects',
  imports: [CardStack],
  template: `
    <section class="grid h-screen w-full grid-cols-1 md:grid-cols-2">
      <!-- Left: Project Title -->
      <div class="flex items-center justify-center">
        <h1 class="text-4xl font-bold md:text-6xl">{{ title() }}</h1>
      </div>

      <!-- Right: Card Stack -->
      <div class="bg-foreground/20 flex flex-col items-center justify-center">
        <app-card-stack (returnTitle)="getData($event)" />
      </div>
    </section>
  `,
})
export default class Projects {
  public title = signal('');
  getData(item: Card) {
    this.title.set(item.title);
  }
}
