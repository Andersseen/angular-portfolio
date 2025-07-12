import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SlideItem } from './slide.model';
import { SliderCardComponent } from './slider-card.component';

@Component({
  selector: 'app-slides',
  template: `
    <div class="flex w-full justify-center gap-6" (mouseenter)="isHovered = true" (mouseleave)="isHovered = false">
      <a
        *ngFor="let item of data; let i = index"
        [href]="item.route"
        class="transition-all duration-300"
        [style.filter]="isHovered ? 'blur(2px)' : 'none'"
        [class.scale-110]="isHovered"
      >
        <app-slider-card [data]="item"></app-slider-card>
      </a>
    </div>
  `,
  imports: [CommonModule, SliderCardComponent],
})
export class SlidesComponent {
  @Input() data!: SlideItem[];
  isHovered = false;
}
