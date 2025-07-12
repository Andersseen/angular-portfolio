import { Component, Input } from '@angular/core';
import { OtherInfoComponent } from './other-info.component';
import { CurrentSlideData, SlideItem } from './slide.model';

@Component({
  selector: 'app-slide-info',
  template: `
    <span class="mb-2 h-1 w-5 rounded-full bg-white"></span>
    <app-other-info [data]="transitionData || currentSlideData.data"></app-other-info>
    <div class="mt-5 flex items-center gap-3">
      <a
        [href]="transitionData.route"
        target="_blank"
        rel="noopener noreferrer"
        class="transform rounded-lg bg-neutral-900 px-6 py-2 font-bold text-neutral-100 transition duration-400 hover:-translate-y-1"
      >
        <span>{{ buttonText }}</span>
      </a>
    </div>
  `,
  imports: [OtherInfoComponent],
})
export class SlideInfoComponent {
  @Input() transitionData!: SlideItem;
  @Input() currentSlideData!: CurrentSlideData;
  @Input() buttonText!: string;
}
