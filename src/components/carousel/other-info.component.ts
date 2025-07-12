import { Component, Input } from '@angular/core';
import { SlideItem } from './slide.model';

@Component({
  selector: 'app-other-info',
  template: `
    <div class="flex flex-col">
      <div class="my-1 text-4xl font-semibold md:my-3 md:text-8xl md:leading-[100px]">
        {{ data?.title }}
      </div>
      <div class="text-sm">
        {{ data?.subtitle }}
      </div>
    </div>
  `,
})
export class OtherInfoComponent {
  @Input() data!: SlideItem;
}
