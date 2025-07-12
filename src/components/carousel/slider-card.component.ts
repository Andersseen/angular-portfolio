import { Component, Input } from '@angular/core';
import { SlideItem } from './slide.model';

@Component({
  selector: 'app-slider-card',
  template: `
    <div class="relative h-52 min-w-[250px] rounded-2xl shadow-md md:h-80 md:min-w-[208px]">
      <img
        [src]="data.img"
        alt="Transition Image"
        class="absolute h-full w-full rounded-2xl object-cover brightness-75"
      />

      <div class="absolute z-10 flex h-full items-end p-4">
        <div>
          <div class="mb-2 h-[2px] w-3 rounded-full bg-white"></div>

          <h1 class="text-xl leading-6 text-white">{{ data.title }}</h1>
        </div>
      </div>
    </div>
  `,
})
export class SliderCardComponent {
  @Input() data!: SlideItem;
}
