import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="bg-neutral-50 transition-colors duration-300 dark:bg-neutral-900">
      <router-outlet />
    </div>
  `,
})
export default class Container {}
