import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-card-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #stackRef class="relative mx-auto my-10" [ngStyle]="{ perspective: '600px', width: '208px', height: '208px' }">
      @for (card of cards(); track card.id) {
        <div
          class="absolute touch-none overflow-hidden rounded-2xl border-4 border-white bg-cover bg-center"
          [ngStyle]="{
            width: '208px',
            height: '208px',
            backgroundImage: 'url(' + card.img + ')',
            zIndex: getZIndex(card.id),
            transform: getCardTransform(card.id),
          }"
          (mousedown)="startDrag($event, card.id)"
          (click)="onCardClick(card.id)"
        ></div>
      }
    </div>
  `,
  styles: [
    `
      .touch-none {
        touch-action: none;
        user-select: none;
      }
    `,
  ],
})
export default class CardStackComponent {
  cards = signal(this.defaultCards());

  draggingId = signal(0);
  dragX = signal(0);
  dragY = signal(0);

  @ViewChild('stackRef') stackRef!: ElementRef<HTMLElement>;

  startDrag(event: MouseEvent, id: number) {
    event.preventDefault();
    this.draggingId.set(id);
    const move = (e: MouseEvent) => {
      this.dragX.set(e.clientX - event.clientX);
      this.dragY.set(e.clientY - event.clientY);
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);

      if (Math.abs(this.dragX()) > 150 || Math.abs(this.dragY()) > 150) {
        this.sendToBack(id);
      }

      this.draggingId.set(0);
      this.dragX.set(0);
      this.dragY.set(0);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }

  getCardTransform(id: number) {
    const index = this.cards().findIndex((c) => c.id === id);
    const total = this.cards().length;
    const baseRotate = (total - index - 1) * 4;
    const scale = 1 + index * 0.06 - total * 0.06;

    if (this.draggingId() === id) {
      return `translate(${this.dragX()}px, ${this.dragY()}px) rotateX(${this.dragY() / 2}deg) rotateY(${this.dragX() / 2}deg) scale(${scale})`;
    } else {
      return `rotateZ(${baseRotate}deg) scale(${scale})`;
    }
  }

  getZIndex(id: number) {
    return this.cards().findIndex((c) => c.id === id) + 1;
  }

  onCardClick(id: number) {
    this.sendToBack(id);
  }

  sendToBack(id: number) {
    const arr = [...this.cards()];
    const index = arr.findIndex((c) => c.id === id);
    const [card] = arr.splice(index, 1);
    arr.unshift(card);
    this.cards.set(arr);
  }

  defaultCards() {
    return [
      { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },
      { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },
      { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },
      { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' },
    ];
  }
}
