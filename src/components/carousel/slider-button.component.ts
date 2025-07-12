import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slider-button',
  template: `
    <button
      (click)="onClick()"
      class="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-[#f6f6f6] transition duration-300 ease-in-out hover:scale-110 hover:bg-neutral-100 hover:text-neutral-900 active:scale-90"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class SliderButtonComponent {
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
