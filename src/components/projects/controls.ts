import { Component, model } from '@angular/core';
import { Card } from './card-stack';

@Component({
  selector: 'app-controls',
  template: `
    <div class="flex items-center justify-center gap-3 px-0 py-3 md:hidden md:px-8 md:py-5">
      <button
        (click)="prevCard()"
        class="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-[#f6f6f6] transition duration-300 ease-in-out hover:scale-110 hover:bg-neutral-100 hover:text-neutral-900 active:scale-90"
      >
        <!-- Icon Left -->
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"
          />
        </svg>
      </button>

      <button
        (click)="nextCard()"
        class="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-[#f6f6f6] transition duration-300 ease-in-out hover:scale-110 hover:bg-neutral-100 hover:text-neutral-900 active:scale-90"
      >
        <!-- Icon Right -->
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"
          />
        </svg>
      </button>
    </div>
  `,
})
export class ControlsComponent {
  public cards = model<Card[]>([]);
  nextCard() {
    this.cards.update((state) => {
      const arr = [...state];
      const card = arr.pop();
      if (card) arr.unshift(card);
      return arr;
    });
  }

  prevCard() {
    this.cards.update((state) => {
      const arr = [...state];
      const card = arr.shift();
      if (card) arr.push(card);
      return arr;
    });
  }
}
