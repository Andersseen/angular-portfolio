import { NgStyle } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ControlsComponent } from './controls';

@Component({
  selector: 'app-card-stack',
  imports: [NgStyle, ControlsComponent],
  template: `
    <div #stackRef class="relative" [ngStyle]="{ perspective: '600px', width: '400px', height: '400px' }">
      @for (card of cards(); track card.id) {
        <div
          class="border-foreground absolute cursor-grab touch-none overflow-hidden rounded-2xl border-4 bg-cover bg-center transition-transform duration-300 ease-out"
          [ngStyle]="{
            width: '400px',
            height: '400px',
            backgroundImage: 'url(' + card.img + ')',
            zIndex: getZIndex(card.id),
            transform: getCardTransform(card.id),
          }"
          (mousedown)="startDrag($event, card.id)"
          (mouseup)="endDrag()"
          (mouseleave)="endDrag()"
        ></div>
      }
    </div>
    <app-controls [(cards)]="cards" />
  `,
})
export class CardStack {
  public cards = signal(CARDS);
  public draggingId = signal(0);
  public dragX = signal(0);
  public dragY = signal(0);

  @ViewChild('stackRef') stackRef!: ElementRef<HTMLElement>;

  startDrag(event: MouseEvent, id: number) {
    event.preventDefault();
    this.draggingId.set(id);
    const initialX = event.clientX;
    const initialY = event.clientY;
    const move = (e: MouseEvent) => {
      this.dragX.set(e.clientX - initialX);
      this.dragY.set(e.clientY - initialY);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', () => this.endDrag(move), { once: true });
  }

  endDrag(moveHandler?: (e: MouseEvent) => void) {
    if (moveHandler) window.removeEventListener('mousemove', moveHandler);

    if (Math.abs(this.dragX()) > 150 || Math.abs(this.dragY()) > 150) {
      if (this.draggingId()) this.sendToBack(this.draggingId()!);
    }

    this.draggingId.set(0);
    this.dragX.set(0);
    this.dragY.set(0);
  }

  getCardTransform(id: number) {
    const index = this.cards().findIndex((c) => c.id === id);
    const total = this.cards().length;
    const baseRotate = (total - index - 1) * 4;
    const scale = 1 + index * 0.06 - total * 0.06;
    if (this.draggingId() === id) {
      return `translate(${this.dragX()}px, ${this.dragY()}px) rotateX(${this.dragY() / 4}deg) rotateY(${this.dragX() / 4}deg) scale(${scale})`;
    } else {
      return `rotateZ(${baseRotate}deg) scale(${scale})`;
    }
  }

  getZIndex(id: number) {
    return this.cards().findIndex((c) => c.id === id) + 1;
  }

  sendToBack(id: number) {
    const arr = [...this.cards()];
    const index = arr.findIndex((c) => c.id === id);
    const [card] = arr.splice(index, 1);
    arr.unshift(card);
    this.cards.set(arr);
  }
}

export const CARDS = [
  { id: 1, img: '/falcotech.webp' },
  { id: 2, img: '/epm.webp' },
  { id: 3, img: '/soul.webp' },
  { id: 4, img: '/biker.webp' },
];

export interface Card {
  id: number;
  img: string;
}
