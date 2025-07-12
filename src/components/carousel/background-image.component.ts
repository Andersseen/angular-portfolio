import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CurrentSlideData, SlideItem } from './slide.model';

@Component({
  selector: 'app-background-image',
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="transitionData">
      <img
        [attr.key]="transitionData.img"
        [attr.layoutId]="transitionData.img"
        alt="Transition Image"
        class="absolute top-0 left-0 z-10 h-full w-full object-cover brightness-50"
        [src]="transitionData.img"
      />
    </ng-container>

    <img
      alt="Current Image"
      [attr.key]="currentSlideData.data.img + 'transition'"
      [src]="currentSlideData.data.img"
      class="absolute top-0 left-0 h-full w-full object-cover brightness-50"
    />
  `,
})
export class BackgroundImageComponent {
  @Input() transitionData!: SlideItem;
  @Input() currentSlideData!: CurrentSlideData;
}
