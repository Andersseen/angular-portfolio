import { Component, Input } from '@angular/core';
import { ControlsComponent } from './controls.component';
import { SlideInfoComponent } from './slide-info.component';
import { CurrentSlideData, SlideItem } from './slide.model';
import { SLIDES } from './slides';
import { SlidesComponent } from './slides.component';

@Component({
  selector: 'app-carousel',
  template: `
    <section class="relative min-h-screen overflow-hidden antialiased select-none">
      <div class="absolute z-20 h-full w-full">
        <div class="flex h-full w-full grid-cols-12 flex-col md:grid">
          <div class="col-span-5 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10">
            <app-slide-info
              [transitionData]="transitionData"
              [currentSlideData]="currentSlideData"
              [buttonText]="dictionary?.button"
            ></app-slide-info>
          </div>
          <div class="col-span-7 mb-4 flex h-full flex-1 flex-col justify-start p-4 md:mb-0 md:justify-center md:p-10">
            <app-slides [data]="data"></app-slides>
            <app-controls
              [currentSlideData]="currentSlideData"
              [data]="data"
              [transitionData]="transitionData"
              [initData]="initData"
              [sliderData]="slides"
              (dataChange)="handleDataChange($event)"
              (transitionDataChange)="handleTransitionDataChange($event)"
              (currentSlideDataChange)="handleCurrentSlideDataChange($event)"
            ></app-controls>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [SlideInfoComponent, ControlsComponent, SlidesComponent],
})
export default class CarouselComponent {
  @Input() dictionary: any;
  slides = SLIDES;
  data = this.slides.slice(1);
  transitionData = this.slides[0];
  currentSlideData: CurrentSlideData = {
    data: this.initData,
    index: 0,
  };

  get initData(): SlideItem {
    return SLIDES[0];
  }

  handleDataChange(newData: SlideItem[]) {
    this.data = newData;
  }

  handleTransitionDataChange(newData: SlideItem) {
    this.transitionData = newData;
  }

  handleCurrentSlideDataChange(newData: CurrentSlideData) {
    this.currentSlideData = newData;
  }
}
