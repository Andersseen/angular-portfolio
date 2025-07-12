import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressComponent } from './progress.component';
import { CurrentSlideData, SlideItem } from './slide.model';
import { SliderButtonComponent } from './slider-button.component';

@Component({
  selector: 'app-controls',
  template: `
    <div class="flex items-center gap-3 px-0 py-3 md:px-8 md:py-5">
      <app-slider-button (click)="handlePrev()">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"
          />
        </svg>
      </app-slider-button>

      <app-progress [curIndex]="currentSlideData.index" [length]="sliderData.length"></app-progress>

      <app-slider-button (click)="handleNext()">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"
          />
        </svg>
      </app-slider-button>
    </div>
  `,
  imports: [SliderButtonComponent, ProgressComponent],
})
export class ControlsComponent {
  @Input() currentSlideData!: CurrentSlideData;
  @Input() sliderData!: SlideItem[];
  @Input() data!: SlideItem[];
  @Input() transitionData!: SlideItem;
  @Input() initData!: SlideItem;

  @Output() dataChange = new EventEmitter<SlideItem[]>();
  @Output() transitionDataChange = new EventEmitter<SlideItem>();
  @Output() currentSlideDataChange = new EventEmitter<CurrentSlideData>();

  handlePrev() {
    const newData = [
      this.transitionData ? this.transitionData : this.initData,
      ...this.data.slice(0, this.data.length - 1),
    ];
    this.dataChange.emit(newData);

    const newCurrentSlideData = {
      data: this.transitionData ? this.transitionData : this.sliderData[0],
      index: this.sliderData.findIndex((ele) => ele.img === this.data[this.data.length - 1].img),
    };
    this.currentSlideDataChange.emit(newCurrentSlideData);

    this.transitionDataChange.emit(this.data[this.data.length - 1]);
  }

  handleNext() {
    const newData = this.data.slice(1);
    this.dataChange.emit(newData);

    const newCurrentSlideData = {
      data: this.transitionData ? this.transitionData : this.initData,
      index: this.sliderData.findIndex((ele) => ele.img === this.data[0].img),
    };
    this.currentSlideDataChange.emit(newCurrentSlideData);

    this.transitionDataChange.emit(this.data[0]);

    setTimeout(() => {
      this.dataChange.emit([...newData, this.transitionData ? this.transitionData : this.initData]);
    }, 500);
  }
}
