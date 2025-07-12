import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  template: `
    <div class="bg-opacity-50 flex h-[1px] flex-1 items-center rounded-full">
      <div class="h-[1px] rounded-full bg-neutral-100 shadow-lg" [style.width]="progressWidth"></div>
    </div>
  `,
})
export class ProgressComponent {
  @Input() curIndex!: number;
  @Input() length!: number;

  get progressWidth(): string {
    return ((this.curIndex + 1) / this.length) * 100 + '%';
  }
}
